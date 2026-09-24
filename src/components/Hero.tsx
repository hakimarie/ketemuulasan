import React, { useState } from 'react';
import { 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  CornerDownRight,
  Zap,
  Users,
  Building2,
  ThumbsUp
} from 'lucide-react';

interface HeroProps {
  onTryGenerator: () => void;
  onOpenDashboard: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTryGenerator, onOpenDashboard }) => {
  const [interactiveMode, setInteractiveMode] = useState<'after' | 'before'>('after');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-100/50 via-green-100/30 to-blue-100/40 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE]/80 text-[#1D4ED8] text-xs sm:text-sm font-semibold mb-6 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-[#EFF6FF]0 animate-pulse" />
            <span>Kloning Resmi & Platform Reputasi Bisnis Indonesia</span>
            <span className="text-blue-400">|</span>
            <span className="font-bold text-[#2563EB]">ketemureview</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.12]">
            Kelola & Balas Ulasan Google Maps & Bisnis{' '}
            <span className="bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
              10x Lebih Cepat
            </span>{' '}
            dengan AI Cerdas
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Tingkatkan rating bintang 5, rawat kepuasan pelanggan, dan dongkrak peringkat 
            <strong className="text-slate-800 font-semibold"> Local SEO Google Bisnisku</strong> secara otomatis, 
            personal, ramah, dan solutif tanpa repot mengetik balasan manual satu per satu.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onTryGenerator}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2 group hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
              Coba Live Generator Reply (Gratis)
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenDashboard}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs hover:border-slate-400 transition-all flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 text-[#2563EB]" />
              Simulasi Inbox Google Profil Bisnis
            </button>
          </div>

          {/* Mini trust checklist */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB]" /> Resmi Terintegrasi Google Business
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB]" /> 100% Bahasa Indonesia & Santun
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB]" /> Anti-Bot Kaku (Kontekstual Penuh)
            </span>
          </div>
        </div>

        {/* Interactive Before / After Review Simulation Showcase */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
            {/* Top Bar of the Mock Window */}
            <div className="bg-[#0F172A] text-slate-200 px-4 py-3 flex items-center justify-between border-b border-[#0F172A]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#EFF6FF]0/80" />
                  <div className="w-3 h-3 rounded-full bg-[#ECFDF3]0/80" />
                  <div className="w-3 h-3 rounded-full bg-[#EFF6FF]0/80" />
                </div>
                <div className="ml-3 flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  Google Maps Review Management • <span className="text-blue-400 font-semibold">Kopi Ruang Senja, Senopati</span>
                </div>
              </div>

              {/* Mode switch */}
              <div className="flex items-center bg-slate-800 p-0.5 rounded-lg text-xs">
                <button
                  onClick={() => setInteractiveMode('before')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    interactiveMode === 'before'
                      ? 'bg-slate-700 text-white font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Manual (Ditinggal)
                </button>
                <button
                  onClick={() => setInteractiveMode('after')}
                  className={`px-3 py-1 rounded-md transition-all flex items-center gap-1 ${
                    interactiveMode === 'after'
                      ? 'bg-[#2563EB] text-white font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-blue-200" />
                  Dengan KetemuReview
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 sm:p-7 bg-slate-50/50">
              {/* Review Card */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="Reviewer"
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/20"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[#0F172A] text-sm sm:text-base">Anissa Putri Kinanti</h4>
                        <span className="text-[11px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">Local Guide • Level 6</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex text-green-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-green-400" />
                          ))}
                        </div>
                        <span className="text-xs text-slate-400">2 hari lalu</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/60 hidden sm:inline-flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" /> Sangat Puas
                  </span>
                </div>

                <p className="mt-3.5 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  "Baru pertama kali mampir ke sini waktu nunggu jam meeting. Kopi gula arennya creamy pas ngga bikin eneg, 
                  plus croissant salted egg-nya garing renyah banget! Tempatnya tenang, AC adem, stafnya ramah banget nawarin rekomendasi menu. 
                  Definitif bakal jadi tempat nongkrong langganan baru di Senopati!"
                </p>

                {/* Response area based on mode */}
                {interactiveMode === 'after' ? (
                  <div className="mt-5 pl-4 sm:pl-6 border-l-2 border-blue-500 bg-[#EFF6FF]/50 rounded-r-xl p-4 transition-all animate-in fade-in duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold">
                          K
                        </div>
                        <div>
                          <span className="font-bold text-xs text-[#0F172A]">Respon dari Pemilik (Kopi Ruang Senja)</span>
                          <span className="ml-2 text-[10px] bg-blue-100 text-[#1D4ED8] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-[#2563EB]" /> Dibalas AI dalam 3 menit
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 hidden sm:inline">Otomatis & Terverifikasi</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      "Halo Kak Anissa Putri Kinanti, terima kasih banyak telah berkunjung dan memberikan ulasan bintang 5 yang manis untuk <strong className="text-[#0F172A]">Kopi Ruang Senja Senopati</strong>! Senang sekali mendengar Kakak menyukai kopi gula aren dan croissant salted egg kami yang baru dipanggang fresh setiap pagi. Seluruh tim barista kami sangat bersemangat membaca apresiasi Kakak. Jangan sungkan mampir lagi ya Kak, kami selalu siap menyambut kedatangan berikutnya dengan menu-menu istimewa lainnya! Salam hangat dari kami ✨☕"
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-[#1D4ED8]">
                      <span className="bg-white/80 border border-[#BFDBFE]/80 px-2 py-0.5 rounded">
                        ✓ Mention Brand & Lokasi (SEO Naik)
                      </span>
                      <span className="bg-white/80 border border-[#BFDBFE]/80 px-2 py-0.5 rounded">
                        ✓ Spesifik membalas croissant & kopi aren
                      </span>
                      <span className="bg-white/80 border border-[#BFDBFE]/80 px-2 py-0.5 rounded">
                        ✓ Nada Ramah & Hangat
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 pl-4 sm:pl-6 border-l-2 border-blue-300 bg-[#EFF6FF]/50 rounded-r-xl p-4 transition-all">
                    <div className="flex items-center gap-2 text-[#2563EB] font-semibold text-xs mb-1">
                      <Clock className="w-4 h-4" /> Belum Dibalas (Sudah 2 Hari Dibiarkan)
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Ulasan pelanggan setia diabaikan tanpa tanggapan. Pelanggan merasa tidak dihargai, 
                      sementara algoritma Google Maps mencatat response rate Anda rendah dan menurunkan posisi ranking pencarian.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom summary bar */}
            <div className="bg-white px-5 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <Zap className="w-4 h-4 text-green-500" />
                <span>Auto-Pilot aktif memantau ulasan baru 24/7 di Google Maps</span>
              </div>
              <button
                onClick={onTryGenerator}
                className="text-[#2563EB] hover:text-[#2563EB] font-bold inline-flex items-center gap-1 text-xs"
              >
                Hasilkan balasan untuk bisnis Anda sekarang <CornerDownRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-3xl font-black text-[#0F172A] tracking-tight">1.500+</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Bisnis & Outlet Aktif</div>
            <div className="text-[11px] text-[#2563EB] font-medium mt-0.5">di 34 Kota Indonesia</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-3xl font-black text-[#0F172A] tracking-tight">450.000+</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Ulasan Dibalas Sukses</div>
            <div className="text-[11px] text-[#2563EB] font-medium mt-0.5">Bintang 1 hingga 5</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-3xl font-black text-[#0F172A] tracking-tight">90%</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Waktu Kerja Dihemat</div>
            <div className="text-[11px] text-[#2563EB] font-medium mt-0.5">Tanpa ngetik manual</div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs text-center">
            <div className="text-3xl font-black text-[#0F172A] tracking-tight">+0.5★</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Rata-Rata Kenaikan Rating</div>
            <div className="text-[11px] text-[#2563EB] font-medium mt-0.5">Dalam 60 hari pertama</div>
          </div>
        </div>
      </div>
    </section>
  );
};
