import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageSquareQuote, 
  LayoutDashboard, 
  Sliders, 
  BookOpen, 
  QrCode, 
  CreditCard, 
  HelpCircle,
  Menu, 
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'dashboard';
  setCurrentView: (view: 'landing' | 'dashboard') => void;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  activeSection,
  scrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top micro-announcement banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white text-xs py-1.5 px-4 text-center font-medium">
        <span className="inline-flex items-center gap-1.5">
          <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Baru</span>
          Integrasi Google Business Profile API & AI Engine Generasi 3.8 Flash telah aktif!
          <button 
            onClick={() => handleNavClick('generator')} 
            className="underline hover:text-emerald-100 ml-1 font-semibold inline-flex items-center gap-0.5"
          >
            Coba Live Generator <ChevronRight className="w-3 h-3" />
          </button>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setCurrentView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <MessageSquareQuote className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900">
                    Balas<span className="text-emerald-600">Ulasan</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    AI PRO
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 -mt-0.5 font-medium">Google Review Auto-Reply</p>
              </div>
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNavClick('generator')}
              className={`px-3 py-1.5 rounded-lg transition-colors hover:text-emerald-600 hover:bg-emerald-50/60 flex items-center gap-1.5 ${
                activeSection === 'generator' && currentView === 'landing' ? 'text-emerald-600 bg-emerald-50 font-semibold' : ''
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-500" />
              Generator AI
            </button>
            <button
              onClick={() => {
                setCurrentView('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors hover:text-emerald-600 hover:bg-emerald-50/60 flex items-center gap-1.5 ${
                currentView === 'dashboard' ? 'text-emerald-600 bg-emerald-50 font-semibold' : ''
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-slate-500" />
              Inbox Review
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">4</span>
            </button>
            <button
              onClick={() => handleNavClick('autopilot')}
              className={`px-3 py-1.5 rounded-lg transition-colors hover:text-emerald-600 hover:bg-emerald-50/60 flex items-center gap-1.5 ${
                activeSection === 'autopilot' && currentView === 'landing' ? 'text-emerald-600 bg-emerald-50 font-semibold' : ''
              }`}
            >
              <Sliders className="w-4 h-4 text-slate-500" />
              Auto-Pilot
            </button>
            <button
              onClick={() => handleNavClick('templates')}
              className={`px-3 py-1.5 rounded-lg transition-colors hover:text-emerald-600 hover:bg-emerald-50/60 flex items-center gap-1.5 ${
                activeSection === 'templates' && currentView === 'landing' ? 'text-emerald-600 bg-emerald-50 font-semibold' : ''
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              Template
            </button>
            <button
              onClick={() => handleNavClick('qr-booster')}
              className={`px-3 py-1.5 rounded-lg transition-colors hover:text-emerald-600 hover:bg-emerald-50/60 flex items-center gap-1.5 ${
                activeSection === 'qr-booster' && currentView === 'landing' ? 'text-emerald-600 bg-emerald-50 font-semibold' : ''
              }`}
            >
              <QrCode className="w-4 h-4 text-slate-500" />
              QR Booster
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className={`px-3 py-1.5 rounded-lg transition-colors hover:text-emerald-600 hover:bg-emerald-50/60 flex items-center gap-1.5 ${
                activeSection === 'pricing' && currentView === 'landing' ? 'text-emerald-600 bg-emerald-50 font-semibold' : ''
              }`}
            >
              <CreditCard className="w-4 h-4 text-slate-500" />
              Harga
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className={`px-3 py-1.5 rounded-lg transition-colors hover:text-emerald-600 hover:bg-emerald-50/60 flex items-center gap-1.5 ${
                activeSection === 'faq' && currentView === 'landing' ? 'text-emerald-600 bg-emerald-50 font-semibold' : ''
              }`}
            >
              <HelpCircle className="w-4 h-4 text-slate-500" />
              FAQ
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => {
                if (currentView === 'dashboard') {
                  setCurrentView('landing');
                } else {
                  setCurrentView('dashboard');
                }
              }}
              className="text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              {currentView === 'dashboard' ? 'Lihat Landing Page' : 'Buka Dashboard Live'}
            </button>

            <button
              onClick={() => handleNavClick('generator')}
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/30 transition-all flex items-center gap-1.5 hover:shadow-md hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Coba Gratis AI
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => {
                setCurrentView(currentView === 'dashboard' ? 'landing' : 'dashboard');
              }}
              className="p-1.5 rounded-md border border-slate-200 text-slate-600 text-xs font-medium flex items-center gap-1"
            >
              <LayoutDashboard className="w-4 h-4" />
              {currentView === 'dashboard' ? 'Web' : 'App'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => {
                setCurrentView('landing');
                setMobileMenuOpen(false);
              }}
              className={`py-2 px-3 rounded-lg text-xs font-bold text-center border ${
                currentView === 'landing' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              🌐 Landing Web
            </button>
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`py-2 px-3 rounded-lg text-xs font-bold text-center border ${
                currentView === 'dashboard' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              📊 App Dashboard (Inbox)
            </button>
          </div>

          <button
            onClick={() => handleNavClick('generator')}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 flex items-center gap-2 text-sm font-medium text-slate-700"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Generator Balasan AI
          </button>
          <button
            onClick={() => {
              setCurrentView('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 flex items-center justify-between text-sm font-medium text-slate-700"
          >
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-teal-600" />
              Inbox Ulasan Google Bisnisku
            </div>
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">4 Baru</span>
          </button>
          <button
            onClick={() => handleNavClick('autopilot')}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 flex items-center gap-2 text-sm font-medium text-slate-700"
          >
            <Sliders className="w-4 h-4 text-indigo-600" />
            Aturan Otomatisasi (Auto-Pilot)
          </button>
          <button
            onClick={() => handleNavClick('templates')}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 flex items-center gap-2 text-sm font-medium text-slate-700"
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            Koleksi Template Industri
          </button>
          <button
            onClick={() => handleNavClick('qr-booster')}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 flex items-center gap-2 text-sm font-medium text-slate-700"
          >
            <QrCode className="w-4 h-4 text-purple-600" />
            QR Code Review Booster Meja
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 flex items-center gap-2 text-sm font-medium text-slate-700"
          >
            <CreditCard className="w-4 h-4 text-slate-600" />
            Paket Harga (IDR)
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 flex items-center gap-2 text-sm font-medium text-slate-700"
          >
            <HelpCircle className="w-4 h-4 text-slate-600" />
            Pertanyaan Umum (FAQ)
          </button>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => handleNavClick('generator')}
              className="w-full py-2.5 rounded-lg bg-emerald-600 text-white font-semibold text-center text-sm shadow-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Coba Generator AI Sekarang
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
