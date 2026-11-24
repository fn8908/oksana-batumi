// Тексты объектов - в messages/*.json, раздел "listings.<slug>"
// Фото - в public/obekty/<slug>/1.jpg ... <photos>.jpg
export interface Listing {
  slug:
    | "inasaridze-7-80"
    | "inasaridze-7-82"
    | "shartava-32"
    | "villa-gonio"
    | "villa-gonio-2"
    | "zgvispiri-1"
    | "lortkipanidze-6a"
    | "gorgasali-163"
    | "gorgasali-158"
    | "lortkipanidze-24"
    | "bi-residence-studio";
  deal: "sale" | "rent";
  price: string; // пусто - цена по запросу
  oldPrice?: string;
  priceNum: number;
  area: number;
  videoId?: string; // ролик на русском канале; нет - на странице вместо видео главное фото
  videoIdEn?: string; // ролик на английском канале
  photos: number;
}

export const listings: Listing[] = [
  { slug: "inasaridze-7-80", deal: "sale", price: "$180\u00a0000", oldPrice: "$195\u00a0000", priceNum: 180000, area: 80, videoId: "74ibjtRqoYA", videoIdEn: "H5XSmVGARaE", photos: 9 },
  { slug: "inasaridze-7-82", deal: "sale", price: "$205\u00a0000", priceNum: 205000, area: 82, videoId: "Zu1AMrPwhD4", videoIdEn: "UgdtDe3WAhA", photos: 9 },
  { slug: "villa-gonio", deal: "sale", price: "$299\u00a0000", priceNum: 299000, area: 190, videoId: "e-GLP2Iyjag", videoIdEn: "iwni3Cs8PzU", photos: 8 },
  { slug: "villa-gonio-2", deal: "sale", price: "$310\u00a0000", priceNum: 310000, area: 190, videoId: "OtqLPF56joA", videoIdEn: "f0fqnNhNuAo", photos: 18 },
  { slug: "shartava-32", deal: "sale", price: "$82\u00a0000", priceNum: 82000, area: 37, videoId: "wxkpyJpioUg", videoIdEn: "ItuNXPxKTVY", photos: 7 },
  { slug: "zgvispiri-1", deal: "sale", price: "$108\u00a0000", priceNum: 108000, area: 50, photos: 11 },
  { slug: "lortkipanidze-6a", deal: "sale", price: "$60\u00a0000", priceNum: 60000, area: 33.5, photos: 9 },
  { slug: "gorgasali-158", deal: "sale", price: "$110\u00a0000", priceNum: 110000, area: 42, videoId: "sRua_HfhRhs", photos: 6 },
  { slug: "lortkipanidze-24", deal: "sale", price: "$49\u00a0000", priceNum: 49000, area: 29, videoId: "RLc0fYAsbzA", videoIdEn: "sWc3S5wV-vU", photos: 9 },
  { slug: "gorgasali-163", deal: "rent", price: "$1\u00a0600", priceNum: 1600, area: 160, videoId: "j9yXwK26SUU", videoIdEn: "1L72nxQIYU0", photos: 8 },
  { slug: "bi-residence-studio", deal: "rent", price: "$400", priceNum: 400, area: 38, videoId: "hbq9hWvEw0Y", photos: 10 },
];

// EN, TR, HE смотрят английский ролик, остальные - русский (как кнопка ютуба)
export function videoFor(l: Listing, lang: string): string | undefined {
  return ["en", "tr", "he"].includes(lang) ? l.videoIdEn : l.videoId;
}

// Цена за метр: "$2\u00a0250"
export function perM2(l: Listing): string {
  return "$" + String(Math.round(l.priceNum / l.area)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
}
