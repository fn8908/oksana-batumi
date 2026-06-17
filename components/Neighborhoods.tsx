"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useInView } from "@/hooks/useInView";

interface Neighborhood {
  name: string;
  desc: string;
  price: string;
  image: string;
}

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
              className={`flex-shrink-0 w-64 sm:w-72 lg:w-auto snap-start rounded-2xl overflow-hidden transition-all duration-700 cursor-pointer group hover:scale-[1.03] hover:shadow-2xl ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{
                transitionDelay: `${i * 0.1}s`,
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              {/* Photo */}
              <div className="h-36 relative overflow-hidden">
                <img
                  src={n.image}
                  alt={n.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(10,20,35,0.55))",
                  }}
                />
                {/* District name overlay */}
                <div className="absolute bottom-2 left-3">
                  <span
                    className="text-xs font-bold tracking-wider uppercase"
                    style={{ color: "#C9A96E" }}
                  >
                    {n.name}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div
                className="p-5"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <p
                  className="text-sm mb-3 leading-relaxed"
                  style={{ color: "rgba(245,240,232,0.78)" }}
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
