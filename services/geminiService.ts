import { GoogleGenAI, Type } from "@google/genai";
import { Video } from "../types";

// Initialize Gemini
// Note: In a real production app, we would proxy this through a backend.
// For this MVP demo, we use the env variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateSummary = async (video: Video): Promise<string> => {
  if (!process.env.API_KEY) return "AI service unavailable (Missing API Key)";
  
  try {
    const prompt = `
      Act as an expert educational content summarizer.
      Summarize the key learning points for a video titled "${video.title}" with the description: "${video.description}".
      Provide exactly 3 bullet points. Keep it concise (under 50 words total).
      Format the output as a simple string with bullet points.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return "Failed to generate summary. Please try again.";
  }
};

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export const generateQuiz = async (video: Video): Promise<QuizQuestion | null> => {
  if (!process.env.API_KEY) return null;

  try {
    const prompt = `
      Create a single multiple-choice quiz question based on this educational content:
      Title: ${video.title}
      Description: ${video.description}
      
      Return JSON only.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY,
              items: { type: Type.STRING } 
            },
            correctAnswerIndex: { type: Type.INTEGER }
          },
          required: ["question", "options", "correctAnswerIndex"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as QuizQuestion;
  } catch (error) {
    console.error("Gemini Quiz Error:", error);
    return null;
  }
};