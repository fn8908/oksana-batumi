"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { listings } from "@/lib/listings";
import ListingCard from "./ListingCard";
import SectionTitle from "./SectionTitle";

// Аренда и блок для владельцев: второстепенные направления, поэтому одним разделом
export default function RentBlock() {
  const { t, lang } = useLanguage();
  const rent = listings.filter((l) => l.deal === "rent");

  const pickRent = () => {
    window.dispatchEvent(new CustomEvent("pick-deal", { detail: "rent" }));
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const panel = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.13)",
  };

  return (
    <section id="rent" className="py-24 px-4 sm:px-6 lg:px-8" style={{ scrollMarginTop: "64px" }}>
      <div className="max-w-7xl mx-auto">
        <SectionTitle title={t("rentBlock.title")} subtitle={t("rentBlock.subtitle")} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rent.map((l) => (
            <ListingCard key={l.slug} l={l} lang={lang} />
          ))}

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl p-6 sm:p-8 flex-1 flex flex-col justify-center" style={panel}>
              <h3 className="font-cormorant font-semibold text-2xl mb-2" style={{ color: "#F5F0E8" }}>
                {t("rentBlock.pickTitle")}
              </h3>
              <p className="text-sm mb-5" style={{ color: "rgba(245,240,232,0.72)" }}>
                {t("rentBlock.pickText")}
              </p>
              <button
                onClick={pickRent}
                className="self-start px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "#C9A96E", color: "#0F1C2E" }}
              >
                {t("rentBlock.btn")}
              </button>
            </div>

            <div className="rounded-2xl p-6 sm:p-8 flex-1 flex flex-col justify-center" style={panel}>
              <h3 className="font-cormorant font-semibold text-2xl mb-2" style={{ color: "#F5F0E8" }}>
                {t("ownersBlock.title")}
              </h3>
              <p className="text-sm mb-5" style={{ color: "rgba(245,240,232,0.72)" }}>
                {t("ownersBlock.text")}
              </p>
              <Link
                href={`/${lang}/vladeltsam`}
                className="self-start px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:bg-white/10"
                style={{ border: "1px solid rgba(201,169,110,0.5)", color: "#C9A96E", textDecoration: "none" }}
              >
                {t("ownersBlock.btn")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
