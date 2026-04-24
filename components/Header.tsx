"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(15,28,46,0.92)"
          : "rgba(15,28,46,0.4)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
        borderBottom: scrolled
          ? "1px solid rgba(201,169,110,0.15)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollTo("hero")}>
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
                className="text-sm font-nunito transition-colors duration-200 hover:text-gold"
                style={{ color: "rgba(245,240,232,0.8)" }}
              >
                {t(item.key)}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Language toggle */}
            <div
              className="flex items-center rounded-full p-0.5 gap-0.5"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              {(["ru", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    background: lang === l ? "#C9A96E" : "transparent",
                    color: lang === l ? "#0F1C2E" : "#F5F0E8",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA button */}
            <button
              onClick={() => scrollTo("contact-form")}
              className="hidden sm:block text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 hover:opacity-90"
              style={{
                background: "#C9A96E",
                color: "#0F1C2E",
              }}
            >
              {t("nav.cta")}
            </button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ color: "#F5F0E8" }}
            >
              <div className="w-5 h-0.5 mb-1 transition-all" style={{ background: "#F5F0E8", transform: menuOpen ? "rotate(45deg) translate(2px,2px)" : "none" }} />
              <div className="w-5 h-0.5 mb-1" style={{ background: menuOpen ? "transparent" : "#F5F0E8" }} />
              <div className="w-5 h-0.5 transition-all" style={{ background: "#F5F0E8", transform: menuOpen ? "rotate(-45deg) translate(2px,-2px)" : "none" }} />
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
