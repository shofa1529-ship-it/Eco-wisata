import React, { useState } from 'react';
import { Send, Megaphone, Loader2, Sparkles, Share2, Instagram, Facebook, Globe, Image as ImageIcon, Download, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { getConsultation, generateAIImage } from '../services/geminiService';

export default function PromotionAI() {
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

    const prompt = `
      Bertindaklah sebagai Ahli Pemasaran Digital Pariwisata Berkelanjutan. 
      Bantu buatkan strategi promosi untuk: "${input}"
      
      Output harus mencakup:
      1. **Slogan Ikonik**: 3 opsi slogan yang menggabungkan alam dan keberlanjutan.
      2. **Konten Instagram**: 1 draf caption menarik dengan hashtag relevan.
      3. **Ide Campaign**: 1 konsep kampanye kreatif (misal: kompetisi foto, gerakan menanam pohon).
      4. **Tone of Voice**: Rekomendasi gaya bahasa yang sesuai.
      
      Gunakan Bahasa Indonesia yang elegan, puitis namun tetap informatif dan modern.
    `;

    try {
      const result = await getConsultation(prompt);
      setResponse(result);
    } catch (error) {
      console.error(error);
      setResponse("Maaf, terjadi kendala teknis. Mohon coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!input.trim() || isGeneratingImage) return;

    setIsGeneratingImage(true);
    try {
      const image = await generateAIImage(input, 'promo');
      setImageUrl(image);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const suggestions = [
    "Promosi paket trekking hutan pinus",
    "Kampanye Desa Bebas Plastik",
    "Launching penginapan bambu artistik",
    "Festival tahunan panen kopi lokal"
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-sky-100 pb-12">
        <div className="flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-[0.5em] font-sans text-sky-600 font-bold block">Digital Marketing AI</span>
          <h1 className="text-5xl font-serif font-light italic text-slate-900 leading-tight tracking-tighter">Media Promosi <span className="text-eco-blue">Kreatif.</span></h1>
          <p className="text-slate-500 font-light text-xl max-w-xl">Ciptakan narasi memikat yang menghubungkan destinasi anda dengan audiens global secara visual & tekstual.</p>
        </div>
        <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-eco-blue shadow-lg shadow-sky-100 flex-shrink-0">
           <Megaphone size={32} strokeWidth={1.5} />
        </div>
      </div>

      <div className="bg-white rounded-[40px] p-10 border border-sky-50 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              id="promo-prompt"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Apa yang ingin anda promosikan hari ini? (Contoh: Air terjun baru, paket wisata edukasi...)"
              className="w-full min-h-[160px] p-8 bg-slate-50 rounded-3xl border-none focus:ring-2 focus:ring-eco-blue text-slate-900 placeholder:text-slate-300 resize-none transition-all font-light text-lg leading-relaxed shadow-inner"
            />
            <div className="absolute bottom-6 right-6 flex gap-3">
              <button
                type="button"
                onClick={handleGenerateImage}
                disabled={!input.trim() || isGeneratingImage}
                className="p-4 bg-emerald-500 text-white rounded-full disabled:opacity-50 hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-900/10 flex items-center gap-2"
                title="Bangkitkan Infografis Visual"
              >
                {isGeneratingImage ? <Loader2 className="animate-spin" size={24} /> : <ImageIcon size={24} />}
              </button>
              <button
                id="submit-promo-prompt"
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-4 bg-eco-blue text-white rounded-full disabled:opacity-50 hover:bg-sky-700 transition-all shadow-xl shadow-sky-900/10"
                title="Hasilkan Strategi Tulis"
              >
                {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 text-sky-600">
            <Sparkles size={16} className="animate-pulse" />
            <p className="text-[10px] uppercase font-sans font-bold tracking-widest ">
              Gunakan AI untuk Menghasilkan Caption & Infografis Digital Profesional
            </p>
          </div>
        </form>
      </div>

      {(isLoading || isGeneratingImage) && !response && !imageUrl && (
        <div className="flex flex-col items-center justify-center p-24 space-y-6 text-slate-400">
          <Loader2 className="animate-spin" size={64} strokeWidth={1} />
          <p className="font-serif italic text-xl tracking-wide text-eco-blue">
            {isGeneratingImage ? "Melukis infografis desa..." : "Menenun narasi kreatif..."}
          </p>
        </div>
      )}

      <AnimatePresence>
        {(response || imageUrl) && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {imageUrl && (
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-7 bg-white p-4 rounded-[48px] border border-sky-50 shadow-2xl relative overflow-hidden group">
                    <img src={imageUrl} alt="AI Generated Infographic" className="w-full h-auto rounded-[36px] shadow-sm transform group-hover:scale-[1.02] transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                       <button className="p-4 bg-white text-slate-900 rounded-full hover:bg-sky-50 transition-colors shadow-xl">
                          <Download size={24} />
                       </button>
                       <button className="p-4 bg-white text-slate-900 rounded-full hover:bg-sky-50 transition-colors shadow-xl text-eco-blue">
                          <Maximize2 size={24} />
                       </button>
                    </div>
                  </div>
                  <div className="lg:col-span-5 space-y-8">
                     <div className="p-8 bg-emerald-50 rounded-[40px] border border-emerald-100">
                        <div className="flex items-center gap-3 mb-4 text-eco-green">
                           <Sparkles size={20} />
                           <h4 className="text-[10px] uppercase tracking-widest font-bold">Visual Infografis AI</h4>
                        </div>
                        <p className="text-slate-600 font-light leading-relaxed italic">
                          "Visual ini dirancang untuk menarik perhatian pada keasrian alam desa. Gunakan sebagai poster digital, header website, atau konten utama media sosial."
                        </p>
                     </div>
                     {!response && !isLoading && (
                        <button 
                           onClick={handleSubmit} 
                           className="w-full py-6 bg-slate-900 text-white rounded-[32px] font-bold text-[11px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3"
                        >
                           <Send size={18} /> Lengkapi dengan Strategi Tulis
                        </button>
                     )}
                  </div>
               </div>
            )}

            {response && (
              <div className="bg-white p-12 lg:p-16 rounded-[64px] border border-sky-50 shadow-2xl shadow-sky-900/5 transition-all duration-700">
                <div className="flex items-center justify-between mb-12 pb-8 border-b border-sky-50 text-slate-900">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-eco-blue">
                      <Share2 size={20} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold">Draf Strategi Promosi</span>
                  </div>
                  <div className="flex gap-2">
                    <Instagram size={16} className="text-slate-300 hover:text-eco-blue cursor-pointer transition-colors" />
                    <Facebook size={16} className="text-slate-300 hover:text-eco-blue cursor-pointer transition-colors" />
                    <Globe size={16} className="text-slate-300 hover:text-eco-blue cursor-pointer transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-8">
                    <div className="markdown-body prose prose-slate max-w-none prose-headings:font-serif prose-headings:italic prose-headings:font-light prose-p:font-light prose-p:text-lg prose-strong:text-eco-blue">
                      <Markdown>{response}</Markdown>
                    </div>
                  </div>
                  <div className="lg:col-span-4">
                    <div className="sticky top-12 space-y-8">
                      <div className="p-8 bg-sky-50 rounded-[40px] border border-sky-100 space-y-6">
                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-sky-800">Tips Optimasi Konten</h4>
                        <ul className="space-y-4">
                            {[
                                'Gunakan foto pencahayaan alami',
                                'Posting di jam emas (19.00 - 21.00)',
                                'Gunakan 3-5 hashtag tertarget',
                                'Reply semua komentar audiens'
                            ].map((tip, i) => (
                                <li key={i} className="flex gap-3 text-sm text-sky-700 font-light italic">
                                    <div className="w-1 h-1 bg-sky-400 rounded-full mt-2 shrink-0" />
                                    {tip}
                                </li>
                            ))}
                        </ul>
                      </div>
                      <div className="p-8 bg-emerald-50 rounded-[40px] border border-emerald-100 italic text-center">
                        <p className="text-xs text-eco-green font-medium">"Narasi & visual yang baik tidak hanya menjual tempat, tapi juga menjual makna dan pengalaman."</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-sky-50 flex flex-col md:flex-row items-center justify-between gap-8">
                  <p className="text-xs text-slate-400 font-light italic">Dibuat dengan bantuan Inteligensia Buatan untuk Efisiensi Pemasaran.</p>
                  <button className="px-10 py-5 bg-eco-blue text-white rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-sky-700 transition-all shadow-xl shadow-sky-900/10">
                    Salin Semua Konten
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!response && !imageUrl && !isLoading && !isGeneratingImage && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {suggestions.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => setInput(suggestion)}
              className="p-8 bg-white border border-sky-50 rounded-[32px] text-left hover:bg-sky-50 hover:shadow-xl transition-all text-slate-500 text-sm font-light italic"
            >
              "{suggestion}"
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
