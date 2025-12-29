import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client with process.env.API_KEY directly as per SDK guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export class GeminiService {
  private model: string = "gemini-3-flash-preview";

  async getChatResponse(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
    // Using ai.models.generateContent to query GenAI with both model and prompt as required
    const response = await ai.models.generateContent({
      model: this.model,
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "You are ALZCARE AI, a specialized assistant for Alzheimer's patients and their caregivers. Your goal is to provide empathetic, evidence-based medical information regarding Alzheimer's disease, stages, treatments, and daily care tips. Always recommend consulting a neurologist for official diagnosis. Be professional yet compassionate.",
        temperature: 0.7,
      },
    });

    // Directly access the .text property from GenerateContentResponse
    return response.text || "I'm sorry, I'm having trouble generating a response right now.";
  }
}

export const geminiService = new GeminiService();