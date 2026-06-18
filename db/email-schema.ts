import {
  pgTable,
  text,
  boolean,
  timestamp,
  index
} from "drizzle-orm/pg-core";

export const emails = pgTable("emails", {
  id: text("id").primaryKey(),

  userId:text("user_id").notNull(),

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
  
  replied: boolean("replied").default(false),

  repliedAt: timestamp("replied_at", {
    withTimezone: true,
  }),

  status: text("status").default("unread"),
  
  confidence: text("confidence"),

  processedAt: timestamp(
    "processed_at",
    {
      withTimezone: true,
    }
  ).defaultNow(),

},
(table) => ({
  userIdx: index("emails_user_idx")
    .on(table.userId),

  threadIdx: index("emails_thread_idx")
    .on(table.threadId),

  statusIdx: index("emails_status_idx")
    .on(table.status),
})
);