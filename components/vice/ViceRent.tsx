"use client";

import { useLanguage } from "@/context/LanguageContext";
import { listings } from "@/lib/listings";
import { TG_URL, WA_URL } from "@/lib/contacts";
import ViceCard from "./ViceCard";
import ViceTitle from "./ViceTitle";

// Аренда и предложение владельцам - одним разделом, как на основном сайте
export default function ViceRent() {
  const { t, lang } = useLanguage();
  const rent = listings.filter((l) => l.deal === "rent");

  const pickRent = () => {
    window.dispatchEvent(new CustomEvent("pick-deal", { detail: "rent" }));
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="rent" className="py-20 px-4 sm:px-6 lg:px-8" style={{ scrollMarginTop: "64px" }}>
      <div className="max-w-7xl mx-auto">
        <ViceTitle title={t("rentBlock.title")} subtitle={t("rentBlock.subtitle")} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rent.map((l) => (
            <ViceCard key={l.slug} l={l} lang={lang} />
          ))}

          <div className="vice-panel p-6 flex flex-col justify-center text-center">
            <h3 className="vice-display text-base uppercase mb-2" style={{ color: "#fff" }}>
              {t("rentBlock.pickTitle")}
            </h3>
            <p className="text-sm mb-5" style={{ color: "var(--v-muted)" }}>
              {t("rentBlock.pickText")}
            </p>
            <button onClick={pickRent} className="vice-btn-ghost py-3 px-5 text-xs self-center">
              {t("rentBlock.btn")}
            </button>
          </div>

          <div className="vice-panel p-6 flex flex-col justify-center text-center">
            <h3 className="vice-display text-base uppercase mb-2" style={{ color: "#fff" }}>
              {t("ownersBlock.title")}
            </h3>
            <p className="text-sm mb-5" style={{ color: "var(--v-muted)" }}>
              {t("ownersBlock.text")}
            </p>
            <a href={TG_URL} target="_blank" rel="noopener noreferrer" className="vice-btn py-3 px-5 text-xs self-center">
              {t("ownersBlock.btn")}
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="vice-btn-ghost py-3 px-5 text-xs self-center mt-3"
              style={{ borderColor: "#25D366", color: "#25D366" }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
