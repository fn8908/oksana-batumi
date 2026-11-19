export const TG_URL = "https://t.me/ALazarev095";
export const IG_URL = "https://www.instagram.com/batumi_realty_org/";

// Ссылка в Telegram с готовым текстом сообщения
export function tgWithText(text: string): string {
  return TG_URL + "?text=" + encodeURIComponent(text);
}
