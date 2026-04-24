"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import ru from "@/messages/ru.json";
import en from "@/messages/en.json";

type Lang = "ru" | "en";
type Messages = typeof ru;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (path: string) => string;
  tArr: <T>(path: string) => T[];
}

const messages: Record<Lang, Messages> = { ru, en };

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
  const [lang, setLang] = useState<Lang>("ru");

  const t = useCallback(
    (path: string): string => {
      const value = getNestedValue(
        messages[lang] as unknown as Record<string, unknown>,
        path
      );
      if (typeof value === "string") return value;
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
      return [];
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tArr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
