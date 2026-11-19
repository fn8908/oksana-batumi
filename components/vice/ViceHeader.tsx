"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage, Lang } from "@/context/LanguageContext";

const LANG_OPTIONS: { code: Lang; flag: string; label: string }[] = [
  { code: "ka", flag: "🇬🇪", label: "KA" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "ru", flag: "🇷🇺", label: "RU" },
  { code: "tr", flag: "🇹🇷", label: "TR" },
  { code: "uk", flag: "🇺🇦", label: "UK" },
  { code: "he", flag: "🇮🇱", label: "HE" },
];

const NAV = [
  { key: "nav.buy", id: "sale" },
  { key: "nav.process", id: "how-it-works" },
  { key: "nav.districts", id: "neighborhoods" },
  { key: "nav.rent", id: "rent" },
  { key: "nav.faq", id: "faq" },
];

export default function ViceHeader() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const current = LANG_OPTIONS.find((l) => l.code === lang) ?? LANG_OPTIONS[0];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(13,2,26,0.92)" : "rgba(13,2,26,0.35)",
        backdropFilter: "blur(14px)",
        borderBottom: scrolled ? "1px solid rgba(255,46,136,0.45)" : "1px solid transparent",
        boxShadow: scrolled ? "0 6px 30px rgba(255,46,136,0.18)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-16 lg:h-20">
          <button onClick={() => scrollTo("hero")} className="vice-display vice-chrome text-base lg:text-xl uppercase flex-shrink-0">
            Batumi Realty
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollTo(item.id)}
                className="vice-tag whitespace-nowrap transition-colors"
                style={{ fontSize: "10px", color: "rgba(243,228,255,0.75)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00e5ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(243,228,255,0.75)")}
              >
                {t(item.key)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:gap-3">
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(0,229,255,0.4)",
                  color: "#d6fbff",
                }}
              >
                <span>{current.flag}</span>
                <span>{current.label}</span>
                <span style={{ fontSize: "8px", opacity: 0.6 }}>▾</span>
              </button>

              {langOpen && (
                <div
                  className="absolute end-0 top-full mt-2 rounded-xl overflow-hidden z-50 w-28"
                  style={{
                    background: "rgba(13,2,26,0.98)",
                    border: "1px solid rgba(255,46,136,0.5)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
                  }}
                >
                  {LANG_OPTIONS.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setLang(opt.code);
                        setLangOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold"
                      style={{
                        background: lang === opt.code ? "rgba(255,46,136,0.2)" : "transparent",
                        color: lang === opt.code ? "#ff8ad1" : "rgba(243,228,255,0.7)",
                      }}
                    >
                      <span>{opt.flag}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => scrollTo("contact-form")} className="hidden sm:inline-flex vice-btn px-4 py-2 text-xs">
              {t("nav.cta")}
            </button>

            <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-5 h-0.5 mb-1 transition-all"
                  style={{
                    background: menuOpen && i === 1 ? "transparent" : "#ff2e88",
                    boxShadow: "0 0 8px rgba(255,46,136,0.8)",
                    transform:
                      menuOpen && i === 0
                        ? "rotate(45deg) translate(2px,2px)"
                        : menuOpen && i === 2
                          ? "rotate(-45deg) translate(2px,-2px)"
                          : "none",
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden py-4" style={{ borderTop: "1px solid rgba(255,46,136,0.3)" }}>
            {NAV.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-start py-3 px-2 text-sm"
                style={{ color: "rgba(243,228,255,0.85)" }}
              >
                {t(item.key)}
              </button>
            ))}
            <button onClick={() => scrollTo("contact-form")} className="vice-btn w-full mt-3 py-3 text-xs">
              {t("nav.cta")}
            </button>
            <Link
              href={`/${lang}`}
              className="block text-center mt-3 text-xs underline"
              style={{ color: "rgba(243,228,255,0.5)" }}
            >
              Batumi Realty · classic
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
