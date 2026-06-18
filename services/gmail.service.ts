import { corsair } from "@/corsair";

export async function fetchEmails(
  userId: string
) {
  const tenant =
    corsair.withTenant(userId);

  return tenant.gmail.db.messages.list();
}