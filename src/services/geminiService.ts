import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not defined. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function getConsultation(prompt: string, systemInstruction?: string) {
  const defaultInstruction = `Anda adalah Arsitek Desa Wisata Digital & Konsultan Ekonomi Berkelanjutan kelas dunia. 
  Tugas Anda adalah menganalisis potensi sebuah desa di Indonesia secara mendalam dan dinamis.
  
  Setiap analisis WAJIB mencakup:
  1. ANALISIS POTENSI UNIK: Identifikasi aset alam (landscape, flora/fauna), budaya (adat, kuliner, seni), dan manusia.
  2. STRATEGI SWOR (Strengths, Weaknesses, Opportunities, Resilience): Analisis mendalam tentang ketahanan desa.
  3. EKOSISTEM UMKM: Inovasi produk lokal yang bisa dikemas secara premium (Rebranding kearifan lokal).
  4. ROADMAP DIGITAL: Bagaimana desa tersebut bisa "Go Global" menggunakan teknologi.
  5. INTEGRASI EKOLOGI: Cara menjaga kelestarian alam sambil meningkatkan profitabilitas.
  
  Gunakan gaya bahasa yang inspiratif, inovatif, dan penuh hormat terhadap kearifan lokal. Gunakan Markdown untuk format yang cantik.`;

  try {
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not defined.");
      return "Sistem AI sedang offline: API Key tidak ditemukan. Harap hubungi administrator untuk konfigurasi.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || defaultInstruction,
      }
    });
    
    const resultText = response.text || "";
    
    if (!resultText) {
      throw new Error("EMPTY_RESPONSE");
    }

    return resultText.trim();
    
  } catch (error: any) {
    console.error("Gemini Consultation Error:", error);
    if (error.message === "EMPTY_RESPONSE") {
      throw new Error("AI tidak memberikan respon teks. Mohon coba berikan detail desa yang lebih lengkap.");
    }
    
    if (error.message?.includes("quota") || error.code === 429) {
      throw new Error("Batas penggunaan AI (Quota) telah tercapai. Silakan coba lagi beberapa saat lagi.");
    }

    if (!apiKey) {
      throw new Error("API Key tidak ditemukan. Harap hubungi administrator.");
    }
    
    throw new Error("Terjadi kendala teknis saat menghubungi sistem AI.");
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
    if (!apiKey) return null;

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

    // Handle extraction
    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0].content?.parts || [];
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const { data, mimeType } = part.inlineData;
          return `data:${mimeType || 'image/png'};base64,${data}`;
        }
      }
    }
    
    // Fallback: If no image part found in candidates, use a dynamic placeholder
    const keywords = prompt.split(' ').slice(0, 3).join(',');
    return `https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=1200&sig=${Math.random()}`;
    
  } catch (error) {
    console.error("Gemini Vision/Image Error:", error);
    // Silent fallback to Unsplash for better UX
    return `https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=1200&sig=${Math.random()}`;
  }
}
