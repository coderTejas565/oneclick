export function normalizeEmail(email: any) {
  const headers = email.payload?.headers || [];

  const getHeader = (name: string) =>
    headers.find((h: any) => h.name === name)?.value || "";

  // Gmail body extraction (basic safe version)
  let body = "";

  if (email.payload?.parts?.length) {
    const part = email.payload.parts.find(
      (p: any) => p.mimeType === "text/plain"
    );

    if (part?.body?.data) {
      body = Buffer.from(part.body.data, "base64").toString("utf-8");
    }
  }

  return {
    id: email.id,
    threadId: email.threadId,
    from: getHeader("From"),
    to: getHeader("To"),
    subject: getHeader("Subject"),
    date: getHeader("Date"),
    snippet: email.snippet,
    body,
    labelIds: email.labelIds || [],
  };
}