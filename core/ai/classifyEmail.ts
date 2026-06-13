import { GoogleGenAI } from "@google/genai";
import { emailPrompt } from "./prompt";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function classifyEmail(email: {
  subject?: string;
  body?: string;
}) {
  try {
    const prompt = emailPrompt(
      email.subject ?? "",
      email.body ?? ""
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      throw new Error("Empty AI response");
    }

    return JSON.parse(text);

  } catch (error) {
    console.error("classifyEmail error:", error);

    throw new Error(
      "Failed to classify email"
    );
  }
}