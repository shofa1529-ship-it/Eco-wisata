import React from 'react';
import { ArrowRight, MapPin, Star, Users, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const highlights = [
    { title: 'Potensi Alam', desc: 'Hutan lindung & air terjun tersembunyi.', icon: Leaf, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Budaya Lokal', desc: 'Warisan leluhur yang tetap terjaga.', icon: Users, color: 'text-sky-500', bg: 'bg-sky-50' },
    { title: 'Akomodasi Hijau', desc: 'Penginapan ramah lingkungan.', icon: MapPin, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-24">
      {/* Editorial Header */}
      <section id="hero-main" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="col-span-12 lg:col-span-7 space-y-10">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.5em] font-sans text-emerald-600 font-bold block">Desa Wisata Berkelanjutan</span>
            <h1 className="text-6xl lg:text-9xl leading-[0.85] font-light italic text-slate-900 tracking-tighter">
              Harmoni Alam <br />
              <span className="font-bold not-italic text-eco-green">Digital Sentris.</span>
            </h1>
          </div>
          <p className="text-xl text-slate-500 max-w-xl font-light leading-relaxed">
            Pusaka hijau yang terjaga melalui integrasi kearifan lokal dan kecerdasan buatan untuk masa depan yang regeneratif.
          </p>
          <div className="flex flex-wrap gap-6">
            <button 
              onClick={() => onNavigate('ai')}
              className="px-10 py-5 bg-eco-green text-white rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200"
            >
              Mulai Konsultasi AI
            </button>
            <button 
              onClick={() => onNavigate('sustainability')}
              className="px-10 py-5 bg-white border border-emerald-100 text-eco-green rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-sm"
            >
              Laporan Keberlanjutan
            </button>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5 relative">
          <div className="aspect-[4/5] w-full rounded-[80px] overflow-hidden shadow-2xl skew-y-2 group">
            <img 
              src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop" 
              alt="Indonesian landscape"
              className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-emerald-900/10 mix-blend-overlay" />
          </div>
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full glass flex items-center justify-center text-center p-6 border-emerald-100/50">
            <span className="text-[10px] font-sans font-black uppercase tracking-widest leading-tight text-emerald-800 italic">Net Zero <br />Village 2026</span>
          </div>
        </div>
      </section>

      {/* Potentials Grid */}
      <section id="potentials-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {highlights.map((item, idx) => (
          <div key={idx} className="bg-white p-10 rounded-[48px] border border-emerald-50 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500 group">
            <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform`}>
              <item.icon size={24} />
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-300 mb-4 block">Potensi {idx + 1}</p>
            <h3 className="text-3xl font-serif font-medium mb-4 italic text-slate-900">{item.title}</h3>
            <p className="text-base text-slate-500 leading-relaxed font-light">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Inspirational Destinations Section */}
      <section id="inspirational-destinations" className="space-y-12 py-12 border-t border-emerald-50">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div className="max-w-xl text-left">
            <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-emerald-600 font-bold mb-4 block">Destinasi Inspiratif</span>
            <h2 className="text-5xl font-serif font-light italic leading-tight text-slate-900">Mercusuar Keberhasilan Nasional.</h2>
          </div>
          <p className="text-slate-500 font-light text-base max-w-sm leading-relaxed">
            Mempelajari sinergi antara pariwisata modern dan akar budaya di desa-desa visioner Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { name: "Desa Penglipuran", loc: "Bali", img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop" },
            { name: "Desa Waerebo", loc: "NTT", img: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=1000&auto=format&fit=crop" },
            { name: "Desa Nglanggeran", loc: "Yogyakarta", img: "https://images.unsplash.com/photo-1596402184320-417d7178b2cd?q=80&w=1000&auto=format&fit=crop" },
            { name: "Desa Sade", loc: "Lombok", img: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1000&auto=format&fit=crop" },
            { name: "Desa Pujon Kidul", loc: "Malang", img: "https://images.unsplash.com/photo-1627435133604-093467475727?q=80&w=1000&auto=format&fit=crop" }
          ].map((village, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -12 }}
              className="group relative h-96 rounded-[48px] overflow-hidden shadow-xl"
            >
              <img 
                src={village.img} 
                alt={village.name}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2 block">{village.loc}</span>
                <h4 className="text-white font-serif italic text-2xl leading-none">{village.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sustainable Scoreboard */}
      <section id="scoreboard-modern" className="bg-white rounded-[64px] p-12 lg:p-20 border border-emerald-50 shadow-2xl shadow-emerald-900/5 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
        <div className="relative z-10 flex-1">
          <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-emerald-600 font-bold mb-6 block">Kinerja Ekosistem</span>
          <h2 className="text-5xl font-serif font-light italic mb-10 leading-tight text-slate-900">Pelestarian Sumber Daya <br />Secara Presisi.</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { label: 'Indeks SDA', val: '0.94', color: 'text-emerald-500' },
              { label: 'Efisensi Sampah', val: '88%', color: 'text-sky-500' },
              { label: 'Status Desa', val: 'Mandiri', color: 'text-emerald-500' },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">{stat.label}</p>
                <p className={`text-4xl font-serif font-medium italic ${stat.color}`}>{stat.val}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative group">
           <div className="w-56 h-56 bg-emerald-50 rounded-full border border-emerald-100 flex flex-col items-center justify-center text-center p-8">
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-2">Sirkularitas</span>
              <div className="text-6xl font-serif font-bold text-emerald-600 italic">92<span className="text-xl">%</span></div>
              <p className="text-[9px] font-sans text-slate-400 font-bold tracking-widest mt-4 uppercase">Optimal Progress</p>
           </div>
        </div>
      </section>
    </div>
  );
}
