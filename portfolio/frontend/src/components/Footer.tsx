import { profile } from "@/lib/profile";
import { StatusDot } from "./StatusDot";

const buildDate = new Date().toISOString().slice(0, 10);

export function Footer() {
  const socials = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Email", href: profile.email ? `mailto:${profile.email}` : "" },
    { label: "Resume", href: profile.resumeUrl, download: true },
  ].filter((s) => s.href);

  return (
    <footer className="mt-24 border-t border-border">
      <div className="container-page grid gap-8 py-10 md:grid-cols-12">
        <div className="label-code flex flex-col gap-1 text-muted md:col-span-6">
          <span className="flex items-center gap-2">
            <StatusDot ping={false} /> STATUS: operational
          </span>
          <span>LAST BUILD: {buildDate}</span>
        </div>
        {socials.length > 0 && (
          <ul className="flex flex-wrap items-center gap-6 md:col-span-6 md:justify-end">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  download={"download" in s ? profile.resumeFileName : undefined}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="label-caps border-b border-border-strong pb-0.5 text-fg-2 transition-colors hover:border-accent hover:text-accent"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className="label-code text-muted md:col-span-12">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js and FastAPI.
        </p>
      </div>
    </footer>
  );
}
