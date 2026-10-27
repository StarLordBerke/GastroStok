import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ChefHat, 
  RefreshCw,
  ArrowRight,
  Check,
  Copy,
  ThumbsUp,
  Maximize2,
  Minimize2,
  Calculator,
  Zap,
  BarChart3,
  Layers,
  PhoneCall,
  Scale
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  category?: string;
  calculationData?: {
    budget: number;
    wasteAmount: number;
    savedMonthly: number;
    savedAnnual: number;
    rescuedMeals: number;
  };
  suggestedAction?: {
    label: string;
    action: () => void;
  };
  followUps?: string[];
}

interface GastroBotProps {
  onOpenRegister: () => void;
  onNavigateModules: () => void;
}

export const GastroBot: React.FC<GastroBotProps> = ({ onOpenRegister, onNavigateModules }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialMessages: Message[] = [
    {
      id: 'welcome',
      sender: 'bot',
      text: `👋 **Merhaba, GastroStok Yapay Zeka Mutfak Asistanına hoş geldiniz!**

Ben restoranlar, kafeler ve profesyonel mutfaklar için optimize edilmiş akıllı asistanınızım.

Size aşağıdaki konularda rehberlik edebilirim:
• **Adisyon & POS Entegrasyonu:** (SambaPOS, Simpra, Mikro, Omnis vb.)
• **Food Cost & Gramaj Kontrolü:** Teorik vs. fiili reçete maliyet analizleri
• **Yapay Zeka Talep Tahmini:** Hava durumu, maç günleri ve geçmiş satış analizi
• **Hızlı Fire & Tasarruf Hesabı:** "Aylık 350.000 TL hammadde bütçem var" yazın, anında hesaplayayım!
• **Tedarikçi & WhatsApp:** Otomatik sipariş fişleri ve toptancı fiyat takibi

Aşağıdaki hızlı konulardan birini seçebilir veya sorunuzu doğrudan yazabilirsiniz:`,
      time: 'Şimdi',
      followUps: [
        'Aylık 300.000 TL bütçe için tasarruf hesapla',
        'POS sistemimle nasıl entegre olur?',
        'Reçete & porsiyon gramajı nasıl girilir?',
        'Yapay zeka hava durumunu nasıl hesaba katar?'
      ]
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const categories = [
    { id: 'all', label: 'Tüm Konular', icon: Sparkles },
    { id: 'pos', label: 'POS & Entegrasyon', icon: Zap },
    { id: 'cost', label: 'Food Cost & Reçete', icon: Scale },
    { id: 'ai', label: 'AI Talep Tahmini', icon: BarChart3 },
    { id: 'calc', label: 'Fire & ROI Hesapla', icon: Calculator },
  ];

  const quickTopicPrompts: Record<string, string[]> = {
    all: [
      'Aylık 400.000 ₺ için tasarruf hesapla',
      'POS adisyon entegrasyonu nasıl çalışır?',
      'Reçeteler Excel ile yüklenebilir mi?',
      '14 günlük ücretsiz deneme nasıl başlar?'
    ],
    pos: [
      'SambaPOS ile nasıl bağlanır?',
      'Simpra bulut adisyon desteği var mı?',
      'İnternet kesilirse veri kaybı olur mu?',
      'Özel/yerli POS sistemleri entegre edilir mi?'
    ],
    cost: [
      'İdeal Food Cost oranı kaçtır?',
      'Teorik vs fiili maliyet farkı nasıl bulunur?',
      'Alt reçete (sos/marinasyon) desteği var mı?',
      'Porsiyon tartısı ve gramaj aşımı nasıl önlenir?'
    ],
    ai: [
      'Yağmurlu günlerde talep nasıl tahmin edilir?',
      'Tahmin modeli kaç günlük veriye ihtiyaç duyar?',
      'Hangi hammadde için ne kadar sipariş önerir?',
      'Özel etkinlik ve tatil günleri nasıl işlenir?'
    ],
    calc: [
      'Aylık 150.000 ₺ için fireyi hesapla',
      'Aylık 500.000 ₺ harcıyorum ne kadar kurtarırım?',
      'Yıllık kaç porsiyon yemek kurtarılabilir?',
      'Sistemin kendini amorti etme süresi nedir?'
    ]
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleLike = (id: string) => {
    setLikedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Extract financial numbers if user asks for calculation
  const parseFinancialAmount = (query: string): number | null => {
    const q = query.toLowerCase();
    
    // Look for patterns like "300.000", "300000", "300 bin", "300 k", "1.5 milyon", "1 milyon"
    if (q.includes('milyon')) {
      const match = q.match(/(\d+([.,]\d+)?)\s*milyon/);
      if (match) {
        return parseFloat(match[1].replace(',', '.')) * 1000000;
      }
    }

    if (q.includes('bin') || q.includes('k')) {
      const match = q.match(/(\d+([.,]\d+)?)\s*(bin|k)/);
      if (match) {
        return parseFloat(match[1].replace(',', '.')) * 1000;
      }
    }

    const rawMatch = q.match(/(\d{1,3}(?:[.,]\d{3})+|\d{4,9})/);
    if (rawMatch) {
      const cleaned = rawMatch[1].replace(/[.,]/g, '');
      const parsed = parseInt(cleaned, 10);
      if (!isNaN(parsed) && parsed >= 10000 && parsed <= 50000000) {
        return parsed;
      }
    }

    return null;
  };

  // Comprehensive domain knowledge answering engine
  const generateBotReply = (query: string): { 
    reply: string; 
    action?: { label: string; action: () => void };
    followUps?: string[];
    calculationData?: Message['calculationData'];
  } => {
    const q = query.toLowerCase().trim();

    // 1. Check for financial calculation intent
    const detectedAmount = parseFinancialAmount(query);
    if (detectedAmount || q.includes('hesapla') || (q.includes('ciro') || q.includes('bütçe')) && (q.includes('₺') || q.includes('tl'))) {
      const budget = detectedAmount || 350000;
      const wasteRate = budget > 1000000 ? 0.11 : budget > 300000 ? 0.09 : 0.07;
      const preventableRatio = 0.68;
      
      const totalWaste = Math.round(budget * wasteRate);
      const savedMonthly = Math.round(totalWaste * preventableRatio);
      const savedAnnual = savedMonthly * 12;
      const rescuedMeals = Math.round(savedAnnual / 180);
      const paybackDays = Math.max(3, Math.round(15000 / (savedMonthly / 30)));

      return {
        reply: `📊 **Aylık ${budget.toLocaleString('tr-TR')} ₺ Hammadde Bütçesi İçin Canlı Fire & ROI Analizi:**

Mevcut hammadde girdiniz üzerinden restoran sektörü standartlarıyla yapılan simülasyon:

• **Aylık Toplam İsraf & Fire:** ~${totalWaste.toLocaleString('tr-TR')} ₺ (%${Math.round(wasteRate * 100)} kayıp)
• **GastroStok ile Kurtarılan Net Kâr:** **${savedMonthly.toLocaleString('tr-TR')} ₺ / ay**
• **Yıllık Ekstra Brüt Kâr Artışı:** **${savedAnnual.toLocaleString('tr-TR')} ₺ / yıl**
• **Kurtarılan Tabak / Porsiyon:** ~${rescuedMeals.toLocaleString('tr-TR')} tabak / yıl
• **Yatırımın Geri Dönüşü (ROI):** GastroStok sistemi bu tasarrufla **ortalama ${paybackDays} gün içinde** kendi maliyetini tamamen amorti eder.

İnteraktif Tasarruf Simülatörü sayfamızda kendi işletme tipinize (Bistro, Alakart, Zincir) göre oranları anlık olarak kaydırıcılarla da test edebilirsiniz.`,
        calculationData: {
          budget,
          wasteAmount: totalWaste,
          savedMonthly,
          savedAnnual,
          rescuedMeals
        },
        action: {
          label: 'Bu Tasarrufu Başlat (14 Gün Ücretsiz)',
          action: () => { setIsOpen(false); onOpenRegister(); }
        },
        followUps: [
          'Hangi ürün gruplarında fire daha çok olur?',
          'Reçete gramaj takibi nasıl uygulanır?',
          'POS adisyon entegrasyonu ne kadar sürer?'
        ]
      };
    }

    // 2. POS & Adisyon Entegrasyonları
    if (q.includes('pos') || q.includes('adisyon') || q.includes('sambapos') || q.includes('simpra') || q.includes('mikro') || q.includes('vegatec') || q.includes('omnitron') || q.includes('entegrasyon')) {
      return {
        reply: `🔌 **Adisyon ve POS Entegrasyon Mimarisi:**

GastroStok, restoran sektöründe kullanılan tüm modern POS altyapılarıyla kusursuz haberleşir:

1. **Desteklenen Sistemler:**
   • **Bulut POS:** Simpra, Omnitron, NarPOS, Centum, RestApp
   • **Yerel / Hibrit POS:** SambaPOS (SQL Server API), Mikro Yazılım, Vega, Protel Micros
2. **Nasıl Çalışır?**
   • Garson masadan hesabı kapattığında adisyon verisi GastroStok'a anlık (web-hook) veya 5 dakikalık periyotlarla akar.
   • Satılan yemeğin reçetesindeki hammadde gramajları (örn. 1x Izgara Köfte = 180g kıyma, 40g pide, 20g tereyağı) ana depodan ve mutfak alt deposundan anında düşer.
3. **Donanım İhtiyacı:**
   • Ekstra el terminali, sunucu veya pahalı cihaz satın almanız **gerekmez**. Sistem mevcut bilgisayar ve tabletlerinizle çalışır.
   • İnternet kesilse bile yerel kuyruk mekanizması bağlantı geldiğinde adisyonları otomatik eşitler.`,
        action: {
          label: 'POS Entegrasyonunu Başlat',
          action: () => { setIsOpen(false); onOpenRegister(); }
        },
        followUps: [
          'SambaPOS ile nasıl bağlanır?',
          'Reçeteler Excel ile yüklenebilir mi?',
          'Garson yanlış sipariş girerse stok nasıl düzelir?'
        ]
      };
    }

    // 3. Reçete, Porsiyonlama, Food Cost
    if (q.includes('reçete') || q.includes('food cost') || q.includes('gramaj') || q.includes('porsiyon') || q.includes('maliyet') || q.includes('menü') || q.includes('tartı')) {
      return {
        reply: `🍳 **Akıllı Reçete & Food Cost Yönetimi:**

Restoran kârlılığının omurgası reçete standardizasyonudur. GastroStok ile:

• **Alt Reçete (Sub-Recipe) Desteği:**
  Kemik suyu, marine edilmiş tavuk göğsü, pizza sosu gibi yarı-mamulleri tek seferde hazırlayıp ana reçetelerde bileşen olarak kullanabilirsiniz.
• **Dinamik Fiyat Güncellemesi:**
  Toptancıdan alınan tereyağının veya etin kilogram fiyatı faturayla değiştiğinde, menünüzdeki ilgili tüm yemeklerin porsiyon maliyeti ve hedeflenen kâr marjı anında güncellenir.
• **Teorik vs. Fiili Tüketim Karşılaştırması:**
  Ay sonunda adisyonlara göre çıkması gereken kıyma ile tartımda eksilen kıyma arasındaki farkı raporlar; aşırı porsiyonlama veya izinsiz tüketimi kırmızı alarmla gösterir.
• **Hızlı İçe Aktarma:**
  Mevcut Excel reçetelerinizi akıllı eşleştirici ile 10 dakikada sisteme yükleyebilirsiniz.`,
        action: {
          label: 'Stok & Reçete Modülünü İncele',
          action: () => { setIsOpen(false); onNavigateModules(); }
        },
        followUps: [
          'İdeal restoran Food Cost oranı nedir?',
          'Aylık 250.000 ₺ bütçe için tasarruf hesapla',
          'Tedarikçi siparişi nasıl oluşturulur?'
        ]
      };
    }

    // 4. Yapay Zeka Tahmini, Hava Durumu, Algoritma
    if (q.includes('tahmin') || q.includes('yapay zeka') || q.includes('ai') || q.includes('hava') || q.includes('algoritma') || q.includes('makine') || q.includes('yağmur') || q.includes('tahmini')) {
      return {
        reply: `🤖 **GastroStok AI Talep Tahmin Algoritması Nasıl Çalışır?**

GastroStok standart istatistik ortalamaları yerine çok değişkenli derin tahmin modelleri kullanır:

• **1. Geçmiş Tüketim Örüntüleri:**
  Son 90 günlük saatlik satış trendleri, haftanın günleri (Cuma akşamı vs. Salı öğle servisi) ve sezonluk döngüler.
• **2. Yerel Hava Durumu & Sıcaklık:**
  Meteoroloji verileri otomatik çekilir. Örneğin: Sıcaklık 30°C üzerine çıktığında soğuk içecek & salata talebi %35 artarken, çorba & ağır güveç talebi %25 düşer. Yağmurlu günlerde paket servis artışı hesaba katılır.
• **3. Takvim, Etkinlik & Rezervasyonlar:**
  Resmi tatiller, bayramlar, derbi maç günleri ve restorana girilen grup rezervasyonları doğrudan sipariş listesine yansıtılır.
• **Sonuç:**
  Haftalık toptancı siparişinizi oluştururken *"Cumartesi için 28 kg dana antrikot ve 45 adet taze burrata sipariş etmelisiniz, aksi halde Pazar günü stok tükenecek"* gibi net öneriler verir.`,
        action: {
          label: 'AI Tahmin Modülünü Canlı Test Et',
          action: () => { setIsOpen(false); onNavigateModules(); }
        },
        followUps: [
          'Tahmin modeli kaç günlük veriye ihtiyaç duyar?',
          'Tedarikçilere WhatsApp üzerinden sipariş nasıl atılır?',
          'Fire raporlarında hangi metrikler var?'
        ]
      };
    }

    // 5. Fire Türleri & İsrafı Önleme
    if (q.includes('fire') || q.includes('israf') || q.includes('çöp') || q.includes('bozulma') || q.includes('skt') || q.includes('kayıp') || q.includes('fifo')) {
      return {
        reply: `📉 **Restoranlarda 4 Temel Fire Türü ve GastroStok'un Çözümü:**

1. **Hazırlık & Ayıklama Firesi (Trim Loss):**
   Et temizleme veya sebze soyma sırasındaki aşırı ayıklamaları personelin girdiği standart fire oranlarıyla denetler.
2. **Bozulma & SKT Aşımı (Spoilage):**
   FIFO/FEFO (İlk giren ilk çıkar) kuralıyla çalışan akıllı depo haritası, raf ömrü 48 saat kalan taze ürünleri şefe hatırlatır ve *"Günün Spesiyali"* olarak eritilmesini tavsiye eder.
3. **Fazla Hazırlık Firesi (Over-Prep):**
   Yapay zeka sayesinde o günkü tahmin edilen servis adedine göre sabah hazırlık listesi (mise en place) çıkarır. Boşa hazırlık yapılmasını engeller.
4. **Tabaktan Dönen / İade Firesi:**
   Müşteriden dönen yemeklerin nedenlerini (soğuk, tuzlu, pişmemiş) kategorize ederek menü revizyonu yapmanızı sağlar.`,
        action: {
          label: 'Fire Raporları Modülünü Gör',
          action: () => { setIsOpen(false); onNavigateModules(); }
        },
        followUps: [
          'Aylık 500.000 ₺ bütçe için tasarruf hesapla',
          'Depodaki ürünlerin SKT takibi nasıl yapılır?',
          'Şefler için kullanımı zor mu?'
        ]
      };
    }

    // 6. Tedarikçi, Satın Alma, WhatsApp
    if (q.includes('tedarik') || q.includes('whatsapp') || q.includes('sipariş') || q.includes('toptancı') || q.includes('fatura') || q.includes('hal') || q.includes('kasap')) {
      return {
        reply: `🚚 **Tek Tıkla Akıllı Tedarikçi Siparişi:**

GastroStok, hammadde ihtiyaçlarını tedarikçilerinize göre otomatik gruplar:

• **Otomatik Ayırma:**
  Eti kasaba, sebze-meyveyi hale, süt ürünlerini mandıraya ait ayrı listeler halinde hazırlar.
• **Hazır WhatsApp & E-posta Metni:**
  *"Merhaba Ahmet Bey, bugün için 15 kg Dana Bonfile, 8 kg Kıyma siparişimizdir. Saat 11:00'e kadar teslim rica ederiz."* şeklinde tek tıkla doğrudan ilgili toptancının WhatsApp hattına gönderir.
• **Fiyat Değişim Alarmı:**
  Tedarikçi faturayı getirdiğinde girilen birim fiyat son alımdan %5'ten fazla yüksekse sistem yöneticiyi uyarır. Böylece toptancı zamları gözden kaçmaz.`,
        action: {
          label: 'Tedarikçi Modülünü Test Et',
          action: () => { setIsOpen(false); onNavigateModules(); }
        },
        followUps: [
          'Fatura ve irsaliyeler sisteme nasıl işlenir?',
          'Kritik stok uyarısı SMS veya bildirimle gelir mi?',
          '14 günlük deneme sürümü neleri kapsar?'
        ]
      };
    }

    // 7. Çok Şubeli / Franchise
    if (q.includes('şube') || q.includes('zincir') || q.includes('franchise') || q.includes('merkez') || q.includes('transfer')) {
      return {
        reply: `🏢 **Çok Şubeli İşletmeler & Franchise Ağı İçin GastroStok:**

Birden fazla şubesi veya merkezi üretim mutfağı (Central Kitchen) olan işletmeler için özel fonksiyonlar:

• **Merkezi Yönetici Paneli:** Tüm şubelerin anlık ciro, hammadde maliyeti, fire oranı ve stok durumunu tek ekrandan kıyaslayın.
• **Şubeler Arası Transfer:** Kadıköy şubesinde fazla olan 10 kg kahve çekirdeğinin Beşiktaş şubesine transferini dijital irsaliye ile kaydedin.
• **Şube Bazlı Fire Kıyaslaması:** Aynı menüyü satan iki şube arasında hammadde kullanım farkı varsa şef performansını ve porsiyon kaçaklarını anında tespit edin.
• **Rol & Yetkilendirme:** Şube müdürleri sadece kendi stoklarını görürken, genel merkez satın alma ve kârlılık raporlarına tam erişim sağlar.`,
        action: {
          label: 'Çok Şubeli Kurulum İçin Başvurun',
          action: () => { setIsOpen(false); onOpenRegister(); }
        },
        followUps: [
          'Merkezi üretim mutfağı nasıl modellenir?',
          'Aylık 1.5 milyon ₺ bütçe için tasarruf hesapla',
          'Kullanıcı ve şef yetkileri nasıl kısıtlanır?'
        ]
      };
    }

    // 8. Fiyatlandırma, Kurulum, 14 Günlük Ücretsiz Deneme
    if (q.includes('fiyat') || q.includes('ücret') || q.includes('paket') || q.includes('deneme') || q.includes('nasıl başlar') || q.includes('kayıt') || q.includes('kurulum')) {
      return {
        reply: `✨ **14 Günlük Koşulsuz Ücretsiz Deneme & Kurulum Süreci:**

• **Kredi Kartı Gerekmez:** Hiçbir taahhüt veya kart bilgisi vermeden anında test edebilirsiniz.
• **Hızlı Kurulum Ekibi:** Menü ve reçete listelerinizi uzman onboarding ekibimiz 24 saat içinde sisteme tanımlar.
• **Eğitim Desteği:** Salon şefiniz ve mutfak ekibiniz için 30 dakikalık canlı görüntülü kullanım eğitimi verilir.
• **Fiyatlandırma Modeli:** Şube büyüklüğüne ve modül seçimine göre şeffaf aylık abonelik modeli uygulanır; tasarruf edilen fire tutarının yanında sembolik bir yatırımdır.`,
        action: {
          label: 'Restoranını Ücretsiz Ekle (14 Gün)',
          action: () => { setIsOpen(false); onOpenRegister(); }
        },
        followUps: [
          'Kurulum ne kadar sürer?',
          'Aylık 200.000 ₺ bütçe için tasarruf hesapla',
          'Sözleşme veya taahhüt var mı?'
        ]
      };
    }

    // 9. Selamlaşma / Nezaket
    if (q === 'merhaba' || q === 'selam' || q === 'günaydın' || q === 'iyi akşamlar' || q === 'selamlar' || q === 'hey') {
      return {
        reply: `👋 Merhaba! Size ve mutfağınıza nasıl yardımcı olabilirim? 

İster restoranınızın adisyon sistemini (SambaPOS, Simpra vb.) bağlama adımlarını sorun, ister aylık hammadde bütçenizi yazın, mutfağınızın kurtarabileceği fire miktarını anında hesaplayalım!`,
        followUps: [
          'Aylık 300.000 ₺ için tasarruf hesapla',
          'POS entegrasyonu nasıl çalışır?',
          'Reçeteler nasıl girilir?'
        ]
      };
    }

    // 10. Teşekkür / Olumlu geri bildirim
    if (q.includes('teşekkür') || q.includes('sağol') || q.includes('harika') || q.includes('süper') || q.includes('çok iyi')) {
      return {
        reply: `Rica ederim! Mutfak kârlılığınızı en üst seviyeye taşımak için buradayım. Dilediğiniz zaman yeni sorular sorabilir veya 14 günlük ücretsiz deneme ile GastroStok'u kendi restoranınızda hemen çalıştırabilirsiniz.`,
        action: {
          label: 'Hemen Ücretsiz Deneyin',
          action: () => { setIsOpen(false); onOpenRegister(); }
        }
      };
    }

    // 11. Genel Akıllı Yanıt
    return {
      reply: `Anladım. GastroStok mutfağınızdaki **fireyi %65 oranında azaltmak**, hammadde maliyetlerini denetlemek ve geçmiş adisyon satışlarınıza göre **yapay zeka destekli sipariş önerileri** sunmak için tasarlandı.

Sorunuzla ilgili daha detaylı yardımcı olabilmem için şu konulardan birini seçebilir veya spesifik bir detay belirtebilirsiniz:
• **Aylık hammadde harcamanızı** yazarak net tasarruf analizi yaptırabilirsiniz (Örn: "Aylık 350 bin harcıyoruz").
• Kullandığınız **POS sisteminin adını** belirtebilirsiniz (Örn: SambaPOS, Simpra).
• **Reçete, fire raporu veya tedarikçi** modülleriyle ilgili teknik detay isteyebilirsiniz.`,
      action: {
        label: 'Tüm Modülleri Canlı İncele',
        action: () => { setIsOpen(false); onNavigateModules(); }
      },
      followUps: [
        'Aylık 250.000 ₺ için tasarruf hesapla',
        'POS entegrasyonu nasıl yapılır?',
        'Reçete porsiyonlama nasıl çalışır?',
        'Deneme sürecini başlat'
      ]
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Realistic thinking pause
    setTimeout(() => {
      const { reply, action, followUps, calculationData } = generateBotReply(text);
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: action,
        followUps: followUps,
        calculationData: calculationData
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  // Helper to format text with bold, bullets, badges
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }

      // Check for bullet line
      const isBullet = line.trim().startsWith('•');
      const cleanLine = isBullet ? line.trim().substring(1).trim() : line;

      // Replace markdown **bold** with <strong>
      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold text-white">
              {part.substring(2, part.length - 2)}
            </strong>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={idx} className="flex items-start gap-2 text-neutral-300 my-0.5 pl-1 leading-relaxed">
            <span className="text-[#f26a4f] text-xs font-bold leading-none mt-1">▪</span>
            <span>{formattedParts}</span>
          </div>
        );
      }

      return (
        <p key={idx} className="leading-relaxed text-neutral-200">
          {formattedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-3.5 py-3 sm:px-4 sm:py-3 bg-[#c24128] hover:bg-[#aa3620] active:bg-[#942e1a] text-white rounded-full shadow-2xl shadow-[#c24128]/40 border border-[#e05338]/30 transition-all transform hover:scale-105 cursor-pointer group"
            aria-label="GastroBot AI Asistanını Aç"
          >
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center relative">
              <Bot className="w-5 h-5 text-white" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#c24128] absolute -top-0.5 -right-0.5"></span>
            </div>
            
            <div className="text-left pr-1 hidden sm:block">
              <span className="text-xs font-bold block leading-tight flex items-center gap-1">
                GastroBot <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
              </span>
              <span className="text-[10px] text-white/80 block leading-tight font-mono">
                AI Mutfak & Fire Danışmanı
              </span>
            </div>
          </button>
        </div>
      )}

      {/* GastroBot Interactive Chat Window */}
      {isOpen && (
        <div 
          className={`fixed z-50 bg-[#161820] rounded-2xl border border-neutral-700/90 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${
            isExpanded
              ? 'inset-2 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[650px] sm:h-[750px] max-h-[96vh]'
              : 'bottom-3 left-3 right-3 sm:left-auto sm:bottom-6 sm:right-6 sm:w-[440px] h-[580px] max-h-[85vh] sm:max-h-[88vh]'
          }`}
        >
          
          {/* Header */}
          <div className="px-4 py-3 bg-[#121318] border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#c24128] flex items-center justify-center text-white relative shadow-sm">
                <Bot className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 border border-[#121318]"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  GastroBot <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#c24128]/20 text-[#f26a4f] rounded border border-[#c24128]/30">AI Pro</span>
                </h4>
                <p className="text-[11px] text-neutral-400 font-mono">Restoran, Reçete & Fire Uzmanı</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:inline-flex p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                title={isExpanded ? 'Küçült' : 'Genişlet'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setMessages(initialMessages)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Sohbeti Sıfırla"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Category Selector Bar */}
          <div className="px-3 py-2 bg-[#13141a] border-b border-neutral-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar touch-pan-x">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-[#c24128] text-white shadow-sm'
                      : 'bg-[#1b1d25] hover:bg-[#232631] text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Contextual Quick Suggestions */}
          <div className="px-3 py-1.5 bg-[#14151c]/90 border-b border-neutral-800/50 flex items-center gap-1.5 overflow-x-auto no-scrollbar touch-pan-x">
            {(quickTopicPrompts[activeCategory] || quickTopicPrompts.all).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2 py-0.5 bg-[#1c1f28] hover:bg-[#262936] text-[10px] text-neutral-300 hover:text-white rounded-md border border-neutral-700/60 whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#14151b] text-xs">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[92%] sm:max-w-[85%] p-3.5 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-[#c24128] text-white rounded-br-xs shadow-md'
                      : 'bg-[#1e212b] text-neutral-200 rounded-bl-xs border border-neutral-800/90 shadow-sm'
                  }`}
                >
                  {renderFormattedText(msg.text)}

                  {/* If message generated a live calculation widget, render mini stat pill */}
                  {msg.calculationData && (
                    <div className="mt-3 pt-3 border-t border-neutral-700/60 grid grid-cols-2 gap-2 text-[11px] font-mono">
                      <div className="bg-[#121318] p-2 rounded-lg border border-neutral-800">
                        <span className="text-neutral-400 block text-[9px] uppercase">Aylık Kurtarılan</span>
                        <span className="text-[#f26a4f] font-bold">
                          {msg.calculationData.savedMonthly.toLocaleString('tr-TR')} ₺
                        </span>
                      </div>
                      <div className="bg-[#121318] p-2 rounded-lg border border-neutral-800">
                        <span className="text-neutral-400 block text-[9px] uppercase">Yıllık Ekstra Kâr</span>
                        <span className="text-emerald-400 font-bold">
                          {msg.calculationData.savedAnnual.toLocaleString('tr-TR')} ₺
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Follow-up question suggestion chips */}
                {msg.followUps && msg.followUps.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[92%] sm:max-w-[85%]">
                    {msg.followUps.map((fu, fIdx) => (
                      <button
                        key={fIdx}
                        onClick={() => handleSend(fu)}
                        className="px-2.5 py-1 bg-[#1a1d26] hover:bg-[#242835] text-[10.5px] text-neutral-300 hover:text-white rounded-lg border border-neutral-700/60 transition-colors cursor-pointer text-left"
                      >
                        ↳ {fu}
                      </button>
                    ))}
                  </div>
                )}

                {/* Action button if provided */}
                {msg.suggestedAction && (
                  <button
                    onClick={msg.suggestedAction.action}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#252835] hover:bg-[#2f3446] border border-[#c24128]/40 text-[#f26a4f] rounded-lg text-[11px] font-semibold transition-colors cursor-pointer self-start shadow-sm"
                  >
                    <span>{msg.suggestedAction.label}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                {/* Message Footer: Timestamp, Copy & Feedback */}
                <div className="flex items-center gap-2 mt-1 px-1">
                  <span className="text-[9px] text-neutral-500 font-mono">
                    {msg.time}
                  </span>

                  {msg.sender === 'bot' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => copyToClipboard(msg.id, msg.text)}
                        className="p-1 text-neutral-500 hover:text-neutral-300 rounded transition-colors cursor-pointer"
                        title="Metni Kopyala"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-2.5 h-2.5" />
                        )}
                      </button>
                      <button
                        onClick={() => toggleLike(msg.id)}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          likedIds[msg.id] ? 'text-[#f26a4f]' : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                        title="Faydalı Buldum"
                      >
                        <ThumbsUp className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 bg-[#1e212b] text-neutral-400 rounded-2xl rounded-bl-xs w-20 border border-neutral-800">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f26a4f] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f26a4f] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#f26a4f] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#121318] border-t border-neutral-800 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Sorunuzu yazın veya bütçenizi girin (Örn: 400 bin bütçe)..."
              className="flex-1 px-3 py-2 bg-[#181a22] border border-neutral-700/80 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 bg-[#c24128] hover:bg-[#aa3620] disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer shrink-0"
              aria-label="Gönder"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
