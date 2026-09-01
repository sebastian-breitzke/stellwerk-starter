#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  printf 'Usage: %s <source-media> <output.txt>\n' "$0" >&2
  exit 2
fi

source_media="$1"
output_path="$2"
model="${TRANSCRIPTION_MODEL:-mistralai/voxtral-mini-transcribe}"
segment_seconds="${TRANSCRIPTION_SEGMENT_SECONDS:-900}"
language="${TRANSCRIPTION_LANGUAGE:-en}"

if [[ ! -f "$source_media" ]]; then
  printf 'Source media does not exist: %s\n' "$source_media" >&2
  exit 2
fi

if ! command -v ffmpeg >/dev/null || ! command -v curl >/dev/null || ! command -v jq >/dev/null || ! command -v hort >/dev/null; then
  printf 'Required commands: ffmpeg, curl, jq, hort\n' >&2
  exit 2
fi

work_dir="$(mktemp -d /tmp/transcription.XXXXXX)"
trap 'rm -rf "$work_dir"' EXIT
audio_path="$work_dir/audio.mp3"
chunk_pattern="$work_dir/chunk-%03d.mp3"
partial_path="$work_dir/transcript.partial.txt"

ffmpeg -nostdin -hide_banner -loglevel error -i "$source_media" -vn -ac 1 -ar 16000 -b:a 24k "$audio_path"
ffmpeg -nostdin -hide_banner -loglevel error -i "$audio_path" -f segment -segment_time "$segment_seconds" -reset_timestamps 1 -c copy "$chunk_pattern"

chunks=("$work_dir"/chunk-*.mp3)
if [[ ! -e "${chunks[0]}" ]]; then
  printf 'No audio chunks were created.\n' >&2
  exit 1
fi

api_key="$(hort --secret openrouter)"
: > "$partial_path"

for chunk_path in "${chunks[@]}"; do
  response_path="$chunk_path.json"
  curl --fail-with-body --silent --show-error --max-time 180 \
    'https://openrouter.ai/api/v1/audio/transcriptions' \
    -H "Authorization: Bearer $api_key" \
    -F "model=$model" \
    -F "language=$language" \
    -F "file=@$chunk_path" \
    -o "$response_path"

  text="$(jq -r '.text // empty' "$response_path")"
  if [[ -z "$text" ]]; then
    printf 'Empty transcript response for %s\n' "$(basename "$chunk_path")" >&2
    exit 1
  fi
  printf '%s\n\n' "$text" >> "$partial_path"
done

mkdir -p "$(dirname "$output_path")"
mv "$partial_path" "$output_path"
printf 'Transcript written: %s\n' "$output_path"
