import React from 'react';
import { AlertTriangle, Map, PhoneCall, ShieldCheck, Siren, Info } from 'lucide-react';

export default function DisasterMitigation() {
  const alerts = [
    { type: 'Info', message: 'Cuaca cerah berawan untuk 24 jam ke depan.', time: '10 menit yang lalu', status: 'normal' },
    { type: 'Peringatan', message: 'Waspada potensi angin kencang di area perbukitan.', time: '2 jam yang lalu', status: 'warning' },
  ];

  const guides = [
    { title: 'Jalur Evakuasi', desc: 'Denah jalur evakuasi menuju area terbuka di balai desa.', icon: Map },
    { title: 'Nomor Darurat', desc: 'Daftar kontak tim SAR lokal, Puskesmas, dan BPBD.', icon: PhoneCall },
    { title: 'Tanda Peringatan', desc: 'Edukasi mengenali bunyi sirine dan sistem alarm.', icon: Siren },
    { title: 'Perlengkapan', desc: 'Daftar barang mustahil ditinggalkan saat keadaan darurat.', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2 mb-8">
        <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-stone-500 block">Resiliensi & Mitigasi</span>
        <h1 className="text-5xl font-serif font-light italic text-editorial-text">Sistem Siaga Desa.</h1>
        <p className="text-stone-500 font-light text-lg">Pemantauan Lingkungan Real-time & Protokol Keselamatan Terpadu.</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Real-time Alerts - Dark Editorial Module */}
        <div className="col-span-12 lg:col-span-5">
          <div className="bg-editorial-text text-white rounded-[40px] p-10 h-full flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                </div>
                <p className="text-[10px] font-sans uppercase tracking-[0.3em] opacity-60">Status: Aman & Terkendali</p>
              </div>
              
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-sans opacity-40 mb-4">Peringatan Aktif</p>
                  <div className="space-y-4">
                    {alerts.map((alert, i) => (
                      <div key={i} className="flex gap-4 items-start border-b border-white/10 pb-4">
                        <div className={`w-2 h-2 mt-1.5 rounded-full ${alert.status === 'warning' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                        <div>
                          <p className="text-lg font-light leading-snug">{alert.message}</p>
                          <span className="text-[9px] uppercase tracking-widest opacity-40 block mt-1">{alert.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[9px] font-sans opacity-50 uppercase tracking-widest mb-1">Curah Hujan</p>
                <p className="text-xl font-medium">12mm <span className="text-[10px] opacity-30 ml-1">Rendah</span></p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[9px] font-sans opacity-50 uppercase tracking-widest mb-1">Angin</p>
                <p className="text-xl font-medium">8 km/h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Guides - Editorial Cards */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {guides.map((guide, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] border border-black/5 group hover:bg-stone-50 transition-all cursor-default">
                <div className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center text-stone-400 mb-6 group-hover:border-editorial-accent group-hover:text-editorial-accent transition-all">
                  <guide.icon size={18} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-serif font-medium mb-3 italic">{guide.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed font-light">{guide.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#F2F1EC] p-10 rounded-[40px] border border-black/5 flex flex-col md:flex-row items-center gap-8">
             <div className="flex-1">
                <h3 className="text-xs uppercase font-sans font-bold tracking-[0.2em] mb-4 text-editorial-accent">Protokol Evakuasi</h3>
                <p className="text-lg font-serif italic text-stone-700 leading-relaxed">
                  "Keselamatan anda adalah prioritas kami. Pastikan anda memahami tata letak desa dan mengenali tanda-tanda peringatan alam."
                </p>
             </div>
             <button className="px-8 py-4 bg-editorial-text text-white rounded-full font-sans text-[10px] uppercase font-bold tracking-[0.3em] shrink-0 hover:bg-black/80 transition-all">
               Hubungi Satgas
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
