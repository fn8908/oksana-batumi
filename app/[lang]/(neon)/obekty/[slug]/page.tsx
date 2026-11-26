import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import ViceCard from "@/components/vice/ViceCard";
import ViceLead from "@/components/vice/ViceLead";
import ViceFloating from "@/components/vice/ViceFloating";
import { listings, perM2, videoFor } from "@/lib/listings";
import { tgWithText, waWithText } from "@/lib/contacts";
import { LANGS, type Lang, alternatesFor, isLang, messages } from "@/lib/i18n";

const SITE = "https://batumi-realty.org";

type Params = Promise<{ lang: string; slug: string }>;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => listings.map((l) => ({ lang, slug: l.slug })));
}

function price(l: (typeof listings)[number], m: (typeof messages)[Lang]) {
  if (!l.price) return m.sale.onRequest;
  return l.deal === "rent" ? `${l.price}${m.map.perMonth}` : l.price;
}

function load(lang: string, slug: string) {
  const l = listings.find((x) => x.slug === slug);
  if (!l || !isLang(lang)) return null;
  const lg = lang as Lang;
  return { l, lang: lg, m: messages[lg], text: messages[lg].listings[l.slug] };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const data = load(lang, slug);
  if (!data) return {};
  return {
    title: `${data.text.title} - ${price(data.l, data.m)}`,
    description: `${data.text.address}. ${data.text.facts.join(", ")}.`,
    alternates: alternatesFor(data.lang, `/obekty/${data.l.slug}`),
    openGraph: { images: [`/obekty/${data.l.slug}/1.jpg`] },
  };
}

export default async function ViceListingPage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const data = load(lang, slug);
  if (!data) notFound();
  const { l, m, text } = data;

  const video = videoFor(l, lang);
  const url = `${SITE}/${lang}/obekty/${l.slug}`;
  const tg = tgWithText(`${m.listing.tgText} ${text.title}, ${price(l, m)}\n${url}`);
  const wa = waWithText(`${m.listing.tgText} ${text.title}, ${price(l, m)}\n${url}`);
  const others = listings
    .filter((x) => x.slug !== l.slug)
    .sort((a, b) => Number(b.deal === l.deal) - Number(a.deal === l.deal))
    .slice(0, 3);

  const muted = { color: "var(--v-muted)" };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: text.title,
    description: [...text.facts, ...text.apartment].join(". "),
    url,
    image: Array.from({ length: l.photos }, (_, i) => `${SITE}/obekty/${l.slug}/${i + 1}.jpg`),
    // у объекта с ценой по запросу предложения с ценой нет
    ...(l.price && {
      offers: {
        "@type": "Offer",
        price: l.priceNum,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    }),
  };

  return (
    <main className="relative min-h-screen pb-28 sm:pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Неоновая шапка страницы */}
      <div className="relative overflow-hidden pt-8 pb-10 px-4">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #3d0d5e 0%, #8a1c6b 55%, #130524 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% -20%, rgba(255,122,47,0.55), transparent 62%)" }}
        />
        {/* мягкий переход к тёмному фону страницы */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 45%, #130524 100%)" }}
        />
        <div className="relative max-w-5xl mx-auto">
          <Link href={`/${lang}`} className="vice-tag" style={{ color: "#00e5ff" }}>
            ← Batumi Realty
          </Link>
          <p className="vice-tag mt-6 mb-2" style={{ color: "#ff8ad1" }}>
            {l.deal === "sale" ? m.listing.sale : m.listing.rent}
          </p>
          <h1 className="vice-display vice-chrome text-2xl sm:text-4xl uppercase mb-4">{text.title}</h1>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="vice-price text-3xl sm:text-4xl">{price(l, m)}</span>
            {l.oldPrice && (
              <span className="text-lg line-through" style={{ color: "rgba(255,255,255,0.55)" }}>
                {l.oldPrice}
              </span>
            )}
            {l.deal === "sale" && l.price && (
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                {perM2(l)} {m.sale.perM2}
              </span>
            )}
          </div>
          <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.8)" }}>
            📍 {text.address}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8">
          <div
            className="w-full max-w-[320px] mx-auto overflow-hidden md:sticky md:top-6 md:self-start"
            style={{
              aspectRatio: "9 / 16",
              background: "#000",
              borderRadius: "18px",
              border: "1px solid rgba(255,46,136,0.5)",
              boxShadow: "0 0 30px rgba(255,46,136,0.3)",
            }}
          >
            {video ? (
              <iframe
                src={`https://www.youtube.com/embed/${video}?rel=0&hl=${lang}`}
                title={text.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img src={`/obekty/${l.slug}/1.jpg`} alt={text.title} className="w-full h-full object-cover" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap gap-2 mb-6">
              {text.facts.map((f) => (
                <span key={f} className="vice-chip">
                  {f}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href={tg} target="_blank" rel="noopener noreferrer" className="vice-btn flex-1 py-4 px-4 text-[11px]">
                {m.listing.telegram}
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="vice-btn-ghost flex-1 py-4 px-4 text-[11px]"
                style={{ borderColor: "#25D366", color: "#25D366" }}
              >
                WhatsApp
              </a>
              <a href="#viewing" className="vice-btn-ghost flex-1 py-4 px-4 text-[11px]">
                {m.listing.viewing}
              </a>
            </div>

            <Gallery slug={l.slug} count={l.photos} alt={text.title} />

            <h2 className="vice-display vice-neon text-lg uppercase mb-4">{m.listing.about}</h2>
            <ul className="space-y-2 mb-8 text-sm list-disc ps-5" style={muted}>
              {text.apartment.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>

            {text.building.length > 0 && (
              <>
                <h2 className="vice-display vice-neon text-lg uppercase mb-4">{m.listing.building}</h2>
                <ul className="space-y-2 mb-8 text-sm list-disc ps-5" style={muted}>
                  {text.building.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </>
            )}

            <div id="viewing" className="vice-panel p-6" style={{ scrollMarginTop: "24px" }}>
              <h2 className="vice-display text-lg uppercase mb-2" style={{ color: "#fff" }}>
                {m.listing.viewing}
              </h2>
              <p className="text-sm mb-4" style={muted}>
                {m.listing.viewingText}
              </p>
              <ViceLead
                subject={`Объект: ${messages.ru.listings[l.slug].title}, ${messages.ru.listings[l.slug].address}, ${price(l, messages.ru)} (неоновая версия)`}
                dealType={l.deal === "sale" ? "buy" : "rent"}
              />
            </div>
          </div>
        </div>

        <h2 className="vice-display vice-neon text-xl uppercase mt-16 mb-6">{m.listing.other}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {others.map((x) => (
            <ViceCard key={x.slug} l={x} lang={lang as Lang} />
          ))}
        </div>
      </div>

      <ViceFloating />
    </main>
  );
}
