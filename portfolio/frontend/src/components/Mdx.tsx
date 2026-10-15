import { MDXRemote } from "next-mdx-remote/rsc";
import type { ComponentProps, ReactNode } from "react";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/content";
import { Arch } from "./Arch";

function text(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(text).join("");
  return "";
}

const components = {
  Arch,
  h2: ({ children }: ComponentProps<"h2">) => (
    <h2 id={slugify(text(children))}>{children}</h2>
  ),
  a: ({ href = "", children }: ComponentProps<"a">) =>
    href.startsWith("http") ? (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ) : (
      <a href={href}>{children}</a>
    ),
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-custom">
      <MDXRemote
        source={source}
        components={components}
        // blockJS is off so <Arch layers={[...]} /> props work. Safe because content is your own files in the repo.
        // If you ever render MDX written by other people, turn this back on.
        options={{ blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}
