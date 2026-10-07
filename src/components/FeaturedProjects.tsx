import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <SectionHeading
        eyebrow="Selected work"
        title="Projects we are proud of"
        text="A look at what we build: screens, features and the thinking behind them."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
      <div className="mt-10 flex justify-center gap-4">
        <Link href="/projects" className="glass rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-white/10">
          All projects
        </Link>
        <Link href="/gallery" className="glass rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-white/10">
          Open gallery
        </Link>
      </div>
    </section>
  );
}
