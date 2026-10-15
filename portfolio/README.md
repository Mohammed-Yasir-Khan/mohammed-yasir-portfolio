# Mohammed Yasir Khan: Portfolio

> Full guide (architecture, content, deploy, fix-it cookbook): see **[SPEC.md](SPEC.md)**. Screenshots: `docs/preview/`.

Next.js (frontend) + FastAPI (backend). Design source: Stitch export in `design/`.

## Run locally

```powershell
./start-dev.ps1          # starts backend :8000 and frontend :3000
```

Or manually:

```powershell
# backend
cd backend
python -m venv .venv; .\.venv\Scripts\pip install -r requirements.txt
copy .env.example .env   # then fill in
.\.venv\Scripts\uvicorn app.main:app --reload --port 8000

# frontend
cd frontend
npm install
copy .env.example .env.local
npm run dev
```

## Secrets

- Real secrets live only in `backend/.env` (gitignored). Template: `backend/.env.example`.
- `frontend/.env.local` holds only public values (`NEXT_PUBLIC_*`): API URL, site URL, email, GitHub, LinkedIn.
- Without SMTP settings, contact messages are saved to `backend/data/messages.jsonl` (local dev only).

## Add content

- New project: add `frontend/content/projects/<slug>.mdx` (copy an existing one, set `sample: false`).
- New blog post: add `frontend/content/blog/<slug>.mdx`.
- Personal details, experience, skills: `frontend/src/lib/profile.ts` (search for `TODO`).
- Resume: put `resume.pdf` in `frontend/public/` and set `hasResume: true` in `profile.ts`.

## Structure

```
backend/    FastAPI: /api/health, /api/contact (validation, honeypot, rate limit, SMTP)
frontend/   Next.js App Router, Tailwind v4, MDX content, dark/light theme, Ctrl+K palette
design/     Stitch prompts and exports
```
