"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TG_URL } from "@/lib/contacts";
import { ymGoal } from "@/lib/ym";

const YT_RU = "https://www.youtube.com/channel/UCTXjFpssnnLvfBZavhTz1jw/";
const YT_EN = "https://www.youtube.com/channel/UC5wNLVrfLXr0DLcDRHMibyg/";

export default function ViceFloating() {
  const { t, lang } = useLanguage();
  const YT_URL = ["en", "tr", "he"].includes(lang) ? YT_EN : YT_RU;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    const onScroll = () => {
      if (window.scrollY > 80) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const fade: React.CSSProperties = {
    transition: "opacity .35s ease, transform .35s ease",
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
    transform: visible ? "translateY(0)" : "translateY(16px)",
  };

  return (
    <>
      {/* Телефон: панель внизу */}
      <div
        className="sm:hidden fixed left-0 right-0 bottom-0 z-50 flex gap-2 p-2"
        style={{
          ...fade,
          background: "rgba(13,2,26,0.96)",
          borderTop: "1px solid rgba(255,46,136,0.5)",
          paddingBottom: "calc(8px + env(safe-area-inset-bottom))",
        }}
      >
        <a
          href={TG_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => ymGoal("telegram_floating_click")}
          className="vice-btn-ghost flex-1 py-3 text-xs"
        >
          Telegram
        </a>
        <a href="#contact-form" className="vice-btn flex-1 py-3 text-xs">
          {t("hero.cta1")}
        </a>
      </div>

      {/* Компьютер: две кнопки справа */}
      <a
        href={TG_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => ymGoal("telegram_floating_click")}
        className="hidden sm:inline-flex vice-btn px-5 py-3 text-xs"
        style={{ ...fade, position: "fixed", right: "20px", bottom: "24px", zIndex: 50 }}
      >
        {t("floatingCta.telegram")}
      </a>
      <a
        href={YT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline-flex vice-btn-ghost px-5 py-3 text-xs"
        style={{ ...fade, position: "fixed", right: "20px", bottom: "84px", zIndex: 50, background: "rgba(13,2,26,0.85)" }}
      >
        {t("floatingCta.youtube")}
      </a>
    </>
  );
}
