"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { IG_URL, TG_URL } from "@/lib/contacts";
import { ymGoal } from "@/lib/ym";

const YT_RU = "https://www.youtube.com/channel/UCTXjFpssnnLvfBZavhTz1jw/";
const YT_EN = "https://www.youtube.com/channel/UC5wNLVrfLXr0DLcDRHMibyg/";

const TG_PATH =
  "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z";
const IG_PATH =
  "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077";
const YT_PATH =
  "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z";

const ICON_BG = {
  telegram: { background: "#ffffff", glow: "rgba(38,165,228,0.65)" },
  instagram: {
    background:
      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
    glow: "rgba(214,36,159,0.6)",
  },
  youtube: { background: "#ffffff", glow: "rgba(255,0,0,0.55)" },
} as const;

function SocialIcon({ kind, size }: { kind: keyof typeof ICON_BG; size: number }) {
  const d = kind === "telegram" ? TG_PATH : kind === "instagram" ? IG_PATH : YT_PATH;
  const fill = kind === "telegram" ? "#26A5E4" : kind === "instagram" ? "#ffffff" : "#FF0000";
  const inner = kind === "telegram" ? size : Math.round(size * (kind === "instagram" ? 0.5 : 0.62));
  return (
    <svg viewBox="0 0 24 24" width={inner} height={inner} fill={fill} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function socialStyle(kind: keyof typeof ICON_BG, size: number): React.CSSProperties {
  return {
    width: size,
    height: size,
    borderRadius: "9999px",
    alignItems: "center",
    justifyContent: "center",
    background: ICON_BG[kind].background,
    boxShadow: `0 0 14px ${ICON_BG[kind].glow}, 0 4px 14px rgba(0,0,0,0.45)`,
    overflow: "hidden",
  };
}

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
        className="sm:hidden fixed left-0 right-0 bottom-0 z-50 flex items-center gap-2 p-2"
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
          aria-label={t("floatingCta.telegram")}
          onClick={() => ymGoal("telegram_floating_click")}
          className="inline-flex shrink-0 transition-transform active:scale-95"
          style={socialStyle("telegram", 44)}
        >
          <SocialIcon kind="telegram" size={44} />
        </a>
        <a
          href={IG_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          onClick={() => ymGoal("instagram_floating_click")}
          className="inline-flex shrink-0 transition-transform active:scale-95"
          style={socialStyle("instagram", 44)}
        >
          <SocialIcon kind="instagram" size={44} />
        </a>
        <a
          href={YT_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("floatingCta.youtube")}
          className="inline-flex shrink-0 transition-transform active:scale-95"
          style={socialStyle("youtube", 44)}
        >
          <SocialIcon kind="youtube" size={44} />
        </a>
        <a href="#contact-form" className="vice-btn flex-1 py-3 text-xs">
          {t("hero.cta1")}
        </a>
      </div>

      {/* Компьютер: три значка справа */}
      <a
        href={TG_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("floatingCta.telegram")}
        onClick={() => ymGoal("telegram_floating_click")}
        className="hidden sm:inline-flex transition-transform hover:scale-110"
        style={{ ...fade, ...socialStyle("telegram", 52), position: "fixed", right: "20px", bottom: "24px", zIndex: 50 }}
      >
        <SocialIcon kind="telegram" size={52} />
      </a>
      <a
        href={IG_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        onClick={() => ymGoal("instagram_floating_click")}
        className="hidden sm:inline-flex transition-transform hover:scale-110"
        style={{ ...fade, ...socialStyle("instagram", 52), position: "fixed", right: "20px", bottom: "88px", zIndex: 50 }}
      >
        <SocialIcon kind="instagram" size={52} />
      </a>
      <a
        href={YT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("floatingCta.youtube")}
        className="hidden sm:inline-flex transition-transform hover:scale-110"
        style={{ ...fade, ...socialStyle("youtube", 52), position: "fixed", right: "20px", bottom: "152px", zIndex: 50 }}
      >
        <SocialIcon kind="youtube" size={52} />
      </a>
    </>
  );
}
