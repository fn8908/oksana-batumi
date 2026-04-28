"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useInView } from "@/hooks/useInView";

interface EliteItem {
  type: string;
  location: string;
  price: string;
  desc: string;
  tags: string[];
  image: string;
}

export default function EliteRealty() {
  const { t, tArr } = useLanguage();
  const { ref, inView } = useInView();

  const items = tArr<EliteItem>("elite.items");

  const scrollToForm = () => {
    const el = document.getElementById("contact-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="elite"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      ref={ref}
      style={{
        background:
          "linear-gradient(180deg, #0a1420 0%, #0c1c30 50%, #0a1420 100%)",
      }}
    >
      {/* Background accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 5% 50%, rgba(201,169,110,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 95% 30%, rgba(78,205,196,0.04) 0%, transparent 40%)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Gold badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(201,169,110,0.1)",
              border: "1px solid rgba(201,169,110,0.3)",
              color: "#C9A96E",
            }}
          >
            ✦ Premium
          </div>

          <h2
            className="font-cormorant font-semibold text-4xl lg:text-5xl mb-4"
            style={{ color: "#F5F0E8" }}
          >
            {t("elite.title")}
          </h2>
          <p
            className="font-nunito text-base max-w-2xl mx-auto"
            style={{ color: "rgba(245,240,232,0.55)" }}
          >
            {t("elite.subtitle")}
          </p>
          <div
            className="w-20 h-px mx-auto mt-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, #C9A96E, transparent)",
            }}
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className={`group rounded-2xl overflow-hidden transition-all duration-700 cursor-pointer hover:scale-[1.02] hover:shadow-2xl ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{
                transitionDelay: `${i * 0.12}s`,
                border: "1px solid rgba(201,169,110,0.15)",
                background: "rgba(255,255,255,0.03)",
              }}
              onClick={scrollToForm}
            >
              {/* Photo */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.type}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(10,20,35,0.75) 100%)",
                  }}
                />

                {/* Location badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(10,20,35,0.8)",
                      color: "#C9A96E",
                      border: "1px solid rgba(201,169,110,0.3)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    📍 {item.location}
                  </span>
                </div>

                {/* Price badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className="text-sm font-bold px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(201,169,110,0.9)",
                      color: "#0F1C2E",
                    }}
                  >
                    {item.price}
                  </span>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3
                    className="font-cormorant font-semibold text-2xl mb-1"
                    style={{ color: "#F5F0E8" }}
                  >
                    {item.type}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "rgba(245,240,232,0.65)" }}
                >
                  {item.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {item.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(201,169,110,0.08)",
                        color: "#C9A96E",
                        border: "1px solid rgba(201,169,110,0.2)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 group-hover:opacity-100 opacity-80"
                  style={{
                    background: "rgba(201,169,110,0.12)",
                    color: "#C9A96E",
                    border: "1px solid rgba(201,169,110,0.3)",
                  }}
                >
                  {t("elite.cta")} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
