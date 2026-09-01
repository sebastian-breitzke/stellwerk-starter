---
name: youtube-research
description: Retrieve and analyze YouTube videos for research, lore, and summaries. Use when the task needs captions, transcripts, video evidence, or a reliable fallback after yt-dlp fails.
---

# YouTube Research

## Canonical Retrieval Order

1. Read title, channel, duration and available subtitles with yt-dlp metadata.
2. Fetch existing creator captions or auto-captions before downloading media. Preserve VTT when timestamps matter; plain text is enough for ordinary summaries.
3. If captions are absent, incomplete or demonstrably wrong, use `$transcription` on locally available media.
4. If yt-dlp media retrieval returns 403 or bot checks, retry once with a new, concrete hypothesis. Then, when the user has an authenticated browser session, use the Browser skill to inspect the visible YouTube page and supported retrieval options. Do not keep brute-forcing yt-dlp or silently drop the source.

## Transcript Fidelity

- **Summary, lore extraction, broad thematic research:** captions or plain transcription are normally sufficient; preserve the source URL and distinguish auto-captions from creator captions.
- **Who said what, speaker positions, debate analysis, quotes, timing, scene order, or evidence tied to a moment:** retain timestamps. Request diarization only when multiple voices must be attributed and the selected provider actually supports it.
- **High-stakes quotations:** verify against the video at the cited timestamp; never trust an auto-caption verbatim without a spot-check.

## Cost and Scope

- Caption-first is free and usually fastest.
- Before a paid transcription batch, report source count, total duration, chosen model, estimated cost and whether timestamps/diarization are required.
- A one-video transcription pilot is enough to validate a new provider path. Do not batch until its output is readable and complete.

## Output Record

For every used video, record URL, title, channel, duration, retrieval method, language, date, and fidelity class (`captions`, `plain_transcript`, `timestamped_transcript`, or `diarized_transcript`).
