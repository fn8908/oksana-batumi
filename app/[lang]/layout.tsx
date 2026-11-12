import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import "../globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import YandexMetrika from "@/components/YandexMetrika";
import GoogleTag from "@/components/GoogleTag";
import {
  LANGS,
  OG_LOCALES,
  RTL_LANGS,
  alternatesFor,
  isLang,
  messages,
} from "@/lib/i18n";

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

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const m = messages[lang].meta;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: m.title,
      template: "%s | Batumi Realty",
    },
    description: m.description,
    keywords: m.keywords,
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
      locale: OG_LOCALES[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALES[l]),
      url: `/${lang}`,
      siteName: "Batumi Realty",
      title: m.title,
      description: m.ogDescription,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: m.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.ogDescription,
      images: ["/og-image.png"],
    },
    alternates: alternatesFor(lang, ""),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const m = messages[lang].meta;

  return (
    <html
      lang={lang}
      dir={RTL_LANGS.includes(lang) ? "rtl" : "ltr"}
      className={`${cormorant.variable} ${nunito.variable}`}
    >
      <head>
        {/* Preload hero image for fast LCP on mobile */}
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1692960570657-cd1c319a0f29?w=1920&q=85&auto=format&fit=crop"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Batumi Realty",
              description: m.orgDescription,
              url: `${siteUrl}/${lang}`,
              inLanguage: lang,
              areaServed: {
                "@type": "City",
                name: m.city,
                containedInPlace: {
                  "@type": "Country",
                  name: m.country,
                },
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                url: "https://t.me/ALazarev095",
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
        <LanguageProvider lang={lang}>{children}</LanguageProvider>
        <YandexMetrika />
        <GoogleTag />
      </body>
    </html>
  );
}
