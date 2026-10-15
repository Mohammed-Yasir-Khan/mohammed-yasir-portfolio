"use client";

import { FileText, House, Layers, Mail, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home", Icon: House },
  { href: "/projects", label: "Work", Icon: Layers },
  { href: "/blog", label: "Writing", Icon: FileText },
  { href: "/about", label: "About", Icon: User },
  { href: "/contact", label: "Contact", Icon: Mail },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-bg/95 pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="flex h-16 items-center justify-around px-2">
        {tabs.map(({ href, label, Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 min-w-12 flex-col items-center justify-center gap-1 transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-fg"
                }`}
              >
                <Icon size={19} strokeWidth={active ? 2.2 : 1.7} />
                <span className="label-caps text-[10px]">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
