// app/api/test-calendar-create/route.ts

import { corsair } from "@/corsair";
import { NextResponse } from "next/server";

export async function GET() {
  const event =
    await corsair.googlecalendar.api.events.create({
      event: {
        summary: "OneClick Test Event",
        start: {
          dateTime: new Date(
            Date.now() + 60 * 60 * 1000
          ).toISOString(),
        },
        end: {
          dateTime: new Date(
            Date.now() + 2 * 60 * 60 * 1000
          ).toISOString(),
        },
      },
    });

  return NextResponse.json(event);
}