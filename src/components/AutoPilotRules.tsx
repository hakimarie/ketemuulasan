import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Search, 
  Plus, 
  Trash2, 
  Save, 
  AlertTriangle,
  Zap,
  Tag
} from 'lucide-react';
import { INITIAL_RULES } from '../data/mockData';
import { AutoPilotRule } from '../types';

export const AutoPilotRules: React.FC = () => {
  const [rules, setRules] = useState<AutoPilotRule[]>(INITIAL_RULES);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // SEO keywords state
  const [keywords, setKeywords] = useState<string[]>([
    'Kopi Ruang Senja',
    'Senopati Jakarta Selatan',
    'Croissant Almond Fresh',
    'Kopi Gula Aren Terbaik',
    'Kafe Estetik Nugas',
  ]);
  const [newKeyword, setNewKeyword] = useState('');

  // Toggle rule status
  const handleToggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  // Add keyword
  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;
    if (!keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
    }
    setNewKeyword('');
  };

  // Delete keyword
  const handleDeleteKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  // Save all
  const handleSaveAll = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <section id="autopilot" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-200/80 mb-3">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            Auto-Pilot Rules Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Aturan Otomatisasi Balas Ulasan
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Tetapkan aturan cerdas bagaimana AI harus merespons setiap ulasan berdasarkan rating bintang, 
            kecepatan jeda waktu, hingga penyelipan kata kunci untuk mendongkrak SEO Google Maps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Rules List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600" />
                Daftar Skenario Otomatis
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {rules.filter((r) => r.active).length} dari {rules.length} Aturan Aktif
              </span>
            </div>

            {rules.map((rule) => (
              <div
                key={rule.id}
                className={`bg-white rounded-2xl border p-5 transition-all shadow-xs ${
                  rule.active ? 'border-slate-200' : 'border-slate-200 opacity-60 bg-slate-50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                        rule.minRating >= 4
                          ? 'bg-emerald-100 text-emerald-800'
                          : rule.minRating <= 2
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {rule.minRating === rule.maxRating
                        ? `${rule.minRating}★`
                        : `${rule.minRating}-${rule.maxRating}★`}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{rule.title}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">{rule.condition}</p>
                    </div>
                  </div>

                  {/* Toggle button */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-600">
                      {rule.active ? 'Aktif' : 'Nonaktif'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleRule(rule.id)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        rule.active ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          rule.active ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {rule.description}
                </p>

                {/* Sub configuration badges */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <div className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    Jeda Respon:{' '}
                    <strong className="text-slate-900">
                      {rule.delayMinutes === 0 ? 'Tahan untuk Review' : `${rule.delayMinutes} Menit`}
                    </strong>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Gaya Bahasa:{' '}
                    <strong className="text-slate-900">{rule.selectedTone}</strong>
                  </div>

                  {rule.includeKeywords && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold">
                      ✓ Injeksi Kata Kunci SEO Google Maps
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* SEO Keywords Injection Panel (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <Search className="w-4 h-4" />
                Kata Kunci Wajib (Local SEO Booster)
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                AI akan menyisipkan kata kunci ini secara alami dalam balasan ulasan positif untuk membantu 
                bisnis Anda berada di peringkat <strong>Top 3 Google Maps Search</strong>.
              </p>
            </div>

            {/* Keyword tags */}
            <div className="flex flex-wrap gap-1.5">
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold"
                >
                  <Tag className="w-3 h-3 text-emerald-600" />
                  {kw}
                  <button
                    onClick={() => handleDeleteKeyword(kw)}
                    className="hover:text-red-600 ml-1 text-slate-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Add keyword form */}
            <form onSubmit={handleAddKeyword} className="flex gap-2">
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="Tambah kata kunci (misal: Soto Betawi Enak)..."
                className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>

            {/* Pro tip card */}
            <div className="bg-amber-50 border border-amber-200/80 p-3.5 rounded-xl text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-800">
                <AlertTriangle className="w-3.5 h-3.5" />
                Tips Keamanan Anti-Spam
              </div>
              <p className="text-[11px] text-amber-800/90 leading-relaxed">
                Jeda waktu 3-5 menit membuat balasan Anda tampak 100% natural di mata Google, 
                bebas dari risiko penalti bot otomatis Google Business Profile.
              </p>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveAll}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Aturan Berhasil Disimpan!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Pengaturan Auto-Pilot</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
