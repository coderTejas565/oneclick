import { NextResponse } from "next/server";
import { processEmail } from "@/core/pipeline/processEmail";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const email = await processEmail(id);

    return NextResponse.json({
      success: true,
      email,
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