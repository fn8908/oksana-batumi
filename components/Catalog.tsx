"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useInView } from "@/hooks/useInView";
import PropertyModal from "./PropertyModal";

interface Property {
  type: string;
  district: string;
  price: string;
  tags: string[];
  image?: string;
  gradient?: string;
  priceNum?: number;
  rentalType?: "long" | "short" | "both";
  rooms?: string;
}

interface Filters {
  rentalType: string;
  budget: string;
  rooms: string;
}

interface CatalogProps {
  filters: Filters;
}

const fallbackGradients = [
  "linear-gradient(135deg, #0a3d62, #1a6b8a)",
  "linear-gradient(135deg, #1a1a6b, #2d3a8c)",
  "linear-gradient(135deg, #3d0a62, #6b1a8c)",
  "linear-gradient(135deg, #0a4d6b, #0d7a9c)",
  "linear-gradient(135deg, #0a3d1a, #1a6b3a)",
  "linear-gradient(135deg, #6b3d0a, #9c6b1a)",
  "linear-gradient(135deg, #1a4a5e, #2d7a8c)",
];

export default function Catalog({ filters }: CatalogProps) {
  const { t, tArr, lang } = useLanguage();
  const { ref, inView } = useInView();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const properties = tArr<Property>("properties");

  const filtered = properties.filter((prop) => {
    if (filters.rentalType) {
      const rt = prop.rentalType ?? "long";
      if (filters.rentalType === "long" && rt === "short") return false;
      if (filters.rentalType === "short" && rt === "long") return false;
    }
    if (filters.budget && prop.priceNum !== undefined) {
      const p = prop.priceNum;
      if (filters.budget === "500" && p > 500) return false;
      if (filters.budget === "1000" && (p <= 500 || p > 1000)) return false;
      if (filters.budget === "2000" && (p <= 1000 || p > 2000)) return false;
      if (filters.budget === "2000+" && p <= 2000) return false;
    }
    if (filters.rooms && prop.rooms) {
      if (prop.rooms !== filters.rooms) return false;
    }
    return true;
  });

  return (
    <section id="catalog" className="py-24 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2
            className="font-cormorant font-semibold text-4xl lg:text-5xl mb-3"
            style={{ color: "#F5F0E8" }}
          >
            {t("catalog.title")}
          </h2>
          <p
            className="font-nunito text-base"
            style={{ color: "rgba(245,240,232,0.72)" }}
          >
            {t("catalog.subtitle")}
          </p>
          <div
            className="w-16 h-px mx-auto mt-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, #C9A96E, transparent)",
            }}
          />
        </div>

        {/* Active filters indicator */}
        {(filters.rentalType || filters.budget || filters.rooms) && (
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {filters.rentalType && (
              <span
                className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{
                  background: "rgba(78,205,196,0.15)",
                  color: "#4ECDC4",
                  border: "1px solid rgba(78,205,196,0.3)",
                }}
              >
                {filters.rentalType === "long"
                  ? t("search.longTerm")
                  : t("search.shortTerm")}
              </span>
            )}
            {filters.budget && (
              <span
                className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{
                  background: "rgba(78,205,196,0.15)",
                  color: "#4ECDC4",
                  border: "1px solid rgba(78,205,196,0.3)",
                }}
              >
                {filters.budget === "500"
                  ? t("search.budget1")
                  : filters.budget === "1000"
                    ? t("search.budget2")
                    : filters.budget === "2000"
                      ? t("search.budget3")
                      : t("search.budget4")}
              </span>
            )}
            {filters.rooms && (
              <span
                className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{
                  background: "rgba(78,205,196,0.15)",
                  color: "#4ECDC4",
                  border: "1px solid rgba(78,205,196,0.3)",
                }}
              >
                {filters.rooms === "studio"
                  ? t("search.studio")
                  : `${filters.rooms} ${lang === "ru" || lang === "uk" ? "комн." : "br."}`}
              </span>
            )}
          </div>
        )}

        {/* No results */}
        {filtered.length === 0 && (
          <p
            className="text-center py-16 text-lg"
            style={{ color: "rgba(245,240,232,0.4)", fontFamily: "var(--font-nunito)" }}
          >
            {t("catalog.noResults")}
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((prop, i) => (
            <div
              key={i}
              className={`group rounded-2xl overflow-hidden transition-all duration-700 cursor-pointer hover:scale-[1.02] hover:shadow-2xl ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.13)",
                backdropFilter: "blur(8px)",
                transitionDelay: `${i * 0.08}s`,
              }}
              onClick={() => setSelectedProperty(prop)}
            >
              {/* Photo or gradient */}
              <div className="relative h-48 overflow-hidden">
                {prop.image ? (
                  <>
                    <img
                      src={prop.image}
                      alt={prop.type}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, transparent 50%, rgba(10,20,35,0.7))",
                      }}
                    />
                  </>
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: fallbackGradients[i % fallbackGradients.length] }}
                  >
                    <span className="text-5xl opacity-60 group-hover:scale-110 transition-transform duration-300">
                      🏢
                    </span>
                  </div>
                )}

                {/* Price badge */}
                <div
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-sm font-bold"
                  style={{
                    background: "rgba(15,28,46,0.85)",
                    backdropFilter: "blur(8px)",
                    color: "#C9A96E",
                    border: "1px solid rgba(201,169,110,0.35)",
                  }}
                >
                  {t("catalog.from")} {prop.price}
                  {t("catalog.perMonth")}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-1">
                  <h3
                    className="font-cormorant font-semibold text-xl leading-tight"
                    style={{ color: "#F5F0E8" }}
                  >
                    {prop.type}
                  </h3>
                </div>
                <p
                  className="text-sm mb-4 flex items-center gap-1.5"
                  style={{ color: "rgba(245,240,232,0.7)" }}
                >
                  <span>📍</span> {prop.district}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {prop.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(78,205,196,0.08)",
                        color: "#4ECDC4",
                        border: "1px solid rgba(78,205,196,0.15)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <button
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-[rgba(201,169,110,0.2)]"
                  style={{
                    background: "rgba(201,169,110,0.15)",
                    color: "#C9A96E",
                    border: "1px solid rgba(201,169,110,0.35)",
                  }}
                >
                  {t("catalog.details")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </section>
  );
}
