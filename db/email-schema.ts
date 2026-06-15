import {
  pgTable,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const emails = pgTable("emails", {
  id: text("id").primaryKey(),

  threadId: text("thread_id"),

  from: text("from").notNull(),

  to: text("to").notNull(),

  subject: text("subject"),

  body: text("body"),

  snippet: text("snippet"),

  category: text("category"),

  priority: text("priority"),

  summary: text("summary"),

  actionRequired: boolean(
    "action_required"
  ).default(false),

  processedAt: timestamp(
    "processed_at",
    {
      withTimezone: true,
    }
  ).defaultNow(),
});