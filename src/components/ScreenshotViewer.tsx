"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "./Lightbox";

export default function ScreenshotViewer({ images }: { images: { src: string; alt: string }[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="glass relative block aspect-[16/10] w-full overflow-hidden rounded-2xl"
        aria-label="Open screenshot full screen"
      >
        <Image src={images[active].src} alt={images[active].alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" priority />
      </button>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setActive(i)}
              aria-label={`Show ${img.alt}`}
              aria-pressed={i === active}
              className={`relative aspect-[16/10] overflow-hidden rounded-lg border transition ${
                i === active ? "border-violet" : "border-line opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="15vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      {open && <Lightbox images={images} index={active} onChange={setActive} onClose={() => setOpen(false)} />}
    </div>
  );
}
