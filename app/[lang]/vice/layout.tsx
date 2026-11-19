import { Oswald, Yellowtail } from "next/font/google";
import "./vice.css";

// Узкий тяжёлый гротеск - как подписи и интерфейс в GTA; латиница + кириллица
const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

// Рукописный курсив под вывеску "Welcome to Batumi" (как Vice City на обложке)
const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yellowtail",
  display: "swap",
});

// Вторая версия сайта: в поиск не отдаём, чтобы не спорить с основными страницами
export const metadata = { robots: { index: false, follow: false } };

export default function ViceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`vice ${oswald.variable} ${yellowtail.variable}`}>
      {children}
      <div className="vice-scanlines" aria-hidden="true" />
    </div>
  );
}
