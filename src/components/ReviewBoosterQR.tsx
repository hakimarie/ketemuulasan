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
  const [themeColor, setThemeColor] = useState<'blue' | 'green'>('blue');
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#1D4ED8] text-xs font-bold border border-[#BFDBFE]/80 mb-3">
            <QrCode className="w-3.5 h-3.5 text-[#2563EB]" />
            Fitur Booster Review Google Maps
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Generator QR Code & Standee Meja Ulasan
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Buat standee meja akrilik atau stiker kasir dengan QR code yang langsung membuka halaman ulasan Google Maps pelanggan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Left (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-[#0F172A] text-base border-b border-slate-100 pb-3">
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
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 font-medium"
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
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 font-mono text-[11px]"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#2563EB]" /> : <Copy className="w-3.5 h-3.5" />}
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
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
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
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tema Warna:
                </label>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setThemeColor('blue')}
                    className={`w-7 h-7 rounded-full bg-[#2563EB] ring-2 ${
                      themeColor === 'blue' ? 'ring-slate-900 scale-110' : 'ring-transparent'
                    }`}
                  />
                  <button
                    onClick={() => setThemeColor('blue')}
                    className={`w-7 h-7 rounded-full bg-[#2563EB] ring-2 ${
                      themeColor === 'blue' ? 'ring-slate-900 scale-110' : 'ring-transparent'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handlePrint}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                Cetak Standee Meja (Print)
              </button>
            </div>
          </div>

          {/* Standee Preview Right (7 cols) */}
          <div className="lg:col-span-7 flex justify-center">
            {/* The Printable Table Tent Card */}
            <div className="w-full max-w-sm bg-white rounded-3xl border-4 border-[#0F172A] p-6 shadow-2xl text-center relative overflow-hidden transition-all">
              {/* Standee Header */}
              <div
                className={`py-3 px-4 -mx-6 -mt-6 mb-5 text-white ${
                  themeColor === 'blue'
                    ? 'bg-gradient-to-r from-blue-600 to-green-700'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700'
                }`}
              >
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" /> Google Review
                </div>
                <h4 className="font-extrabold text-base tracking-tight mt-0.5">{businessName}</h4>
              </div>

              {/* Stars display */}
              <div className="flex justify-center text-green-400 gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-green-400" />
                ))}
              </div>

              <h3 className="font-black text-[#0F172A] text-lg leading-tight">
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
                  <div className="w-40 h-40 flex items-center justify-center text-center text-xs text-[#2563EB] font-semibold">
                    {qrError || 'Membuat QR code...'}
                  </div>
                )}
                {qrDataUrl && (
                  <div className="absolute inset-0 bg-[#2563EB]/0 hover:bg-[#2563EB]/10 rounded-2xl flex items-center justify-center transition-all">
                    <span className="text-[10px] font-bold bg-white text-slate-800 px-2 py-0.5 rounded shadow-xs border border-slate-200">
                      Scan Kamera HP
                    </span>
                  </div>
                )}
              </div>

              {/* Incentive box */}
              {promoOffer && (
                <div className="bg-[#ECFDF3] border border-[#B7EBC7] rounded-xl p-3 text-xs text-green-900 font-semibold mb-3 flex items-center justify-center gap-2">
                  <Gift className="w-4 h-4 text-[#2F9E59] shrink-0" />
                  <span>{promoOffer}</span>
                </div>
              )}

              {/* Table number footer */}
              <div className="text-[11px] font-bold text-slate-400 flex items-center justify-between border-t border-slate-100 pt-3">
                <span>{tableNumber}</span>
                <span className="text-[#2563EB]">Poweblue by KetemuReview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
