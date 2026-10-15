"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const topics = [
  { key: "sre", label: "SRE / Reliability" },
  { key: "devops", label: "DevOps / Cloud" },
  { key: "ai", label: "AI Operations" },
  { key: "other", label: "Other" },
] as const;

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-md border border-border bg-bg px-3.5 py-3 text-[15px] text-fg outline-none transition-colors placeholder:text-muted focus:border-accent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [subject, setSubject] = useState<(typeof topics)[number]["key"]>("sre");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
          subject,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const detail = body?.detail;
        throw new Error(
          typeof detail === "string" ? detail : "Please check the form and try again.",
        );
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-status bg-surface p-8">
        <div className="flex items-center gap-3 text-status">
          <Check size={20} />
          <span className="label-caps">Message sent</span>
        </div>
        <p className="mt-4 text-fg-2">Thanks for reaching out. I&apos;ll get back to you soon.</p>
        <button
          onClick={() => setStatus("idle")}
          className="label-caps mt-6 border-b border-border-strong pb-0.5 hover:border-accent hover:text-accent"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-border bg-surface p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="label-caps text-accent">Message</span>
        <span className="label-code text-muted">POST /api/contact</span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="label-caps text-muted">01 / Your name</span>
          <input name="name" required maxLength={100} placeholder="Jane Doe" className={`${field} mt-2`} />
        </label>
        <label className="block">
          <span className="label-caps text-muted">02 / Email</span>
          <input name="email" type="email" required placeholder="jane@company.com" className={`${field} mt-2`} />
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="label-caps text-muted">03 / Topic</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
          {topics.map((t) => (
            <button
              type="button"
              key={t.key}
              onClick={() => setSubject(t.key)}
              aria-pressed={subject === t.key}
              className={`label-caps rounded-md border px-3 py-3 transition-colors ${
                subject === t.key
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border text-fg-2 hover:border-border-strong"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="mt-5 block">
        <span className="label-caps text-muted">04 / Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder="Tell me about your systems, bottlenecks or project scope…"
          className={`${field} mt-2 resize-y`}
        />
      </label>

      {/* Honeypot: hidden from people, bots fill it in */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {status === "error" && (
        <p role="alert" className="label-code mt-4 text-accent">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-3.5 text-[15px] font-medium text-accent-fg transition-colors hover:bg-accent-hover disabled:opacity-60 md:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send message"} <ArrowRight size={16} />
      </button>
    </form>
  );
}
