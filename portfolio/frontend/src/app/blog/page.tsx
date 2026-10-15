import type { Metadata } from "next";
import { BlogList } from "@/components/BlogList";
import { PageHeader } from "@/components/ui";
import { getPosts, toPostLite } from "@/lib/content";

export const metadata: Metadata = { title: "Writing" };

export default function BlogPage() {
  const posts = getPosts().map(toPostLite);
  return (
    <>
      <PageHeader eyebrow="SYSTEM // WRITING" title="Writing" count={`(${String(posts.length).padStart(2, "0")})`}>
        Notes on SRE, DevOps, observability and AI-assisted operations.
      </PageHeader>
      <BlogList posts={posts} />
    </>
  );
}
