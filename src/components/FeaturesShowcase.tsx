import React from 'react';
import { 
  Bot, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Building2, 
  Lock, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

export const FeaturesShowcase: React.FC = () => {
  const features = [
    {
      icon: Bot,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      title: 'AI Kontekstual Asli Indonesia',
      desc: 'Bukan sekadar template terjemahan kaku. AI mengenali detail menu, nama staf, dan emosi reviewer dalam ragam bahasa santun, kasual, hingga bahasa daerah (Jawa & Sunda).',
    },
    {
      icon: TrendingUp,
      color: 'bg-teal-500/10 text-teal-600 border-teal-500/20',
      title: 'Dongkrak Peringkat Local SEO Google',
      desc: 'Secara natural menyisipkan nama brand, lokasi cabang, dan produk unggulan di balasan. Membantu profil Google Maps Anda tembus peringkat 3 besar pencarian lokal.',
    },
    {
      icon: ShieldCheck,
      color: 'bg-red-500/10 text-red-600 border-red-500/20',
      title: 'Peredam Komplain & Resolusi Privat',
      desc: 'Ulasan bintang 1-2 ditangani dengan empati tingkat tinggi tanpa saling menyalahkan di publik, langsung menyertakan nomor WhatsApp manajer untuk penyelesaian damai.',
    },
    {
      icon: Zap,
      color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      title: 'Mode Auto-Pilot 24/7',
      desc: 'Atur balasan otomatis untuk ulasan bintang 5 dengan jeda 3-5 menit agar tetap tampak alami. Bisnis tetap responsif meski Anda sedang sibuk melayani tamu.',
    },
    {
      icon: Building2,
      color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
      title: 'Satu Dashboard untuk Multi-Cabang',
      desc: 'Pantau dan balas ulasan dari 3 hingga puluhan cabang outlet di seluruh kota Indonesia tanpa repot berganti-ganti akun Google.',
    },
    {
      icon: Lock,
      color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      title: '100% Aman dengan Google Business API',
      desc: 'Integrasi resmi menggunakan protokol Google OAuth 2.0. Tidak ada kata sandi yang disimpan, akun bisnis Anda aman dari risiko pembatasan atau penalti.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/80 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Fitur Kelas Perusahaan
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Semua yang Anda Butuhkan untuk Menguasai Reputasi Bisnis
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            BalasUlasan dirancang khusus menjawab tantangan nyata para pemilik restoran, klinik, hotel, 
            dan bisnis lokal di Indonesia dalam merawat ulasan pelanggan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all hover:-translate-y-1 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-2 group-hover:text-emerald-700 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
