"use client";

import { useEffect, useState } from "react";

// Лента фото объекта; по нажатию фото открывается на весь экран
export default function Gallery({ slug, count, alt }: { slug: string; count: number; alt: string }) {
  const [open, setOpen] = useState(-1);
  const src = (i: number) => `/obekty/${slug}/${i + 1}.jpg`;

  useEffect(() => {
    if (open < 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(-1);
      if (e.key === "ArrowRight") setOpen((i) => (i + 1) % count);
      if (e.key === "ArrowLeft") setOpen((i) => (i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, count]);

  const arrow = "absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full text-2xl";
  const arrowStyle = { background: "rgba(15,28,46,0.8)", color: "#F5F0E8" };

  return (
    <>
      <div className="flex gap-3 overflow-x-auto pb-3 mb-8" style={{ scrollSnapType: "x mandatory" }}>
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(i)}
            className="flex-shrink-0 rounded-xl overflow-hidden"
            style={{ height: "240px", scrollSnapAlign: "start" }}
          >
            <img
              src={src(i)}
              alt={`${alt} - ${i + 1}`}
              className="h-full w-auto"
              loading={i < 2 ? "eager" : "lazy"}
            />
          </button>
        ))}
      </div>

      {open >= 0 && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: "rgba(5,10,18,0.94)" }}
          onClick={() => setOpen(-1)}
        >
          <img src={src(open)} alt={alt} className="max-w-full max-h-full rounded-xl" />
          <button
            type="button"
            aria-label="‹"
            className={`${arrow} left-3`}
            style={arrowStyle}
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open - 1 + count) % count);
            }}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="›"
            className={`${arrow} right-3`}
            style={arrowStyle}
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open + 1) % count);
            }}
          >
            ›
          </button>
          <button
            type="button"
            aria-label="×"
            className="absolute top-3 right-3 w-12 h-12 rounded-full text-2xl"
            style={arrowStyle}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
