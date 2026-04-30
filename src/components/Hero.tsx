import React from 'react';
import { ArrowRight, MapPin, Star, Users, Leaf } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const highlights = [
    { title: 'Potensi Alam', desc: 'Hutan lindung & air terjun tersembunyi.', icon: Leaf },
    { title: 'Budaya Lokal', desc: 'Warisan leluhur yang tetap terjaga.', icon: Users },
    { title: 'Akomodasi Hijau', desc: 'Penginapan ramah lingkungan.', icon: MapPin },
  ];

  return (
    <div className="space-y-16">
      {/* Editorial Header */}
      <section id="hero-editorial" className="grid grid-cols-12 gap-8 border-b border-black/5 pb-16">
        <div className="col-span-12 lg:col-span-7">
          <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-stone-500 mb-6 block">Desa Wisata Berkelanjutan</span>
          <h1 className="text-6xl lg:text-8xl leading-[0.85] font-light mb-12 italic text-editorial-text tracking-tighter">
            Harmoni Alam <br />
            <span className="font-bold not-italic">Nusantara.</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-xl font-light leading-relaxed mb-12">
            Pusaka hijau yang terjaga melalui integrasi kearifan lokal dan kecerdasan buatan untuk masa depan yang regeneratif.
          </p>
          <div className="flex flex-wrap gap-6">
            <button 
              onClick={() => onNavigate('ai')}
              className="px-10 py-4 bg-editorial-accent text-white rounded-full font-sans text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-olive-600 transition-all shadow-xl shadow-olive-900/10"
            >
              Mulai Konsultasi AI
            </button>
            <button 
              onClick={() => onNavigate('sustainability')}
              className="px-10 py-4 bg-transparent border border-black/10 text-editorial-text rounded-full font-sans text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-black/5 transition-all"
            >
              Laporan Keberlanjutan
            </button>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 relative">
          <div className="h-[500px] w-full rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2070&auto=format&fit=crop" 
              alt="Indonesian Eco Village"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-white border border-black/5 flex items-center justify-center text-center p-4">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest leading-tight">Green Certified 2026</span>
          </div>
        </div>
      </section>

      {/* Local Potentials - Editorial Grid */}
      <section id="potentials-grid" className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black/5 rounded-[40px] overflow-hidden bg-white">
        {highlights.map((item, idx) => (
          <div key={idx} className={`p-10 ${idx !== 2 ? 'border-b md:border-b-0 md:border-r border-black/5' : ''} hover:bg-stone-50 transition-colors group cursor-default`}>
            <div className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center text-stone-400 mb-8 group-hover:bg-editorial-accent group-hover:text-white transition-all">
              <item.icon size={18} strokeWidth={1} />
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-sans text-stone-400 mb-4 block">Kategori {idx + 1}</p>
            <h3 className="text-3xl font-serif font-medium mb-3 italic">{item.title}</h3>
            <p className="text-sm text-stone-500 leading-relaxed font-light">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Sustainable Scoreboard - Dark Mode Integration */}
      <section id="scoreboard-editorial" className="bg-editorial-text rounded-[40px] p-12 lg:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-[10px] uppercase tracking-[0.4em] font-sans opacity-40 mb-6 block">Statistik Berkelanjutan</span>
          <h2 className="text-4xl lg:text-5xl font-serif font-light mb-4 italic leading-tight">Pelestarian Sumber<br />Daya Terukur.</h2>
          <p className="text-stone-400 font-light max-w-sm text-sm">
            Membangun ekosistem yang menyeimbangkan antara kenyamanan wisatawan dan integritas alam desa.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-12 lg:gap-24 text-left relative z-10">
          <div className="space-y-2">
            <span className="block text-5xl font-serif font-medium italic text-olive-300">88%</span>
            <span className="text-[9px] opacity-40 uppercase font-sans font-bold tracking-widest">Efisiensi Sampah</span>
          </div>
          <div className="space-y-2">
            <span className="block text-5xl font-serif font-medium italic text-olive-300">12</span>
            <span className="text-[9px] opacity-40 uppercase font-sans font-bold tracking-widest">Agenda Hari Ini</span>
          </div>
          <div className="space-y-2">
            <span className="block text-5xl font-serif font-medium italic text-olive-300">0.94</span>
            <span className="text-[9px] opacity-40 uppercase font-sans font-bold tracking-widest">Indeks SDA</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-olive-500/10 -skew-x-12 transform" />
      </section>
    </div>
  );
}
