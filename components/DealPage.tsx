import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ListingCard from "@/components/ListingCard";
import SelectionForm from "@/components/SelectionForm";
import BuyerGuide from "@/components/BuyerGuide";
import FloatingCTA from "@/components/FloatingCTA";
import { listings } from "@/lib/listings";
import { alternatesFor, isLang, messages } from "@/lib/i18n";

// Посадочные страницы под рекламу: /prodazha (продажа) и /arenda (долгосрочная аренда).
// На каждой - объекты своего типа и форма подбора.
type Deal = "sale" | "rent";

const PATH: Record<Deal, string> = { sale: "/prodazha", rent: "/arenda" };

function texts(lang: string, deal: Deal) {
  if (!isLang(lang)) return null;
  const m = messages[lang];
  return deal === "sale"
    ? { title: m.sale.pageTitle, subtitle: m.sale.subtitle }
    : { title: m.rentBlock.pageTitle, subtitle: `${m.rentBlock.subtitle} ${m.rentBlock.pickText}` };
}

export function dealMetadata(lang: string, deal: Deal): Metadata {
  const t = texts(lang, deal);
  if (!t || !isLang(lang)) return {};
  return { title: t.title, description: t.subtitle, alternates: alternatesFor(lang, PATH[deal]) };
}

export default function DealPage({ lang, deal }: { lang: string; deal: Deal }) {
  const t = texts(lang, deal);
  if (!t || !isLang(lang)) notFound();
  const items = listings.filter((l) => l.deal === deal);

  return (
    <main className="min-h-screen" style={{ background: "#0F1C2E" }}>
      <div className="max-w-5xl mx-auto px-4 pt-10">
        <Link href={`/${lang}`} className="text-sm" style={{ color: "#C9A96E" }}>
          ← Batumi Realty
        </Link>
        <h1 className="font-cormorant font-semibold text-4xl lg:text-5xl mt-6 mb-4" style={{ color: "#F5F0E8" }}>
          {t.title}
        </h1>
        <p className="text-base mb-10 max-w-2xl" style={{ color: "rgba(245,240,232,0.72)" }}>
          {t.subtitle}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((l) => (
            <ListingCard key={l.slug} l={l} lang={lang} />
          ))}
        </div>
      </div>

      <SelectionForm initialDeal={deal === "sale" ? "buy" : "rent"} />
      {deal === "sale" && <BuyerGuide />}
      <FloatingCTA />
      <div className="h-24 sm:h-0" />
    </main>
  );
}
