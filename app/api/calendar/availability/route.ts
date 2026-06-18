import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { corsair } from "@/corsair";
import { auth } from "@/lib/auth";

function generateSlots(
  busy: any[],
  date: string
) {
  const slots = [];

  const startHour = 9;
  const endHour = 18;

  for (
    let hour = startHour;
    hour < endHour;
    hour++
  ) {
    const slotStart =
      new Date(
        `${date}T${String(hour).padStart(2, "0")}:00:00`
      );

    const slotEnd =
      new Date(
        `${date}T${String(hour + 1).padStart(2, "0")}:00:00`
      );

    const conflict =
      busy.some((item) => {
        const busyStart =
          new Date(item.start);

        const busyEnd =
          new Date(item.end);

        return (
          slotStart < busyEnd &&
          slotEnd > busyStart
        );
      });

    if (!conflict) {
      slots.push({
        start:
          `${String(hour).padStart(2, "0")}:00`,
        end:
          `${String(hour + 1).padStart(2, "0")}:00`,
      });
    }
  }

  return slots;
}

export async function POST(
  req: Request
) {
  try {

const session =
 await auth.api.getSession({
   headers: await headers()
 });
   
 if(!session){

 return NextResponse.json(
  {
   error:"Unauthorized"
  },
  {
   status:401
  }
 );

}

const userId =
 session.user.id;



// ✅ tenant = logged in user

const tenant =
 corsair.withTenant(userId);

    const { date } =
      await req.json();

    if (!date) {
      return NextResponse.json(
        {
          error: "Date required",
        },
        {
          status: 400,
        }
      );
    }

    const timeMin =
      new Date(
        `${date}T00:00:00`
      ).toISOString();

    const timeMax =
      new Date(
        `${date}T23:59:59`
      ).toISOString();

    const availability =
      await tenant.googlecalendar
        .api.calendar.getAvailability({
          timeMin,
          timeMax,
          timeZone:
            "Asia/Kolkata",
        });

    const busy =
      availability.calendars
        ?.primary?.busy ?? [];

    const slots =
      generateSlots(
        busy,
        date
      );

    return NextResponse.json({
      success: true,
      slots,
    });

  } catch (error) {

    console.error(
      "availability error",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed availability",
      },
      {
        status: 500,
      }
    );
  }
}