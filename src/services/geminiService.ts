import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not defined. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function getConsultation(prompt: string) {
  if (!apiKey) throw new Error("API Key missing");
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert Eco-Tourism consultant specializing in developing sustainable village tourism (Desa Wisata) in Indonesia. Your analysis should include SWOT analysis, SME (UMKM) opportunities, and sustainability strategies. Maintain a professional yet encouraging and local-culture-respecting tone.",
      }
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, terjadi kesalahan saat menghubungi AI Konsultan. Silakan coba lagi nanti.";
  }
}
