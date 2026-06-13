export const emailPrompt = (
subject: string,
body: string
) => `
You are an AI email analysis engine.

Your job is to understand an email and return structured JSON.

SUBJECT:
${subject}

BODY:
${body}

---

Classify the email into exactly one category:

* Hiring
* Fundraising
* Customer
* Partnership
* Finance
* Newsletter
* Personal
* Other

---

Assign exactly one priority:

* High
* Medium
* Low

Priority Guidelines:

High:

* Interviews
* Investors
* Customer issues
* Payment deadlines
* Time-sensitive business requests

Medium:

* Follow ups
* Business conversations
* Collaboration discussions

Low:

* Newsletters
* Promotions
* Product updates
* Educational content

---

Determine whether the user must take action.

actionRequired:

true  = recipient must do something
false = informational only

---

Valid action types:

* schedule_meeting
* reply_email
* create_reminder
* review_document
* pay_invoice
* none

---

ACTION EXTRACTION RULES

Only create actions when the email explicitly requires action.

Do NOT create actions for:

* marketing links
* unsubscribe links
* download app links
* social media links
* promotional buttons
* informational newsletters

Newsletter emails should usually return:

"actionRequired": false

and

{
"type": "none"
}

unless the email contains a genuine task or deadline.

---

Return STRICT JSON:

{
"summary": "",
"category": "",
"priority": "",
"actionRequired": true,
"actions": [
{
"type": "",
"title": "",
"details": ""
}
],
"participants": [],
"suggestedActions": [],
"confidence": 0.0
}

---

Rules:

* Return ONLY JSON
* No markdown
* No explanations
* Summary max 2 sentences
* Confidence between 0 and 1
* If no action exists, return exactly one action:

{
"type": "none",
"title": "No action required",
"details": ""
}

Generate JSON now.
`;
