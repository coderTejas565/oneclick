import { corsair } from "@/corsair";
import { normalizeEmail } from "../email/normalize";
import { classifyEmail } from "../ai/classifyEmail";
import { cleanEmail } from "../email/cleanEmail";
import { EMAIL_STATUS } from "@/constants/email-status";

import {
  getEmailById,
  saveEmail,
} from "@/db/repositories/email.repository";

export async function processEmail(userId: string,emailId: string) {
  try {
    // 1. DB FIRST (FAST PATH)
    const existingEmail = await getEmailById(
      userId,
      emailId
    );

    if (existingEmail) {
      return existingEmail;
    }

    const tenant =
    corsair.withTenant(userId);
    // 2. FETCH FROM GMAIL (CORRECT CORSAIR USAGE)
    const rawEmail =
      await tenant.gmail.api.messages.get({
        id: emailId,
      });

    if (!rawEmail) {
      throw new Error("Email not found in Gmail");
    }

    // 3. NORMALIZE
    const normalized = normalizeEmail(rawEmail);

    // 4. CLEAN BODY
    normalized.body = cleanEmail(normalized.body);

    if (!normalized?.body && !normalized?.subject) {
      throw new Error("Invalid normalized email");
    }

    // 5. AI CLASSIFICATION
    const analysis = await classifyEmail(normalized);

    if (!analysis) {
      throw new Error("AI classification failed");
    }

    // 6. SAVE TO DB (NO gmailId — USE id ONLY)
const savedEmail =
await saveEmail({

  userId,

  id: emailId,

  threadId:
    normalized.threadId,

  from:
    normalized.from,

  to:
    normalized.to,

  subject:
    normalized.subject,

  snippet:
    normalized.snippet,

  body:
    normalized.body,

  category:
    analysis.category,

  priority:
    analysis.priority,

  summary:
    analysis.summary,

  actionRequired:
    analysis.actionRequired,

  status:
    analysis.actionRequired
      ? EMAIL_STATUS.PENDING
      : EMAIL_STATUS.DONE,
});

    return savedEmail;
  } catch (error) {
    console.error("processEmail error:", error);

    throw new Error(
      "Failed to process email: " +
        (error as Error).message
    );
  }
}