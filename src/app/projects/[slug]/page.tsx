import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScreenshotViewer from "@/components/ScreenshotViewer";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-6xl px-5 py-16">
      <Link href="/projects" className="text-sm text-muted hover:text-foreground">
        ← All projects
      </Link>
      <header className="mt-6 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider gradient-text">{project.category}</span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-4 text-lg text-muted">{project.summary}</p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <ScreenshotViewer images={project.images} />

        <div className="space-y-8">
          <section>
            <h2 className="mb-2 font-semibold">The problem</h2>
            <p className="text-sm leading-relaxed text-muted">{project.problem}</p>
          </section>
          <section>
            <h2 className="mb-2 font-semibold">Our solution</h2>
            <p className="text-sm leading-relaxed text-muted">{project.solution}</p>
          </section>
          <section>
            <h2 className="mb-2 font-semibold">Outcome</h2>
            <p className="text-sm leading-relaxed text-muted">{project.outcome}</p>
          </section>
        </div>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="mb-4 text-xl font-semibold">Key features</h2>
          <ul className="space-y-3">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-muted">
                <span className="gradient-bg mt-1.5 h-2 w-2 shrink-0 rounded-full" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-semibold">Tech stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="glass rounded-full px-3 py-1 text-xs">
                {s}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="glass mt-16 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold">Want something like this?</h2>
        <Link href="/#contact" className="gradient-bg mt-5 inline-block rounded-full px-7 py-3 font-semibold text-black hover:opacity-90">
          Start a project
        </Link>
      </div>
    </article>
  );
}
