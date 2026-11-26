"use client";

import { useEffect, useState } from "react";
import { ymGoal } from "@/lib/ym";
import { useLanguage } from "@/context/LanguageContext";
import { WA_URL } from "@/lib/contacts";

const TG_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.985l-2.95-.924c-.64-.203-.654-.64.136-.953l11.5-4.432c.534-.194 1.001.13.616.572z" />
  </svg>
);

const YT_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const WA_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

// EN, TR, HE -> английский канал; KA, RU, UK -> русский
const YT_RU = "https://www.youtube.com/channel/UCTXjFpssnnLvfBZavhTz1jw/";
const YT_EN = "https://www.youtube.com/channel/UC5wNLVrfLXr0DLcDRHMibyg/";

export default function FloatingCTA() {
  const { t, lang } = useLanguage();
  const YT_URL = ["en", "tr", "he"].includes(lang) ? YT_EN : YT_RU;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after 1.5s — catches paid ad traffic that bounces before scrolling
    const timer = setTimeout(() => setVisible(true), 1500);
    const onScroll = () => { if (window.scrollY > 80) setVisible(true); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const base: React.CSSProperties = {
    background: "#C9A96E",
    color: "#0F1C2E",
    boxShadow: "0 8px 32px rgba(201,169,110,0.50)",
    transition: "opacity 0.35s ease, transform 0.35s ease",
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
    transform: visible ? "translateY(0)" : "translateY(16px)",
    textDecoration: "none",
    position: "fixed",
    bottom: "24px",
    right: "20px",
    zIndex: 50,
  };

  return (
    <>
      {/* Телефон: панель во всю ширину - написать или получить подборку */}
      <div
        className="sm:hidden flex gap-2 p-2"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          background: "rgba(15,28,46,0.96)",
          borderTop: "1px solid rgba(201,169,110,0.3)",
          paddingBottom: "calc(8px + env(safe-area-inset-bottom))",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transform: visible ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <a
          href="https://t.me/ALazarev095"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => ymGoal("telegram_floating_click")}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm"
          style={{ background: "#229ED9", color: "#fff", textDecoration: "none" }}
        >
          {TG_ICON}
          Telegram
        </a>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          onClick={() => ymGoal("whatsapp_floating_click")}
          className="flex items-center justify-center px-4 rounded-xl"
          style={{ background: "#25D366", color: "#fff", textDecoration: "none" }}
        >
          {WA_ICON}
        </a>
        <a
          href="#contact-form"
          className="flex-1 flex items-center justify-center py-3 rounded-xl font-semibold text-sm"
          style={{ background: "#C9A96E", color: "#0F1C2E", textDecoration: "none" }}
        >
          {t("hero.cta1")}
        </a>
      </div>

      {/* Desktop: pill with text */}
      <a
        href="https://t.me/ALazarev095"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => ymGoal("telegram_floating_click")}
        aria-label={t("floatingCta.telegram")}
        className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm hover:opacity-90 hover:scale-105 active:scale-95"
        style={{ ...base, fontFamily: "var(--font-nunito, sans-serif)" }}
      >
        {TG_ICON}
        {t("floatingCta.telegram")}
      </a>

      {/* WhatsApp: над Telegram (компьютер) */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => ymGoal("whatsapp_floating_click")}
        aria-label="WhatsApp"
        className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm hover:opacity-90 hover:scale-105 active:scale-95"
        style={{ ...base, background: "#25D366", color: "#fff", boxShadow: "0 8px 32px rgba(37,211,102,0.45)", bottom: "80px", fontFamily: "var(--font-nunito, sans-serif)" }}
      >
        {WA_ICON}
        WhatsApp
      </a>

      {/* YouTube: stacked above Telegram button */}
      {/* Mobile: round icon */}
      <a
        href={YT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("floatingCta.youtube")}
        className="sm:hidden flex items-center justify-center w-14 h-14 rounded-full hover:scale-110 active:scale-95"
        style={{ ...base, bottom: "84px" }}
      >
        {YT_ICON}
      </a>

      {/* Desktop: pill with text */}
      <a
        href={YT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("floatingCta.youtube")}
        className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm hover:opacity-90 hover:scale-105 active:scale-95"
        style={{ ...base, bottom: "136px", fontFamily: "var(--font-nunito, sans-serif)" }}
      >
        {YT_ICON}
        {t("floatingCta.youtube")}
      </a>
    </>
  );
}
