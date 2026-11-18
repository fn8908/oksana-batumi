"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { ymGoal } from "@/lib/ym";

interface LeadFormProps {
  subject: string;
  dealType?: "buy" | "rent";
  commentPlaceholder?: string;
  viewing?: boolean; // показать выбор: показ лично или по видеосвязи
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

export default function LeadForm({ subject, dealType, commentPlaceholder, viewing }: LeadFormProps) {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [comment, setComment] = useState("");
  const [video, setVideo] = useState(false);
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
          comment: [subject, viewing ? `Показ: ${video ? "по видеосвязи" : "лично"}` : "", comment.trim()]
            .filter(Boolean)
            .join("\n"),
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
      {viewing && (
        <div className="flex gap-2">
          {[false, true].map((v) => (
            <button
              key={String(v)}
              type="button"
              onClick={() => setVideo(v)}
              className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
              style={
                video === v
                  ? { background: "rgba(201,169,110,0.2)", color: "#C9A96E", border: "1px solid #C9A96E" }
                  : { background: "rgba(255,255,255,0.06)", color: "#F5F0E8", border: "1px solid rgba(255,255,255,0.16)" }
              }
            >
              {t(v ? "listing.videoCall" : "listing.inPerson")}
            </button>
          ))}
        </div>
      )}
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
