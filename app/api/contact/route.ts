import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, contact, budget, rooms, rental_type, districts, comment, property_type, district, price } = body;

  console.log("[Contact Form Submission]", {
    name,
    contact,
    budget,
    rooms,
    rental_type,
    districts,
    comment,
    property_type,
    district,
    price,
    timestamp: new Date().toISOString(),
  });

  // TODO: интеграция с Telegram Bot API
  // TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID берутся из .env
  // const botToken = process.env.TELEGRAM_BOT_TOKEN;
  // const chatId = process.env.TELEGRAM_CHAT_ID;
  // const message = `...`;
  // await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
  // });

  return NextResponse.json({ success: true, message: "Application received" });
}
