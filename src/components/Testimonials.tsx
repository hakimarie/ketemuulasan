import React from 'react';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/80 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Kisah Sukses Pengusaha
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Dipercaya Lebih dari 1.500+ Pemilik Bisnis di Indonesia
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Lihat bagaimana BalasUlasan membantu pemilik kafe, klinik, restoran, dan hotel 
            mengubah ulasan menjadi mesin pertumbuhan bisnis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                <Quote className="w-8 h-8 text-emerald-600/20 mb-3" />
                <div className="flex text-amber-400 gap-1 mb-3">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/20"
                />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{t.role}</p>
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-600" /> {t.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
