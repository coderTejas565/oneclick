export function normalizeEmail(email: any) {
  return {
    id: email.id,
    threadId: email.threadId,
    from: email.payload?.headers?.find((h: any) => h.name === "From")?.value || "",
    to: email.payload?.headers?.find((h: any) => h.name === "To")?.value || "",
    subject: email.payload?.headers?.find((h: any) => h.name === "Subject")?.value || "",
    snippet: email.snippet || "",
    body: extractBody(email),
    timestamp: email.internalDate,
  };
}

function extractBody(email: any) {
  const part = email.payload?.parts?.find((p: any) => p.mimeType === "text/plain");
  return Buffer.from(part?.body?.data || "", "base64").toString("utf-8");
}