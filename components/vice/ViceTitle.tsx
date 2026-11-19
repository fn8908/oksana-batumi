"use client";

import { useInView } from "@/hooks/useInView";

// Заголовок раздела: неоновая надпись и светящаяся черта
export default function ViceTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className={`text-center mb-12 vice-reveal ${inView ? "vice-reveal-on" : ""}`}>
      <h2 className="vice-display vice-neon text-2xl sm:text-4xl uppercase">{title}</h2>
      <div className="vice-divider w-28 mx-auto my-5" />
      {subtitle && (
        <p className="text-sm sm:text-base max-w-2xl mx-auto" style={{ color: "var(--v-muted)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
