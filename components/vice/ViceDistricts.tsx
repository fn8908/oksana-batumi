"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useInView } from "@/hooks/useInView";
import ViceTitle from "./ViceTitle";

interface Neighborhood {
  name: string;
  desc: string;
  price: string;
  image: string;
}

export default function ViceDistricts() {
  const { t, tArr } = useLanguage();
  const items = tArr<Neighborhood>("neighborhoods.items");
  const { ref, inView } = useInView();

  return (
    <section id="neighborhoods" className="py-20 px-4 sm:px-6 lg:px-8" style={{ scrollMarginTop: "64px" }}>
      <div className="max-w-7xl mx-auto">
        <ViceTitle title={t("neighborhoods.title")} />

        <div
          ref={ref}
          className="flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible snap-x snap-mandatory lg:snap-none"
        >
          {items.map((n, i) => (
            <div
              key={n.name}
              className={`vice-card flex-shrink-0 w-64 lg:w-auto snap-start overflow-hidden vice-reveal ${inView ? "vice-reveal-on" : ""}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="h-36 relative overflow-hidden">
                <img
                  src={n.image}
                  alt={n.name}
                  className="w-full h-full object-cover"
                  style={{ filter: "saturate(1.3) contrast(1.05)" }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(160deg, rgba(0,229,255,0.5), rgba(255,46,136,0.55))",
                    mixBlendMode: "color",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, rgba(123,47,247,0.2), rgba(19,5,36,0.92))" }}
                />
                <span className="vice-tag vice-neon absolute bottom-2 start-3">{n.name}</span>
              </div>
              <div className="p-5">
                <p className="text-sm mb-3" style={{ color: "var(--v-muted)" }}>
                  {n.desc}
                </p>
                <div className="vice-price text-sm">{n.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
