import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getPosts, getProjects } from "@/lib/content";
import { profile } from "@/lib/profile";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: `${profile.name} | DevOps, SRE & AI Engineer`, template: `%s | ${profile.name}` },
  description:
    "Portfolio of Mohammed Yasir Khan: SRE, DevOps and AI engineer building reliable cloud platforms and automation.",
  openGraph: { type: "website", siteName: profile.name },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0e0d" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const projects = getProjects().map((p) => ({ title: p.title, href: `/projects/${p.slug}` }));
  const posts = getPosts().map((p) => ({ title: p.title, href: `/blog/${p.slug}` }));

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${geist.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen">
        <ThemeProvider>
          <SmoothScroll />
          <Navbar />
          <main className="page-enter pb-16 pt-16 md:pb-0">{children}</main>
          <Footer />
          <BottomNav />
          <CommandPalette projects={projects} posts={posts} />
        </ThemeProvider>
      </body>
    </html>
  );
}
