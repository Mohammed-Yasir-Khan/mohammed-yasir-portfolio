import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { RoleKey } from "./profile";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  category: string; // e.g. "SRE // INFRASTRUCTURE"
  roles: RoleKey[];
  tags: string[];
  flow: string[]; // architecture nodes, left to right
  links: { label: string; href: string }[];
  stats: { label: string; value: string }[];
  sample: boolean; // true = placeholder content, shows a SAMPLE chip
  featured: boolean;
  order: number;
  body: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  tags: string[];
  sample: boolean;
  minutes: number;
  /** Optional cover image path under frontend/public (e.g. /blog/my-post.jpg). Generated art is used when missing. */
  cover: string | null;
  /** If set, the post links out (Medium, dev.to, company blog...) instead of opening a local page. */
  externalUrl: string | null;
  /** Label for external posts, e.g. "Medium". */
  source: string | null;
  body: string;
};

function readDir(dir: string): { slug: string; raw: string }[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => ({
      slug: f.replace(/\.mdx?$/, ""),
      raw: fs.readFileSync(path.join(full, f), "utf8"),
    }));
}

export function getProjects(): Project[] {
  return readDir("projects")
    .map(({ slug, raw }) => {
      const { data, content } = matter(raw);
      return {
        slug,
        title: String(data.title ?? slug),
        summary: String(data.summary ?? ""),
        year: String(data.year ?? ""),
        category: String(data.category ?? ""),
        roles: (data.roles ?? []) as RoleKey[],
        tags: (data.tags ?? []) as string[],
        flow: (data.flow ?? []) as string[],
        links: (data.links ?? []) as Project["links"],
        stats: (data.stats ?? []) as Project["stats"],
        sample: Boolean(data.sample),
        featured: Boolean(data.featured),
        order: Number(data.order ?? 99),
        body: content,
      } satisfies Project;
    })
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string) {
  return getProjects().find((p) => p.slug === slug);
}

export function getPosts(): Post[] {
  return readDir("blog")
    .map(({ slug, raw }) => {
      const { data, content } = matter(raw);
      const date =
        data.date instanceof Date
          ? data.date.toISOString().slice(0, 10)
          : String(data.date ?? "");
      return {
        slug,
        title: String(data.title ?? slug),
        excerpt: String(data.excerpt ?? ""),
        date,
        tags: (data.tags ?? []) as string[],
        sample: Boolean(data.sample),
        minutes: data.minutes
          ? Number(data.minutes)
          : Math.max(1, Math.round(readingTime(content).minutes)),
        cover: data.cover ? String(data.cover) : null,
        externalUrl: data.externalUrl ? String(data.externalUrl) : null,
        source: data.source ? String(data.source) : null,
        body: content,
      } satisfies Post;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Serializable shape passed to client components and cards. */
export function toPostLite(p: Post) {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    dateLabel: formatDate(p.date),
    minutes: p.minutes,
    tags: p.tags,
    sample: p.sample,
    cover: p.cover,
    externalUrl: p.externalUrl,
    source: p.source,
  };
}

export function getPost(slug: string) {
  return getPosts().find((p) => p.slug === slug);
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function extractHeadings(body: string) {
  return [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => ({
    text: m[1].trim(),
    id: slugify(m[1]),
  }));
}

export function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return iso;
  return d
    .toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
    .toUpperCase();
}
