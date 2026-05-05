"use client";

import { useEffect, useState } from "react";
import { ymGoal } from "@/lib/ym";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="https://t.me/BatRealty"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => ymGoal("telegram_floating_click")}
      aria-label="Написать в Telegram"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
      style={{
        background: "#C9A96E",
        color: "#0F1C2E",
        boxShadow: "0 8px 32px rgba(201,169,110,0.45)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "scale(1)" : "scale(0.8)",
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 13.985l-2.95-.924c-.64-.203-.654-.64.136-.953l11.5-4.432c.534-.194 1.001.13.616.572z" />
      </svg>
    </a>
  );
}
