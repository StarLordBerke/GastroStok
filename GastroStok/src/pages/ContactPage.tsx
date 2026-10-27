import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  UtensilsCrossed,
  MessageSquare,
  HelpCircle,
  Loader2
} from 'lucide-react';
import { Faq } from '../components/Faq';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    restaurant: '',
    subject: 'Özel Demo ve Panel İncelemesi',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="py-12 sm:py-20 bg-[#111215]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e05338]">
            <MessageSquare className="w-4 h-4" />
            <span>Doğrudan İletişim ve Destek</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Restoranınızı Birlikte Dijitalleştirelim
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            Mutfak entegrasyonu, mevcut adisyon sisteminizle uyumluluk veya özel demo talepleriniz için uzman ekibimizle iletişime geçin.
          </p>
        </div>

        {/* Contact Grid: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Info & Addresses */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#16181f] rounded-2xl p-6 sm:p-8 border border-neutral-800 space-y-6">
              <h2 className="text-lg font-bold text-white pb-3 border-b border-neutral-800">
                GastroStok Genel Merkez
              </h2>

              <div className="space-y-4 text-sm">
                
                {/* Office */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#241a18] border border-[#c24128]/30 flex items-center justify-center text-[#f26a4f] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Genel Merkez & Ar-Ge Ofisi</h3>
                    <p className="text-neutral-400 text-xs mt-0.5">
                      Büyükdere Caddesi No: 185, Kanyon Ofis Kuleleri, Levent / İstanbul
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#241a18] border border-[#c24128]/30 flex items-center justify-center text-[#f26a4f] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">E-posta İletişim</h3>
                    <p className="text-neutral-300 text-xs mt-0.5 font-mono">
                      destek@gastrostok.com
                    </p>
                    <p className="text-neutral-300 text-xs font-mono">
                      kurumsal@gastrostok.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#241a18] border border-[#c24128]/30 flex items-center justify-center text-[#f26a4f] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Mutfak Destek & Çağrı Hattı</h3>
                    <p className="text-neutral-300 text-xs mt-0.5 font-mono">
                      +90 (212) 840 20 26
                    </p>
                    <span className="text-[11px] text-neutral-400 block">Hafta içi 08:30 - 19:30</span>
                  </div>
                </div>

                {/* Working hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1e2029] border border-neutral-700/60 flex items-center justify-center text-neutral-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Acil Servis ve Hafta Sonu Nöbeti</h3>
                    <p className="text-neutral-400 text-xs mt-0.5">
                      Canlı servis saatlerinde (17:00 - 23:00) nöbetçi mutfak destek mühendisi aktiftir.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick trust box */}
            <div className="bg-[#181922] p-5 rounded-2xl border border-neutral-800 text-xs text-neutral-300 space-y-2">
              <span className="font-semibold text-[#f26a4f] flex items-center gap-1.5">
                <UtensilsCrossed className="w-4 h-4" /> Hızlı Kurulum Garantisi
              </span>
              <p className="text-neutral-400 leading-relaxed">
                Talebinizi aldıktan sonra restoranınızın mevcut menü ve reçete dökümünü inceleyerek 24 saat içinde sisteminizi çalışır hale getiriyoruz.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-[#16181f] rounded-2xl p-6 sm:p-8 border border-neutral-800">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white">Bize Mesaj Gönderin</h2>
                  <p className="text-xs text-neutral-400">
                    Aşağıdaki formu eksiksiz doldurun, mutfak kurulum uzmanımız aynı gün içinde dönsün.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300 block">
                      Adınız Soyadınız *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Örn: Canan Özkan"
                      className="w-full px-3.5 py-2.5 bg-[#111215] border border-neutral-700/80 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                    />
                  </div>

                  {/* Restaurant Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300 block">
                      Restoran / İşletme Adı *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.restaurant}
                      onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                      placeholder="Örn: Karaköy Lokantası"
                      className="w-full px-3.5 py-2.5 bg-[#111215] border border-neutral-700/80 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300 block">
                      İş E-postanız *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="canan@restoran.com"
                      className="w-full px-3.5 py-2.5 bg-[#111215] border border-neutral-700/80 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-neutral-300 block">
                      Telefon Numarası *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0533 000 00 00"
                      className="w-full px-3.5 py-2.5 bg-[#111215] border border-neutral-700/80 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                    />
                  </div>
                </div>

                {/* Subject Topic */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300 block">
                    İletişim Konusu
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#111215] border border-neutral-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-[#c24128]"
                  >
                    <option value="Özel Demo ve Panel İncelemesi">Özel Demo ve Panel İncelemesi</option>
                    <option value="POS / Adisyon Entegrasyonu">Mevcut POS / Adisyon Entegrasyonu</option>
                    <option value="Çok Şubeli Zincir Çözümleri">Çok Şubeli Zincir & Merkezi Depo Çözümleri</option>
                    <option value="Reçete & Menü Danışmanlığı">Reçete & Menü Danışmanlığı</option>
                    <option value="Diğer Sorular">Diğer Konular</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300 block">
                    Mesajınız veya Mutfak İhtiyaçlarınız
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Şube sayınız, kullandığınız adisyon sistemi veya çözmek istediğiniz fire problemleri..."
                    className="w-full px-3.5 py-2.5 bg-[#111215] border border-neutral-700/80 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 bg-[#c24128] hover:bg-[#aa3620] active:bg-[#942e1a] text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#c24128]/25 disabled:opacity-75"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>İletiliyor...</span>
                    </>
                  ) : (
                    <>
                      <span>Mesajı Gönder</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Mesajınız Alındı!</h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Sayın <strong className="text-white">{formData.name}</strong>, talebiniz mutfak çözümleri ekibimize ulaştı. <strong className="text-white">{formData.phone || formData.email}</strong> üzerinden en geç 24 saat içinde dönüş sağlanacaktır.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      restaurant: '',
                      subject: 'Özel Demo ve Panel İncelemesi',
                      message: ''
                    });
                  }}
                  className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            )}
          </div>

        </div>

        {/* SSS (Sık Sorulan Sorular) Bölümü İletişim Sayfasında */}
        <div className="pt-8">
          <Faq />
        </div>

      </div>
    </div>
  );
};
