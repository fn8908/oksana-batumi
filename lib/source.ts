// Откуда пришёл посетитель: запоминаем при заходе, отдаём вместе с заявкой
const KEY = "lead_source";

export function saveSource() {
  try {
    const p = new URLSearchParams(location.search);
    const ref = document.referrer ? new URL(document.referrer).hostname : "";
    const fromAd = ["gclid", "gbraid", "wbraid", "yclid", "fbclid", "utm_source"].some((k) => p.has(k));
    const external = ref && ref !== location.hostname;
    // Новый рекламный клик или внешний переход перезаписывают; внутренние переходы - нет
    if (!fromAd && !external && localStorage.getItem(KEY)) return;

    let src = "Прямой заход";
    if (p.has("gclid") || p.has("gbraid") || p.has("wbraid")) src = "Google Ads";
    else if (p.has("yclid")) src = "Яндекс Директ";
    else if (p.has("fbclid")) src = "Facebook/Instagram";
    else if (p.has("utm_source")) src = `utm: ${p.get("utm_source")}`;
    else if (external) src = `Переход с ${ref}`;

    const extra = ["utm_campaign", "utm_term"].map((k) => p.get(k)).filter(Boolean).join(" / ");
    if (extra) src += ` (${extra})`;

    const date = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tbilisi" });
    localStorage.setItem(KEY, `${src}\nСтраница входа: ${location.pathname}\nПервый заход: ${date}`);
  } catch {}
}

export function getSource() {
  try {
    return localStorage.getItem(KEY) || "";
  } catch {
    return "";
  }
}
