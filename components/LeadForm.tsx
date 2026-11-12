"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { ymGoal } from "@/lib/ym";

interface LeadFormProps {
  subject: string;
  dealType?: "buy" | "rent";
  commentPlaceholder?: string;
}

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.16)",
  borderRadius: "12px",
  padding: "14px 16px",
  color: "#F5F0E8",
  fontSize: "15px",
  outline: "none",
  resize: "none" as const,
};

export default function LeadForm({ subject, dealType, commentPlaceholder }: LeadFormProps) {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          deal_type: dealType,
          comment: [subject, comment.trim()].filter(Boolean).join("\n"),
          lang,
        }),
      });
      ymGoal("form_submit");
    } finally {
      router.push(`/${lang}/thank-you`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        style={inputStyle}
        placeholder={t("leadForm.name")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        style={inputStyle}
        placeholder={t("leadForm.contact")}
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
      />
      <textarea
        style={inputStyle}
        rows={3}
        placeholder={commentPlaceholder ?? t("leadForm.comment")}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: "#C9A96E", color: "#0F1C2E" }}
      >
        {loading ? t("leadForm.sending") : t("leadForm.submit")}
      </button>
      <p className="text-xs" style={{ color: "rgba(245,240,232,0.5)" }}>
        {t("leadForm.consent")}{" "}
        <a href={`/${lang}/privacy`} className="underline">
          {t("leadForm.consentLink")}
        </a>
        .
      </p>
    </form>
  );
}
