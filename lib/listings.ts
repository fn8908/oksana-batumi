// Тексты объектов - в messages/*.json, раздел "listings.<slug>"
export interface Listing {
  slug: "inasaridze-7-80" | "inasaridze-7-82" | "gorgasali-163";
  deal: "sale" | "rent";
  price: string;
  videoId: string;
}

export const listings: Listing[] = [
  { slug: "inasaridze-7-80", deal: "sale", price: "$195 000", videoId: "Bogcf2fhVh0" },
  { slug: "inasaridze-7-82", deal: "sale", price: "$205 000", videoId: "Zu1AMrPwhD4" },
  { slug: "gorgasali-163", deal: "rent", price: "$1 400", videoId: "FnsXuk1jOAU" },
];
