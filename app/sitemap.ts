import { MetadataRoute } from "next";
import { listings } from "@/lib/listings";
import { LANGS } from "@/lib/i18n";
import { complexes } from "@/lib/complexes";

const SITE = "https://batumi-realty.org";

// Каждая страница на каждом языке, со ссылками на остальные языковые версии
const pages: { path: string; changeFrequency: "weekly" | "monthly"; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/prodazha", changeFrequency: "weekly", priority: 0.9 },
  { path: "/arenda", changeFrequency: "weekly", priority: 0.9 },
  ...listings.map((l) => ({
    path: `/obekty/${l.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  })),
  { path: "/vladeltsam", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Страницы жилых комплексов есть только на английском
  const zhk = complexes.map((c) => ({
    url: `${SITE}/en/zhk/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...zhk, ...pages.flatMap(({ path, changeFrequency, priority }) =>
    LANGS.map((lang) => ({
      url: `${SITE}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(LANGS.map((l) => [l, `${SITE}/${l}${path}`])),
      },
    }))
  )];
}
