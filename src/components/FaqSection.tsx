import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_DATA } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
            Pusat Bantuan & Tanya Jawab
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Masih ada pertanyaan seputar keamanan akun, integrasi Google, atau cara kerja AI BalasUlasan? 
            Berikut jawaban lengkapnya.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <span className="p-1 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp support banner */}
        <div className="mt-10 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
          <h4 className="font-extrabold text-emerald-900 text-sm sm:text-base">
            Punya Pertanyaan Khusus untuk Bisnis atau Cabang Anda?
          </h4>
          <p className="text-xs text-emerald-700 max-w-lg mx-auto leading-relaxed">
            Tim konsultan reputasi BalasUlasan siap membantu Anda mengatur integrasi Google Profil Bisnis via WhatsApp live.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/6281200000000?text=Halo%20BalasUlasan,%20saya%20ingin%20tanya%20seputar%20integrasi%20Google%20Review"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              💬 Chat dengan Tim BalasUlasan via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
