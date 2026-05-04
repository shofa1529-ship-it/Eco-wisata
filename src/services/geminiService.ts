import { GoogleGenAI } from "@google/genai";

// Initialize AI
// AI Studio injects this key into the environment
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const defaultSystemInstruction = `Anda adalah Arsitek Desa Wisata Digital & Konsultan Ekonomi Berkelanjutan kelas dunia. 
Tugas Anda adalah menganalisis potensi sebuah desa di Indonesia secara mendalam dan dinamis.

Setiap analisis WAJIB mencakup:
1. ANALISIS POTENSI UNIK: Identifikasi aset alam (landscape, flora/fauna), budaya (adat, kuliner, seni), dan manusia.
2. STRATEGI SWOR (Strengths, Weaknesses, Opportunities, Resilience): Analisis mendalam tentang ketahanan desa.
3. EKOSISTEM UMKM: Inovasi produk lokal yang bisa dikemas secara premium (Rebranding kearifan lokal).
4. ROADMAP DIGITAL: Bagaimana desa tersebut bisa "Go Global" menggunakan teknologi.
5. INTEGRASI EKOLOGI: Cara menjaga kelestarian alam sambil meningkatkan profitabilitas.

Gunakan gaya bahasa yang inspiratif, inovatif, dan penuh hormat terhadap kearifan lokal. Gunakan Markdown untuk format yang cantik.`;

export async function getConsultation(prompt: string, systemInstruction?: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || defaultSystemInstruction,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("AI tidak memberikan respon teks. Mohon coba berikan detail desa yang lebih lengkap.");
    }

    return text.trim();
    
  } catch (error: any) {
    console.error("Consultation Error:", error);
    
    // Check for common permission/API key errors
    if (error.message?.includes("API key") || error.message?.includes("not found")) {
      throw new Error("API Key Gemini tidak terdeteksi. Silakan hubungi admin untuk konfigurasi Secrets.");
    }
    
    if (error.message?.includes("quota") || error.code === 429) {
      throw new Error("Batas penggunaan AI (Quota) telah tercapai. Silakan coba lagi beberapa saat lagi.");
    }
    
    throw new Error(error.message || "Terjadi kendala teknis saat menghubungi sistem AI.");
  }
}

export async function generateAIImage(prompt: string, context: 'promo' | 'consultancy' | 'waste' | 'mitigation' | 'hr') {
  const contextGuides = {
    promo: "Indonesian sustainable tourism village, luxury eco-resort, cinematic aerial view, lush greenery, cultural architecture, 8k resolution.",
    consultancy: "Architectural blueprint or realistic concept art of a sustainable Indonesian village, organic materials, bamboo structures, solar panels hidden in nature.",
    waste: "Zero waste facility concept in a forest, circular economy illustration, organic composting center, clean and futuristic but natural.",
    mitigation: "Safety map or disaster resilient village design, evacuation route visualization in a tropical landscape, professional infographic style.",
    hr: "Community meeting in a modern bamboo pavilion, diverse local participants, professional and warm atmosphere, empowerment visualization."
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [{
          text: `TASK: Visual concept for ${context}. 
          DESCRIPTION: ${prompt}. 
          STYLE: ${contextGuides[context]}. 
          OUTPUT: High-quality professional visual concept.`
        }]
      }
    });

    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0].content?.parts || [];
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const { data, mimeType } = part.inlineData;
          return `data:${mimeType || 'image/png'};base64,${data}`;
        }
      }
    }
    
    // Fallback Unsplash URL
    return `https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=1200&sig=${Math.random()}`;
    
  } catch (error) {
    console.error("Image Generation Error:", error);
    return `https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=1200&sig=${Math.random()}`;
  }
}
