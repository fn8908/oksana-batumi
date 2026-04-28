"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage, Lang } from "@/context/LanguageContext";

const LANG_OPTIONS: { code: Lang; flag: string; label: string }[] = [
  { code: "ka", flag: "🇬🇪", label: "KA" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "ru", flag: "🇷🇺", label: "RU" },
  { code: "tr", flag: "🇹🇷", label: "TR" },
  { code: "uk", flag: "🇺🇦", label: "UK" },
  { code: "he", flag: "🇮🇱", label: "HE" },
];

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const current = LANG_OPTIONS.find((l) => l.code === lang) ?? LANG_OPTIONS[0];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(15,28,46,0.95)" : "rgba(15,28,46,0.4)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
        borderBottom: scrolled
          ? "1px solid rgba(201,169,110,0.15)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => scrollTo("hero")}
          >
            <span
              className="font-cormorant font-bold text-xl lg:text-2xl tracking-wider"
              style={{ color: "#C9A96E" }}
            >
              BATUMI
            </span>
            <span
              className="font-cormorant font-semibold text-xl lg:text-2xl tracking-wider ml-1"
              style={{ color: "#F5F0E8" }}
            >
              REALTY
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { key: "nav.rent", id: "catalog" },
              { key: "nav.districts", id: "neighborhoods" },
              { key: "nav.howItWorks", id: "how-it-works" },
              { key: "nav.reviews", id: "testimonials" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => scrollTo(item.id)}
                className="text-sm font-nunito transition-colors duration-200 hover:opacity-100"
                style={{ color: "rgba(245,240,232,0.75)" }}
              >
                {t(item.key)}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Language dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#F5F0E8",
                }}
              >
                <span>{current.flag}</span>
                <span>{current.label}</span>
                <span style={{ fontSize: "8px", opacity: 0.6 }}>▾</span>
              </button>

              {langOpen && (
                <div
                  className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden z-50 w-28"
                  style={{
                    background: "rgba(15,28,46,0.98)",
                    border: "1px solid rgba(201,169,110,0.25)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  {LANG_OPTIONS.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setLang(opt.code);
                        setLangOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold transition-all duration-150 hover:opacity-100"
                      style={{
                        background:
                          lang === opt.code
                            ? "rgba(201,169,110,0.15)"
                            : "transparent",
                        color:
                          lang === opt.code
                            ? "#C9A96E"
                            : "rgba(245,240,232,0.7)",
                        borderLeft:
                          lang === opt.code
                            ? "2px solid #C9A96E"
                            : "2px solid transparent",
                      }}
                    >
                      <span>{opt.flag}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA button */}
            <button
              onClick={() => scrollTo("contact-form")}
              className="hidden sm:block text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:opacity-90"
              style={{ background: "#C9A96E", color: "#0F1C2E" }}
            >
              {t("nav.cta")}
            </button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: "#F5F0E8" }}
            >
              <div
                className="w-5 h-0.5 mb-1 transition-all"
                style={{
                  background: "#F5F0E8",
                  transform: menuOpen
                    ? "rotate(45deg) translate(2px,2px)"
                    : "none",
                }}
              />
              <div
                className="w-5 h-0.5 mb-1"
                style={{ background: menuOpen ? "transparent" : "#F5F0E8" }}
              />
              <div
                className="w-5 h-0.5 transition-all"
                style={{
                  background: "#F5F0E8",
                  transform: menuOpen
                    ? "rotate(-45deg) translate(2px,-2px)"
                    : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="lg:hidden py-4 border-t"
            style={{ borderColor: "rgba(201,169,110,0.2)" }}
          >
            {[
              { key: "nav.rent", id: "catalog" },
              { key: "nav.districts", id: "neighborhoods" },
              { key: "nav.howItWorks", id: "how-it-works" },
              { key: "nav.reviews", id: "testimonials" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left py-3 px-2 text-sm font-nunito"
                style={{ color: "rgba(245,240,232,0.8)" }}
              >
                {t(item.key)}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact-form")}
              className="mt-3 w-full text-sm font-semibold px-4 py-2.5 rounded-full"
              style={{ background: "#C9A96E", color: "#0F1C2E" }}
            >
              {t("nav.cta")}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
