"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import ru from "@/messages/ru.json";
import en from "@/messages/en.json";
import ka from "@/messages/ka.json";
import tr from "@/messages/tr.json";
import uk from "@/messages/uk.json";
import he from "@/messages/he.json";

export type Lang = "ka" | "en" | "ru" | "tr" | "uk" | "he";
type Messages = typeof ru;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (path: string) => string;
  tArr: <T>(path: string) => T[];
  isRTL: boolean;
}

const messages: Record<Lang, Messages> = {
  ka: ka as unknown as Messages,
  en: en as unknown as Messages,
  ru,
  tr: tr as unknown as Messages,
  uk: uk as unknown as Messages,
  he: he as unknown as Messages,
};

const RTL_LANGS: Lang[] = ["he"];

const LanguageContext = createContext<LanguageContextType | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === "object" && !Array.isArray(acc)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ka");
  const isRTL = RTL_LANGS.includes(lang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
      document.documentElement.dir = RTL_LANGS.includes(l) ? "rtl" : "ltr";
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
    }
  }, [lang, isRTL]);

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
