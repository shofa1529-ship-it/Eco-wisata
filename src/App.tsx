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
  Leaf
} from 'lucide-react';

// Components
import Hero from './components/Hero';
import AIConsultant from './components/AIConsultant';
import DisasterMitigation from './components/DisasterMitigation';
import WasteManagement from './components/WasteManagement';
import ActivityManager from './components/ActivityManager';
import Sustainability from './components/Sustainability';

type Section = 'home' | 'ai' | 'disaster' | 'waste' | 'activities' | 'sustainability';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Beranda', icon: TreePine },
    { id: 'ai', label: 'Konsultan AI', icon: Bot },
    { id: 'disaster', label: 'Mitigasi Bencana', icon: AlertTriangle },
    { id: 'waste', label: 'Pengelolaan Sampah', icon: Trash2 },
    { id: 'activities', label: 'Manajemen Kegiatan', icon: Calendar },
    { id: 'sustainability', label: 'Keberlanjutan SDA', icon: ShieldCheck },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'home': return <Hero onNavigate={(s) => setActiveSection(s as Section)} />;
      case 'ai': return <AIConsultant />;
      case 'disaster': return <DisasterMitigation />;
      case 'waste': return <WasteManagement />;
      case 'activities': return <ActivityManager />;
      case 'sustainability': return <Sustainability />;
      default: return <Hero onNavigate={(s) => setActiveSection(s as Section)} />;
    }
  };

  return (
    <div className="min-h-screen flex text-editorial-text bg-editorial-bg selection:bg-olive-200">
      {/* Mobile Menu Toggle */}
      <button 
        id="mobile-menu-toggle"
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg border border-black/5"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-80 bg-editorial-bg border-r border-black/5 
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-10 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-8 h-8 bg-editorial-accent rounded-full" />
            <h1 className="text-xl font-sans font-bold tracking-[0.2em] uppercase text-editorial-text">EcoSustain</h1>
          </div>

          <nav className="flex-1 space-y-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  setActiveSection(item.id as Section);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 px-0 py-1 transition-all duration-300 border-b border-transparent
                  text-[10px] uppercase font-sans font-medium tracking-[0.25em]
                  ${activeSection === item.id 
                    ? 'text-editorial-accent border-editorial-accent/20' 
                    : 'text-stone-400 hover:text-editorial-text'}
                `}
              >
                <item.icon size={16} strokeWidth={activeSection === item.id ? 2.5 : 1.5} />
                <span className={activeSection === item.id ? 'font-bold' : ''}>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-10 border-t border-black/5">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-stone-500 block">Indeks Desa</span>
              <div className="text-4xl font-serif italic text-editorial-text">0.94<span className="text-sm font-sans not-italic text-stone-400 ml-2">/1.00</span></div>
              <p className="text-[10px] font-sans text-stone-500 uppercase tracking-widest bg-stone-100 py-1 px-3 rounded-full inline-block">
                Mandiri Lestari
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto bg-editorial-bg relative">
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
