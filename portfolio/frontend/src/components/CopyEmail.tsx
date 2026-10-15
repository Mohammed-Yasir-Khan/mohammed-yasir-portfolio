"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-bg px-3.5 py-2.5">
      <a href={`mailto:${email}`} className="label-code truncate text-fg hover:text-accent">
        {email}
      </a>
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        }}
        className="label-caps flex shrink-0 items-center gap-1.5 text-accent hover:text-accent-hover"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
