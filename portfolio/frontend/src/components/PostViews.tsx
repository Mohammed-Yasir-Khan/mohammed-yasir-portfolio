import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Cover } from "./Cover";
import { SampleChip, Tag } from "./ui";

export type PostLite = {
  slug: string;
  title: string;
  excerpt: string;
  dateLabel: string;
  minutes: number;
  tags: string[];
  sample: boolean;
  cover: string | null;
  externalUrl: string | null;
  source: string | null;
};

// Local posts open /blog/<slug>; external posts open the original site in a new tab.
function PostLink({ post, className, children }: { post: PostLite; className: string; children: ReactNode }) {
  return post.externalUrl ? (
    <a href={post.externalUrl} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={`/blog/${post.slug}`} className={className}>
      {children}
    </Link>
  );
}

function Meta({ post }: { post: PostLite }) {
  return (
    <div className="label-code flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
      <span>{post.dateLabel}</span>
      <span>{post.minutes} MIN READ</span>
      {post.source && (
        <span className="inline-flex items-center gap-1 text-accent">
          {post.source} <ArrowUpRight size={12} />
        </span>
      )}
    </div>
  );
}

/** Grid card: cover on top (used on the home page). */
export function PostCard({ post }: { post: PostLite }) {
  return (
    <PostLink
      post={post}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-border-strong"
    >
      <Cover cover={post.cover} slug={post.slug} label={post.tags[0]} alt={post.title} />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Meta post={post} />
        <h3 className="text-xl font-medium leading-snug transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-[15px] leading-relaxed text-fg-2">{post.excerpt}</p>
        {post.sample && (
          <div className="mt-auto pt-2">
            <SampleChip />
          </div>
        )}
      </div>
    </PostLink>
  );
}

/** Medium-style feed row: text on the left, thumbnail on the right (used on /blog). */
export function PostRow({ post, priority }: { post: PostLite; priority?: boolean }) {
  return (
    <PostLink
      post={post}
      className="group grid gap-5 py-8 transition-colors hover:bg-surface-2 sm:grid-cols-[1fr_15rem] sm:gap-8 md:px-3 lg:grid-cols-[1fr_17rem]"
    >
      <div className="order-2 flex flex-col gap-3 sm:order-1">
        <Meta post={post} />
        <h2 className="headline-lg text-[1.6rem] transition-colors group-hover:text-accent md:text-[2rem]">
          {post.title}
        </h2>
        <p className="max-w-xl text-[15px] leading-relaxed text-fg-2">{post.excerpt}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          {post.sample && <SampleChip />}
          {post.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
      <div className="order-1 overflow-hidden rounded-md border border-border sm:order-2 sm:self-start">
        <Cover cover={post.cover} slug={post.slug} label={post.tags[0]} alt={post.title} priority={priority} />
      </div>
    </PostLink>
  );
}
