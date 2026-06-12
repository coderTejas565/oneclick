export function normalizeEmails(emails: any[]) {
  return emails.map((email) => ({
    id: email.id,
    from: email.from || email.sender,
    subject: email.subject,
    body: email.body || email.snippet,
    receivedAt: email.date,
  }));
}