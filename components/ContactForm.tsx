"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useInView } from "@/hooks/useInView";

const DISTRICTS_RU = ["Новый Бульвар", "Старый город", "Химшиашвили", "Гонио", "Любой"];
const DISTRICTS_EN = ["New Boulevard", "Old Town", "Khimshiashvili", "Gonio", "Any"];

export default function ContactForm() {
  const { t, lang } = useLanguage();
  const { ref, inView } = useInView();

  const districts = lang === "ru" ? DISTRICTS_RU : DISTRICTS_EN;

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [rentalType, setRentalType] = useState("");
  const [rooms, setRooms] = useState("");
  const [budget, setBudget] = useState(700);
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
          rental_type: rentalType,
          districts: selectedDistricts,
          comment,
        }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
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

  const rentalTypes = [
    { value: "long", label: t("form.longTerm") },
    { value: "short", label: t("form.shortTerm") },
    { value: "invest", label: t("form.investment") },
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
        background:
          "linear-gradient(180deg, #0F1C2E 0%, #0a1620 100%)",
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
          <p className="font-nunito text-base" style={{ color: "rgba(245,240,232,0.55)" }}>
            {t("form.subtitle")}
          </p>
          <div
            className="w-16 h-px mx-auto mt-6"
            style={{ background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }}
          />
        </div>

        <div
          className={`rounded-2xl p-6 sm:p-8 lg:p-10 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            transitionDelay: "0.15s",
          }}
        >
          {submitted ? (
            <div className="text-center py-12">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4"
                style={{ background: "rgba(78,205,196,0.12)", border: "1px solid rgba(78,205,196,0.3)" }}
              >
                ✅
              </div>
              <p
                className="font-cormorant font-semibold text-2xl"
                style={{ color: "#F5F0E8" }}
              >
                {t("form.success")}
              </p>
            </div>
          ) : (
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
                          background: step >= s ? "#C9A96E" : "rgba(255,255,255,0.1)",
                          color: step >= s ? "#0F1C2E" : "#F5F0E8",
                        }}
                      >
                        {s}
                      </div>
                      <span className="text-xs font-semibold" style={{ color: step >= s ? "#C9A96E" : "rgba(245,240,232,0.4)" }}>
                        {s === 1 ? t("form.step1") : t("form.step2")}
                      </span>
                    </div>
                    {s < 2 && (
                      <div
                        className="w-12 h-px"
                        style={{ background: step > 1 ? "#C9A96E" : "rgba(255,255,255,0.15)" }}
                      />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-6">
                    {/* Rental type */}
                    <div>
                      <label
                        className="block text-xs font-semibold mb-3 uppercase tracking-wider"
                        style={{ color: "rgba(245,240,232,0.5)" }}
                      >
                        {t("form.rentalTypeLabel")}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {rentalTypes.map((rt) => (
                          <button
                            key={rt.value}
                            type="button"
                            style={toggleBtnStyle(rentalType === rt.value)}
                            onClick={() => setRentalType(rt.value)}
                          >
                            {rt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rooms */}
                    <div>
                      <label
                        className="block text-xs font-semibold mb-3 uppercase tracking-wider"
                        style={{ color: "rgba(245,240,232,0.5)" }}
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

                    {/* Budget slider */}
                    <div>
                      <label
                        className="block text-xs font-semibold mb-3 uppercase tracking-wider"
                        style={{ color: "rgba(245,240,232,0.5)" }}
                      >
                        {t("form.budgetLabel")}
                      </label>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>$200</span>
                        <span
                          className="font-cormorant font-bold text-xl"
                          style={{ color: "#C9A96E" }}
                        >
                          ${budget.toLocaleString()}
                        </span>
                        <span className="text-sm" style={{ color: "rgba(245,240,232,0.5)" }}>$3000</span>
                      </div>
                      <input
                        type="range"
                        min={200}
                        max={3000}
                        step={50}
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                      />
                    </div>

                    {/* Districts */}
                    <div>
                      <label
                        className="block text-xs font-semibold mb-3 uppercase tracking-wider"
                        style={{ color: "rgba(245,240,232,0.5)" }}
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
                          style={{ color: "rgba(245,240,232,0.5)" }}
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
                          style={{ color: "rgba(245,240,232,0.5)" }}
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
                        style={{ color: "rgba(245,240,232,0.5)" }}
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
                      style={{ color: "rgba(245,240,232,0.4)" }}
                    >
                      {t("form.privacy")}
                    </p>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
