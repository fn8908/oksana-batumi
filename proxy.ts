import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LANG, LANG_COOKIE, LANGS, type Lang, isLang } from "@/lib/i18n";

// Язык посетителя: выбранный раньше (cookie), затем язык браузера, иначе английский
function detectLang(req: NextRequest): Lang {
  const saved = req.cookies.get(LANG_COOKIE)?.value;
  if (isLang(saved)) return saved;

  const accepted = (req.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { code: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { code } of accepted) {
    if (code === "iw") return "he";
    if (isLang(code)) return code;
  }
  return DEFAULT_LANG;
}

// Адреса без языка (корень и старые ссылки) переадресуем на версию нужного языка
export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const first = pathname.split("/")[1];
  if (LANGS.includes(first as Lang)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${detectLang(req)}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  const res = NextResponse.redirect(url);
  res.headers.set("Vary", "Accept-Language, Cookie");
  return res;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
