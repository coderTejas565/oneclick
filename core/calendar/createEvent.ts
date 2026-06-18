import { corsair } from "@/corsair";


export async function createCalendarEvent(
  userId: string,
  {
    title,
    start,
    end,
  }: {
    title: string;
    start: string;
    end: string;
  }
) {


  const tenant =
    corsair.withTenant(userId);



  return tenant.googlecalendar.api.events.create({
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