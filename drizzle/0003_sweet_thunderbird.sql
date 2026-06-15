ALTER TABLE "emails" ADD COLUMN "replied" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "emails" ADD COLUMN "replied_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "emails" ADD COLUMN "status" text DEFAULT 'unread';--> statement-breakpoint
ALTER TABLE "emails" ADD COLUMN "confidence" text;