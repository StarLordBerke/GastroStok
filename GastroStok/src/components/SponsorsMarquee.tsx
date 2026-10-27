import React from 'react';
import { SPONSORS_DATA } from '../data/sponsorsData';
import { Handshake } from 'lucide-react';

export const SponsorsMarquee: React.FC = () => {
  // Duplicate array for seamless infinite looping
  const doubleSponsors = [...SPONSORS_DATA, ...SPONSORS_DATA];

  return (
    <section className="py-12 bg-[#101114] border-y border-neutral-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-neutral-400">
            <Handshake className="w-4 h-4 text-[#e05338]" />
            <span className="font-semibold text-white tracking-wide uppercase text-[11px]">Sektörel Destekçiler ve Çözüm Ortakları</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">10 Ekosistem Partneri</span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
            Kesintisiz Akış · Soldan Sağa Kayar
          </span>
        </div>
      </div>

      {/* Infinite Marquee Container (Left to Right) */}
      <div className="relative w-full overflow-hidden mask-gradient-x">
        {/* Subtle gradient fades on left and right edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#101114] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#101114] to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee-ltr py-2 flex items-center gap-4 sm:gap-6">
          {doubleSponsors.map((sponsor, index) => (
            <div
              key={`${sponsor.id}-${index}`}
              className="flex items-center gap-3.5 px-5 py-3 rounded-xl bg-[#16181f] border border-neutral-800 hover:border-[#c24128]/50 hover:bg-[#1a1d26] transition-all shrink-0 cursor-default group"
            >
              {/* Monogram Badge */}
              <div className="w-9 h-9 rounded-lg bg-[#222530] border border-neutral-700/80 flex items-center justify-center font-mono font-bold text-xs text-[#f26a4f] group-hover:bg-[#c24128] group-hover:text-white transition-colors">
                {sponsor.badge}
              </div>

              {/* Sponsor Details */}
              <div className="text-left">
                <p className="text-sm font-semibold text-white tracking-tight whitespace-nowrap group-hover:text-[#f26a4f] transition-colors">
                  {sponsor.name}
                </p>
                <p className="text-[11px] font-mono text-neutral-400 whitespace-nowrap">
                  {sponsor.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
