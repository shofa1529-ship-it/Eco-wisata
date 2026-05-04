import React, { useState } from 'react';
import { 
  UserRound, Plus, Search, MoreVertical, 
  Bot, Send, Loader2, Sparkles, Network, 
  AlertCircle,
  Users, Briefcase, GraduationCap,
  BadgeCheck, Calendar, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { getConsultation, generateAIImage } from '../services/geminiService';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: 'Operasional' | 'Marketing' | 'Keamanan' | 'Edukasi';
  status: 'Aktif' | 'Izin' | 'Off';
  joinedDate: string;
  performance: number; // 0-100
}

export default function HRManagement() {
  const [members] = useState<StaffMember[]>([
    { id: '1', name: 'Ahmad Subarjo', role: 'Koordinator Lapangan', department: 'Operasional', status: 'Aktif', joinedDate: '2023-01-12', performance: 92 },
    { id: '2', name: 'Siti Aminah', role: 'Social Media Specialist', department: 'Marketing', status: 'Aktif', joinedDate: '2023-05-20', performance: 88 },
    { id: '3', name: 'Budi Santoso', role: 'Ranger Hutan', department: 'Keamanan', status: 'Aktif', joinedDate: '2022-11-05', performance: 95 },
    { id: '4', name: 'Dewi Lestari', role: 'Pemandu Edukasi', department: 'Edukasi', status: 'Izin', joinedDate: '2023-08-15', performance: 85 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [errorAI, setErrorAI] = useState<string | null>(null);

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAIConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim() || isLoadingAI) return;

    setIsLoadingAI(true);
    setAiResponse(null);
    setErrorAI(null);
    setImageUrl(null);

    const fullPrompt = `
      Anda adalah Ahli Pengembangan SDM dan Pemberdayaan Komunitas untuk Desa Wisata (Sustainable Tourism).
      Diberikan konteks desa wisata yang ingin berdaya secara organik.
      
      Berikan strategi komprehensif terkait permintaan user: "${aiPrompt}"
      
      Output harus sangat terstruktur menggunakan Markdown:
      1. **Struktur Organisasi Visioner**: Rekomendasi peran penting (misal: Chief Eco Officer, Community Liaison).
      2. **Peta Jalan Pemberdayaan**: Langkah 1-2-3 untuk mengajak warga lokal dari penonton menjadi penggerak.
      3. **Strategi Manajemen Organik**: Bagaimana mengelola tim tanpa menghilangkan kekeluargaan desa.
      4. **Indikator Keberhasilan (KPI)**: Apa yang harus diukur untuk memastikan SDM berkembang.
      
      Gunakan bahasa yang menginspirasi, puitis namun pragmatis. Hindari bahasa korporat yang kaku.
    `;

    try {
      const result = await getConsultation(fullPrompt);
      setAiResponse(result);
      
      // Generate org chart concept or visualization
      setIsGeneratingImage(true);
      const img = await generateAIImage(aiPrompt, 'hr');
      setImageUrl(img);
    } catch (err: any) {
      console.error(err);
      setErrorAI(err.message || "Maaf, inteligensia kami sedang mengalami gangguan sinkronisasi dengan kearifan lokal. Mohon coba lagi.");
    } finally {
      setIsLoadingAI(false);
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-emerald-100 pb-12">
        <div className="flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-[0.5em] font-sans text-emerald-600 font-bold block">Human Capital & Community Empowerment</span>
          <h1 className="text-5xl font-serif font-light italic text-slate-900 leading-tight tracking-tighter">Arsitektur <span className="text-eco-green">Insani.</span></h1>
          <p className="text-slate-500 font-light text-xl max-w-xl">Mengelola potensi manusia dengan sentuhan teknologi dan akar budaya yang kuat.</p>
        </div>
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-eco-green shadow-lg shadow-emerald-100 flex-shrink-0 animate-bounce-slow">
           <UserRound size={32} strokeWidth={1.5} />
        </div>
      </div>

      {/* AI HR Strategist Card - The "Attractive" Section */}
      <section className="bg-white rounded-[64px] border border-emerald-50 p-12 lg:p-20 shadow-2xl shadow-emerald-900/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/30 -skew-x-12 transform translate-x-20 group-hover:translate-x-10 transition-transform duration-1000" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-eco-blue">
                  <Bot size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-sans font-bold text-slate-400">Konsultan SDM Organik</span>
              </div>
              <h2 className="text-5xl font-serif font-light italic text-slate-900 leading-tight">
                Berdayakan <br />
                <span className="text-eco-blue">Garda Depan Desa.</span>
              </h2>
              <p className="text-slate-500 font-light text-lg leading-relaxed">
                Rancang struktur organisasi yang lincah dan strategi pemberdayaan warga yang tulus bersama asisten AI kami.
              </p>
            </div>

            <form onSubmit={handleAIConsult} className="relative">
              <textarea 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Tulis kendala manajemen atau rencana struktur... (misal: Struktur BUMDes yang inklusif)"
                className="w-full min-h-[160px] p-8 bg-slate-50 rounded-[40px] border-none focus:ring-2 focus:ring-eco-blue text-slate-900 placeholder:text-slate-300 resize-none transition-all font-light text-lg leading-relaxed shadow-inner"
              />
              <button 
                type="submit"
                disabled={isLoadingAI || !aiPrompt.trim()}
                className="absolute bottom-6 right-6 p-4 bg-eco-blue text-white rounded-full disabled:opacity-50 hover:scale-110 active:scale-95 transition-all shadow-xl shadow-sky-900/20"
              >
                {isLoadingAI ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
              </button>
            </form>

            {errorAI && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-6 bg-red-50 border border-red-100 rounded-[32px] flex items-center gap-4 text-red-600"
              >
                <AlertCircle size={24} className="shrink-0" />
                <p className="text-sm font-light italic">{errorAI}</p>
              </motion.div>
            )}

            <div className="flex flex-wrap gap-3">
              {['SOP Lokal', 'Struktur BUMDes', 'Pelatihan Relawan', 'Inklusivitas'].map((label) => (
                <button 
                  key={label}
                  onClick={() => setAiPrompt(`Bagaimana cara membuat ${label} yang efektif untuk desa wisata?`)}
                  className="px-6 py-3 bg-white border border-emerald-50 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {(isLoadingAI || isGeneratingImage) && !aiResponse && !imageUrl ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="h-full min-h-[500px] bg-slate-50/50 rounded-[56px] border border-dashed border-emerald-100 flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="relative mb-8">
                    <Loader2 size={64} className="animate-spin text-eco-blue opacity-20" />
                    <Bot size={32} className="absolute inset-0 m-auto text-eco-blue" />
                  </div>
                  <h3 className="font-serif italic text-2xl text-eco-blue mb-2">
                    {isGeneratingImage ? "Memvisualisasikan Organisasi..." : "Merangkai Visi Insani..."}
                  </h3>
                  <p className="text-sm text-slate-400 font-light italic">Menganalisis matriks sosial dan potensi komunitas desa anda.</p>
                </motion.div>
              ) : (aiResponse || imageUrl) ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full space-y-8"
                >
                  {imageUrl && (
                    <div className="bg-white p-4 rounded-[48px] border border-emerald-50 shadow-2xl relative overflow-hidden group">
                      <img src={imageUrl} alt="AI Org Visualization" className="w-full h-auto rounded-[36px] shadow-sm transform transition-transform duration-1000" />
                      <div className="absolute top-10 left-10 py-2 px-6 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold tracking-[0.2em] text-emerald-600 shadow-sm">
                         STRUKTUR & VISI VISUAL AI
                      </div>
                    </div>
                  )}
                  {aiResponse && (
                    <div className="bg-white p-12 lg:p-16 rounded-[56px] border border-emerald-50 shadow-inner overflow-hidden flex flex-col min-h-[400px]">
                      <div className="flex items-center justify-between mb-10 pb-6 border-b border-emerald-50">
                        <div className="flex items-center gap-3">
                          <Sparkles size={20} className="text-emerald-500" />
                          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-slate-900">Blueprint Strategi SDM</span>
                        </div>
                      </div>
                      <div className="markdown-body prose prose-slate max-w-none flex-1 overflow-y-auto pr-4 custom-scrollbar text-slate-700 prose-headings:font-serif prose-headings:italic prose-strong:text-eco-green">
                        <Markdown>{aiResponse}</Markdown>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="h-full min-h-[500px] bg-slate-50/50 rounded-[56px] border border-emerald-50 flex flex-col items-center justify-center text-center p-12 space-y-8">
                   <div className="w-24 h-24 bg-white shadow-xl rounded-[32px] flex items-center justify-center text-slate-200 -rotate-6">
                      <GraduationCap size={48} strokeWidth={1} />
                   </div>
                   <div className="space-y-3">
                      <p className="text-slate-400 font-light italic text-xl leading-relaxed max-w-sm">
                        "Organisasi yang kuat lahir dari visi yang jernih. Mulailah dialog strategi SDM Anda di sini."
                      </p>
                      <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">Teknologi Gemini 1.5 Flash</p>
                   </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Stats and Table Section */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold">Dashboard Operasional</span>
            <h3 className="text-4xl font-serif italic text-slate-900 leading-tight">Pantau Keaktifan <br />Garda Depan.</h3>
          </div>
          <button className="px-10 py-5 bg-eco-green text-white rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/10 flex items-center gap-3">
             <Plus size={18} /> Daftarkan Anggota Baru
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Keterlibatan Lokal', val: '92%', color: 'text-emerald-500' },
            { label: 'Tim Terdaftar', val: members.length, color: 'text-sky-500' },
            { label: 'Relawan Aktif', val: '24', color: 'text-emerald-500' },
            { label: 'Rerata Kinerja', val: '88.5', color: 'text-sky-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[48px] border border-emerald-50 shadow-sm hover:shadow-xl transition-all duration-500 group">
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-300 mb-4 group-hover:text-emerald-400 transition-colors">{stat.label}</p>
              <p className={`text-5xl font-serif italic font-medium ${stat.color}`}>{stat.val}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[64px] border border-emerald-50 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-emerald-50 bg-slate-50/30 flex items-center justify-between gap-8">
             <div className="relative flex-1 max-w-md">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input 
                  type="text"
                  placeholder="Cari nama staff atau divisi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-8 py-4 bg-white border border-emerald-100 rounded-full focus:ring-2 focus:ring-eco-green text-sm transition-all"
                />
             </div>
             <div className="flex gap-4">
                {['Filter', 'Export'].map((btn) => (
                  <button key={btn} className="px-6 py-3 bg-white border border-emerald-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:bg-emerald-50 transition-all">
                    {btn}
                  </button>
                ))}
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-emerald-50 text-[10px] uppercase tracking-widest text-slate-300 font-bold font-sans">
                  <th className="px-12 py-8">Anggota Tim</th>
                  <th className="px-12 py-8">Departemen</th>
                  <th className="px-12 py-8">Status</th>
                  <th className="px-12 py-8">Integritas Kerja</th>
                  <th className="px-12 py-8">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="group hover:bg-slate-50 transition-colors border-b border-emerald-50/50">
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-eco-green font-serif italic text-2xl font-bold group-hover:rotate-6 transition-transform">
                           {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-serif italic text-xl text-slate-900 leading-none mb-2">{member.name}</p>
                          <p className="text-sm text-slate-400 font-light">{member.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-10 text-base text-slate-500 font-light italic">{member.department}</td>
                    <td className="px-12 py-10">
                      <span className={`px-5 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest ${
                        member.status === 'Aktif' ? 'bg-emerald-50 text-eco-green' : 'bg-rose-50 text-rose-500'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-6">
                         <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${member.performance}%` }}
                              className="h-full bg-eco-green" 
                            />
                         </div>
                         <span className="text-lg font-serif italic font-medium text-emerald-600">{member.performance}%</span>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <button className="p-4 bg-white border border-emerald-100 rounded-2xl text-slate-300 hover:text-eco-green hover:border-eco-green transition-all">
                         <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

