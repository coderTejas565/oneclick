export function cleanEmail(body: string): string {
  return body
    .replace(/<[^>]+>/g, " ")

    .replace(/https?:\/\/\S+/gi, " ")

    .replace(/\S+@\S+\.\S+/g, " ")

    .replace(/\(\s*\)/g, " ")

    .replace(
      /unsubscribe|privacy terms|manage preferences|support|help center|about us|udemy business/gi,
      " "
    )

    .replace(/[A-Za-z0-9_-]{80,}/g, " ")

    .replace(/\s+/g, " ")

    .trim();
}