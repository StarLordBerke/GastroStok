import React from 'react';
import { 
  Compass, 
  Target, 
  Eye, 
  Scale, 
  Users, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  TrendingUp,
  UtensilsCrossed,
  Layers,
  Leaf
} from 'lucide-react';

interface AboutPageProps {
  onOpenRegister: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenRegister }) => {
  return (
    <div className="py-12 sm:py-20 bg-[#111215]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e05338]">
            <Compass className="w-4 h-4" />
            <span>GastroStok Manifestosu & Vizyonu</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Mutfaktaki Veriyi Kâra Dönüştüren Yeni Nesil Restoran Zekası
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            GastroStok; restoran, kafe ve ziyafet mutfaklarında her gün çöpe giden tonlarca taze gıdayı ve eriyen kâr marjlarını durdurmak amacıyla kurulmuş yapay zeka destekli bir operasyon platformudur.
          </p>
        </div>

        {/* 1. Projenin Doğuşu & Çözülen Problem */}
        <div className="bg-[#16181f] rounded-3xl p-6 sm:p-10 border border-neutral-800 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono text-[#e05338] font-semibold uppercase">01 · Çıkış Noktamız</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Neden GastroStok'u Geliştirdik?</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-neutral-300 text-sm sm:text-base leading-relaxed">
            <div className="space-y-4">
              <p>
                Gastronomi sektöründe bir restoranın başarısı menünün lezzeti kadar arka plandaki hammadde disiplinine bağlıdır. Ancak sektörde uzun yıllardır süregelen en büyük çıkmaz, mutfak siparişlerinin hala <strong className="text-white">şefin hislerine, hava durumu tahminlerine ve deftere karalanan el notlarına</strong> dayalı olarak verilmesidir.
              </p>
              <p>
                Aşırı sipariş verildiğinde raf ömrü dolan taze etler, şarküteri ürünleri ve sebzeler çöpe gitmekte; eksik sipariş verildiğinde ise en yoğun cuma akşamında misafirlere <span className="text-[#f26a4f] font-medium">"Bu ürünümüz maalesef tükendi"</span> mahcubiyeti yaşanmaktadır.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                GastroStok, satış noktası (POS) adisyonlarını geçmiş satış eğilimleri, yerel meteoroloji verileri, resmi tatiller ve reçete gramajlarıyla harmanlayarak bu belirsizliği ortadan kaldırır. 
              </p>
              <p>
                Platformumuz bir restoranın gelecekteki hammadde ihtiyacını bir gün önceden değil, <strong className="text-white">haftalık ve saatlik bazda</strong> matematiksel olarak öngörür. Böylece mutfak personeli gereksiz sayım stresi yaşamaz, işletme sahibi nakit akışını korur.
              </p>
            </div>
          </div>

          {/* Quick Pillar Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#241a18] border border-[#c24128]/30 flex items-center justify-center text-[#f26a4f] shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-mono">Çevresel Etki</p>
                <p className="text-sm font-semibold text-white">Sıfır Gıda İsrafı Hedefi</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#241a18] border border-[#c24128]/30 flex items-center justify-center text-[#f26a4f] shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-mono">Finansal Etki</p>
                <p className="text-sm font-semibold text-white">Hammadde Bütçesinde Tasarruf</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#241a18] border border-[#c24128]/30 flex items-center justify-center text-[#f26a4f] shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-mono">Teknoloji</p>
                <p className="text-sm font-semibold text-white">Dinamik Reçete Makine Öğrenimi</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Misyon ve Vizyon */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#e05338] font-semibold uppercase">02 · Temel Gayemiz</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Misyonumuz ve Vizyonumuz</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Misyon */}
            <div className="bg-[#171920] rounded-2xl p-8 border border-neutral-800 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#241a18] border border-[#c24128]/40 flex items-center justify-center text-[#f26a4f]">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Misyonumuz</h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  Restoran, kafe ve otel mutfaklarında insan hatasından ve öngörülemezlikten kaynaklanan gıda firesini minimum seviyeye indirmek; şeflerin ve servis ekibinin üzerindeki manuel sayım ve sipariş stresini ortadan kaldırarak sürdürülebilir işletme kârlılığı inşa etmek.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 pt-4 border-t border-neutral-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e05338] shrink-0" />
                  <span>Şeflerin reçete ve gramaj kontrolünü dijitalleştirmek</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e05338] shrink-0" />
                  <span>Önlenebilir çöp oranını ortadan kaldırmak</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e05338] shrink-0" />
                  <span>Her boyuttaki işletmeye erişilebilir yapay zeka sunmak</span>
                </li>
              </ul>
            </div>

            {/* Vizyon */}
            <div className="bg-[#171920] rounded-2xl p-8 border border-neutral-800 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#241a18] border border-[#c24128]/40 flex items-center justify-center text-[#f26a4f]">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Vizyonumuz</h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  Türkiye'den başlayarak küresel yeme-içme (HoReCa) endüstrisinde restoran tedarik zincirini, mutfak hazırlıklarını ve fire yönetimini yöneten standart yapay zeka omurgası olmak; tarladan sofraya uzanan tedarik zincirinde sıfır israf ekosistemi yaratmak.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 pt-4 border-t border-neutral-800">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e05338] shrink-0" />
                  <span>Global HoReCa pazarında lider mutfak zekası yazılımı olmak</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e05338] shrink-0" />
                  <span>Toptancılar ile mutfakları sıfır kayıpla entegre etmek</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e05338] shrink-0" />
                  <span>Gıda sürdürülebilirliğinde ölçülebilir fark yaratmak</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Rakip Analizi & Ayrışan Yönlerimiz */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#e05338] font-semibold uppercase">03 · Sektörel Konumlandırma</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Rakip Analizi & Ayrışan Gücümüz</h2>
            <p className="text-sm text-neutral-300">
              Geleneksel ERP programları ve basit POS modülleri geçmişi listelerken; GastroStok geleceği matematiksel modellerle tahmin eder.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Geleneksel ERP */}
            <div className="bg-[#181920] rounded-2xl p-6 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 className="font-bold text-neutral-200">Geleneksel ERP & Depo</h3>
                <span className="text-xs font-mono text-neutral-400">Reaktif</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <span>Sadece geçmişte girilen faturaları ve irsaliyeleri kaydeder.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <span>Mutfakta şeflerin kullanması için son derece karmaşık ve hantaldır.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <span>Hava durumu veya etkinlik tahmini yapamaz; sipariş önerisi veremez.</span>
                </li>
              </ul>
            </div>

            {/* Temel POS Sistemleri */}
            <div className="bg-[#181920] rounded-2xl p-6 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 className="font-bold text-neutral-200">Yalnızca POS & Kasa</h3>
                <span className="text-xs font-mono text-neutral-400">Statik</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <span>Adisyon ve hesap kesmede başarılıdır ancak mutfak içi detayı bilmez.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <span>SKT yaklaşan hammaddeyi uyarmaz veya hazırlık listesi çıkarmaz.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <span>Toptancılara özel sepet formatı oluşturamaz; siparişi şefe bırakır.</span>
                </li>
              </ul>
            </div>

            {/* GastroStok */}
            <div className="bg-[#1d1b22] rounded-2xl p-6 border border-[#c24128]/50 space-y-4 shadow-xl shadow-[#c24128]/5 relative">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#c24128] flex items-center justify-center text-white text-xs font-bold">
                    GS
                  </div>
                  <h3 className="font-bold text-white">GastroStok Zekası</h3>
                </div>
                <span className="text-xs font-mono text-[#f26a4f] font-semibold">Proaktif AI</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e05338] shrink-0 mt-0.5" />
                  <span>Geçmiş adisyon + hava durumu + tatilleri analiz ederek hammadde öngörür.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e05338] shrink-0 mt-0.5" />
                  <span>SKT yaklaşan malzemeyi şefin günün spesiyaline dönüştürmesini önerir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e05338] shrink-0 mt-0.5" />
                  <span>Tek tıkla toptancılara ayrıştırılmış hazır WhatsApp/E-posta siparişi hazırlar.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 4. Kullanıcı Beklentileri ve Karşılanan Çözümler */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#e05338] font-semibold uppercase">04 · Kullanıcı Odaklı Tasarım</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Kullanıcı Beklentileri & Çözüm Eşleşmesi</h2>
            <p className="text-sm text-neutral-300">
              Restoran operasyonunun her kademesindeki paydaşların gerçek saha beklentilerine verdiğimiz doğrudan yanıtlar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Persona 1: Mutfak Şefleri */}
            <div className="bg-[#16181f] p-6 sm:p-7 rounded-2xl border border-neutral-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#241a18] border border-[#c24128]/30 flex items-center justify-center text-[#f26a4f]">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Mutfak Şefleri ve Sous-Chef'ler</h3>
                  <p className="text-xs text-neutral-400 font-mono">Hazırlık & Porsiyon Disiplini</p>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="p-3 bg-[#111215] rounded-xl border border-neutral-800">
                  <span className="text-[#f26a4f] font-semibold block text-xs mb-1">Saha Beklentisi:</span>
                  <p className="text-neutral-300">"Hafta sonu servisin tam ortasında et veya sos bitmesin. Sabahları gereğinden fazla mise en place yapıp akşam çöpe atmayalım."</p>
                </div>
                <div className="p-3 bg-[#1d1f28] rounded-xl border border-neutral-700/80">
                  <span className="text-white font-semibold block text-xs mb-1">GastroStok Çözümü:</span>
                  <p className="text-neutral-200">Beklenen adisyon hacmine göre sabah hazırlanması gereken net gramaj miktarlarını otomatik porsiyon reçeteleriyle ekrana yansıtır.</p>
                </div>
              </div>
            </div>

            {/* Persona 2: Kafe Sahipleri & Baristalar */}
            <div className="bg-[#16181f] p-6 sm:p-7 rounded-2xl border border-neutral-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#241a18] border border-[#c24128]/30 flex items-center justify-center text-[#f26a4f]">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Kafe Sahipleri & Baş Baristalar</h3>
                  <p className="text-xs text-neutral-400 font-mono">Taze Ürün Rotasyonu & Hızlı Sayım</p>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="p-3 bg-[#111215] rounded-xl border border-neutral-800">
                  <span className="text-[#f26a4f] font-semibold block text-xs mb-1">Saha Beklentisi:</span>
                  <p className="text-neutral-300">"Açılan bitkisel sütlerin ve pastane ürünlerinin son kullanma tarihleri karışmasın; akşam sayımı 5 dakikadan uzun sürmesin."</p>
                </div>
                <div className="p-3 bg-[#1d1f28] rounded-xl border border-neutral-700/80">
                  <span className="text-white font-semibold block text-xs mb-1">GastroStok Çözümü:</span>
                  <p className="text-neutral-200">Mobil cihazdan barkod veya hızlı kalem seçimiyle 2 dakikalık vardiya sayımı ve açılış tarihi geçen ürün alarmları sunar.</p>
                </div>
              </div>
            </div>

            {/* Persona 3: Restoran İşletmecileri & Finans */}
            <div className="bg-[#16181f] p-6 sm:p-7 rounded-2xl border border-neutral-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#241a18] border border-[#c24128]/30 flex items-center justify-center text-[#f26a4f]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">İşletme Sahipleri & Finans Yöneticileri</h3>
                  <p className="text-xs text-neutral-400 font-mono">Kâr Marjı Güvencesi & Kayıp Tespiti</p>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="p-3 bg-[#111215] rounded-xl border border-neutral-800">
                  <span className="text-[#f26a4f] font-semibold block text-xs mb-1">Saha Beklentisi:</span>
                  <p className="text-neutral-300">"Ay sonunda ciro iyi görünürken neden kârın eridiğini, toptancı zamlarının hangi tabağı zarara soktuğunu görmek istiyorum."</p>
                </div>
                <div className="p-3 bg-[#1d1f28] rounded-xl border border-neutral-700/80">
                  <span className="text-white font-semibold block text-xs mb-1">GastroStok Çözümü:</span>
                  <p className="text-neutral-200">Birim hammadde alış fiyatlarındaki değişimi menü reçeteleriyle eşleştirip marjı düşen yemekleri kırmızı listeye alır.</p>
                </div>
              </div>
            </div>

            {/* Persona 4: Çok Şubeli Marka Müdürleri */}
            <div className="bg-[#16181f] p-6 sm:p-7 rounded-2xl border border-neutral-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#241a18] border border-[#c24128]/30 flex items-center justify-center text-[#f26a4f]">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Genel Müdürler & Satın Alma Ekipleri</h3>
                  <p className="text-xs text-neutral-400 font-mono">Çoklu Lokasyon & Konsolide Alım</p>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="p-3 bg-[#111215] rounded-xl border border-neutral-800">
                  <span className="text-[#f26a4f] font-semibold block text-xs mb-1">Saha Beklentisi:</span>
                  <p className="text-neutral-300">"5 ayrı şubenin fire oranlarını kıyaslamak, şubeler arası hammadde transferlerini yönetmek ve toplu alım indirimi yakalamak."</p>
                </div>
                <div className="p-3 bg-[#1d1f28] rounded-xl border border-neutral-700/80">
                  <span className="text-white font-semibold block text-xs mb-1">GastroStok Çözümü:</span>
                  <p className="text-neutral-200">Tek merkezden tüm şubelerin gerçek zamanlı depo durumunu izleme ve toptancı siparişlerini konsolide sepetleme imkanı sağlar.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 5. Alt Eylem Çağrısı */}
        <div className="bg-gradient-to-r from-[#1d1f29] to-[#15171f] rounded-3xl p-8 sm:p-12 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">Mutfağınızı GastroStok ile Geleceğe Taşıyın</h3>
            <p className="text-sm text-neutral-300 max-w-xl">
              Restoranınızı hemen sisteme kaydedin; ekibimiz menü reçetelerinizi ve POS entegrasyonunuzu 24 saat içinde tamamlasın.
            </p>
          </div>
          <button
            onClick={onOpenRegister}
            className="px-6 py-3.5 bg-[#c24128] hover:bg-[#aa3620] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0 shadow-lg shadow-[#c24128]/25 flex items-center gap-2"
          >
            <span>Restoranını Ücretsiz Ekle</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
