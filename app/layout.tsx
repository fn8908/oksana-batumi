import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://batumi-realty.vercel.app"
  ),
  title: "Аренда квартир в Батуми — Batumi Realty",
  description:
    "Подбор квартир в аренду в Батуми. Долгосрочная и посуточная аренда. Проверенные объекты от сообщества риэлторов.",
  openGraph: {
    title: "Аренда квартир в Батуми — Batumi Realty",
    description:
      "Подбор квартир в аренду в Батуми. Долгосрочная и посуточная аренда.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${nunito.variable}`}>
      <body
        className="antialiased"
        style={{ background: "#0F1C2E", color: "#F5F0E8" }}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
