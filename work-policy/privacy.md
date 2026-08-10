# Work Policy: Privacy

Always-on when the user handles customer data, works in a company repo, or plans
to share their runtime. Adapt from interview Block 8.

---

## Private By Default

Do not copy private context into reusable runtime files unless the user asks and
the target is appropriate.

Private context includes: person notes, transcripts, raw dictations, customer
details, company workflows, internal infrastructure, local machine paths, and
secret entry names.

The test: *would this line still make sense, and still be safe, in someone
else's repo?* If no, it belongs in the context layer, not in a skill.

## Secrets

- Never write a secret into code, prompts, docs, logs, examples, or commit
  messages.
- Look values up through <secret_manager from Block 8> at the moment of use.
- Never print a secret value, never echo it into a file, never put it in a URL.
- If a credential is missing, name the entry that should hold it and where it
  should be configured. Do not guess, and do not read credential files directly.

<If the user has no secret manager: recommend one in the report, and until then
require every credential to come from the environment at call time.>

## Never Touch

<From Block 8. Be concrete — a directory, a repo, an environment, an integration.
"Be careful with production" is not a rule; "never run migrations against the
prod connection string; ask" is.>

## Sharing Boundary

Before producing anything shareable — a public repo, a blog post, a screenshot,
a document for someone outside the user's org:

1. remove personal identity and person context
2. remove customer and company context
3. remove local paths, screenshots, and logs
4. remove infrastructure names and secret references
5. replace real examples with fictional ones
6. grep for names, emails, URLs, hostnames, and IPs

## Person Context

Meeting notes may produce durable person-context candidates, but persistence
requires explicit approval. Store collaboration signal only: role, working
surface, preferred level of detail, communication style, decision criteria,
recurring concerns.

Never store gossip, diagnoses, performance judgments, private leverage, or
one-off moods.
