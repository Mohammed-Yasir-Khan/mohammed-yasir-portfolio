"use client";

import { useMemo, useState } from "react";
import { PostRow, type PostLite } from "./PostViews";

export function BlogList({ posts }: { posts: PostLite[] }) {
  const [tag, setTag] = useState("All");
  const tags = useMemo(
    () => ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags))).sort()],
    [posts],
  );
  const shown = tag === "All" ? posts : posts.filter((p) => p.tags.includes(tag));

  return (
    <div className="container-page">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by tag">
        {tags.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tag === t}
            onClick={() => setTag(t)}
            className={`label-caps rounded-md border px-3 py-2 transition-colors ${
              tag === t
                ? "border-accent bg-surface text-accent"
                : "border-border text-muted hover:border-border-strong hover:text-fg"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <ul className="mt-8 divide-y divide-border border-y border-border">
        {shown.map((p, i) => (
          <li key={p.slug}>
            <PostRow post={p} priority={i === 0} />
          </li>
        ))}
        {shown.length === 0 && <li className="label-code py-10 text-muted">No posts yet.</li>}
      </ul>
    </div>
  );
}
