import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { alternatesFor, isLang, messages } from "@/lib/i18n";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    title: messages[lang].privacy.title,
    alternates: alternatesFor(lang, "/privacy"),
  };
}

export default async function PrivacyPage({ params }: { params: Params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const p = messages[lang].privacy;

  return (
    <main className="min-h-screen px-4 py-10" style={{ background: "#0F1C2E" }}>
      <div className="max-w-2xl mx-auto">
        <Link href={`/${lang}`} className="text-sm" style={{ color: "#C9A96E" }}>
          ← Batumi Realty
        </Link>
        <h1 className="font-cormorant font-semibold text-4xl mt-6 mb-8" style={{ color: "#F5F0E8" }}>
          {p.title}
        </h1>
        {p.sections.map((s) => (
          <section key={s.h} className="mb-7">
            <h2 className="font-cormorant font-semibold text-2xl mb-2" style={{ color: "#F5F0E8" }}>
              {s.h}
            </h2>
            {s.p.map((text) => (
              <p key={text} className="text-sm mb-2 leading-relaxed" style={{ color: "rgba(245,240,232,0.72)" }}>
                {text}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
