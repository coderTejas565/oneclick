export function parseReply(text: string) {
  const subjectMatch =
    text.match(/SUBJECT:\s*([\s\S]*?)BODY:/i);

  const bodyMatch =
    text.match(/BODY:\s*([\s\S]*)/i);

  return {
    subject: subjectMatch?.[1]?.trim() ?? "",
    body: bodyMatch?.[1]?.trim() ?? "",
  };
}