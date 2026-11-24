"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { messages } from "@/lib/i18n";
import { ymGoal } from "@/lib/ym";
import { getSource } from "@/lib/source";
import SectionTitle from "./SectionTitle";

type Deal = "buy" | "rent";

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.16)",
  borderRadius: "12px",
  padding: "14px 16px",
  color: "#F5F0E8",
  fontSize: "15px",
  outline: "none",
};

function Chips({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: number;
  onChange: (i: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o, i) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(i)}
          className="px-4 py-2.5 rounded-full text-sm font-semibold transition-all"
          style={
            value === i
              ? { background: "#C9A96E", color: "#0F1C2E", border: "1px solid #C9A96E" }
              : { background: "rgba(255,255,255,0.06)", color: "#F5F0E8", border: "1px solid rgba(255,255,255,0.16)" }
          }
        >
          {o}
        </button>
      ))}
    </div>
  );
}

// Форма "Получить подборку": цель, бюджет и контакт. Блок аренды шлёт событие
// "pick-deal" - тогда форма переключается на аренду.
export default function SelectionForm({
  initialDeal = "buy",
  subject = "Заявка на подборку",
}: {
  initialDeal?: Deal;
  subject?: string; // первая строка уведомления владельцу
}) {
  const router = useRouter();
  const { t, tArr, lang } = useLanguage();
  const [deal, setDeal] = useState<Deal>(initialDeal);
  const [goal, setGoal] = useState(-1);
  const [budget, setBudget] = useState(-1);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onPick = (e: Event) => {
      setDeal((e as CustomEvent<Deal>).detail);
      setBudget(-1);
    };
    window.addEventListener("pick-deal", onPick);
    return () => window.removeEventListener("pick-deal", onPick);
  }, []);

  const budgets = tArr<string>(deal === "buy" ? "pick.budgetsBuy" : "pick.budgetsRent");
  const label = { color: "rgba(245,240,232,0.85)" };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setLoading(true);
    // Уведомление владельцу в Telegram - всегда по-русски
    const ru = messages.ru.pick;
    const ruBudgets = deal === "buy" ? ru.budgetsBuy : ru.budgetsRent;
    const comment = [
      subject,
      deal === "buy" && goal >= 0 ? `Цель: ${ru.goals[goal]}` : "",
      budget >= 0 ? `Бюджет: ${ruBudgets[budget]}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, deal_type: deal, comment, lang, traffic: getSource() }),
      });
      ymGoal("form_submit");
    } finally {
      router.push(`/${lang}/thank-you`);
    }
  };

  return (
    <section
      id="contact-form"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{
        scrollMarginTop: "64px",
        background: "linear-gradient(180deg, #0F1C2E 0%, #0d2137 50%, #0F1C2E 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <SectionTitle title={t("pick.title")} subtitle={t("pick.subtitle")} />

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 sm:p-8 space-y-6"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,169,110,0.25)" }}
        >
          <div>
            <p className="text-sm font-semibold mb-3" style={label}>
              {t("pick.deal")}
            </p>
            <Chips
              options={[t("pick.buy"), t("pick.rent")]}
              value={deal === "buy" ? 0 : 1}
              onChange={(i) => {
                setDeal(i === 0 ? "buy" : "rent");
                setBudget(-1);
              }}
            />
          </div>

          {deal === "buy" && (
            <div>
              <p className="text-sm font-semibold mb-3" style={label}>
                {t("pick.goal")}
              </p>
              <Chips options={tArr<string>("pick.goals")} value={goal} onChange={setGoal} />
            </div>
          )}

          <div>
            <p className="text-sm font-semibold mb-3" style={label}>
              {t("pick.budget")}
            </p>
            <Chips options={budgets} value={budget} onChange={setBudget} />
          </div>

          <div className="space-y-3">
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-semibold text-base transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: "#C9A96E", color: "#0F1C2E" }}
          >
            {loading ? t("leadForm.sending") : t("pick.submit")}
          </button>

          <p className="text-xs text-center" style={{ color: "rgba(245,240,232,0.5)" }}>
            {t("pick.note")} {t("leadForm.consent")}{" "}
            <a href={`/${lang}/privacy`} className="underline">
              {t("leadForm.consentLink")}
            </a>
            .
          </p>
        </form>
      </div>
    </section>
  );
}
