"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function useThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  return () => {
    const root = document.documentElement;
    root.classList.add("theme-fade");
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    window.setTimeout(() => root.classList.remove("theme-fade"), 300);
  };
}

export function ThemeToggle() {
  const toggle = useThemeSwitch();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="flex h-10 w-10 items-center justify-center rounded-md text-muted transition-colors hover:text-fg"
    >
      <Sun size={18} className="hidden dark:block" />
      <Moon size={18} className="dark:hidden" />
    </button>
  );
}
