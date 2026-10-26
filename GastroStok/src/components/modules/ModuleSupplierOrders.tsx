import React, { useState } from 'react';
import { 
  Send, 
  ShoppingCart, 
  MessageCircle, 
  Mail, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Trash2, 
  Copy, 
  Phone,
  Building
} from 'lucide-react';

interface OrderItem {
  name: string;
  quantity: number;
  unit: string;
  notes: string;
}

interface SupplierGroup {
  id: string;
  name: string;
  category: string;
  phone: string;
  email: string;
  deliverySlot: string;
  items: OrderItem[];
}

export const ModuleSupplierOrders: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierGroup[]>([
    {
      id: 'sup-1',
      name: 'Anadolu Et Entegre Toptan',
      category: 'Et & Şarküteri',
      phone: '+90 (532) 111 22 33',
      email: 'siparis@anadoluet.com',
      deliverySlot: 'Yarın Sabah 07:00 - 08:30',
      items: [
        { name: 'Dana Bonfile (Dry Aged)', quantity: 15.0, unit: 'kg', notes: 'Vakumlu 5kg paketler halinde' },
        { name: 'Kuzu İncik', quantity: 10.0, unit: 'kg', notes: 'Taze kesim, 300g üzeri' },
        { name: 'Burger Kıyması (%20 Yağlı)', quantity: 20.0, unit: 'kg', notes: 'Günlük çekim' }
      ]
    },
    {
      id: 'sup-2',
      name: 'Yenihal Sebze & Meyve Dağıtım',
      category: 'Hal & Taze Yeşillik',
      phone: '+90 (533) 222 33 44',
      email: 'siparis@yenihal.com',
      deliverySlot: 'Yarın Sabah 06:00 - 07:30',
      items: [
        { name: 'Avokado Hass', quantity: 30, unit: 'adet', notes: 'Yarı olgun, sert olmayan' },
        { name: 'Taze Fesleğen', quantity: 15, unit: 'bağ', notes: 'Geniş yapraklı, köklü' },
        { name: 'Roka & Akdeniz Yeşilliği', quantity: 10, unit: 'kasa', notes: 'Çamursuz yıkanmış kasa' },
        { name: 'Çeri Domates Salkım', quantity: 12, unit: 'kg', notes: 'Sert ve kırmızı' }
      ]
    },
    {
      id: 'sup-3',
      name: 'Sütçüoğlu Mandıra Ürünleri',
      category: 'Süt & Peynir',
      phone: '+90 (535) 333 44 55',
      email: 'siparis@sutcuoglu.com',
      deliverySlot: 'Pazartesi Sabah 08:00',
      items: [
        { name: 'Burrata Peyniri (125g)', quantity: 24, unit: 'adet', notes: 'Son kullanma tarihi en az 10 gün' },
        { name: 'Taze Krema (%35 Yağ)', quantity: 8, unit: 'Litre', notes: 'Pastörize' },
        { name: 'Köy Tereyağı (Tuzsuz)', quantity: 10, unit: 'kg', notes: 'Blok kalıp' }
      ]
    }
  ]);

  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('sup-1');
  const [activeFormat, setActiveFormat] = useState<'whatsapp' | 'email' | 'pdf'>('whatsapp');
  const [copySuccess, setCopySuccess] = useState(false);
  const [allOrdersSent, setAllOrdersSent] = useState(false);

  const currentSupplier = suppliers.find(s => s.id === selectedSupplierId) || suppliers[0];

  const handleAdjustItemQty = (supId: string, itemIdx: number, delta: number) => {
    setSuppliers(suppliers.map(s => {
      if (s.id === supId) {
        const nextItems = [...s.items];
        const nextQty = Math.max(1, nextItems[itemIdx].quantity + delta);
        nextItems[itemIdx] = { ...nextItems[itemIdx], quantity: nextQty };
        return { ...s, items: nextItems };
      }
      return s;
    }));
  };

  const handleRemoveItem = (supId: string, itemIdx: number) => {
    setSuppliers(suppliers.map(s => {
      if (s.id === supId) {
        const nextItems = s.items.filter((_, idx) => idx !== itemIdx);
        return { ...s, items: nextItems };
      }
      return s;
    }));
  };

  // Generate WhatsApp message preview
  const generateWhatsAppMessage = (sup: SupplierGroup) => {
    const lines = [
      `*GastroStok Sipariş Listesi - Bistro Galata*`,
      `Tedarikçi: ${sup.name}`,
      `Teslimat Talebi: ${sup.deliverySlot}`,
      `---------------------------------`,
      ...sup.items.map((i, idx) => `${idx + 1}. ${i.name} - *${i.quantity} ${i.unit}* ${i.notes ? `(${i.notes})` : ''}`),
      `---------------------------------`,
      `Lütfen teyit ediniz. Teşekkürler!`
    ];
    return lines.join('\n');
  };

  const handleCopyMessage = () => {
    const text = generateWhatsAppMessage(currentSupplier);
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const handleSendAllOrders = () => {
    setAllOrdersSent(true);
    setTimeout(() => setAllOrdersSent(false), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#e05338] mb-1">
            <Send className="w-4 h-4" />
            <span>Modül 04 · Tek Tıkla Tedarikçi Siparişi & Lojistik</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Akıllı Tedarikçi Sipariş Merkezi</h2>
          <p className="text-xs text-neutral-400">
            Eksilen hammaddeler toptancılara göre otomatik ayrıştırılır; WhatsApp, e-posta veya PDF formatında tek tıkla iletilir.
          </p>
        </div>

        <button
          onClick={handleSendAllOrders}
          disabled={allOrdersSent}
          className="px-5 py-2.5 bg-[#c24128] hover:bg-[#aa3620] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-75 self-start sm:self-auto"
        >
          {allOrdersSent ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Tüm Siparişler Gönderildi!</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Tüm Tedarikçilere Siparişi İlet ({suppliers.length} Toptancı)</span>
            </>
          )}
        </button>
      </div>

      {allOrdersSent && (
        <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Sipariş listeleri Anadolu Et, Yenihal ve Sütçüoğlu hatlarına eş zamanlı iletildi. Teslimat sabah saatleri için planlandı.</span>
        </div>
      )}

      {/* Supplier Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {suppliers.map(sup => (
          <button
            key={sup.id}
            onClick={() => setSelectedSupplierId(sup.id)}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              selectedSupplierId === sup.id
                ? 'bg-[#1e1c25] border-[#c24128] shadow-md'
                : 'bg-[#16181f] border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono text-[#e05338] font-semibold">{sup.category}</span>
              <span className="text-xs font-mono px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded">
                {sup.items.length} Kalem
              </span>
            </div>
            <p className="font-semibold text-white text-sm">{sup.name}</p>
            <p className="text-xs text-neutral-400 flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3 text-neutral-400" /> {sup.deliverySlot}
            </p>
          </button>
        ))}
      </div>

      {/* Order Details & Multi-Format Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Editable Item List */}
        <div className="lg:col-span-7 bg-[#171920] p-5 sm:p-6 rounded-2xl border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
            <div>
              <h4 className="font-bold text-white text-sm">{currentSupplier.name} Sepeti</h4>
              <p className="text-neutral-400">Teslimat Slotu: <strong className="text-neutral-200">{currentSupplier.deliverySlot}</strong></p>
            </div>
            <div className="text-right font-mono text-neutral-400">
              İletişim: {currentSupplier.phone}
            </div>
          </div>

          {/* List of items */}
          <div className="space-y-2.5">
            {currentSupplier.items.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-[#121317] rounded-xl border border-neutral-800 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-neutral-400">{item.notes}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1.5 bg-[#1a1c24] px-2 py-1 rounded-lg border border-neutral-700/80">
                    <button
                      onClick={() => handleAdjustItemQty(currentSupplier.id, idx, -1)}
                      className="w-5 h-5 flex items-center justify-center rounded bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer text-xs"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-white tabular-nums px-1 text-xs">
                      {item.quantity} {item.unit}
                    </span>
                    <button
                      onClick={() => handleAdjustItemQty(currentSupplier.id, idx, +1)}
                      className="w-5 h-5 flex items-center justify-center rounded bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer text-xs"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(currentSupplier.id, idx)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs text-neutral-400 flex items-center justify-between border-t border-neutral-800">
            <span>Minimum sipariş tutarı kontrolü: Onaylandı</span>
            <span className="font-mono text-[#f26a4f]">Toplam {currentSupplier.items.length} Kalem Malzeme</span>
          </div>
        </div>

        {/* Right: Multi-Format Output Panel */}
        <div className="lg:col-span-5 bg-[#171920] p-5 sm:p-6 rounded-2xl border border-neutral-800 space-y-4">
          
          {/* Format selector */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <span className="text-xs font-bold text-white">Çıktı Formatı Seçimi</span>
            <div className="flex items-center gap-1 p-1 bg-[#121317] rounded-lg border border-neutral-800 text-xs">
              <button
                onClick={() => setActiveFormat('whatsapp')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  activeFormat === 'whatsapp' ? 'bg-[#c24128] text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <MessageCircle className="w-3 h-3" /> WhatsApp
              </button>
              <button
                onClick={() => setActiveFormat('email')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  activeFormat === 'email' ? 'bg-[#c24128] text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Mail className="w-3 h-3" /> E-posta
              </button>
              <button
                onClick={() => setActiveFormat('pdf')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  activeFormat === 'pdf' ? 'bg-[#c24128] text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <FileText className="w-3 h-3" /> İrsaliye
              </button>
            </div>
          </div>

          {/* Formatted Output Box */}
          {activeFormat === 'whatsapp' && (
            <div className="space-y-3">
              <div className="p-4 bg-[#111317] rounded-xl border border-neutral-800 font-mono text-xs text-neutral-300 whitespace-pre-line leading-relaxed selection:bg-[#c24128]/30">
                {generateWhatsAppMessage(currentSupplier)}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">WhatsApp sipariş hattına hazır mesaj</span>
                <button
                  onClick={handleCopyMessage}
                  className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copySuccess ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Kopyalandı!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Metni Kopyala</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeFormat === 'email' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 bg-[#111317] rounded-xl border border-neutral-800 space-y-2">
                <p className="text-neutral-400"><strong className="text-white">Alıcı:</strong> {currentSupplier.email}</p>
                <p className="text-neutral-400"><strong className="text-white">Konu:</strong> GastroStok Satın Alma Siparişi - Bistro Galata (Tarih: {new Date().toLocaleDateString('tr-TR')})</p>
                <div className="pt-2 border-t border-neutral-800 space-y-1 text-neutral-300">
                  <p>Sayın {currentSupplier.name} Yetkilisi,</p>
                  <p>Aşağıdaki kalemlerin {currentSupplier.deliverySlot} saatlerinde teslim edilmesini rica ederiz:</p>
                  <ul className="list-disc list-inside py-1 text-white">
                    {currentSupplier.items.map((it, idx) => (
                      <li key={idx}>{it.name} - {it.quantity} {it.unit}</li>
                    ))}
                  </ul>
                  <p>İyi çalışmalar dileriz.</p>
                </div>
              </div>

              <button
                onClick={() => alert(`"${currentSupplier.email}" adresine e-posta gönderim simülasyonu başlatıldı.`)}
                className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-semibold flex items-center justify-center gap-1.5 cursor-pointer text-xs"
              >
                <Mail className="w-3.5 h-3.5 text-[#e05338]" />
                <span>E-posta İstemcisini Aç</span>
              </button>
            </div>
          )}

          {activeFormat === 'pdf' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 bg-[#111317] rounded-xl border border-neutral-800 space-y-2 font-mono">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="font-bold text-white">GastroStok DİJİTAL İRSALİYE FORMU</span>
                  <span className="text-[#f26a4f]">NO: GS-2026-981</span>
                </div>
                <p className="text-neutral-400">İşletme: Bistro Galata · Beyoğlu / İstanbul</p>
                <p className="text-neutral-400">Tedarikçi: {currentSupplier.name}</p>
                <div className="pt-2 border-t border-neutral-800">
                  <p className="text-neutral-300 mb-1 font-sans font-semibold">Sipariş Edilen Kalemler ({currentSupplier.items.length}):</p>
                  {currentSupplier.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-neutral-400 py-0.5">
                      <span>{it.name}</span>
                      <span className="text-white font-bold">{it.quantity} {it.unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-semibold flex items-center justify-center gap-1.5 cursor-pointer text-xs"
              >
                <FileText className="w-3.5 h-3.5 text-[#e05338]" />
                <span>Yazdır / PDF Olarak Kaydet</span>
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
