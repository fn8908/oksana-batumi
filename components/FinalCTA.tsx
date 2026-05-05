"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { ymGoal } from "@/lib/ym";

export default function FinalCTA() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1625566360146-918001e76064?fm=jpg&q=80&w=1920&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
      }}
      ref={ref}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(10,20,35,0.72) 0%, rgba(10,20,35,0.82) 100%)",
        }}
      />
      {/* Gold glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 30% 50%, rgba(201,169,110,0.2) 0%, transparent 55%),
            radial-gradient(ellipse at 70% 50%, rgba(78,205,196,0.08) 0%, transparent 55%)
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

        {/* Telegram CTA button */}
        <a
          href="https://t.me/BatRealty"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => ymGoal('telegram_click')}
          className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-base transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
          style={{
            background: "#C9A96E",
            color: "#0F1C2E",
            boxShadow: "0 16px 48px rgba(201,169,110,0.35)",
            textDecoration: "none",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.985l-2.95-.924c-.64-.203-.654-.64.136-.953l11.5-4.432c.534-.194 1.001.13.616.572z"/>
          </svg>
          {t("finalCta.btn")}
        </a>

        {/* Secondary: form link */}
        <div className="mt-5">
          <button
            onClick={() => {
              const el = document.getElementById("contact-form");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm font-nunito underline underline-offset-4 transition-opacity hover:opacity-80"
            style={{ color: "rgba(245,240,232,0.4)" }}
          >
            {t("finalCta.formLink")}
          </button>
        </div>
      </div>
    </section>
  );
}
