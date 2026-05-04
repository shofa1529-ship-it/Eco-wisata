import React, { useState } from 'react';
import { Trash2, Recycle, Leaf, TrendingDown, BarChart3, ArrowUpRight, Bot, Send, Loader2, Sparkles, Lightbulb, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { getConsultation, generateAIImage } from '../services/geminiService';

export default function WasteManagement() {
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAIQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setAiResponse(null);
    setError(null);
    setImageUrl(null);
    
    const system = "Anda adalah konsultan ekonomi sirkular dan pengelolaan sampah berkelanjutan untuk desa wisata. Berikan ide kreatif pengolahan limbah (misal: plastik menjadi kerajinan, organik menjadi pupuk/pakan) dan strategi bank sampah yang bisa memberdayakan warga lokal.";
    
    try {
      const result = await getConsultation(`Ide sirkular untuk: ${prompt}`, system);
      setAiResponse(result);
      
      setIsGeneratingImage(true);
      const img = await generateAIImage(prompt, 'waste');
      setImageUrl(img);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Gagal menghubungi Innovator AI. Mohon coba lagi.");
    } finally {
      setIsLoading(false);
      setIsGeneratingImage(false);
    }
  };

  const stats = [
    { label: 'Organik', value: '1.2 ton', trend: '-5%', icon: Leaf, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Plastik', value: '450 kg', trend: '-12%', icon: Recycle, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Unsorted', value: '120 kg', trend: '-20%', icon: Trash2, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2 mb-8">
        <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-emerald-600 font-bold block">Sirkularitas & Ekologi</span>
        <h1 className="text-5xl font-serif font-light italic text-slate-900">Pengelolaan Sampah.</h1>
        <p className="text-slate-500 font-light text-lg">Konversi Limbah Menjadi Nilai Manfaat bagi Komunitas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-emerald-50 rounded-[40px] overflow-hidden bg-white shadow-xl shadow-emerald-900/5">
        {stats.map((stat, i) => (
          <div key={i} className={`p-10 ${i !== 2 ? 'border-b md:border-b-0 md:border-r border-emerald-50' : ''} hover:bg-emerald-50 transition-colors group`}>
            <div className="flex justify-between items-start mb-10">
              <div className={`w-12 h-12 border border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-eco-green group-hover:text-white transition-all shadow-sm`}>
                <stat.icon size={24} strokeWidth={1.5} />
              </div>
              <div className="text-[10px] font-sans font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full">
                {stat.trend} Efficient
              </div>
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-sans text-slate-400 mb-2 block">{stat.label}</p>
            <h3 className="text-5xl font-serif font-medium text-slate-900 italic">{stat.value}</h3>
          </div>
        ))}
      </div>

      <section className="bg-white rounded-[64px] border border-emerald-50 p-12 lg:p-20 shadow-2xl shadow-emerald-900/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/20 -skew-x-12 transform translate-x-20 group-hover:translate-x-10 transition-transform duration-1000" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-eco-blue">
                  <Bot size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-sans font-bold text-slate-400">Innovator Sirkular AI</span>
              </div>
              <h2 className="text-4xl font-serif font-light italic leading-tight text-slate-900">
                Limbah Jadi <span className="text-eco-blue">Berkah.</span>
              </h2>
              <p className="text-slate-500 font-light text-lg leading-relaxed">
                Temukan cara kreatif mengolah limbah desa menjadi produk bernilai ekonomi tinggi.
              </p>
            </div>

            <form onSubmit={handleAIQuery} className="relative mt-8 group">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Jenis sampah dominan? (mis: batok kelapa, kemasan)..."
                className="w-full px-8 py-5 bg-white rounded-full border border-emerald-100 focus:ring-2 focus:ring-eco-blue text-sm font-light text-slate-900 shadow-sm transition-all"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-2 p-3 bg-eco-blue text-white rounded-full disabled:opacity-50 shadow-lg shadow-sky-900/10 hover:bg-sky-700 transition-all"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </form>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-6 bg-red-50 border border-red-100 rounded-[32px] flex items-center gap-4 text-red-600 mt-6"
              >
                <AlertCircle size={24} className="shrink-0" />
                <p className="text-sm font-light italic">{error}</p>
              </motion.div>
            )}
          </div>
          <div className="col-span-12 lg:col-span-8">
             {(isLoading || isGeneratingImage) && !aiResponse && !imageUrl ? (
                <div className="h-full flex flex-col items-center justify-center p-16 bg-white border border-emerald-100 rounded-[48px] border-dashed text-slate-400">
                   <Loader2 size={48} className="animate-spin mb-6 text-eco-green" />
                   <p className="font-serif italic text-xl">Merancang solusi sirkular...</p>
                </div>
             ) : (aiResponse || imageUrl) ? (
                <div className="space-y-8">
                   {imageUrl && (
                     <div className="bg-white p-4 rounded-[48px] border border-emerald-50 shadow-2xl relative overflow-hidden group">
                        <img src={imageUrl} alt="AI Visual" className="w-full h-auto rounded-[36px] shadow-sm transform transition-transform duration-1000" />
                        <div className="absolute top-10 left-10 py-2 px-6 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold tracking-[0.2em] text-emerald-600 shadow-sm">
                           KONSEP SIRKULAR AI
                        </div>
                     </div>
                   )}
                   {aiResponse && (
                     <div className="bg-white p-12 rounded-[56px] border border-emerald-50 shadow-2xl shadow-emerald-900/5 transition-all duration-700">
                        <div className="flex items-center gap-4 mb-8 border-b border-emerald-50 pb-8">
                          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-eco-green">
                            <Lightbulb size={20} />
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-slate-900">Blueprint Inovasi AI</span>
                        </div>
                        <div className="markdown-body prose prose-slate max-w-none text-slate-700 prose-strong:text-eco-green">
                          <Markdown>{aiResponse}</Markdown>
                        </div>
                        <div className="mt-10 pt-8 border-t border-emerald-50 flex items-start gap-4 bg-emerald-50/50 p-8 rounded-[32px]">
                           <Sparkles size={24} className="text-emerald-600 mt-1 shrink-0" />
                           <p className="text-xs text-emerald-900 font-light italic leading-relaxed">
                             Saran: Hubungi pengrajin lokal atau komunitas kreatif untuk mendiskusikan kelayakan teknis dan potensi pasar dari ide inovasi di atas.
                           </p>
                        </div>
                     </div>
                   )}
                </div>
             ) : (
                <div className="h-full bg-slate-50/50 border border-emerald-50 rounded-[56px] p-16 flex flex-col items-center justify-center text-center space-y-6">
                   <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-200">
                     <Bot size={40} strokeWidth={1} />
                   </div>
                   <p className="text-slate-400 font-light italic max-w-sm text-lg">Berikan detail jenis limbah untuk mendapatkan strategi pengolahan kreatif dari Innovator AI.</p>
                </div>
             )}
          </div>
        </div>
      </section>
    </div>
  );
}
