import React, { useState } from 'react';
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight, X } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedPlanModal, setSelectedPlanModal] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const plans = [
    {
      id: 'starter',
      name: 'UMKM Starter',
      tagline: 'Cocok untuk 1 kafe, salon, atau toko baru',
      monthlyPrice: 99000,
      annualMonthlyPrice: 99000,
      popular: false,
      badge: 'Pemula',
      features: [
        '1 Lokasi Google Business Profile',
        '100 Balasan AI Pintar per bulan',
        '3 Opsi Variasi Balasan AI',
        'Analisis Sentimen Otomatis',
        'Dukungan Bahasa Indonesia & Santun',
        'Ekspor Generator Standee Meja QR',
        'Dukungan via Email & Telegram',
      ],
    },
    {
      id: 'pro',
      name: 'Bisnis Pro',
      tagline: 'Pilihan paling populer bagi pemilik bisnis berkembang',
      monthlyPrice: 199000,
      annualMonthlyPrice: 199000,
      popular: true,
      badge: 'Paling Populer',
      features: [
        'Hingga 3 Lokasi Cabang Google Maps',
        '500 Balasan AI Pintar per bulan',
        'Mode Auto-Pilot 24/7 (Jeda 3 Menit)',
        'Injeksi Kata Kunci Local SEO',
        'Pencegahan Krisis Komplain Bintang 1-2',
        'Alert Darurat Komplain ke WhatsApp',
        'Koleksi Lengkap Template Industri',
        'Dukungan Prioritas via WhatsApp VIP',
      ],
    },
    {
      id: 'enterprise',
      name: 'Multi-Cabang Enterprise',
      tagline: 'Untuk waralaba, grup restoran & klinik multi-kota',
      monthlyPrice: 499000,
      annualMonthlyPrice: 499000,
      popular: false,
      badge: 'Perusahaan',
      features: [
        'Lokasi Cabang Tanpa Batas (Unlimited)',
        'Balasan AI Ulasan Tanpa Batas',
        'Custom Brand Voice & Panduan SOP Khusus',
        'Laporan Sentimen & CSAT Bulanan (PDF/Excel)',
        'Multi-User Akses untuk Tim Manajer Cabang',
        'Prioritas Server API Latensi Rendah',
        'Dedicated Account Manager Khusus',
      ],
    },
  ];

  const handleOpenCheckout = (planName: string) => {
    setSelectedPlanModal(planName);
    setCheckoutSuccess(false);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setCheckoutSuccess(true);
  };

  return (
    <section id="pricing" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] text-xs font-bold border border-[#BFDBFE]/80 mb-3">
            <Zap className="w-3.5 h-3.5 text-[#2563EB]" />
            Paket Harga Transparan
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Investasi Terjangkau, Reputasi Melejit
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Mulai dengan uji coba gratis 7 hari tanpa kartu kredit. Batalkan kapan saja tanpa ikatan kontrak.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 inline-flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-[#0F172A] shadow-xs'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              Langganan Bulanan
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              <span>Langganan Tahunan</span>
              <span className="bg-green-400 text-green-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                Hemat 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualMonthlyPrice : plan.monthlyPrice;
            const formattedPrice = new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumFractionDigits: 0,
            }).format(price);

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-7 flex flex-col justify-between transition-all ${
                  plan.popular
                    ? 'bg-[#0F172A] text-white shadow-xl ring-2 ring-blue-500 scale-100 md:-translate-y-2'
                    : 'bg-white text-[#0F172A] border border-slate-200/90 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                        plan.popular
                          ? 'bg-[#EFF6FF] text-[#0F172A] font-black'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-black ${plan.popular ? 'text-white' : 'text-[#0F172A]'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs mt-1.5 ${plan.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                    {plan.tagline}
                  </p>

                  <div className="mt-6 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black tracking-tight">{formattedPrice}</span>
                      <span className={`text-xs ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                        /bulan
                      </span>
                    </div>
                    {billingCycle === 'annual' && (
                      <p className={`text-[11px] mt-1 ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                        Ditagih per tahun ({new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          maximumFractionDigits: 0,
                        }).format(price * 12)})
                      </p>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-4 border-t border-slate-200/20">
                    <div className={`text-xs font-bold uppercase tracking-wider ${plan.popular ? 'text-slate-300' : 'text-slate-600'}`}>
                      Semua Fitur Termasuk:
                    </div>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            plan.popular ? 'text-blue-400' : 'text-[#2563EB]'
                          }`}
                        />
                        <span className={plan.popular ? 'text-slate-200' : 'text-slate-700'}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handleOpenCheckout(plan.name)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      plan.popular
                        ? 'bg-transparent border-2 border-white text-white hover:bg-white/10 shadow-none'
                        : 'bg-[#0F172A] hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{plan.id === 'starter' ? 'Starter' : plan.id === 'enterprise' ? 'Enterprise' : 'Mulai Uji Coba Gratis 7 Hari'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className={`text-[10px] text-center mt-2 ${plan.popular ? 'text-slate-400' : 'text-slate-400'}`}>
                    Tidak perlu kartu kredit • Aktif instan
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Checkout Simulation */}
        {selectedPlanModal && (
          <div className="fixed inset-0 z-50 bg-[#0F172A]/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95">
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              {!checkoutSuccess ? (
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-lg mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0F172A]">
                    Aktivasi Akun {selectedPlanModal}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Nikmati akses penuh fitur KetemuReview selama 7 hari tanpa biaya apapun.
                  </p>

                  <form onSubmit={handleCheckoutSubmit} className="mt-5 space-y-3.5 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Nama Pemilik / Manajer Bisnis
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Arie Hakim"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Email Kerja / Gmail Google Maps
                      </label>
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="email@bisnisanda.com"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Nomor WhatsApp (Untuk Notifikasi Ulasan)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0812-xxxx-xxxx"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                      >
                        Mulai Trial Sekarang & Hubungkan Google
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0F172A]">
                    Selamat Bergabung di KetemuReview!
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                    Instruksi aktivasi dan link sinkronisasi Google Business Profile telah dikirimkan ke <strong>{emailInput}</strong>.
                  </p>
                  <button
                    onClick={() => setSelectedPlanModal(null)}
                    className="mt-4 px-6 py-2.5 bg-[#0F172A] text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                  >
                    Tutup & Lanjutkan Eksplorasi
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
