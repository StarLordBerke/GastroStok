import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  AlertTriangle, 
  Plus, 
  CheckCircle2, 
  TrendingDown, 
  ChefHat, 
  Trash2,
  PieChart,
  Filter
} from 'lucide-react';

interface WasteLog {
  id: string;
  item: string;
  amount: string;
  station: 'Sıcak Mutfak' | 'Soğuk Mutfak' | 'Bar & İçecek' | 'Pastane';
  reason: 'SKT Aşımı' | 'Hazırlık / Trim Artığı' | 'Porsiyonlama Kaçağı' | 'Soğuk Zincir / Bozulma';
  cost: number;
  date: string;
  actionTaken: string;
}

export const ModuleWasteReports: React.FC = () => {
  const [logs, setLogs] = useState<WasteLog[]>([
    {
      id: 'w-1',
      item: 'Organik Taze Krema (%35 Yağ)',
      amount: '3.5 Litre',
      station: 'Pastane',
      reason: 'SKT Aşımı',
      cost: 490,
      date: '24.10.2026',
      actionTaken: 'Şefe önceden bildirim ile sos hazırlığına aktarılamadı'
    },
    {
      id: 'w-2',
      item: 'Kuzey Denizi Somon Fileto',
      amount: '1.8 kg',
      station: 'Sıcak Mutfak',
      reason: 'Hazırlık / Trim Artığı',
      cost: 1116,
      date: '23.10.2026',
      actionTaken: 'Balık çorbası ve köfte harcında değerlendirildi (%60 kurtarıldı)'
    },
    {
      id: 'w-3',
      item: 'Avokado Hass',
      amount: '8 adet',
      station: 'Soğuk Mutfak',
      reason: 'Soğuk Zincir / Bozulma',
      cost: 360,
      date: '22.10.2026',
      actionTaken: 'Tedarikçi iade faturası kesildi'
    },
    {
      id: 'w-4',
      item: 'Badem Sütü (1 Litre)',
      amount: '2 Kutu',
      station: 'Bar & İçecek',
      reason: 'SKT Aşımı',
      cost: 190,
      date: '21.10.2026',
      actionTaken: 'Açılış etiketleme kuralı güncellendi'
    },
    {
      id: 'w-5',
      item: 'Dana Bonfile Dilimleri',
      amount: '900 gram',
      station: 'Sıcak Mutfak',
      reason: 'Porsiyonlama Kaçağı',
      cost: 765,
      date: '20.10.2026',
      actionTaken: 'Tartım terazisi kalibre edildi'
    }
  ]);

  const [filterReason, setFilterReason] = useState<string>('Tümü');
  const [isAdding, setIsAdding] = useState(false);
  const [chefAlertSent, setChefAlertSent] = useState(false);

  // New log form state
  const [newLog, setNewLog] = useState({
    item: '',
    amount: '',
    station: 'Sıcak Mutfak' as WasteLog['station'],
    reason: 'SKT Aşımı' as WasteLog['reason'],
    cost: '',
  });

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.item || !newLog.cost) return;

    const entry: WasteLog = {
      id: `w-${Date.now()}`,
      item: newLog.item,
      amount: newLog.amount || '1 birim',
      station: newLog.station,
      reason: newLog.reason,
      cost: parseFloat(newLog.cost) || 0,
      date: new Date().toLocaleDateString('tr-TR'),
      actionTaken: 'Sistem kaydına alındı, fire analitiğine işlendi'
    };

    setLogs([entry, ...logs]);
    setIsAdding(false);
    setNewLog({
      item: '',
      amount: '',
      station: 'Sıcak Mutfak',
      reason: 'SKT Aşımı',
      cost: '',
    });
  };

  const handleDeleteLog = (id: string) => {
    setLogs(logs.filter(l => l.id !== id));
  };

  const reasons = ['Tümü', 'SKT Aşımı', 'Hazırlık / Trim Artığı', 'Porsiyonlama Kaçağı', 'Soğuk Zincir / Bozulma'];

  const filteredLogs = logs.filter(l => {
    return filterReason === 'Tümü' || l.reason === filterReason;
  });

  const totalWasteCost = logs.reduce((sum, l) => sum + l.cost, 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#e05338] mb-1">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Modül 02 · Kayıp & İsraf Analiz Raporları</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Gerçek Zamanlı Fire Denetim Masası</h2>
          <p className="text-xs text-neutral-400">
            Çöpe giden hammaddeleri istasyon ve neden bazında analiz edin, önlenebilir maliyet kaçaklarını durdurun.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setChefAlertSent(true);
              setTimeout(() => setChefAlertSent(false), 3000);
            }}
            disabled={chefAlertSent}
            className="px-4 py-2.5 bg-[#1f222b] hover:bg-[#282c37] border border-neutral-700/80 rounded-xl text-xs font-semibold text-neutral-200 hover:text-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-75"
          >
            <ChefHat className="w-4 h-4 text-[#e05338]" />
            <span>{chefAlertSent ? 'Şefe Gönderildi!' : 'Şefe Öncelikli Tüketim Listesi Gönder'}</span>
          </button>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2.5 bg-[#c24128] hover:bg-[#aa3620] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Fire Kaydı Gir</span>
          </button>
        </div>
      </div>

      {chefAlertSent && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Şef ekranına yaklaşan SKT kalemleri öncelikli hazırlık ve günün çorbası/spesiyali olarak iletildi!</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#171920] p-4 rounded-xl border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 block">Bu Ayki Fire Tutarı</span>
          <p className="text-2xl font-bold text-[#f26a4f] font-mono mt-1 tabular-nums">
            {new Intl.NumberFormat('tr-TR').format(totalWasteCost)} ₺
          </p>
          <span className="text-[11px] text-neutral-500">Kayıtlı toplam {logs.length} olay</span>
        </div>

        <div className="bg-[#171920] p-4 rounded-xl border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 block">En Çok Fire Veren İstasyon</span>
          <p className="text-xl font-bold text-white font-mono mt-1">Sıcak Mutfak</p>
          <span className="text-[11px] text-neutral-500">Toplam maliyetin %48'i</span>
        </div>

        <div className="bg-[#171920] p-4 rounded-xl border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 block">1 Numaralı Fire Sebebi</span>
          <p className="text-xl font-bold text-white font-mono mt-1">SKT Aşımı</p>
          <span className="text-[11px] text-neutral-500">Zamanında tüketilmemiş</span>
        </div>

        <div className="bg-[#171920] p-4 rounded-xl border border-neutral-800">
          <span className="text-[11px] font-mono text-neutral-400 block">Önleme Potansiyeli</span>
          <p className="text-2xl font-bold text-emerald-400 font-mono mt-1">%65 Kurtarılabilir</p>
          <span className="text-[11px] text-neutral-500">Doğru reçete & tahminle</span>
        </div>
      </div>

      {/* New Waste Entry Form */}
      {isAdding && (
        <form onSubmit={handleAddLog} className="bg-[#1a1c25] p-5 rounded-2xl border border-[#c24128]/40 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#e05338]" /> Yeni Mutfak Fire / Kayıp Girişi
            </h4>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Vazgeç
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-neutral-300 block mb-1">Fireye Giden Malzeme *</label>
              <input
                type="text"
                required
                placeholder="Örn: Roka & Yeşillik"
                value={newLog.item}
                onChange={e => setNewLog({ ...newLog, item: e.target.value })}
                className="w-full px-3 py-2 bg-[#121317] border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#c24128]"
              />
            </div>

            <div>
              <label className="text-xs text-neutral-300 block mb-1">Miktar</label>
              <input
                type="text"
                placeholder="Örn: 2 Kasa / 3 kg"
                value={newLog.amount}
                onChange={e => setNewLog({ ...newLog, amount: e.target.value })}
                className="w-full px-3 py-2 bg-[#121317] border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#c24128]"
              />
            </div>

            <div>
              <label className="text-xs text-neutral-300 block mb-1">Mutfak İstasyonu</label>
              <select
                value={newLog.station}
                onChange={e => setNewLog({ ...newLog, station: e.target.value as WasteLog['station'] })}
                className="w-full px-3 py-2 bg-[#121317] border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#c24128]"
              >
                <option value="Sıcak Mutfak">Sıcak Mutfak</option>
                <option value="Soğuk Mutfak">Soğuk Mutfak</option>
                <option value="Bar & İçecek">Bar & İçecek</option>
                <option value="Pastane">Pastane</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-neutral-300 block mb-1">Fire / İsraf Nedeni</label>
              <select
                value={newLog.reason}
                onChange={e => setNewLog({ ...newLog, reason: e.target.value as WasteLog['reason'] })}
                className="w-full px-3 py-2 bg-[#121317] border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#c24128]"
              >
                <option value="SKT Aşımı">SKT Aşımı</option>
                <option value="Hazırlık / Trim Artığı">Hazırlık / Trim Artığı</option>
                <option value="Porsiyonlama Kaçağı">Porsiyonlama Kaçağı</option>
                <option value="Soğuk Zincir / Bozulma">Soğuk Zincir / Bozulma</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-neutral-300 block mb-1">Maddi Kayıp Tutarı (₺) *</label>
              <input
                type="number"
                required
                placeholder="Örn: 350"
                value={newLog.cost}
                onChange={e => setNewLog({ ...newLog, cost: e.target.value })}
                className="w-full px-3 py-2 bg-[#121317] border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#c24128]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-[#c24128] hover:bg-[#aa3620] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Fire Kaydını Kaydet
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-[#16181f] p-2.5 rounded-xl border border-neutral-800 no-scrollbar touch-pan-x">
        <span className="text-xs font-medium text-neutral-400 pl-2 pr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-[#e05338]" /> Neden Filtresi:
        </span>
        {reasons.map(r => (
          <button
            key={r}
            onClick={() => setFilterReason(r)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              filterReason === r
                ? 'bg-[#c24128] text-white shadow-sm'
                : 'text-neutral-400 hover:text-white bg-[#1a1c24]'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Logs Table */}
      <div className="bg-[#171920] rounded-2xl border border-neutral-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#121317] text-neutral-400 uppercase tracking-wider text-[11px] font-mono border-b border-neutral-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Tarih</th>
                <th className="py-3.5 px-4 font-semibold">Malzeme</th>
                <th className="py-3.5 px-4 font-semibold">İstasyon</th>
                <th className="py-3.5 px-4 font-semibold">Fire Sebebi</th>
                <th className="py-3.5 px-4 font-semibold">Miktar</th>
                <th className="py-3.5 px-4 font-semibold">Maliyet Kaybı</th>
                <th className="py-3.5 px-4 font-semibold">Alınan Aksiyon</th>
                <th className="py-3.5 px-4 font-semibold text-right">Sil</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-neutral-200">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-[#1a1c24] transition-colors">
                  <td className="py-3 px-4 font-mono text-neutral-400 text-[11px]">
                    {log.date}
                  </td>
                  <td className="py-3 px-4 font-semibold text-white">
                    {log.item}
                  </td>
                  <td className="py-3 px-4 text-neutral-300">
                    <span className="px-2 py-0.5 rounded bg-neutral-800 text-[11px]">
                      {log.station}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded border border-[#c24128]/30 bg-[#c24128]/10 text-[#f26a4f] text-[11px] font-mono">
                      {log.reason}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-neutral-300 tabular-nums">
                    {log.amount}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#f26a4f] tabular-nums">
                    {new Intl.NumberFormat('tr-TR').format(log.cost)} ₺
                  </td>
                  <td className="py-3 px-4 text-neutral-400 text-[11px] max-w-[200px] truncate" title={log.actionTaken}>
                    {log.actionTaken}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDeleteLog(log.id)}
                      className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer rounded hover:bg-neutral-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
