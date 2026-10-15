"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/content";
import { roles, type RoleKey } from "@/lib/profile";
import { FlowDiagram } from "./FlowDiagram";
import { SampleChip, Tag } from "./ui";

type Filter = "all" | RoleKey;

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? projects : projects.filter((p) => p.roles.includes(filter));
  const count = (f: Filter) =>
    f === "all" ? projects.length : projects.filter((p) => p.roles.includes(f)).length;

  const chips: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    ...(Object.keys(roles) as RoleKey[]).map((k) => ({ key: k, label: roles[k].label })),
  ];

  return (
    <div className="container-page">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {chips.map((c) => (
          <button
            key={c.key}
            role="tab"
            aria-selected={filter === c.key}
            onClick={() => setFilter(c.key)}
            className={`label-caps rounded-md border px-3 py-2 transition-colors ${
              filter === c.key
                ? "border-accent bg-surface text-accent"
                : "border-border text-muted hover:border-border-strong hover:text-fg"
            }`}
          >
            {c.label} <span className="text-muted">({String(count(c.key)).padStart(2, "0")})</span>
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {shown.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex h-full flex-col rounded-lg border border-border bg-surface transition-colors hover:border-border-strong hover:bg-surface-2"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <span className="label-caps text-accent">{p.category}</span>
                <span className="label-code text-muted">{p.year}</span>
              </div>
              <div className="flex min-h-32 items-center justify-center bg-surface-2/60 px-5 py-6">
                <FlowDiagram nodes={p.flow} />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-medium transition-colors group-hover:text-accent">
                    {p.title}
                  </h2>
                  {p.sample && <SampleChip />}
                </div>
                <p className="text-[15px] leading-relaxed text-fg-2">{p.summary}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-accent transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
