import { Download } from "lucide-react";
import type { Metadata } from "next";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import { PageHeader, SectionLabel } from "@/components/ui";
import { getProfilePhoto } from "@/lib/photo";
import {
  certifications,
  education,
  experience,
  profile,
  roles,
  skills,
  type RoleKey,
} from "@/lib/profile";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  const photo = getProfilePhoto();
  return (
    <>
      <PageHeader eyebrow="SYSTEM // BIOGRAPHY" title="About">
        {profile.name}: SRE, DevOps and AI engineer.
      </PageHeader>

      <section className="container-page grid gap-12 pb-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <ProfilePhoto src={photo} size="lg" />
        </div>
        <div className="space-y-5 text-[17px] leading-relaxed text-fg-2 md:col-span-8">
          <p>{profile.summary}</p>
          <p>
            I started in DevSecOps, building secure CI/CD pipelines and AWS infrastructure, and I
            am increasingly interested in using AI agents to reduce operational toil without
            giving up safety.
          </p>
          <p className="label-code text-muted">{profile.location}</p>
          <div className="pt-2">
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className="label-caps inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
            >
              <Download size={14} /> Download resume
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page py-14">
          <SectionLabel index="01" title="What I do" right="By role" />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {(Object.keys(roles) as RoleKey[]).map((k) => (
              <div key={k} className="rounded-lg border border-border bg-surface p-6">
                <h3 className="headline-lg text-[1.75rem]">{roles[k].label}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{roles[k].subline}</p>
                <ul className="mt-5 space-y-4 border-t border-border pt-5">
                  {roles[k].does.map((d) => (
                    <li key={d.title}>
                      <p className="label-caps text-accent">{d.title}</p>
                      <p className="mt-1 text-[14px] leading-relaxed text-fg-2">{d.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page py-14">
          <SectionLabel index="02" title="Experience" />
          <ol className="mt-8 border-t border-border">
            {experience.map((e) => (
              <li key={e.role} className="grid gap-2 border-b border-border py-8 md:grid-cols-12 md:gap-6">
                <div className="md:col-span-3">
                  <span className={`label-caps ${e.current ? "text-status" : "text-muted"}`}>
                    {e.period}
                  </span>
                  <p className="label-code mt-2 text-muted">{e.location}</p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-xl font-medium">{e.role}</h3>
                  <p className="label-code mt-1 text-accent">{e.company}</p>
                  <ul className="mt-4 max-w-3xl space-y-2.5 leading-relaxed text-fg-2">
                    {e.points.map((p) => (
                      <li key={p} className="relative pl-5 before:absolute before:left-0 before:top-[0.85em] before:h-px before:w-2.5 before:bg-accent">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page py-14">
          <SectionLabel index="03" title="Education" />
          <ul className="mt-8 border-t border-border">
            {education.map((ed) => (
              <li key={ed.school} className="grid gap-2 border-b border-border py-7 md:grid-cols-12 md:gap-6">
                <span className="label-caps text-muted md:col-span-3">{ed.period}</span>
                <div className="md:col-span-9">
                  <h3 className="text-xl font-medium">{ed.school}</h3>
                  <p className="mt-1 text-fg-2">
                    {ed.degree} <span className="text-muted">·</span>{" "}
                    <span className="label-code text-accent">{ed.detail}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page py-14">
          <SectionLabel index="04" title="Skills" />
          <dl className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            {skills.map((s) => (
              <div key={s.group} className="flex items-baseline gap-4 bg-surface p-5">
                <dt className="label-caps w-28 shrink-0 text-muted">{s.group}</dt>
                <dd className="label-code text-fg">{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page py-14">
          <SectionLabel index="05" title="Certifications" />
          {certifications.length === 0 ? (
            <p className="label-code mt-8 text-muted">Coming soon.</p>
          ) : (
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {certifications.map((c) => (
                <li key={c.name} className="rounded-lg border border-border bg-surface p-5">
                  <p className="font-medium">{c.name}</p>
                  <p className="label-code mt-1 text-muted">{c.issuer}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
