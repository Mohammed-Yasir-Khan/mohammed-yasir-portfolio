import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover } from "@/components/Cover";
import { Mdx } from "@/components/Mdx";
import { ReadingProgress } from "@/components/ReadingProgress";
import { SampleChip, Tag } from "@/components/ui";
import { extractHeadings, formatDate, getPost, getPosts } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  // External posts have no local page.
  return getPosts()
    .filter((p) => !p.externalUrl)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.externalUrl) notFound();

  const toc = extractHeadings(post.body);
  const related = getPosts()
    .filter((p) => p.slug !== slug && !p.externalUrl)
    .slice(0, 2);

  return (
    <article className="container-page pt-10 md:pt-16">
      <ReadingProgress />
      <Link href="/blog" className="label-caps inline-flex items-center gap-2 text-muted hover:text-accent">
        <ArrowLeft size={14} /> All writing
      </Link>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          {toc.length > 0 && (
            <nav aria-label="Table of contents" className="sticky top-24">
              <p className="label-caps text-muted">On this page</p>
              <ul className="mt-4 space-y-3 border-l border-border">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="label-code -ml-px block border-l border-transparent pl-4 text-muted transition-colors hover:border-accent hover:text-fg"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>

        <div className="lg:col-span-8 xl:col-span-7">
          <header>
            <div className="label-code flex flex-wrap items-center gap-3 text-muted">
              <span>{formatDate(post.date)}</span>
              <span>· {post.minutes} MIN READ</span>
              {post.sample && <SampleChip />}
            </div>
            <h1 className="headline-xl mt-5">{post.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-fg-2">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </header>

          <div className="mt-10 overflow-hidden rounded-lg border border-border">
            <Cover cover={post.cover} slug={post.slug} label={post.tags[0]} alt={post.title} priority />
          </div>

          <div className="mt-12 border-t border-border pt-10">
            <Mdx source={post.body} />
          </div>

          {related.length > 0 && (
            <section className="mt-20 border-t border-border pt-8">
              <p className="label-caps text-muted">Keep reading</p>
              <ul className="mt-4 space-y-1">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/blog/${r.slug}`} className="block py-2 text-lg transition-colors hover:text-accent">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
