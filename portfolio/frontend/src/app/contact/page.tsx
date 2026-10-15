import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmail } from "@/components/CopyEmail";
import { profile } from "@/lib/profile";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const channels = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
  ].filter((c) => c.href);

  return (
    <div className="container-page grid gap-12 pb-8 pt-12 md:pt-20 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="label-caps text-muted">SYSTEM // CONTACT</p>
        <h1 className="display-hero mt-4 italic [font-size:clamp(3rem,8vw,5.5rem)]">
          Say hello<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-2">
          Open to SRE, DevOps and AI engineering roles, and to a good conversation about making
          infrastructure unbreakable.
        </p>
        <p className="label-code mt-6 text-muted">Typical response: within 24h</p>

        <div className="mt-8 space-y-3">
          {profile.email && <CopyEmail email={profile.email} />}
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-md border border-border bg-surface px-4 py-3 transition-colors hover:border-border-strong"
            >
              <span className="label-caps">{c.label}</span>
              <ArrowUpRight size={16} className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>

      <div className="lg:col-span-7">
        <ContactForm />
      </div>
    </div>
  );
}
