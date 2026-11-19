"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { ymGoal } from "@/lib/ym";

// Заявка на показ со страницы объекта, неоновый вид
export default function ViceLead({ subject, dealType }: { subject: string; dealType: "buy" | "rent" }) {
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
          comment: [subject, `Показ: ${video ? "по видеосвязи" : "лично"}`, comment.trim()]
            .filter(Boolean)
            .join("\n"),
          lang,
        }),
      });
      ymGoal("form_submit");
    } finally {
      router.push(`/${lang}/vice/thank-you`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        {[false, true].map((v) => (
          <button
            key={String(v)}
            type="button"
            onClick={() => setVideo(v)}
            className={`vice-option flex-1 py-3 ${video === v ? "vice-option-on" : ""}`}
          >
            {t(v ? "listing.videoCall" : "listing.inPerson")}
          </button>
        ))}
      </div>
      <input
        className="vice-input"
        placeholder={t("leadForm.name")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="vice-input"
        placeholder={t("leadForm.contact")}
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
      />
      <textarea
        className="vice-input"
        rows={3}
        style={{ resize: "none" }}
        placeholder={t("leadForm.comment")}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit" disabled={loading} className="vice-btn w-full py-4 text-sm">
        {loading ? t("leadForm.sending") : t("leadForm.submit")}
      </button>
      <p className="text-xs" style={{ color: "rgba(243,228,255,0.5)" }}>
        {t("leadForm.consent")}{" "}
        <a href={`/${lang}/privacy`} className="underline">
          {t("leadForm.consentLink")}
        </a>
        .
      </p>
    </form>
  );
}
