import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition hover:border-violet/50"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        <Image
          src={project.images[0].src}
          alt={project.images[0].alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 text-xs font-semibold uppercase tracking-wider gradient-text">{project.category}</span>
        <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
        <span className="mt-4 text-sm font-medium text-foreground/80 group-hover:text-foreground">
          View case study →
        </span>
      </div>
    </Link>
  );
}
