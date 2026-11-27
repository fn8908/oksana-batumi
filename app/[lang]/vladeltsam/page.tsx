import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import { WA_URL } from "@/lib/contacts";
import { alternatesFor, isLang, messages } from "@/lib/i18n";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const o = messages[lang].owners;
  return {
    title: o.metaTitle,
    description: o.metaDescription,
    alternates: alternatesFor(lang, "/vladeltsam"),
  };
}

export default async function OwnersPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const o = messages[lang].owners;
  const muted = { color: "rgba(245,240,232,0.72)" };

  return (
    <main className="min-h-screen px-4 py-10" style={{ background: "#0F1C2E" }}>
      <div className="max-w-2xl mx-auto">
        <Link href={`/${lang}`} className="text-sm" style={{ color: "#C9A96E" }}>
          ← Batumi Realty
        </Link>

        <h1 className="font-cormorant font-semibold text-4xl lg:text-5xl mt-6 mb-4" style={{ color: "#F5F0E8" }}>
          {o.heading}
        </h1>
        <p className="text-base mb-8" style={muted}>
          {o.intro}
        </p>

        <ol className="space-y-3 mb-10">
          {o.steps.map((s, i) => (
            <li key={s} className="flex gap-4 text-sm" style={muted}>
              <span className="font-cormorant font-bold text-2xl leading-none" style={{ color: "#C9A96E" }}>
                {i + 1}
              </span>
              <span className="pt-1">{s}</span>
            </li>
          ))}
        </ol>

        <a
          href="https://t.me/ALazarev095"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center w-full py-4 rounded-xl font-semibold text-sm mb-3 transition-all hover:opacity-90"
          style={{ background: "#229ED9", color: "#fff" }}
        >
          {o.telegram}
        </a>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center w-full py-4 rounded-xl font-semibold text-sm mb-8 transition-all hover:opacity-90"
          style={{ background: "#25D366", color: "#fff" }}
        >
          WhatsApp
        </a>

        <h2 className="font-cormorant font-semibold text-2xl mb-3" style={{ color: "#F5F0E8" }}>
          {o.formHeading}
        </h2>
        {/* subject уходит владельцу в Telegram - всегда по-русски */}
        <LeadForm subject={messages.ru.owners.subject} commentPlaceholder={o.commentPlaceholder} />
      </div>
    </main>
  );
}
