import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  Printer, 
  Download, 
  ExternalLink, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Coffee, 
  Gift,
  Copy,
  Check
} from 'lucide-react';

export const ReviewBoosterQR: React.FC = () => {
  const [businessName, setBusinessName] = useState('Kopi Ruang Senja');
  const [shortUrl, setShortUrl] = useState('https://g.page/r/kopiruangsenja/review');
  const [promoOffer, setPromoOffer] = useState('Beri bintang 5 & tunjukkan ke kasir untuk Gratis 1 Cup Ice Lemon Tea!');
  const [tableNumber, setTableNumber] = useState('Meja 08');
  const [themeColor, setThemeColor] = useState<'emerald' | 'indigo' | 'amber'>('emerald');
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [qrError, setQrError] = useState('');

  useEffect(() => {
    const value = shortUrl.trim();
    if (!value) {
      setQrDataUrl('');
      setQrError('Masukkan URL tujuan QR code.');
      return;
    }
    QRCode.toDataURL(value, { width: 320, margin: 2, errorCorrectionLevel: 'H', color: { dark: '#0F172A', light: '#FFFFFF' } })
      .then(setQrDataUrl)
      .catch(() => { setQrDataUrl(''); setQrError('URL tidak dapat dibuat menjadi QR code.'); });
    setQrError('');
  }, [shortUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="qr-booster" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold border border-purple-200/80 mb-3">
            <QrCode className="w-3.5 h-3.5 text-purple-600" />
            Fitur Booster Review Google Maps
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Generator QR Code & Standee Meja Ulasan
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Buat standee meja akrilik atau stiker kasir dengan QR code yang langsung membuka halaman ulasan Google Maps pelanggan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Left (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
              Kustomisasi Standee Meja
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Bisnis Anda:
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Link Ulasan Google Maps (Shortlink):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shortUrl}
                  onChange={(e) => setShortUrl(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-mono text-[11px]"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Tersalin' : 'Salin'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pesan Tambahan (Opsional):
              </label>
              <textarea
                rows={2}
                value={promoOffer}
                onChange={(e) => setPromoOffer(e.target.value)}
                placeholder="Contoh: Terima kasih sudah meluangkan waktu berbagi pengalaman..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Meja / Area:
                </label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tema Warna:
                </label>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setThemeColor('emerald')}
                    className={`w-7 h-7 rounded-full bg-emerald-600 ring-2 ${
                      themeColor === 'emerald' ? 'ring-slate-900 scale-110' : 'ring-transparent'
                    }`}
                  />
                  <button
                    onClick={() => setThemeColor('indigo')}
                    className={`w-7 h-7 rounded-full bg-indigo-600 ring-2 ${
                      themeColor === 'indigo' ? 'ring-slate-900 scale-110' : 'ring-transparent'
                    }`}
                  />
                  <button
                    onClick={() => setThemeColor('amber')}
                    className={`w-7 h-7 rounded-full bg-amber-600 ring-2 ${
                      themeColor === 'amber' ? 'ring-slate-900 scale-110' : 'ring-transparent'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handlePrint}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                Cetak Standee Meja (Print)
              </button>
            </div>
          </div>

          {/* Standee Preview Right (7 cols) */}
          <div className="lg:col-span-7 flex justify-center">
            {/* The Printable Table Tent Card */}
            <div className="w-full max-w-sm bg-white rounded-3xl border-4 border-slate-900 p-6 shadow-2xl text-center relative overflow-hidden transition-all">
              {/* Standee Header */}
              <div
                className={`py-3 px-4 -mx-6 -mt-6 mb-5 text-white ${
                  themeColor === 'emerald'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700'
                    : themeColor === 'indigo'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-700'
                    : 'bg-gradient-to-r from-amber-600 to-orange-700'
                }`}
              >
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" /> Google Review
                </div>
                <h4 className="font-extrabold text-base tracking-tight mt-0.5">{businessName}</h4>
              </div>

              {/* Stars display */}
              <div className="flex justify-center text-amber-400 gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400" />
                ))}
              </div>

              <h3 className="font-black text-slate-900 text-lg leading-tight">
                Puas dengan Pengalaman Anda Hari Ini?
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Bagikan pengalaman Anda setelah berkunjung. Masukan Anda membantu kami terus berkembang.
              </p>

              {/* Real QR Code */}
              <div className="my-5 inline-block p-4 bg-white rounded-2xl border-2 border-dashed border-slate-300 shadow-inner relative group">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt={"QR code ulasan Google Maps untuk " + businessName}
                    className="w-40 h-40 mx-auto block"
                  />
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center text-center text-xs text-red-600 font-semibold">
                    {qrError || 'Membuat QR code...'}
                  </div>
                )}
                {qrDataUrl && (
                  <div className="absolute inset-0 bg-emerald-600/0 hover:bg-emerald-600/10 rounded-2xl flex items-center justify-center transition-all">
                    <span className="text-[10px] font-bold bg-white text-slate-800 px-2 py-0.5 rounded shadow-xs border border-slate-200">
                      Scan Kamera HP
                    </span>
                  </div>
                )}
              </div>

              {/* Incentive box */}
              {promoOffer && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 font-semibold mb-3 flex items-center justify-center gap-2">
                  <Gift className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{promoOffer}</span>
                </div>
              )}

              {/* Table number footer */}
              <div className="text-[11px] font-bold text-slate-400 flex items-center justify-between border-t border-slate-100 pt-3">
                <span>{tableNumber}</span>
                <span className="text-emerald-600">Powered by KetemuReview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
