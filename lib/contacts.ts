export const TG_URL = "https://t.me/ALazarev095";
export const IG_URL = "https://www.instagram.com/batumi_realty_org/";

// Ссылка в Telegram с готовым текстом сообщения
export function tgWithText(text: string): string {
  return TG_URL + "?text=" + encodeURIComponent(text);
}

export const PHONE = "+995 511 53 65 04";
export const PHONE_HREF = "tel:+995511536504";
export const WA_URL = "https://wa.me/995511536504";

// Ссылка в WhatsApp с готовым текстом сообщения
export function waWithText(text: string): string {
  return WA_URL + "?text=" + encodeURIComponent(text);
}
