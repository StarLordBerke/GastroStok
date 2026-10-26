import React from 'react';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  currentPage?: PageView;
  onNavigate: (page: PageView) => void;
  onOpenRegister: () => void;
  onOpenUserLogin?: (tab?: 'login' | 'register') => void;
}

export const Footer: React.FC<FooterProps> = ({ currentPage = 'home', onNavigate, onOpenRegister, onOpenUserLogin }) => {
  const handleNav = (page: PageView, hash?: string) => {
    onNavigate(page);
    if (page === 'home' && hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0e0f12] border-t border-neutral-800 text-neutral-400 text-sm">
      
      {/* Pre-footer Call to Action Banner (Only on Home Page) */}
      {currentPage === 'home' && (
        <div className="border-b border-neutral-800/80 py-16 bg-[#121317]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#1a1c24] to-[#16181f] rounded-3xl p-8 sm:p-12 border border-neutral-800 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <span className="text-xs font-mono uppercase tracking-wider text-[#e05338] font-semibold">
                  Mutfağınızı Bugün Optimize Edin
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Mutfaktaki fireyi durdurun, net kârınızı artırın.
                </h3>
                <p className="text-sm text-neutral-300">
                  GastroStok ile restoran veya kafenizi dakikalar içinde sisteme entegre edin, yapay zeka destekli hammadde tahminlerini hemen kullanmaya başlayın.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  onClick={onOpenRegister}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#c24128] hover:bg-[#aa3620] active:bg-[#942e1a] rounded-xl shadow-lg shadow-[#c24128]/25 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Restoranını Ücretsiz Ekle</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <button onClick={() => handleNav('home')} className="flex items-center gap-2.5 text-white font-bold text-xl group cursor-pointer text-left">
              <div className="w-8 h-8 rounded-lg bg-[#c24128] flex items-center justify-center text-white shadow-sm shadow-[#c24128]/30">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <span className="tracking-tight">
                Gastro<span className="text-[#e05338]">Stok</span>
              </span>
            </button>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              Restoran ve kafelerin geçmiş satış verilerini analiz ederek stok ihtiyaçlarını tahmin eden ve fireyi önleyen AI destekli web uygulaması.
            </p>
            <div className="text-xs font-mono text-neutral-400 pt-2">
              Sektör: Yiyecek & İçecek Operasyon Teknolojileri
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Sayfalar & Bölümler</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors cursor-pointer">Anasayfa</button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors cursor-pointer text-[#f26a4f]">Hakkında & Vizyon</button>
              </li>
              <li>
                <button onClick={() => handleNav('blog')} className="hover:text-white transition-colors cursor-pointer text-[#f26a4f]">Blog & Makaleler</button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors cursor-pointer text-[#f26a4f]">İletişim & Ofis</button>
              </li>
              <li>
                <button onClick={() => handleNav('home', '#sorun-ve-cozum')} className="hover:text-white transition-colors cursor-pointer">Sorun & Çözüm</button>
              </li>
              <li>
                <button onClick={() => handleNav('home', '#musteri-yorumlari')} className="hover:text-white transition-colors cursor-pointer">Müşteri Yorumları</button>
              </li>
              <li>
                <button onClick={() => handleNav('contact', '#sss')} className="hover:text-white transition-colors cursor-pointer">Sık Sorulan Sorular (SSS)</button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenUserLogin ? onOpenUserLogin('login') : handleNav('member')} 
                  className="hover:text-white transition-colors cursor-pointer text-[#f26a4f] flex items-center gap-1 font-medium"
                >
                  <span>Kullanıcı & Üye Girişi</span>
                  <span className="text-[10px] px-1 py-0.2 rounded bg-[#c24128]/20 text-[#f26a4f]">Üye</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Core Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Çalışır Modüller</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('modules')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Modül 01: Kolay Stok Girişi
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('modules')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Modül 02: Fire Raporları
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('modules')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Modül 03: AI Talep Tahmini
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('modules')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Modül 04: Tedarikçi Siparişi
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">İletişim & Kurulum</h4>
            <div className="space-y-2 text-xs text-neutral-400">
              <p>Mutfak Entegrasyon Hattı</p>
              <p className="text-white font-mono">destek@gastrostok.com</p>
              <p className="text-neutral-400">Levent, Maslak / İstanbul</p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => handleNav('contact')}
                className="text-xs font-medium text-[#f26a4f] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>İletişim Formuna Git</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
          <p>© 2026 GastroStok Teknolojileri A.Ş. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <span>Kullanım Şartları</span>
            <span>Gizlilik ve KVKK</span>
            <span>Mutfak Güvenliği</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
