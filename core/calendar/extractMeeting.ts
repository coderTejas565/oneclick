import { generateText } from "@/core/ai/client";


export async function extractMeeting(
  email: {
    subject: string | null;
    body: string | null;
  }
) {

  const prompt = `

You are an AI scheduling assistant.

Analyze this email.

First decide if this email requires a meeting.

Return ONLY valid JSON.

Schema:

{
  "detected": true,
  "title": "",
  "date": "",
  "startTime": "",
  "endTime": ""
}


If there is NO meeting request:

{
  "detected": false,
  "title": "",
  "date": "",
  "startTime": "",
  "endTime": ""
}


EMAIL SUBJECT:

${email.subject}


EMAIL BODY:

${email.body}


Rules:

- detected=true only if email clearly asks for a meeting/call/interview/discussion.
- Extract meeting title.
- Convert dates to YYYY-MM-DD when possible.
- Convert time to 24 hour HH:mm.
- If end time missing, add 1 hour.
- Do not invent meeting details.

`;


  const response =
    await generateText(prompt);



  if (!response) {

    return {
      detected:false,
      title:"",
      date:"",
      startTime:"",
      endTime:"",
    };

  }



  const cleaned =
    response
      .replace(/```json/g,"")
      .replace(/```/g,"")
      .trim();



  try {

    return JSON.parse(cleaned);


  } catch(error){


    console.error(
      "MEETING JSON ERROR:",
      cleaned
    );


    return {
      detected:false,
      title:"",
      date:"",
      startTime:"",
      endTime:"",
      needsScheduling:true
    };

  }

}