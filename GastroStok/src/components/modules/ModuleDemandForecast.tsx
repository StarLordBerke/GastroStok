import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  CloudRain, 
  Sun, 
  Wind, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  TrendingUp,
  RotateCw
} from 'lucide-react';

interface ForecastRow {
  name: string;
  category: string;
  unit: string;
  expectedPortions: number;
  rawMaterialNeeded: number;
  currentStock: number;
  safetyBuffer: number;
  recommendedOrder: number;
  confidence: number;
}

interface ModuleDemandForecastProps {
  onTransferToOrders?: () => void;
}

export const ModuleDemandForecast: React.FC<ModuleDemandForecastProps> = ({ onTransferToOrders }) => {
  const [selectedDay, setSelectedDay] = useState<'weekday' | 'friday' | 'saturday' | 'sunday'>('saturday');
  const [weatherCondition, setWeatherCondition] = useState<'sunny' | 'rainy' | 'cold'>('sunny');
  const [occupancyRate, setOccupancyRate] = useState<number>(85);
  const [isSimulating, setIsSimulating] = useState(false);
  const [transferDone, setTransferDone] = useState(false);

  // Multipliers based on inputs
  const dayMultiplier = selectedDay === 'saturday' ? 1.4 : selectedDay === 'friday' ? 1.25 : selectedDay === 'sunday' ? 1.15 : 0.85;
  const weatherMultiplier = weatherCondition === 'rainy' ? 0.82 : weatherCondition === 'cold' ? 0.9 : 1.05;
  const occupancyMultiplier = occupancyRate / 100;

  const totalFactor = dayMultiplier * weatherMultiplier * occupancyMultiplier;

  const baseItems = [
    { name: 'Dana Bonfile (Dry Aged)', category: 'Et Grubu', unit: 'kg', basePortions: 45, baseRaw: 9.0, currentStock: 4.5, bufferPct: 15 },
    { name: 'Kuzey Denizi Somon Fileto', category: 'Et & Balık', unit: 'kg', basePortions: 35, baseRaw: 7.0, currentStock: 3.0, bufferPct: 15 },
    { name: 'Taze Burrata Peyniri', category: 'Şarküteri', unit: 'adet', basePortions: 40, baseRaw: 40, currentStock: 12, bufferPct: 10 },
    { name: 'Özel Smash Burger Köftesi', category: 'Et Grubu', unit: 'kg', basePortions: 90, baseRaw: 14.4, currentStock: 6.0, bufferPct: 20 },
    { name: 'Taze Roka & Akdeniz Yeşilliği', category: 'Sebze & Hal', unit: 'bağ', basePortions: 65, baseRaw: 22, currentStock: 8, bufferPct: 15 },
    { name: 'Espresso Çekirdeği (Arabica)', category: 'Bar & İçecek', unit: 'kg', basePortions: 220, baseRaw: 4.4, currentStock: 2.5, bufferPct: 25 },
  ];

  const forecastData: ForecastRow[] = baseItems.map(item => {
    const expectedPortions = Math.round(item.basePortions * totalFactor);
    const rawMaterialNeeded = parseFloat((item.baseRaw * totalFactor).toFixed(1));
    const safetyBuffer = parseFloat(((rawMaterialNeeded * item.bufferPct) / 100).toFixed(1));
    const totalRequired = rawMaterialNeeded + safetyBuffer;
    const diff = totalRequired - item.currentStock;
    const recommendedOrder = diff > 0 ? parseFloat(diff.toFixed(1)) : 0;
    const confidence = weatherCondition === 'sunny' ? 96 : 91;

    return {
      name: item.name,
      category: item.category,
      unit: item.unit,
      expectedPortions,
      rawMaterialNeeded,
      currentStock: item.currentStock,
      safetyBuffer,
      recommendedOrder,
      confidence
    };
  });

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  const handleTransfer = () => {
    setTransferDone(true);
    if (onTransferToOrders) {
      setTimeout(() => {
        onTransferToOrders();
      }, 1000);
    }
    setTimeout(() => setTransferDone(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#e05338] mb-1">
            <BrainCircuit className="w-4 h-4" />
            <span>Modül 03 · Yapay Zeka Destekli Talep Tahmin Motoru</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Dinamik Adisyon & Tüketim Öngörüsü</h2>
          <p className="text-xs text-neutral-400">
            Geçmiş satış verileri, hava şartları ve rezervasyon yoğunluğunu analiz ederek hammadde ihtiyaçlarını nokta atışı belirleyin.
          </p>
        </div>

        <button
          onClick={handleSimulate}
          disabled={isSimulating}
          className="px-4 py-2.5 bg-[#c24128] hover:bg-[#aa3620] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-75 self-start sm:self-auto"
        >
          <RotateCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>{isSimulating ? 'Tahmin Hesaplanıyor...' : 'Modeli Yeniden Çalıştır'}</span>
        </button>
      </div>

      {/* Simulator Inputs Box */}
      <div className="bg-[#171920] rounded-2xl p-5 sm:p-6 border border-neutral-800 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
          <span className="font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#e05338]" /> Simülasyon Girdileri ve Saha Faktörleri
          </span>
          <span className="text-neutral-400 font-mono">Algoritma: GastroStok Temporal-Food v2.4</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Day selection */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-neutral-300 block">
              1. Servis Günü ve Vardiya
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'weekday', label: 'Hafta İçi (Sal-Per)' },
                { id: 'friday', label: 'Cuma Akşamı' },
                { id: 'saturday', label: 'Cumartesi Yoğun' },
                { id: 'sunday', label: 'Pazar Aile/Brunch' },
              ].map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDay(d.id as any)}
                  className={`p-2 rounded-lg text-left transition-colors cursor-pointer border ${
                    selectedDay === d.id
                      ? 'bg-[#c24128]/20 border-[#c24128] text-white font-semibold'
                      : 'bg-[#121317] border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Weather condition */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-neutral-300 block">
              2. Yerel Hava Durumu Tahmini
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'sunny', label: 'Açık / Güneşli', icon: Sun },
                { id: 'rainy', label: 'Sağanak Yağış', icon: CloudRain },
                { id: 'cold', label: 'Soğuk & Rüzgar', icon: Wind },
              ].map(w => {
                const Icon = w.icon;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setWeatherCondition(w.id as any)}
                    className={`p-2.5 rounded-lg flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                      weatherCondition === w.id
                        ? 'bg-[#c24128]/20 border-[#c24128] text-white font-semibold'
                        : 'bg-[#121317] border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#e05338]" />
                    <span className="text-[11px] text-center leading-tight">{w.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Occupancy slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-neutral-300">3. Beklenen Rezervasyon & Doluluk:</span>
              <span className="font-mono font-bold text-white tabular-nums">%{occupancyRate} Doluluk</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              step="5"
              value={occupancyRate}
              onChange={e => setOccupancyRate(Number(e.target.value))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#c24128]"
            />
            <div className="flex justify-between text-[11px] font-mono text-neutral-500">
              <span>%40 (Sakin)</span>
              <span>%75 (Normal)</span>
              <span>%100 (Tam Kapasite)</span>
            </div>
          </div>

        </div>
      </div>

      {transferDone && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Önerilen sipariş miktarları "Modül 04: Tek Tıkla Tedarikçi Siparişi" sepetine aktarıldı!</span>
        </div>
      )}

      {/* Forecast Output Table */}
      <div className="bg-[#171920] rounded-2xl border border-neutral-800 overflow-hidden shadow-xl">
        <div className="p-4 bg-[#14151b] border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <h4 className="font-bold text-white">Yapay Zeka Destekli Satın Alma Öneri Tablosu</h4>
            <p className="text-neutral-400 text-[11px]">
              Girdi faktörlerine göre hesaplanan net ihtiyaç ve önerilen tedarik listesi
            </p>
          </div>

          <button
            onClick={handleTransfer}
            className="px-4 py-2 bg-[#1f222b] hover:bg-[#282c37] text-white border border-neutral-700/80 rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer self-start sm:self-auto text-xs"
          >
            <span>Tedarik Sepetine Aktar</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#e05338]" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#121317] text-neutral-400 uppercase tracking-wider text-[11px] font-mono border-b border-neutral-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Hammadde Adı</th>
                <th className="py-3.5 px-4 font-semibold">Kategori</th>
                <th className="py-3.5 px-4 font-semibold text-center">Tahmini Tabak</th>
                <th className="py-3.5 px-4 font-semibold text-center">Gereken Hammadde</th>
                <th className="py-3.5 px-4 font-semibold text-center">Mevcut Depo</th>
                <th className="py-3.5 px-4 font-semibold text-center">Emniyet Tamponu</th>
                <th className="py-3.5 px-4 font-semibold text-right">Önerilen Sipariş</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-neutral-200">
              {forecastData.map((row, idx) => {
                const needsOrder = row.recommendedOrder > 0;
                return (
                  <tr key={idx} className="hover:bg-[#1a1c24] transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">
                      {row.name}
                    </td>
                    <td className="py-3 px-4 text-neutral-400">
                      <span className="px-2 py-0.5 rounded bg-neutral-800 text-[11px]">
                        {row.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-center tabular-nums text-neutral-300">
                      {row.expectedPortions} porsiyon
                    </td>
                    <td className="py-3 px-4 font-mono text-center tabular-nums font-semibold text-white">
                      {row.rawMaterialNeeded} {row.unit}
                    </td>
                    <td className="py-3 px-4 font-mono text-center tabular-nums text-neutral-400">
                      {row.currentStock} {row.unit}
                    </td>
                    <td className="py-3 px-4 font-mono text-center tabular-nums text-neutral-400 text-[11px]">
                      +{row.safetyBuffer} {row.unit}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {needsOrder ? (
                        <span className="font-mono font-bold text-[#f26a4f] bg-[#c24128]/15 px-2.5 py-1 rounded-md border border-[#c24128]/30">
                          +{row.recommendedOrder} {row.unit}
                        </span>
                      ) : (
                        <span className="font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded text-[11px] border border-emerald-500/30">
                          Stok Yeterli
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
