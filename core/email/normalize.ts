function getHeader(headers: any[], name: string) {
  return headers?.find(h => h.name === name)?.value || "";
}

function decodeBase64(data?: string) {
  if (!data) return "";

  return Buffer.from(data, "base64").toString("utf-8");
}

function extractBody(payload: any): string {
  if (!payload) return "";

  // Case 1: direct body
  if (payload.body?.data) {
    return decodeBase64(payload.body.data);
  }

  // Case 2: multipart
  const parts = payload.parts || [];

  const textPart =
    parts.find((p: any) => p.mimeType === "text/plain") ||
    parts.find((p: any) => p.mimeType === "text/html");

  if (textPart?.body?.data) {
    return decodeBase64(textPart.body.data);
  }

  // nested fallback (important for LinkedIn emails etc.)
  for (const part of parts) {
    if (part.parts) {
      const nested = extractBody(part);
      if (nested) return nested;
    }
  }

  return "";
}

export function normalizeEmail(email: any) {
  const headers = email.payload?.headers || [];

  const from = getHeader(headers, "From");
  const to = getHeader(headers, "To");
  const subject = getHeader(headers, "Subject");

  const body = extractBody(email.payload);

  return {
    id: email.id,
    threadId: email.threadId,
    from,
    to,
    subject,
    snippet: email.snippet || "",
    body,
    timestamp: email.internalDate,
  };
}