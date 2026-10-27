import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, Utensils, Building, Mail, Phone, Loader2, ShieldCheck, ExternalLink } from 'lucide-react';
import { LeadItem } from '../types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess?: (lead: LeadItem) => void;
  onViewInAdmin?: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ 
  isOpen, 
  onClose,
  onRegisterSuccess,
  onViewInAdmin
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    restaurantName: '',
    businessType: 'Kafe & Bistro',
    branchCount: '1 Şube',
    email: '',
    phone: '',
    currentPos: 'SambaPOS',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastCreatedLead, setLastCreatedLead] = useState<LeadItem | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newLead: LeadItem = {
      id: `lead-${Date.now()}`,
      restaurantName: formData.restaurantName.trim() || 'Yeni Restoran Başvurusu',
      contactName: formData.fullName.trim() || 'Restoran Yetkilisi',
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      city: 'İstanbul (Web Kayıt)',
      venueType: `${formData.businessType} · ${formData.branchCount}`,
      posSystem: formData.currentPos?.trim() || 'Belirtilmedi',
      date: formattedDate,
      status: 'Yeni',
      notes: `Web sitesi 'Ücretsiz Restoran Ekle' formu üzerinden anlık kaydedildi. Yetkili: ${formData.fullName.trim()}, Tel: ${formData.phone.trim()}, POS: ${formData.currentPos || 'Belirtilmedi'}.`
    };

    setTimeout(() => {
      onRegisterSuccess?.(newLead);
      setLastCreatedLead(newLead);
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setLastCreatedLead(null);
    onClose();
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop click listener */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true"></div>

      <div className="relative w-full max-w-xl bg-[#171920] rounded-2xl border border-neutral-700/80 shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-800/80 hover:bg-neutral-800 transition-colors"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#e05338] mb-1">
                <span>Ücretsiz Erken Erişim</span>
                <span aria-hidden="true">·</span>
                <span>Hemen Başlayın</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Restoranını GastroStok'a Ekle</h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                Mutfak stoklarınızı yapay zeka ile optimize etmek için aşağıdaki formu doldurun.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300 block">
                    Adınız Soyadınız *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Örn: Ahmet Yılmaz"
                    className="w-full px-3.5 py-2.5 bg-[#121317] border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128] focus:ring-1 focus:ring-[#c24128]"
                  />
                </div>

                {/* Restaurant Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300 block">
                    Restoran / Kafe Adı *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.restaurantName}
                    onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                    placeholder="Örn: Galata Brasserie"
                    className="w-full px-3.5 py-2.5 bg-[#121317] border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128] focus:ring-1 focus:ring-[#c24128]"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Business Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300 block">
                    İşletme Türü
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#121317] border border-neutral-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#c24128]"
                  >
                    <option value="Kafe & Bistro">Kafe & Bistro</option>
                    <option value="Alakart / Fine Dining">Alakart / Fine Dining</option>
                    <option value="Fast Casual & Burger">Fast Casual & Burger</option>
                    <option value="Otel & Mutfak">Otel Mutfak & Ziyafet</option>
                    <option value="Pastane & Unlu Mamul">Pastane & Unlu Mamul</option>
                  </select>
                </div>

                {/* Branch Count */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300 block">
                    Şube Sayısı
                  </label>
                  <select
                    value={formData.branchCount}
                    onChange={(e) => setFormData({ ...formData, branchCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#121317] border border-neutral-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#c24128]"
                  >
                    <option value="1 Şube">1 Şube (Tek Lokasyon)</option>
                    <option value="2-4 Şube">2 - 4 Şube</option>
                    <option value="5-10 Şube">5 - 10 Şube</option>
                    <option value="10+ Şube">10+ Şube (Merkezi Depo)</option>
                  </select>
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300 block">
                    İş E-posta Adresi *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ahmet@restoran.com"
                    className="w-full px-3.5 py-2.5 bg-[#121317] border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
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
                    placeholder="0532 000 00 00"
                    className="w-full px-3.5 py-2.5 bg-[#121317] border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                  />
                </div>

              </div>

              {/* Current POS */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300 block">
                  Mevcut POS / Adisyon Sisteminiz (Opsiyonel)
                </label>
                <input
                  type="text"
                  value={formData.currentPos}
                  onChange={(e) => setFormData({ ...formData, currentPos: e.target.value })}
                  placeholder="Örn: SambaPOS, Omnitron, Simpra, Mikro..."
                  className="w-full px-3.5 py-2.5 bg-[#121317] border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                />
              </div>

              <p className="text-[11px] text-neutral-400">
                Kayıt olarak GastroStok Kullanım Koşulları ve Gizlilik Politikasını kabul etmiş sayılırsınız.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#c24128] hover:bg-[#aa3620] active:bg-[#942e1a] text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 shadow-lg shadow-[#c24128]/25"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Kaydınız Oluşturuluyor...</span>
                  </>
                ) : (
                  <>
                    <span>Restoranını Ücretsiz Ekle</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen with Admin Panel Auto-sync Notice */
          <div className="py-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Yönetici CRM Paneline Otomatik İşlendi
              </span>
              <h3 className="text-2xl font-bold text-white">Kaydınız Başarıyla Alındı!</h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                Talebiniz kaydedildi ve sistem yöneticisi ekranına anında düştü. Kurulum ekibimiz en kısa sürede <strong className="text-white">{formData.phone || formData.email}</strong> üzerinden sizinle iletişime geçecektir.
              </p>
            </div>

            <div className="bg-[#121318] p-4 rounded-xl border border-neutral-800 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-[11px] font-mono text-neutral-400">CRM Başvuru Özeti:</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#c24128]/20 text-[#f26a4f] border border-[#c24128]/40">
                  Durum: Yeni
                </span>
              </div>
              <p className="text-neutral-400 font-mono">Restoran: <span className="text-white font-semibold">{formData.restaurantName || 'Belirtilmedi'}</span></p>
              <p className="text-neutral-400 font-mono">Yetkili: <span className="text-white">{formData.fullName}</span></p>
              <p className="text-neutral-400 font-mono">İletişim: <span className="text-neutral-200">{formData.phone} · {formData.email}</span></p>
              <p className="text-neutral-400 font-mono">İşletme Türü: <span className="text-white">{formData.businessType} ({formData.branchCount})</span></p>
              {formData.currentPos && (
                <p className="text-neutral-400 font-mono">POS Sistemi: <span className="text-[#f26a4f]">{formData.currentPos}</span></p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {onViewInAdmin && (
                <button
                  onClick={() => {
                    handleReset();
                    onViewInAdmin();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#c24128] hover:bg-[#aa3620] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-[#c24128]/25"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Yönetici Panelinde Görüntüle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Pencereyi Kapat
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
