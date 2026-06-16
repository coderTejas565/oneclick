import { NextResponse } from "next/server";

import { createCalendarEvent } from "@/core/calendar/createEvent";

export async function POST(req: Request) {
  try {
    const {
      title,
      start,
      end,
    } = await req.json();

    const event =
      await createCalendarEvent({
        title,
        start,
        end,
      });

    return NextResponse.json({
      success: true,
      event,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}