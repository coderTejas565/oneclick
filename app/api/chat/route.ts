import { NextResponse } from "next/server";

type Intent =
  | "EMAIL_REPLY"
  | "EMAIL_SUMMARY"
  | "SCHEDULE_MEETING"
  | "MARK_DONE"
  | "UNKNOWN";

function detectIntent(message: string): Intent {
  const text = message.toLowerCase();

  if (
    text.includes("reply") ||
    text.includes("respond")
  ) {
    return "EMAIL_REPLY";
  }

  if (
    text.includes("summary") ||
    text.includes("summarize")
  ) {
    return "EMAIL_SUMMARY";
  }

  if (
    text.includes("schedule") ||
    text.includes("meeting") ||
    text.includes("calendar")
  ) {
    return "SCHEDULE_MEETING";
  }

  if (
    text.includes("done") ||
    text.includes("complete")
  ) {
    return "MARK_DONE";
  }

  return "UNKNOWN";
}

async function routeIntent(
  intent: Intent,
  message: string
) {
  switch (intent) {
    case "EMAIL_REPLY":
      return {
        type: "EMAIL_REPLY",
        message:
          "Reply flow triggered (next step: email selection + AI draft generation)",
      };

    case "EMAIL_SUMMARY":
      return {
        type: "EMAIL_SUMMARY",
        message:
          "Summary flow triggered (next step: fetch email + AI summary)",
      };

    case "SCHEDULE_MEETING":
      return {
        type: "SCHEDULE_MEETING",
        message:
          "Calendar flow triggered (next step: Google Calendar integration)",
      };

    case "MARK_DONE":
      return {
        type: "MARK_DONE",
        message:
          "Mark done flow triggered (next step: DB update)",
      };

    default:
      return {
        type: "UNKNOWN",
        message:
          "Try: reply, summarize, schedule, or mark done",
      };
  }
}

export async function POST(req: Request) {
  const { message } = await req.json();

  const intent = detectIntent(message);

  console.log("USER MESSAGE:", message);
  console.log("INTENT:", intent);

  const result = await routeIntent(intent, message);

  return NextResponse.json({
    success: true,
    intent,
    result,
  });
}