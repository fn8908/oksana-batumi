"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useInView } from "@/hooks/useInView";
import ViceTitle from "./ViceTitle";

interface Step {
  title: string;
  desc: string;
}

const NEON = ["#ff2e88", "#00e5ff", "#ffd84d", "#7b2ff7"];

export default function ViceSteps() {
  const { t, tArr } = useLanguage();
  const steps = tArr<Step>("howItWorks.steps");
  const { ref, inView } = useInView();

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8" style={{ scrollMarginTop: "64px" }}>
      <div className="max-w-6xl mx-auto">
        <ViceTitle title={t("howItWorks.title")} />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`vice-card p-6 vice-reveal ${inView ? "vice-reveal-on" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s`, borderColor: `${NEON[i % 4]}80` }}
            >
              <div
                className="vice-display text-4xl mb-3"
                style={{ color: NEON[i % 4], textShadow: `0 0 18px ${NEON[i % 4]}` }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="vice-display text-base uppercase mb-2" style={{ color: "#fff" }}>
                {s.title}
              </h3>
              <p className="text-sm" style={{ color: "var(--v-muted)" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
