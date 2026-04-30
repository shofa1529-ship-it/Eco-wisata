import React from 'react';
import { Trash2, Recycle, Leaf, TrendingDown, BarChart3, ArrowUpRight } from 'lucide-react';

export default function WasteManagement() {
  const stats = [
    { label: 'Organik', value: '1.2 ton', trend: '-5%', icon: Leaf, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Plastik', value: '450 kg', trend: '-12%', icon: Recycle, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Unsorted', value: '120 kg', trend: '-20%', icon: Trash2, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2 mb-8">
        <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-stone-500 block">Sirkularitas & Ekologi</span>
        <h1 className="text-5xl font-serif font-light italic text-editorial-text">Pengelolaan Sampah.</h1>
        <p className="text-stone-500 font-light text-lg">Konversi Limbah Menjadi Nilai Manfaat bagi Komunitas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black/5 rounded-[40px] overflow-hidden bg-white">
        {stats.map((stat, i) => (
          <div key={i} className={`p-10 ${i !== 2 ? 'border-b md:border-b-0 md:border-r border-black/5' : ''} hover:bg-stone-50 transition-colors group`}>
            <div className="flex justify-between items-start mb-10">
              <div className={`w-10 h-10 border border-black/10 rounded-full flex items-center justify-center text-stone-400 group-hover:border-editorial-accent group-hover:text-editorial-accent transition-all`}>
                <stat.icon size={18} strokeWidth={1} />
              </div>
              <div className="text-[10px] font-sans font-bold text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">
                {stat.trend} Efficient
              </div>
            </div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-sans text-stone-400 mb-2 block">{stat.label}</p>
            <h3 className="text-5xl font-serif font-medium text-editorial-text italic">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12">
          <div className="bg-[#F2F1EC] p-12 rounded-[40px] border border-black/5 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="text-xs uppercase font-sans font-bold tracking-[0.2em] mb-6 text-editorial-accent">Metode Pengolahan</h3>
                <h2 className="text-4xl font-serif font-light italic leading-tight">Mewujudkan Desa<br />Wisata Zero-Waste.</h2>
              </div>
              <p className="text-stone-500 font-light text-sm max-w-xs leading-relaxed">
                Setiap gram sampah dikelola melalui sistem sirkular yang terukur untuk menjaga kesehatan ekosistem desa.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 border-t border-black/5 text-editorial-text">
              <div className="space-y-4">
                <div className="flex justify-between font-serif text-xl italic font-medium">
                  <span>Composting</span>
                  <span className="text-sm font-sans not-italic text-stone-400">75%</span>
                </div>
                <div className="h-[1px] w-full bg-black/10 relative">
                  <div className="absolute top-0 left-0 h-full w-3/4 bg-editorial-accent" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between font-serif text-xl italic font-medium">
                  <span>Recycle Bank</span>
                  <span className="text-sm font-sans not-italic text-stone-400">20%</span>
                </div>
                <div className="h-[1px] w-full bg-black/10 relative">
                  <div className="absolute top-0 left-0 h-full w-1/5 bg-editorial-accent" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between font-serif text-xl italic font-medium">
                  <span>Energy (RDF)</span>
                  <span className="text-sm font-sans not-italic text-stone-400">5%</span>
                </div>
                <div className="h-[1px] w-full bg-black/10 relative">
                  <div className="absolute top-0 left-0 h-full w-[5%] bg-editorial-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
