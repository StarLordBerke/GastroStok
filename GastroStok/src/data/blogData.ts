import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Mutfakta Gramaj Kaçaklarını Önlemenin 5 Altın Kuralı',
    slug: 'mutfakta-gramaj-kacaklarini-onleme-yollari',
    category: 'Mutfak Yönetimi',
    readTime: '4 dk okuma',
    date: '22 Ekim 2026',
    image: '/assets/images/blog_chef_portioning_1792911350428.jpg',
    summary: 'Şeflerin reçete standartlarını koruyarak servis sırasındaki porsiyon sapmalarını sıfırlama rehberi.',
    content: [
      'Restoran mutfaklarında en yüksek maliyet sızıntıları genellikle açıkça görünen büyük bozulmalardan değil, tabak başına 15-20 gramlık fark edilmeyen aşırı porsiyonlamadan kaynaklanır. Günde 200 porsiyon et veya deniz ürünü servis eden bir alakart restoranda bu küçük sapma, ayda 90 ila 120 kilogramlık hammadde kaybına denk gelir.',
      '1. Dijital Hassas Terazi Kültürü: Mise en place (ön hazırlık) istasyonlarında göz kararı porsiyonlama kesinlikle yasaklanmalıdır. Önceden tartılıp vakumlanan veya porsiyon kutularına konan malzemeler, yoğun servis anında aşçıların tereddüt etmesini engeller.',
      '2. Standart Porsiyon Kepçeleri ve Kalıpları: Soslar, püreler ve garnitürler için hacmi mililitre cinsinden sabitlenmiş silikon spatulalar veya dereceli kepçeler kullanılmalıdır.',
      '3. Reçete Kartlarının Görselleştirilmesi: Hazırlık tezgahının üzerine asılan veya mutfak tabletinde gösterilen adım adım reçete fotoğrafları, ekibe yeni katılan aşçıların bile aynı tabak standartlarını yakalamasını sağlar.',
      '4. Günlük Tüketim ile Adisyon Karşılaştırması: Servis sonunda POS sisteminden kesilen biftek adedi ile depodan çıkan biftek adedi anlık olarak karşılaştırılmalı; tutarsızlık varsa ertesi güne bırakılmadan nedeni belirlenmelidir.'
    ],
    keyTakeaways: [
      'Porsiyon başına 15 gramlık sapma ayda yüzlerce kilogram et kaybı demektir.',
      'Vakumlu ön porsiyonlama yoğun saatlerde şef stresini ve kaçakları sıfırlar.',
      'Adisyon satış adedi ile hammadde düşümü her vardiya sonunda çapraz kontrol edilmelidir.'
    ],
    author: {
      name: 'Şef Murat Dağdeviren',
      role: 'Gastronomi Direktörü'
    }
  },
  {
    id: 'blog-2',
    title: 'Kafelerde Süt ve Kahve Çekirdeği İsrafı Nasıl Engellenir?',
    slug: 'kafelerde-sut-ve-kahve-cekirdegi-israfi-nasil-engellenir',
    category: 'Kafe & Barista',
    readTime: '5 dk okuma',
    date: '19 Ekim 2026',
    image: '/assets/images/blog_barista_milk_1792932276627.jpg',
    summary: 'Günlük taze süt rotasyonu ve buharlama artıklarını minimize eden barista envanter stratejileri.',
    content: [
      'Üçüncü nesil kahvecilerde ve kafelerde en büyük iki değişken gider süt ve nitelikli espresso çekirdeğidir. Özellikle bitkisel sütlerin (yulaf, badem, soya) artan maliyeti ve sınırlı raf ömrü, barista tarafında sıkı bir takip gerektirir.',
      'Süt İsrafının 1 Numaralı Sebebi: Yanlış Pitcher Seçimi: Çoğu barista 12 oz (350ml) bir latte için 600ml\'lik pitcher doldurarak artan sütü lavaboya döker. İçecek reçetesine tam oturan boyutta pitcher kullanımı haftalık süt tüketiminde doğrudan %18 tasarruf sağlar.',
      'Değirmen Kalibrasyonunda Çekirdek İsrafı: Sabahları yapılan espresso kalibrasyonunda (dial-in) harcanan gramajlar kayıt altına alınmalıdır. Çok sık aralıklarla gereksiz ayar değiştirmek yerine dijital mikron ölçekli öğütücüler tercih edilmelidir.',
      'Bitkisel Sütlerin Açılış Tarihi Etiketlemesi: Açılan badem ve yulaf sütü kutularının üzerine günün tarihi yazılmalı, 48 saati aşan ürünler bozulmadan önce soğuk kahve hazırlıklarında tüketilmelidir.'
    ],
    keyTakeaways: [
      'İçecek boyuna uygun süt potu (pitcher) seçimi günlük litrelerce sütün dökülmesini önler.',
      'Açılan alternatif süt kutularının saatlik ve günlük etiketlenmesi şarttır.',
      'Espresso kalibrasyon fireleri barista vardiya raporunda bağımsız bir kalem olarak tutulmalıdır.'
    ],
    author: {
      name: 'Zeynep Akın',
      role: 'Nitelikli Kahve Danışmanı'
    }
  },
  {
    id: 'blog-3',
    title: 'Soğuk Depo ve Walk-In Düzeniyle Raf Ömrünü Uzatma Taktikleri',
    slug: 'soguk-depo-ve-walk-in-duzeniyle-raf-omrunu-uzatma',
    category: 'Depo & Lojistik',
    readTime: '6 dk okuma',
    date: '15 Ekim 2026',
    image: '/assets/images/blog_fresh_produce_crates_1792911351214.jpg',
    summary: 'FIFO kuralı, doğru etiketleme ve sıcaklık takibiyle hammadde raf ömrünü %30 uzatma rehberi.',
    content: [
      'Gıda zehirlenmelerini önlemenin ve çöpe giden taze sebze-meyveyi kurtarmanın anahtarı soğuk hava deposunun mimarisinde yatar. Yanlış yerleştirilen bir kasa çilek veya roka, yanındaki elmanın yaydığı etilen gazı yüzünden 24 saat içinde çürüyebilir.',
      '1. FIFO (First-In, First-Out) Prensibi: Yeni gelen mal daima arkaya, eski parti ise en öne konulmalıdır. Bu kuralın uygulanması için rafların her iki taraftan da erişilebilir olması veya döner ray sistemleri kullanılması tavsiye edilir.',
      '2. Sıcaklık Kademelendirmesi: Soğuk hava depolarında zemin ve tavan arasında 2 ila 3 derecelik sıcaklık farkı oluşabilir. Çiğ kümes hayvanları daima en alt rafta (-1°C ile +2°C arasında) saklanmalı, çapraz bulaşma riski önlenmelidir.',
      '3. Etilen Üreten ve Etilene Duyarlı Ürünleri Ayırma: Domates, elma ve muz gibi ürünler yüksek oranda etilen gazı salgılar. Bu ürünleri taze yeşillik ve marulların hemen yanına koymak yeşilliklerin hızla sararmasına sebep olur.'
    ],
    keyTakeaways: [
      'İlk giren ilk çıkar (FIFO) prensibi mutfak raf ömrünün en kritik koruyucusudur.',
      'Etilen gazı yayan meyveleri taze yeşilliklerden ayrı bölmede tutun.',
      'Soğuk hava deposu kapı fitilleri ve dijital ısı sensörleri haftalık denetlenmelidir.'
    ],
    author: {
      name: 'Bülent Karaca',
      role: 'Gıda Mühendisi & Depo Baş Denetçisi'
    }
  },
  {
    id: 'blog-4',
    title: 'Yapay Zeka ile Adisyon Analizi: Hafta Sonu Ne Kadar Et Alınmalı?',
    slug: 'yapay-zeka-ile-adisyon-analizi-ve-talep-tahmini',
    category: 'Veri & AI',
    readTime: '7 dk okuma',
    date: '11 Ekim 2026',
    image: '/assets/images/gastrostok_kitchen_prep_1792910840616.jpg',
    summary: 'Yağmurlu bir cuma akşamıyla güneşli bir pazar günü arasındaki tüketim farkını matematiksel olarak tahmin etme.',
    content: [
      'Çoğu şef haftalık sipariş verirken "Geçen hafta cumartesi çok yoğunduk, bu hafta da aynı miktarda bonfile alalım" varsayımıyla hareket eder. Ancak havanın yağmurlu olması, o hafta sonu yakınlarda oynanan bir futbol maçı veya okulların tatil edilmesi sipariş hacmini %30 değiştirebilir.',
      'GastroStok\'un makine öğrenimi modeli, işletmenizin yalnızca geçmiş satış adetlerine bakmaz. Adisyon kayıtlarını yerel hava durumu verileri, takvimdeki resmi bayramlar ve civardaki etkinliklerle çaprazlayarak saatlik müşteri yoğunluğu tahmini üretir.',
      'Bu sayede mutfak ekibi hem cuma akşamı servisi ortasında "et bitti" paniği yaşamaz hem de pazartesi sabahı çöpe atılacak yüzlerce gramlık marine edilmiş protein stokuyla karşılaşmaz.'
    ],
    keyTakeaways: [
      'Sadece geçmiş satışa bakmak yanıltıcıdır; hava durumu ve lokasyon etkinlikleri kritik girdilerdir.',
      'Tahmin modelleri güvenlik stoğu tamponunu dinamik tutarak nakit bağlamayı önler.',
      'Tahmin doğruluğu arttıkça acil son dakika toptancı aramaları sıfırlanır.'
    ],
    author: {
      name: 'Dr. Emre Güven',
      role: 'Büyük Veri & Algoritma Mimarı'
    }
  },
  {
    id: 'blog-5',
    title: 'Menü Mühendisliği: Hangi Tabak Gerçekten Para Kazandırıyor?',
    slug: 'menu-muhendisligi-karlilik-analizi',
    category: 'Maliyet & Kârlılık',
    readTime: '5 dk okuma',
    date: '07 Ekim 2026',
    image: '/assets/images/blog_menu_steak_1792932290331.jpg',
    summary: 'Yüksek hammadde maliyetli popüler tabaklar ile gerçekte en yüksek marjı bırakan gizli yıldızların analizi.',
    content: [
      'Menü mühendisliğinde yemekler dört ana kategoriye ayrılır: Yıldızlar (Yüksek kâr, yüksek popülerlik), Çalışkan Atlar (Düşük kâr, yüksek popülerlik), Bulmacalar (Yüksek kâr, düşük popülerlik) ve Köpekler (Düşük kâr, düşük popülerlik).',
      'Birçok restoranda "Çalışkan Atlar" menünün en çok satılanı gibi görünse de hammadde fiyatlarındaki ani artışlar nedeniyle restoranın kârını eritir. Örneğin ızgara bonfile çok satılabilir; fakat etin toptan alış fiyatı %25 arttığında menü fiyatı güncellenmezse mutfak her tabakta zararına çalışabilir.',
      'GastroStok reçete modülü, toptancı faturalarınızdaki birim fiyat değişimini anında algılayarak hangi yemeğin marjının kritik seviyenin altına düştüğünü işletmeciye kırmızı uyarıyla bildirir.'
    ],
    keyTakeaways: [
      'En çok satan yemek en kârlı yemek demek değildir.',
      'Hammadde girdi fiyatları değiştikçe tabak marjı dinamik güncellenmelidir.',
      'Düşük popülerlik ve yüksek marjlı tabaklar garson önerileriyle öne çıkarılmalıdır.'
    ],
    author: {
      name: 'Şef Murat Dağdeviren',
      role: 'Gastronomi Direktörü'
    }
  },
  {
    id: 'blog-6',
    title: 'Hal ve Toptancılarla Dijital Sipariş Disiplini Oluşturma',
    slug: 'hal-ve-toptancilarla-dijital-siparis-disiplini',
    category: 'Tedarik Zinciri',
    readTime: '4 dk okuma',
    date: '02 Ekim 2026',
    image: '/assets/images/blog_wholesale_delivery_1792932309383.jpg',
    summary: 'Gece yarısı atılan düzensiz ses kayıtları yerine standartlaştırılmış sipariş formatıyla fatura hatalarını önleme.',
    content: [
      'Restoranlarda satın alma süreçlerinin en kaotik noktası gece yarısı kapanıştan sonra halciye veya kasaba gönderilen WhatsApp ses kayıtları ve eksik mesajlardır. "Bize yarın taze roka ve 2 koli domates yolla" mesajı geldiğinde, toptancının hangi kalitede ve hangi boyutta domates göndereceği tamamen tesadüfe kalır.',
      'Standartlaştırılmış Dijital Sepet Formatı: Siparişlerde ürün kodu, istenen net kilogram veya koli adedi, kabul edilebilir alternatif ürün bilgisi ve teslimat saati açıkça belirtilmelidir.',
      'Teslim Alma Aşamasında İrsaliye Kontrolü: Sabah teslimat kapısına gelen ürünler tartılmadan ve sıcaklık kontrolü yapılmadan asla depoya kabul edilmemelidir. Dijital tedarik formu ile gelen irsaliye anında eşleştirildiğinde, eksik veya hatalı ürünler için aynı gün iade faturası kesilebilir.'
    ],
    keyTakeaways: [
      'WhatsApp ses kaydıyla sipariş vermek fatura ve miktar ihtilaflarının ana kaynağıdır.',
      'Teslim alma rampasında dijital tartım yapılmadan ürün kabul edilmemelidir.',
      'Sipariş sepeti ile fatura kalemleri otomatik karşılaştırılmalıdır.'
    ],
    author: {
      name: 'Bülent Karaca',
      role: 'Gıda Mühendisi & Depo Baş Denetçisi'
    }
  },
  {
    id: 'blog-7',
    title: 'Gıda Atıklarını Sıfırlayan 7 İleri Mutfak Pratiği',
    slug: 'gida-atiklarini-sifirlayan-ileri-mutfak-pratikleri',
    category: 'Mutfak Yönetimi',
    readTime: '5 dk okuma',
    date: '28 Eylül 2026',
    image: '/assets/images/blog_zero_waste_broth_1792932326023.jpg',
    summary: 'Sebze saplarından konsome yapımına, bayatlayan ekmeklerden pane harcına kadar mutfakta sıfır atık felsefesi.',
    content: [
      'Sıfır atık mutfak, sadece çevreci bir yaklaşım değil; işletmelerin net brüt kâr marjını 3 ila 5 puan yukarı çeken stratejik bir operasyonel disiplindir.',
      '1. Sebze Artıklarından Stok ve Konsome Üretimi: Havuç kabukları, kereviz sapları, soğan kabukları ve maydanoz kökleri gün boyu özel kaplarda toplanmalı ve derin lezzetli sebze suyu (fond/stock) üretiminde değerlendirilmelidir.',
      '2. Artan Ekmeklerin Katma Değerli Dönüşümü: Kalan baget ve ekşi mayalı ekmekler kurutulup aromatik kruton, panko ekmek kırıntısı veya geleneksel tirit tabanına dönüştürülebilir.',
      '3. Yağ ve Kemiklerin Değerlendirilmesi: Et istasyonunda ayrılan kemikler fırınlanıp demi-glace sos yapılırken, don yağları eritilip confit pişirme tekniğinde kullanılabilir.'
    ],
    keyTakeaways: [
      'Gıda artıklarının ayrıştırılması doğrudan sos ve taban maliyetlerini sıfırlar.',
      'Her mutfak istasyonunda özel atık ve trim kutuları bulundurulmalıdır.',
      'Şef ekibine artık malzemeleri katma değerli ürünlere dönüştürme eğitimi verilmelidir.'
    ],
    author: {
      name: 'Şef Murat Dağdeviren',
      role: 'Gastronomi Direktörü'
    }
  },
  {
    id: 'blog-8',
    title: 'Restoranlarda Dinamik Fiyatlandırma ve Maliyet Endeksi',
    slug: 'restoranlarda-dinamik-fiyatlandirma-ve-maliyet-endeksi',
    category: 'Maliyet & Kârlılık',
    readTime: '6 dk okuma',
    date: '24 Eylül 2026',
    image: '/assets/images/blog_dynamic_pricing_1792932341061.jpg',
    summary: 'Enflasyonist dönemde menü fiyatlarını misafir sadakatini zedelemeden girdi maliyetleriyle eş zamanlı yönetme formülü.',
    content: [
      'Restoran işletmecilerinin en çok zorlandığı konulardan biri hammadde fiyatlarındaki aylık artışları menüye yansıtırken doğru zamanlamayı tutturmaktır. Menü fiyatlarını 6 ay boyunca sabit tutup aniden %40 zam yapmak misafir kaybına yol açar.',
      'Tedarikçi Bazlı Eşik Oranı Belirleme: Ana maliyet kaleminiz olan süt, un veya ette %15\'i aşan artış gerçekleştiğinde, reçete motorunun menü fiyat revizyon önerisi sunması gerekir.',
      'Porsiyon Optimizasyonu Alternatifi: Fiyatı doğrudan artırmak yerine yan garnitürü zenginleştirmek veya tabak kompozisyonunu modernize etmek algılanan değeri korurken maliyeti dengeler.'
    ],
    keyTakeaways: [
      'Ani büyük zamlar yerine küçük dönemsel dengelemeler misafir sadakatini korur.',
      'Hammadde fiyat endeksi anlık takip edilerek porsiyon marjları korunmalıdır.',
      'Maliyet artışı yaşayan spesiyaller yerine yüksek marjlı alternatif tabaklar öne çıkarılmalıdır.'
    ],
    author: {
      name: 'Dr. Emre Güven',
      role: 'Büyük Veri & Algoritma Mimarı'
    }
  },
  {
    id: 'blog-9',
    title: 'Kahve Barlarında Su Arıtma ve Buz Firelerinin Gizli Maliyeti',
    slug: 'kahve-barlarinda-su-aritma-ve-buz-firelerinin-maliyeti',
    category: 'Kafe & Barista',
    readTime: '4 dk okuma',
    date: '20 Eylül 2026',
    image: '/assets/images/blog_cafe_water_ice_1792932359969.jpg',
    summary: 'Su arıtma filtreleri, buz makinesi verimi ve espresso ekstraksiyonunda gözden kaçan enerji ve su maliyetleri.',
    content: [
      'Bir fincan espressonun %90\'ı, bir fincan filtrenin ise %98.5\'i sudur. Yanlış TDS (Toplam Çözünmüş Katı Madde) değerine sahip su, sadece kahvenin tadını bozmakla kalmaz; espresso makinesinin boiler kazanında kireçlenme yaparak arızalara neden olur.',
      'Buz Makinesi Temizliği ve Erime Fireleri: Yaz aylarında soğuk kahve tüketimi tavan yaptığında buz makinelerinin filtreleri tıkanırsa buz kalitesi düşer ve içecek içinde çok hızlı eriyerek sulanmaya yol açar.',
      'Filtre Kartuş Değişim Takvimi: Sayaçlı filtre başlıkları kullanarak kaç metreküp su arıtıldığını takip etmek, gereksiz kartuş değişimini önlerken makine ömrünü uzatır.'
    ],
    keyTakeaways: [
      'Doğru su mineral dengesi hem kahve lezzetini hem makine servis maliyetlerini korur.',
      'Hızlı eriyen düşük yoğunluklu buzlar soğuk içecek kalitesini bozar.',
      'Arıtma filtre kartuşları litre bazlı debimetreyle takip edilmelidir.'
    ],
    author: {
      name: 'Zeynep Akın',
      role: 'Nitelikli Kahve Danışmanı'
    }
  },
  {
    id: 'blog-10',
    title: 'Çok Şubeli Restoranlarda Merkezi Mutfak (Commisary) Modeli',
    slug: 'cok-subeli-restoranlarda-merkezi-mutfak-modeli',
    category: 'Tedarik Zinciri',
    readTime: '8 dk okuma',
    date: '16 Eylül 2026',
    image: '/assets/images/blog_commissary_kitchen_1792932379385.jpg',
    summary: 'Sos, marinasyon ve hamur işlerini merkezde üretip şubelere dağıtarak şube başı fireyi %40 azaltma rehberi.',
    content: [
      '3 ve daha fazla şubeye ulaşan işletmelerde her şubenin kendi sosunu kaynatması, kendi etini marine etmesi ve hamur açması hem aşırı mutfak personeli maliyeti yaratır hem de lezzet standardizasyonunu bozar.',
      'Merkezi Üretimin Fire Avantajı: Tek bir merkez mutfakta büyük kazanlarla yapılan üretimde sebze kabukları ve kemik artıkları tek noktada toplanarak konsantre değerlendirilir.',
      'Soğuk Zincir Dağıtım Frekansı: Şubelere her sabah vakumlu ve barkodlu porsiyonlar halinde gönderilen ürünler sayesinde şube mutfağında aşçı ihtiyacı azalır, servis hızı iki katına çıkar.'
    ],
    keyTakeaways: [
      'Merkezi mutfak şubeler arası lezzet ve porsiyon farklılıklarını tamamen yok eder.',
      'Toplu satın alma gücü toptancılarda %20\'ye varan iskonto avantajı sağlar.',
      'Şubelerdeki çöp tenekesi hacmi ve plansız bozulma oranı yarı yarıya düşer.'
    ],
    author: {
      name: 'Bülent Karaca',
      role: 'Gıda Mühendisi & Depo Baş Denetçisi'
    }
  },
  {
    id: 'blog-11',
    title: 'Makine Öğrenimi ile Hava Durumu ve Rezervasyon Korelasyonu',
    slug: 'makine-ogrenimi-ile-hava-durumu-ve-rezervasyon-tahmini',
    category: 'Veri & AI',
    readTime: '5 dk okuma',
    date: '12 Eylül 2026',
    image: '/assets/images/blog_weather_restaurant_1792932394901.jpg',
    summary: 'Yağış, sıcaklık ve rüzgar tahminlerinin açık alan doluluk oranlarına ve taze hammadde tüketimine etkisi.',
    content: [
      'Boğaz hattında veya bahçeli bir restoranda 100 masalık kapasite varsa ve hafta sonu yağmur bekleniyorsa, bahçe masalarının kapanmasıyla kapasite birden 40 masaya düşebilir. Bu durumu göz ardı edip normal haftalık et ve balık siparişi vermek büyük bir finansal kayıptır.',
      'GastroStok Hava Durumu Algoritması: Meteoroloji servislerinden alınan 5 günlük saatlik yağış ve sıcaklık verilerini şubenin kapalı/açık masa oranıyla eşleştirir.',
      'Son Dakika İptal Riski: Yağışlı havalarda alakart masa iptalleri artarken paket servis adisyonları %35\'e varan oranda yükselir. Algoritma hammadde hazırlığını paket servise uygun menü kalemlerine kaydırır.'
    ],
    keyTakeaways: [
      'Açık alanı olan işletmelerde hava durumu mutfak hazırlıklarının 1 numaralı belirleyicisidir.',
      'Yağmurlu günlerde paket servis kalemlerinin hazırlığı artırılmalıdır.',
      'Meteorolojik tahminler doğrudan sipariş öneri sepetine emniyet katsayısı olarak yansıtılır.'
    ],
    author: {
      name: 'Dr. Emre Güven',
      role: 'Büyük Veri & Algoritma Mimarı'
    }
  }
];
