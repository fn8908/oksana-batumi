"use client";

import { useLanguage } from "@/context/LanguageContext";
import SectionTitle from "./SectionTitle";

interface QA {
  q: string;
  a: string;
}

// Вопросы покупателя; те же тексты уходят в разметку FAQPage для поиска
export default function BuyerGuide() {
  const { t, tArr } = useLanguage();
  const items = tArr<QA>("faq.items");

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8" style={{ scrollMarginTop: "64px" }}>
      <div className="max-w-3xl mx-auto">
        <SectionTitle title={t("faq.title")} subtitle={t("faq.subtitle")} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((i) => ({
                "@type": "Question",
                name: i.q,
                acceptedAnswer: { "@type": "Answer", text: i.a },
              })),
            }),
          }}
        />

        <div className="space-y-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.13)" }}
            >
              <summary
                className="cursor-pointer list-none flex items-center justify-between gap-4 p-5 font-cormorant font-semibold text-xl"
                style={{ color: "#F5F0E8" }}
              >
                {item.q}
                <span
                  className="flex-shrink-0 text-2xl leading-none transition-transform group-open:rotate-45"
                  style={{ color: "#C9A96E" }}
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.78)" }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <p className="text-xs text-center mt-6" style={{ color: "rgba(245,240,232,0.45)" }}>
          {t("faq.note")}
        </p>
      </div>
    </section>
  );
}
