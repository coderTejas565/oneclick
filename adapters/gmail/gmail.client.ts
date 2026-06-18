import { getTenant } from "@/core/corsair/get-tenant"

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
    userId,
    messageId,
    threadId,
    to,
    subject,
    body,
  }: {
    userId: string;
    messageId?: string;
    threadId: string;
    to: string;
    subject: string;
    body: string;
  }) {

    const raw = buildRawEmail({
      to,
      subject,
      body,
    });

    const tenant =
      getTenant(userId);

    return tenant.gmail.api.messages.send({
      raw,
      threadId,
    });
  },
};