#!/usr/bin/env python3

import argparse
import json
import re
import subprocess
import sys
from datetime import datetime, timezone


PR_FIELDS = ",".join(
    [
        "author",
        "baseRefName",
        "baseRefOid",
        "comments",
        "headRefName",
        "headRefOid",
        "isDraft",
        "latestReviews",
        "mergeStateStatus",
        "mergeable",
        "number",
        "reviewDecision",
        "reviews",
        "state",
        "statusCheckRollup",
        "title",
        "updatedAt",
        "url",
    ]
)

THREAD_QUERY = """
query($owner: String!, $repo: String!, $number: Int!) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $number) {
      reviewThreads(first: 100) {
        nodes {
          id
          isResolved
          isOutdated
          path
          comments(first: 100) {
            nodes {
              id
              databaseId
              url
              body
              path
              line
              originalLine
              createdAt
              author {
                login
              }
            }
          }
        }
      }
    }
  }
}
""".strip()

BOT_RE = re.compile(r"(\[bot\]$|^copilot(-pull-request-reviewer)?$)", re.IGNORECASE)


def run(cmd, check=True):
    return subprocess.run(
        cmd,
        check=check,
        capture_output=True,
        text=True,
    )


def read_json(cmd):
    completed = run(cmd)
    return json.loads(completed.stdout)


def read_text(cmd, check=True):
    completed = run(cmd, check=check)
    return completed.stdout.strip()


def gh_repo_name(explicit_repo):
    if explicit_repo:
        return explicit_repo
    cmd = ["gh", "repo", "view", "--json", "nameWithOwner", "-q", ".nameWithOwner"]
    return read_text(cmd, check=False)


def resolve_pr_selector(selector, repo_name):
    if selector:
        return selector

    cmd = ["gh", "pr", "view", "--json", "number", "-q", ".number"]
    if repo_name:
        cmd.extend(["--repo", repo_name])
    return read_text(cmd, check=False)


def load_pr(repo_name, selector):
    cmd = ["gh", "pr", "view", selector, "--json", PR_FIELDS]
    if repo_name:
        cmd.extend(["--repo", repo_name])
    completed = run(cmd, check=False)
    if completed.returncode != 0:
        return None
    return json.loads(completed.stdout)


def load_threads(repo_name, pr_number):
    owner, repo = repo_name.split("/", 1)
    cmd = [
        "gh",
        "api",
        "graphql",
        "-F",
        f"owner={owner}",
        "-F",
        f"repo={repo}",
        "-F",
        f"number={pr_number}",
        "-f",
        f"query={THREAD_QUERY}",
    ]
    completed = run(cmd, check=False)
    if completed.returncode != 0:
        return []
    data = json.loads(completed.stdout)
    nodes = (
        data.get("data", {})
        .get("repository", {})
        .get("pullRequest", {})
        .get("reviewThreads", {})
        .get("nodes", [])
    )
    return nodes


def is_inside_git_repo():
    return run(["git", "rev-parse", "--is-inside-work-tree"], check=False).returncode == 0


def local_repo_matches(target_repo):
    if not target_repo or not is_inside_git_repo():
        return False
    local_name = gh_repo_name(None)
    return bool(local_name) and local_name == target_repo


def git_text(args, check=False):
    return read_text(["git", *args], check=check)


def git_ok(args):
    return run(["git", *args], check=False).returncode == 0


def compare_local_to_pr(local_head, pr_head_oid):
    if not local_head or not pr_head_oid:
        return "unknown"
    if local_head == pr_head_oid:
        return "exact_match"
    if not git_ok(["cat-file", "-e", f"{pr_head_oid}^{{commit}}"]):
        return "pr_head_missing_locally"
    if git_ok(["merge-base", "--is-ancestor", pr_head_oid, local_head]):
        return "local_ahead_of_pr"
    if git_ok(["merge-base", "--is-ancestor", local_head, pr_head_oid]):
        return "local_behind_pr"
    return "diverged_from_pr"


def summarize_checks(items):
    summary = {
        "total": 0,
        "passing": 0,
        "failing": 0,
        "pending": 0,
        "skipped": 0,
        "cancelled": 0,
        "failing_names": [],
    }

    for item in items or []:
        summary["total"] += 1
        status = item.get("status")
        conclusion = item.get("conclusion")
        name = item.get("name")

        if status is None and conclusion is None and item.get("state"):
            state = item.get("state")
            if state == "SUCCESS":
                summary["passing"] += 1
            elif state in {"ERROR", "FAILURE"}:
                summary["failing"] += 1
                summary["failing_names"].append(item.get("context"))
            else:
                summary["pending"] += 1
            continue

        if status != "COMPLETED":
            summary["pending"] += 1
            continue

        if conclusion in {"SUCCESS", "NEUTRAL"}:
            summary["passing"] += 1
        elif conclusion == "SKIPPED":
            summary["skipped"] += 1
        elif conclusion == "CANCELLED":
            summary["cancelled"] += 1
            summary["failing_names"].append(name)
        else:
            summary["failing"] += 1
            summary["failing_names"].append(name)

    return summary


def normalize_reviews(reviews):
    normalized = []
    for review in reviews or []:
        login = ((review.get("author") or {}).get("login")) or "unknown"
        normalized.append(
            {
                "id": review.get("id"),
                "author": login,
                "isBot": bool(BOT_RE.search(login)),
                "state": review.get("state"),
                "submittedAt": review.get("submittedAt"),
                "commitOid": ((review.get("commit") or {}).get("oid")),
                "body": review.get("body"),
            }
        )
    return normalized


def normalize_threads(nodes):
    threads = []
    unresolved = 0
    unresolved_human = 0
    unresolved_bot_only = 0

    for node in nodes:
        comments = []
        authors = set()
        for comment in (node.get("comments") or {}).get("nodes", []):
            login = ((comment.get("author") or {}).get("login")) or "unknown"
            authors.add(login)
            comments.append(
                {
                    "nodeId": comment.get("id"),
                    "commentId": comment.get("databaseId"),
                    "author": login,
                    "isBot": bool(BOT_RE.search(login)),
                    "body": comment.get("body"),
                    "url": comment.get("url"),
                    "path": comment.get("path"),
                    "line": comment.get("line"),
                    "originalLine": comment.get("originalLine"),
                    "createdAt": comment.get("createdAt"),
                }
            )

        thread = {
            "threadId": node.get("id"),
            "path": node.get("path"),
            "isResolved": node.get("isResolved"),
            "isOutdated": node.get("isOutdated"),
            "commentCount": len(comments),
            "authors": sorted(authors),
            "latestComment": comments[-1] if comments else None,
            "comments": comments,
        }
        threads.append(thread)

        if not thread["isResolved"]:
            unresolved += 1
            human_authors = [author for author in authors if not BOT_RE.search(author)]
            if human_authors:
                unresolved_human += 1
            else:
                unresolved_bot_only += 1

    return {
        "total": len(threads),
        "unresolved": unresolved,
        "unresolvedHuman": unresolved_human,
        "unresolvedBotOnly": unresolved_bot_only,
        "items": threads,
    }


def gather_local_state(pr):
    if not is_inside_git_repo():
        return {"available": False, "reason": "not_in_git_repo"}

    branch = git_text(["rev-parse", "--abbrev-ref", "HEAD"])
    head = git_text(["rev-parse", "HEAD"])
    status_lines = git_text(["status", "--porcelain=v1"]).splitlines()
    conflicted_files = git_text(["diff", "--name-only", "--diff-filter=U"]).splitlines()
    upstream = git_text(["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}"])

    ahead = None
    behind = None
    if upstream:
        counts = git_text(["rev-list", "--left-right", "--count", f"{upstream}...HEAD"])
        if counts:
            behind_str, ahead_str = counts.split()
            behind = int(behind_str)
            ahead = int(ahead_str)

    relation = compare_local_to_pr(head, pr.get("headRefOid"))

    return {
        "available": True,
        "branch": branch,
        "headOid": head,
        "isDirty": bool(status_lines),
        "uncommittedCount": len(status_lines),
        "status": status_lines,
        "conflictedFiles": conflicted_files,
        "hasConflicts": bool(conflicted_files),
        "upstream": upstream or None,
        "aheadOfUpstream": ahead,
        "behindUpstream": behind,
        "matchesPrBranch": branch == pr.get("headRefName"),
        "relationToPrHead": relation,
    }


def main():
    parser = argparse.ArgumentParser(
        description="Collect a GitHub PR status snapshot and compare it with local repo state."
    )
    parser.add_argument("selector", nargs="?", help="PR number, PR URL, or branch name.")
    parser.add_argument("--repo", help="GitHub repo in owner/name form.")
    parser.add_argument("--compact", action="store_true", help="Print compact JSON.")
    args = parser.parse_args()

    repo_name = gh_repo_name(args.repo)
    if not repo_name:
        print(
            json.dumps(
                {
                    "generatedAt": datetime.now(timezone.utc).isoformat(),
                    "repo": args.repo,
                    "prFound": False,
                    "error": "Could not determine repository. Run inside a GitHub repo or pass --repo owner/name.",
                },
                indent=None if args.compact else 2,
            )
        )
        return 2

    selector = resolve_pr_selector(args.selector, repo_name)
    pr = load_pr(repo_name, selector) if selector else None

    if not pr:
        output = {
            "generatedAt": datetime.now(timezone.utc).isoformat(),
            "repo": repo_name,
            "selector": args.selector,
            "prFound": False,
            "local": gather_local_state({"headRefOid": None, "headRefName": None})
            if local_repo_matches(repo_name)
            else {
                "available": False,
                "reason": "current_worktree_does_not_match_target_repo",
            },
        }
        json.dump(output, sys.stdout, indent=None if args.compact else 2)
        sys.stdout.write("\n")
        return 0

    thread_nodes = load_threads(repo_name, pr["number"])
    threads = normalize_threads(thread_nodes)
    reviews = normalize_reviews(pr.get("reviews"))
    latest_reviews = normalize_reviews(pr.get("latestReviews"))
    checks = summarize_checks(pr.get("statusCheckRollup"))

    local = (
        gather_local_state(pr)
        if local_repo_matches(repo_name)
        else {"available": False, "reason": "current_worktree_does_not_match_target_repo"}
    )

    output = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "repo": repo_name,
        "prFound": True,
        "pr": {
            "number": pr.get("number"),
            "title": pr.get("title"),
            "url": pr.get("url"),
            "state": pr.get("state"),
            "isDraft": pr.get("isDraft"),
            "mergeable": pr.get("mergeable"),
            "mergeStateStatus": pr.get("mergeStateStatus"),
            "reviewDecision": pr.get("reviewDecision"),
            "headRefName": pr.get("headRefName"),
            "headRefOid": pr.get("headRefOid"),
            "baseRefName": pr.get("baseRefName"),
            "baseRefOid": pr.get("baseRefOid"),
            "updatedAt": pr.get("updatedAt"),
            "author": ((pr.get("author") or {}).get("login")),
            "topLevelCommentCount": len(pr.get("comments") or []),
        },
        "checks": checks,
        "reviews": {
            "count": len(reviews),
            "latestCount": len(latest_reviews),
            "items": reviews,
            "latestItems": latest_reviews,
        },
        "threads": threads,
        "local": local,
    }

    json.dump(output, sys.stdout, indent=None if args.compact else 2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
