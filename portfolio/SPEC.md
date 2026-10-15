# SPEC: Mohammed Yasir Khan Portfolio

Single document to understand, fix, move and deploy this project. Read top to bottom once; later use the
table of contents as a lookup.

1. [What this is](#1-what-this-is)
2. [Requirements log](#2-requirements-log-what-was-asked-and-what-was-done)
3. [Tech stack, APIs and cost](#3-tech-stack-apis-and-cost)
4. [Folder map: what lives where and why](#4-folder-map-what-lives-where-and-why)
5. [How it works](#5-how-it-works)
6. [Design system](#6-design-system)
7. [Content guide: projects, blog, photo, resume](#7-content-guide)
8. [Backend and environment variables](#8-backend-and-environment-variables)
9. [Setup on a new laptop](#9-setup-on-a-new-laptop)
10. [Deploy to Vercel](#10-deploy-to-vercel)
11. [Fix-it cookbook](#11-fix-it-cookbook)
12. [How the site looks](#12-how-the-site-looks-preview)
13. [Open TODOs and known limits](#13-open-todos-and-known-limits)

---

## 1. What this is

Personal portfolio for **Mohammed Yasir Khan** (SRE at Zycus, previously DevSecOps intern; positions as
DevOps / SRE / AI engineer). Design came from Google Stitch (`design/exports/`, system name "Obsidian SRE
Editorial"): editorial serif headlines, mono "ops console" details, one ember-orange accent, dark and light themes.

- **Frontend:** Next.js (App Router) in `frontend/`.
- **Backend:** FastAPI in `backend/` (contact form only, plus a health check).
- **Content:** Markdown/MDX files, no database.

## 2. Requirements log: what was asked and what was done

| # | Requirement | Status / where |
|---|---|---|
| 1 | Professional, unique, not AI-looking UI; dark and light mode | Done. Tokens in `globals.css`, toggle in `ThemeToggle.tsx` |
| 2 | Design first in Stitch, then code | Done. Prompts in `design/stitch-prompts.md`, export in `design/exports/` |
| 3 | Next.js frontend, Python backend | Done (`frontend/`, `backend/`) |
| 4 | Secrets in env file | Done. `backend/.env` (gitignored). Frontend only has public `NEXT_PUBLIC_*` |
| 5 | Add projects easily | Done. One `.mdx` file per project |
| 6 | Blog section, separate from projects, Medium-style (cover image, title, description) | Done. `/blog` feed with thumbnails, home page cards, external-link posts supported |
| 7 | Navigation: Work (projects) and Writing (blog) | Done. Kept as is |
| 8 | Resume download option | Done. Hero, About, footer, Ctrl+K. Drop `frontend/public/resume.pdf` |
| 9 | Profile picture | Done. Drop `frontend/public/profile.jpg`; shows on About and home card |
| 10 | Role-based descriptions (DevOps / SRE / AI) | Done. `roles` in `src/lib/profile.ts`; switcher on home, "What I do" on About |
| 11 | Explain the terminal-style icon | It is the **command palette** button (see 5.4). On mobile it is now a search icon |
| 12 | Smoother, more polished CSS | Smooth scroll (Lenis), page fade-in, scroll reveals, theme cross-fade, hover states, focus rings, reading-progress bar |
| 13 | Easy setup on another laptop and Vercel deploy | `setup.ps1`, `setup.sh`, sections 9 and 10 |
| 14 | One doc explaining all code | This file |
| 15 | Temporary external blog link as an example | `content/blog/monitoring-distributed-systems-sre-book.mdx` (Google SRE book) |
| 16 | See how the site looks | Screenshots in `docs/preview/`, section 12 |
| 17 | Know which APIs are used and if all free | Section 3 |
| 18 | Real projects: weekly patch / minor / major release automation | Done. `content/projects/cicd-release-automation.mdx` (one project, three release types explained) |
| 19 | Real project: Pingdom alert aggregation (where alerts come from, architecture) | Done. `content/projects/alert-gateway-pingdom.mdx` |
| 20 | Real project: CI/CD KPI platform | Done. `content/projects/cicd-kpi-platform.mdx` |
| 21 | Real project: workaround agent | Done. `content/projects/workaround-agent.mdx` |
| 22 | Same four topics as blog posts, in plain English | Done. Four posts in `content/blog/` (see 7.7) |
| 23 | No credentials in any content | Done. No tokens, keys, webhook URLs, hostnames, IPs, account or ticket IDs, internal channel names or customer data |
| 24 | Resume details on the site (experience, education, skills, certifications, links) | Done. `src/lib/profile.ts`. Phone number deliberately not published |
| 25 | Resume source saved | `docs/resume/resume.tex` (gitignored: it holds the phone number). Compile it and save as `frontend/public/resume.pdf` |
| 26 | Remove fake sample projects and posts | Done. Only the external-link example post still carries a SAMPLE tag |
| 27 | Explain what to change when adding something new | Section 7.6 |
| 28 | Architecture diagrams for minor release, major release, workflows and the other projects, same style as the cards, inside project pages and an Architecture section in each blog post | Done. Section 7.8. Close-ups in `docs/preview/arch-*.png` |
| 29 | Fix the card diagrams (last box wrapped to a second row with a dangling arrow) | Done. `FlowDiagram.tsx` is always one row |

Output language rule: everything written in this repo is English only.

## 3. Tech stack, APIs and cost

Nothing here calls a paid or third-party API at runtime. The only outbound call is optional SMTP for email.

| Piece | What | Why this choice | Cost |
|---|---|---|---|
| Next.js 16 + React 19 | Frontend framework | Static pages (fast, SEO friendly), first-class Vercel support | Free (MIT) |
| Tailwind CSS v4 | Styling | Tokens as CSS variables, small output | Free (MIT) |
| next/font (Google Fonts) | Playfair Display, Geist, JetBrains Mono | Downloaded at build time and self-hosted, so no runtime call to Google | Free |
| lucide-react | Icons | Small, tree-shaken SVG icons | Free (ISC) |
| next-themes | Dark/light toggle, no flash on load | Handles SSR and system preference | Free (MIT) |
| Lenis | Smooth scrolling | ~3 KB, respects reduced-motion | Free (MIT) |
| gray-matter, next-mdx-remote, reading-time | Read `.mdx` files, render Markdown, estimate read time | Content as files, no CMS | Free (MIT) |
| FastAPI + uvicorn + pydantic | Contact API | Validation built in, tiny | Free (MIT) |
| SMTP (Gmail, etc.) | Sends contact messages to you | Standard, no extra service | Free (Gmail limits apply) |
| Vercel Hobby plan | Hosting | Zero-config Next.js hosting | Free for personal, non-commercial use (check Vercel's current terms) |
| **Domain name** | Your own address | Only unavoidable cost | Paid, roughly a yearly fee |

Gmail SMTP tip: use a personal Gmail with 2-step verification and an **App password**. Do not use your Zycus
mailbox for a personal site.

## 4. Folder map: what lives where and why

```
portfolio/
├── SPEC.md                  this file
├── README.md                short run instructions
├── setup.ps1 / setup.sh     one-time setup on a new machine
├── start-dev.ps1            starts backend + frontend (Windows)
├── .gitignore               ignores .env files, node_modules, venv, logs
├── docs/preview/            screenshots of every page (dark, light, mobile)
├── design/
│   ├── stitch-prompts.md    the prompts used in Stitch
│   └── exports/             raw Stitch export (reference only, gitignored)
├── backend/
│   ├── app/main.py          FastAPI app: CORS + routes + /api/health
│   ├── app/config.py        reads backend/.env into typed settings
│   ├── app/contact.py       POST /api/contact: validate, honeypot, rate limit, SMTP or file
│   ├── api/index.py         Vercel serverless entrypoint (re-exports the app)
│   ├── vercel.json          routes every URL to api/index.py
│   ├── requirements.txt     Python dependencies
│   ├── .env.example         template; copy to .env (secrets, never committed)
│   └── data/                local-only saved messages (gitignored)
└── frontend/
    ├── content/
    │   ├── projects/*.mdx   one file = one project
    │   └── blog/*.mdx       one file = one post
    ├── public/              static files: resume.pdf, profile.jpg, blog cover images
    ├── .env.example         template for frontend/.env.local (public values only)
    └── src/
        ├── app/             routes (each folder = a URL)
        │   ├── layout.tsx       global shell: fonts, theme, navbar, footer, palette
        │   ├── globals.css      design tokens, utilities, animations, prose styles
        │   ├── page.tsx         Home
        │   ├── projects/        /projects and /projects/[slug]
        │   ├── blog/            /blog and /blog/[slug]
        │   ├── about/ contact/  /about and /contact
        │   ├── not-found.tsx    404 page
        │   └── icon.svg         favicon
        ├── components/      UI building blocks (table below)
        └── lib/
            ├── profile.ts       YOUR details: name, roles text, experience, skills
            ├── content.ts       reads and parses content/*.mdx
            └── photo.ts         detects public/profile.* if it exists
```

### Components

| File | Purpose |
|---|---|
| `Navbar.tsx` | Top bar: wordmark, "Available for work" pill, links, Ctrl+K button, theme toggle |
| `BottomNav.tsx` | Mobile-only tab bar (Home, Work, Writing, About, Contact) |
| `Footer.tsx` | Status line, last build date, links incl. Resume |
| `CommandPalette.tsx` | Ctrl+K quick search/actions (see 5.4) |
| `ThemeProvider.tsx`, `ThemeToggle.tsx` | Dark/light handling (class on `<html>`) |
| `SmoothScroll.tsx` | Lenis smooth scrolling |
| `HomeTop.tsx` | Home hero, role switcher, "what I do" row, selected work (client component) |
| `ProjectsExplorer.tsx` | /projects grid with role filters (client component) |
| `FlowDiagram.tsx` | Small line-art architecture diagram from a project's `flow` list |
| `BlogList.tsx` | /blog feed with tag filter (client component) |
| `PostViews.tsx` | `PostCard` (home grid) and `PostRow` (Medium-style feed row) |
| `Cover.tsx` | Post cover: your image if set, otherwise generated art from the slug |
| `ReadingProgress.tsx` | Thin progress bar on blog posts |
| `ProfilePhoto.tsx` | Photo or monogram fallback |
| `ContactForm.tsx`, `CopyEmail.tsx` | Contact form, copy-to-clipboard email |
| `Mdx.tsx` | Renders Markdown body, adds heading ids for the table of contents |
| `ui.tsx` | Small shared pieces: SectionLabel, Tag, SampleChip, PageHeader, Button |
| `StatusDot.tsx` | The green pulsing dot |

Why `components/` vs `lib/`: components render UI; `lib/` holds plain data and file-reading code with no UI,
so you can change content without touching layout.

## 5. How it works

### 5.1 Pages are static
All pages are generated at build time (`npm run build`). Content `.mdx` files are read from disk by
`lib/content.ts`, so there is no database and no server needed for the frontend. This is why it is fast and
free to host.

### 5.2 Client vs server components
Files starting with `"use client"` run in the browser (anything interactive: filters, theme, palette,
forms). Everything else runs at build time. Rule: only add `"use client"` when you need state, effects or
browser APIs.

### 5.3 Dark / light mode
`next-themes` puts `class="dark"` on `<html>`. `globals.css` defines the same token names in `:root` (light)
and `.dark` (dark). Components never use raw colors; they use token classes like `bg-surface`, `text-muted`,
`border-border`, `text-accent`. Change a token and the whole site follows. The default is dark; the choice is
saved in `localStorage`.

### 5.4 The terminal-like icon / "Ctrl K"
This is a **command palette** (like VS Code or GitHub). Press **Ctrl+K** (or click the button) to open a
search box: type to jump to any page, project or blog post, toggle the theme, copy your email or download your
resume. On desktop it shows as a `Ctrl K` chip; on mobile it is a search icon. Code: `CommandPalette.tsx`.

### 5.5 Role switcher
`HomeTop.tsx` keeps the selected role (`devops` / `sre` / `ai`). It changes the subline, focus, stack, the
three "what I do" blocks, and re-orders featured projects so those tagged with that role come first. All text
comes from `roles` in `lib/profile.ts`; project role tags come from each project's `roles:` frontmatter.

### 5.6 Contact form flow
Browser → `POST {NEXT_PUBLIC_API_URL}/api/contact` → FastAPI validates (name, email, topic, 10-5000 chars) →
honeypot check (hidden `website` field; bots fill it, people don't) → per-IP rate limit → SMTP email to you.
If SMTP is not configured (local dev) the message is saved to `backend/data/messages.jsonl` instead.

## 6. Design system

Source of truth: `frontend/src/app/globals.css` (and `design/exports/.../DESIGN.md` for the original spec).

| Token | Dark | Light | Used for |
|---|---|---|---|
| `bg` | `#0F0E0D` | `#F6F3EE` | Page background |
| `surface` / `surface-2` | `#171513` / `#1D1A17` | `#FFFFFF` / `#EFEAE2` | Cards / hover |
| `border` / `border-strong` | `#2A2622` / `#3E3933` | `#E1DBD2` / `#B9B0A3` | Hairlines |
| `fg` / `fg-2` / `muted` | `#F2EEE8` / `#C9C1B6` / `#8D857B` | `#1A1714` / `#4A433A` / `#6F675D` | Text levels |
| `accent` | `#FF6B2C` | `#D9480F` | Ember orange: buttons, links, active states |
| `status` | `#3FB67A` | `#2B8A5B` | Green "operational" dot only |

Fonts (set in `layout.tsx`): **Playfair Display** (headlines), **Geist** (body), **JetBrains Mono** (labels, code).
Utilities in `globals.css`: `label-caps`, `label-code`, `display-hero`, `headline-xl`, `headline-lg`,
`container-page`, `.reveal` (scroll fade-in), `.page-enter`, `.prose-custom` (blog/project body styles).

Style rules kept from the design: 1px hairlines, radius 6px max, no blur or glow, mono uppercase labels.

## 7. Content guide

### 7.1 Add a project
Create `frontend/content/projects/<slug>.mdx`:

```mdx
---
title: My Project
summary: One-line description. Quote it if it contains a colon.
year: "2025"
category: "SRE // INFRASTRUCTURE"
roles: [sre, devops]            # any of: devops, sre, ai
tags: [Kubernetes, Terraform]
flow: ["Source", "Step 2", "Step 3", "Result"]   # architecture diagram nodes, left to right
stats:                           # optional, only add real numbers
  - { label: "Deploy time", value: "5 min" }
links:
  - { label: "GitHub", href: "https://github.com/you/repo" }
featured: true
order: 1                         # lower = earlier
sample: false                    # true shows a SAMPLE tag; set false for real projects
---

## Problem
...
```

### 7.2 Add a blog post
Create `frontend/content/blog/<slug>.mdx`:

```mdx
---
title: My post title
excerpt: Two lines that sell the post (shown on cards and in the feed).
date: 2025-06-01
tags: [SRE, Kubernetes]
cover: /blog/my-post.jpg        # optional; put the image in frontend/public/blog/. Generated art if omitted
sample: false
---

Body in Markdown. `##` headings build the table of contents automatically.
```

**Post hosted elsewhere** (Medium, dev.to, company blog): same file but add
`externalUrl: https://...`, `source: Medium` and `minutes: 6`. The card links out in a new tab and no local
page is generated. See `content/blog/monitoring-distributed-systems-sre-book.mdx`.

Cover image tips: 16:10 ratio (e.g. 1600x1000), JPG/WebP, under ~300 KB.

### 7.3 Profile photo
Save a square-ish photo as `frontend/public/profile.jpg` (also accepts `.jpeg`, `.png`, `.webp`). Appears on
About and in the home overview card. Without it, a monogram "MYK" shows.

### 7.4 Resume
Save your PDF as `frontend/public/resume.pdf`. The Resume buttons (hero, About, footer, Ctrl+K) download it as
`Mohammed-Yasir-Khan-Resume.pdf` (change in `profile.ts` → `resumeFileName`). Until the file exists, the
button leads to a 404.

### 7.5 Personal details
Edit `frontend/src/lib/profile.ts`: name, tagline, location, summary, role descriptions (`roles`),
experience, education, skills, certifications. These come from your resume.
Email, GitHub and LinkedIn have real defaults in `profile.ts`; the env vars `NEXT_PUBLIC_CONTACT_EMAIL`,
`NEXT_PUBLIC_GITHUB_URL`, `NEXT_PUBLIC_LINKEDIN_URL` override them (an empty value in the env file hides nothing,
it just uses the default). Your phone number is not on the site on purpose.

### 7.6 Checklist: what to change when you add something new

| You are adding... | Files to touch | Anything else? |
|---|---|---|
| **A new project** | Create `frontend/content/projects/<slug>.mdx` (copy `workaround-agent.mdx`) | Nothing. Home, /projects, the filters, Ctrl+K and the "next project" link all update by themselves. Set `order` to place it, `featured: true` to make it eligible for the home page (the first 3 for the selected role are shown) |
| **A new blog post** | Create `frontend/content/blog/<slug>.mdx` | Optional cover image in `frontend/public/blog/` and `cover: /blog/<file>` in the frontmatter |
| **A post hosted elsewhere** | New `.mdx` with `externalUrl`, `source`, `minutes` | Copy `monitoring-distributed-systems-sre-book.mdx` |
| **A new job / role** | `profile.ts` → `experience` (newest first) | None |
| **A new skill, cert or degree** | `profile.ts` → `skills`, `certifications`, `education` | None |
| **A new tag filter on Work** | Tags are free text. Role filters (DevOps / SRE / AI) come from the `roles:` list in each project | To add a 4th role you must edit `RoleKey` and `roles` in `profile.ts` |
| **A new page** (e.g. /talks) | Create `frontend/src/app/talks/page.tsx` | Add it to `Navbar.tsx` (`links`), `BottomNav.tsx` (`tabs`) and `CommandPalette.tsx` (pages list) |
| **A new accent color / font** | See the cookbook (section 11) | None |
| **A new contact-form topic** | `ContactForm.tsx` (`topics`) **and** `backend/app/contact.py` (the `subject` Literal) | Both must match or the API returns a validation error |
| **A new backend endpoint** | New router file in `backend/app/`, then `app.include_router(...)` in `backend/app/main.py` | Add its URL to the frontend where it is called |
| **A new env variable** | Frontend: `.env.local`, `.env.example` and Vercel settings. Backend: `.env`, `.env.example`, `config.py` and Vercel settings | Never put secrets in `NEXT_PUBLIC_*` |

Release flow for any content change: edit the file → `npm run build` (catches bad frontmatter) → `git push` → Vercel redeploys.

### 7.8 Architecture diagrams (inside project pages and blog posts)

Two kinds of diagram, both in the same visual style (orange = where it starts, green = outcome, dashed = outside
system or storage):

| Kind | Where it shows | How to set it |
|---|---|---|
| **Card diagram**: one row of 3 to 4 boxes | Project cards on /projects, the home page and the top of each project page | Frontmatter `flow: ["Source", "Step", "Step", "Result"]` in the project `.mdx`. Keep each label short (1 to 3 words). Code: `FlowDiagram.tsx`. It always stays on one row |
| **Architecture diagram**: several rows, labels, arrows, notes | Inside the body of any project or blog `.mdx` | The `<Arch />` tag, below. Code: `Arch.tsx` (registered for MDX in `Mdx.tsx`) |

Example (paste into a project or blog `.mdx`, no blank lines inside the tag):

```mdx
<Arch title="My architecture" layers={[
  { label: "Input", gap: "sends a webhook", nodes: [{ t: "Source", tone: "accent" }, { t: "Gateway", sub: "checks the secret" }] },
  { label: "Output", nodes: [{ t: "Database", tone: "ext" }, { t: "Dashboard", tone: "status" }] },
]} />
```

- A **layer** is one row. `label` is the small caption on the left. `gap` is the text beside the down arrow that leaves the row.
- Nodes in a row are joined by arrows (a sequence). Use `link: "none"` for alternatives or parallel items, and `after: "none"` when the next row is an alternative rather than a next step.
- A **node** is a string, or `{ t: "title", sub: "small description", tone: "accent" | "status" | "warn" | "ext" }`.
- Keep to 4 or 5 nodes per row. On phones the rows turn into vertical lists automatically.
- Diagrams that exist today: weekly patch, minor release, batch engine and major release (`cicd-release-automation.mdx`); alert gateway and the six Lambda steps; the KPI pipeline and the agents with shared state; the workaround agent flow and its safety chain. Each blog post has an Architecture section with a smaller version.
- Technical note: `Mdx.tsx` sets `blockJS: false` so the `layers={[...]}` expressions work. That is safe because only your own files are rendered. Do not render MDX written by other people with this setting.

### 7.7 Where the real content came from (and the confidentiality rule)

The project and blog write-ups were written from these local sources (read-only, nothing copied verbatim):

| Topic | Source folder |
|---|---|
| Weekly patch, minor, major release automation | `Desktop/sre-agent-system/CICD-Release-Orchestration-Automation/` (READMEs and specs per release type), plus `Yasir/Minor-Release-Orchestration-Overview.md` |
| Alert gateway | `Desktop/pagerduty-alert-aggregation-without-aiops/README.md` |
| CI/CD KPI platform | `Yasir/arch/CICD_KPI_PLATFORM_MASTER_BLUEPRINT.md`, `Yasir/arch/INTERVIEW_PREPARATION_SRE_AGENT_SYSTEM.md` |
| Workaround agent | `Desktop/team-notifications/sre-agent-system/workaround-agent/DESIGN.md` and the blueprint above |
| Resume facts | The LaTeX resume (saved in `docs/resume/`) |

Rule for all public content: **no credentials of any kind** (tokens, API keys, webhook URLs, passwords), and also
no internal hostnames, IPs, subnet or account IDs, ticket numbers, chat-channel names, customer names or raw
internal metrics. Describe how it works in general terms. Those source folders contain `.env` files, which were
never opened. Before publishing, also check that your employer is fine with this level of detail.

Facts to double-check (written from design documents, so confirm they match what you personally built):
- The alert gateway: your resume says **Terraform**; the repo's infra file is an AWS **SAM** template. The write-up says "infrastructure as code".
- The workaround agent: its design document still says "build in progress" in places. The write-up describes it as designed and built.
- The KPI platform: the blueprint describes the wider platform (agents, dashboard). Your resume lists the Python job and reporting. Trim the write-up if some parts were built by teammates.

## 8. Backend and environment variables

### backend/.env (secret, never commit)

| Variable | Meaning | Example |
|---|---|---|
| `CORS_ORIGINS` | Frontend URL(s) allowed to call the API, comma-separated | `https://yourdomain.com,http://localhost:3000` |
| `CONTACT_TO_EMAIL` | Where messages are delivered | your personal email |
| `SMTP_HOST`, `SMTP_PORT` | Mail server | `smtp.gmail.com`, `587` |
| `SMTP_USER`, `SMTP_PASSWORD` | Mail login (Gmail: app password) | |
| `SMTP_FROM` | From address | same as user |
| `CONTACT_RATE_LIMIT_PER_HOUR` | Max messages per IP per hour | `5` |

### frontend/.env.local (public, safe to expose)

| Variable | Meaning |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend URL (`http://localhost:8000` locally) |
| `NEXT_PUBLIC_SITE_URL` | Your public site URL (metadata) |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `_GITHUB_URL`, `_LINKEDIN_URL` | Links shown in the UI |

Anything prefixed `NEXT_PUBLIC_` is embedded in the browser bundle. Never put a password or key there.

Endpoints: `GET /api/health` → `{"status":"operational"}`; `POST /api/contact` → `{"ok":true}`; interactive
docs at `/docs` locally.

## 9. Setup on a new laptop

### 9.0 First time only: put the project on GitHub (this folder is not a git repo yet)

Without this there is nothing to clone on another laptop or to connect to Vercel.

```powershell
cd C:\Users\mohammed.khan\Desktop\Yasir\portfolio
# create-next-app left a separate git repo inside frontend/. Remove it first, otherwise the root repo
# would treat frontend as an embedded repo and not push your frontend files. (It only holds the empty
# starter commit; nothing of yours is lost.)
Remove-Item frontend\.git -Recurse -Force
git init -b main
git add .
git status                      # check: no .env, no node_modules, no .venv, no docs/resume in the list
git commit -m "Initial portfolio"
# create an empty repo on github.com (no README), then:
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

What is **not** pushed on purpose (see `.gitignore`): `backend/.env`, `frontend/.env.local`, `node_modules`, `.venv`,
`docs/resume/` (phone number) and `design/exports/`. What **is** pushed and must be there: `frontend/content/`,
`frontend/public/` (put `resume.pdf` and `profile.jpg` there first), `frontend/src/lib/profile.ts`, `SPEC.md`.
Keep the repo **private** if you are unsure about anything in it.

### 9.1 On the new laptop

Needs **Node 20.9+** (22 recommended, see `frontend/.nvmrc`), **Python 3.10+** and git.

```powershell
git clone https://github.com/<your-username>/portfolio.git ; cd portfolio
./setup.ps1            # Windows. macOS/Linux: bash setup.sh
# edit backend/.env and frontend/.env.local
./start-dev.ps1        # frontend http://localhost:3000, backend http://localhost:8000/docs
```

`setup` creates the Python venv, installs both sets of dependencies and copies the `.env.example` files.
Your real `.env` files are not in git, so copy those values over manually (or re-enter them).

## 10. Deploy to Vercel

Not yet tested on a live Vercel account; the steps below follow Vercel's standard flow for a Next.js app and a
Python serverless app, so verify the first deploy.

Push the repo to GitHub, then create **two** Vercel projects from the same repo:

**A. Backend (deploy first)**
1. New Project → import repo → **Root Directory: `backend`** → Framework: Other.
2. Environment variables: everything from the `backend/.env` table. `CORS_ORIGINS` = your final site URL.
3. Deploy. Open `https://<backend>.vercel.app/api/health` to confirm.
4. Serverless limits: no persistent disk, so **SMTP must be configured** (the local file fallback does not
   work), and the rate limiter is per instance (best-effort). Acceptable for a portfolio.

**B. Frontend**
1. New Project → same repo → **Root Directory: `frontend`** → Framework: Next.js (auto-detected).
2. Environment variables: `NEXT_PUBLIC_API_URL` = backend URL from step A, `NEXT_PUBLIC_SITE_URL`, plus the
   email/GitHub/LinkedIn values.
3. Deploy.

**C. Domain**
Buy a domain, then Vercel → frontend project → Settings → Domains → add it and follow the DNS instructions.
Update `NEXT_PUBLIC_SITE_URL` and backend `CORS_ORIGINS` to the final URL and redeploy both.

Every `git push` to the main branch redeploys automatically. Editing content (`.mdx`) and pushing is all it
takes to publish a new project or post.

## 11. Fix-it cookbook

| I want to... | Do this |
|---|---|
| Change the accent color | `globals.css`: `--accent` / `--accent-hover` in `:root` (light) and `.dark` (dark) |
| Change fonts | `layout.tsx` (import another `next/font/google` font) and `--font-*` in `globals.css` |
| Add a nav link | `Navbar.tsx` (`links` array), `BottomNav.tsx` (`tabs`), and `CommandPalette.tsx` (pages list) |
| Change hero headline | `profile.ts` → `tagline` |
| Change role text | `profile.ts` → `roles` |
| Remove the "Available for work" pill | `profile.ts` → `status`, or delete the pill block in `Navbar.tsx` |
| Hide the SAMPLE tags | Set `sample: false` in each content file |
| A page shows 404 for a project | Slug = file name; check the `.mdx` exists and frontmatter YAML is valid |
| Build fails with "YAMLException" | A frontmatter value contains `: `; wrap that value in quotes |
| Contact form says it could not send | Check backend is running, `NEXT_PUBLIC_API_URL`, `CORS_ORIGINS` and SMTP values |
| Resume button gives 404 | Add `frontend/public/resume.pdf` |
| Styles look stale | Stop dev server, delete `frontend/.next`, run `npm run dev` |
| Check code quality | `npm run lint` and `npm run build` in `frontend/` (both pass today) |

## 12. How the site looks (preview)

Screenshots are in `docs/preview/` (dark, light and mobile):

| File | Page |
|---|---|
| `01-home-dark.png`, `02-home-light.png` | Home: hero with role switcher, overview card, "what I do", selected work, experience, stack, writing cards, contact call-to-action |
| `03-blog-dark.png`, `04-blog-light.png` | Writing feed: Medium-style rows with title, description, tags, read time and a cover thumbnail; external post marked with its source |
| `05-blog-post-dark.png` | Article: table of contents, reading progress bar, cover, styled code blocks |
| `06-projects-dark.png`, `07-project-detail-dark.png` | Work grid with role filters, and a project page with diagram, stack and write-up |
| `08-about-dark.png`, `09-about-light.png` | About: photo slot, role-based descriptions, experience, skills, certifications |
| `10-contact-dark.png` | Contact form |
| `11`-`13` mobile | Mobile home and blog with the bottom tab bar |
| `14-command-palette-dark.png` | The Ctrl+K palette |

To view it live: run `./start-dev.ps1` and open http://localhost:3000.

## 13. Open TODOs and known limits

- [x] Email, GitHub, LinkedIn, experience, education, skills, certifications (from the resume)
- [x] Four real projects and four real blog posts
- [ ] Read the four project pages and four posts once and fix anything that does not match what you personally did (see 7.7)
- [ ] More projects and posts (see 7.6)
- [ ] `public/profile.jpg` and `public/resume.pdf` (compile `docs/resume/resume.tex` on Overleaf)
- [ ] Delete the external-link example post when you add a real one
- [ ] SMTP credentials in `backend/.env` (personal mailbox)
- [ ] First Vercel deploy (untested), then buy and attach the domain
- Stitch only supplied dark, mostly mobile-style screens (home, projects, contact). Light mode and the
  other pages were derived from the design tokens, so check them against your taste.
- In-memory rate limiting resets on restart and is per instance on serverless.
- Placeholder content is tagged `SAMPLE`; never leave sample text or invented numbers on the live site.
- The website does not show metrics such as "% faster" because none were in your documents. Add them to a project's `stats:` only when you have real numbers.
