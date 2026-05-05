"use client";

import { useLanguage } from "@/context/LanguageContext";

const anchorIds = ["catalog", "neighborhoods", "how-it-works", "contact-form"];

export default function Footer() {
  const { t, tArr } = useLanguage();

  const links = tArr<string>("footer.links");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="py-14 px-4 sm:px-6 lg:px-8"
      style={{
        background: "#080f1a",
        borderTop: "1px solid rgba(201,169,110,0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 mb-10">
          {/* Column 1: Logo + tagline */}
          <div>
            <div className="mb-3">
              <span
                className="font-cormorant font-bold text-2xl tracking-wider"
                style={{ color: "#C9A96E" }}
              >
                BATUMI
              </span>
              <span
                className="font-cormorant font-semibold text-2xl tracking-wider ml-1"
                style={{ color: "#F5F0E8" }}
              >
                REALTY
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-2"
              style={{ color: "rgba(245,240,232,0.45)" }}
            >
              {t("footer.tagline")}
            </p>
            <p
              className="text-xs"
              style={{ color: "rgba(245,240,232,0.25)" }}
            >
              {t("footer.copyright")}
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "rgba(245,240,232,0.35)" }}
            >
              {t("footer.nav")}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo(anchorIds[i])}
                    className="text-sm transition-colors hover:text-gold text-left"
                    style={{ color: "rgba(245,240,232,0.55)" }}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Schedule */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "rgba(245,240,232,0.35)" }}
            >
              {t("footer.contacts")}
            </h4>
            <div
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{
                background: "rgba(201,169,110,0.06)",
                border: "1px solid rgba(201,169,110,0.12)",
              }}
            >
              <span className="text-xl mt-0.5">🕘</span>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(245,240,232,0.65)" }}
              >
                {t("footer.schedule")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(245,240,232,0.2)" }}
          >
            Made with ❤️ for Batumi real estate community
          </p>
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#4ECDC4" }}
            />
            <span
              className="text-xs"
              style={{ color: "rgba(245,240,232,0.3)" }}
            >
              Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
