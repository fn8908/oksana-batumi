"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Palm from "./Palm";
import Wordmark from "./Wordmark";
import { IG_URL, TG_URL } from "@/lib/contacts";

const anchorIds = ["sale", "neighborhoods", "how-it-works", "contact-form"];

const YT_RU = "https://www.youtube.com/channel/UCTXjFpssnnLvfBZavhTz1jw/";
const YT_EN = "https://www.youtube.com/channel/UC5wNLVrfLXr0DLcDRHMibyg/";

export default function ViceFooter() {
  const { t, tArr, lang } = useLanguage();
  const links = tArr<string>("footer.links");

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const social = [
    { label: "Telegram", href: TG_URL, color: "rgba(0,229,255,0.65)" },
    { label: "Instagram", href: IG_URL, color: "rgba(255,46,136,0.7)" },
    { label: "YouTube", href: ["en", "tr", "he"].includes(lang) ? YT_EN : YT_RU, color: "rgba(255,216,77,0.6)" },
  ];

  return (
    <footer className="relative pt-20 pb-28 sm:pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Тёмный фон с неоновым свечением и сеткой у пола */}
      <div className="absolute inset-0" style={{ background: "#0b0217" }} />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,46,136,0.25), transparent 55%)" }}
      />
      <div className="vice-grid" style={{ height: "40%", opacity: 0.55 }} />
      <div className="vice-divider absolute top-0 inset-x-0" />
      <Palm className="left-[-2%] w-[120px] sm:w-[170px] opacity-70" />
      <Palm flip className="right-[-2%] w-[110px] sm:w-[150px] opacity-60" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 mb-10">
          <div>
            <Wordmark className="w-[190px] h-auto mb-3" />
            <p className="text-sm mb-2" style={{ color: "var(--v-muted)" }}>
              {t("footer.tagline")}
            </p>
            <p className="text-xs" style={{ color: "rgba(243,228,255,0.45)" }}>
              {t("footer.copyright")}
            </p>
            <div className="flex flex-wrap gap-2 mt-4 mb-4">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vice-chip px-4 py-2 text-xs"
                  style={{ borderColor: s.color }}
                >
                  {s.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <Link href={`/${lang}/privacy`} className="text-xs underline" style={{ color: "rgba(243,228,255,0.45)" }}>
                {t("footer.privacy")}
              </Link>
              <Link href={`/${lang}`} className="text-xs underline" style={{ color: "rgba(243,228,255,0.45)" }}>
                Batumi Realty · classic
              </Link>
            </div>
          </div>

          <div>
            <h4 className="vice-tag mb-5" style={{ color: "#00e5ff" }}>
              {t("footer.nav")}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link, i) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(anchorIds[i])}
                    className="text-sm text-start"
                    style={{ color: "rgba(243,228,255,0.8)" }}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="vice-tag mb-5" style={{ color: "#00e5ff" }}>
              {t("footer.contacts")}
            </h4>
            <div className="vice-panel p-4 text-sm" style={{ color: "rgba(243,228,255,0.85)" }}>
              🕘 {t("footer.schedule")}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,46,136,0.3)" }}>
          <p className="vice-script text-sm" style={{ color: "rgba(255,138,209,0.9)" }}>
            Batumi · Georgia
          </p>
        </div>
      </div>
    </footer>
  );
}
