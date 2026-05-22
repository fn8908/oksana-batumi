"use client";

import { useEffect, useState } from "react";
import { ymGoal } from "@/lib/ym";

const TG_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.985l-2.95-.924c-.64-.203-.654-.64.136-.953l11.5-4.432c.534-.194 1.001.13.616.572z" />
  </svg>
);

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after 1.5s — catches paid ad traffic that bounces before scrolling
    const timer = setTimeout(() => setVisible(true), 1500);
    const onScroll = () => { if (window.scrollY > 80) setVisible(true); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const base: React.CSSProperties = {
    background: "#C9A96E",
    color: "#0F1C2E",
    boxShadow: "0 8px 32px rgba(201,169,110,0.50)",
    transition: "opacity 0.35s ease, transform 0.35s ease",
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
    transform: visible ? "translateY(0)" : "translateY(16px)",
    textDecoration: "none",
    position: "fixed",
    bottom: "24px",
    right: "20px",
    zIndex: 50,
  };

  return (
    <>
      {/* Mobile: round icon */}
      <a
        href="https://t.me/BLevin95"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => ymGoal("telegram_floating_click")}
        aria-label="Написать в Telegram"
        className="sm:hidden flex items-center justify-center w-14 h-14 rounded-full hover:scale-110 active:scale-95"
        style={base}
      >
        {TG_ICON}
      </a>

      {/* Desktop: pill with text */}
      <a
        href="https://t.me/BLevin95"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => ymGoal("telegram_floating_click")}
        aria-label="Написать в Telegram"
        className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm hover:opacity-90 hover:scale-105 active:scale-95"
        style={{ ...base, fontFamily: "var(--font-nunito, sans-serif)" }}
      >
        {TG_ICON}
        Написать в Telegram
      </a>
    </>
  );
}
