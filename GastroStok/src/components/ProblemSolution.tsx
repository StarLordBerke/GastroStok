import React from 'react';
import { Trash2, ShieldCheck, ArrowRight, XCircle, CheckCircle2 } from 'lucide-react';

export const ProblemSolution: React.FC = () => {
  return (
    <section id="sorun-ve-cozum" className="py-20 bg-[#14151a] border-y border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e05338]">
            <Trash2 className="w-4 h-4" />
            <span>Maliyet Analizi ve Gerçekler</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Çöpe giden malzemeler kârınızı eritiyor.
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed text-balance">
            Restoran ve kafelerde hammadde maliyetlerinin önemli bir kısmı tabağa bile ulaşmadan çöpe gider. Göz kararı verilen haftalık siparişler, unutulan son kullanma tarihleri ve reçetesiz porsiyonlama kârlılığınızı her gün sessizce tüketir.
          </p>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Traditional Method Card */}
          <div className="bg-[#18191f] rounded-2xl p-6 sm:p-8 border border-neutral-800 relative space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <span className="text-xs font-mono text-neutral-400 block">Eski Yöntem</span>
                  <h3 className="text-xl font-bold text-neutral-200">Geleneksel Mutfak Yönetimi</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-neutral-800/60 flex items-center justify-center text-neutral-400">
                  <XCircle className="w-5 h-5 text-neutral-400" />
                </div>
              </div>

              <p className="text-sm text-neutral-400 leading-relaxed">
                Tahminlere ve manuel defter kayıtlarına dayalı yönetim şekli, mutfak şeflerini ve işletmecileri sürekli kriz çözmeye zorlar:
              </p>

              <ul className="space-y-3.5 text-sm text-neutral-300">
                {[
                  'Göz kararı haftalık sipariş nedeniyle bozulan taze sebze ve şarküteri ürünleri',
                  'Kritik bir malzemenin hafta sonu servisinin tam ortasında tükenmesi ve müşteri kaybı',
                  'Farklı vardiyalarda değişen porsiyon gramajları ve reçete takipsizliği',
                  'Her akşam saatler süren yorucu defter sayımları ve fatura karmaşası',
                  'Hangi yemeğin gerçekten kâr getirdiğinin, hangisinin fire ürettiğinin bilinememesi'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-neutral-500 font-mono text-xs mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-neutral-800/80 text-xs text-neutral-400 font-mono">
              Sonuç: Önlenemeyen yüksek gıda maliyeti ve operasyonel stres.
            </div>
          </div>

          {/* GastroStok Solution Card */}
          <div className="bg-[#1a181c] rounded-2xl p-6 sm:p-8 border border-[#c24128]/40 relative space-y-6 flex flex-col justify-between shadow-lg shadow-[#c24128]/5">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <span className="text-xs font-mono text-[#f26a4f] block font-semibold">Akıllı Çözüm</span>
                  <h3 className="text-xl font-bold text-white">GastroStok ile Akıllı Stok</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#c24128]/20 border border-[#c24128]/30 flex items-center justify-center text-[#f26a4f]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">
                Satış verilerinizi ve reçetelerinizi yapay zeka ile harmanlayarak mutfağınızın geleceğini matematiksel hassasiyetle yönetir:
              </p>

              <ul className="space-y-3.5 text-sm text-neutral-200">
                {[
                  'Geçmiş adisyon eğilimlerine ve hava şartlarına göre nokta atışı haftalık sipariş listesi',
                  'Son kullanma tarihi yaklaşan kalemler için şefe anında menü ve hazırlık önerisi',
                  'Gramaj bazlı reçete entegrasyonu sayesinde her siparişte anlık stok düşümü',
                  'Dakikalar içinde fatura ve irsaliye dijitalleştirme ile otomatik depo güncellemesi',
                  'Kalem kalem fire analiz raporu ile hangi departmanda ne kadar israf olduğunun tespiti'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#e05338] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-neutral-800 text-xs text-[#f26a4f] font-mono flex items-center justify-between">
              <span>Hedef: Sıfır fire, öngörülebilir satın alma ve yüksek mutfak kârlılığı.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
