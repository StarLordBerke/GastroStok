import React from 'react';
import { ArrowRight, ChevronDown, Check } from 'lucide-react';
import { getAssetUrl, handleImageFallback } from '../utils/assets';

interface HeroProps {
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
      {/* Subtle background ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-25">
        <div className="absolute top-[-100px] left-1/3 w-[500px] h-[350px] bg-[#c24128]/25 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Eyebrow without pill enclosure */}
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-5">
          <span className="text-[#f26a4f] font-semibold">GastroStok v2.4</span>
          <span aria-hidden="true">·</span>
          <span>Restoran & Kafe Mutfak Yönetimi</span>
          <span aria-hidden="true">·</span>
          <span>Akıllı Stok ve Fire Tahmini</span>
        </div>

        {/* Main Headline & Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.15] text-balance">
              Mutfaktaki fireyi durdurun.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#e05338]">
                Yapay zeka ile stoklarınızı yönetin, karlılığınızı artırın.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              GastroStok; geçmiş adisyon verilerini, hava durumunu ve reçetelerinizi birleştirerek mutfağınızın hammadde ihtiyacını gün gün öngörür. Bozulan malzemeleri ve gereksiz tedarik harcamalarını geçmişte bırakın.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#c24128] hover:bg-[#aa3620] active:bg-[#942e1a] rounded-xl shadow-lg shadow-[#c24128]/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Restoranını Ücretsiz Ekle</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#sorun-ve-cozum"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-neutral-300 hover:text-white bg-[#1a1c22] hover:bg-[#22252e] border border-neutral-800 rounded-xl transition-colors whitespace-nowrap"
              >
                <span>Nasıl Çalışır?</span>
                <ChevronDown className="w-4 h-4 text-neutral-400" />
              </a>
            </div>

            {/* Trust highlights without fake claims */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-neutral-800/80 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e05338] shrink-0" />
                <span>Mevcut POS & adisyon ile uyumlu</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e05338] shrink-0" />
                <span>Dakikalar içinde reçete kurulumu</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e05338] shrink-0" />
                <span>Mobil ve tablet tam uyumlu</span>
              </div>
            </div>
          </div>

          {/* Kitchen visual card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-[#16181e] shadow-xl group">
              <img
                src={getAssetUrl('/assets/images/gastrostok_kitchen_prep_1792910840616.jpg')}
                alt="Modern restoran mutfağında hazırlık ve porsiyon kontrolü"
                referrerPolicy="no-referrer"
                onError={handleImageFallback}
                className="w-full h-80 sm:h-96 object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111215] via-[#111215]/50 to-transparent"></div>
              
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#f26a4f] font-mono">
                  <span>Mutfak Disiplini</span>
                  <span aria-hidden="true">·</span>
                  <span>Gerçek Zamanlı Porsiyon Takibi</span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-white">
                  Her gram hammadde dijital reçetelerle eşleşir.
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2">
                  Hazırlanan her tabak, depodaki et, süt ve taze sebze stoklarından gramajına göre anında düşülür.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
