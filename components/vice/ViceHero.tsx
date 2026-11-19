"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Palm from "./Palm";
import Skyline from "./Skyline";

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
      {/* Небо до горизонта */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          bottom: "26%",
          background:
            "linear-gradient(180deg, #240a4a 0%, #4b1270 22%, #9d1f7a 45%, #e5467f 64%, #ff8a3d 84%, #ffc85e 100%)",
        }}
      />

      {/* Солнце садится ровно на горизонт */}
      <div
        className="vice-sun"
        style={{ width: "min(400px, 68vw)", height: "min(400px, 68vw)", bottom: "26%" }}
      />

      {/* Силуэт города */}
      <Skyline
        className="absolute inset-x-0 w-full h-[18vh] sm:h-[22vh]"
        style={{ bottom: "26%" }}
      />

      {/* Земля и сетка */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{ height: "26%", background: "linear-gradient(180deg, #2a0b3f 0%, #130524 55%, #0b0217 100%)" }}
      />
      <div className="vice-grid" style={{ height: "26%" }} />

      {/* Линия горизонта */}
      <div
        className="absolute inset-x-0 h-px"
        style={{ bottom: "26%", background: "#ffd1a1", boxShadow: "0 0 26px 7px rgba(255,160,90,0.75)" }}
      />

      {/* Лёгкая виньетка под текст */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 38%, rgba(10,2,22,0.35) 0%, transparent 45%, rgba(10,2,22,0.55) 100%)" }}
      />

      {/* Пальмы */}
      <Palm className="left-[-3%] sm:left-[1%] w-[150px] sm:w-[220px] lg:w-[280px] opacity-95" />
      <Palm flip className="right-[-4%] sm:right-[0%] w-[125px] sm:w-[180px] lg:w-[235px] opacity-90" style={{ bottom: "-18px" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-24 text-center">
        <p className="vice-tag vice-neon-cyan mb-5" style={show("0.05s")}>
          {t("hero.location")}
        </p>

        <p
          className="vice-script vice-neon text-2xl sm:text-4xl lg:text-5xl mb-4"
          style={show("0.15s")}
        >
          Welcome to Batumi
        </p>

        <h1
          className="vice-display vice-chrome vice-chrome-hero text-2xl sm:text-4xl lg:text-5xl uppercase mb-5"
          style={show("0.3s")}
        >
          {t("hero.title")}
        </h1>

        <p
          className="text-base sm:text-lg max-w-2xl mx-auto mb-10"
          style={{ ...show("0.45s"), color: "rgba(255,255,255,0.88)", textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
        >
          {t("hero.subtitle")}
        </p>

        <div className="flex flex-col items-center sm:flex-row sm:items-stretch gap-4 justify-center mb-14" style={show("0.6s")}>
          <button onClick={() => scrollTo("contact-form")} className="vice-btn px-8 py-4 text-sm">
            {t("hero.cta1")}
          </button>
          <button onClick={() => scrollTo("sale")} className="vice-btn-ghost px-8 py-4 text-sm">
            {t("hero.cta2")}
          </button>
        </div>

      </div>

      <div className="relative z-10 px-4 pb-28 sm:pb-16 mt-auto">
        <div
          className="flex flex-row gap-2 sm:gap-5 overflow-x-auto sm:overflow-visible justify-start sm:justify-center"
          style={{ ...show("0.75s"), scrollbarWidth: "none" }}
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
