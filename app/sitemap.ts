import { MetadataRoute } from "next";
import { listings } from "@/lib/listings";
import { LANGS } from "@/lib/i18n";

const SITE = "https://batumi-realty.org";

// Каждая страница на каждом языке, со ссылками на остальные языковые версии
const pages: { path: string; changeFrequency: "weekly" | "monthly"; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  ...listings.map((l) => ({
    path: `/obekty/${l.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  })),
  { path: "/vladeltsam", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, changeFrequency, priority }) =>
    LANGS.map((lang) => ({
      url: `${SITE}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(LANGS.map((l) => [l, `${SITE}/${l}${path}`])),
      },
    }))
  );
}
