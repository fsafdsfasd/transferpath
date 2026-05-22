#!/usr/bin/env bash
# Creates a new PUBLIC GitHub repo and pushes the current branch.
# Prerequisites: GitHub CLI — run `gh auth login` once.
set -euo pipefail

REPO_NAME="${1:-transferpath}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v gh >/dev/null 2>&1; then
  echo "Install GitHub CLI: brew install gh"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Run: gh auth login"
  exit 1
fi

if git remote get-url origin >/dev/null 2>&1; then
  echo "Remote 'origin' already exists. Push with: git push -u origin main"
  exit 0
fi

gh repo create "$REPO_NAME" --public --source=. --remote=origin --push --description "TransferPath — Texas transfer planning app (Next.js + Supabase)"
echo ""
echo "Done. Repo URL:"
gh repo view --web 2>/dev/null || gh repo view "$REPO_NAME" --json url -q .url
