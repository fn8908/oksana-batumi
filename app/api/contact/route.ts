import { NextRequest, NextResponse } from "next/server";

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  apartment: "Квартира",
  house: "Дом",
  villa: "Вилла",
};

const RENTAL_TYPE_LABELS: Record<string, string> = {
  long: "Долгосрочная",
  short: "Посуточная",
  invest: "Инвестиция",
};

async function sendTelegramMessage(text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set");
    return;
  }

  const res = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("[Telegram] Failed to send message:", err);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    name,
    contact,
    budget,
    rooms,
    deal_type,
    rental_type,
    property_type,
    districts,
    comment,
    district,
    price,
    desired_price,
    property_type: modalPropertyType,
    lang,
  } = body;

  const timestamp = new Date().toLocaleString("ru-RU", {
    timeZone: "Asia/Tbilisi",
  });

  const isQuickSearch = body.source === "quick_search";

  // Build Telegram message
  let message = isQuickSearch
    ? `🔍 <b>Быстрый поиск — Batumi Realty</b>\n`
    : `🏠 <b>Новая заявка — Batumi Realty</b>\n`;
  message += `━━━━━━━━━━━━━━━\n`;
  message += `🕐 <i>${timestamp} (GMT+4)</i>\n\n`;

  if (name) message += `👤 <b>Имя:</b> ${name}\n`;
  if (contact) {
    message += `📱 <b>Контакт:</b> <code>${contact.trim()}</code>\n`;
  }

  if (property_type || modalPropertyType) {
    const pt = property_type ?? modalPropertyType;
    message += `🏡 <b>Тип недвижимости:</b> ${PROPERTY_TYPE_LABELS[pt] ?? pt}\n`;
  }

  if (district || price) {
    // Modal submission (quick property enquiry)
    if (district) message += `📍 <b>Район:</b> ${district}\n`;
    if (price) message += `💰 <b>Цена:</b> ${price}/мес\n`;
  } else {
    // Full form submission
    if (deal_type) message += `🎯 <b>Тип сделки:</b> ${deal_type === "buy" ? "Покупка" : "Аренда"}\n`;
    if (rental_type)
      message += `📋 <b>Тип аренды:</b> ${RENTAL_TYPE_LABELS[rental_type] ?? rental_type}\n`;
    if (rooms) message += `🚪 <b>Комнат:</b> ${rooms}\n`;
    if (budget) {
      if (deal_type === "buy") {
        message += `💰 <b>Бюджет:</b> $${Number(budget).toLocaleString("ru-RU")}\n`;
      } else {
        message += `💰 <b>Бюджет:</b> $${budget}/мес\n`;
      }
    }
    if (desired_price) message += `💎 <b>Желаемая цена:</b> ${desired_price}\n`;
    if (districts?.length)
      message += `📍 <b>Районы:</b> ${districts.join(", ")}\n`;
  }

  if (comment) message += `\n💬 <b>Комментарий:</b> ${comment}\n`;
  if (lang) message += `\n🌐 <b>Язык:</b> ${lang.toUpperCase()}\n`;

  message += `\n━━━━━━━━━━━━━━━\n`;
  message += `<a href="https://t.me/ALazarev095">@ALazarev095</a>`;

  console.log("[Contact Form Submission]", {
    name,
    contact,
    budget,
    rooms,
    rental_type,
    property_type,
    districts,
    comment,
    timestamp,
  });

  try {
    await sendTelegramMessage(message);
  } catch (err) {
    console.error("[Telegram] Error:", err);
  }

  return NextResponse.json({ success: true, message: "Application received" });
}
