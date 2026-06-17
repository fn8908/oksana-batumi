"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ThankYouPage() {
  const { t } = useLanguage();

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#0F1C2E" }}
    >
      <div className="text-center max-w-md">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mx-auto mb-8"
          style={{
            background: "rgba(201,169,110,0.12)",
            border: "1px solid rgba(201,169,110,0.35)",
          }}
        >
          ✓
        </div>

        <h1
          className="font-cormorant font-semibold text-4xl lg:text-5xl mb-4"
          style={{ color: "#F5F0E8" }}
        >
          {t("thankYou.heading")}
        </h1>

        <p
          className="font-nunito text-base mb-10"
          style={{ color: "rgba(245,240,232,0.72)" }}
        >
          {t("thankYou.subtext")}
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-4 rounded-xl font-nunito font-semibold text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
          style={{ background: "#C9A96E", color: "#0F1C2E" }}
        >
          {t("thankYou.back")}
        </Link>
      </div>
    </main>
  );
}
