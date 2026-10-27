import React, { useState } from 'react';
import { 
  ScanLine, 
  Plus, 
  Search, 
  FileUp, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  RotateCcw,
  Sparkles,
  Layers,
  ArrowUpDown
} from 'lucide-react';

interface StockItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  minLevel: number;
  expiryDate: string;
  supplier: string;
}

export const ModuleStockEntry: React.FC = () => {
  const [items, setItems] = useState<StockItem[]>([
    { id: '1', name: 'Dana Bonfile (Dry Aged)', category: 'Et Grubu', quantity: 18.5, unit: 'kg', unitPrice: 850, minLevel: 15, expiryDate: '28.10.2026', supplier: 'Anadolu Et Entegre' },
    { id: '2', name: 'Taze Burrata Peyniri', category: 'Süt & Şarküteri', quantity: 12, unit: 'adet', unitPrice: 120, minLevel: 10, expiryDate: '27.10.2026', supplier: 'Sütçüoğlu Mandıra' },
    { id: '3', name: 'Organik Taze Krema (%35)', category: 'Süt & Şarküteri', quantity: 8.0, unit: 'Litre', unitPrice: 140, minLevel: 6, expiryDate: '26.10.2026', supplier: 'Sütçüoğlu Mandıra' },
    { id: '4', name: 'Avokado Hass', category: 'Sebze & Hal', quantity: 35, unit: 'adet', unitPrice: 45, minLevel: 25, expiryDate: '30.10.2026', supplier: 'Yenihal Toptan' },
    { id: '5', name: 'Taze Fesleğen & Roka', category: 'Sebze & Hal', quantity: 16, unit: 'bağ', unitPrice: 20, minLevel: 10, expiryDate: '27.10.2026', supplier: 'Yenihal Toptan' },
    { id: '6', name: 'Espresso Çekirdeği (Arabica)', category: 'Bar & İçecek', quantity: 14.0, unit: 'kg', unitPrice: 650, minLevel: 8, expiryDate: '15.12.2026', supplier: 'Artisan Bean Co.' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [scanningInvoice, setScanningInvoice] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  // New item form
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Et Grubu',
    quantity: '',
    unit: 'kg',
    unitPrice: '',
    minLevel: '',
    expiryDate: '30.10.2026',
    supplier: 'Anadolu Et Entegre'
  });

  const categories = ['Tümü', 'Et Grubu', 'Süt & Şarküteri', 'Sebze & Hal', 'Bar & İçecek'];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.quantity) return;

    const created: StockItem = {
      id: Date.now().toString(),
      name: newItem.name,
      category: newItem.category,
      quantity: parseFloat(newItem.quantity) || 1,
      unit: newItem.unit,
      unitPrice: parseFloat(newItem.unitPrice) || 0,
      minLevel: parseFloat(newItem.minLevel) || 5,
      expiryDate: newItem.expiryDate,
      supplier: newItem.supplier
    };

    setItems([created, ...items]);
    setIsAddingItem(false);
    setNewItem({
      name: '',
      category: 'Et Grubu',
      quantity: '',
      unit: 'kg',
      unitPrice: '',
      minLevel: '',
      expiryDate: '30.10.2026',
      supplier: 'Anadolu Et Entegre'
    });
  };

  const handleSimulateInvoiceScan = () => {
    setScanningInvoice(true);
    setScanMessage(null);

    setTimeout(() => {
      const scannedItems: StockItem[] = [
        { id: `scanned-${Date.now()}-1`, name: 'Kuzey Denizi Somon Fileto', category: 'Et Grubu', quantity: 12.0, unit: 'kg', unitPrice: 620, minLevel: 8, expiryDate: '29.10.2026', supplier: 'Ege Su Ürünleri' },
        { id: `scanned-${Date.now()}-2`, name: 'Çeri Domates Salkım', category: 'Sebze & Hal', quantity: 15.0, unit: 'kg', unitPrice: 55, minLevel: 10, expiryDate: '31.10.2026', supplier: 'Yenihal Toptan' },
      ];
      setItems(prev => [...scannedItems, ...prev]);
      setScanningInvoice(false);
      setScanMessage('İrsaliye başarıyla tarandı: 2 yeni hammadde kalemi depoya eklendi!');
      setTimeout(() => setScanMessage(null), 4000);
    }, 1400);
  };

  const handleAdjustQuantity = (id: string, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const nextQty = Math.max(0, parseFloat((item.quantity + delta).toFixed(1)));
        return { ...item, quantity: nextQty };
      }
      return item;
    }));
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'Tümü' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalValuation = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const criticalItemsCount = items.filter(i => i.quantity <= i.minLevel).length;

  return (
    <div className="space-y-6">
      
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#e05338] mb-1">
            <ScanLine className="w-4 h-4" />
            <span>Modül 01 · Kolay Stok Girişi & Depo Yönetimi</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Canlı Mutfak Envanter Konsolu</h2>
          <p className="text-xs text-neutral-400">
            Fatura tarama, irsaliye aktarımı ve dijital sayım listeleri ile mutfak stoğunuzu güncel tutun.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSimulateInvoiceScan}
            disabled={scanningInvoice}
            className="px-4 py-2.5 bg-[#1f222b] hover:bg-[#282c37] border border-neutral-700/80 rounded-xl text-xs font-semibold text-neutral-200 hover:text-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-75"
          >
            <FileUp className="w-4 h-4 text-[#e05338]" />
            <span>{scanningInvoice ? 'Fatura Taranıyor...' : 'Fatura / İrsaliye Tara (OCR)'}</span>
          </button>

          <button
            onClick={() => setIsAddingItem(!isAddingItem)}
            className="px-4 py-2.5 bg-[#c24128] hover:bg-[#aa3620] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Kalem Ekle</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {scanMessage && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{scanMessage}</span>
        </div>
      )}

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#171920] p-4 rounded-xl border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 block">Kayıtlı Hammadde</span>
          <p className="text-2xl font-bold text-white font-mono mt-1">{items.length} Kalem</p>
          <span className="text-[11px] text-neutral-500">Mutfak, bar ve şarküteri</span>
        </div>

        <div className="bg-[#171920] p-4 rounded-xl border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 block">Depo Stok Değeri</span>
          <p className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">
            {new Intl.NumberFormat('tr-TR').format(Math.round(totalValuation))} ₺
          </p>
          <span className="text-[11px] text-neutral-500">Anlık hammadde varlığı</span>
        </div>

        <div className="bg-[#171920] p-4 rounded-xl border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 block">Kritik Eşik Seviyesi</span>
          <p className={`text-2xl font-bold font-mono mt-1 ${criticalItemsCount > 0 ? 'text-[#f26a4f]' : 'text-emerald-400'}`}>
            {criticalItemsCount} Ürün
          </p>
          <span className="text-[11px] text-neutral-500">Minimum emniyet stokunun altı</span>
        </div>
      </div>

      {/* New Item Modal / Drawer */}
      {isAddingItem && (
        <form onSubmit={handleAddItem} className="bg-[#1a1c25] p-5 rounded-2xl border border-[#c24128]/40 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#e05338]" /> Manuel Hammadde Ekle
            </h4>
            <button
              type="button"
              onClick={() => setIsAddingItem(false)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Vazgeç
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-neutral-300 block mb-1">Ürün Adı *</label>
              <input
                type="text"
                required
                placeholder="Örn: Kuzu Pirzola"
                value={newItem.name}
                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                className="w-full px-3 py-2 bg-[#121317] border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#c24128]"
              />
            </div>

            <div>
              <label className="text-xs text-neutral-300 block mb-1">Kategori</label>
              <select
                value={newItem.category}
                onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                className="w-full px-3 py-2 bg-[#121317] border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#c24128]"
              >
                <option value="Et Grubu">Et Grubu</option>
                <option value="Süt & Şarküteri">Süt & Şarküteri</option>
                <option value="Sebze & Hal">Sebze & Hal</option>
                <option value="Bar & İçecek">Bar & İçecek</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-neutral-300 block mb-1">Miktar ve Birim *</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.5"
                  required
                  placeholder="Miktar"
                  value={newItem.quantity}
                  onChange={e => setNewItem({ ...newItem, quantity: e.target.value })}
                  className="w-2/3 px-3 py-2 bg-[#121317] border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#c24128]"
                />
                <select
                  value={newItem.unit}
                  onChange={e => setNewItem({ ...newItem, unit: e.target.value })}
                  className="w-1/3 px-2 py-2 bg-[#121317] border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#c24128]"
                >
                  <option value="kg">kg</option>
                  <option value="adet">adet</option>
                  <option value="Litre">Litre</option>
                  <option value="bağ">bağ</option>
                  <option value="koli">koli</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-neutral-300 block mb-1">Birim Alış Fiyatı (₺)</label>
              <input
                type="number"
                placeholder="Örn: 450"
                value={newItem.unitPrice}
                onChange={e => setNewItem({ ...newItem, unitPrice: e.target.value })}
                className="w-full px-3 py-2 bg-[#121317] border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#c24128]"
              />
            </div>
            <div>
              <label className="text-xs text-neutral-300 block mb-1">Kritik Eşik Seviyesi</label>
              <input
                type="number"
                placeholder="Örn: 5"
                value={newItem.minLevel}
                onChange={e => setNewItem({ ...newItem, minLevel: e.target.value })}
                className="w-full px-3 py-2 bg-[#121317] border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#c24128]"
              />
            </div>
            <div>
              <label className="text-xs text-neutral-300 block mb-1">Tedarikçi Firma</label>
              <input
                type="text"
                placeholder="Toptancı adı"
                value={newItem.supplier}
                onChange={e => setNewItem({ ...newItem, supplier: e.target.value })}
                className="w-full px-3 py-2 bg-[#121317] border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#c24128]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-[#c24128] hover:bg-[#aa3620] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Envantere Kaydet
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#16181f] p-3 rounded-xl border border-neutral-800">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Hammadde adı veya tedarikçi ara..."
            className="w-full pl-9 pr-3 py-2 bg-[#111215] border border-neutral-700/80 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 no-scrollbar touch-pan-x">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#c24128] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white bg-[#1a1c24]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-[#171920] rounded-2xl border border-neutral-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#121317] text-neutral-400 uppercase tracking-wider text-[11px] font-mono border-b border-neutral-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Hammadde Adı</th>
                <th className="py-3.5 px-4 font-semibold">Kategori</th>
                <th className="py-3.5 px-4 font-semibold text-center">Depo Mevcudu</th>
                <th className="py-3.5 px-4 font-semibold">Birim Fiyat</th>
                <th className="py-3.5 px-4 font-semibold">Toplam Tutar</th>
                <th className="py-3.5 px-4 font-semibold">SKT</th>
                <th className="py-3.5 px-4 font-semibold">Tedarikçi</th>
                <th className="py-3.5 px-4 font-semibold text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-neutral-200">
              {filteredItems.map(item => {
                const isCritical = item.quantity <= item.minLevel;
                return (
                  <tr key={item.id} className="hover:bg-[#1a1c24] transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        {isCritical && (
                          <span className="w-2 h-2 rounded-full bg-[#c24128]" title="Kritik seviye!"></span>
                        )}
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-neutral-400">
                      <span className="px-2 py-0.5 rounded bg-neutral-800 text-[11px]">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-2 bg-[#121317] px-2 py-1 rounded-lg border border-neutral-800">
                        <button
                          onClick={() => handleAdjustQuantity(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center rounded bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer"
                        >
                          -
                        </button>
                        <span className={`font-mono font-bold tabular-nums min-w-[45px] text-center ${isCritical ? 'text-[#f26a4f]' : 'text-white'}`}>
                          {item.quantity} {item.unit}
                        </span>
                        <button
                          onClick={() => handleAdjustQuantity(item.id, +1)}
                          className="w-5 h-5 flex items-center justify-center rounded bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-neutral-300 tabular-nums">
                      {item.unitPrice} ₺ / {item.unit}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-white tabular-nums">
                      {new Intl.NumberFormat('tr-TR').format(Math.round(item.quantity * item.unitPrice))} ₺
                    </td>
                    <td className="py-3 px-4 font-mono text-neutral-400 text-[11px]">
                      {item.expiryDate}
                    </td>
                    <td className="py-3 px-4 text-neutral-300 text-[11px]">
                      {item.supplier}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer rounded hover:bg-neutral-800"
                        title="Kalemi Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
