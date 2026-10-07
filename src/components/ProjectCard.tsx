import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl transition hover:border-violet/50">
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
        <h3 className="mb-2 text-lg font-semibold">
          {/* Stretched link: the whole card opens the case study */}
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
        <div className="mt-4 flex items-center justify-between text-sm font-medium">
          <span className="text-foreground/80 group-hover:text-foreground">View case study →</span>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 rounded-full border border-cyan/40 px-3 py-1 text-xs text-cyan transition hover:bg-cyan/10"
            >
              Live site ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
