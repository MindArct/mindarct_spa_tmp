import type { Metadata } from "next";
import GalleryGrid, { type GalleryItem } from "@/components/GalleryGrid";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Screenshots from MindArct projects: platforms, SaaS dashboards, AI tools and migration software.",
};

export default function GalleryPage() {
  const items: GalleryItem[] = projects.flatMap((p) =>
    p.images.map((img) => ({ ...img, project: p.title, caption: img.alt })),
  );

  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading eyebrow="Gallery" title="Screens from our projects" text="Click any image to view it full size." />
      <GalleryGrid items={items} />
    </section>
  );
}
