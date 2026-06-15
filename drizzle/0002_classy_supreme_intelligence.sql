CREATE TABLE "sync_state" (
	"id" text PRIMARY KEY NOT NULL,
	"next_page_token" text,
	"status" text DEFAULT 'idle' NOT NULL,
	"last_synced_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
