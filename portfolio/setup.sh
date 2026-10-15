#!/usr/bin/env bash
# One-time setup on macOS/Linux. Needs Node 20.9+ and Python 3.10+.
set -euo pipefail
root="$(cd "$(dirname "$0")" && pwd)"

echo "== Backend =="
cd "$root/backend"
[ -d .venv ] || python3 -m venv .venv
.venv/bin/pip install -q -r requirements.txt
[ -f .env ] || { cp .env.example .env; echo "Created backend/.env: fill in your values"; }

echo "== Frontend =="
cd "$root/frontend"
npm install
[ -f .env.local ] || { cp .env.example .env.local; echo "Created frontend/.env.local: fill in your values"; }

echo "Done. Backend: cd backend && .venv/bin/uvicorn app.main:app --reload --port 8000"
echo "      Frontend: cd frontend && npm run dev"
