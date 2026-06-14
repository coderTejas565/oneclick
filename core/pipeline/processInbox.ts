import { corsair } from "@/corsair";
import { processEmail } from "./processEmail";

export async function processInbox() {
  const result = await corsair.gmail.api.messages.list({
    maxResults: 2,
  });

  const messages = result.messages ?? [];

  const processedEmails = [];

  for (const message of messages) {
    if (!message.id) continue;

    try {
      const processed = await processEmail(
        message.id
      );

    if (!processed?.email?.id) continue;

    if (!processed?.analysis) continue;
    
    processedEmails.push(processed);
    } catch (error) {
      console.error(
        `Failed processing ${message.id}`,
        error
      );
    }
  }

  return processedEmails;
}