"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/lib/profile";
import { StatusDot } from "./StatusDot";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-bg/95">
      <div className="container-page flex h-full items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-1.5" aria-label="Home">
          <span className="label-caps font-semibold tracking-[0.18em]">{profile.initials}</span>
          <span className="h-1 w-1 rounded-full bg-accent" />
        </Link>

        <Link
          href="/contact"
          className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 transition-colors hover:border-border-strong md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          <StatusDot />
          <span className="label-caps text-status">
            <span className="hidden sm:inline">{profile.status}</span>
            <span className="sm:hidden">Available</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <ul className="mr-3 hidden items-center gap-6 md:flex">
            {links.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`label-caps transition-colors ${
                      active ? "text-accent" : "text-muted hover:text-fg"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-palette"))}
            aria-label="Search and quick actions"
            title="Search and quick actions (Ctrl K)"
            className="flex h-10 items-center gap-2 rounded-md px-2 text-muted transition-colors hover:text-fg"
          >
            <Search size={18} className="md:hidden" />
            <kbd className="label-code hidden rounded-[3px] border border-border px-1.5 py-0.5 text-[11px] md:inline">
              Ctrl K
            </kbd>
          </button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
