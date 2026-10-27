import React, { useState } from 'react';
import { Calculator, Sparkles, ArrowRight, ShieldCheck, TrendingUp, DollarSign } from 'lucide-react';

interface WasteCalculatorProps {
  onOpenRegister: () => void;
}

export const WasteCalculator: React.FC<WasteCalculatorProps> = ({ onOpenRegister }) => {
  // Venue type state
  const [venueType, setVenueType] = useState<'bistro' | 'restaurant' | 'chain'>('bistro');

  // Sliders state
  const [monthlyBudget, setMonthlyBudget] = useState<number>(250000);
  const [wasteRate, setWasteRate] = useState<number>(8);

  // Venue presets
  const handleVenueChange = (type: 'bistro' | 'restaurant' | 'chain') => {
    setVenueType(type);
    if (type === 'bistro') {
      setMonthlyBudget(180000);
      setWasteRate(6);
    } else if (type === 'restaurant') {
      setMonthlyBudget(450000);
      setWasteRate(9);
    } else if (type === 'chain') {
      setMonthlyBudget(1200000);
      setWasteRate(11);
    }
  };

  // Preventable waste ratio depending on business type
  const preventableRatio = venueType === 'chain' ? 0.75 : venueType === 'restaurant' ? 0.70 : 0.65;

  // Exact calculations
  const totalMonthlyWaste = Math.round(monthlyBudget * (wasteRate / 100));
  const monthlySavings = Math.round(totalMonthlyWaste * preventableRatio);
  const annualSavings = monthlySavings * 12;
  const dailySavings = Math.round(monthlySavings / 30);
  
  // Estimate rescued meals/portions (avg 180 TL cost per plate)
  const rescuedMealsAnnual = Math.round(annualSavings / 180);

  const formatTL = (val: number) => {
    return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(val) + ' ₺';
  };

  return (
    <section id="tasarruf-hesaplayici" className="py-20 bg-[#111215]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#171920] rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-xl space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e05338] mb-1">
                <Calculator className="w-4 h-4" />
                <span>İnteraktif Tasarruf Simülatörü</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Mutfağınızın Fire Kaybını Hesaplayın</h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                Aylık hammadde satın alma bütçenizi seçerek önlenebilir fire tasarrufunuzu görün.
              </p>
            </div>

            {/* Venue Selector */}
            <div className="grid grid-cols-3 sm:flex items-center gap-1 sm:gap-1.5 p-1 bg-[#121317] rounded-xl border border-neutral-800 text-xs w-full sm:w-auto">
              {[
                { id: 'bistro', label: 'Kafe & Bistro' },
                { id: 'restaurant', label: 'Alakart Restoran' },
                { id: 'chain', label: 'Çok Şubeli' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleVenueChange(t.id as any)}
                  className={`px-2 sm:px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer text-center whitespace-nowrap text-[11px] sm:text-xs ${
                    venueType === t.id
                      ? 'bg-[#c24128] text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders Input */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Monthly budget slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-300 font-medium text-xs sm:text-sm">Aylık Hammadde Bütçesi:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg sm:text-xl font-mono font-bold text-white tabular-nums">
                      {formatTL(monthlyBudget)}
                    </span>
                  </div>
                </div>
                
                <input
                  type="range"
                  min="40000"
                  max="2000000"
                  step="10000"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#c24128]"
                />
                
                <div className="flex justify-between text-[10.5px] sm:text-[11px] font-mono text-neutral-500">
                  <button onClick={() => setMonthlyBudget(100000)} className="hover:text-white cursor-pointer">100K ₺</button>
                  <button onClick={() => setMonthlyBudget(500000)} className="hover:text-white cursor-pointer">500K ₺</button>
                  <button onClick={() => setMonthlyBudget(1000000)} className="hover:text-white cursor-pointer">1.000K ₺</button>
                  <button onClick={() => setMonthlyBudget(2000000)} className="hover:text-white cursor-pointer">2.000K ₺</button>
                </div>
              </div>

              {/* Estimated waste percentage slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-300 font-medium text-xs sm:text-sm">Mevcut Mutfak Fire Oranı:</span>
                  <span className="text-base sm:text-lg font-mono font-bold text-[#f26a4f] tabular-nums">
                    %{wasteRate}
                  </span>
                </div>
                
                <input
                  type="range"
                  min="3"
                  max="20"
                  step="1"
                  value={wasteRate}
                  onChange={(e) => setWasteRate(Number(e.target.value))}
                  className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#c24128]"
                />
                
                <div className="flex justify-between text-[10.5px] sm:text-[11px] font-mono text-neutral-500">
                  <button onClick={() => setWasteRate(4)} className="hover:text-white cursor-pointer">%4 (Düşük)</button>
                  <button onClick={() => setWasteRate(8)} className="hover:text-white cursor-pointer">%8 (Ortalama)</button>
                  <button onClick={() => setWasteRate(14)} className="hover:text-white cursor-pointer">%14 (Yüksek)</button>
                </div>
              </div>

              {/* Visual Breakdown Bar */}
              <div className="bg-[#121317] p-3.5 rounded-xl border border-neutral-800 space-y-2">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-emerald-400">Kurtarılabilir Kâr: %{Math.round(preventableRatio * 100)}</span>
                  <span className="text-neutral-500">Kaçınılmaz Trim: %{Math.round((1 - preventableRatio) * 100)}</span>
                </div>
                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-emerald-500 rounded-l-full transition-all duration-300" 
                    style={{ width: `${preventableRatio * 100}%` }}
                    title="GastroStok ile kurtarılan miktar"
                  ></div>
                  <div 
                    className="h-full bg-[#c24128]/70 rounded-r-full transition-all duration-300" 
                    style={{ width: `${(1 - preventableRatio) * 100}%` }}
                    title="Doğal ayıklama kaybı"
                  ></div>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed">
                * Bu hesaplama; yapay zeka talep tahmini ve SKT önceliklendirmesi ile mutfaktaki plansız satın alma ve bozulma kaynaklı firenin %{Math.round(preventableRatio * 100)} oranında engellenmesi projeksiyonuna dayanmaktadır.
              </p>
            </div>

            {/* Calculated Output Card */}
            <div className="lg:col-span-5 bg-[#121317] p-6 rounded-2xl border border-neutral-800/90 space-y-5">
              <div>
                <span className="text-xs font-mono text-neutral-400 block mb-1">Potansiyel Geri Kazanım</span>
                <p className="text-3xl font-extrabold text-[#f26a4f] font-mono tabular-nums tracking-tight">
                  {formatTL(annualSavings)}
                </p>
                <p className="text-xs text-neutral-400 mt-1">Yıllık tahmini net kâr artışı</p>
              </div>

              <div className="pt-4 border-t border-neutral-800 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Aylık Toplam Fire Bedeli:</span>
                  <span className="font-mono text-neutral-300 tabular-nums font-semibold">{formatTL(totalMonthlyWaste)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Aylık Kurtarılabilecek Tutar:</span>
                  <span className="font-mono font-bold text-white tabular-nums">{formatTL(monthlySavings)} / ay</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Günlük Net Tasarruf:</span>
                  <span className="font-mono text-emerald-400 tabular-nums">~{formatTL(dailySavings)} / gün</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Kurtarılacak Porsiyon (Yıllık):</span>
                  <span className="font-mono text-neutral-200 tabular-nums">~{new Intl.NumberFormat('tr-TR').format(rescuedMealsAnnual)} Tabak</span>
                </div>
              </div>

              <button
                onClick={onOpenRegister}
                className="w-full py-3.5 px-4 bg-[#c24128] hover:bg-[#aa3620] active:bg-[#942e1a] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Bu Tasarrufu Başlat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
