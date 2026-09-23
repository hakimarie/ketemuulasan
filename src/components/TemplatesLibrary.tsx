import React, { useState } from 'react';
import { 
  BookOpen, 
  Copy, 
  Check, 
  ArrowRight, 
  Star, 
  Sparkles, 
  Tag,
  Utensils,
  Stethoscope,
  Building,
  Wrench,
  ShoppingBag
} from 'lucide-react';
import { TEMPLATES_DATA } from '../data/mockData';
import { ReviewTemplate } from '../types';

interface TemplatesLibraryProps {
  onApplyTemplate?: (template: ReviewTemplate) => void;
}

export const TemplatesLibrary: React.FC<TemplatesLibraryProps> = ({ onApplyTemplate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Semua Industri', icon: BookOpen },
    { id: 'fnb', label: 'Kuliner & Kafe', icon: Utensils },
    { id: 'health', label: 'Klinik & Kesehatan', icon: Stethoscope },
    { id: 'hotel', label: 'Hotel & Villa', icon: Building },
    { id: 'automotive', label: 'Bengkel & Otomotif', icon: Wrench },
    { id: 'retail', label: 'Toko Ritel & Fashion', icon: ShoppingBag },
  ];

  const filteredTemplates = activeCategory === 'all'
    ? TEMPLATES_DATA
    : TEMPLATES_DATA.filter((t) => t.category === activeCategory);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="templates" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/80 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            Koleksi Template Balasan Teruji
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Koleksi Template Balasan Berbagai Industri
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Gunakan struktur balasan yang telah terbukti menghasilkan kepuasan pelanggan tertinggi di Indonesia. 
            Tinggal salin atau sesuaikan langsung dengan bantuan AI.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs px-3.5 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-slate-50/70 rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                    {tpl.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < tpl.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-1">
                      {tpl.rating}★
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-emerald-700 transition-colors">
                  {tpl.situation}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-100 font-normal">
                  "{tpl.templateText}"
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {tpl.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopy(tpl.id, tpl.templateText)}
                  className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${
                    copiedId === tpl.id
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {copiedId === tpl.id ? (
                    <>
                      <Check className="w-3 h-3" /> Tersalin
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Salin Template
                    </>
                  )}
                </button>

                {onApplyTemplate && (
                  <button
                    onClick={() => onApplyTemplate(tpl)}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                  >
                    Gunakan di AI <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
