import React from 'react';
import { MessageSquareQuote, ShieldCheck, Heart, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDashboard }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs py-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-extrabold text-base">
                <MessageSquareQuote className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Ketemu<span className="text-emerald-500">Review</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Platform otomasi reputasi dan auto-reply ulasan Google Business Profile #1 di Indonesia berbasis AI Generatif cerdas.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Google Partner & API Compliant</span>
            </div>
          </div>

          {/* Col 2: Fitur Utama */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Fitur Utama</h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate('generator')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  AI Review Reply Generator
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDashboard}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Dashboard Inbox Google Bisnisku
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('autopilot')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Aturan Auto-Pilot 24/7
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('templates')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Koleksi Template Balasan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('qr-booster')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  QR Code Review Standee Meja
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Industri */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Solusi Industri</h4>
            <ul className="space-y-1.5">
              <li>Kafe, Coffee Shop & Restoran</li>
              <li>Klinik Kecantikan & Dokter Gigi</li>
              <li>Hotel, Villa & Penginapan</li>
              <li>Bengkel Mobil, Motor & Detailing</li>
              <li>Salon, Barbershop & Spa</li>
              <li>Toko Ritel & Fashion UMKM</li>
            </ul>
          </div>

          {/* Col 4: Keamanan & Kontak */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Dukungan & Legal</h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Pusat Bantuan & FAQ
                </button>
              </li>
              <li>Kebijakan Privasi (Privacy Policy)</li>
              <li>Ketentuan Layanan (Terms of Service)</li>
              <li>Status Server (Uptime 99.98%)</li>
              <li className="pt-2 text-slate-300">
                Jakarta Selatan, DKI Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} KetemuReview. Seluruh hak cipta dilindungi undang-undang.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> untuk UMKM dan Pemilik Bisnis Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};
