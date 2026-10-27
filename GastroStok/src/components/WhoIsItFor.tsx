import React from 'react';
import { Coffee, ChefHat, Building2, Check } from 'lucide-react';

export const WhoIsItFor: React.FC = () => {
  const personas = [
    {
      title: 'Kafe Sahipleri',
      icon: Coffee,
      role: 'Butik ve Zincir Kafeler · Kahve & Tatlı Barları',
      benefits: [
        'Günlük taze süt, kahve çekirdeği ve pastane ürünlerinin raf ömrünü kontrol altında tutarak maliyetleri dengeler.',
        'Haftalık müşteri trafiği ve paket servis dalgalanmalarına göre hassas sipariş önerileri alır.',
        'Barista ve servis ekibinin yorulmadan telefon veya tabletten saniyeler içinde sayım yapmasını sağlar.'
      ]
    },
    {
      title: 'Mutfak Şefleri',
      icon: ChefHat,
      role: 'Restoranlar · Şef Restoranları · Fine Dining & Bistro',
      benefits: [
        'Reçetelere bağlı gramaj takibiyle hazırlık (mise en place) miktarlarını optimize eder, servis ortasında malzeme tükenmesi krizini engeller.',
        'Mevsimsel menü değişikliklerinde tabak başı hammadde maliyetini anında hesaplar ve fire oluşturabilecek reçeteleri revize eder.',
        'SKT yaklaşan hassas protein ve taze sebzeler için günün spesiyali veya sos hazırlığı alternatifleri sunar.'
      ]
    },
    {
      title: 'Şube Müdürleri',
      icon: Building2,
      role: 'Çok Şubeli İşletmeler · Franchise Zincirleri',
      benefits: [
        'Çoklu lokasyonlarda konsolide stok takibi yapar, fire raporlarıyla şubeler arası hammadde transferlerini ve bütçeyi yönetir.',
        'Porsiyon sapmalarını ve personel bazlı fire oranlarını tek merkezden şeffafça denetler.',
        'Toptan satın alma gücünü artıracak konsolide tedarikçi siparişleri hazırlayarak birim maliyet avantajı sağlar.'
      ]
    }
  ];

  return (
    <section id="kimler-icin" className="py-20 bg-[#111215]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e05338]">
            <span>Hedef Kitle ve Çözüm Ortakları</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Kimler İçin Tasarlandı?
          </h2>

          <p className="text-base text-neutral-300 leading-relaxed text-balance">
            İster tek bir butik kafe işletin, ister yüksek hacimli bir alakart restoran mutfağını yönetin; GastroStok ekibinizin her kademesine özel kolaylık sağlar.
          </p>
        </div>

        {/* 3 Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {personas.map((persona, index) => {
            const IconComponent = persona.icon;
            return (
              <div 
                key={index}
                className="bg-[#171920] rounded-2xl p-6 sm:p-7 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#221c1b] border border-[#c24128]/30 flex items-center justify-center text-[#f26a4f]">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white">{persona.title}</h3>
                    <p className="text-xs text-neutral-400 mt-1 font-mono">{persona.role}</p>
                  </div>

                  <div className="pt-2 border-t border-neutral-800/80">
                    <ul className="space-y-3.5 text-sm text-neutral-300">
                      {persona.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#e05338] shrink-0 mt-0.5" />
                          <span className="leading-snug">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 text-xs text-neutral-400 font-mono">
                  0{index + 1} · {persona.title} Odaklı Modül
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
