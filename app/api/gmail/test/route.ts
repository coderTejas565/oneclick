import { NextResponse } from "next/server";
import { corsair } from "@/corsair";
import { processEmail } from "@/core/pipeline/processEmail";

export async function GET() {
  const result = await corsair.gmail.api.messages.list({
    maxResults: 10,
  });

  const first = result.messages?.[0];

  if (!first?.id) {
    return NextResponse.json({ success: false });
  }

  const processed = await processEmail(first.id);

  return NextResponse.json({
    success: true,
    data: processed,
  });
}