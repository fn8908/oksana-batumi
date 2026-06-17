"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useInView } from "@/hooks/useInView";

interface Step {
  title: string;
  desc: string;
}

const icons = ["✍️", "📨", "🏠", "🔑"];

export default function HowItWorks() {
  const { t, tArr } = useLanguage();
  const { ref, inView } = useInView();

  const steps = tArr<Step>("howItWorks.steps");

  return (
    <section
      id="how-it-works"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(180deg, #0F1C2E 0%, #0d2137 50%, #0F1C2E 100%)",
      }}
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2
            className="font-cormorant font-semibold text-4xl lg:text-5xl mb-3"
            style={{ color: "#F5F0E8" }}
          >
            {t("howItWorks.title")}
          </h2>
          <div
            className="w-16 h-px mx-auto mt-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, #C9A96E, transparent)",
            }}
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative flex flex-col items-center text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-10 left-1/2 w-full h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(201,169,110,0.3), rgba(201,169,110,0.05))",
                  }}
                />
              )}

              {/* Number + icon */}
              <div className="relative mb-5">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-1 relative z-10 transition-transform duration-300 hover:scale-110"
                  style={{
                    background: "rgba(201,169,110,0.08)",
                    border: "1px solid rgba(201,169,110,0.35)",
                  }}
                >
                  {icons[i]}
                </div>
                <div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-20"
                  style={{
                    background: "#C9A96E",
                    color: "#0F1C2E",
                    fontFamily: "var(--font-cormorant)",
                  }}
                >
                  {i + 1}
                </div>
              </div>

              <h3
                className="font-cormorant font-semibold text-xl mb-2"
                style={{ color: "#F5F0E8" }}
              >
                {step.title}
              </h3>
              <p
                className="font-nunito text-sm leading-relaxed"
                style={{ color: "rgba(245,240,232,0.75)" }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
