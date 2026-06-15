import { corsair } from "@/corsair";
import { normalizeEmail } from "../email/normalize";
import { classifyEmail } from "../ai/classifyEmail";
import { cleanEmail } from "../email/cleanEmail";

import {
  getEmailById,
  saveEmail,
} from "@/db/repositories/email.repository";

export async function processEmail(emailId: string) {
  try {
    // 1. DB FIRST (FAST PATH)
    const existingEmail = await getEmailById(emailId);

    if (existingEmail) {
      return existingEmail;
    }

    // 2. FETCH FROM GMAIL (CORRECT CORSAIR USAGE)
    const rawEmail =
      await corsair.gmail.api.messages.get({
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
const savedEmail = await saveEmail({
  id: emailId,

  threadId: normalized.threadId,
  from: normalized.from,
  to: normalized.to,

  subject: normalized.subject,
  snippet: normalized.snippet,
  body: normalized.body,

  category: analysis.category,
  priority: analysis.priority,
  summary: analysis.summary,
  actionRequired: analysis.actionRequired,
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