import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TreePine, 
  Bot, 
  AlertTriangle, 
  Trash2, 
  Calendar, 
  ShieldCheck,
  Menu,
  X,
  ChevronRight,
  Leaf,
  Megaphone,
  UserRound
} from 'lucide-react';

// Components
import Hero from './components/Hero';
import AIConsultant from './components/AIConsultant';
import DisasterMitigation from './components/DisasterMitigation';
import WasteManagement from './components/WasteManagement';
import ActivityManager from './components/ActivityManager';
import Sustainability from './components/Sustainability';
import PromotionAI from './components/PromotionAI';
import HRManagement from './components/HRManagement';

type Section = 'home' | 'ai' | 'disaster' | 'waste' | 'activities' | 'sustainability' | 'promo' | 'hr';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Beranda', icon: TreePine },
    { id: 'ai', label: 'Konsultan AI', icon: Bot },
    { id: 'promo', label: 'Promosi AI', icon: Megaphone },
    { id: 'hr', label: 'Manajemen SDM', icon: UserRound },
    { id: 'disaster', label: 'Mitigasi Bencana', icon: AlertTriangle },
    { id: 'waste', label: 'Pengelolaan Sampah', icon: Trash2 },
    { id: 'activities', label: 'Manajemen Kegiatan', icon: Calendar },
    { id: 'sustainability', label: 'Keberlanjutan SDA', icon: ShieldCheck },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'home': return <Hero onNavigate={(s) => setActiveSection(s as Section)} />;
      case 'ai': return <AIConsultant />;
      case 'promo': return <PromotionAI />;
      case 'hr': return <HRManagement />;
      case 'disaster': return <DisasterMitigation />;
      case 'waste': return <WasteManagement />;
      case 'activities': return <ActivityManager />;
      case 'sustainability': return <Sustainability />;
      default: return <Hero onNavigate={(s) => setActiveSection(s as Section)} />;
    }
  };

  return (
    <div className="min-h-screen flex text-eco-text bg-eco-bg selection:bg-emerald-100 font-sans">
      {/* Mobile Menu Toggle */}
      <button 
        id="mobile-menu-toggle"
        className="lg:hidden fixed top-6 right-6 z-50 p-3 bg-white rounded-2xl shadow-xl border border-emerald-100 flex items-center justify-center text-eco-green"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-80 bg-white border-r border-emerald-50 
        transform transition-transform duration-500 ease-in-out shadow-2xl lg:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-10 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-16 group cursor-pointer">
            <div className="w-12 h-12 bg-eco-green rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 group-hover:rotate-12 transition-transform duration-500">
               <Leaf size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-black text-eco-green italic tracking-tighter leading-none">EcoSustain</h1>
              <p className="text-[9px] uppercase tracking-editorial font-bold text-emerald-800 opacity-40">Consulting & AI</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  setActiveSection(item.id as Section);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300
                  text-[11px] uppercase font-bold tracking-widest
                  ${activeSection === item.id 
                    ? 'bg-emerald-50 text-eco-green shadow-sm' 
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <div className={`transition-colors ${activeSection === item.id ? (item.id === 'ai' ? 'text-eco-blue' : 'text-eco-green') : 'text-slate-300'}`}>
                  <item.icon size={20} strokeWidth={activeSection === item.id ? 2 : 1.5} />
                </div>
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <motion.div layoutId="dot" className={`ml-auto w-1.5 h-1.5 rounded-full ${item.id === 'ai' ? 'bg-eco-blue' : 'bg-eco-green'}`} />
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-10 border-t border-emerald-50">
            <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-50 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-emerald-800 opacity-40 block">Village Index</span>
              <div className="text-4xl font-serif italic text-eco-green">0.94<span className="text-xs font-sans not-italic text-slate-400 ml-2">/1.00</span></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[9px] font-sans text-emerald-800 uppercase tracking-widest font-black">Mandiri Lestari</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto bg-eco-bg relative custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="p-10 lg:p-16 max-w-7xl mx-auto"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
