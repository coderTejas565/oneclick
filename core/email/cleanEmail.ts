export function cleanEmail(body: string): string {
  return body
    // Remove HTML tags
    .replace(/<[^>]+>/g, " ")

    // Remove URLs
    .replace(/https?:\/\/\S+/gi, " ")

    // Remove email addresses
    .replace(/\S+@\S+\.\S+/g, " ")

    // Remove empty brackets
    .replace(/\(\s*\)/g, " ")

    // Decode common HTML entities
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")

    // Remove huge tracking tokens / encoded strings
    .replace(/[A-Za-z0-9_-]{80,}/g, " ")

    // Remove common footer noise
    .replace(
      /unsubscribe|privacy terms|manage preferences|support|help center|about us|terms of use|cookie policy|all rights reserved/gi,
      " "
    )

    // Remove repeated separators
    .replace(/[-_=]{3,}/g, " ")

    // Remove excessive whitespace
    .replace(/\s+/g, " ")

    .trim()

    // Prevent sending massive newsletters to llm
    .slice(0, 5000);
}