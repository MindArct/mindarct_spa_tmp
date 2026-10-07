"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";

export type LightboxImage = { src: string; alt: string; caption?: string };

export default function Lightbox({
  images,
  index,
  onChange,
  onClose,
}: {
  images: LightboxImage[];
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const prev = useCallback(() => onChange((index - 1 + images.length) % images.length), [index, images.length, onChange]);
  const next = useCallback(() => onChange((index + 1) % images.length), [index, images.length, onChange]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [prev, next, onClose]);

  const img = images[index];
  const btn = "absolute rounded-full bg-white/10 p-3 text-white backdrop-blur hover:bg-white/20";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button className={`${btn} right-4 top-4`} onClick={onClose} aria-label="Close">
        ✕
      </button>
      {images.length > 1 && (
        <>
          <button className={`${btn} left-4 top-1/2 -translate-y-1/2`} onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous image">
            ←
          </button>
          <button className={`${btn} right-4 top-1/2 -translate-y-1/2`} onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next image">
            →
          </button>
        </>
      )}
      <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <Image
          src={img.src}
          alt={img.alt}
          width={1280}
          height={800}
          className="max-h-[80vh] w-auto rounded-lg object-contain"
          priority
        />
        <figcaption className="mt-3 text-center text-sm text-white/70">
          {img.caption ?? img.alt} · {index + 1}/{images.length}
        </figcaption>
      </figure>
    </div>
  );
}
