"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { ymGoal } from "@/lib/ym";

const DISTRICTS: Record<string, string[]> = {
  ru: ["Новый Бульвар", "Старый город", "Аллея героев", "Гонио", "Любой"],
  en: ["New Boulevard", "Old Town", "Heroes Alley", "Gonio", "Any"],
  ka: ["ახალი ბულვარი", "ძველი ქალაქი", "გმირთა გამზირი", "გონიო", "ნებისმიერი"],
  tr: ["Yeni Bulvar", "Eski Şehir", "Kahramanlar Caddesi", "Gonyo", "Herhangi Biri"],
  uk: ["Новий Бульвар", "Старе місто", "Алея Героїв", "Гоніо", "Будь-який"],
  he: ["הבולוואר החדש", "העיר העתיקה", "שדרת הגיבורים", "גוניו", "כל שכונה"],
};

export default function ContactForm() {
  const { t, lang } = useLanguage();
  const { ref, inView } = useInView();
  const router = useRouter();

  const districts = DISTRICTS[lang] ?? DISTRICTS.ru;

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [dealType, setDealType] = useState("rent");
  const [rentalType, setRentalType] = useState("long");
  const [propertyType, setPropertyType] = useState("apartment");
  const [rooms, setRooms] = useState("");
  const [budget, setBudget] = useState(600);
  const [budgetInput, setBudgetInput] = useState("600");
  const [desiredPrice, setDesiredPrice] = useState("");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");

  const toggleDistrict = (d: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          budget,
          rooms,
          deal_type: dealType,
          rental_type: rentalType,
          property_type: propertyType,
          districts: selectedDistricts,
          comment,
          lang,
          ...(dealType === "buy" && desiredPrice ? { desired_price: desiredPrice } : {}),
        }),
      });
      ymGoal('form_submit');
      router.push('/thank-you');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: "12px",
    padding: "14px 16px",
    color: "#F5F0E8",
    fontSize: "14px",
    fontFamily: "var(--font-nunito)",
    outline: "none",
    resize: "none" as const,
  };

  const toggleBtnStyle = (active: boolean) => ({
    padding: "10px 18px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600" as const,
    cursor: "pointer" as const,
    border: active ? "1px solid #C9A96E" : "1px solid rgba(255,255,255,0.12)",
    background: active ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.04)",
    color: active ? "#C9A96E" : "rgba(245,240,232,0.7)",
    transition: "all 0.2s",
    fontFamily: "var(--font-nunito)",
  });

  const dealTypeOptions = [
    { value: "rent", label: t("form.rent") },
    { value: "buy", label: t("form.buy") },
  ];

  const rentalDurationOptions = [
    { value: "long", label: t("form.longTerm") },
  ];

  const propertyTypes = [
    { value: "studio", label: t("form.studio") },
    { value: "apartment", label: t("form.apartment") },
    { value: "house", label: t("form.house") },
    { value: "villa", label: t("form.villa") },
  ];

  const roomOptions = [
    { value: "studio", label: t("form.studio") },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3+", label: "3+" },
  ];

  return (
    <section
      id="contact-form"
      className="py-24 px-4 sm:px-6 lg:px-8"
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #0F1C2E 0%, #0a1620 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2
            className="font-cormorant font-semibold text-4xl lg:text-5xl mb-3"
            style={{ color: "#F5F0E8" }}
          >
            {t("form.title")}
          </h2>
          <p
            className="font-nunito text-base"
            style={{ color: "rgba(245,240,232,0.72)" }}
          >
            {t("form.subtitle")}
          </p>
          <div
            className="w-16 h-px mx-auto mt-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, #C9A96E, transparent)",
            }}
          />
        </div>

        <div
          className={`rounded-2xl p-6 sm:p-8 lg:p-10 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.13)",
            backdropFilter: "blur(12px)",
            transitionDelay: "0.15s",
          }}
        >
          <>
              {/* Step indicator */}
              <div className="flex items-center justify-center gap-3 mb-8">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <div
                      className="flex items-center gap-2"
                      style={{ opacity: step >= s ? 1 : 0.4 }}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          background:
                            step >= s ? "#C9A96E" : "rgba(255,255,255,0.1)",
                          color: step >= s ? "#0F1C2E" : "#F5F0E8",
                        }}
                      >
                        {s}
                      </div>
                      <span
                        className="text-xs font-semibold"
                        style={{
                          color:
                            step >= s
                              ? "#C9A96E"
                              : "rgba(245,240,232,0.4)",
                        }}
                      >
                        {s === 1 ? t("form.step1") : t("form.step2")}
                      </span>
                    </div>
                    {s < 2 && (
                      <div
                        className="w-12 h-px"
                        style={{
                          background:
                            step > 1 ? "#C9A96E" : "rgba(255,255,255,0.15)",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-6">
                    {/* Deal type: buy or rent */}
                    <div>
                      <label
                        className="block text-xs font-semibold mb-3 uppercase tracking-wider"
                        style={{ color: "rgba(245,240,232,0.7)" }}
                      >
                        {t("form.dealTypeLabel")}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {dealTypeOptions.map((dt) => (
                          <button
                            key={dt.value}
                            type="button"
                            style={toggleBtnStyle(dealType === dt.value)}
                            onClick={() => {
                              setDealType(dt.value);
                              if (dt.value === "buy") {
                                setBudget(45000);
                                setBudgetInput("45000");
                              } else {
                                setBudget(600);
                                setBudgetInput("600");
                              }
                              setDesiredPrice("");
                            }}
                          >
                            {dt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Property type */}
                    <div>
                      <label
                        className="block text-xs font-semibold mb-3 uppercase tracking-wider"
                        style={{ color: "rgba(245,240,232,0.7)" }}
                      >
                        {t("form.propertyTypeLabel")}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {propertyTypes.map((pt) => (
                          <button
                            key={pt.value}
                            type="button"
                            style={toggleBtnStyle(propertyType === pt.value)}
                            onClick={() => setPropertyType(pt.value)}
                          >
                            {pt.label}
                          </button>
                        ))}
                      </div>
                    </div>


                    {/* Rooms (only for apartment) */}
                    {propertyType === "apartment" && (
                      <div>
                        <label
                          className="block text-xs font-semibold mb-3 uppercase tracking-wider"
                          style={{ color: "rgba(245,240,232,0.7)" }}
                        >
                          {t("form.roomsLabel")}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {roomOptions.map((ro) => (
                            <button
                              key={ro.value}
                              type="button"
                              style={toggleBtnStyle(rooms === ro.value)}
                              onClick={() => setRooms(ro.value)}
                            >
                              {ro.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Budget slider */}
                    <div>
                      <label
                        className="block text-xs font-semibold mb-3 uppercase tracking-wider"
                        style={{ color: "rgba(245,240,232,0.7)" }}
                      >
                        {dealType === "buy" ? t("form.budgetBuyLabel") : t("form.budgetLabel")}
                      </label>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="text-sm"
                          style={{ color: "rgba(245,240,232,0.7)" }}
                        >
                          {dealType === "buy" ? "$45,000" : "$200"}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="font-cormorant font-bold text-xl" style={{ color: "#C9A96E" }}>$</span>
                          <input
                            type="number"
                            value={budgetInput}
                            onChange={(e) => setBudgetInput(e.target.value)}
                            onBlur={(e) => {
                              const raw = Number(e.target.value);
                              if (dealType === "buy") {
                                const rounded = Math.round(raw / 25000) * 25000;
                                const clamped = Math.min(1000000, Math.max(45000, isNaN(rounded) ? 45000 : rounded));
                                setBudget(clamped);
                                setBudgetInput(String(clamped));
                              } else {
                                const rounded = Math.round(raw / 100) * 100;
                                const clamped = Math.min(5000, Math.max(200, isNaN(rounded) ? 200 : rounded));
                                setBudget(clamped);
                                setBudgetInput(String(clamped));
                              }
                            }}
                            className="font-cormorant font-bold text-xl text-center"
                            style={{
                              color: "#C9A96E",
                              background: "transparent",
                              border: "none",
                              borderBottom: "1px solid rgba(201,169,110,0.5)",
                              outline: "none",
                              width: dealType === "buy" ? "120px" : "90px",
                            }}
                          />
                        </div>
                        <span
                          className="text-sm"
                          style={{ color: "rgba(245,240,232,0.7)" }}
                        >
                          {dealType === "buy" ? "$1,000,000+" : "$5000"}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={dealType === "buy" ? 45000 : 200}
                        max={dealType === "buy" ? 1000000 : 5000}
                        step={dealType === "buy" ? 25000 : 100}
                        value={budget}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setBudget(val);
                          setBudgetInput(String(val));
                        }}
                        style={{ width: "100%" }}
                      />
                    </div>

                    {/* Desired price (buy only) */}
                    {dealType === "buy" && (
                      <div>
                        <label
                          className="block text-xs font-semibold mb-3 uppercase tracking-wider"
                          style={{ color: "rgba(245,240,232,0.7)" }}
                        >
                          {t("form.desiredPriceLabel")}
                        </label>
                        <input
                          type="text"
                          style={inputStyle}
                          value={desiredPrice}
                          onChange={(e) => setDesiredPrice(e.target.value)}
                          placeholder={t("form.desiredPricePlaceholder")}
                        />
                      </div>
                    )}

                    {/* Districts */}
                    <div>
                      <label
                        className="block text-xs font-semibold mb-3 uppercase tracking-wider"
                        style={{ color: "rgba(245,240,232,0.7)" }}
                      >
                        {t("form.districtsLabel")}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {districts.map((d) => (
                          <button
                            key={d}
                            type="button"
                            style={toggleBtnStyle(selectedDistricts.includes(d))}
                            onClick={() => toggleDistrict(d)}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full py-4 rounded-xl font-semibold text-sm transition-all hover:opacity-90 hover:scale-[1.01]"
                      style={{ background: "#C9A96E", color: "#0F1C2E" }}
                    >
                      {t("form.next")} →
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                          style={{ color: "rgba(245,240,232,0.7)" }}
                        >
                          {t("form.nameLabel")}
                        </label>
                        <input
                          style={inputStyle}
                          type="text"
                          placeholder={t("form.namePlaceholder")}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label
                          className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                          style={{ color: "rgba(245,240,232,0.7)" }}
                        >
                          {t("form.contactLabel")}
                        </label>
                        <input
                          style={inputStyle}
                          type="text"
                          placeholder={t("form.contactPlaceholder")}
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                        style={{ color: "rgba(245,240,232,0.7)" }}
                      >
                        {t("form.commentLabel")}
                      </label>
                      <textarea
                        style={{ ...inputStyle, minHeight: "100px" }}
                        placeholder={t("form.commentPlaceholder")}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-4 rounded-xl font-semibold text-sm transition-all hover:opacity-80"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          color: "#F5F0E8",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        ← {t("form.back")}
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-4 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-60"
                        style={{ background: "#C9A96E", color: "#0F1C2E" }}
                      >
                        {loading ? "..." : t("form.submit")}
                      </button>
                    </div>

                    <p
                      className="text-xs text-center mt-3"
                      style={{ color: "rgba(245,240,232,0.6)" }}
                    >
                      {t("form.privacy")}
                    </p>
                  </div>
                )}
              </form>
            </>
        </div>
      </div>
    </section>
  );
}
