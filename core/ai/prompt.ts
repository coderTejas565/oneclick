export const emailPrompt = (email: string) => `
You are an email classification engine.

Your job:
Convert raw email text into a structured JSON object.

---

INPUT:
${email}

---

OUTPUT FORMAT (STRICT JSON ONLY):

{
  "summary": "",
  "category": "",
  "priority": "",
  "actionRequired": true,
  "actions": [],
  "participants": [],
  "suggestedActions": [],
  "confidence": 0.0
}

RULES:
- Output ONLY JSON
- No markdown
- No explanation
`;