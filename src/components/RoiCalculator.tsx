import React, { useState } from 'react';
import { Calculator, Clock, DollarSign, TrendingUp, Sparkles } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [monthlyReviews, setMonthlyReviews] = useState<number>(120);

  // Assumptions:
  // Average manual reply time: 6 minutes per review (reading, thinking, typing, checking)
  // With BalasUlasan AI: 20 seconds (1-click approve / auto-pilot)
  // Time saved = monthlyReviews * (6 - 0.33) / 60 hours
  const hoursSaved = Math.round((monthlyReviews * 5.67) / 60);
  
  // Cost saved based on average hourly wage of customer care/admin in Indonesia (~Rp 30.000 / jam)
  const moneySaved = hoursSaved * 35000;
  
  // Formatting Rupiah
  const formattedMoney = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(moneySaved);

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            {/* Slider Column */}
            <div className="w-full lg:w-1/2 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <Calculator className="w-3.5 h-3.5" />
                Kalkulator Penghematan Bisnis
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">
                Berapa Banyak Waktu & Biaya yang Bisa Anda Hemat?
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Geser slider sesuai estimasi jumlah ulasan Google Maps yang diterima bisnis Anda setiap bulan.
              </p>

              <div>
                <div className="flex items-center justify-between font-bold text-sm mb-2">
                  <span className="text-slate-300">Volume Ulasan Bulanan:</span>
                  <span className="text-2xl text-emerald-400 font-black">{monthlyReviews} Ulasan</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={10}
                  value={monthlyReviews}
                  onChange={(e) => setMonthlyReviews(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                  <span>10 Ulasan (UMKM Baru)</span>
                  <span>250 Ulasan</span>
                  <span>500+ Ulasan (Multi-Cabang)</span>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="w-full lg:w-1/2 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Hasil Estimasi Penghematan
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Waktu Dihemat
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                    {hoursSaved} <span className="text-sm font-semibold text-slate-300">Jam/bln</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Fokuskan waktu untuk kembangkan cabang
                  </div>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    Nilai Efisiensi
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                    {formattedMoney}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Setara gaji lembur tim admin
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0" />
                <p className="text-xs text-emerald-200">
                  Rating bisnis diproyeksikan naik <strong>+0.3 hingga +0.6 bintang</strong> dalam 90 hari karena tingkat respon mencapai 100%!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
