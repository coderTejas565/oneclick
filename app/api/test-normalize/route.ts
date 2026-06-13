import { NextResponse } from "next/server";
import { corsair } from "@/corsair";
import { normalizeEmail } from "@/core/email/normalize";

export async function GET() {
  try {
    const result = await corsair.gmail.api.messages.list({
      maxResults: 10,
    });

    const messages = result.messages ?? [];

    const first = messages[0];

    if (!first?.id) {
      return NextResponse.json({
        success: false,
        error: "Invalid message id",
      });
    }

    const fullEmail = await corsair.gmail.api.messages.get({
      id: first.id,
    });

    const normalized = normalizeEmail(fullEmail);

    return NextResponse.json({
      success: true,
      normalized,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}