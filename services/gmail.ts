import { corsair } from "@/corsair"

export async function fetchEmails() {
  const emails = await corsair.gmail.db.messages.list();

  return emails;
}