import React from 'react';
import { Calendar, Clock, MapPin, Plus, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

export default function ActivityManager() {
  const activities = [
    { id: 1, title: 'Bersih Desa & Penanaman Bakau', time: '08:00 - 11:00', date: 'Besok', location: 'Pesisir Barat', status: 'upcoming', category: 'Ekologi' },
    { id: 2, title: 'Workshop Anyaman Bambu', time: '13:00 - 15:00', date: 'Besok', location: 'Rumah Budaya', status: 'upcoming', category: 'Budaya' },
    { id: 3, title: 'Penyemprotan Disinfektan Area Publik', time: '09:00 - 10:00', date: 'Kemarin', location: 'Area Wisata', status: 'completed', category: 'Kebersihan' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black/5 pb-12">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-stone-500 block">Operasional & Logistik</span>
          <h1 className="text-5xl font-serif font-light italic text-editorial-text">Agenda Desa.</h1>
          <p className="text-stone-500 font-light text-lg">Koordinasi Aktivitas Wisatawan & Program Lingkungan Rutin.</p>
        </div>
        <button className="flex items-center justify-center gap-3 px-10 py-4 bg-editorial-text text-white rounded-full font-sans text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-black/80 transition-all shadow-xl shadow-black/10">
          <Plus size={18} /> Tambah Agenda
        </button>
      </div>

      <div className="grid grid-cols-12 gap-12">
        {/* Calendar View - Minimal Editorial */}
        <div className="col-span-12 lg:col-span-4 border border-black/5 bg-white rounded-[40px] p-10 shadow-sm h-fit">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-serif font-medium italic text-2xl">Mei 2026</h3>
            <button className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center hover:bg-stone-50 transition-colors">
              <MoreHorizontal size={14} className="text-stone-400" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-sans font-bold text-stone-300 mb-6 uppercase tracking-widest">
            {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }).map((_, i) => (
              <div 
                key={i} 
                className={`aspect-square flex items-center justify-center text-sm rounded-full cursor-pointer transition-all
                  ${i + 1 === 15 ? 'bg-editorial-accent text-white font-bold' : 'hover:bg-stone-100 text-stone-600'}
                `}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-black/5">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-stone-400 block mb-4">Legenda</span>
            <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs font-light text-stone-500">
                    <div className="w-2 h-2 rounded-full bg-editorial-accent" /> Ekologi & Alam
                </div>
                <div className="flex items-center gap-3 text-xs font-light text-stone-500">
                    <div className="w-2 h-2 rounded-full border border-black/10" /> Budaya & Workshop
                </div>
            </div>
          </div>
        </div>

        {/* Activity List - Editorial Blocks */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <h2 className="text-xs uppercase font-sans font-bold tracking-[0.3em] text-stone-400 mb-8 border-b border-black/5 pb-4">Daftar Agenda Strategis</h2>
          <div className="space-y-4">
            {activities.map((activity, i) => (
              <motion.div 
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white p-8 rounded-[40px] border border-black/5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-8 group hover:bg-stone-50 transition-all"
              >
                <div className="flex gap-6">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border border-black/5 group-hover:border-editorial-accent transition-all ${activity.status === 'completed' ? 'bg-stone-50 text-stone-300' : 'text-editorial-accent'}`}>
                    {activity.status === 'completed' ? <CheckCircle2 size={24} strokeWidth={1} /> : <Clock size={24} strokeWidth={1} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-bold text-editorial-accent">{activity.category}</span>
                       <span className="w-1 h-1 rounded-full bg-stone-300" />
                       <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-stone-400 font-bold">{activity.date}</span>
                    </div>
                    <h3 className="font-serif font-medium text-3xl italic text-editorial-text transition-colors">{activity.title}</h3>
                    <div className="flex gap-6 mt-3">
                      <div className="flex items-center gap-2 text-xs font-light text-stone-400">
                        <Clock size={14} strokeWidth={1.5} /> {activity.time}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-light text-stone-400">
                        <MapPin size={14} strokeWidth={1.5} /> {activity.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 border border-black/10 rounded-full text-[10px] uppercase font-bold tracking-widest text-stone-500 hover:bg-white hover:border-black transition-all">Detail</button>
                  {activity.status !== 'completed' && (
                    <button className="px-6 py-3 bg-editorial-bg border border-black/5 rounded-full text-[10px] uppercase font-bold tracking-widest text-editorial-text hover:bg-stone-100 transition-all">Konfirmasi</button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="p-10 border border-black/5 rounded-[40px] bg-[#F2F1EC] text-center max-w-2xl mx-auto mt-12">
            <h3 className="font-serif font-medium text-2xl italic mb-3">Sinkronisasi Otomatis.</h3>
            <p className="text-sm font-light text-stone-500 leading-relaxed mb-6">Setiap agenda akan disinkronkan secara otomatis ke perangkat pengelola dan wisatawan melalui notifikasi cerdas 1 jam sebelum kegiatan.</p>
            <button className="font-sans font-bold text-[10px] uppercase tracking-[0.3em] text-editorial-accent border-b border-editorial-accent pb-1">Konfigurasi Notifikasi</button>
          </div>
        </div>
      </div>
    </div>
  );
}
