#!/usr/bin/env bash
# Loop over scripts/top-pairs.txt, generate VsCopy for each, sleep
# a randomized 30-90s between iterations to be polite to the API.
#
# Usage: ./scripts/gen-all-vs-copy.sh [--force]
#
# Resumable: skips pairs that already have vs-overrides/<pair>.ts
# (unless --force is passed, which regenerates every pair).

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LIST="$REPO_ROOT/scripts/top-pairs.txt"
FORCE="${1:-}"

if [ ! -f "$LIST" ]; then
  echo "Missing $LIST" >&2
  exit 2
fi

mapfile -t PAIRS < <(grep -v '^\s*#' "$LIST" | grep -v '^\s*$')
TOTAL=${#PAIRS[@]}
i=0
for PAIR in "${PAIRS[@]}"; do
  i=$((i + 1))
  echo "" >&2
  echo "════════════════════════════════════════════════════════════" >&2
  echo "[$i/$TOTAL] $PAIR" >&2
  echo "════════════════════════════════════════════════════════════" >&2

  if "$REPO_ROOT/scripts/gen-vs-copy.sh" "$PAIR" "$FORCE"; then
    :
  else
    echo "[warn] $PAIR failed — continuing" >&2
  fi

  if [ "$i" -lt "$TOTAL" ]; then
    SLEEP=$(( RANDOM % 61 + 30 ))   # 30..90s
    echo "[sleep] ${SLEEP}s before next pair..." >&2
    sleep "$SLEEP"
  fi
done

echo "" >&2
echo "[all-done] $TOTAL pairs processed" >&2
