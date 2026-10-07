import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/gallery"].map((p) => ({ url: `${site.url}${p}` }));
  const details = projects.map((p) => ({ url: `${site.url}/projects/${p.slug}` }));
  return [...pages, ...details];
}
