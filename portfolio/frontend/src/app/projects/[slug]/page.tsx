import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FlowDiagram } from "@/components/FlowDiagram";
import { Mdx } from "@/components/Mdx";
import { SampleChip, Tag } from "@/components/ui";
import { getProject, getProjects } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const all = getProjects();
  const next = all[(all.findIndex((p) => p.slug === slug) + 1) % all.length];

  return (
    <article>
      <header className="container-page pb-10 pt-10 md:pt-16">
        <Link href="/projects" className="label-caps inline-flex items-center gap-2 text-muted hover:text-accent">
          <ArrowLeft size={14} /> All work
        </Link>
        <p className="label-caps mt-10 text-accent">{project.category}</p>
        <h1 className="headline-xl mt-4 max-w-3xl md:text-[4rem]">{project.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-2">{project.summary}</p>

        <dl className="label-code mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          <div className="bg-surface p-4">
            <dt className="label-caps text-[10px] text-muted">Year</dt>
            <dd className="mt-1">{project.year}</dd>
          </div>
          <div className="bg-surface p-4">
            <dt className="label-caps text-[10px] text-muted">Stack</dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </dd>
          </div>
          <div className="bg-surface p-4">
            <dt className="label-caps text-[10px] text-muted">Links</dt>
            <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
              {project.links.length === 0 && <span className="text-muted">—</span>}
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-accent hover:text-accent-hover"
                >
                  {l.label} <ArrowUpRight size={12} />
                </a>
              ))}
            </dd>
          </div>
        </dl>
        {project.sample && (
          <p className="label-code mt-4 flex items-center gap-2 text-muted">
            <SampleChip /> Placeholder content: to be replaced with the real write-up.
          </p>
        )}
      </header>

      <div className="container-page">
        <div className="rounded-lg border border-border bg-surface-2/60 px-6 py-12">
          <FlowDiagram nodes={project.flow} />
        </div>

        {project.stats.length > 0 && (
          <dl className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            {project.stats.map((s) => (
              <div key={s.label} className="bg-surface p-6">
                <dd className="headline-lg text-accent">{s.value}</dd>
                <dt className="label-caps mt-2 text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        )}

        <div className="mx-auto mt-14 max-w-2xl">
          <Mdx source={project.body} />
        </div>

        <Link
          href={`/projects/${next.slug}`}
          className="group mt-20 flex items-center justify-between gap-6 border-y border-border py-10 transition-colors hover:bg-surface-2 md:px-3"
        >
          <div>
            <span className="label-caps text-muted">Next project</span>
            <p className="headline-lg mt-2 transition-colors group-hover:text-accent">{next.title}</p>
          </div>
          <ArrowRight size={24} className="shrink-0 text-accent transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
