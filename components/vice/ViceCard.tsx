import Link from "next/link";
import { type Listing, perM2 } from "@/lib/listings";
import { type Lang, messages } from "@/lib/i18n";

// Карточка объекта в неоновом стиле: цена вынесена на фото
export default function ViceCard({ l, lang }: { l: Listing; lang: Lang }) {
  const m = messages[lang];
  const text = m.listings[l.slug];

  return (
    <Link href={`/${lang}/vice/obekty/${l.slug}`} className="vice-card group block overflow-hidden">
      <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
        <img
          src={`/obekty/${l.slug}/1.jpg`}
          alt={text.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ filter: "saturate(1.25) contrast(1.05)" }}
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(123,47,247,0.25) 0%, transparent 35%, rgba(19,5,36,0.92) 100%)",
          }}
        />

        <div className="absolute top-3 start-3 flex gap-2">
          {l.videoId && (
            <span
              className="vice-tag px-3 py-1.5 rounded-full"
              style={{ background: "rgba(13,2,26,0.8)", border: "1px solid rgba(0,229,255,0.6)", color: "#b9f6ff" }}
            >
              ▶ {m.sale.video}
            </span>
          )}
          {l.oldPrice && (
            <span
              className="vice-tag px-3 py-1.5 rounded-full"
              style={{ background: "linear-gradient(90deg,#ff7a2f,#ff2e88)", color: "#fff" }}
            >
              {m.sale.reduced}
            </span>
          )}
        </div>

        <div className="absolute bottom-3 start-4 end-4 flex flex-wrap items-baseline gap-x-3">
          <span className="vice-price text-2xl sm:text-3xl">
            {l.price || m.sale.onRequest}
            {l.deal === "rent" && <span className="text-base">{m.map.perMonth}</span>}
          </span>
          {l.oldPrice && (
            <span className="text-sm line-through" style={{ color: "rgba(255,255,255,0.55)" }}>
              {l.oldPrice}
            </span>
          )}
          {l.deal === "sale" && l.price && (
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
              {perM2(l)} {m.sale.perM2}
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="vice-display text-base sm:text-lg uppercase mb-2" style={{ color: "#fff" }}>
          {text.title}
        </h3>
        <p className="text-sm mb-4" style={{ color: "var(--v-muted)" }}>
          📍 {text.address}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {text.facts.map((f) => (
            <span key={f} className="vice-chip">
              {f}
            </span>
          ))}
        </div>
        <span className="vice-btn-ghost w-full py-2.5 text-xs">{m.sale.details}</span>
      </div>
    </Link>
  );
}
