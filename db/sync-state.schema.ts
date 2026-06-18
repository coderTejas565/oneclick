import {
  pgTable,
  text,
  timestamp,
  index,
  unique
} from "drizzle-orm/pg-core";


export const syncState = pgTable(
  "sync_state",
  {

    id: text("id")
      .primaryKey(),


    userId: text("user_id")
      .notNull(),


    nextPageToken: text(
      "next_page_token"
    ),


    status: text("status")
      .notNull()
      .default("idle"),


    lastSyncedAt: timestamp(
      "last_synced_at",
      {
        withTimezone:true,
      }
    ),


    createdAt: timestamp(
      "created_at",
      {
        withTimezone:true,
      }
    )
    .defaultNow(),


    updatedAt: timestamp(
      "updated_at",
      {
        withTimezone:true,
      }
    )
    .defaultNow(),

  },


  (table)=>({

    userIdx:
      index(
        "sync_user_idx"
      )
      .on(table.userId),


    userUnique:
      unique(
        "sync_user_unique"
      )
      .on(table.userId),

  })
);