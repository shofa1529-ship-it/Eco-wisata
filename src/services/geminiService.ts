import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not defined. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function getConsultation(prompt: string, systemInstruction?: string) {
  const defaultInstruction = "You are an expert Eco-Tourism consultant specializing in developing sustainable village tourism (Desa Wisata) in Indonesia. Your analysis should include SWOT analysis, SME (UMKM) opportunities, and sustainability strategies. Maintain a professional yet encouraging and local-culture-respecting tone.";

  try {
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined.");
      return "Konfigurasi AI belum lengkap (API Key tidak ditemukan). Hubungi admin.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: systemInstruction || defaultInstruction,
      }
    });
    
    // Defensive extraction
    if (response && response.text) {
      return response.text.trim();
    }
    
    if (response && response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0].content?.parts;
      if (parts && parts.length > 0) {
        return parts.map(p => p.text).filter(Boolean).join('\n') || "Thinking deeply...";
      }
    }
    
    return "Maaf, sistem AI kami sedang tidak memberikan respon tekstual. Mohon coba detailkan lagi deskripsi Anda.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, terjadi kesalahan saat menghubungi AI Konsultan. Silakan coba lagi nanti.";
  }
}

export async function generateAIImage(prompt: string, context: 'promo' | 'consultancy' | 'waste' | 'mitigation' | 'hr') {
  const contextGuides = {
    promo: "Clean, modern, editorial travel poster. Include evocative natural scenery and local cultural markers.",
    consultancy: "Professional business landscape or architectural concept for a sustainable village. Minimalist and realistic.",
    waste: "Technical diagram or clean conceptual image of a circular economy process, recycling center, or eco-product.",
    mitigation: "Strategic geographic map or safety protocol infographic with clear terrain markers and safety icons.",
    hr: "Professional organizational chart concept or community workshop visualization in a green outdoor setting."
  };

  try {
    if (!apiKey) {
      return null;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [{ role: 'user', parts: [{ text: `Generate a high-quality, professional ${context === 'promo' ? 'promotional' : 'conceptual'} image for an Indonesian Eco-Tourism Village. 
                 Topic: ${prompt}. 
                 Style: ${contextGuides[context]}. Professional layout, NO distorted text, realistic lighting.` }] }]
    });
    
    const candidates = response.candidates;
    if (candidates && candidates.length > 0 && candidates[0].content && candidates[0].content.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const { data, mimeType } = part.inlineData;
          // Standardize to image/png if mimeType is missing as per common base64 usage
          return `data:${mimeType || 'image/png'};base64,${data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
}
