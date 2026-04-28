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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://batumi-realty.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Аренда квартир, домов и вилл в Батуми — Batumi Realty",
    template: "%s | Batumi Realty",
  },
  description:
    "Аренда квартир, домов и вилл в Батуми (Грузия). Долгосрочная и посуточная аренда. Элитная недвижимость в горах Аджарии. Сообщество проверенных риэлторов.",
  keywords: [
    "аренда квартир Батуми",
    "снять квартиру Батуми",
    "недвижимость Батуми",
    "вилла Батуми аренда",
    "дом Батуми аренда",
    "Аджария недвижимость",
    "Batumi apartment rent",
    "Batumi real estate",
    "Batumi villa rent",
    "Georgia property",
    "батуми риэлтор",
    "аренда Грузия",
  ],
  authors: [{ name: "Batumi Realty Community" }],
  creator: "Batumi Realty",
  publisher: "Batumi Realty",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "ru_GE",
    alternateLocale: ["en_GE", "ka_GE", "tr_GE", "uk_GE"],
    url: siteUrl,
    siteName: "Batumi Realty",
    title: "Аренда квартир, домов и вилл в Батуми — Batumi Realty",
    description:
      "Проверенные объекты. Прозрачные условия. Сообщество риэлторов с опытом на рынке Батуми.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Batumi Realty — аренда недвижимости в Батуми",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Аренда квартир, домов и вилл в Батуми — Batumi Realty",
    description:
      "Проверенные объекты. Прозрачные условия. Сообщество риэлторов Батуми.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka" className={`${cormorant.variable} ${nunito.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Batumi Realty",
              description:
                "Сообщество риэлторов Батуми. Аренда квартир, домов и вилл в Батуми и горах Аджарии.",
              url: siteUrl,
              areaServed: {
                "@type": "City",
                name: "Батуми",
                containedInPlace: {
                  "@type": "Country",
                  name: "Грузия",
                },
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: [
                  "Russian",
                  "Georgian",
                  "English",
                  "Turkish",
                  "Ukrainian",
                  "Hebrew",
                ],
              },
            }),
          }}
        />
      </head>
      <body
        className="antialiased"
        style={{ background: "#0F1C2E", color: "#F5F0E8" }}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
