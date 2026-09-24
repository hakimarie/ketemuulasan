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
