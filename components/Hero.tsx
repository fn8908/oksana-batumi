"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0F1C2E 0%, #1a3a5c 45%, #0d2137 100%)",
      }}
    >
      {/* Subtle animated background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(78,205,196,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(201,169,110,0.06) 0%, transparent 40%),
            radial-gradient(ellipse at 60% 80%, rgba(26,58,92,0.4) 0%, transparent 50%)
          `,
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* Decorative line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
        {/* Tag */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{
            background: "rgba(201,169,110,0.12)",
            border: "1px solid rgba(201,169,110,0.3)",
            color: "#C9A96E",
            transitionDelay: "0.1s",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#4ECDC4" }}
          />
          Батуми · Грузия · 2024
        </div>

        {/* H1 */}
        <h1
          className={`font-cormorant font-semibold text-4xl sm:text-5xl lg:text-7xl leading-tight mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{
            color: "#F5F0E8",
            transitionDelay: "0.2s",
          }}
        >
          {t("hero.title")}
        </h1>

        {/* Subtitle */}
        <p
          className={`font-nunito text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{
            color: "rgba(245,240,232,0.7)",
            transitionDelay: "0.35s",
          }}
        >
          {t("hero.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "0.5s" }}
        >
          <button
            onClick={() => scrollTo("contact-form")}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
            style={{
              background: "#C9A96E",
              color: "#0F1C2E",
              boxShadow: "0 8px 32px rgba(201,169,110,0.3)",
            }}
          >
            {t("hero.cta1")}
          </button>
          <button
            onClick={() => scrollTo("catalog")}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:bg-white/10 active:scale-95"
            style={{
              border: "1px solid rgba(245,240,232,0.4)",
              color: "#F5F0E8",
            }}
          >
            {t("hero.cta2")}
          </button>
        </div>

        {/* Facts row */}
        <div
          className={`flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "0.65s" }}
        >
          {[
            { icon: "🏠", text: t("hero.fact1") },
            { icon: "⭐", text: t("hero.fact2") },
            { icon: "🔒", text: t("hero.fact3") },
          ].map((fact) => (
            <div
              key={fact.text}
              className="flex items-center justify-center gap-3 px-5 py-3 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span className="text-xl">{fact.icon}</span>
              <span
                className="font-nunito font-semibold text-sm"
                style={{ color: "rgba(245,240,232,0.9)" }}
              >
                {fact.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
        <div
          className="w-5 h-8 rounded-full flex justify-center pt-1.5"
          style={{ border: "1px solid rgba(245,240,232,0.4)" }}
        >
          <div
            className="w-1 h-2 rounded-full animate-bounce"
            style={{ background: "#C9A96E" }}
          />
        </div>
      </div>
    </section>
  );
}
