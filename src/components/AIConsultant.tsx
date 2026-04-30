import React, { useState } from 'react';
import { Send, Bot, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import Markdown from 'react-markdown';
import { getConsultation } from '../services/geminiService';

export default function AIConsultant() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setResponse(null);
    
    const contextPrompt = `Tolong analisis potensi desa berikut untuk pengembangan desa wisata: "${input}". 
    Mohon berikan detail mengenai:
    1. Analisis SWOT (Strengths, Weaknesses, Opportunities, Threats).
    2. Peluang UMKM atau bisnis lokal yang bisa dikembangkan.
    3. Langkah praktis untuk pembukaan atau pengembangan.
    4. Strategi menjaga keberlanjutan sumber daya alam.`;

    const result = await getConsultation(contextPrompt);
    setResponse(result);
    setIsLoading(false);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2 mb-8">
        <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-stone-500 block">Inteligensi Buatan</span>
        <h1 className="text-5xl font-serif font-light italic">Konsultan Strategis.</h1>
        <p className="text-stone-500 font-light text-lg">Analisis SWOT, Peluang UMKM, dan Peta Jalan Pengembangan Lokal.</p>
      </div>

      <div className="bg-white rounded-[40px] p-10 border border-black/5 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              id="ai-prompt-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ceritakan potensi atau kendala desa Anda..."
              className="w-full min-h-[160px] p-8 bg-stone-50 rounded-3xl border-none focus:ring-1 focus:ring-editorial-accent text-editorial-text placeholder:text-stone-300 resize-none transition-all font-light text-lg leading-relaxed"
            />
            <button
              id="submit-ai-prompt"
              disabled={isLoading || !input.trim()}
              className="absolute bottom-6 right-6 p-4 bg-editorial-accent text-white rounded-full disabled:opacity-50 hover:bg-olive-600 transition-all shadow-xl shadow-olive-900/10"
            >
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
            </button>
          </div>
          <div className="flex items-center gap-3 px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-editorial-accent animate-pulse" />
            <p className="text-[10px] uppercase font-sans font-bold tracking-widest text-stone-400">
              AI Terintegrasi dengan Standar Pariwisata Berkelanjutan Global
            </p>
          </div>
        </form>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center p-24 space-y-6 text-stone-400">
          <Loader2 className="animate-spin" size={64} strokeWidth={1} />
          <p className="font-serif italic text-xl tracking-wide">Merespons kearifan lokal...</p>
        </div>
      )}

      {response && (
        <div className="bg-white rounded-[40px] p-12 border border-black/5 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between mb-10 border-b border-black/5 pb-8">
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-olive-500" />
              <h2 className="font-sans font-bold text-xs uppercase tracking-[0.3em] text-editorial-text">Laporan Analisis Strategis</h2>
            </div>
            <div className="text-[10px] uppercase font-sans text-stone-400">ID Laporan: #{Math.floor(Math.random() * 10000)}</div>
          </div>
          <div className="markdown-body prose prose-stone max-w-none prose-headings:font-serif prose-headings:italic prose-headings:font-light prose-p:font-light prose-p:text-lg">
            <Markdown>{response}</Markdown>
          </div>
          <div className="mt-12 pt-8 border-t border-black/5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center shrink-0">
              <Bot size={16} className="text-stone-400" />
            </div>
            <p className="text-sm text-stone-500 italic font-light leading-relaxed">
              Analisis ini dihasilkan oleh kecerdasan buatan EcoSustain. Gunakan sebagai fundamen awal untuk diskusi mendalam bersama tokoh adat dan perangkat desa.
            </p>
          </div>
        </div>
      )}

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
              className="p-6 bg-white/50 border border-black/5 rounded-3xl text-left hover:bg-white hover:shadow-lg transition-all text-stone-500 text-sm font-light italic"
            >
              "{suggestion}"
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
