import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not defined. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function getConsultation(prompt: string, systemInstruction?: string) {
  if (!apiKey) throw new Error("API Key missing");
  
  const defaultInstruction = "You are an expert Eco-Tourism consultant specializing in developing sustainable village tourism (Desa Wisata) in Indonesia. Your analysis should include SWOT analysis, SME (UMKM) opportunities, and sustainability strategies. Maintain a professional yet encouraging and local-culture-respecting tone.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: systemInstruction || defaultInstruction,
      }
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, terjadi kesalahan saat menghubungi AI Konsultan. Silakan coba lagi nanti.";
  }
}

export async function generateAIImage(prompt: string, context: 'promo' | 'consultancy' | 'waste' | 'mitigation' | 'hr') {
  if (!apiKey) throw new Error("API Key missing");

  const contextGuides = {
    promo: "Clean, modern, editorial travel poster. Include evocative natural scenery and local cultural markers.",
    consultancy: "Professional business landscape or architectural concept for a sustainable village. Minimalist and realistic.",
    waste: "Technical diagram or clean conceptual image of a circular economy process, recycling center, or eco-product.",
    mitigation: "Strategic geographic map or safety protocol infographic with clear terrain markers and safety icons.",
    hr: "Professional organizational chart concept or community workshop visualization in a green outdoor setting."
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ 
        role: 'user', 
        parts: [{ 
          text: `Generate a high-quality, professional ${context === 'promo' ? 'promotional' : 'conceptual'} image for an Indonesian Eco-Tourism Village. 
                 Topic: ${prompt}. 
                 Style: ${contextGuides[context]}. Professional layout, NO distorted text, realistic lighting.` 
        }] 
      }]
    });
    
    const candidate = response.candidates?.[0];
    const part = candidate?.content?.parts?.[0];
    
    if (part?.inlineData) {
      const { data, mimeType } = part.inlineData;
      return `data:${mimeType};base64,${data}`;
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
}
