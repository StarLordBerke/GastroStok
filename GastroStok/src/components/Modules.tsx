import React from 'react';
import { 
  ScanLine, 
  FileSpreadsheet, 
  BrainCircuit, 
  Send, 
  ArrowUpRight,
  Sparkles,
  Layers
} from 'lucide-react';

import { ModuleId } from '../types';

interface ModulesProps {
  onSelectModule?: (moduleId: ModuleId) => void;
}

export const Modules: React.FC<ModulesProps> = ({ onSelectModule }) => {
  const modules = [
    {
      id: '01',
      moduleId: 'stok' as ModuleId,
      title: 'Kolay Stok Girişi',
      icon: ScanLine,
      tag: 'Envanter & İrsaliye',
      description: 'Gelen hammadde faturalarını ve irsaliyeleri dijital olarak içe aktarın. Tablet veya akıllı telefonla barkod okutarak veya sayım listelerinden tek dokunuşla depo adetlerini güncelleyin.',
      features: [
        'Fotoğraftan veya PDF faturadan otomatik kalem tanıma',
        'Birim dönüştürme (koli > adet, çuval > kg)',
        'Vardiya bazlı hızlı sayım ve mutfak şablonları'
      ]
    },
    {
      id: '02',
      moduleId: 'fire' as ModuleId,
      title: 'Fire Raporları',
      icon: FileSpreadsheet,
      tag: 'Kayıp & İsraf Analizi',
      description: 'Çöpe giden, son kullanma tarihi yaklaşan veya hazırlık sırasında kaybolan malzemelerin detaylı maliyet dökümünü çıkarın. Hangi istasyonda ne kadar fire verildiğini şeffafça izleyin.',
      features: [
        'Neden analizi (SKT, porsiyon hatası, soğuk zincir kırılması)',
        'Fire maliyetinin tabak başı kârlılığa doğrudan etkisi',
        'Haftalık ve aylık israf azaltma karşılaştırma grafikleri'
      ]
    },
    {
      id: '03',
      moduleId: 'tahmin' as ModuleId,
      title: 'AI Talep Tahmini',
      icon: BrainCircuit,
      tag: 'Yapay Zeka Motoru',
      description: 'Geçmiş adisyon verileri, haftanın günleri, hava tahmini ve dönemsel eğilimleri analiz eden yapay zeka destekli sipariş öngörüsü. Mutfağın tam ihtiyacı kadar malzeme almasını sağlar.',
      features: [
        'Adisyon geçmişinden dinamik menü tüketim hesaplama',
        'Hava durumu, yağmur ve tatil günleri etkisi simülasyonu',
        'Tedarik teslimat sürelerine göre emniyet stoğu hesabı'
      ]
    },
    {
      id: '04',
      moduleId: 'siparis' as ModuleId,
      title: 'Tek Tıkla Tedarikçi Siparişi',
      icon: Send,
      tag: 'Satın Alma & Lojistik',
      description: 'Kritik seviyeye düşen veya tahmine göre ihtiyaç duyulacak hammaddeler için toptancı ve hal tedarikçilerine otomatik formatta sipariş listesi oluşturun ve tek tıkla iletin.',
      features: [
        'Tedarikçiye özel ayrıştırılmış WhatsApp ve e-posta sipariş taslağı',
        'Minimum sipariş tutarları ve teslimat günlerine göre gruplama',
        'Gelen siparişle faturanın anında eşleşip depoya girmesi'
      ]
    }
  ];

  return (
    <section id="moduller" className="py-20 bg-[#14151a] border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e05338]">
            <Layers className="w-4 h-4" />
            <span>Platform Mimarisi</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            GastroStok Modülleri
          </h2>

          <p className="text-base text-neutral-300 leading-relaxed text-balance">
            Mutfaktaki dağınıklığı ortadan kaldıran, birbirine tam entegre 4 temel operasyonel güç.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => onSelectModule?.(mod.moduleId)}
                className="bg-[#181920] rounded-2xl p-7 border border-neutral-800 flex flex-col justify-between hover:border-[#c24128]/60 transition-all group cursor-pointer hover:shadow-xl hover:shadow-[#c24128]/5"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#241a18] border border-[#c24128]/30 flex items-center justify-center text-[#f26a4f] group-hover:scale-105 group-hover:bg-[#c24128] group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-neutral-400">
                      Modül {mod.id}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-[#e05338] block font-semibold mb-1">
                      {mod.tag}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#f26a4f] transition-colors">
                      {mod.title}
                    </h3>
                  </div>

                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {mod.description}
                  </p>

                  <div className="pt-3 border-t border-neutral-800/80">
                    <p className="text-xs font-medium text-neutral-400 mb-2">Öne Çıkan Özellikler:</p>
                    <ul className="space-y-2 text-xs text-neutral-300">
                      {mod.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c24128]"></span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>Gerçek Zamanlı Senkronize</span>
                  <span className="text-[#e05338] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Modülü Aç ve Dene</span> <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
