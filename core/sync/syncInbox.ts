import { corsair } from "@/corsair";
import { processEmail } from "../pipeline/processEmail";

export async function syncInbox() {
  const result = await corsair.gmail.api.messages.list({
    maxResults: 10,
  });

  const messages = result.messages ?? [];

  let processed = 0;

  for (const msg of messages) {
    if (!msg.id) continue;

    try {
      await processEmail(msg.id);
      processed++;
    } catch (err) {
      console.error("Sync failed for:", msg.id, err);
    }
  }

  return {
    success: true,
    processed,
  };
}