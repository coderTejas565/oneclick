import { gmailClient } from "@/adapters/gmail/gmail.client";


export async function sendReply(
  userId: string,
  {
    messageId,
    threadId,
    to,
    subject,
    body,
  }: {
    messageId?: string;
    threadId: string;
    to: string;
    subject: string;
    body: string;
  }
) {

  return gmailClient.sendReply({

    userId,

    messageId,

    threadId,

    to,

    subject,

    body,

  });

}