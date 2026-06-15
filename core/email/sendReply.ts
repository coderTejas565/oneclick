import { gmailClient } from "@/adapters/gmail/gmail.client";

export async function sendReply({
  messageId,
  threadId,
  to,
  subject,
  body,
}: {
  messageId: string;
  threadId: string;
  to: string;
  subject: string;
  body: string;
}) {
  return gmailClient.sendReply({
    messageId,
    threadId,
    to,
    subject,
    body,
  });
}