import { corsair } from "@/corsair";

export async function createCalendarEvent({
  title,
  start,
  end,
}: {
  title: string;
  start: string;
  end: string;
}) {
  return corsair.googlecalendar.api.events.create({
    event: {
      summary: title,

      start: {
        dateTime: start,
      },

      end: {
        dateTime: end,
      },
    },
  });
}