import {
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const syncState = pgTable(
  "sync_state",
  {
    id: text("id").primaryKey(),

    nextPageToken: text(
      "next_page_token"
    ),

    status: text("status")
      .notNull()
      .default("idle"),

    lastSyncedAt: timestamp(
      "last_synced_at",
      {
        withTimezone: true,
      }
    ),

    createdAt: timestamp(
      "created_at",
      {
        withTimezone: true,
      }
    ).defaultNow(),

    updatedAt: timestamp(
      "updated_at",
      {
        withTimezone: true,
      }
    ).defaultNow(),
  }
);