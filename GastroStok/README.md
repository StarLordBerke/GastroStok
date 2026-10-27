<div align="center">

# 🍽️ GASTROSTOK (v2.4)
### Yeni Nesil Restoran Mutfak Fire & Stok Yönetimi, Reçete Maliyetlendirme ve AI Destekli Talep Tahmini Platformu

[![React](https://img.shields.io/badge/React-19.0.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge)](LICENSE)

<br />

**"Mutfaktaki fireyi durdurun. Yapay zeka ile stoklarınızı yönetin, kârlılığınızı artırın."**

[📖 Proje Hakkında](#-proje-hakkında-about-gastrostok) • [🌐 Canlı Sürüm & Demo](#-canlı-demo--canlıya-alınmış-sürüm-live-deployment) • [⚙️ Teknik Mimari](#-teknik-detaylar-ve-mimari-technical-architecture) • [✨ Modüller](#-özellikler-ve-modüller) • [🚀 Kurulum](#-kurulum-ve-yerel-çalıştırma-getting-started) • [☁️ Dağıtım](#-canlıya-alma-rehberi-deployment)

</div>

---

## 📖 Proje Hakkında (About GastroStok)

### 📌 GastroStok Nedir?
**GastroStok**, restoranlar, kafeler, pastaneler, oteller ve çok şubeli zincir yeme-içme işletmelerinin en büyük kâr deliği olan **gıda israfı, porsiyon sapmaları ve kontrolsüz hammadde alımlarını** engellemek için geliştirilmiş bulut tabanlı bir mutfak yönetim platformudur.

Geleneksel restoran yönetiminde mutfak şefleri siparişleri tahminlere göre verir, servis esnasında tabaklara göz kararı porsiyon konur ve gün sonunda POS kasasında kesilen adisyonlar ile depodan çıkan hammadde nadiren eşleşir. Bu plansızlık, tipik bir restoranda yıllık hammadde bütçesinin **%8 ila %15'inin doğrudan çöpe gitmesine** yol açar.

**GastroStok**, satış noktası (POS) verilerini, geçmiş tüketim istatistiklerini, hava durumu tahminlerini ve dinamik dijital reçeteleri bir araya getirerek mutfağın ihtiyaç duyduğu hammaddeyi gün gün, gram gram hesaplar; aşırı satın alımları, bayatlamayı ve porsiyon firelerini sıfıra indirir.

---

### 🎯 Projenin Çözdüğü Temel Sektörel Sorunlar

1. **Göz Kararı Porsiyonlama ve Gramaj Kaçakları:**
   * *Problem:* Tabak başına fazladan konulan 15-20 gramlık et veya sos, ayda yüzlerce kilogramlık görünmez maliyet yaratır.
   * *Çözüm:* Dijital terazi standartları, görselleştirilmiş reçete kartları ve porsiyon başına anlık gramaj düşümü.
2. **Kritik Stok ve SKT Kayıpları:**
   * *Problem:* Özellikle taze süt, krema, deniz ürünleri ve yeşilliklerin soğuk hava deposunda unutularak bozulması.
   * *Çözüm:* FIFO (İlk Giren İlk Çıkar) takibi, raf ömrü alarm sistemi ve kritik seviye bildirimleri.
3. **Kaotik Tedarik ve Gece Yarısı Siparişleri:**
   * *Problem:* Gece kapanışta toptancıya veya halciye atılan düzensiz WhatsApp ses kayıtları nedeniyle yanlış ve eksik gelen ürünler.
   * *Çözüm:* Tek tıkla oluşturulan standart satın alma sepetleri ve dijital irsaliye entegrasyonu.
4. **Hava Durumu ve Dalgalanan Misafir Sayısı:**
   * *Problem:* Yağışlı bir cuma günü açık terasın kapanmasıyla elde kalan taze malzemeler.
   * *Çözüm:* AI tahmin motoru ile yerel hava durumu ve rezervasyon verilerini eşleştirerek dinamik sipariş listesi çıkarma.

---

### 👥 Projenin Günlük Operasyondaki Rolü (Kullanıcı Gözüyle Normal Anlatım)

* **Sabah Hazırlığı (Mise en Place):** Şef mutfağa geldiğinde GastroStok tabletini açar. Sistem, o günkü beklenen rezervasyonlara göre hangi sostan kaç litre, hangi etten kaç gram marine edilmesi gerektiğini listeler. Sayım 3 dakikada tamamlanır.
* **Yoğun Servis Anı:** Garson POS sisteminden (SambaPOS, Simpra vb.) bir "Izgara Bonfile & Trüflü Püre" siparişi girdiğinde, arka planda otomatik olarak 220 gr dana bonfile, 150 gr patates ve 15 ml krema depodan eksiltilir.
* **Akşam Kapanışı:** Yönetici, gün boyunca satılan yemekler ile depodan eksilen fiziksel gramajları karşılaştırır; bir sapma varsa nedenini aynı akşam tespit eder.
* **Haftalık Satın Alma:** AI motoru, hafta sonu hava durumunu ve toptancı fiyat artışlarını analiz ederek şefe en ekonomik tedarik sepetini sunar.

---

## ⚙️ Teknik Detaylar ve Mimari (Technical Architecture)

GastroStok, kurumsal ölçekte hız, sıfır sayfa yenileme süresi ve tam tip güvenliği sağlamak üzere modern bir frontend-first reaktif mimariyle inşa edilmiştir:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                                GASTROSTOK MİMARİSİ                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  [ React 19 SPA ] ──> [ Tailwind CSS v4 ] ──> [ Lucide Icons / Motion ]     │
│         │                                                                   │
│         ├──> State Katmanı (Reactive LocalStorage + Live Contexts)           │
│         ├──> Statik Varlık Dağıtımı (/public/assets/images/ & Failover)      │
│         ├──> Sayfa Router'ı (Vitrin, CMS, CRM, Yorumlar, Üye Portalı)        │
│         └──> Çift Yönlü POS & API Arayüz Sözleşmeleri (TypeScript Tipleri)   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1. ⚛️ Modern Frontend ve Tip Güvenliği
* **React 19 & TypeScript:** En son React 19 fonksiyonel bileşen mimarisi, saf hooks (`useState`, `useEffect`, `useRef`, `useCallback`) ve katı TypeScript sözleşmeleri. Hiçbir yerde `any` tipi kullanılmamış; tüm veri modelleri (`BlogPost`, `ReviewItem`, `LeadItem`, `UserAccount`, `VenueItem`) bağımsız bir tip katmanında (`src/types/index.ts`) doğrulanmıştır.
* **Vite 8 & Rolldown Derleme Motoru:** Sıfır gecikmeli HMR (Hot Module Replacement) ve mikro-saniyeler içinde ağaç sallama (tree-shaking) özellikli üretim derlemesi (`dist`).

### 2. 🎨 Tailwind CSS v4 Tasarım Sistemi
* **Zero-Runtime CSS:** Yeni nesil `@import "tailwindcss";` motoru ile fazladan yapılandırma dosyasına gerek kalmadan derleme anında optimize edilen ultra hafif CSS çıktısı.
* **Gastronomi Renk Paleti:** Derin kömür arka planı (`#111215`, `#161820`), sıcak mutfak kırmızısı (`#c24128`), alev tonları (`#f26a4f`) ve doğrulanmış durum yeşilleri (`#10b981`).
* **Akıcı Tipografi & Duyarlı Izgara:** Mobil (360px+), tablet (768px+), laptop (1024px+) ve geniş ekranlarda kusursuz çalışan `grid` ve `flexbox` düzenleri.

### 3. 🖼️ Üretim Ortamı Statik Görsel Dağıtımı (Production Asset Architecture)
* **Vite Canlı Derleme Çözümü:** Vite projelerinde `src/assets/images/...` altındaki resimler doğrudan URL olarak çağrıldığında `npm run build` sonrası 404 hatası verir. GastroStok'ta tüm görseller `/public/assets/images/` dizinine yerleştirilmiştir.
* **Derleme Garantisi:** `npm run build` esnasında tüm 18 yüksek çözünürlüklü görsel otomatik olarak `dist/assets/images/` dizinine 1:1 kopyalanır.
* **Göreceli Yol ve Subpath Desteği (`base: './'`):** `vite.config.ts` içinde `base: './'` tanımlanmış olup, `src/utils/assets.ts` içindeki `getAssetUrl()` fonksiyonu sayesinde site GitHub Pages (`https://kullanici.github.io/proje-adi/`) gibi alt klasörlerde veya Vercel/Netlify gibi kök alan adlarında çalışsa dahi tüm resimler doğru yolla yüklenir.
* **Çok Katmanlı Hata Toleransı (`handleImageFallback`):** 
  * Tarayıcı bileşenlerinde bir resim yüklenemezse anında göreceli (`./assets/...`), kök (`/assets/...`) ve doğrudan dosya adı alternatiflerini deneyen dinamik `handleImageFallback` mekanizması devreye girer.
  * Şef profillerinde veya blog kartlarında hiçbir kırık görsel ikonu görünmez; zarif baş harf ve degrade avatarları devreye girer.

### 4. 💾 Çift Yönlü Kalıcı Veri Yönetimi (State & LocalStorage)
* Veritabanı kurulumu gerektirmeksizin tüm kullanıcı eylemleri, yeni eklenen blog yazıları, CRM restoran başvuruları ve şef yorumları `localStorage` katmanında reaktif olarak saklanır:
  * `gastrostok_customer_reviews`: Müşteri yorumları ve şef profilleri.
  * `gastrostok_crm_leads`: Restoran başvuruları ve şef görüşme notları.
  * `gastrostok_user_session`: Üye restoran oturumu ve mutfak paneli.
* Yönetici panelinde yapılan bir güncelleme anında anasayfadaki ilgili bölüme (örneğin müşteri yorumlarına) canlı olarak yansır.

---

## 🌐 Canlı Demo & Canlıya Alınmış Sürüm (Live Deployment)

Projenin canlı ortamda çalışan tam fonksiyonel sürümüne aşağıdaki bağlantılardan anında erişebilirsiniz:

| Dağıtım Türü | Bağlantı URL | Açıklama & Durum |
| :--- | :--- | :--- |
| 🚀 **Canlı Web Sitesi (Production)** | **[GastroStok Canlı Sürümü Aç](https://ais-pre-s6jvgezec24ukfpq3e5k3s-524291745461.europe-west3.run.app)** | 🟢 **Aktif & Yayında** (Tüm görseller, hesaplayıcılar ve paneller tam çalışır) |
| 🧪 **Önizleme & Test Ortamı (Staging)** | **[Canlı Önizleme Bağlantısı](https://ais-pre-s6jvgezec24ukfpq3e5k3s-524291745461.europe-west3.run.app)** | 🟢 **Yayında** |
| 💻 **Geliştirici Canlı Konsolu (Dev)** | **[Geliştirici Sürümü](https://ais-dev-s6jvgezec24ukfpq3e5k3s-524291745461.europe-west3.run.app)** | 🟡 **Geliştirme Ortamı** |
| 🌍 **Özel Alan Adı (Custom Domain)** | `https://gastrostok.app` *(Kendi canlı domaininizi buraya yazabilirsiniz)* | 🔄 Yönlendirilebilir |

---

### 🔑 Canlı Test & Demo Giriş Hesapları

Canlı sitede tüm yönetim ve üyelik özelliklerini şifre oluşturma zahmeti olmadan deneyimleyebilmeniz için **tek tıkla Hızlı Giriş** butonları ve hazır kimlik bilgileri tanımlanmıştır:

#### 1. 👑 Yönetici Portalı (Süper Admin / CMS & CRM)
* **Erişim:** Sağ üstteki **"Giriş Portalları"** menüsü → **"Yönetici Girişi"**
* **E-posta:** `admin@gastrostok.com`
* **Şifre:** `admin123`
* *(Ayrıca giriş penceresindeki **"Hızlı Yönetici Girişi"** butonuna basarak anında panele geçebilirsiniz)*

#### 2. 👨‍🍳 Restoran & Şef Kontrol Paneli (Üye Portalı)
* **Erişim:** Sağ üstteki **"Giriş Portalları"** menüsü → **"Kullanıcı Girişi / Üyelik"**
* **E-posta:** `demo@bistrogalata.com`
* **Şifre:** `demo123`
* *(Ayrıca giriş penceresindeki **"Demo Hesapla Başla"** butonu ile tek tıkla mutfak paneline erişebilirsiniz)*

---

## ✨ Özellikler ve Modüller

### 1. 🏠 Vitrin & Kullanıcı Deneyimi
* **Mutfak Fire & Stok Hesaplayıcı (Waste Calculator):** Aylık harcama ve mutfak tipine göre kurtarılabilir net kârı ve amortisman süresini hesaplayan anlık araç.
* **4 Ana Modül Tanıtımı:** Stok & Envanter, Reçete & Food Cost, POS Entegrasyonu ve Tedarikçi Yönetimi.
* **Öne Çıkan Restoran Yorumları:** Doğrulanmış şef profil fotoğrafları, POS rozetleri ve kanıtlanmış mutfak tasarruf oranları.
* **GastroStok Blog:** Gastronomi yönetimi, sıfır atık, barista envanteri ve dinamik menü fiyatlandırması üzerine zengin makaleler ve modal okuyucu.
* **Sponsorlar & Partnerler:** Sektörün önde gelen 10 toptancı ve gastronomi markası için kayan logo bandı (Marquee).

### 2. 🛡️ Yönetici Portalı (Admin CMS & CRM)
* **Genel Bakış (Dashboard):** Ziyaretçi sayıları, CRM başvuru durumu, kümülatif tasarruf ve gerçek zamanlı sistem denetim günlüğü (Audit Log).
* **Restoran Başvuruları (Leads CRM):** Siteden form dolduran restoranları inceleme, durum değiştirme (*Yeni*, *İletişimde*, *Demo Yapıldı*, *Onaylandı*, *Arşivlendi*), özel CRM görüşme notları kaydetme ve tek tıkla arama.
* **Blog Yönetim Sistemi (CMS):** Yeni blog makalesi oluşturma, düzenleme, kapak görseli tanımlama, kategori ve tahmini okuma süresi yönetimi.
* **Öne Çıkan Müşteri Yorumları Yönetimi:** Anasayfada yer alan şef ve işletmecilerin profil fotoğraflarını, puanlarını, tasarruf metriklerini düzenleme, gizleme/öne çıkarma veya yeni yorum ekleme.
* **İletişim Mesajları Merkezi:** Ziyaretçilerden gelen soruları okuma, okundu işaretleme ve doğrudan yanıt metni oluşturma.
* **Kayıtlı Şubeler & POS Durumu:** SambaPOS, Simpra POS, Mikro, Omnitron ve Vega POS bağlantılı şubelerin anlık lisans ve tasarruf takibi.
* **Site Ayarları & SEO:** Başlık, meta açıklaması, iletişim kanalları ve bakım modu yönetimi.

### 3. 👤 Restoran Kontrol Paneli (Üye / Müşteri Portalı)
* **Mutfak Paneli:** Aktif reçeteler, gramaj maliyetleri, bekleyen faturalar ve depo uyarıları.
* **Kalıcı Tarayıcı Oturumu:** `localStorage` tabanlı oturum yönetimi ile kesintisiz kullanım.

### 4. 🤖 GastroBot — AI Mutfak Danışmanı
* Ekranın sağ alt köşesinde çalışan; reçete porsiyonlama, süt/et fire hesaplama ve mutfak maliyet optimizasyonu sorularını anında yanıtlayan gastronomi yapay zeka asistanı.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

| Teknoloji | Sürüm | Kullanım Alanı |
| :--- | :--- | :--- |
| **React** | `^19.0.1` | Kullanıcı arayüzü ve reaktif bileşen mimarisi |
| **TypeScript** | `^7.0.2` | Statik tip güvenliği ve ölçeklenebilir kod tabanı |
| **Vite** | `^8.3.0` | Hızlı geliştirme sunucusu ve optimize derleme |
| **Tailwind CSS** | `^4.3.3` | Modern, responsive ve yardımcı-sınıf odaklı stil |
| **Lucide React** | `^0.546.0` | Yüksek kaliteli SVG simge kütüphanesi |
| **Motion** | `^12.23.24` | Akıcı mikro-etkileşimler ve animasyonlar |
| **Express** | `^4.21.2` | İsteğe bağlı API ve arka plan yönlendirme mimarisi |

---

## 📂 Proje Dizin Mimarisi

```text
gastrostok/
├── public/                       # Statik dosyalar (Canlı derlemede dist'e kopyalanır)
│   ├── assets/
│   │   └── images/              # Blog görselleri, şef profil fotoğrafları, mutfak varlıkları
│   └── src/assets/images/       # Geriye dönük uyumluluk görsel yolları
├── src/
│   ├── assets/images/           # Kaynak görsel varlıkları
│   ├── components/              # Yeniden kullanılabilir UI bileşenleri
│   │   ├── Navbar.tsx           # 3 bölgeli navigasyon ve portallar açılır menüsü
│   │   ├── Hero.tsx             # Ana başlık ve değer önerisi bölümü
│   │   ├── CustomerReviews.tsx  # 6 doğrulanmış şef yorumu (canlı senkronize)
│   │   ├── WasteCalculator.tsx  # İnteraktif mutfak fire hesaplayıcı
│   │   ├── Modules.tsx          # 4 ana modül kartları
│   │   ├── FeaturedBlog.tsx     # Öne çıkan blog makaleleri
│   │   ├── GastroBot.tsx        # Yapay zeka asistanı
│   │   ├── AdminLoginModal.tsx  # Yönetici giriş penceresi
│   │   ├── UserLoginModal.tsx   # Üyelik & restoran giriş penceresi
│   │   ├── RegisterModal.tsx    # Restoranını ekle formu (CRM bağlı)
│   │   ├── BlogModal.tsx        # Makale okuyucu ve paylaşım penceresi
│   │   └── Footer.tsx           # Alt bilgi ve kurumsal bağlantılar
│   ├── pages/                   # Sayfa bileşenleri
│   │   ├── AdminPage.tsx        # Süper Admin Yönetici Paneli (CMS & CRM)
│   │   ├── UserPortalPage.tsx   # Üye Restoran Kontrol Merkezi
│   │   ├── BlogPage.tsx         # Kategori filtreli tam blog sayfası
│   │   ├── ModulesPage.tsx      # Ayrıntılı modül inceleme sayfası
│   │   ├── AboutPage.tsx        # Hakkımızda ve kurumsal vizyon
│   │   └── ContactPage.tsx      # İletişim, başvuru formu ve SSS
│   ├── data/                    # Başlangıç verileri ve mock veritabanı
│   │   ├── blogData.ts          # Zengin blog içerikleri ve görsel yolları
│   │   └── reviewsData.ts       # 6 doğrulanmış şef yorumu ve profil fotoğrafları
│   ├── utils/                   # Yardımcı araçlar ve varlık çözümleyiciler
│   │   └── assets.ts            # getAssetUrl ve handleImageFallback (canlı görsel yükleme garantisi)
│   ├── types/                   # TypeScript arayüz ve tip tanımları
│   │   └── index.ts             # BlogPost, ReviewItem, LeadItem, UserAccount vb.
│   ├── App.tsx                  # Ana router, global state ve LocalStorage senkronizasyonu
│   └── main.tsx                 # React DOM giriş noktası
├── dist/                        # Üretim ortamı derleme çıktısı (Production Build)
├── package.json                 # Bağımlılıklar ve npm scriptleri
├── tsconfig.json                # TypeScript derleme ayarları
├── vite.config.ts               # Vite yapılandırması (base: './' universal desteği)
└── README.md                    # Kapsamlı proje dokümantasyonu
```

---

## 🚀 Kurulum ve Yerel Çalıştırma (Getting Started)

Projeyi kendi bilgisayarınızda yerel olarak çalıştırmak için:

### 1. Gereksinimler
* **Node.js**: `v18.0.0` veya üzeri
* **npm**: `v9.0.0` veya üzeri (veya `pnpm` / `yarn`)
* **Git**

### 2. Depoyu İndirin (Clone)
```bash
git clone https://github.com/KULLANICI_ADINIZ/gastrostok.git
cd gastrostok
```

### 3. Bağımlılıkları Yükleyin
```bash
npm install
```

### 4. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Tarayıcınızda otomatik olarak açılmazsa **[http://localhost:3000](http://localhost:3000)** adresine gidin.

### 5. Tip Denetimi (TypeScript Lint)
```bash
npm run lint
```

### 6. Canlı Sürüm Derlemesi (Build for Production)
```bash
npm run build
```
Derlenen projeyi yerel ortamda test etmek için:
```bash
npm run preview
```

---

## ☁️ Canlıya Alma Rehberi (Deployment)

Projeyi GitHub'a yükledikten sonra dilediğiniz platformda ücretsiz olarak yayına alabilirsiniz:

### Seçenek 1: Vercel ile Canlıya Alma (Önerilen)
1. [Vercel Dashboard](https://vercel.com)'a gidin ve **"Add New Project"** seçeneğini tıklayın.
2. GitHub'a yüklediğiniz repoyu seçin (**Import**).
3. Projede hazır bulunan `vercel.json` yapılandırması sayesinde Vite, build komutu (`npm run build`), çıktı dizini (`dist`) ve SPA yönlendirmeleri (`rewrites`) otomatik olarak uygulanır.
4. **Deploy** butonuna tıklayın. 1 dakika içinde projeniz ve tüm görseller eksiksiz canlıya alınır.

### Seçenek 2: Netlify ile Canlıya Alma
1. [Netlify](https://www.netlify.com) paneline gidin ve **"Import an existing project"** seçeneğini seçin.
2. Build komutu: `npm run build`, Yayın dizini: `dist`
3. **Deploy Site** butonuna basarak canlıya alın.

### Seçenek 3: GitHub Pages ile Canlıya Alma
1. GitHub Pages alt klasöründe (`https://kullanici.github.io/depo-adi/`) dağıtmak isterseniz `VITE_BASE_URL` ortam değişkenini veya `./` olarak belirtebilirsiniz.
2. GitHub deponuzun **Settings > Pages** sekmesinden GitHub Actions iş akışıyla yayınlayabilirsiniz.

---

## 📄 Lisans

Bu proje **[Apache License 2.0](LICENSE)** kapsamında lisanslanmıştır. Açık kaynak kodlu olup ticari ve bireysel gastronomi projelerinde serbestçe kullanılabilir.

---

<div align="center">

**GastroStok** — Mutfaklarda Sıfır Atık, Kusursuz Stok Kontrolü ve Maksimum Kârlılık. 🥗✨

*Sorularınız, hata bildirimleri veya özellik talepleri için GitHub Issues üzerinden iletişime geçebilirsiniz.*

</div>
