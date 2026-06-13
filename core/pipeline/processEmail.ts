import { corsair } from "@/corsair";
import { getEmailById } from "../email/getEmailById";
import { normalizeEmail } from "../email/normalize";
import { classifyEmail } from "../ai/classifyEmail";
import { cleanEmail } from "../email/cleanEmail";

export async function processEmail(emailId: string) {
  try {
    const rawEmail = await getEmailById(emailId);

    if (!rawEmail) {
      throw new Error("Email not found");
    }

    const normalized = normalizeEmail(rawEmail);

    normalized.body = cleanEmail(normalized.body);

    if (!normalized?.body && !normalized?.subject) {
      throw new Error("Invalid normalized email");
    }

    const analysis = await classifyEmail(normalized);

    if (!analysis) {
      throw new Error("AI classification failed");
    }

    const result = {
      email: normalized,
      analysis,
      meta: {
        processedAt: new Date().toISOString(),
        emailId,
      },
    };

    return result;

  } catch (error) {
    console.error("processEmail error:", error);

    throw new Error(
      "Failed to process email: " + (error as Error).message
    );
  }
}