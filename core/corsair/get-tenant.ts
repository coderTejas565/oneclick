import { corsair } from "@/corsair";

export function getTenant(userId: string) {
  return corsair.withTenant(userId);
}