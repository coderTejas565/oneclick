import { generateText } from "@/core/ai/client";

export async function generateReply(email: any) {
  const prompt = `
You are an AI assistant writing email replies.

EMAIL:
From: ${email.from}
Subject: ${email.subject}
Body: ${email.body}

Write a short professional reply.

FORMAT STRICTLY:
SUBJECT:
<subject>

BODY:
<body>
`;

  const result = await generateText(prompt);

  if (!result) {
    throw new Error("AI failed to generate reply");
  }

  return result;
}