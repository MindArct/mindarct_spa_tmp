import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import Upcoming from "@/components/Upcoming";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies from MindArct: gallery platforms, SaaS products, AI assistants and data migration tools.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <SectionHeading eyebrow="Projects" title="Our work" text="Screens, features and the story behind each build." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
      <Upcoming />
    </>
  );
}
