import React, { useState, useEffect } from 'react';
import { ModuleId } from '../types';
import { 
  ScanLine, 
  FileSpreadsheet, 
  BrainCircuit, 
  Send, 
  Layers,
  ArrowLeft
} from 'lucide-react';
import { ModuleStockEntry } from '../components/modules/ModuleStockEntry';
import { ModuleWasteReports } from '../components/modules/ModuleWasteReports';
import { ModuleDemandForecast } from '../components/modules/ModuleDemandForecast';
import { ModuleSupplierOrders } from '../components/modules/ModuleSupplierOrders';

interface ModulesPageProps {
  initialModule?: ModuleId;
  onNavigateHome: () => void;
  onOpenRegister: () => void;
}

export const ModulesPage: React.FC<ModulesPageProps> = ({ 
  initialModule = 'stok', 
  onNavigateHome,
  onOpenRegister 
}) => {
  const [activeModule, setActiveModule] = useState<ModuleId>(initialModule);

  useEffect(() => {
    if (initialModule) {
      setActiveModule(initialModule);
    }
  }, [initialModule]);

  const moduleTabs = [
    { id: 'stok' as ModuleId, num: '01', label: 'Kolay Stok Girişi', icon: ScanLine, tag: 'Envanter & İrsaliye' },
    { id: 'fire' as ModuleId, num: '02', label: 'Fire Raporları', icon: FileSpreadsheet, tag: 'Kayıp & İsraf Analizi' },
    { id: 'tahmin' as ModuleId, num: '03', label: 'AI Talep Tahmini', icon: BrainCircuit, tag: 'Yapay Zeka Motoru' },
    { id: 'siparis' as ModuleId, num: '04', label: 'Tedarikçi Siparişi', icon: Send, tag: 'Satın Alma & Lojistik' },
  ];

  return (
    <div className="py-10 sm:py-16 bg-[#111215]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb / Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
          <div className="space-y-1">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Anasayfaya Dön</span>
            </button>
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              GastroStok Operasyonel Modülleri
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300">
              Restoran mutfağınızı uçtan uca yöneten 4 interaktif modül. Canlı olarak deneyebilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Canlı Demo Ortamı</span>
            </span>
          </div>
        </div>

        {/* 4 Module Switcher Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {moduleTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeModule === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveModule(tab.id)}
                className={`p-3 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#1b1e28] border-[#c24128] shadow-lg shadow-[#c24128]/10'
                    : 'bg-[#15171e] border-neutral-800 hover:border-neutral-700 hover:bg-[#181a22]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-[#c24128] text-white' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-mono ${isActive ? 'text-[#f26a4f]' : 'text-neutral-500'}`}>
                    Modül {tab.num}
                  </span>
                </div>

                <div>
                  <p className="text-[10px] sm:text-[11px] font-mono text-neutral-400 mb-0.5 truncate">{tab.tag}</p>
                  <p className={`text-xs sm:text-sm font-bold tracking-tight leading-snug ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                    {tab.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Module Container */}
        <div className="bg-[#14151b] rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 border border-neutral-800/90 shadow-2xl">
          {activeModule === 'stok' && <ModuleStockEntry />}
          {activeModule === 'fire' && <ModuleWasteReports />}
          {activeModule === 'tahmin' && (
            <ModuleDemandForecast onTransferToOrders={() => setActiveModule('siparis')} />
          )}
          {activeModule === 'siparis' && <ModuleSupplierOrders />}
        </div>

        {/* Bottom Callout */}
        <div className="p-6 bg-[#161820] rounded-2xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-300 space-y-1 text-center sm:text-left">
            <p className="font-semibold text-white">Bu modülleri kendi restoranınızın menüsüyle denemek ister misiniz?</p>
            <p className="text-neutral-400">Ücretsiz kayıt olun, menü reçetelerinizi ve POS entegrasyonunuzu birlikte kuralım.</p>
          </div>
          <button
            onClick={onOpenRegister}
            className="px-5 py-2.5 bg-[#c24128] hover:bg-[#aa3620] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0 shadow-md whitespace-nowrap"
          >
            Restoranını Ücretsiz Ekle
          </button>
        </div>

      </div>
    </div>
  );
};
