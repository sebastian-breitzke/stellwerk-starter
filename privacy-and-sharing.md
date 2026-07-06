# Privacy And Sharing

A personal agent runtime often contains more private information than expected.
Before sharing it, separate reusable method from personal operating context.

## Safe To Share

Usually safe after review:

- generic workflow descriptions
- prompt layering model
- skill structure
- quality and verification policy
- research methodology
- meeting recap method
- examples with fictional data

## Do Not Share

Remove or rewrite:

- personal biography, family, health, or private preferences
- stakeholder/person libraries
- company and customer names unless explicitly public
- customer workflows and operational playbooks
- hostnames, IPs, SSH aliases, usernames, vault names, bot names, token names
- raw dictations, transcripts, meeting notes, and session logs
- git history with private emails
- screenshots that show local paths or tool state

## Secret Rule

No credential belongs in a prompt, skill, example, screenshot, or public repo.

This includes:

- real tokens
- secret names that reveal infrastructure shape
- database URLs
- cloud account identifiers
- private bot handles
- local vault paths
- SSH key paths and host aliases

Use placeholders such as:

```text
<secret-manager-entry>
<internal-host>
<project-repo>
<private-chat-target>
```

## Public Repo Checklist

Before publishing:

- create a fresh repo without private git history
- copy only reviewed starter files
- run a secret scan if available
- search for names, emails, hostnames, IPs, and local paths
- inspect images manually
- keep examples fictional
- add a clear README saying this is reference material, not a package

## Recommended Sharing Shape

Share a curated starter repo, not your working runtime.

The starter should answer:

- what the model is
- why the layers exist
- which workflows are optional
- how another coding agent should adapt it
- what must not be imported
