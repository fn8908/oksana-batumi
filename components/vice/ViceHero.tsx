"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import Wordmark from "./Wordmark";

export default function ViceHero() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const show = (delay: string) => ({
    transition: "opacity .8s ease, transform .8s ease",
    transitionDelay: delay,
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
  });

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Настоящая панорама Батуми, перерисованная в стиле Вайс-Сити */}
      <Image
        src="/vice/batumi-vice.png"
        alt={t("hero.imageAlt")}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "50% 42%" }}
      />

      {/* Затемнение: сверху под текст, снизу переход в фон страницы */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,2,22,0.78) 0%, rgba(10,2,22,0.42) 26%, rgba(10,2,22,0.12) 48%, rgba(19,5,36,0.35) 76%, rgba(19,5,36,0.9) 94%, #130524 100%)",
        }}
      />

      {/* Неоновая сетка по воде */}
      <div className="vice-grid" style={{ height: "28%", opacity: 0.4 }} />

      {/* Виньетка по краям */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 42%, transparent 38%, rgba(10,2,22,0.55) 100%)" }}
      />

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 text-center">
        <p className="vice-tag vice-neon-cyan mb-5" style={show("0.05s")}>
          {t("hero.location")}
        </p>

        <div style={show("0.2s")} className="mx-auto w-full">
          <Wordmark className="w-full max-w-[320px] sm:max-w-[560px] lg:max-w-[720px] h-auto mx-auto vice-wordmark-glow" />
        </div>

        <p
          className="vice-script vice-neon text-3xl sm:text-5xl lg:text-6xl -mt-3 sm:-mt-5 mb-5"
          style={{ ...show("0.35s"), transform: "rotate(-2deg)" }}
        >
          Welcome to Batumi
        </p>

        <h1
          className="vice-display uppercase text-base sm:text-2xl lg:text-3xl mb-4 mx-auto max-w-3xl"
          style={{ ...show("0.45s"), color: "#fff", textShadow: "0 2px 10px rgba(10,2,22,0.9), 0 0 26px rgba(255,46,136,0.45)" }}
        >
          {t("hero.title")}
        </h1>

        <p
          className="text-sm sm:text-base max-w-2xl mx-auto mb-8"
          style={{ ...show("0.55s"), color: "rgba(255,255,255,0.9)", textShadow: "0 2px 10px rgba(10,2,22,1), 0 0 26px rgba(10,2,22,0.95)" }}
        >
          {t("hero.subtitle")}
        </p>

        <div className="flex flex-col items-center sm:flex-row sm:items-stretch gap-4 justify-center" style={show("0.65s")}>
          <button onClick={() => scrollTo("contact-form")} className="vice-btn px-8 py-4 text-sm">
            {t("hero.cta1")}
          </button>
          <button onClick={() => scrollTo("sale")} className="vice-btn-ghost px-8 py-4 text-sm">
            {t("hero.cta2")}
          </button>
        </div>
      </div>

      <div className="relative z-10 px-4 pb-28 sm:pb-16">
        <div
          className="flex flex-row gap-2 sm:gap-5 overflow-x-auto sm:overflow-visible justify-start sm:justify-center"
          style={{ ...show("0.8s"), scrollbarWidth: "none" }}
        >
          {[t("hero.fact1"), t("hero.fact2"), t("hero.fact3")].map((fact, i) => (
            <div
              key={fact}
              className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap flex-shrink-0"
              style={{
                background: "rgba(10,2,22,0.6)",
                border: `1px solid ${["rgba(255,46,136,0.6)", "rgba(0,229,255,0.6)", "rgba(255,216,77,0.6)"][i]}`,
                boxShadow: `0 0 20px ${["rgba(255,46,136,0.25)", "rgba(0,229,255,0.25)", "rgba(255,216,77,0.2)"][i]}`,
                backdropFilter: "blur(6px)",
              }}
            >
              {fact}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
