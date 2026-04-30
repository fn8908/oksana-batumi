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
  const { t, lang } = useLanguage();
  const { ref, inView } = useInView();

  const [filters, setFilters] = useState<Filters>({
    rentalType: "",
    budget: "",
    rooms: "",
  });
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rental_type: filters.rentalType,
          budget: filters.budget,
          rooms: filters.rooms,
          contact,
          lang,
          source: "quick_search",
        }),
      });
    } catch {
      // show success regardless of network errors
    }
    setLoading(false);
    setSubmitted(true);
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

  const inputStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#F5F0E8",
    borderRadius: "12px",
    padding: "14px 16px",
    fontSize: "14px",
    fontFamily: "var(--font-nunito)",
    outline: "none",
    width: "100%",
  };

  return (
    <section className="py-0 -mt-8 relative z-10" ref={ref}>
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
          {submitted ? (
            <div className="flex items-center justify-center py-4 text-center">
              <p
                className="text-base sm:text-lg font-semibold"
                style={{ color: "#4ECDC4", fontFamily: "var(--font-nunito)" }}
              >
                {t("search.success")}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {/* Row 1: selects */}
              <div className="flex flex-col sm:flex-row gap-3">
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
              </div>

              {/* Row 2: contact + button */}
              <div className="flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-1 min-w-0">
                  <label
                    className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                    style={{ color: "rgba(245,240,232,0.5)" }}
                  >
                    {t("form.contactLabel")}
                  </label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t("form.contactPlaceholder")}
                  />
                </div>

                <div className="w-full sm:w-auto flex-shrink-0">
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                    style={{ background: "#4ECDC4", color: "#0F1C2E" }}
                  >
                    {loading ? "..." : t("search.findBtn")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
