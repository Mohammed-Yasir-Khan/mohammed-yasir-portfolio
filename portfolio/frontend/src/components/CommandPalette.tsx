"use client";

import { CornerDownLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/lib/profile";
import { useThemeSwitch } from "./ThemeToggle";

type Item = { id: string; group: string; label: string; hint?: string; run: () => void };

export type PaletteLink = { title: string; href: string };

export function CommandPalette({
  projects,
  posts,
}: {
  projects: PaletteLink[];
  posts: PaletteLink[];
}) {
  const router = useRouter();
  const toggleTheme = useThemeSwitch();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href);
    const list: Item[] = [
      { id: "home", group: "Pages", label: "Home", run: go("/") },
      { id: "work", group: "Pages", label: "Work", run: go("/projects") },
      { id: "writing", group: "Pages", label: "Writing", run: go("/blog") },
      { id: "about", group: "Pages", label: "About", run: go("/about") },
      { id: "contact", group: "Pages", label: "Contact", run: go("/contact") },
      ...projects.map((p) => ({
        id: `p-${p.href}`,
        group: "Projects",
        label: p.title,
        run: go(p.href),
      })),
      ...posts.map((p) => ({
        id: `b-${p.href}`,
        group: "Writing",
        label: p.title,
        run: go(p.href),
      })),
      { id: "theme", group: "Actions", label: "Toggle theme", hint: "light / dark", run: toggleTheme },
    ];
    if (profile.email) {
      list.push({
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        run: () => void navigator.clipboard.writeText(profile.email),
      });
    }
    list.push({
      id: "resume",
      group: "Actions",
      label: "Download resume",
      hint: "PDF",
      run: () => {
        const a = document.createElement("a");
        a.href = profile.resumeUrl;
        a.download = profile.resumeFileName;
        a.click();
      },
    });
    return list;
  }, [projects, posts, router, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items;
  }, [items, query]);

  const choose = (item?: Item) => {
    if (!item) return;
    close();
    item.run();
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(filtered[index]);
    }
  };

  if (!open) return null;

  let lastGroup = "";
  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-bg/80 px-4 pt-[15vh]"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        role="dialog"
        aria-label="Command palette"
        className="w-full max-w-xl overflow-hidden rounded-lg border border-accent bg-bg"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search size={16} className="text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Type a command or search…"
            className="label-code h-12 w-full bg-transparent text-fg outline-none placeholder:text-muted"
          />
          <kbd className="label-code rounded-[3px] border border-border px-1.5 text-[11px] text-muted">
            Esc
          </kbd>
        </div>
        <ul role="listbox" className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="label-code px-4 py-6 text-center text-muted">No results</li>
          )}
          {filtered.map((item, i) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <li key={item.id} role="option" aria-selected={i === index}>
                {showGroup && (
                  <div className="label-caps px-4 pb-1 pt-3 text-muted">{item.group}</div>
                )}
                <button
                  type="button"
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => choose(item)}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm ${
                    i === index ? "bg-surface-2 text-accent" : "text-fg-2"
                  }`}
                >
                  <span>{item.label}</span>
                  {i === index && <CornerDownLeft size={14} />}
                  {i !== index && item.hint && (
                    <span className="label-code text-muted">{item.hint}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="label-code flex items-center gap-4 border-t border-border px-4 py-2 text-[11px] text-muted">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
