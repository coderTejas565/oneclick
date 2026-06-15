import { db } from "@/db/db";
import { emails } from "@/db/email-schema";
import { eq, desc } from "drizzle-orm";

export async function getEmailById(id: string) {
  const result = await db
    .select()
    .from(emails)
    .where(eq(emails.id, id));

  return result[0] ?? null;
}

export async function saveEmail(
  emailData: typeof emails.$inferInsert
) {
  const result = await db
    .insert(emails)
    .values(emailData)
    .returning();

  return result[0];
}

export async function getAllEmails() {
  return db
    .select()
    .from(emails)
    .orderBy(desc(emails.processedAt));
}