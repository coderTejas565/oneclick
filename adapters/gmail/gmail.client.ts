import { corsair } from "@/corsair";

function buildRawEmail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  const email = [
    `To: ${to}`,
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    "",
    body,
  ].join("\n");

  return Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export const gmailClient = {
  async sendReply({
    messageId,
    threadId,
    to,
    subject,
    body,
  }: any) {
    const raw = buildRawEmail({
      to,
      subject,
      body,
    });

    return corsair.gmail.api.messages.send({
      raw,
      threadId,
    });
  },
};