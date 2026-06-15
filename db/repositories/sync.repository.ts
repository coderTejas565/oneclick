import { db } from "@/db/db";
import { syncState } from "@/db/sync-state.schema";
import { eq } from "drizzle-orm";

const SYNC_ID = "gmail";

export async function getSyncState() {
  const result = await db
    .select()
    .from(syncState)
    .where(eq(syncState.id, SYNC_ID));

  return result[0] ?? null;
}

export async function createSyncState() {
  const result = await db
    .insert(syncState)
    .values({
      id: SYNC_ID,
      status: "idle",
    })
    .returning();

  return result[0];
}

export async function updateSyncState(
  data: Partial<
    typeof syncState.$inferInsert
  >
) {
  const result = await db
    .update(syncState)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(syncState.id, SYNC_ID))
    .returning();

  return result[0];
}


export async function ensureSyncState() {
  const existing =
    await getSyncState();

  if (existing) return existing;

  return createSyncState();
}