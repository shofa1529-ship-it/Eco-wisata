import React, { useState } from 'react';
import { Send, Bot, Loader2, Sparkles, AlertCircle, Leaf, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { getConsultation, generateAIImage } from '../services/geminiService';

export default function AIConsultant() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeDimension, setActiveDimension] = useState<string | null>(null);

  const dimensions = [
    { id: 'culture', label: 'Budaya & Adat', icon: Sparkles, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'nature', label: 'Alam & Ekowisata', icon: Leaf, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'economy', label: 'Ekonomi Kreatif', icon: Bot, color: 'text-sky-600', bg: 'bg-sky-50' },
    { id: 'infra', label: 'Infrastruktur', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setResponse(null);
    setImageUrl(null);
    setError(null);
    
    const contextPrompt = `
    IDENTITAS: Anda adalah Konsultan Utama Transformasi Desa Berkelanjutan.
    FOKUS ANALISIS: Potensi desa "${input}".
    DIMENSI SPESIFIK: ${activeDimension ? dimensions.find(d => d.id === activeDimension)?.label : 'Analisis Menyeluruh'}.
    
    INTRUKSI KHUSUS:
    Berikan analisis mendalam, kreatif, dan spesifik yang mencakup:
    1. DNA DESA: Apa elemen paling unik (The Soul of the Village) yang bisa dijual ke publik?
    2. BLUEPRINT INFRASTRUKTUR: Bagaimana membangun fasilitas tanpa merusak ekosistem?
    3. EKONOMI SIRKULAR: Bagaimana limbah desa bisa menjadi produk premium?
    4. DIGITAL BRANDING: Strategi agar viral dengan cara yang elegan dan otentik.
    5. IMPACT SCORE: Estimasi dampak positif terhadap ekonomi warga lokal.
    
    Gunakan format laporan yang dinamis dengan visualisasi teks (bullet points, bold highlights).`;

    try {
      const result = await getConsultation(contextPrompt);
      setResponse(result);
      
      // Auto-generate a conceptual image if the input is descriptive
      if (input.length > 5) {
        setIsGeneratingImage(true);
        const img = await generateAIImage(input, 'consultancy');
        setImageUrl(img);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kendala teknis. Mohon coba sesaat lagi.");
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

      <div className="bg-white rounded-[40px] p-10 border border-emerald-50 shadow-sm space-y-8">
        <div className="flex flex-wrap gap-4">
          {dimensions.map((dim) => (
            <button
              key={dim.id}
              type="button"
              onClick={() => setActiveDimension(activeDimension === dim.id ? null : dim.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${
                activeDimension === dim.id 
                  ? `${dim.bg} border-current ${dim.color} shadow-lg shadow-emerald-900/5` 
                  : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
              }`}
            >
              <dim.icon size={18} />
              <span className="text-[10px] uppercase tracking-widest font-bold font-sans">{dim.label}</span>
            </button>
          ))}
        </div>

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

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-6 bg-red-50 border border-red-100 rounded-[32px] flex items-center gap-4 text-red-600"
          >
            <AlertCircle size={24} className="shrink-0" />
            <p className="text-sm font-light italic">{error}</p>
          </motion.div>
        )}
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
