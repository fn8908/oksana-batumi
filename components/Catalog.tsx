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
  gradient: string;
}

interface Filters {
  rentalType: string;
  budget: string;
  rooms: string;
}

interface CatalogProps {
  filters: Filters;
}

const gradients = [
  "linear-gradient(135deg, #0a3d62, #1a6b8a)",
  "linear-gradient(135deg, #1a1a6b, #2d3a8c)",
  "linear-gradient(135deg, #3d0a62, #6b1a8c)",
  "linear-gradient(135deg, #0a4d6b, #0d7a9c)",
  "linear-gradient(135deg, #0a3d1a, #1a6b3a)",
  "linear-gradient(135deg, #6b3d0a, #9c6b1a)",
];

export default function Catalog({ filters }: CatalogProps) {
  const { t, tArr, lang } = useLanguage();
  const { ref, inView } = useInView();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const properties = tArr<Property>(
    lang === "ru" ? "properties" : "properties"
  );

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
          <p className="font-nunito text-base" style={{ color: "rgba(245,240,232,0.55)" }}>
            {t("catalog.subtitle")}
          </p>
          <div
            className="w-16 h-px mx-auto mt-6"
            style={{ background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }}
          />
        </div>

        {/* Active filters indicator */}
        {(filters.rentalType || filters.budget || filters.rooms) && (
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {filters.rentalType && (
              <span
                className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{ background: "rgba(78,205,196,0.15)", color: "#4ECDC4", border: "1px solid rgba(78,205,196,0.3)" }}
              >
                {filters.rentalType === "long" ? t("search.longTerm") : t("search.shortTerm")}
              </span>
            )}
            {filters.budget && (
              <span
                className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{ background: "rgba(78,205,196,0.15)", color: "#4ECDC4", border: "1px solid rgba(78,205,196,0.3)" }}
              >
                {filters.budget === "500" ? t("search.budget1") :
                  filters.budget === "1000" ? t("search.budget2") :
                    filters.budget === "2000" ? t("search.budget3") : t("search.budget4")}
              </span>
            )}
            {filters.rooms && (
              <span
                className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{ background: "rgba(78,205,196,0.15)", color: "#4ECDC4", border: "1px solid rgba(78,205,196,0.3)" }}
              >
                {filters.rooms === "studio" ? t("search.studio") : `${filters.rooms} ${lang === "ru" ? "комн." : "br."}`}
              </span>
            )}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop, i) => (
            <div
              key={i}
              className={`group rounded-2xl overflow-hidden transition-all duration-700 cursor-pointer hover:scale-[1.02] hover:shadow-2xl ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
                transitionDelay: `${i * 0.08}s`,
              }}
              onClick={() => setSelectedProperty(prop)}
            >
              {/* Image placeholder */}
              <div
                className="relative h-48 flex items-center justify-center overflow-hidden"
                style={{ background: gradients[i] }}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.15) 0%, transparent 60%)",
                  }}
                />
                <span className="text-5xl opacity-60 group-hover:scale-110 transition-transform duration-300">🏢</span>
                {/* Price badge */}
                <div
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-sm font-bold"
                  style={{
                    background: "rgba(15,28,46,0.8)",
                    backdropFilter: "blur(8px)",
                    color: "#C9A96E",
                    border: "1px solid rgba(201,169,110,0.3)",
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
                <p className="text-sm mb-4 flex items-center gap-1.5" style={{ color: "rgba(245,240,232,0.5)" }}>
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
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group-hover:opacity-100 opacity-80"
                  style={{
                    background: "rgba(201,169,110,0.12)",
                    color: "#C9A96E",
                    border: "1px solid rgba(201,169,110,0.25)",
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
