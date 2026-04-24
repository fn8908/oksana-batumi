"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useInView } from "@/hooks/useInView";

interface Neighborhood {
  name: string;
  desc: string;
  price: string;
}

const neighborhoodGradients = [
  "linear-gradient(135deg, #0a3d62 0%, #1e5f8a 100%)",
  "linear-gradient(135deg, #2d1b4e 0%, #5b3d8a 100%)",
  "linear-gradient(135deg, #1a4a2e 0%, #2d7a50 100%)",
  "linear-gradient(135deg, #4a1a1a 0%, #8a3030 100%)",
  "linear-gradient(135deg, #1a3a4a 0%, #2d6b7a 100%)",
];

const neighborhoodIcons = ["🌊", "🕌", "🏙️", "🌳", "🏡"];

export default function Neighborhoods() {
  const { t, tArr } = useLanguage();
  const { ref, inView } = useInView();

  const neighborhoods = tArr<Neighborhood>("neighborhoods.items");

  return (
    <section
      id="neighborhoods"
      className="py-24 px-4 sm:px-6 lg:px-8"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2
            className="font-cormorant font-semibold text-4xl lg:text-5xl mb-3"
            style={{ color: "#F5F0E8" }}
          >
            {t("neighborhoods.title")}
          </h2>
          <div
            className="w-16 h-px mx-auto mt-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, #C9A96E, transparent)",
            }}
          />
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0 snap-x snap-mandatory lg:snap-none">
          {neighborhoods.map((n, i) => (
            <div
              key={i}
              className={`flex-shrink-0 w-64 sm:w-72 lg:w-auto snap-start rounded-2xl overflow-hidden transition-all duration-700 cursor-pointer group hover:scale-[1.03] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{
                transitionDelay: `${i * 0.1}s`,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Gradient top */}
              <div
                className="h-32 flex items-center justify-center text-4xl relative"
                style={{ background: neighborhoodGradients[i] }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(201,169,110,0.1), transparent 70%)",
                  }}
                />
                <span className="relative z-10">{neighborhoodIcons[i]}</span>
              </div>

              {/* Content */}
              <div
                className="p-5"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <h3
                  className="font-cormorant font-semibold text-lg mb-2 leading-tight"
                  style={{ color: "#F5F0E8" }}
                >
                  {n.name}
                </h3>
                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: "rgba(245,240,232,0.55)" }}
                >
                  {n.desc}
                </p>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "#C9A96E" }}
                >
                  {n.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
