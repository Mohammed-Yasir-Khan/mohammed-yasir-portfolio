import type { Metadata } from "next";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { PageHeader } from "@/components/ui";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = { title: "Work" };

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <>
      <PageHeader
        eyebrow="SYSTEM // PROJECTS"
        title="Work"
        count={`(${String(projects.length).padStart(2, "0")})`}
      >
        Production systems, infrastructure automation and AI operational tooling built for
        reliability.
      </PageHeader>
      <ProjectsExplorer projects={projects} />
    </>
  );
}
