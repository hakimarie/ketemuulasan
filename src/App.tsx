import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GeneratorTool } from './components/GeneratorTool';
import { InboxDashboard } from './components/InboxDashboard';
import { AutoPilotRules } from './components/AutoPilotRules';
import { TemplatesLibrary } from './components/TemplatesLibrary';
import { ReviewBoosterQR } from './components/ReviewBoosterQR';
import { RoiCalculator } from './components/RoiCalculator';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import { PricingSection } from './components/PricingSection';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { INITIAL_REVIEWS } from './data/mockData';
import { GoogleReviewItem, ReviewTemplate } from './types';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [activeSection, setActiveSection] = useState('generator');
  const [reviews, setReviews] = useState<GoogleReviewItem[]>(INITIAL_REVIEWS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSendToInbox = (
    reviewText: string,
    replyText: string,
    rating: number,
    reviewer: string
  ) => {
    const newRev: GoogleReviewItem = {
      id: `rev-${Date.now()}`,
      reviewerName: reviewer || 'Pelanggan Baru',
      reviewerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      rating,
      reviewDate: 'Baru saja',
      reviewText,
      locationName: 'Cabang Senopati, Jakarta Selatan',
      status: 'replied',
      replyText,
      repliedAt: 'Baru saja',
      repliedBy: 'KetemuReview',
      sentiment: rating >= 4 ? 'positive' : rating <= 2 ? 'negative' : 'neutral',
      tags: ['Dibalas di Generator'],
    };

    setReviews([newRev, ...reviews]);
    showToast('✨ Balasan AI berhasil dikirim dan tersimpan di Inbox Dashboard!');
  };

  const handleApplyTemplate = (template: ReviewTemplate) => {
    scrollToSection('generator');
    showToast(`Template "${template.situation}" berhasil diterapkan! Silakan sesuaikan.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in slide-in-from-bottom duration-300">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        onOpenLogin={() => setLoginOpen(true)}
      />

      {/* Content Rendering based on View */}
      {currentView === 'landing' ? (
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onTryGenerator={() => scrollToSection('generator')}
            onOpenDashboard={() => {
              setCurrentView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Interactive AI Generator Playground */}
          <GeneratorTool onSendToInbox={handleSendToInbox} />

          {/* Features Highlight */}
          <FeaturesShowcase />

          {/* ROI Calculator */}
          <RoiCalculator />

          {/* Auto-Pilot Rules */}
          <AutoPilotRules />

          {/* Templates Library */}
          <TemplatesLibrary onApplyTemplate={handleApplyTemplate} />

          {/* Review Booster (QR Code Standee) */}
          <ReviewBoosterQR />

          {/* Testimonials */}
          <Testimonials />

          {/* Pricing in IDR */}
          <PricingSection />

          {/* FAQ Accordion */}
          <FaqSection />
        </main>
      ) : (
        <main className="flex-1">
          <InboxDashboard
            reviews={reviews}
            setReviews={setReviews}
            onSwitchToGenerator={() => {
              setCurrentView('landing');
              setTimeout(() => {
                scrollToSection('generator');
              }, 100);
            }}
          />
        </main>
      )}


      {loginOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLoginOpen(false);
          }}
        >
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">KetemuReview</p>
                <h2 id="login-title" className="mt-2 text-2xl font-extrabold tracking-tight text-[#0F172A]">
                  Masuk ke akun Anda
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Hubungkan akun Google Business Profile untuk mengelola review dari satu inbox.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLoginOpen(false)}
                className="h-9 w-9 shrink-0 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                aria-label="Tutup login"
              >
                ×
              </button>
            </div>

            <button
              type="button"
              disabled
              className="mt-7 w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm font-bold text-slate-500 cursor-not-allowed"
              title="Google OAuth belum dikonfigurasi"
            >
              Lanjutkan dengan Google
            </button>

            <div className="mt-4 rounded-xl bg-[#EFF6FF] px-4 py-3 text-xs leading-5 text-slate-600">
              Google OAuth belum terhubung pada versi ini. Tombol Login sekarang membuka alur login yang benar, tanpa mengarahkan pengguna langsung ke dashboard.
            </div>

            <button
              type="button"
              onClick={() => {
                setLoginOpen(false);
                scrollToSection('pricing');
              }}
              className="mt-5 w-full text-sm font-bold text-[#2563EB] hover:underline"
            >
              Belum punya akun? Mulai Gratis
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenDashboard={() => {
          setCurrentView('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
