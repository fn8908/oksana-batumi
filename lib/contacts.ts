export const TG_URL = "https://t.me/ALazarev095";

// Ссылка в Telegram с готовым текстом сообщения
export function tgWithText(text: string): string {
  return TG_URL + "?text=" + encodeURIComponent(text);
}
