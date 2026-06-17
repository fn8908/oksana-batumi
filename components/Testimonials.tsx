"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useInView } from "@/hooks/useInView";

interface Testimonial {
  text: string;
  author: string;
  city: string;
}

export default function Testimonials() {
  const { t, tArr } = useLanguage();
  const { ref, inView } = useInView();

  const items = tArr<Testimonial>("testimonials.items");

  return (
    <section
      id="testimonials"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(180deg, #0F1C2E 0%, #0d2137 100%)" }}
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2
            className="font-cormorant font-semibold text-4xl lg:text-5xl mb-3"
            style={{ color: "#F5F0E8" }}
          >
            {t("testimonials.title")}
          </h2>
          <div
            className="w-16 h-px mx-auto mt-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, #C9A96E, transparent)",
            }}
          />
        </div>

        {/* Cards: horizontal scroll on mobile */}
        <div className="flex gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 snap-x snap-mandatory lg:snap-none">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex-shrink-0 w-72 sm:w-80 lg:w-auto snap-start rounded-2xl p-6 sm:p-8 flex flex-col transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderLeft: "3px solid rgba(201,169,110,0.45)",
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} style={{ color: "#C9A96E" }}>★</span>
                ))}
              </div>

              {/* Quote mark */}
              <div
                className="font-cormorant text-6xl leading-none mb-2"
                style={{ color: "rgba(201,169,110,0.2)" }}
              >
                "
              </div>

              <p
                className="font-nunito text-base leading-relaxed flex-1 mb-6"
                style={{ color: "rgba(245,240,232,0.8)" }}
              >
                {item.text}
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: "rgba(201,169,110,0.15)",
                    border: "1px solid rgba(201,169,110,0.3)",
                    color: "#C9A96E",
                    fontFamily: "var(--font-cormorant)",
                  }}
                >
                  {item.author[0]}
                </div>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "#F5F0E8" }}
                  >
                    {item.author}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(245,240,232,0.62)" }}
                  >
                    {item.city}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
