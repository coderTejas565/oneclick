CREATE TABLE "emails" (
	"id" text PRIMARY KEY NOT NULL,
	"thread_id" text,
	"from" text NOT NULL,
	"to" text NOT NULL,
	"subject" text,
	"body" text,
	"snippet" text,
	"category" text,
	"priority" text,
	"summary" text,
	"action_required" boolean DEFAULT false,
	"processed_at" timestamp with time zone DEFAULT now()
);
