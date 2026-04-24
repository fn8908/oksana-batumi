"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useInView } from "@/hooks/useInView";

export default function FinalCTA() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  const scrollToForm = () => {
    const el = document.getElementById("contact-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1a2f0a 0%, #1a1a0a 30%, #1a0a0a 60%, #0a1a2e 100%)",
      }}
      ref={ref}
    >
      {/* Decorative glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 50%, rgba(78,205,196,0.08) 0%, transparent 50%)
          `,
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)",
        }}
      />

      <div
        className={`relative max-w-3xl mx-auto text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2
          className="font-cormorant font-semibold text-4xl sm:text-5xl lg:text-6xl mb-5 leading-tight"
          style={{ color: "#F5F0E8" }}
        >
          {t("finalCta.title")}
        </h2>
        <p
          className="font-nunito text-lg mb-10"
          style={{ color: "rgba(245,240,232,0.6)" }}
        >
          {t("finalCta.subtitle")}
        </p>
        <button
          onClick={scrollToForm}
          className="inline-flex items-center gap-2 px-10 py-5 rounded-full font-semibold text-base transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
          style={{
            background: "#C9A96E",
            color: "#0F1C2E",
            boxShadow: "0 16px 48px rgba(201,169,110,0.35)",
          }}
        >
          {t("finalCta.btn")}
        </button>
      </div>
    </section>
  );
}
