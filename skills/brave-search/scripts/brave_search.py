#!/usr/bin/env python3
"""Small Brave Search API CLI for the Brave Search skill."""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any


ENDPOINT = "https://api.search.brave.com/res/v1/web/search"
MAX_QUERY_CHARS = 400
MAX_QUERY_WORDS = 50


class SearchError(RuntimeError):
    pass


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Search the web with Brave Search API.")
    parser.add_argument("query", help="Search query. Brave supports operators inside this string.")
    parser.add_argument("--json", dest="json_output", action="store_true", help="Print raw JSON.")
    parser.add_argument("--limit", type=int, default=10, help="Number of web results, 1-20. Default: 10.")
    parser.add_argument("--country", help="Two-letter country code, e.g. DE or US.")
    parser.add_argument("--search-lang", help="Search language code, e.g. de or en.")
    parser.add_argument("--ui-lang", help="Response UI language, e.g. de-DE or en-US.")
    parser.add_argument("--freshness", help="pd, pw, pm, py, or YYYY-MM-DDtoYYYY-MM-DD.")
    parser.add_argument(
        "--result-filter",
        default="web",
        help="Comma-delimited result types. Default: web.",
    )
    parser.add_argument("--extra-snippets", action="store_true", help="Request additional snippets.")
    parser.add_argument("--no-history", action="store_true", help="Do not write local search history.")
    parser.add_argument(
        "--history-dir",
        default=str(Path(os.environ.get("XDG_STATE_HOME", Path.home() / ".local" / "state")) / "brave-search"),
        help="Directory for JSON and JSONL search history.",
    )
    return parser.parse_args()


def validate_args(args: argparse.Namespace) -> None:
    if not 1 <= args.limit <= 20:
        raise SearchError("--limit must be between 1 and 20.")
    if len(args.query) > MAX_QUERY_CHARS:
        raise SearchError(f"query is {len(args.query)} characters; Brave allows {MAX_QUERY_CHARS}.")
    word_count = len(args.query.split())
    if word_count > MAX_QUERY_WORDS:
        raise SearchError(f"query has {word_count} words; Brave allows {MAX_QUERY_WORDS}.")


def build_params(args: argparse.Namespace) -> dict[str, str]:
    params = {
        "q": args.query,
        "count": str(args.limit),
    }
    optional = {
        "country": args.country,
        "search_lang": args.search_lang,
        "ui_lang": args.ui_lang,
        "freshness": args.freshness,
        "result_filter": args.result_filter,
    }
    for key, value in optional.items():
        if value:
            params[key] = value
    if args.extra_snippets:
        params["extra_snippets"] = "true"
    return params


def read_api_key() -> str:
    api_key = os.environ.get("BRAVE_API_KEY", "").strip()
    if not api_key:
        raise SearchError(
            "BRAVE_API_KEY is not set. Resolve the Brave API key through your approved local "
            "secret manager, then provide it to this command without exposing the value."
        )
    return api_key


def fetch_json(api_key: str, params: dict[str, str]) -> dict[str, Any]:
    url = f"{ENDPOINT}?{urllib.parse.urlencode(params)}"
    request = urllib.request.Request(
        url,
        headers={
            "Accept": "application/json",
            "X-Subscription-Token": api_key,
            "User-Agent": "brave-search-skill/1.0",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            payload = response.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace").strip()
        if exc.code in (401, 403):
            raise SearchError(
                f"Brave API returned HTTP {exc.code}; check the Brave API key in your approved local secret manager."
            ) from exc
        if exc.code == 429:
            raise SearchError("Brave API rate-limited the request; a research workflow can fall back to native web search.") from exc
        raise SearchError(f"Brave API returned HTTP {exc.code}: {truncate(detail)}") from exc
    except urllib.error.URLError as exc:
        raise SearchError(f"Brave API request failed: {exc.reason}") from exc

    try:
        data = json.loads(payload)
    except json.JSONDecodeError as exc:
        raise SearchError("Brave API returned invalid JSON.") from exc
    if not isinstance(data, dict):
        raise SearchError("Brave API returned an unexpected JSON shape.")
    return data


def truncate(text: str, limit: int = 500) -> str:
    return text if len(text) <= limit else f"{text[:limit]}..."


def web_results(data: dict[str, Any]) -> list[dict[str, Any]]:
    web = data.get("web")
    if not isinstance(web, dict):
        return []
    results = web.get("results")
    if not isinstance(results, list):
        return []
    return [result for result in results if isinstance(result, dict)]


def strip_tags(value: str) -> str:
    return re.sub(r"<[^>]+>", "", value)


def print_text(query: str, data: dict[str, Any]) -> None:
    results = web_results(data)
    print(f"Found {len(results)} web results for: {query}")
    print()
    for index, result in enumerate(results, start=1):
        title = strip_tags(str(result.get("title") or "(untitled)"))
        url = str(result.get("url") or "")
        description = strip_tags(str(result.get("description") or "")).strip()
        print(f"{index}. {title}")
        if url:
            print(f"   URL: {url}")
        if description:
            print(f"   {description}")
        extra_snippets = result.get("extra_snippets")
        if isinstance(extra_snippets, list):
            for snippet in extra_snippets[:3]:
                text = strip_tags(str(snippet)).strip()
                if text:
                    print(f"   - {text}")
        print()


def sanitize_filename(query: str) -> str:
    slug = re.sub(r"[^A-Za-z0-9._-]+", "-", query.lower()).strip("-")
    return (slug or "query")[:80]


def write_history(args: argparse.Namespace, params: dict[str, str], data: dict[str, Any]) -> None:
    timestamp = dt.datetime.now(dt.timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    history_dir = Path(args.history_dir).expanduser()
    json_dir = history_dir / "json"
    json_dir.mkdir(parents=True, exist_ok=True)
    json_path = json_dir / f"{timestamp}_{sanitize_filename(args.query)}.json"
    json_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    record = {
        "timestamp": timestamp,
        "query": args.query,
        "params": params,
        "result_count": len(web_results(data)),
        "json_path": str(json_path),
    }
    with (history_dir / "search_history.jsonl").open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(record, ensure_ascii=False) + "\n")


def main() -> int:
    args = parse_args()
    try:
        validate_args(args)
        api_key = read_api_key()
        params = build_params(args)
        data = fetch_json(api_key, params)
        if not args.no_history:
            try:
                write_history(args, params, data)
            except OSError as exc:
                print(f"Warning: could not write search history: {exc}", file=sys.stderr)
        if args.json_output:
            print(json.dumps(data, ensure_ascii=False, indent=2))
        else:
            print_text(args.query, data)
    except SearchError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
