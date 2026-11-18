import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ListingCard from "@/components/ListingCard";
import SelectionForm from "@/components/SelectionForm";
import FloatingCTA from "@/components/FloatingCTA";
import { complexes } from "@/lib/complexes";
import { listings } from "@/lib/listings";

type Params = Promise<{ lang: string; slug: string }>;

// Только английская версия: остальные языки отдают 404
export function generateStaticParams() {
  return complexes.map((c) => ({ lang: "en", slug: c.slug }));
}

function find(lang: string, slug: string) {
  return lang === "en" ? complexes.find((c) => c.slug === slug) : undefined;
}

const title = (name: string) => `Apartments for sale and long-term rent in ${name}`;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const c = find(lang, slug);
  if (!c) return {};
  return {
    title: `${title(c.name)}, Batumi`,
    description: `${c.about} Tell us your budget and we will send you options. Long-term rentals only, from 6 months.`,
    alternates: { canonical: `/en/zhk/${c.slug}` },
  };
}

export default async function ComplexPage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const c = find(lang, slug);
  if (!c) notFound();

  const muted = { color: "rgba(245,240,232,0.72)" };

  return (
    <main className="min-h-screen" style={{ background: "#0F1C2E" }}>
      <div className="max-w-5xl mx-auto px-4 pt-10">
        <Link href="/en" className="text-sm" style={{ color: "#C9A96E" }}>
          ← Batumi Realty
        </Link>
        <h1 className="font-cormorant font-semibold text-4xl lg:text-5xl mt-6 mb-4" style={{ color: "#F5F0E8" }}>
          {title(c.name)}
        </h1>
        <p className="text-base mb-4 max-w-3xl leading-relaxed" style={muted}>
          {c.about}
        </p>
        <p className="text-base mb-6 max-w-3xl leading-relaxed" style={muted}>
          Tell us your budget and whether you want to buy or rent - we will check what is available in {c.name} and
          nearby buildings and send you options with prices and videos.
        </p>
        <p
          className="inline-block text-sm font-semibold px-4 py-2 rounded-full"
          style={{ background: "rgba(201,169,110,0.12)", color: "#C9A96E", border: "1px solid rgba(201,169,110,0.35)" }}
        >
          Long-term only, from 6 months - no daily rentals
        </p>
      </div>

      {/* subject уходит владельцу в Telegram - по-русски, с названием комплекса */}
      <SelectionForm subject={`Заявка на подборку, ЖК ${c.name}`} />

      <div className="max-w-5xl mx-auto px-4 pb-28 sm:pb-16">
        <h2 className="font-cormorant font-semibold text-3xl mb-6" style={{ color: "#F5F0E8" }}>
          Our current listings in Batumi
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {listings.map((l) => (
            <ListingCard key={l.slug} l={l} lang="en" />
          ))}
        </div>
      </div>
      <FloatingCTA />
    </main>
  );
}
