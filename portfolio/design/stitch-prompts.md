# Stitch prompts: Mohammed Yasir Khan portfolio

Use: paste MASTER first, then one PAGE prompt per screen. Ask for dark and light variants of each.
Export HTML/CSS and screenshots into this folder (design/exports/<page>-<theme>).

## MASTER

Design a personal portfolio website for Mohammed Yasir Khan, a DevOps / SRE / AI Engineer.

Style: editorial minimal with subtle ops-console details. It must look art-directed, not like a template.
Avoid: purple-blue gradients, glassmorphism, emoji icons, stock illustrations, neon glow, generic SaaS hero.

Layout: strict 12-column grid, generous whitespace, very large display headlines, 1px hairline dividers,
small monospace section labels such as "01 / SELECTED WORK". Corner radius 6px max, no heavy shadows.

Typography: Instrument Serif for large headlines, Geist Sans for body text, JetBrains Mono for labels,
metadata and code. If a font is unavailable use the closest serif / grotesk / mono.

Color tokens:
- Dark: background #0F0E0D, surface #171513, border #2A2622, text #F2EEE8, muted #8D857B, accent ember orange #FF6B2C
- Light: background #F6F3EE, surface #FFFFFF, border #E1DBD2, text #1A1714, muted #6F675D, accent #D9480F
- Status green #3FB67A only for the tiny "available / operational" dot.

Ops details: status pill in the nav ("Available for work" with a green dot), a "Cmd+K" command-palette hint button,
monospace metadata like region, uptime, last deployed.

Global components: minimal sticky navbar (wordmark "MYK", links: Work, Writing, About, Contact),
sun/moon theme toggle, Cmd+K hint, quiet footer with socials and "Built with Next.js".

Deliver desktop (1440) and mobile (390). Provide BOTH dark and light versions of every screen.

## PAGE 1: Home

Hero: small mono label "SRE @ Zycus". A segmented role switcher "DevOps | SRE | AI" (mono, hairline border).
Huge serif headline: "I keep production boring." Subline: "SRE building reliable cloud platforms, automation and
AI-assisted operations." Two buttons: "View work" (accent filled) and "Download resume" (outline).
Beside the headline a small mono "status card": Currently: SRE at Zycus / Focus: Kubernetes, observability,
incident response / Stack: AWS, Terraform, ArgoCD, Prometheus.
Then sections:
01 / SELECTED WORK: three large full-width project rows (index number, title, one-line description, tag chips, year, arrow).
02 / EXPERIENCE: compact timeline, 2 entries (SRE at Zycus, present; DevSecOps Intern, previous).
03 / STACK: grouped grid (Cloud, Containers, CI/CD, Observability, Security, AI) with text tags, no logos soup.
04 / WRITING: three latest posts as a clean list (date, title, reading time).
Closing CTA: giant serif "Let's build something reliable." with email button. Footer.

## PAGE 2: Projects index

Big title "Work", mono count "(08)". Filter chips: All, DevOps, SRE, AI, Cloud. Grid of project cards: architecture-diagram
style thumbnail (line art, not photos), title, one-line summary, tech tags, year. Hover state described with an accent underline.

## PAGE 3: Project detail

Header: title, mono meta table (Role, Stack, Year, Links to GitHub/Live). Sections: Problem, Approach, Architecture
(a clean line-art diagram placeholder), Implementation (code block in mono), Results (row of 3 stat numbers),
Lessons. Bottom: "Next project" large link.

## PAGE 4: Blog index and post

Index: simple editorial list with date, title, excerpt, tags, reading time, tag filter.
Post: 680px reading column, sticky table of contents on the left (desktop), styled code blocks, callout box,
author line, share row, related posts.

## PAGE 5: About and Experience

Short personal story with a photo placeholder (square, subtle border). Timeline: SRE at Zycus (current),
DevSecOps Intern (previous). Skills by category. Certifications grid (placeholders). "Download resume" button.

## PAGE 6: Contact

Giant headline "Say hello." Form: name, email, message, send button with accent. Email with copy-to-clipboard,
social links (GitHub, LinkedIn), mono note "Typical response: within 24h". Include success and error states.

## After Stitch

1. Export HTML/CSS (or Copy code) and screenshots to design/exports/.
2. Tell Claude when ready; build starts from these files.
