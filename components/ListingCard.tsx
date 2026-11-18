import Link from "next/link";
import { type Listing, perM2 } from "@/lib/listings";
import { type Lang, messages } from "@/lib/i18n";

// Карточка объекта: без хуков, работает и на главной, и на странице объекта
export default function ListingCard({ l, lang }: { l: Listing; lang: Lang }) {
  const m = messages[lang];
  const text = m.listings[l.slug];

  return (
    <Link
      href={`/${lang}/obekty/${l.slug}`}
      className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.13)",
        textDecoration: "none",
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
        <img
          src={`/obekty/${l.slug}/1.jpg`}
          alt={text.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(10,20,35,0.75))" }}
        />
        <div className="absolute top-3 start-3 flex gap-2">
          <span
            className="text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ background: "rgba(15,28,46,0.85)", color: "#F5F0E8", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            ▶ {m.sale.video}
          </span>
          {l.oldPrice && (
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{ background: "#C9A96E", color: "#0F1C2E" }}
            >
              {m.sale.reduced}
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
          <span className="font-cormorant font-bold text-3xl" style={{ color: "#C9A96E" }}>
            {l.price}
            {l.deal === "rent" && <span className="text-lg">{m.map.perMonth}</span>}
          </span>
          {l.oldPrice && (
            <span className="text-sm line-through" style={{ color: "rgba(245,240,232,0.5)" }}>
              {l.oldPrice}
            </span>
          )}
          {l.deal === "sale" && (
            <span className="text-xs" style={{ color: "rgba(245,240,232,0.6)" }}>
              {perM2(l)} {m.sale.perM2}
            </span>
          )}
        </div>
        <h3 className="font-cormorant font-semibold text-xl leading-tight mb-1" style={{ color: "#F5F0E8" }}>
          {text.title}
        </h3>
        <p className="text-sm mb-4" style={{ color: "rgba(245,240,232,0.7)" }}>
          📍 {text.address}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {text.facts.map((f) => (
            <span
              key={f}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{ background: "rgba(78,205,196,0.08)", color: "#4ECDC4", border: "1px solid rgba(78,205,196,0.15)" }}
            >
              {f}
            </span>
          ))}
        </div>
        <span
          className="block text-center w-full py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: "rgba(201,169,110,0.15)", color: "#C9A96E", border: "1px solid rgba(201,169,110,0.35)" }}
        >
          {m.sale.details}
        </span>
      </div>
    </Link>
  );
}
