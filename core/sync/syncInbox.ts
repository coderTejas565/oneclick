import { corsair } from "@/corsair";
import { processEmail } from "../pipeline/processEmail";

import {
  ensureSyncState,
  updateSyncState,
} from "@/db/repositories/sync.repository";

export async function syncInbox() {
  // Make sure sync_state row exists
  await ensureSyncState();

  await updateSyncState({
    status: "running",
  });

  try {
    const result =
      await corsair.gmail.api.messages.list({
        maxResults: 20,
      });

    const messages =
      result.messages ?? [];

    let processed = 0;

    for (const msg of messages) {
      if (!msg.id) continue;

      try {
        await processEmail(msg.id);
        processed++;
      } catch (err) {
        console.error(
          "Sync failed for:",
          msg.id,
          err
        );
      }
    }

    await updateSyncState({
      status: "idle",
      lastSyncedAt: new Date(),
      nextPageToken:
        result.nextPageToken ?? null,
    });

    return {
      success: true,
      processed,
    };
  } catch (error) {
    await updateSyncState({
      status: "failed",
      lastSyncedAt: new Date(),
    });

    throw error;
  }
}