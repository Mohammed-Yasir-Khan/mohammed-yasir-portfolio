import Link from "next/link";
import type { ReactNode } from "react";

export function SectionLabel({
  index,
  title,
  right,
}: {
  index: string;
  title: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="label-caps text-accent">
        {index} {"//"} {title}
      </span>
      {right && <span className="label-code text-muted">{right}</span>}
    </div>
  );
}

export function SampleChip() {
  return (
    <span
      title="Placeholder content: replace before publishing"
      className="label-caps rounded-[3px] border border-dashed border-border-strong px-1.5 py-0.5 text-[10px] text-muted"
    >
      Sample
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="label-code rounded-md border border-border bg-surface px-2 py-0.5 text-[11px] text-fg-2">
      {children}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  count,
  children,
}: {
  eyebrow: string;
  title: string;
  count?: string;
  children?: ReactNode;
}) {
  return (
    <header className="container-page pb-10 pt-12 md:pb-14 md:pt-20">
      <p className="label-caps text-muted">{eyebrow}</p>
      <h1 className="headline-xl mt-4 flex items-baseline gap-3 md:text-[4.5rem]">
        {title}
        {count && <sup className="label-code text-accent">{count}</sup>}
      </h1>
      {children && <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-2">{children}</p>}
    </header>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  external?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[15px] font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-fg hover:bg-accent-hover"
      : "label-caps border border-border-strong text-fg hover:border-fg";
  const cls = `${base} ${styles}`;
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
