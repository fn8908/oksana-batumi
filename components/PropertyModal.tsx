"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Property {
  type: string;
  district: string;
  price: string;
  tags: string[];
  image?: string;
  gradient?: string;
}

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

export default function PropertyModal({ property, onClose }: PropertyModalProps) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        contact,
        property_type: property.type,
        district: property.district,
        price: property.price,
      }),
    });
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px",
    padding: "12px 14px",
    color: "#F5F0E8",
    fontSize: "14px",
    fontFamily: "var(--font-nunito)",
    outline: "none",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-6 sm:p-8"
        style={{
          background: "#0F1C2E",
          border: "1px solid rgba(201,169,110,0.2)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{
            background: "rgba(255,255,255,0.08)",
            color: "#F5F0E8",
          }}
        >
          ✕
        </button>

        {/* Property preview */}
        <div className="rounded-xl h-32 mb-5 overflow-hidden relative">
          {property.image ? (
            <img
              src={property.image}
              alt={property.type}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(78,205,196,0.15), rgba(26,58,92,0.8))",
              }}
            >
              🏢
            </div>
          )}
        </div>

        <div className="mb-2">
          <span
            className="font-cormorant font-semibold text-xl"
            style={{ color: "#F5F0E8" }}
          >
            {property.type}
          </span>
          <span className="mx-2" style={{ color: "rgba(245,240,232,0.4)" }}>·</span>
          <span className="text-sm" style={{ color: "rgba(245,240,232,0.6)" }}>
            {property.district}
          </span>
        </div>
        <div
          className="font-cormorant font-bold text-2xl mb-4"
          style={{ color: "#C9A96E" }}
        >
          {property.price}/{t("catalog.perMonth").replace("/", "")}
        </div>

        {submitted ? (
          <div
            className="text-center py-8 px-4 rounded-xl"
            style={{
              background: "rgba(78,205,196,0.08)",
              border: "1px solid rgba(78,205,196,0.2)",
            }}
          >
            <p className="text-lg font-semibold" style={{ color: "#4ECDC4" }}>
              {t("form.success")}
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm mb-5" style={{ color: "rgba(245,240,232,0.6)" }}>
              {t("modal.subtitle")}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                style={inputStyle}
                type="text"
                placeholder={t("form.namePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                style={inputStyle}
                type="text"
                placeholder={t("form.contactPlaceholder")}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-sm mt-1 transition-all hover:opacity-90"
                style={{ background: "#C9A96E", color: "#0F1C2E" }}
              >
                {t("modal.submit")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
