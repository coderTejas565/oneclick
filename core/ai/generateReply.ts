import { generateText } from "@/core/ai/client";

export async function generateReply(email: any) {
  const prompt = `
You are an AI email assistant.

Write a professional email reply to the email below.

Original Email:

From: ${email.from}

Subject: ${email.subject}

Body:
${email.body}

Requirements:
- Be concise
- Be professional
- Respond directly to the sender's request
- Do NOT generate a subject line
- Return ONLY the email body text
`;

  const result = await generateText(prompt);

  if (!result) {
    throw new Error(
      "AI failed to generate reply"
    );
  }

  console.log(
    "Generated Reply:",
    result
  );

  return result.trim();
}