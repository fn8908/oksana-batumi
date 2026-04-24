"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useInView } from "@/hooks/useInView";

interface Filters {
  rentalType: string;
  budget: string;
  rooms: string;
}

interface QuickSearchProps {
  onSearch: (filters: Filters) => void;
}

export default function QuickSearch({ onSearch }: QuickSearchProps) {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  const [filters, setFilters] = useState<Filters>({
    rentalType: "",
    budget: "",
    rooms: "",
  });

  const handleSearch = () => {
    const catalogEl = document.getElementById("catalog");
    if (catalogEl) catalogEl.scrollIntoView({ behavior: "smooth" });
    onSearch(filters);
  };

  const selectStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#F5F0E8",
    borderRadius: "12px",
    padding: "14px 16px",
    fontSize: "14px",
    fontFamily: "var(--font-nunito)",
    outline: "none",
    width: "100%",
    appearance: "none" as const,
    cursor: "pointer",
  };

  return (
    <section
      className="py-0 -mt-8 relative z-10"
      ref={ref}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-2xl p-4 sm:p-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{
            background: "rgba(15,28,46,0.95)",
            border: "1px solid rgba(201,169,110,0.2)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            {/* Rental type */}
            <div className="flex-1 min-w-0">
              <label
                className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{ color: "rgba(245,240,232,0.5)" }}
              >
                {t("search.rentalType")}
              </label>
              <div className="relative">
                <select
                  style={selectStyle}
                  value={filters.rentalType}
                  onChange={(e) =>
                    setFilters({ ...filters, rentalType: e.target.value })
                  }
                >
                  <option value="">—</option>
                  <option value="long">{t("search.longTerm")}</option>
                  <option value="short">{t("search.shortTerm")}</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#C9A96E" }}>▾</span>
              </div>
            </div>

            {/* Budget */}
            <div className="flex-1 min-w-0">
              <label
                className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{ color: "rgba(245,240,232,0.5)" }}
              >
                {t("search.budget")}
              </label>
              <div className="relative">
                <select
                  style={selectStyle}
                  value={filters.budget}
                  onChange={(e) =>
                    setFilters({ ...filters, budget: e.target.value })
                  }
                >
                  <option value="">—</option>
                  <option value="500">{t("search.budget1")}</option>
                  <option value="1000">{t("search.budget2")}</option>
                  <option value="2000">{t("search.budget3")}</option>
                  <option value="2000+">{t("search.budget4")}</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#C9A96E" }}>▾</span>
              </div>
            </div>

            {/* Rooms */}
            <div className="flex-1 min-w-0">
              <label
                className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{ color: "rgba(245,240,232,0.5)" }}
              >
                {t("search.rooms")}
              </label>
              <div className="relative">
                <select
                  style={selectStyle}
                  value={filters.rooms}
                  onChange={(e) =>
                    setFilters({ ...filters, rooms: e.target.value })
                  }
                >
                  <option value="">—</option>
                  <option value="studio">{t("search.studio")}</option>
                  <option value="1">{t("search.room1")}</option>
                  <option value="2">{t("search.room2")}</option>
                  <option value="3+">{t("search.room3")}</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#C9A96E" }}>▾</span>
              </div>
            </div>

            {/* Search button */}
            <div className="w-full sm:w-auto flex-shrink-0">
              <button
                onClick={handleSearch}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 whitespace-nowrap"
                style={{
                  background: "#4ECDC4",
                  color: "#0F1C2E",
                }}
              >
                {t("search.findBtn")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
