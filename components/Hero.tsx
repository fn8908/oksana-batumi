"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ymGoal } from "@/lib/ym";

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
    >
      {/* Panorama background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1692960570657-cd1c319a0f29?w=1920&q=85&auto=format&fit=crop"
          alt="Батуми панорама — город, новостройки, бульвар, пляж, горы, море"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 40%" }}
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(10,18,30,0.82) 0%, rgba(15,28,46,0.70) 50%, rgba(8,15,25,0.88) 100%)",
          }}
        />
        {/* Bottom fade to site background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #0F1C2E)",
          }}
        />
      </div>

      {/* Animated gradient accents */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 15% 60%, rgba(78,205,196,0.25) 0%, transparent 45%),
            radial-gradient(ellipse at 85% 25%, rgba(201,169,110,0.2) 0%, transparent 40%)
          `,
        }}
      />

      {/* Top gold line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
        {/* Tag */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{
            background: "rgba(201,169,110,0.12)",
            border: "1px solid rgba(201,169,110,0.35)",
            color: "#C9A96E",
            transitionDelay: "0.1s",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#4ECDC4" }}
          />
          Батуми · Грузия · 2026
        </div>

        {/* H1 */}
        <h1
          className={`font-cormorant font-semibold text-4xl sm:text-5xl lg:text-7xl leading-tight mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{
            color: "#F5F0E8",
            transitionDelay: "0.2s",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          {t("hero.title")}
        </h1>

        {/* Subtitle */}
        <p
          className={`font-nunito text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{
            color: "rgba(245,240,232,0.92)",
            transitionDelay: "0.35s",
            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
          }}
        >
          {t("hero.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "0.5s" }}
        >
          {/* PRIMARY: Telegram — главная конверсия */}
          <a
            href="https://t.me/ALazarev095"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => ymGoal("telegram_hero_click")}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
            style={{
              background: "#C9A96E",
              color: "#0F1C2E",
              boxShadow: "0 8px 32px rgba(201,169,110,0.35)",
              textDecoration: "none",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.985l-2.95-.924c-.64-.203-.654-.64.136-.953l11.5-4.432c.534-.194 1.001.13.616.572z" />
            </svg>
            Написать в Telegram
          </a>
          {/* SECONDARY: подобрать квартиру через форму */}
          <button
            onClick={() => scrollTo("contact-form")}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:bg-white/10 active:scale-95"
            style={{
              border: "1px solid rgba(245,240,232,0.5)",
              color: "#F5F0E8",
              backdropFilter: "blur(8px)",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            {t("hero.cta1")}
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
                background: "rgba(15,28,46,0.7)",
                border: "1px solid rgba(201,169,110,0.35)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span className="text-xl">{fact.icon}</span>
              <span
                className="font-nunito font-semibold text-sm"
                style={{ color: "rgba(245,240,232,0.95)" }}
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
