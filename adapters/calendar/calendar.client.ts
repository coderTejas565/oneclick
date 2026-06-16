import { corsair } from "@/corsair";

export const calendarClient = {
  async createEvent({
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
  },
};