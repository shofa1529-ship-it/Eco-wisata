import React from 'react';
import { ShieldCheck, Leaf, Waves, Sun, Heart, Info, ArrowRight } from 'lucide-react';

export default function Sustainability() {
  const pillars = [
    { 
      title: 'Konservasi Air', 
      desc: 'Penggunaan sistem tadah hujan dan bio-pori di setiap akomodasi untuk menjaga cadangan air tanah.',
      icon: Waves,
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      title: 'Energi Terbarukan', 
      desc: 'Pemanfaatan panel surya dan mikro-hidro dari aliran sungai desa untuk penerangan jalan umum.',
      icon: Sun,
      color: 'bg-orange-50 text-orange-600'
    },
    { 
      title: 'Biodiversitas', 
      desc: 'Perlindungan flora fauna endemik dengan melarang perburuan dan pembukaan lahan hutan lindung.',
      icon: Leaf,
      color: 'bg-emerald-50 text-emerald-600'
    },
    { 
      title: 'Ekonomi Inklusif', 
      desc: 'Memastikan 70% keuntungan wisata dikelola kembali untuk pengembangan pendidikan dan kesehatan warga.',
      icon: Heart,
      color: 'bg-red-50 text-red-600'
    },
  ];

  return (
    <div className="space-y-16">
      <div className="flex flex-col gap-2 mb-8">
        <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-stone-500 block">Etika & Konservasi</span>
        <h1 className="text-5xl font-serif font-light italic text-editorial-text">Keberlanjutan.</h1>
        <p className="text-stone-500 font-light text-lg">Menjaga Integritas Ekologis & Kesejahteraan Sosial Budaya.</p>
      </div>

      <div className="bg-white p-12 lg:p-20 rounded-[80px] border border-black/5 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <h2 className="text-5xl lg:text-7xl font-serif font-light mb-12 italic leading-[0.95] text-editorial-text tracking-tighter">
            "Kita tidak mewarisi bumi, <span className="font-bold not-italic">kita meminjamnya."</span>
          </h2>
          <p className="text-stone-500 leading-relaxed text-xl font-light mb-12 max-w-2xl">
            Eco-tourism di desa kami dibangun di atas pilar regeneratif—di mana setiap kunjungan wisatawan memberikan kontribusi positif bagi pemulihan ekosistem dan penguatan identitas lokal.
          </p>
          <div className="flex flex-wrap gap-8 items-center pt-8 border-t border-black/5">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest font-sans font-bold text-stone-400">Sertifikasi</span>
              <p className="font-serif italic text-lg">Green Village Standard</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest font-sans font-bold text-stone-400">Fokus Lokal</span>
              <p className="font-serif italic text-lg">Native Empowerment</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest font-sans font-bold text-stone-400">Limbah</span>
              <p className="font-serif italic text-lg">Circular Efficiency</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/3 hidden xl:block border-l border-black/5 grayscale opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop" 
            alt="Leaf macro" 
            className="h-full w-full object-cover transition-transform duration-1000 hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 py-12 border-b border-black/5">
        {pillars.map((pillar, i) => (
          <div key={i} className="flex gap-8 group">
            <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-stone-400 group-hover:bg-editorial-accent group-hover:text-white transition-all shrink-0">
              <pillar.icon size={20} strokeWidth={1} />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-medium mb-3 italic">{pillar.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed font-light">{pillar.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-editorial-text rounded-[40px] p-12 lg:p-16 text-white overflow-hidden relative">
        <div className="flex flex-col lg:flex-row gap-16 items-center relative z-10">
          <div className="flex-1">
            <span className="text-[10px] uppercase tracking-[0.4em] font-sans opacity-40 mb-6 block">Etika Kunjungan</span>
            <h3 className="text-4xl font-serif font-light mb-8 italic leading-tight">Kode Etik Wisatawan.</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-stone-400">
              <p className="text-sm font-light leading-relaxed border-l border-white/10 pl-6">Hormati batas suci area adat dan mintalah izin sebelum mendokumentasikan wajah penduduk lokal.</p>
              <p className="text-sm font-light leading-relaxed border-l border-white/10 pl-6">Minimalisir penggunaan plastik sekali pakai dan pastikan sampah Anda dibuang di tempat yang sesuai.</p>
              <p className="text-sm font-light leading-relaxed border-l border-white/10 pl-6">Gunakan jasa pemandu lokal bersertifikat untuk mendapatkan narasi sejarah yang autentik.</p>
              <p className="text-sm font-light leading-relaxed border-l border-white/10 pl-6">Jangan menghapus, mengambil, atau merusak flora-fauna yang menjadi kekayaan ekologis desa.</p>
            </div>
          </div>
          <div className="w-full lg:w-fit shrink-0">
            <button className="w-full lg:w-auto px-10 py-5 bg-white text-editorial-text rounded-full font-sans text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-stone-100 transition-all shadow-2xl flex items-center justify-center gap-3">
              Unduh Buku Panduan <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-white/5 rounded-full blur-3xl opacity-20" />
      </div>
    </div>
  );
}
