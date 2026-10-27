import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  ShoppingCart, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  ChefHat, 
  Sparkles,
  ArrowUpRight,
  Clock,
  Layers
} from 'lucide-react';

export const DashboardVitrin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tahmin' | 'fire' | 'siparis'>('tahmin');
  const [orderSent, setOrderSent] = useState(false);

  return (
    <div className="w-full bg-[#16181e] rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden">
      {/* Top Console Bar */}
      <div className="px-4 sm:px-6 py-3.5 bg-[#121317] border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-700"></span>
          </div>
          <span className="text-neutral-500 hidden sm:inline">|</span>
          <div className="flex items-center gap-2 text-neutral-300 font-medium">
            <ChefHat className="w-4 h-4 text-[#e05338]" />
            <span>Bistro Galata · Merkez Mutfak</span>
          </div>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center gap-1 p-1 bg-[#1c1f26] rounded-lg border border-neutral-800">
          <button
            onClick={() => setActiveTab('tahmin')}
            className={`px-3 py-1.5 rounded-md font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tahmin'
                ? 'bg-[#c24128] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">AI Talep Tahmini</span>
          </button>
          <button
            onClick={() => setActiveTab('fire')}
            className={`px-3 py-1.5 rounded-md font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'fire'
                ? 'bg-[#c24128] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Fire & SKT Alarmları</span>
          </button>
          <button
            onClick={() => setActiveTab('siparis')}
            className={`px-3 py-1.5 rounded-md font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'siparis'
                ? 'bg-[#c24128] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Otomatik Sipariş</span>
          </button>
        </div>
      </div>

      {/* Console Content Area */}
      <div className="p-4 sm:p-6 lg:p-7 space-y-6">
        
        {/* TAB 1: AI TALEP TAHMİNİ */}
        {activeTab === 'tahmin' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-800/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Önümüzdeki 7 Günlük Projeksiyon</span>
                  <span className="text-xs text-[#e05338] font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Adisyon & Trend Analizli
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-white mt-0.5">Haftalık Hammadde İhtiyaç Tahmini</h4>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>25 Ekim - 31 Ekim 2026</span>
              </div>
            </div>

            {/* Forecast Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { 
                  name: 'Dana Bonfile (Dry Aged)', 
                  category: 'Et Grubu', 
                  unit: 'kg', 
                  current: 14.5, 
                  predicted: 42.0, 
                  recommendedOrder: 30.0,
                  level: 35, 
                  status: 'Sipariş Öneriliyor' 
                },
                { 
                  name: 'Taze Burrata Peyniri', 
                  category: 'Şarküteri & Süt', 
                  unit: 'adet', 
                  current: 8, 
                  predicted: 36, 
                  recommendedOrder: 30,
                  level: 22, 
                  status: 'Kritik Düşüş' 
                },
                { 
                  name: 'Taze Fesleğen & Yeşillik', 
                  category: 'Sebze & Hal', 
                  unit: 'bağ', 
                  current: 12, 
                  predicted: 28, 
                  recommendedOrder: 20,
                  level: 42, 
                  status: 'Yeterli Eşik' 
                },
                { 
                  name: 'Özel Espresso Çekirdeği (100% Arabica)', 
                  category: 'Bar & Sıcak İçecek', 
                  unit: 'kg', 
                  current: 9.0, 
                  predicted: 22.5, 
                  recommendedOrder: 15.0,
                  level: 40, 
                  status: 'Planlı Tedarik' 
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#1b1e26] p-4 rounded-xl border border-neutral-800/90 hover:border-neutral-700 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-xs text-neutral-400">{item.category}</p>
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 bg-neutral-800/80 text-neutral-300 rounded border border-neutral-700/60">
                      {item.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 my-3">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-neutral-400">Mevcut: <strong className="text-neutral-200 tabular-nums">{item.current} {item.unit}</strong></span>
                      <span className="text-neutral-400">Beklenen Talep: <strong className="text-white tabular-nums">{item.predicted} {item.unit}</strong></span>
                    </div>
                    <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden flex">
                      <div 
                        className="h-full bg-neutral-500 rounded-l-full" 
                        style={{ width: `${item.level}%` }}
                      ></div>
                      <div 
                        className="h-full bg-[#c24128]/70" 
                        style={{ width: `${100 - item.level}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Önerilen Sipariş:</span>
                    <span className="font-semibold text-[#f26a4f] font-mono tabular-nums">+{item.recommendedOrder} {item.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#121317] p-3.5 rounded-xl border border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#e05338]" />
                Geçmiş 60 günlük Cuma-Pazar adisyon verisi ve yağış durumu hesaba katılmıştır.
              </span>
              <span className="font-mono text-neutral-500 hidden sm:inline">Algoritma: Dinamik Reçete Ayrıştırma</span>
            </div>
          </div>
        )}

        {/* TAB 2: KRİTİK FİRE VE SKT ALARMLARI */}
        {activeTab === 'fire' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800">
              <div>
                <h4 className="text-lg font-semibold text-white">Aktif Fire Riskleri ve SKT Uyarısı</h4>
                <p className="text-xs text-neutral-400">Raf ömrü tükenmek üzere olan ürünler için otomatik şef yönlendirmesi</p>
              </div>
              <span className="text-xs font-mono text-neutral-300 px-2.5 py-1 bg-[#2b1816] border border-[#c24128]/30 rounded-lg text-[#f26a4f]">
                3 Kritik Kalem Tespit Edildi
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  product: 'Organik Taze Krema (%35 Yağlı)',
                  lot: 'LOT-9482',
                  quantity: '4.5 Litre',
                  daysLeft: 'Son 2 Gün',
                  severity: 'high',
                  suggestedAction: 'Günün çorbası ve makarna sosu hazırlığında önceliklendir',
                  potentialLoss: '480 ₺'
                },
                {
                  product: 'Kuzey Denizi Somon Fileto',
                  lot: 'LOT-8831',
                  quantity: '3.2 kg',
                  daysLeft: 'Son 3 Gün',
                  severity: 'high',
                  suggestedAction: 'Şefin Akşam Spesiyaline (Izgara Somon Bowl) porsiyonla',
                  potentialLoss: '1.250 ₺'
                },
                {
                  product: 'Roka & Akdeniz Yeşilliği Karışımı',
                  lot: 'LOT-7714',
                  quantity: '6 Kasa',
                  daysLeft: 'Son 4 Gün',
                  severity: 'medium',
                  suggestedAction: 'Öğle menüsü salata büfesinde hızlı rotasyona sok',
                  potentialLoss: '310 ₺'
                }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[#1b1e26] rounded-xl border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#f26a4f] bg-[#c24128]/15 px-2 py-0.5 rounded border border-[#c24128]/30 font-semibold">
                        {item.daysLeft}
                      </span>
                      <span className="text-sm font-semibold text-white">{item.product}</span>
                      <span className="text-xs text-neutral-500 font-mono">({item.lot})</span>
                    </div>
                    <p className="text-xs text-neutral-400 flex items-center gap-1.5">
                      <span className="text-neutral-300 font-medium">Öneri:</span> {item.suggestedAction}
                    </p>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 text-xs shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-800">
                    <div>
                      <span className="text-neutral-500 block">Kalan Miktar</span>
                      <span className="font-semibold text-neutral-200 font-mono">{item.quantity}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Risk Tutarı</span>
                      <span className="font-semibold text-[#f26a4f] font-mono tabular-nums">{item.potentialLoss}</span>
                    </div>
                    <button 
                      onClick={() => alert(`"${item.product}" mutfak hazırlık tahtasına "Öncelikli Tüketim" olarak eklendi.`)}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors font-medium cursor-pointer"
                    >
                      Mutfak Listesine Al
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: OTOMATİK TEDARİKÇİ SEPETİ */}
        {activeTab === 'siparis' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
              <div>
                <h4 className="text-lg font-semibold text-white">Hazır Tedarikçi Sipariş Listesi</h4>
                <p className="text-xs text-neutral-400">Minimum stok eşiği ve AI tahmini doğrultusunda toptancılara göre gruplanmış sepet</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-neutral-400 block">Toplam Sipariş Kalemi</span>
                <span className="text-sm font-mono font-bold text-white">3 Tedarikçi · 8 Kalem</span>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  supplier: 'Anadolu Et Entegre Toptan',
                  items: 'Dana Antrikot (25 kg), Kuzu İncik (15 kg)',
                  delivery: 'Yarın 07:00',
                  status: 'Onay Bekliyor'
                },
                {
                  supplier: 'Yenihal Sebze & Meyve Dağıtım',
                  items: 'Avokado Hass (40 adet), Taze Roka (15 bağ), Lime (5 kg)',
                  delivery: 'Yarın 06:30',
                  status: 'Onay Bekliyor'
                },
                {
                  supplier: 'Sütçüoğlu Mandıra Ürünleri',
                  items: 'Mozzarella Blok (12 kg), Tereyağı (10 kg)',
                  delivery: 'Pazartesi 08:00',
                  status: 'Onay Bekliyor'
                }
              ].map((order, idx) => (
                <div key={idx} className="p-4 bg-[#1b1e26] rounded-xl border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-white">{order.supplier}</span>
                      <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#e05338]" /> {order.delivery}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400">{order.items}</p>
                  </div>
                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <span className="text-xs text-neutral-400 font-mono">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-neutral-400">
                Siparişler toptancı WhatsApp ve e-posta hatlarına entegre formatta iletilir.
              </span>
              <button
                onClick={() => {
                  setOrderSent(true);
                  setTimeout(() => setOrderSent(false), 3000);
                }}
                disabled={orderSent}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#c24128] hover:bg-[#aa3620] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {orderSent ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Tedarikçilere İletildi!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Tek Tıkla Siparişleri Onayla</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
