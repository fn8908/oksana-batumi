"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { messages } from "@/lib/i18n";
import { ymGoal } from "@/lib/ym";
import { getSource } from "@/lib/source";
import ViceTitle from "./ViceTitle";

type Deal = "buy" | "rent";

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
          className={`vice-option ${value === i ? "vice-option-on" : ""}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

// Форма подборки: та же логика, что на основном сайте, вид - неоновый
export default function ViceForm() {
  const router = useRouter();
  const { t, tArr, lang } = useLanguage();
  const [deal, setDeal] = useState<Deal>("buy");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setLoading(true);
    const ru = messages.ru.pick;
    const ruBudgets = deal === "buy" ? ru.budgetsBuy : ru.budgetsRent;
    const comment = [
      "Заявка на подборку (неоновая версия)",
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
      router.push(`/${lang}/vice/thank-you`);
    }
  };

  return (
    <section
      id="contact-form"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ scrollMarginTop: "64px" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,46,136,0.22), transparent 60%), radial-gradient(ellipse at 20% 100%, rgba(0,229,255,0.14), transparent 55%)",
        }}
      />
      <div className="relative max-w-2xl mx-auto">
        <ViceTitle title={t("pick.title")} subtitle={t("pick.subtitle")} />

        <form onSubmit={handleSubmit} className="vice-panel p-6 sm:p-8 space-y-6">
          <div>
            <p className="vice-tag mb-3" style={{ color: "#ff8ad1" }}>
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
              <p className="vice-tag mb-3" style={{ color: "#ff8ad1" }}>
                {t("pick.goal")}
              </p>
              <Chips options={tArr<string>("pick.goals")} value={goal} onChange={setGoal} />
            </div>
          )}

          <div>
            <p className="vice-tag mb-3" style={{ color: "#ff8ad1" }}>
              {t("pick.budget")}
            </p>
            <Chips options={budgets} value={budget} onChange={setBudget} />
          </div>

          <div className="space-y-3">
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
          </div>

          <button type="submit" disabled={loading} className="vice-btn w-full py-4 text-sm">
            {loading ? t("leadForm.sending") : t("pick.submit")}
          </button>

          <p className="text-xs text-center" style={{ color: "rgba(243,228,255,0.5)" }}>
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
