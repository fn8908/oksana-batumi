import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import Gallery from "@/components/Gallery";
import ListingCard from "@/components/ListingCard";
import { listings, perM2, videoFor } from "@/lib/listings";
import { tgWithText } from "@/lib/contacts";
import { LANGS, type Lang, alternatesFor, isLang, messages } from "@/lib/i18n";

const SITE = "https://batumi-realty.org";

type Params = Promise<{ lang: string; slug: string }>;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => listings.map((l) => ({ lang, slug: l.slug })));
}

function price(l: (typeof listings)[number], m: (typeof messages)[Lang]) {
  return l.deal === "rent" ? `${l.price}${m.map.perMonth}` : l.price;
}

function load(lang: string, slug: string) {
  const l = listings.find((x) => x.slug === slug);
  if (!l || !isLang(lang)) return null;
  return { l, lang: lang as Lang, m: messages[lang as Lang], text: messages[lang as Lang].listings[l.slug] };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const data = load(lang, slug);
  if (!data) return {};
  const { l, text } = data;
  return {
    title: `${text.title} - ${price(l, data.m)}`,
    description: `${text.address}. ${text.facts.join(", ")}. ${price(l, data.m)}.`,
    alternates: alternatesFor(data.lang, `/obekty/${l.slug}`),
    openGraph: { images: [`/obekty/${l.slug}/1.jpg`] },
  };
}

export default async function ListingPage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const data = load(lang, slug);
  if (!data) notFound();
  const { l, m, text } = data;

  const muted = { color: "rgba(245,240,232,0.72)" };
  const url = `${SITE}/${lang}/obekty/${l.slug}`;
  // Готовое сообщение: менеджер сразу видит, о каком объекте вопрос
  const tg = tgWithText(`${m.listing.tgText} ${text.title}, ${price(l, m)}\n${url}`);
  // Сначала объекты того же типа сделки, потом остальные
  const others = listings
    .filter((x) => x.slug !== l.slug)
    .sort((a, b) => Number(b.deal === l.deal) - Number(a.deal === l.deal))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: text.title,
    description: [...text.facts, ...text.apartment].join(". "),
    url,
    image: Array.from({ length: l.photos }, (_, i) => `${SITE}/obekty/${l.slug}/${i + 1}.jpg`),
    offers: {
      "@type": "Offer",
      price: l.priceNum,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="min-h-screen px-4 pt-10 pb-28 sm:pb-10" style={{ background: "#0F1C2E" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-5xl mx-auto">
        <Link href={`/${lang}`} className="text-sm" style={{ color: "#C9A96E" }}>
          ← Batumi Realty
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 mt-6">
          <div
            className="w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden md:sticky md:top-6 md:self-start"
            style={{ aspectRatio: "9 / 16", background: "#000" }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoFor(l, lang)}?rel=0&hl=${lang}`}
              title={text.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#C9A96E" }}>
              {l.deal === "sale" ? m.listing.sale : m.listing.rent}
            </p>
            <h1 className="font-cormorant font-semibold text-3xl lg:text-4xl mb-3" style={{ color: "#F5F0E8" }}>
              {text.title}
            </h1>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
              <span className="font-cormorant font-bold text-4xl" style={{ color: "#C9A96E" }}>
                {price(l, m)}
              </span>
              {l.oldPrice && (
                <span className="text-lg line-through" style={{ color: "rgba(245,240,232,0.5)" }}>
                  {l.oldPrice}
                </span>
              )}
              {l.deal === "sale" && (
                <span className="text-sm" style={muted}>
                  {perM2(l)} {m.sale.perM2}
                </span>
              )}
            </div>
            <p className="text-sm mb-5" style={muted}>
              {text.address}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {text.facts.map((f) => (
                <span
                  key={f}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(201,169,110,0.12)", color: "#F5F0E8" }}
                >
                  {f}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={tg}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-4 px-4 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "#229ED9", color: "#fff" }}
              >
                {m.listing.telegram}
              </a>
              <a
                href="#viewing"
                className="flex-1 text-center py-4 px-4 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "#C9A96E", color: "#0F1C2E" }}
              >
                {m.listing.viewing}
              </a>
            </div>

            <Gallery slug={l.slug} count={l.photos} alt={text.title} />

            <h2 className="font-cormorant font-semibold text-2xl mb-3" style={{ color: "#F5F0E8" }}>
              {m.listing.about}
            </h2>
            <ul className="space-y-2 mb-6 text-sm list-disc ps-5" style={muted}>
              {text.apartment.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>

            <h2 className="font-cormorant font-semibold text-2xl mb-3" style={{ color: "#F5F0E8" }}>
              {m.listing.building}
            </h2>
            <ul className="space-y-2 mb-8 text-sm list-disc ps-5" style={muted}>
              {text.building.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>

            <h2
              id="viewing"
              className="font-cormorant font-semibold text-2xl mb-1"
              style={{ color: "#F5F0E8", scrollMarginTop: "24px" }}
            >
              {m.listing.viewing}
            </h2>
            <p className="text-sm mb-4" style={muted}>
              {m.listing.viewingText}
            </p>
            {/* subject уходит владельцу в Telegram - всегда по-русски, как и всё уведомление */}
            <LeadForm
              subject={`Объект: ${messages.ru.listings[l.slug].title}, ${messages.ru.listings[l.slug].address}, ${price(l, messages.ru)}`}
              dealType={l.deal === "sale" ? "buy" : "rent"}
              viewing
            />
          </div>
        </div>

        <h2 className="font-cormorant font-semibold text-3xl mt-16 mb-6" style={{ color: "#F5F0E8" }}>
          {m.listing.other}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {others.map((x) => (
            <ListingCard key={x.slug} l={x} lang={lang as Lang} />
          ))}
        </div>
      </div>

      {/* Телефон: кнопка связи всегда под рукой */}
      <div
        className="sm:hidden fixed left-0 right-0 bottom-0 z-50 flex gap-2 p-2"
        style={{
          background: "rgba(15,28,46,0.96)",
          borderTop: "1px solid rgba(201,169,110,0.3)",
          paddingBottom: "calc(8px + env(safe-area-inset-bottom))",
        }}
      >
        <a
          href={tg}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-3 rounded-xl font-semibold text-sm"
          style={{ background: "#229ED9", color: "#fff" }}
        >
          Telegram
        </a>
        <a
          href="#viewing"
          className="flex-1 text-center py-3 rounded-xl font-semibold text-sm"
          style={{ background: "#C9A96E", color: "#0F1C2E" }}
        >
          {m.listing.viewing}
        </a>
      </div>
    </main>
  );
}
