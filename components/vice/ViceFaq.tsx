"use client";

import { useLanguage } from "@/context/LanguageContext";
import ViceTitle from "./ViceTitle";

interface QA {
  q: string;
  a: string;
}

export default function ViceFaq() {
  const { t, tArr } = useLanguage();
  const items = tArr<QA>("faq.items");

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8" style={{ scrollMarginTop: "64px" }}>
      <div className="max-w-3xl mx-auto">
        <ViceTitle title={t("faq.title")} subtitle={t("faq.subtitle")} />

        <div className="space-y-3">
          {items.map((item) => (
            <details key={item.q} className="vice-panel group">
              <summary
                className="cursor-pointer list-none flex items-center justify-between gap-4 p-5 vice-display text-sm sm:text-base uppercase"
                style={{ color: "#fff" }}
              >
                {item.q}
                <span
                  className="flex-shrink-0 text-2xl leading-none transition-transform group-open:rotate-45"
                  style={{ color: "#00e5ff", textShadow: "0 0 12px #00e5ff" }}
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--v-muted)" }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <p className="text-xs text-center mt-6" style={{ color: "rgba(243,228,255,0.45)" }}>
          {t("faq.note")}
        </p>
      </div>
    </section>
  );
}
