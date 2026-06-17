import { NextResponse } from "next/server";

import { corsair } from "@/corsair";

export async function GET() {
  try {
    const now = new Date();

    const next30Days = new Date();

    next30Days.setDate(
      next30Days.getDate() + 30
    );

    const events =
      await corsair.googlecalendar.api.events.getMany({
        timeMin: now.toISOString(),
        timeMax: next30Days.toISOString(),
        singleEvents: true,
      });

    console.log("EVENTS", events);

    return NextResponse.json({
      success: true,
      events,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}