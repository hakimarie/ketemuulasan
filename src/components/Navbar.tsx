import React from 'react';
import { MessageSquareQuote, LogIn, Rocket } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'dashboard';
  setCurrentView: (view: 'landing' | 'dashboard') => void;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ setCurrentView, scrollToSection, onOpenLogin }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => {
              setCurrentView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-left group"
            aria-label="KetemuReview"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-green-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-[#0F172A]">
                  Ketemu<span className="text-[#2563EB]">Review</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/60">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 -mt-0.5 font-medium">Google Review Management</p>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLogin}
              className="text-xs font-semibold px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              Login
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-xs font-bold px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm shadow-blue-600/30 transition-all flex items-center gap-1.5 hover:shadow-md hover:-translate-y-0.5"
            >
              <Rocket className="w-3.5 h-3.5" />
              Mulai Gratis
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
