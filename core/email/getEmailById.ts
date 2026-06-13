import { corsair } from "@/corsair";

export async function getEmailById(id: string) {
  const email = await corsair.gmail.api.messages.get({
    id,
  });

  return email;
}