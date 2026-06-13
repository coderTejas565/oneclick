import { NextResponse } from "next/server";
import { corsair } from "@/corsair";
import { processEmail } from "@/core/pipeline/processEmail";

export async function GET() {
  try {
    const response = await corsair.gmail.api.messages.list({
      maxResults: 1,
    });

    const first = response.messages?.[0];

    if (!first?.id) {
      return NextResponse.json({
        success: false,
        error: "No emails found",
      });
    }

    const result = await processEmail(first.id);

    return NextResponse.json({
      success: true,
      result,
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