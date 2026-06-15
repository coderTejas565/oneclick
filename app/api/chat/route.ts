import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { emails } from "@/db/email-schema";
import { eq, desc } from "drizzle-orm";

import { generateReply } from "@/core/ai/generateReply";
import { parseReply } from "@/core/ai/parseReply";

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

/**
 * Finds best email to act on
 */
async function findTargetEmail(message: string) {
  const text = message.toLowerCase();

  if (text.includes("recruiter")) {
    return db
      .select()
      .from(emails)
      .where(eq(emails.category, "recruitment"))
      .orderBy(desc(emails.processedAt))
      .limit(1);
  }

  return db
    .select()
    .from(emails)
    .where(eq(emails.actionRequired, true))
    .orderBy(desc(emails.processedAt))
    .limit(1);
}

/**
 * Routes intent → real action
 */
async function routeIntent(
  intent: Intent,
  message: string
) {
  switch (intent) {
    case "EMAIL_REPLY": {
      const email =
        (await findTargetEmail(message))?.[0];

      if (!email) {
        return {
          type: "EMAIL_REPLY",
          error: "No email found to reply to",
        };
      }

      const rawDraft =
        await generateReply(email);

      const draft =
        parseReply(rawDraft);

      return {
        type: "EMAIL_REPLY",
        email,
        draft,
        message: "Reply draft generated successfully",
      };
    }

    case "EMAIL_SUMMARY":
      return {
        type: "EMAIL_SUMMARY",
        message:
          "Summary flow ready (next step: AI summarizer)",
      };

    case "SCHEDULE_MEETING":
      return {
        type: "SCHEDULE_MEETING",
        message:
          "Calendar flow ready (next step: Google Calendar integration)",
      };

    case "MARK_DONE":
      return {
        type: "MARK_DONE",
        message:
          "Mark done flow ready (next step: DB update)",
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