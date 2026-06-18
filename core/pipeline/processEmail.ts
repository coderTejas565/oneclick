import { corsair } from "@/corsair";
import { normalizeEmail } from "../email/normalize";
import { classifyEmail } from "../ai/classifyEmail";
import { cleanEmail } from "../email/cleanEmail";
import { EMAIL_STATUS } from "@/constants/email-status";

import { getConnection } from "@/db/repositories/integration.repository";

import {
  getEmailById,
  saveEmail,
} from "@/db/repositories/email.repository";

export async function processEmail(userId: string,emailId: string) {
  const tenant = corsair.withTenant(userId);

   const connection =
  await getConnection(
    userId,
    "gmail"
  );


 if(!connection?.connected){
   throw new Error(
    "Gmail not connected"
   );
 }
  try {
    // 1. DB FIRST (FAST PATH)
    const existingEmail = await getEmailById(
      userId,
      emailId
    );

    if (existingEmail) {
      return existingEmail;
    }

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
let analysis;

try {

 analysis =
  await classifyEmail(normalized);

} catch(err){

 console.error(
  "AI failed",
  emailId
 );

 analysis = {
   category:"unknown",
   priority:"low",
   summary:"AI unavailable",
   actionRequired:false
 };

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