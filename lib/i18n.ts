import ru from "@/messages/ru.json";
import en from "@/messages/en.json";
import ka from "@/messages/ka.json";
import tr from "@/messages/tr.json";
import uk from "@/messages/uk.json";
import he from "@/messages/he.json";

export const LANGS = ["ru", "en", "ka", "tr", "uk", "he"] as const;
export type Lang = (typeof LANGS)[number];
export type Messages = typeof ru;

export const DEFAULT_LANG: Lang = "en";
export const LANG_COOKIE = "lang";
export const RTL_LANGS: Lang[] = ["he"];

export const OG_LOCALES: Record<Lang, string> = {
  ru: "ru_RU",
  en: "en_US",
  ka: "ka_GE",
  tr: "tr_TR",
  uk: "uk_UA",
  he: "he_IL",
};

export const messages: Record<Lang, Messages> = {
  ru,
  en: en as unknown as Messages,
  ka: ka as unknown as Messages,
  tr: tr as unknown as Messages,
  uk: uk as unknown as Messages,
  he: he as unknown as Messages,
};

export function isLang(value: string | undefined): value is Lang {
  return LANGS.includes(value as Lang);
}

// Адрес страницы на другом языке: /ru/privacy -> /en/privacy
export function swapLang(pathname: string, lang: Lang): string {
  const parts = pathname.split("/");
  if (isLang(parts[1])) parts[1] = lang;
  else parts.splice(1, 0, lang);
  return parts.join("/").replace(/\/$/, "") || "/";
}

// canonical и hreflang для страницы; path - без языка, например "/privacy" или ""
export function alternatesFor(lang: Lang, path: string) {
  return {
    canonical: `/${lang}${path}`,
    languages: {
      ...Object.fromEntries(LANGS.map((l) => [l, `/${l}${path}`])),
      "x-default": path || "/",
    },
  };
}
