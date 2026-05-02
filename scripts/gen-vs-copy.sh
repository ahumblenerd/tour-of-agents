#!/usr/bin/env bash
# Generate VsCopy for one pair via `claude -p`.
#
# Usage: ./scripts/gen-vs-copy.sh <pair-slug> [--force]
#   pair-slug examples: crewai-vs-langchain, langchain-vs-mastra
#   --force              regenerate even if vs-overrides/<pair>.ts already exists
#
# Skills loaded by the prompt: competitor-alternatives + copywriting.
# CLAUDE.md from the project root is auto-loaded by claude -p.

set -euo pipefail

PAIR="${1:-}"
FORCE="${2:-}"

if [ -z "$PAIR" ]; then
  echo "Usage: $0 <pair-slug> [--force]" >&2
  exit 2
fi

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$REPO_ROOT/src/lib/seo/comparisons/vs-overrides/$PAIR.ts"

if [ -f "$OUT" ] && [ "$FORCE" != "--force" ]; then
  echo "[skip] $PAIR — already exists (use --force to regenerate)" >&2
  exit 0
fi

if ! command -v claude >/dev/null 2>&1; then
  echo "claude CLI not found on PATH" >&2
  exit 127
fi

PROMPT="$(node "$REPO_ROOT/scripts/build-vs-prompt.mjs" "$PAIR")"

echo "[gen] $PAIR — calling claude -p..." >&2

# --output-format text: raw stdout, no JSON wrapper from the CLI.
# --append-system-prompt: nudge headless agent to skip clarifications and just produce the JSON.
JSON="$(echo "$PROMPT" | claude -p \
  --output-format text \
  --append-system-prompt "Output exactly the JSON object specified. No prose. No code fences. Use the competitor-alternatives and copywriting skills.")"

if [ -z "$JSON" ]; then
  echo "[fail] $PAIR — empty response from claude" >&2
  exit 1
fi

echo "$JSON" | node "$REPO_ROOT/scripts/save-vs-copy.mjs" "$PAIR"
echo "[done] $PAIR" >&2
