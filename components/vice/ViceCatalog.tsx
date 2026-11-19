"use client";

import { useLanguage } from "@/context/LanguageContext";
import { listings } from "@/lib/listings";
import ViceCard from "./ViceCard";
import ViceTitle from "./ViceTitle";

export default function ViceCatalog() {
  const { t, lang } = useLanguage();
  const sale = listings.filter((l) => l.deal === "sale");

  return (
    <section id="sale" className="py-20 px-4 sm:px-6 lg:px-8" style={{ scrollMarginTop: "64px" }}>
      <div className="max-w-7xl mx-auto">
        <ViceTitle title={t("sale.title")} subtitle={t("sale.subtitle")} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sale.map((l) => (
            <ViceCard key={l.slug} l={l} lang={lang} />
          ))}
        </div>

        <div className="vice-panel mt-8 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-start">
          <div>
            <h3 className="vice-display text-lg uppercase mb-2" style={{ color: "#fff" }}>
              {t("sale.moreTitle")}
            </h3>
            <p className="text-sm" style={{ color: "var(--v-muted)" }}>
              {t("sale.moreText")}
            </p>
          </div>
          <a href="#contact-form" className="vice-btn flex-shrink-0 px-7 py-3.5 text-xs">
            {t("hero.cta1")}
          </a>
        </div>
      </div>
    </section>
  );
}
