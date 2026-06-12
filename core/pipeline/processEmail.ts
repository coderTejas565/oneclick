import { corsair } from "@/corsair";
import { normalizeEmail } from "../email/normalize";
import { classifyEmail } from "../ai/classifyEmail";

export async function processEmail(emailId: string) {
  try {
    const email = await corsair.gmail.api.messages.get({
      id: emailId,
    });

    if (!email) {
      throw new Error("Email not found");
    }

    const cleanEmail = normalizeEmail(email);

    const aiResult = await classifyEmail(cleanEmail);

    return {
      success: true,
      email: cleanEmail,
      analysis: aiResult,
    };
  } catch (error) {
    console.error("processEmail error:", error);

    return {
      success: false,
      error: String(error),
    };
  }
}