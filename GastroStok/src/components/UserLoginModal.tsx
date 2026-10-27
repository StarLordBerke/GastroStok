import React, { useState } from 'react';
import { X, Lock, Mail, User, Building, Phone, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, AlertCircle, KeyRound } from 'lucide-react';
import { UserAccount } from '../types';

interface UserLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  onOpenAdminLogin?: () => void;
  initialTab?: 'login' | 'register';
}

export const DEMO_USER_ACCOUNT: UserAccount = {
  id: 'usr-bistro-galata',
  fullName: 'Ahmet Yılmaz',
  email: 'ahmet@bistrogalata.com',
  phone: '0532 555 43 21',
  restaurantName: 'Bistro Galata',
  restaurantType: 'Alakart Restoran & Şarap Evi',
  city: 'İstanbul / Beyoğlu',
  role: 'Mutfak Şefi & Kurucu',
  posSystem: 'SambaPOS',
  tier: 'Pro',
  tierExpiry: '14 Kasım 2027',
  joinedDate: '12 Ocak 2025',
  notifications: {
    emailAlerts: true,
    smsAlerts: true,
    weeklyDigest: true,
    criticalStockSms: true,
  },
  stockAlertThreshold: 20,
  twoFactorEnabled: false,
};

export const UserLoginModal: React.FC<UserLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenAdminLogin,
  initialTab = 'login',
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>(initialTab);
  
  // Login Form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');
  
  // Register Form
  const [regFullName, setRegFullName] = useState('');
  const [regRestaurantName, setRegRestaurantName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCity, setRegCity] = useState('İstanbul');
  const [regVenueType, setRegVenueType] = useState('Alakart Restoran');
  const [regPassword, setRegPassword] = useState('');
  const [regAcceptTerms, setRegAcceptTerms] = useState(true);
  const [regError, setRegError] = useState('');

  // Forgot password
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Lütfen e-posta adresinizi ve şifrenizi girin.');
      return;
    }

    // Check against demo or stored users
    if (loginEmail.toLowerCase() === 'ahmet@bistrogalata.com' && loginPassword === 'bistro123') {
      onLoginSuccess(DEMO_USER_ACCOUNT);
      onClose();
      return;
    }

    // Try reading registered user from localStorage
    try {
      const stored = localStorage.getItem('gastrostok_registered_user');
      if (stored) {
        const parsed: UserAccount = JSON.parse(stored);
        if (parsed.email.toLowerCase() === loginEmail.trim().toLowerCase()) {
          onLoginSuccess(parsed);
          onClose();
          return;
        }
      }
    } catch {
      // ignore
    }

    // If matches any email pattern, generate a session
    if (loginEmail.includes('@') && loginPassword.length >= 4) {
      const newUserSession: UserAccount = {
        id: `usr-${Date.now().toString().slice(-6)}`,
        fullName: loginEmail.split('@')[0].toUpperCase(),
        email: loginEmail,
        phone: '05xx xxx xx xx',
        restaurantName: 'Restoranım',
        restaurantType: 'Alakart Restoran',
        city: 'İstanbul',
        role: 'Mutfak Şefi',
        posSystem: 'POS Entegre',
        tier: 'Free',
        tierExpiry: 'Deneme Süresi (14 Gün)',
        joinedDate: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
        notifications: {
          emailAlerts: true,
          smsAlerts: false,
          weeklyDigest: true,
          criticalStockSms: true,
        },
        stockAlertThreshold: 20,
      };
      onLoginSuccess(newUserSession);
      onClose();
      return;
    }

    setLoginError('Hatalı e-posta veya şifre. Demo için "Hızlı Demo Üye Girişi" butonuna tıklayabilirsiniz.');
  };

  const handleDemoLogin = () => {
    onLoginSuccess(DEMO_USER_ACCOUNT);
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regFullName.trim() || !regRestaurantName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegError('Lütfen zorunlu alanları (Ad Soyad, Restoran Adı, E-posta, Şifre) eksiksiz doldurun.');
      return;
    }

    if (!regEmail.includes('@') || !regEmail.includes('.')) {
      setRegError('Geçerli bir e-posta adresi giriniz.');
      return;
    }

    if (regPassword.length < 6) {
      setRegError('Şifreniz en az 6 karakter olmalıdır.');
      return;
    }

    if (!regAcceptTerms) {
      setRegError('Lütfen kullanım ve gizlilik koşullarını onaylayın.');
      return;
    }

    const newAccount: UserAccount = {
      id: `usr-${Date.now().toString().slice(-6)}`,
      fullName: regFullName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim() || '05xx xxx xx xx',
      restaurantName: regRestaurantName.trim(),
      restaurantType: regVenueType,
      city: regCity,
      role: 'İşletmeci / Mutfak Şefi',
      posSystem: 'Manuel / Excel',
      tier: 'Pro',
      tierExpiry: '14 Gün Ücretsiz Pro Deneme',
      joinedDate: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      notifications: {
        emailAlerts: true,
        smsAlerts: true,
        weeklyDigest: true,
        criticalStockSms: true,
      },
      stockAlertThreshold: 20,
    };

    try {
      localStorage.setItem('gastrostok_registered_user', JSON.stringify(newAccount));
    } catch {
      // ignore
    }

    onLoginSuccess(newAccount);
    onClose();
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) return;
    setForgotSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop click listener */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true"></div>

      <div 
        className="relative w-full max-w-lg bg-[#14161f] border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-neutral-800 bg-gradient-to-r from-[#191b28] via-[#161823] to-[#1a151b]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c24128] to-[#992d19] flex items-center justify-center text-white shadow-lg shadow-[#c24128]/25">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Gastro<span className="text-[#f26a4f]">Stok</span> Üye Portalı
                </h3>
                <p className="text-xs text-neutral-400">Restoran & Mutfak Ekibi Giriş Alanı</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          {activeTab !== 'forgot' && (
            <div className="grid grid-cols-2 gap-2 mt-4 p-1 bg-[#0c0d12]/90 rounded-xl border border-neutral-800/80">
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setLoginError(''); }}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-[#c24128] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Kullanıcı Girişi
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setRegError(''); }}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-[#c24128] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Yeni Üyelik Oluştur
              </button>
            </div>
          )}
        </div>

        {/* Modal Body with Scrollable Area */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* TAB 1: LOGIN */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Demo Account Quick Banner */}
              <div className="p-3.5 rounded-xl bg-[#c24128]/10 border border-[#c24128]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-white">Hazır Demo Restoran Hesabı</p>
                    <p className="text-[11px] text-neutral-300">Ahmet Şef (Bistro Galata) - Pro Üye</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full sm:w-auto px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#c24128] hover:bg-[#d94b30] text-white transition-colors cursor-pointer shadow-sm shrink-0 whitespace-nowrap"
                >
                  Tek Tıkla Giriş Yap
                </button>
              </div>

              {loginError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  E-Posta Adresi
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="ornek@restoraniniz.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#0e1017] border border-neutral-700/80 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128] focus:ring-1 focus:ring-[#c24128]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-neutral-300">
                    Şifre
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveTab('forgot')}
                    className="text-xs text-[#f26a4f] hover:underline cursor-pointer"
                  >
                    Şifremi Unuttum?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#0e1017] border border-neutral-700/80 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128] focus:ring-1 focus:ring-[#c24128]"
                  />
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Demo şifresi: <code className="text-neutral-300 font-mono">bistro123</code> (E-posta: <code className="text-neutral-300 font-mono">ahmet@bistrogalata.com</code>)
                </p>
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-between text-xs text-neutral-300">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#0e1017] border-neutral-700 text-[#c24128] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span>Beni hatırla (30 gün oturumu açık tut)</span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#c24128] to-[#992d19] hover:from-[#d94b30] hover:to-[#b0351f] text-white shadow-lg shadow-[#c24128]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Üye Paneline Giriş Yap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 2: REGISTER */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <p className="text-xs text-neutral-400">
                GastroStok ile mutfak reçetelerinizi, fire oranlarınızı ve sipariş listelerinizi hemen yönetmeye başlayın.
              </p>

              {regError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <span>{regError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Ad Soyad *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="Şef Caner Tekin"
                      className="w-full pl-9 pr-3 py-2 bg-[#0e1017] border border-neutral-700/80 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                    />
                  </div>
                </div>

                {/* Restaurant name */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    İşletme / Restoran Adı *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={regRestaurantName}
                      onChange={(e) => setRegRestaurantName(e.target.value)}
                      placeholder="Karaköy Lokantası"
                      className="w-full pl-9 pr-3 py-2 bg-[#0e1017] border border-neutral-700/80 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    E-Posta Adresi *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="sef@karakoylokanta.com"
                      className="w-full pl-9 pr-3 py-2 bg-[#0e1017] border border-neutral-700/80 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Telefon Numarası
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="0532 000 00 00"
                      className="w-full pl-9 pr-3 py-2 bg-[#0e1017] border border-neutral-700/80 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Venue Type */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    İşletme Tipi
                  </label>
                  <select
                    value={regVenueType}
                    onChange={(e) => setRegVenueType(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0e1017] border border-neutral-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                  >
                    <option value="Alakart Restoran">Alakart Restoran</option>
                    <option value="Bistro & Brasserie">Bistro & Brasserie</option>
                    <option value="Kafe & Kahve Dükkanı">Kafe & Kahve Dükkanı</option>
                    <option value="Otel Mutfağı">Otel Mutfağı</option>
                    <option value="Fast Casual & Burger">Fast Casual & Burger</option>
                    <option value="Meyhane & Ocakbaşı">Meyhane & Ocakbaşı</option>
                    <option value="Catering & Toplu Yemek">Catering & Toplu Yemek</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Şehir
                  </label>
                  <input
                    type="text"
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    placeholder="İstanbul / Kadıköy"
                    className="w-full px-3 py-2 bg-[#0e1017] border border-neutral-700/80 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Şifre Belirleyin (En az 6 karakter) *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-[#0e1017] border border-neutral-700/80 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-neutral-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={regAcceptTerms}
                    onChange={(e) => setRegAcceptTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded bg-[#0e1017] border-neutral-700 text-[#c24128] focus:ring-0 cursor-pointer"
                  />
                  <span>
                    Kullanıcı Sözleşmesini ve KVKK Aydınlatma Metnini okudum, kabul ediyorum.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#c24128] to-[#992d19] hover:from-[#d94b30] hover:to-[#b0351f] text-white shadow-lg shadow-[#c24128]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Hesabımı Oluştur & Giriş Yap</span>
              </button>
            </form>
          )}

          {/* TAB 3: FORGOT PASSWORD */}
          {activeTab === 'forgot' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white">
                <KeyRound className="w-5 h-5 text-[#f26a4f]" />
                <h4 className="font-semibold text-sm">Şifre Sıfırlama</h4>
              </div>

              {forgotSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 space-y-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Sıfırlama Bağlantısı Gönderildi!</span>
                  </div>
                  <p>
                    <strong className="text-white">{forgotEmail}</strong> adresine şifre yenileme talimatları iletilmiştir. Lütfen gelen kutunuzu kontrol edin.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotSuccess(false);
                      setActiveTab('login');
                    }}
                    className="mt-2 text-[#f26a4f] hover:underline block font-semibold cursor-pointer"
                  >
                    Giriş Ekranına Dön
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-3.5">
                  <p className="text-xs text-neutral-400">
                    Kayıtlı e-posta adresinizi girin, şifrenizi yenilemeniz için güvenli bir bağlantı gönderelim.
                  </p>
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Kayıtlı E-Posta
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="ahmet@bistrogalata.com"
                        className="w-full pl-9 pr-3 py-2 bg-[#0e1017] border border-neutral-700/80 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      Vazgeç
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 px-4 rounded-xl text-xs font-semibold bg-[#c24128] hover:bg-[#d94b30] text-white transition-colors cursor-pointer"
                    >
                      Sıfırlama Linki Gönder
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer with Link to Admin Portal */}
        <div className="px-6 py-3.5 bg-[#0e1017] border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
          <span className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            256-Bit SSL Korumalı Güvenli Oturum
          </span>

          {onOpenAdminLogin && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAdminLogin();
              }}
              className="text-neutral-400 hover:text-neutral-200 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
            >
              <Lock className="w-3 h-3 text-[#f26a4f]" />
              <span>Yönetici Girişi</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
