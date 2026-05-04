import React, { useState } from 'react';
import { Send, Bot, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { getConsultation, generateAIImage } from '../services/geminiService';

export default function AIConsultant() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setResponse(null);
    setImageUrl(null);
    
    const contextPrompt = `Tolong analisis potensi desa berikut untuk pengembangan desa wisata: "${input}". 
    Mohon berikan detail mengenai:
    1. Analisis SWOT (Strengths, Weaknesses, Opportunities, Threats).
    2. Peluang UMKM atau bisnis lokal yang bisa dikembangkan.
    3. Langkah praktis untuk pembukaan atau pengembangan.
    4. Strategi menjaga keberlanjutan sumber daya alam.`;

    try {
      const result = await getConsultation(contextPrompt);
      setResponse(result);
      
      // Auto-generate a conceptual image if the input is descriptive
      if (input.length > 20) {
        setIsGeneratingImage(true);
        const img = await generateAIImage(input, 'consultancy');
        setImageUrl(img);
      }
    } catch (error) {
      console.error(error);
      setResponse("Terjadi kendala teknis. Mohon coba sesaat lagi.");
    } finally {
      setIsLoading(false);
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-emerald-100 pb-12">
        <div className="flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-[0.5em] font-sans text-emerald-600 font-bold block">Inteligensi Buatan</span>
          <h1 className="text-5xl font-serif font-light italic text-slate-900 leading-tight tracking-tighter">Konsultan AI <span className="text-eco-blue">Sustain.</span></h1>
          <p className="text-slate-500 font-light text-xl max-w-xl">Rekomendasi Strategis Berbasis Data untuk Pengembangan Desa Wisata Regeneratif.</p>
        </div>
        <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-eco-blue shadow-lg shadow-sky-100 flex-shrink-0 animate-pulse">
           <Bot size={32} strokeWidth={1.5} />
        </div>
      </div>

      <div className="bg-white rounded-[40px] p-10 border border-emerald-50 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              id="ai-prompt-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ceritakan potensi atau kendala desa Anda..."
              className="w-full min-h-[160px] p-8 bg-slate-50 rounded-3xl border-none focus:ring-2 focus:ring-eco-blue text-slate-900 placeholder:text-slate-300 resize-none transition-all font-light text-lg leading-relaxed shadow-inner"
            />
            <button
              id="submit-ai-prompt"
              disabled={isLoading || !input.trim()}
              className="absolute bottom-6 right-6 p-4 bg-eco-blue text-white rounded-full disabled:opacity-50 hover:bg-sky-700 transition-all shadow-xl shadow-sky-900/10"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
            </button>
          </div>
          <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-2 rounded-full bg-eco-blue animate-pulse" />
            <p className="text-[10px] uppercase font-sans font-bold tracking-widest text-slate-400">
              AI Terintegrasi dengan Standar Pariwisata Berkelanjutan Global
            </p>
          </div>
        </form>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center p-24 space-y-6 text-slate-400">
          <Loader2 className="animate-spin" size={64} strokeWidth={1} />
          <p className="font-serif italic text-xl tracking-wide text-eco-blue">Sinergi Data & Kearifan Lokal...</p>
        </div>
      )}

      <AnimatePresence>
        {(response || imageUrl) && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-12 lg:p-16 rounded-[64px] border border-emerald-50 shadow-2xl shadow-emerald-900/5 transition-all duration-700"
          >
            <div className="flex items-center justify-between mb-12 pb-8 border-b border-emerald-50 text-slate-900">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-eco-blue">
                  <Sparkles size={20} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold">Hasil Analisis Strategis</span>
              </div>
              <div className="text-[9px] uppercase font-bold tracking-widest font-sans text-slate-300">ID Laporan: #{Math.floor(Math.random() * 10000)}</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-12">
              <div className="lg:col-span-8">
                <div className="markdown-body prose prose-slate max-w-none prose-headings:font-serif prose-headings:italic prose-headings:font-light prose-p:font-light prose-p:text-lg prose-strong:text-eco-green">
                  <Markdown>{response || ""}</Markdown>
                </div>
              </div>
              <div className="lg:col-span-4">
                <div className="sticky top-12 space-y-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-emerald-600 font-bold block mb-6">Visualisasi Konsep AI</span>
                    <div className="rounded-[40px] overflow-hidden transition-all duration-1000 bg-slate-50 shadow-2xl ring-1 ring-emerald-50 relative min-h-[300px] flex items-center justify-center">
                      {isGeneratingImage ? (
                        <div className="flex flex-col items-center gap-4 text-emerald-600/40">
                           <Loader2 className="animate-spin" size={32} />
                           <p className="text-[10px] animate-pulse">Melukis Konsep...</p>
                        </div>
                      ) : imageUrl ? (
                        <img 
                          src={imageUrl}
                          alt="AI Visualization" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="text-slate-300 flex flex-col items-center gap-2">
                           <Sparkles size={32} />
                           <p className="text-[10px]">Menunggu Deskripsi...</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-8 bg-sky-50/50 rounded-[40px] border border-sky-100">
                    <p className="text-[10px] font-sans italic text-sky-800 leading-relaxed text-center font-medium">
                      "AI kami memproses kearifan lokal untuk menghasilkan visualisasi potensi kawasan yang unik."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-emerald-50 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-emerald-100 flex items-center justify-center text-slate-300">
                  <Bot size={20} strokeWidth={1} />
                </div>
                <p className="text-xs text-slate-400 font-light italic max-w-xs">Data dianalisis menggunakan Gemini 3 Flash untuk akurasi kontekstual lokal terbaik.</p>
              </div>
              <button className="px-10 py-4 bg-emerald-50 text-eco-green rounded-full font-bold text-[9px] uppercase tracking-widest hover:bg-emerald-100 transition-all">
                Unduh PDF Laporan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!response && !isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Analisis potensi agrowisata berbasis kopi.",
            "Peluang UMKM kerajinan di desa pegunungan.",
            "Strategi pengelolaan air terjun berkelanjutan.",
            "Mitigasi dampak sosial pembangunan hotel desa."
          ].map((suggestion, i) => (
            <button
              key={i}
              onClick={() => setInput(suggestion)}
              className="p-8 bg-white border border-emerald-50 rounded-[32px] text-left hover:bg-emerald-50 hover:shadow-xl transition-all text-slate-500 text-sm font-light italic"
            >
              "{suggestion}"
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
