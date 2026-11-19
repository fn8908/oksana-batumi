import { Unbounded, Monoton } from "next/font/google";
import "./vice.css";

// Тяжёлый дисплейный шрифт под неоновые заголовки; латиница + кириллица
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
  variable: "--font-unbounded",
  display: "swap",
});

// Неоновая вывеска: только латиница, для декоративной строки
const monoton = Monoton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-monoton",
  display: "swap",
});

// Вторая версия сайта: в поиск не отдаём, чтобы не спорить с основными страницами
export const metadata = { robots: { index: false, follow: false } };

export default function ViceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`vice ${unbounded.variable} ${monoton.variable}`}>
      {children}
      <div className="vice-scanlines" aria-hidden="true" />
    </div>
  );
}
