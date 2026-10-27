import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "GastroStok'u restoranımın mevcut POS veya adisyon sistemine nasıl bağlayabilirim?",
      answer: "GastroStok, Türkiye'de yaygın olarak kullanılan bulut ve yerel adisyon/POS sistemleriyle API ve otomatik rapor aktarımı aracılığıyla entegre çalışır. Herhangi bir ek donanım yatırımı yapmanıza gerek kalmaz; adisyonlarınız her gün belirli periyotlarla veya anlık olarak sistemimize aktarılır."
    },
    {
      question: "Reçete ve porsiyon girişlerini sisteme aktarmak ne kadar sürer?",
      answer: "Mevcut reçete ve menü kartlarınızı Excel formatında tek tıkla yükleyebilir veya GastroStok'un akıllı reçete sihirbazını kullanarak dakikalar içinde oluşturabilirsiniz. Bir yemeğe ait gramajlar (örneğin: 1 porsiyon burger için 160g kıyma, 1 adet ekmek, 25g karamelize soğan) sisteme bir kez tanımlandıktan sonra her satışta stoktan otomatik olarak düşer."
    },
    {
      question: "Yapay zeka talep tahminini neye göre hesaplıyor?",
      answer: "GastroStok'un tahmin motoru; işletmenizin son 60-90 günlük gerçek adisyon satış trendlerini, haftanın günlerini, resmi tatilleri, lokasyonunuzdaki hava durumu tahminlerini (yağmurlu günlerde paket servis artışı veya teras düşüşü gibi) ve mevsimsel menü dinamiklerini birlikte analiz eder."
    },
    {
      question: "Birden fazla şubesi olan işletmeler için merkezi yönetim var mı?",
      answer: "Evet. GastroStok çok şubeli restoran zincirleri için tasarlanmış merkezi bir genel müdürlük konsoluna sahiptir. Tüm şubelerin anlık stoklarını, fire oranlarını ve tedarik ihtiyaçlarını tek ekrandan izleyebilir; şubeler arası hammadde transferlerini ve toplu toptancı alımlarını organize edebilirsiniz."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="sss" className="py-20 bg-[#111215] border-t border-neutral-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e05338]">
            <HelpCircle className="w-4 h-4" />
            <span>Merak Edilenler</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Sık Sorulan Sorular
          </h2>

          <p className="text-base text-neutral-300 leading-relaxed text-balance">
            Sistemin entegrasyonu, reçete yönetimi ve günlük işleyişi hakkında bilmek istedikleriniz.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#171920] rounded-2xl border border-neutral-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c24128]"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-white">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#22252e] flex items-center justify-center text-neutral-300 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#f26a4f]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/80">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
