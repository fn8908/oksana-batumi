"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useInView } from "@/hooks/useInView";

interface WhyItem {
  icon: string;
  title: string;
  text: string;
}

export default function WhyBatumi() {
  const { t, tArr, lang } = useLanguage();
  const { ref, inView } = useInView();

  const items = tArr<WhyItem>("whyBatumi.items");

  if (lang !== "ru") return null;

  return (
    <section
      id="why-batumi"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(180deg, #0F1C2E 0%, #091727 50%, #0F1C2E 100%)",
      }}
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2
            className="font-cormorant font-semibold text-4xl lg:text-5xl mb-4"
            style={{ color: "#F5F0E8" }}
          >
            {t("whyBatumi.title")}
          </h2>
          <p
            className="font-nunito text-base max-w-2xl mx-auto"
            style={{ color: "rgba(245,240,232,0.55)" }}
          >
            {t("whyBatumi.subtitle")}
          </p>
          <div
            className="w-16 h-px mx-auto mt-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, #C9A96E, transparent)",
            }}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 flex flex-col gap-3 transition-all duration-700 hover:scale-[1.02] hover:border-opacity-30 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(201,169,110,0.12)",
                transitionDelay: `${i * 0.07}s`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  background: "rgba(201,169,110,0.1)",
                  border: "1px solid rgba(201,169,110,0.2)",
                }}
              >
                {item.icon}
              </div>
              <h3
                className="font-cormorant font-semibold text-lg leading-snug"
                style={{ color: "#F5F0E8" }}
              >
                {item.title}
              </h3>
              <p
                className="font-nunito text-sm leading-relaxed"
                style={{ color: "rgba(245,240,232,0.55)" }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div
          className={`mt-14 text-center transition-all duration-700 delay-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div
            className="inline-block px-8 py-4 rounded-2xl font-cormorant text-xl font-semibold"
            style={{
              background: "rgba(201,169,110,0.08)",
              border: "1px solid rgba(201,169,110,0.25)",
              color: "#C9A96E",
            }}
          >
            {t("whyBatumi.tagline")}
          </div>
        </div>
      </div>
    </section>
  );
}
