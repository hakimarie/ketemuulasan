import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Star, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  Copy, 
  Check, 
  Edit, 
  Trash2, 
  MapPin, 
  RefreshCw, 
  PlusCircle, 
  CheckCheck,
  Send,
  Building,
  RotateCcw,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { GoogleReviewItem } from '../types';
import { requestAiReply } from '../services/geminiService';

interface InboxDashboardProps {
  reviews: GoogleReviewItem[];
  setReviews: React.Dispatch<React.SetStateAction<GoogleReviewItem[]>>;
  onSwitchToGenerator: () => void;
}

export const InboxDashboard: React.FC<InboxDashboardProps> = ({
  reviews,
  setReviews,
  onSwitchToGenerator,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'unreplied' | 'replied' | 'pending_manual'>('all');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [tempReplyText, setTempReplyText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isBatchRunning, setIsBatchRunning] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New review modal state
  const [newReviewer, setNewReviewer] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [newBranch, setNewBranch] = useState('Cabang Senopati, Jakarta Selatan');

  // Filter calculations
  const filteredReviews = reviews.filter((r) => {
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    if (filterRating !== 'all' && r.rating !== filterRating) return false;
    if (filterLocation !== 'all' && !r.locationName.includes(filterLocation)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.reviewerName.toLowerCase().includes(q) ||
        r.reviewText.toLowerCase().includes(q) ||
        r.locationName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const unrepliedCount = reviews.filter((r) => r.status === 'unreplied').length;
  const fiveStarUnreplied = reviews.filter((r) => r.status === 'unreplied' && r.rating === 5).length;
  const criticalCount = reviews.filter((r) => r.rating <= 2).length;

  // Single AI reply handler
  const handleGenerateSingleReply = async (item: GoogleReviewItem) => {
    setGeneratingId(item.id);
    try {
      const res = await requestAiReply({
        businessName: 'Kopi Ruang Senja',
        businessType: 'Kuliner / Kafe',
        rating: item.rating,
        reviewText: item.reviewText,
        reviewerName: item.reviewerName,
        tone: item.rating <= 2 ? 'Solutif & Empatik' : 'Ramah & Hangat',
        language: 'Bahasa Indonesia',
        promotion: item.rating === 5 ? 'diskon 15% untuk repeat order' : '',
        contactResolution: item.rating <= 3 ? 'WhatsApp Manajer di 0812-9988-7766' : '',
      });

      const reply = res.options[0]?.replyText || 'Terima kasih atas ulasan berharga Anda!';

      setReviews((prev) =>
        prev.map((r) =>
          r.id === item.id
            ? {
                ...r,
                status: 'replied',
                replyText: reply,
                repliedAt: 'Baru saja',
                repliedBy: 'KetemuReview AI',
              }
            : r
        )
      );
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingId(null);
    }
  };

  // Batch reply 5-star reviews
  const handleBatchReplyFiveStars = async () => {
    setIsBatchRunning(true);
    const unrepliedFives = reviews.filter((r) => r.status === 'unreplied' && r.rating === 5);

    for (const item of unrepliedFives) {
      await new Promise((res) => setTimeout(res, 600));
      const autoText = `Halo Kak ${item.reviewerName}, terima kasih banyak atas ulasan bintang 5 untuk Kopi Ruang Senja! Kami sangat bahagia mendengar pengalaman memuaskan Kakak. Ditunggu kunjungan berikutnya ya Kak! ✨`;
      setReviews((prev) =>
        prev.map((r) =>
          r.id === item.id
            ? {
                ...r,
                status: 'replied',
                replyText: autoText,
                repliedAt: 'Baru saja',
                repliedBy: 'KetemuReview AI (Batch Auto-Pilot)',
              }
            : r
        )
      );
    }
    setIsBatchRunning(false);
  };

  // Copy reply
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Save manual edit
  const handleSaveEdit = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, replyText: tempReplyText } : r))
    );
    setEditingReplyId(null);
  };

  // Add custom review
  const handleAddNewReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewer || !newText) return;

    const newItem: GoogleReviewItem = {
      id: `rev-${Date.now()}`,
      reviewerName: newReviewer,
      reviewerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      rating: newRating,
      reviewDate: 'Baru saja',
      reviewText: newText,
      locationName: newBranch,
      status: 'unreplied',
      sentiment: newRating >= 4 ? 'positive' : newRating <= 2 ? 'negative' : 'neutral',
      tags: ['Ulasan Baru'],
    };

    setReviews([newItem, ...reviews]);
    setShowAddModal(false);
    setNewReviewer('');
    setNewText('');
  };

  return (
    <div className="py-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Google Business Banner */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
              KRS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900">Kopi Ruang Senja (Pusat & Cabang)</h1>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-600" /> Terhubung Google API
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                <span>g.page/kopiruangsenja</span>
                <span>•</span>
                <span>Sinkronisasi Otomatis Setiap 5 Menit</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-all"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              Simulasi Ulasan Baru
            </button>

            <button
              onClick={onSwitchToGenerator}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Buka AI Studio
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Total Ulasan</span>
              <Building className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">{reviews.length}</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5">3 Lokasi Cabang</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Belum Dibalas</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600 mt-2">{unrepliedCount}</div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              {fiveStarUnreplied} ulasan bintang 5
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Rata-Rata Bintang</span>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">4.8 / 5.0</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5">+0.4 bulan ini</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Tingkat Respon</span>
              <CheckCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-600 mt-2">
              {Math.round(((reviews.length - unrepliedCount) / (reviews.length || 1)) * 100)}%
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">Kecepatan ~3 menit</div>
          </div>
        </div>

        {/* Quick Batch Auto-Pilot Bar */}
        {fiveStarUnreplied > 0 && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">
                  Tersedia {fiveStarUnreplied} Ulasan Bintang 5 yang Belum Dibalas!
                </h4>
                <p className="text-xs text-emerald-100">
                  Otomatisasi AI dapat membalas semua ulasan positif ini sekaligus secara personal dan ramah.
                </p>
              </div>
            </div>

            <button
              onClick={handleBatchReplyFiveStars}
              disabled={isBatchRunning}
              className="px-4 py-2.5 rounded-lg bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 shrink-0 disabled:opacity-75 cursor-pointer"
            >
              {isBatchRunning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Sedang Membalas...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>⚡ Balas Semua Bintang 5 Sekaligus</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari reviewer, isi ulasan, atau menu..."
                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
              />
            </div>

            {/* Quick Filter tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <button
                onClick={() => setFilterStatus('all')}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  filterStatus === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Semua ({reviews.length})
              </button>
              <button
                onClick={() => setFilterStatus('unreplied')}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                  filterStatus === 'unreplied'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <span>Belum Dibalas</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/30 font-bold">
                  {unrepliedCount}
                </span>
              </button>
              <button
                onClick={() => setFilterStatus('replied')}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  filterStatus === 'replied'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                Sudah Dibalas ({reviews.length - unrepliedCount})
              </button>
            </div>
          </div>

          {/* Sub filters */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-700">Filter Bintang:</span>
              <select
                value={filterRating}
                onChange={(e) =>
                  setFilterRating(e.target.value === 'all' ? 'all' : Number(e.target.value))
                }
                className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs font-medium focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">Semua Bintang</option>
                <option value="5">⭐⭐⭐⭐⭐ (5 Bintang)</option>
                <option value="4">⭐⭐⭐⭐ (4 Bintang)</option>
                <option value="3">⭐⭐⭐ (3 Bintang)</option>
                <option value="2">⭐⭐ (2 Bintang)</option>
                <option value="1">⭐ (1 Bintang)</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-700">Cabang Lokasi:</span>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs font-medium focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">Semua Cabang</option>
                <option value="Senopati">Cabang Senopati (Jakarta)</option>
                <option value="Dago">Cabang Dago (Bandung)</option>
                <option value="Surabaya">Cabang Surabaya Barat</option>
              </select>
            </div>

            {(filterStatus !== 'all' || filterRating !== 'all' || filterLocation !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setFilterStatus('all');
                  setFilterRating('all');
                  setFilterLocation('all');
                  setSearchQuery('');
                }}
                className="text-xs text-red-600 hover:text-red-700 font-semibold underline ml-auto"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border p-5 transition-all shadow-xs ${
                  item.status === 'unreplied'
                    ? 'border-amber-200/90 ring-1 ring-amber-100'
                    : 'border-slate-200'
                }`}
              >
                {/* Review Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={item.reviewerAvatar}
                      alt={item.reviewerName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-sm">{item.reviewerName}</h3>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                          Local Guide
                        </span>
                        <span className="text-xs text-slate-400">• {item.reviewDate}</span>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-slate-700">
                          {item.rating}.0
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-500" />
                          {item.locationName}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {item.status === 'unreplied' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" /> Belum Dibalas
                      </span>
                    ) : item.status === 'pending_manual' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-800 border border-red-200">
                        <AlertCircle className="w-3 h-3 text-red-600" /> Tahan untuk Review
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle className="w-3 h-3 text-emerald-600" /> Sudah Dibalas
                      </span>
                    )}
                  </div>
                </div>

                {/* Review Body */}
                <p className="mt-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  "{item.reviewText}"
                </p>

                {/* Tags if available */}
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Replied Section or Unreplied Action Bar */}
                {item.status === 'replied' && item.replyText ? (
                  <div className="mt-4 pl-4 sm:pl-5 border-l-2 border-emerald-500 bg-emerald-50/40 rounded-r-xl p-3.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                          K
                        </div>
                        <span className="font-bold text-xs text-slate-900">
                          Respon Anda (Kopi Ruang Senja)
                        </span>
                        <span className="text-[10px] text-slate-500">
                          • {item.repliedAt || 'Terkirim'} • Oleh {item.repliedBy || 'AI'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(item.id, item.replyText || '')}
                          className="text-xs text-slate-600 hover:text-slate-900 px-2 py-1 rounded hover:bg-white flex items-center gap-1"
                        >
                          {copiedId === item.id ? (
                            <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> Tersalin
                            </span>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" /> Salin
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setEditingReplyId(item.id);
                            setTempReplyText(item.replyText || '');
                          }}
                          className="text-xs text-slate-600 hover:text-slate-900 px-2 py-1 rounded hover:bg-white flex items-center gap-1"
                        >
                          <Edit className="w-3 h-3" /> Edit
                        </button>
                      </div>
                    </div>

                    {editingReplyId === item.id ? (
                      <div className="space-y-2 mt-2">
                        <textarea
                          rows={3}
                          value={tempReplyText}
                          onChange={(e) => setTempReplyText(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-lg border border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        />
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => setEditingReplyId(null)}
                            className="text-xs px-2.5 py-1 text-slate-600 hover:text-slate-900"
                          >
                            Batal
                          </button>
                          <button
                            onClick={() => handleSaveEdit(item.id)}
                            className="text-xs px-3 py-1 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-700"
                          >
                            Simpan Perubahan
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-700 leading-relaxed font-normal">
                        "{item.replyText}"
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-slate-500 font-medium">
                      {item.rating <= 2
                        ? '⚠️ Komplain terdeteksi: AI menyarankan balasan bernada empati tinggi.'
                        : 'Siap dibalas secara instan.'}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleGenerateSingleReply(item)}
                        disabled={generatingId === item.id}
                        className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-75"
                      >
                        {generatingId === item.id ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Menyusun Balasan AI...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                            <span>Balas Otomatis AI (1-Klik)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
              <p className="text-slate-500 text-sm font-medium">
                Tidak ada ulasan yang cocok dengan filter yang dipilih.
              </p>
            </div>
          )}
        </div>

        {/* Modal: Tambah Ulasan Baru untuk Simulasi */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-emerald-600" />
                  Tambah Ulasan Google Maps (Simulasi)
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddNewReview} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nama Reviewer
                  </label>
                  <input
                    type="text"
                    required
                    value={newReviewer}
                    onChange={(e) => setNewReviewer(e.target.value)}
                    placeholder="Contoh: Rian Pratama"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Pilih Rating Bintang
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 font-bold text-sm text-slate-800">{newRating} Bintang</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Cabang Outlet
                  </label>
                  <select
                    value={newBranch}
                    onChange={(e) => setNewBranch(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Cabang Senopati, Jakarta Selatan">Cabang Senopati, Jakarta Selatan</option>
                    <option value="Cabang Dago, Bandung">Cabang Dago, Bandung</option>
                    <option value="Cabang Surabaya Barat">Cabang Surabaya Barat</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Isi Ulasan Pelanggan
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Tulis ulasan pujian atau komplain untuk menguji respons AI..."
                    className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs"
                  >
                    Tambahkan ke Inbox
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
