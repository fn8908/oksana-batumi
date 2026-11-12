"use client";

import React, { createContext, useContext, useCallback, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  type Lang,
  LANG_COOKIE,
  RTL_LANGS,
  messages,
  swapLang,
} from "@/lib/i18n";

export type { Lang };

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (path: string) => string;
  tArr: <T>(path: string) => T[];
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === "object" && !Array.isArray(acc)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isRTL = RTL_LANGS.includes(lang);

  // Язык живёт в адресе: переходим на ту же страницу другого языка и запоминаем выбор
  const setLang = useCallback(
    (l: Lang) => {
      document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
      router.push(swapLang(pathname, l) + window.location.hash);
    },
    [router, pathname]
  );

  const t = useCallback(
    (path: string): string => {
      const value = getNestedValue(
        messages[lang] as unknown as Record<string, unknown>,
        path
      );
      if (typeof value === "string") return value;
      // fallback to ru
      const fallback = getNestedValue(
        messages.ru as unknown as Record<string, unknown>,
        path
      );
      if (typeof fallback === "string") return fallback;
      return path;
    },
    [lang]
  );

  const tArr = useCallback(
    <T,>(path: string): T[] => {
      const value = getNestedValue(
        messages[lang] as unknown as Record<string, unknown>,
        path
      );
      if (Array.isArray(value)) return value as T[];
      // fallback to ru
      const fallback = getNestedValue(
        messages.ru as unknown as Record<string, unknown>,
        path
      );
      if (Array.isArray(fallback)) return fallback as T[];
      return [];
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tArr, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
