import React, { useState } from 'react';
import { 
  Sparkles, 
  Star, 
  Copy, 
  Check, 
  RotateCw, 
  Wand2, 
  MessageSquare, 
  SlidersHorizontal, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Share2, 
  HeartHandshake, 
  Send, 
  Edit3, 
  ChevronDown, 
  ChevronUp,
  Tag
} from 'lucide-react';
import { INITIAL_PRESETS } from '../data/mockData';
import { GenerateReplyResult, PresetScenario } from '../types';
import { requestAiReply } from '../services/geminiService';

interface GeneratorToolProps {
  onSendToInbox?: (reviewText: string, replyText: string, rating: number, reviewer: string) => void;
}

export const GeneratorTool: React.FC<GeneratorToolProps> = ({ onSendToInbox }) => {
  const [businessName, setBusinessName] = useState('Kopi Ruang Senja');
  const [businessType, setBusinessType] = useState('Kuliner / Cafe & Eatery');
  const [reviewerName, setReviewerName] = useState('Kak Dimas Anggara');
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState(
    'Kopi susunya juara banget! Ambience-nya estetik dan cozy banget buat nugas, wifi kenceng, colokan banyak. Stafnya ramah-ramah terutama mas barista yang pake kacamata. Pasti bakal langganan terus di sini!'
  );
  const [tone, setTone] = useState('Ramah & Hangat');
  const [language, setLanguage] = useState('Bahasa Indonesia');
  const [promotion, setPromotion] = useState('diskon 15% untuk repeat order dengan menunjukkan ulasan ini');
  const [contactResolution, setContactResolution] = useState('WhatsApp Customer Care 0812-9988-7766');
  const [customNotes, setCustomNotes] = useState('');
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editableOptionId, setEditableOptionId] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateReplyResult | null>(null);
  const [sentSuccessId, setSentSuccessId] = useState<string | null>(null);

  // Tone presets
  const TONE_OPTIONS = [
    { label: 'Ramah & Hangat', icon: '🌸', desc: 'Apresiatif & menyentuh hati' },
    { label: 'Formal & Profesional', icon: '💼', desc: 'Standar korporat & medis' },
    { label: 'Santai & Kasual', icon: '☕', desc: 'Luwes & cocok untuk kafe/fashion' },
    { label: 'Solutif & Empatik', icon: '🤝', desc: 'Khusus redam komplain 1-3 bintang' },
    { label: 'Promotif', icon: '📢', desc: 'Disertai promo menu/layanan baru' },
  ];

  const LANGUAGE_OPTIONS = [
    'Bahasa Indonesia',
    'Bahasa Jawa (Kromo Alus/Sopan)',
    'Bahasa Sunda (Lemes)',
    'English',
  ];

  // Quick preset loader
  const handleApplyPreset = (preset: PresetScenario) => {
    setBusinessName(preset.businessName);
    setBusinessType(preset.businessType);
    setReviewerName(preset.reviewerName);
    setRating(preset.rating);
    setReviewText(preset.reviewText);
    setTone(preset.tone);
    if (preset.rating <= 2) {
      setShowAdvanced(true);
    }
  };

  // Generate replies
  const handleGenerate = async () => {
    if (!reviewText.trim()) return;

    setIsLoading(true);
    try {
      const data = await requestAiReply({
        businessName,
        businessType,
        rating,
        reviewText,
        reviewerName,
        tone,
        language,
        promotion,
        contactResolution: rating <= 3 ? contactResolution : '',
        customNotes,
      });

      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Copy to clipboard
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  // Send to simulated inbox
  const handleSendToInbox = (optionId: string, replyText: string) => {
    if (onSendToInbox) {
      onSendToInbox(reviewText, replyText, rating, reviewerName);
      setSentSuccessId(optionId);
      setTimeout(() => {
        setSentSuccessId(null);
      }, 3000);
    }
  };

  return (
    <section id="generator" className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/80 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Live Interactive AI Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Coba Langsung Generator Balasan AI
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Masukkan ulasan dari pelanggan Anda (atau pilih contoh cepat di bawah), pilih gaya bahasa yang Anda inginkan, 
            dan biarkan AI menyusun 3 draf balasan terbaik dalam sekejap.
          </p>
        </div>

        {/* Quick Presets Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
              <Wand2 className="w-3.5 h-3.5 text-emerald-600" /> Pilih Contoh Ulasan Cepat:
            </span>
            <span className="text-[11px] text-slate-400">Klik salah satu untuk menguji AI</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {INITIAL_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className={`text-xs px-3 py-2 rounded-lg border font-medium transition-all flex items-center gap-1.5 ${
                  reviewText === preset.reviewText
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>{preset.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                  reviewText === preset.reviewText ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {preset.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Form Left, Results Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Input Form (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50/70 p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                Parameter Ulasan
              </h3>
              <span className="text-xs text-slate-500 font-medium">Langkah 1 dari 2</span>
            </div>

            {/* Business info row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Bisnis Anda <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Contoh: Kopi Ruang Senja"
                  className="w-full text-xs px-3 py-2 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kategori Bisnis
                </label>
                <input
                  type="text"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder="Kuliner, Klinik, Bengkel"
                  className="w-full text-xs px-3 py-2 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-800"
                />
              </div>
            </div>

            {/* Reviewer name & Rating */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Reviewer / Tamu
                </label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Contoh: Kak Dimas"
                  className="w-full text-xs px-3 py-2 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rating Bintang
                </label>
                <div className="flex items-center gap-1 bg-white px-2 py-1.5 rounded-lg border border-slate-300">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      type="button"
                      key={starVal}
                      onClick={() => {
                        setRating(starVal);
                        if (starVal <= 2) {
                          setTone('Solutif & Empatik');
                        } else if (starVal === 5 && tone === 'Solutif & Empatik') {
                          setTone('Ramah & Hangat');
                        }
                      }}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          starVal <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-1 text-xs font-bold text-slate-700">
                    {rating}★
                  </span>
                </div>
              </div>
            </div>

            {/* Review Text */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Isi Ulasan Pelanggan <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  {reviewText.length} karakter
                </span>
              </div>
              <textarea
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tulis atau salin ulasan yang diberikan pelanggan di Google Maps..."
                className="w-full text-xs sm:text-sm p-3 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 leading-relaxed resize-y"
              />
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Pilih Nada Balasan (Tone of Voice):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {TONE_OPTIONS.map((item) => (
                  <button
                    type="button"
                    key={item.label}
                    onClick={() => setTone(item.label)}
                    className={`p-2 rounded-lg text-left border transition-all text-xs ${
                      tone === item.label
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pilihan Bahasa Balasan:
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-medium"
              >
                {LANGUAGE_OPTIONS.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Advanced accordion */}
            <div className="border-t border-slate-200 pt-3">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full text-xs font-semibold text-slate-600 hover:text-slate-900 py-1"
              >
                <span className="flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                  Pengaturan Tambahan (Promo & Jalur Komplain)
                </span>
                {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showAdvanced && (
                <div className="mt-3 space-y-3 pt-2 text-xs animate-in fade-in duration-200">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Sisipkan Promo / Tawaran Menarik (Opsional):
                    </label>
                    <input
                      type="text"
                      value={promotion}
                      onChange={(e) => setPromotion(e.target.value)}
                      placeholder="Contoh: diskon 15% untuk repeat order"
                      className="w-full px-2.5 py-1.5 rounded-md bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {rating <= 3 && (
                    <div>
                      <label className="block text-[11px] font-semibold text-amber-800 mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600" /> Kontak Penyelesaian Komplain (WA / CS):
                      </label>
                      <input
                        type="text"
                        value={contactResolution}
                        onChange={(e) => setContactResolution(e.target.value)}
                        placeholder="Contoh: WhatsApp Manajer di 0812-xxxx-xxxx"
                        className="w-full px-2.5 py-1.5 rounded-md bg-amber-50 border border-amber-300 text-xs text-amber-950 font-medium focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Catatan Tambahan untuk AI:
                    </label>
                    <input
                      type="text"
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      placeholder="Contoh: sampaikan bahwa AC sudah kami perbaiki kemarin"
                      className="w-full px-2.5 py-1.5 rounded-md bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              disabled={isLoading || !reviewText.trim()}
              onClick={handleGenerate}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin text-white" />
                  <span>Sedang Meracik Balasan AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
                  <span>Hasilkan 3 Opsi Balasan AI</span>
                </>
              )}
            </button>
          </div>

          {/* RIGHT COLUMN: Results & Sentiment Analysis (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {result ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Sentiment Analysis Bar */}
                <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                      <div>
                        <h4 className="font-bold text-sm text-slate-100">Analisis Sentimen BalasUlasan AI</h4>
                        <p className="text-[11px] text-slate-400">Deteksi otomatis konteks & emosi pelanggan</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          result.analysis.sentiment === 'positive'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : result.analysis.sentiment === 'negative'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {result.analysis.sentiment === 'positive'
                          ? 'Positif'
                          : result.analysis.sentiment === 'negative'
                          ? 'Komplain Kritis'
                          : 'Netral'}
                      </span>
                      <span className="text-xs font-black text-emerald-400">
                        {result.analysis.sentimentScore}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
                    <div>
                      <span className="text-slate-400 block mb-1">Emosi Terdeteksi:</span>
                      <span className="font-semibold text-slate-200 bg-slate-800/80 px-2 py-1 rounded inline-block">
                        🎭 {result.analysis.customerEmotion}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block mb-1">Poin Utama yang Disorot:</span>
                      <div className="flex flex-wrap gap-1">
                        {result.analysis.highlightPoints.map((pt, i) => (
                          <span key={i} className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                            • {pt}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {result.analysis.actionAdvice && (
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-amber-300/90 bg-amber-950/20 p-2.5 rounded-xl border border-amber-900/30">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300">Rekomendasi Tindakan Bisnis:</strong> {result.analysis.actionAdvice}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3 Generated Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      3 Variasi Balasan AI (Siap Salin & Pakai)
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">Klik Salin atau Kirim</span>
                  </div>

                  {result.options.map((option, idx) => (
                    <div
                      key={option.id || idx}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow p-5 relative group"
                    >
                      {/* Option Header */}
                      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm">{option.title}</h4>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                            {option.badge}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-400 font-medium">
                          {option.replyText.length} karakter
                        </div>
                      </div>

                      {/* Content Box */}
                      {editableOptionId === option.id ? (
                        <textarea
                          rows={4}
                          value={option.replyText}
                          onChange={(e) => {
                            const newText = e.target.value;
                            setResult({
                              ...result,
                              options: result.options.map((o) =>
                                o.id === option.id ? { ...o, replyText: newText } : o
                              ),
                            });
                          }}
                          className="w-full text-xs sm:text-sm p-3 rounded-xl border border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 leading-relaxed font-sans"
                        />
                      ) : (
                        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 font-normal">
                          "{option.replyText}"
                        </div>
                      )}

                      {/* Fit hint */}
                      {option.toneFit && (
                        <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1 italic">
                          <Tag className="w-3 h-3 text-slate-400" />
                          <span>Kelebihan opsi ini: {option.toneFit}</span>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setEditableOptionId(editableOptionId === option.id ? null : option.id)
                            }
                            className="text-xs text-slate-600 hover:text-slate-900 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            {editableOptionId === option.id ? 'Selesai Edit' : 'Edit Teks'}
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(option.id, option.replyText)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                              copiedId === option.id
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                            }`}
                          >
                            {copiedId === option.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-white" />
                                <span>Tersalin!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Salin Balasan</span>
                              </>
                            )}
                          </button>

                          {onSendToInbox && (
                            <button
                              onClick={() => handleSendToInbox(option.id, option.replyText)}
                              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                                sentSuccessId === option.id
                                  ? 'bg-emerald-700 text-white'
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                              }`}
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>{sentSuccessId === option.id ? 'Terkirim ke Inbox!' : 'Kirim ke Inbox'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Empty state / placeholder prompt */
              <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center flex flex-col items-center justify-center min-h-[440px]">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100/60 flex items-center justify-center text-emerald-600 mb-4 shadow-xs">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-lg">
                  Hasil Balasan AI Akan Muncul di Sini
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm max-w-md mt-2 leading-relaxed">
                  Pilih salah satu contoh ulasan cepat di bagian atas atau ketik ulasan nyata dari Google Maps bisnis Anda, 
                  lalu tekan tombol <strong>"Hasilkan 3 Opsi Balasan AI"</strong> di sebelah kiri.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={handleGenerate}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    Coba Generate Contoh Kasus Sekarang
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
