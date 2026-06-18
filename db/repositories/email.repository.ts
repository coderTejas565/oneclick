import { db } from "@/db/db";
import { emails } from "@/db/email-schema";
import { eq, desc,and } from "drizzle-orm";

export async function getEmailById(
  userId: string,
  emailId: string
) {
  const result = await db
    .select()
    .from(emails)
    .where(
      and(
        eq(emails.userId, userId),
        eq(emails.id, emailId)
      )
    );

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

export async function getAllEmails(
  userId: string
) {
  return db
    .select()
    .from(emails)
    .where(
      eq(
        emails.userId,
        userId
      )
    )
    .orderBy(
      desc(emails.processedAt)
    );
}