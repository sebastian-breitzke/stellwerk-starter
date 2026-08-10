# Privacy And Sharing

Read this when the user wants to share their runtime — with a team, in a public
repo, in a talk, or in a screenshot.

A personal agent runtime accumulates far more private information than its owner
expects. The method is shareable. The operating context usually is not.

## Safe To Share

After review:

- the layering model and the reasoning behind it
- skill structure and authoring rules
- quality, verification, and privacy policy
- research and recap methodology
- examples built from fictional data

## Do Not Share

Remove or rewrite:

- personal biography, family, health, private preferences
- stakeholder and person libraries
- company and customer names, unless already public
- customer workflows and operational playbooks
- hostnames, IPs, SSH aliases, usernames, vault names, bot handles, token names
- raw dictations, transcripts, meeting notes, session logs
- git history containing private email addresses
- screenshots showing local paths, repo names, or tool state

## Secrets

No credential belongs in a prompt, skill, example, screenshot, log, or repo —
including credentials that look inert.

That includes real tokens, database URLs, cloud account identifiers, private bot
handles, local vault paths, SSH key paths and host aliases, and **secret entry
names that reveal infrastructure shape**. `prod-eu-billing-db-root` tells a
reader more than it should even with no value attached.

Use placeholders:

```text
<secret-manager-entry>
<internal-host>
<project-repo>
<private-chat-target>
```

## Publishing Checklist

1. Create a fresh repo. Do not carry over git history — it contains emails,
   old paths, and files you thought you deleted.
2. Copy only reviewed files.
3. Run a secret scanner if you have one.
4. Grep for names, emails, hostnames, IPs, and local paths — including your own
   username, which hides in every absolute path.
5. Open every image and read it. Screenshots leak terminal titles, repo names,
   and browser tabs.
6. Replace real examples with fictional ones. A "sanitized" real example usually
   is not.
7. State clearly in the README that it is reference material, not a package.

## Shape

Share a curated starter, not your working runtime. The two have different jobs
and should be different repositories.

A good starter answers: what the model is, why the layers exist, which parts are
optional, how another agent should adapt it, and what must never be imported.
