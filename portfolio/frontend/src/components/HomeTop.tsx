"use client";

import { ArrowDown, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/content";
import { profile, roles, type RoleKey } from "@/lib/profile";
import { ProfilePhoto } from "./ProfilePhoto";
import { StatusDot } from "./StatusDot";
import { Button, SampleChip, SectionLabel, Tag } from "./ui";

type ProjectLite = Pick<Project, "slug" | "title" | "summary" | "year" | "tags" | "roles" | "sample" | "order">;

export function HomeTop({ projects, photo }: { projects: ProjectLite[]; photo: string | null }) {
  const [role, setRole] = useState<RoleKey>("sre");
  const r = roles[role];

  const featured = useMemo(() => {
    const score = (p: ProjectLite) => (p.roles.includes(role) ? 0 : 1);
    return [...projects].sort((a, b) => score(a) - score(b) || a.order - b.order).slice(0, 3);
  }, [projects, role]);

  return (
    <>
      <section className="container-page pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="label-caps text-muted">00 // SRE @ Zycus</span>
          <div
            role="tablist"
            aria-label="Choose a role"
            className="inline-flex rounded-md border border-border bg-surface p-0.5"
          >
            {(Object.keys(roles) as RoleKey[]).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={role === k}
                onClick={() => setRole(k)}
                className={`label-caps rounded-[3px] px-3 py-1.5 transition-colors ${
                  role === k
                    ? "bg-accent font-semibold text-accent-fg"
                    : "text-muted hover:text-fg"
                }`}
              >
                {roles[k].label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <h1 className="display-hero page-enter italic">{profile.tagline}</h1>
            <p
              key={role}
              className="mt-8 max-w-xl text-lg leading-relaxed text-fg-2 [animation:fade-up_350ms_ease-out_both]"
            >
              {r.subline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#selected-work"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-[15px] font-medium text-accent-fg transition-colors hover:bg-accent-hover"
              >
                View work <ArrowDown size={16} />
              </a>
              <a
                href={profile.resumeUrl}
                download={profile.resumeFileName}
                className="label-caps inline-flex items-center justify-center gap-2 rounded-md border border-border-strong px-5 py-2.5 text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <Download size={14} /> Resume
              </a>
              <Button href="/contact" variant="outline">
                Get in touch
              </Button>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:pt-4">
            <div className="rounded-lg border border-border bg-surface">
              <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                <div className="flex items-center gap-3">
                  <ProfilePhoto src={photo} size="sm" />
                  <div>
                    <p className="text-sm font-medium leading-tight">{profile.name}</p>
                    <span className="label-caps mt-1 flex items-center gap-2 text-[10px] text-status">
                      <StatusDot ping={false} /> Overview
                    </span>
                  </div>
                </div>
              </div>
              <dl className="label-code divide-y divide-border">
                {[
                  ["Currently", "SRE at Zycus"],
                  ["Focus", r.focus],
                  ["Stack", r.stack],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-3 px-4 py-3">
                    <dt className="label-caps text-[10px] text-muted">{k}</dt>
                    <dd key={v} className="text-fg [animation:fade-up_350ms_ease-out_both]">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:mt-20 md:grid-cols-3">
          {r.does.map((d, i) => (
            <div key={`${role}-${d.title}`} className="bg-surface p-6 [animation:fade-up_400ms_ease-out_both]" style={{ animationDelay: `${i * 70}ms` }}>
              <p className="label-caps text-accent">{String(i + 1).padStart(2, "0")} / {d.title}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{d.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="selected-work" className="border-t border-border">
        <div className="container-page py-14 md:py-20">
          <SectionLabel index="01" title="Selected work" right={`${featured.length} projects`} />
          <ul className="mt-8 border-t border-border">
            {featured.map((p, i) => (
              <li key={p.slug} className="border-b border-border">
                <Link
                  href={`/projects/${p.slug}`}
                  className="group grid gap-3 py-7 transition-colors hover:bg-surface-2 md:grid-cols-12 md:items-center md:gap-6 md:px-3"
                >
                  <span className="label-code text-muted md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="md:col-span-6">
                    <h3 className="headline-lg transition-colors group-hover:text-accent">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-fg-2">
                      {p.summary}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:col-span-3">
                    {p.tags.slice(0, 3).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-3 md:col-span-2 md:justify-end">
                    {p.sample && <SampleChip />}
                    <span className="label-code text-muted">{p.year}</span>
                    <ArrowRight
                      size={18}
                      className="text-accent transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/projects" className="label-caps border-b border-border-strong pb-0.5 hover:border-accent hover:text-accent">
              All projects →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
