---
name: transcription
description: Transcribe a user-provided or already-local audio/video file into a durable plain-text transcript. Use when a workflow needs a local media transcript; not for downloading media or claiming timestamps or diarization without verification.
---

# Transcription

Create a readable plain-text transcript from local media using OpenRouter's
`mistralai/voxtral-mini-transcribe`.

## Setup Gate

- The media file must already exist locally or be supplied by the user. This
  skill does not bypass source-platform retrieval failures or bot checks.
- Resolve the local OpenRouter credential through the user's approved secret
  manager. When `hort` is available, use `hort --secret openrouter`; otherwise
  guide the user to configure `hort` from
  [sebastian-breitzke/hort](https://github.com/sebastian-breitzke/hort), or to
  configure their approved local secret manager. Never ask for or persist the
  credential in chat.
- The validated response is transcript-only. Do not claim word timestamps,
  diarization, or glossary bias unless a compatibility test proves support.

## Workflow

1. Keep the source file immutable.
2. Run `scripts/transcribe-openrouter.sh <source-media> <output.txt>`.
3. The script extracts compact mono audio, splits it into 15-minute chunks,
   submits each chunk, and merges returned text in chronological order.
4. Read the output's beginning, middle, and end before relying on it. Retain
   source, duration, model, and transcription date when research needs
   provenance.

## Cost And Scope

- Default model: `mistralai/voxtral-mini-transcribe`. Verify current provider
  pricing before a large batch.
- Before a meaningful paid batch, state source count, total duration, estimated
  cost, and whether timestamps or diarization are required; obtain approval.
- Override the default language only when known:
  `TRANSCRIPTION_LANGUAGE=de` or `TRANSCRIPTION_LANGUAGE=en`.

## Verification

- Confirm the output is non-empty.
- Spot-check terminology against at least three moments of the media.
- If a chunk fails, stop and report the chunk number; do not silently omit it.

## Sources

- <https://openrouter.ai/docs/guides/overview/multimodal/stt>
- <https://openrouter.ai/mistralai/voxtral-mini-transcribe/pricing>
