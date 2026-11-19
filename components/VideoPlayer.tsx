"use client";

import { useState } from "react";

// Обложка ролика с кнопкой в углу: значок YouTube по центру не закрывает лицо.
// Сам ролик загружается по нажатию.
export default function VideoPlayer({ id, title, label, lang }: { id: string; title: string; label: string; lang: string }) {
  const [play, setPlay] = useState(false);

  if (play) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${id}?rel=0&autoplay=1&hl=${lang}`}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button onClick={() => setPlay(true)} className="relative block w-full h-full cursor-pointer" aria-label={label}>
      <img src={`https://i.ytimg.com/vi/${id}/oardefault.jpg`} alt={title} className="w-full h-full object-cover" />
      <span
        className="absolute bottom-3 end-3 px-4 py-2 rounded-full text-sm font-semibold"
        style={{ background: "#C9A96E", color: "#0F1C2E", boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}
      >
        ▶ {label}
      </span>
    </button>
  );
}
