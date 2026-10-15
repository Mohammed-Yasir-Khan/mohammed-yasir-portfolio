import Link from "next/link";
import { CopyEmail } from "@/components/CopyEmail";
import { HomeTop } from "@/components/HomeTop";
import { PostCard } from "@/components/PostViews";
import { Button, SectionLabel } from "@/components/ui";
import { getPosts, getProjects, toPostLite } from "@/lib/content";
import { getProfilePhoto } from "@/lib/photo";
import { experience, profile, skills } from "@/lib/profile";

export default function Home() {
  const projects = getProjects();
  const posts = getPosts().slice(0, 3).map(toPostLite);

  return (
    <>
      <HomeTop
        photo={getProfilePhoto()}
        projects={projects.map(({ slug, title, summary, year, tags, roles, sample, order }) => ({
          slug,
          title,
          summary,
          year,
          tags,
          roles,
          sample,
          order,
        }))}
      />

      <section className="border-t border-border">
        <div className="container-page py-14 md:py-20">
          <SectionLabel index="02" title="Experience" right="Timeline" />
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {experience.map((e) => (
              <li key={e.role} className="reveal flex flex-col rounded-lg border border-border bg-surface p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="flex items-center gap-2 text-lg font-medium">
                    {e.current && <span className="h-2 w-2 shrink-0 rounded-full bg-status" />}
                    {e.role}
                  </h3>
                  <span className={`label-caps shrink-0 ${e.current ? "text-status" : "text-muted"}`}>
                    {e.current ? "Present" : "Previous"}
                  </span>
                </div>
                <p className="label-code mt-1 text-accent">{e.company}</p>
                <p className="label-code mt-1 text-muted">
                  {e.period} · {e.location}
                </p>
                <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-fg-2">
                  {e.points.slice(0, 3).map((p) => (
                    <li key={p} className="relative pl-4 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-2 before:bg-accent">
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/about"
                  className="label-caps mt-5 self-start border-b border-border-strong pb-0.5 hover:border-accent hover:text-accent"
                >
                  Full details →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page py-14 md:py-20">
          <SectionLabel index="03" title="Stack & capabilities" right="System matrix" />
          <dl className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            {skills.map((s) => (
              <div key={s.group} className="reveal flex items-baseline gap-4 bg-surface p-5">
                <dt className="label-caps w-28 shrink-0 text-muted">{s.group}</dt>
                <dd className="label-code text-fg">{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="border-t border-border">
          <div className="container-page py-14 md:py-20">
            <SectionLabel index="04" title="Writing" right={`${posts.length} latest`} />
            <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug} className="reveal">
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/blog" className="label-caps border-b border-border-strong pb-0.5 hover:border-accent hover:text-accent">
                All writing →
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border">
        <div className="container-page py-20 md:py-28">
          <h2 className="display-hero italic [font-size:clamp(2.5rem,7vw,5.5rem)]">
            Let&apos;s build something reliable.
          </h2>
          <p className="mt-6 max-w-lg text-lg text-fg-2">
            Open to SRE, DevOps and AI engineering roles and conversations.
          </p>
          <div className="mt-8 flex max-w-md flex-col gap-3">
            {profile.email && <CopyEmail email={profile.email} />}
            <Button href="/contact">Get in touch</Button>
          </div>
        </div>
      </section>
    </>
  );
}
