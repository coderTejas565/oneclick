import { NextResponse } from "next/server";
import { processInbox } from "@/core/pipeline/processInbox";

export async function GET() {
  try {
    const emails = await processInbox();

    return NextResponse.json({
      success: true,
      count: emails.length,
      emails,
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