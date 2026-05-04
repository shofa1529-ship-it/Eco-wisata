import React, { useState } from 'react';
import { AlertTriangle, Map, PhoneCall, ShieldCheck, Siren, Info, Bot, Send, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { getConsultation, generateAIImage } from '../services/geminiService';

export default function DisasterMitigation() {
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setAiResponse(null);
    setError(null);
    setImageUrl(null);
    
    const system = "Anda adalah pakar mitigasi bencana untuk desa wisata di Indonesia. Berikan analisis risiko dan langkah pencegahan berdasarkan deskripsi geografi dan kondisi desa yang diberikan. Sertakan tips keselamatan untuk wisatawan.";
    
    try {
      const result = await getConsultation(`Analisis risiko bencana untuk: ${prompt}`, system);
      setAiResponse(result);
      
      // Generate conceptual map/infographic
      setIsGeneratingImage(true);
      const img = await generateAIImage(prompt, 'mitigation');
      setImageUrl(img);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Gagal menghubungi Guardian AI. Mohon coba lagi.");
    } finally {
      setIsLoading(false);
      setIsGeneratingImage(false);
    }
  };

  const alerts = [
    { type: 'Info', message: 'Cuaca cerah berawan untuk 24 jam ke depan.', time: '10 menit yang lalu', status: 'normal' },
    { type: 'Peringatan', message: 'Waspada potensi angin kencang di area perbukitan.', time: '2 jam yang lalu', status: 'warning' },
  ];

  const guides = [
    { title: 'Jalur Evakuasi', desc: 'Denah jalur evakuasi menuju area terbuka di balai desa.', icon: Map, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Nomor Darurat', desc: 'Daftar kontak tim SAR lokal, Puskesmas, dan BPBD.', icon: PhoneCall, color: 'text-sky-500', bg: 'bg-sky-50' },
    { title: 'Tanda Peringatan', desc: 'Edukasi mengenali bunyi sirine dan sistem alarm.', icon: Siren, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Perlengkapan', desc: 'Daftar barang mustahil ditinggalkan saat keadaan darurat.', icon: ShieldCheck, color: 'text-sky-500', bg: 'bg-sky-50' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2 mb-8">
        <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-emerald-600 font-bold block">Resiliensi & Mitigasi</span>
        <h1 className="text-5xl font-serif font-light italic text-slate-900 leading-tight tracking-tighter">Sistem Siaga Desa.</h1>
        <p className="text-slate-500 font-light text-lg">Pemantauan Lingkungan Real-time & Protokol Keselamatan Terpadu.</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Real-time Alerts - Modern Glass Module */}
        <div className="col-span-12 lg:col-span-5">
          <div className="bg-slate-900 text-white rounded-[56px] p-12 h-full flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-16">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                   <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-sans uppercase tracking-[0.3em] font-bold text-emerald-400">Live Status</p>
                   <p className="text-sm font-light opacity-60 italic">Aman & Terkendali</p>
                </div>
              </div>
              
              <div className="space-y-10">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-sans opacity-40 mb-6">Peringatan Aktif</p>
                  <div className="space-y-6">
                    {alerts.map((alert, i) => (
                      <div key={i} className="flex gap-6 items-start border-b border-white/5 pb-6 last:border-0 group/alert">
                        <div className={`w-3 h-3 mt-1.5 rounded-full ${alert.status === 'warning' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                        <div>
                          <p className="text-xl font-light leading-snug group-hover/alert:text-emerald-400 transition-colors">{alert.message}</p>
                          <span className="text-[9px] uppercase tracking-widest opacity-30 block mt-2 font-bold">{alert.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-16 grid grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-[9px] font-sans opacity-40 uppercase tracking-widest mb-2 font-bold">Curah Hujan</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-serif italic">12</span>
                  <span className="text-[10px] opacity-40 mb-1 tracking-widest">mm / h</span>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-[9px] font-sans opacity-40 uppercase tracking-widest mb-2 font-bold">Angin</p>
                <div className="flex items-end gap-2">
                   <span className="text-3xl font-serif italic">8</span>
                   <span className="text-[10px] opacity-40 mb-1 tracking-widest">km / h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Guides */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {guides.map((guide, i) => (
              <div key={i} className="bg-white p-10 rounded-[48px] border border-emerald-50 group hover:bg-emerald-50/50 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500 cursor-default">
                <div className={`w-14 h-14 rounded-2xl ${guide.bg} ${guide.color} flex items-center justify-center mb-8 shadow-sm group-hover:rotate-12 transition-transform`}>
                  <guide.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif font-medium mb-3 italic text-slate-900">{guide.title}</h3>
                <p className="text-base text-slate-500 leading-relaxed font-light">{guide.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-10 rounded-[56px] border border-emerald-50 flex flex-col md:flex-row items-center gap-12 shadow-inner">
             <div className="flex-1 text-center md:text-left">
                <h3 className="text-xs uppercase font-sans font-bold tracking-[0.2em] mb-4 text-emerald-600">Protokol Evakuasi</h3>
                <p className="text-2xl font-serif italic text-slate-700 leading-snug">
                  "Keselamatan anda adalah prioritas kami. Pastikan anda mengenali tanda-tanda peringatan alam."
                </p>
             </div>
             <button className="px-10 py-5 bg-eco-blue text-white rounded-full font-bold text-[11px] uppercase tracking-widest shrink-0 hover:bg-sky-700 transition-all shadow-xl shadow-sky-900/10">
               Hubungi Satgas
             </button>
          </div>
        </div>
      </div>

      {/* AI Risk Analysis Section */}
      <section className="mt-16 pt-16 border-t border-emerald-50">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-4">
            <div className="flex flex-col gap-2 mb-6">
              <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-emerald-600 font-bold block">AI Guardian</span>
              <h2 className="text-4xl font-serif font-light italic text-slate-900 leading-tight">Analisis Risiko <br /><span className="text-eco-blue">Geografis.</span></h2>
              <p className="text-slate-500 font-light text-sm max-w-xs mt-4 leading-relaxed">
                Gunakan AI untuk memetakan potensi risiko berdasarkan kontur tanah dan lokasi desa Anda secara presisi.
              </p>
            </div>
            <form onSubmit={handleAISearch} className="relative mt-8 group">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Deskripsikan lokasi desa (mis: lereng curam, pesisir)..."
                className="w-full px-8 py-5 bg-white rounded-full border border-emerald-100 focus:ring-2 focus:ring-emerald-500 text-sm font-light text-slate-900 shadow-sm transition-all shadow-inner"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-2 p-3 bg-emerald-600 text-white rounded-full disabled:opacity-50 hover:bg-emerald-700 shadow-lg shadow-emerald-900/10 transition-all"
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
                <div className="h-full flex flex-col items-center justify-center p-16 bg-white border border-emerald-100 rounded-[56px] border-dashed text-slate-400">
                   <Loader2 size={48} className="animate-spin mb-6 text-eco-green" />
                   <p className="font-serif italic text-2xl">{isGeneratingImage ? "Melukis peta mitigasi..." : "Menghitung matriks keselamatan..."}</p>
                </div>
             ) : (aiResponse || imageUrl) ? (
                <div className="space-y-8">
                   {imageUrl && (
                     <div className="bg-white p-4 rounded-[48px] border border-emerald-50 shadow-2xl relative overflow-hidden group">
                        <img src={imageUrl} alt="AI Safety Map" className="w-full h-auto rounded-[36px] shadow-sm transform transition-transform duration-1000" />
                        <div className="absolute top-10 left-10 py-2 px-6 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold tracking-[0.2em] text-rose-600 shadow-sm flex items-center gap-2">
                           <Siren size={12} className="animate-pulse" /> PETA RISIKO & MITIGASI AI
                        </div>
                     </div>
                   )}
                   {aiResponse && (
                     <div className="bg-white p-12 rounded-[56px] border border-emerald-50 shadow-2xl shadow-emerald-900/5 transition-all duration-700">
                        <div className="flex items-center gap-4 mb-8 border-b border-emerald-50 pb-8">
                          <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-eco-blue">
                            <Sparkles size={20} />
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-slate-900">Laporan Keselamatan AI</span>
                        </div>
                        <div className="markdown-body prose prose-slate max-w-none text-slate-700 prose-strong:text-emerald-700">
                          <Markdown>{aiResponse}</Markdown>
                        </div>
                        <div className="mt-10 pt-8 border-t border-emerald-50 flex items-start gap-4 bg-rose-50 p-8 rounded-[40px]">
                           <AlertCircle className="text-rose-600 mt-1 shrink-0" size={24} />
                           <p className="text-xs text-rose-900 font-light italic leading-relaxed">
                              <span className="font-bold">PENTING:</span> Analisis AI ini bersifat prediktif. Segera lakukan survei geologi fisik untuk memastikan keamanan konstruksi dan jalur evakuasi di area tersebut bersama otoritas berwenang (BPBD).
                           </p>
                        </div>
                     </div>
                   )}
                </div>
             ) : (
                <div className="h-full bg-slate-50 border border-emerald-50 rounded-[56px] p-16 flex flex-col items-center justify-center text-center space-y-6">
                   <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-200">
                     <Bot size={40} strokeWidth={1} />
                   </div>
                   <p className="text-slate-400 font-light italic max-w-sm text-lg leading-relaxed">Masukkan detail geografis desa untuk mendapatkan analisis risiko instan dari Guardian AI.</p>
                </div>
             )}
          </div>
        </div>
      </section>
    </div>
  );
}
