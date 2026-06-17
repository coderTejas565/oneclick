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
  | "EMAIL_SEARCH"
  | "UNKNOWN";

  

function detectIntent(message:string):Intent {

const text = message.toLowerCase();


if(
[
"reply",
"respond",
"answer",
"write back"
].some(x=>text.includes(x))
)
return "EMAIL_REPLY";

if (
  [
    "find",
    "search",
    "show",
    "look for",
  ].some((x) => text.includes(x))
) {
  return "EMAIL_SEARCH";
}


if(
[
"summary",
"summarize",
"what does this say"
].some(x=>text.includes(x))
)
return "EMAIL_SUMMARY";


if(
[
"schedule",
"book",
"meeting",
"calendar"
].some(x=>text.includes(x))
)
return "SCHEDULE_MEETING";


if(
[
"done",
"complete",
"finish"
].some(x=>text.includes(x))
)
return "MARK_DONE";


return "UNKNOWN";

}

/**
 * Finds best email to act on
 */
async function findTargetEmail(
  message: string
) {
  const text = message.toLowerCase();

  const allEmails = await db
    .select()
    .from(emails)
    .orderBy(desc(emails.processedAt));

  const recruiter = allEmails.find(
    (e) =>
      e.category?.toLowerCase() ===
      "recruitment"
  );

  if (
    recruiter &&
    text.includes("recruit")
  ) {
    return recruiter;
  }

  const interview = allEmails.find(
    (e) =>
      e.subject
        ?.toLowerCase()
        .includes("interview")
  );

  if (
    interview &&
    text.includes("interview")
  ) {
    return interview;
  }

  return allEmails.find(
    (e) => e.actionRequired
  );
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
        await findTargetEmail(message);

      if (!email) {
        return {
          type: "EMAIL_REPLY",
          error:
            "No email found to reply to",
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
        message:
          "Reply draft generated successfully",
      };
    }

    case "EMAIL_SUMMARY": {
      const email =
        await findTargetEmail(message);

      if (!email) {
        return {
          type: "EMAIL_SUMMARY",
          error: "No email found",
        };
      }

      return {
        type: "EMAIL_SUMMARY",
        email,
        summary: email.summary,
        message: "Summary generated",
      };
    }

    case "SCHEDULE_MEETING": {
      const email =
        await findTargetEmail(message);

      if (!email) {
        return {
          type: "SCHEDULE_MEETING",
          error:
            "No meeting related email found",
        };
      }

      return {
        type: "SCHEDULE_MEETING",
        email,
        message:
          `Found "${email.subject}"`,
      };
    }

    case "MARK_DONE": {
      const email =
        await findTargetEmail(message);

      if (!email) {
        return {
          type: "MARK_DONE",
          error: "No email found",
        };
      }

      await db
        .update(emails)
        .set({
          actionRequired: false,
          status: "done",
        })
        .where(
          eq(emails.id, email.id)
        );

      return {
        type: "MARK_DONE",
        email,
        message:
          "Email marked as done",
      };
    }

    case "EMAIL_SEARCH": {
      const email =
        await findTargetEmail(message);

      if (!email) {
        return {
          type: "EMAIL_SEARCH",
          error:
            "No matching email found",
        };
      }

      return {
        type: "EMAIL_SEARCH",
        email,
        message:
          `Found "${email.subject}"`,
      };
    }

    default:
      return {
        type: "UNKNOWN",
        message:
          "Try: reply, summarize, schedule, search or mark done",
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