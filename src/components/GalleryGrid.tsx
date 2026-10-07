"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox, { type LightboxImage } from "./Lightbox";

export type GalleryItem = LightboxImage & { project: string };

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const filters = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.project)))], [items]);
  const shown = useMemo(() => (filter === "All" ? items : items.filter((i) => i.project === filter)), [items, filter]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter gallery">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={f === filter}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              f === filter ? "gradient-bg font-semibold text-black" : "glass text-muted hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {shown.map((item, i) => (
          <button
            key={item.src}
            onClick={() => setOpen(i)}
            className="glass group relative mb-4 block w-full overflow-hidden rounded-xl text-left"
            aria-label={`Open ${item.caption ?? item.alt}`}
          >
            <Image src={item.src} alt={item.alt} width={1280} height={800} className="h-auto w-full transition duration-500 group-hover:scale-[1.03]" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-xs opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
              {item.project} · {item.caption}
            </span>
          </button>
        ))}
      </div>

      {open !== null && <Lightbox images={shown} index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </div>
  );
}
