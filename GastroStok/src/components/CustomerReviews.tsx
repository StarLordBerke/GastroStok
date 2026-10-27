import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  TrendingDown, 
  Sparkles 
} from 'lucide-react';

import { ReviewItem } from '../types';
import { INITIAL_REVIEWS } from '../data/reviewsData';

interface CustomerReviewsProps {
  reviews?: ReviewItem[];
  onOpenRegister?: () => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews = INITIAL_REVIEWS }) => {
  const [filterCategory, setFilterCategory] = useState<string>('Tümü');

  const categories = ['Tümü', 'Alakart Restoran', 'Kafe & Roastery', 'Çok Şubeli Zincir', 'Otel & Ziyafet', 'Meyhane & Bistro'];

  const displayedReviews = reviews.filter(r => r.featured !== false);

  const filteredReviews = filterCategory === 'Tümü'
    ? displayedReviews
    : displayedReviews.filter(r => r.venueType === filterCategory);

  return (
    <section id="musteri-yorumlari" className="py-20 sm:py-24 bg-[#0e1017] border-t border-neutral-800/80 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#c24128]/8 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-neutral-800/80">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e05338]">
              <Sparkles className="w-4 h-4" />
              <span>Kanıtlanmış Mutfak Başarıları</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Öne Çıkan Restoran ve Mutfak Yorumları
            </h2>
            
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              GastroStok ile gıda israfını durduran, porsiyon firelerini kontrol altına alan ve kârlılığını artıran şef ve işletmecilerin gerçek deneyimleri.
            </p>
          </div>

          {/* Social Proof KPI Box */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#141620] border border-neutral-800 shrink-0 self-start lg:self-auto">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="border-l border-neutral-700/80 pl-4 text-xs font-mono">
              <p className="font-bold text-white text-sm">4.9 / 5.0 Puan</p>
              <p className="text-neutral-400">240+ Aktif Mutfak & Kafe</p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar touch-pan-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#c24128] text-white shadow-lg shadow-[#c24128]/25'
                  : 'bg-[#141620] text-neutral-400 hover:text-white hover:bg-[#1a1c28] border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 6 Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl bg-[#141620] border border-neutral-800/90 p-6 flex flex-col justify-between hover:border-[#c24128]/40 transition-all duration-300 group shadow-xl hover:shadow-[#c24128]/5 relative"
            >
              {/* Top Quote Icon & Stars */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-mono text-neutral-400 px-2 py-0.5 rounded bg-neutral-800/80 border border-neutral-700/60">
                    {review.posSystem} Entegre
                  </span>
                </div>

                {/* Highlight Metric Pill */}
                <div className="p-2.5 rounded-xl bg-[#c24128]/10 border border-[#c24128]/30 flex items-center gap-2 text-xs font-semibold text-[#f26a4f]">
                  <TrendingDown className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{review.highlightMetric}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{review.reviewText}"
                </p>
              </div>

              {/* Author & Restaurant Details */}
              <div className="pt-5 mt-5 border-t border-neutral-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-neutral-700/80 shadow-md bg-neutral-800">
                    {review.avatarImage ? (
                      <img
                        src={review.avatarImage}
                        alt={review.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.includes('/src/assets/')) {
                            target.src = target.src.replace('/src/assets/', '/assets/');
                          }
                        }}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${review.avatarColor || 'from-[#c24128] to-[#8d2a17]'} text-white flex items-center justify-center font-bold text-xs`}>
                        {review.avatarInitials}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-white truncate">{review.name}</h4>
                      {review.verified && (
                        <span title="Doğrulanmış İşletme">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400 truncate">{review.restaurant}</p>
                    <p className="text-[10px] text-neutral-400 font-mono">{review.location}</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
