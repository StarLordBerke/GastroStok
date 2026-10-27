import React from 'react';
import { Clock, TrendingUp, Scale, CheckCircle2 } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      id: '01',
      title: 'Operasyonel İş Yükünde Azalma',
      icon: Clock,
      category: 'Zaman & Verimlilik',
      description: 'Şeflerin ve yöneticilerin her akşam saatlerce süren manuel sayım, Excel tabloları ve son dakika sipariş listeleri hazırlama yükünü ortadan kaldırır. Ekibiniz operasyona ve lezzete odaklanır.'
    },
    {
      id: '02',
      title: 'Satın Alma Bütçesinde Doğrudan Tasarruf',
      icon: TrendingUp,
      category: 'Kârlılık & Nakit Akışı',
      description: 'Gereğinden fazla hammadde alımını ve depoda çürüyen gıdaları engelleyerek nakit akışınızı ve işletme sermayenizi doğrudan korur. Harcamalarınız reel tüketimle birebir örtüşür.'
    },
    {
      id: '03',
      title: 'Standartlaşmış Reçete & Gramaj Kontrolü',
      icon: Scale,
      category: 'Porsiyon Disiplini',
      description: 'Menüdeki her yemeğin reçetesine göre eksilen stokları anlık eşleştirerek porsiyon kaçaklarını ve mutfak içi gramaj sapmalarını tespit eder. Tabak maliyeti her zaman kontrol altında kalır.'
    },
    {
      id: '04',
      title: 'Servis Aksamalarını Sıfırlama',
      icon: CheckCircle2,
      category: 'Misafir Memnuniyeti',
      description: 'Hafta sonu veya en yoğun akşam saatlerinde kritik bir malzemenin aniden tükenmesini önceden haber verir. "Bu ürünümüz tükendi" mahcubiyetini sıfıra indirir.'
    }
  ];

  return (
    <section id="kazanimlar" className="py-20 bg-[#14151a] border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e05338]">
            <span>Ölçülebilir Faydalar</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            İşletmenizin Elde Edeceği Kazanımlar
          </h2>

          <p className="text-base text-neutral-300 leading-relaxed text-balance">
            Mutfak kaosunu bitiren, hem şefin işini kolaylaştıran hem de restoran sahibinin cebini koruyan somut kazanımlar.
          </p>
        </div>

        {/* 4 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.id}
                className="bg-[#181920] rounded-2xl p-7 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#241a18] border border-[#c24128]/30 flex items-center justify-center text-[#f26a4f]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-neutral-400">
                      Kazanım {b.id}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-[#e05338] font-semibold block mb-1">
                      {b.category}
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {b.title}
                    </h3>
                  </div>

                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 text-xs text-neutral-400 font-mono">
                  Otomatik Mutfak Güvencesi
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
