import { fetchEmails } from "@/services/gmail.service";
import { normalizeEmail } from "@/core/email/normalize";
import { classifyEmail } from "@/core/ai/classifyEmail";

export async function processEmails() {
  const emails = await fetchEmails();

  const results = [];

  for (const email of emails) {
    const normalized = normalizeEmail(email);

    const emailText = `
Subject: ${normalized.subject}
From: ${normalized.from}
To: ${normalized.to}
Snippet: ${normalized.snippet}
Body: ${normalized.body}
    `.trim();

    const classified = await classifyEmail(emailText);

    results.push({
      ...normalized,
      classification: classified,
    });
  }

  return results;
}