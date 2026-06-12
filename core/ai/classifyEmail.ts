import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { EMAIL_CLASSIFICATION_PROMPT } from "./prompt";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function classifyEmail(emailText: string) {
  const prompt = EMAIL_CLASSIFICATION_PROMPT(emailText);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return JSON.parse(response.text || "{}");
}