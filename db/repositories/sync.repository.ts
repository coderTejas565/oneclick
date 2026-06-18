import { db } from "@/db/db";
import { syncState } from "@/db/sync-state.schema";
import { eq } from "drizzle-orm";


export async function getSyncState(
  userId: string
) {
  const result = await db
    .select()
    .from(syncState)
    .where(
      eq(
        syncState.userId,
        userId
      )
    );

  return result[0] ?? null;
}

export async function createSyncState(
  userId: string
) {
  const result = await db
    .insert(syncState)
    .values({
      id: crypto.randomUUID(),
      userId,
      status: "idle",
    })
    .returning();

  return result[0];
}

export async function updateSyncState(
  userId: string,
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
    .where(
      eq(
        syncState.userId,
        userId
      )
    )
    .returning();

  return result[0];
}


export async function ensureSyncState(
  userId: string
) {
  const existing =
    await getSyncState(userId);

  if (existing) {
    return existing;
  }

  return createSyncState(userId);
}