import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import { listings } from "@/lib/listings";
import { LANGS, type Lang, alternatesFor, isLang, messages } from "@/lib/i18n";

type Params = Promise<{ lang: string; slug: string }>;

export function generateStaticParams() {
  return LANGS.flatMap((lang) => listings.map((l) => ({ lang, slug: l.slug })));
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
    title: `${text.title} - ${l.price}`,
    description: `${text.address}. ${text.facts.join(", ")}. ${l.price}.`,
    alternates: alternatesFor(data.lang, `/obekty/${l.slug}`),
  };
}

export default async function ListingPage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const data = load(lang, slug);
  if (!data) notFound();
  const { l, m, text } = data;

  const muted = { color: "rgba(245,240,232,0.72)" };

  return (
    <main className="min-h-screen px-4 py-10" style={{ background: "#0F1C2E" }}>
      <div className="max-w-5xl mx-auto">
        <Link href={`/${lang}`} className="text-sm" style={{ color: "#C9A96E" }}>
          ← Batumi Realty
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-8 mt-6">
          <div
            className="w-full max-w-[360px] mx-auto rounded-2xl overflow-hidden"
            style={{ aspectRatio: "9 / 16", background: "#000" }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${l.videoId}?rel=0&hl=${lang}`}
              title={text.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#C9A96E" }}>
              {l.deal === "sale" ? m.listing.sale : m.listing.rent}
            </p>
            <h1 className="font-cormorant font-semibold text-3xl lg:text-4xl mb-3" style={{ color: "#F5F0E8" }}>
              {text.title}
            </h1>
            <p className="font-cormorant font-bold text-4xl mb-2" style={{ color: "#C9A96E" }}>
              {l.price}
            </p>
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

            <a
              href="https://t.me/ALazarev095"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full py-4 rounded-xl font-semibold text-sm mb-8 transition-all hover:opacity-90"
              style={{ background: "#229ED9", color: "#fff" }}
            >
              {m.listing.telegram}
            </a>

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

            <h2 className="font-cormorant font-semibold text-2xl mb-3" style={{ color: "#F5F0E8" }}>
              {m.listing.request}
            </h2>
            {/* subject уходит владельцу в Telegram - всегда по-русски, как и всё уведомление */}
            <LeadForm
              subject={`Объект: ${messages.ru.listings[l.slug].title}, ${messages.ru.listings[l.slug].address}, ${l.price}`}
              dealType={l.deal === "sale" ? "buy" : "rent"}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
