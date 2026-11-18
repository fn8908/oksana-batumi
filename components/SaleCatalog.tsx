"use client";

import { useLanguage } from "@/context/LanguageContext";
import { listings } from "@/lib/listings";
import ListingCard from "./ListingCard";
import SectionTitle from "./SectionTitle";

export default function SaleCatalog() {
  const { t, lang } = useLanguage();
  const sale = listings.filter((l) => l.deal === "sale");

  return (
    <section id="sale" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title={t("sale.title")} subtitle={t("sale.subtitle")} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sale.map((l) => (
            <ListingCard key={l.slug} l={l} lang={lang} />
          ))}
        </div>

        <div
          className="mt-8 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-start"
          style={{ background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.3)" }}
        >
          <div>
            <h3 className="font-cormorant font-semibold text-2xl mb-1" style={{ color: "#F5F0E8" }}>
              {t("sale.moreTitle")}
            </h3>
            <p className="text-sm" style={{ color: "rgba(245,240,232,0.72)" }}>
              {t("sale.moreText")}
            </p>
          </div>
          <a
            href="#contact-form"
            className="flex-shrink-0 px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:opacity-90"
            style={{ background: "#C9A96E", color: "#0F1C2E", textDecoration: "none" }}
          >
            {t("hero.cta1")}
          </a>
        </div>
      </div>
    </section>
  );
}
