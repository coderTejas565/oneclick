import {
  pgTable,
  text,
  timestamp,
  boolean,
  unique,
} from "drizzle-orm/pg-core";

import { user } from "./auth-schema";


export const integrations =
pgTable(
  "integrations",
  {

    id:text("id")
      .primaryKey(),

    userId:text("user_id")
      .notNull()
      .references(()=>user.id),


    provider:text("provider")
      .notNull(),


    connected:boolean("connected")
      .default(false),


    createdAt:
      timestamp("created_at")
        .defaultNow(),


    updatedAt:
      timestamp("updated_at")
        .defaultNow(),

  },
  (table)=>({

    userProviderUnique:
      unique()
        .on(
          table.userId,
          table.provider
        )

  })
);