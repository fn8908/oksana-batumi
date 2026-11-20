"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Palm from "@/components/vice/Palm";

export default function ViceThankYou() {
  const { t, lang } = useLanguage();

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 text-center">
      <div className="vice-sky absolute inset-0" />
      <div className="vice-sun" style={{ width: "min(460px, 80vw)", height: "min(460px, 80vw)", bottom: "22%" }} />
      <div className="vice-grid" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(10,2,22,0.8) 100%)" }} />
      <Palm className="left-[-4%] w-[140px] sm:w-[220px]" />
      <Palm flip className="right-[-4%] w-[120px] sm:w-[190px]" />

      <div className="relative z-10 max-w-xl">
        <h1 className="vice-display vice-neon text-3xl sm:text-5xl uppercase mb-5">{t("thankYou.heading")}</h1>
        <p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.9)" }}>
          {t("thankYou.subtext")}
        </p>
        <Link href={`/${lang}`} className="vice-btn px-8 py-4 text-sm">
          {t("thankYou.back")}
        </Link>
      </div>
    </main>
  );
}
