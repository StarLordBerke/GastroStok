import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  UtensilsCrossed, 
  ChevronDown, 
  Lock, 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  Sparkles,
  User,
  BookOpen,
  CreditCard,
  UserPlus,
  ShieldCheck,
  Star
} from 'lucide-react';
import { PageView, UserAccount } from '../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenRegister: () => void;
  // Admin auth
  isAdminLoggedIn: boolean;
  onOpenAdminLogin: () => void;
  onAdminLogout: () => void;
  onQuickAdminLogin: () => void;
  newLeadsCount?: number;
  onNavigateAdminTab?: (tab: 'dashboard' | 'blog' | 'leads' | 'reviews' | 'messages' | 'venues' | 'settings' | 'team') => void;
  // User / Membership auth
  currentUser: UserAccount | null;
  isUserLoggedIn: boolean;
  onOpenUserLogin: (tab?: 'login' | 'register') => void;
  onUserLogout: () => void;
  onQuickUserLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate, 
  onOpenRegister,
  isAdminLoggedIn,
  onOpenAdminLogin,
  onAdminLogout,
  onQuickAdminLogin,
  newLeadsCount = 0,
  onNavigateAdminTab,
  currentUser,
  isUserLoggedIn,
  onOpenUserLogin,
  onUserLogout,
  onQuickUserLogin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAdminDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: PageView, hash?: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setAdminDropdownOpen(false);
    if (page === 'home' && hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#111215]/95 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        
        {/* Zone 1: Wordmark */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#c24128] flex items-center justify-center text-white shadow-sm shadow-[#c24128]/30 group-hover:bg-[#d4482e] transition-colors">
            <UtensilsCrossed className="w-4 h-4" />
          </div>
          <span className="tracking-tight text-lg sm:text-xl">
            Gastro<span className="text-[#e05338]">Stok</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
              currentPage === 'home' ? 'text-white font-semibold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Anasayfa
          </button>
          
          <button
            onClick={() => handleNavClick('home', '#sorun-ve-cozum')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 text-neutral-300 cursor-pointer"
          >
            Sorun & Çözüm
          </button>

          <button
            onClick={() => handleNavClick('modules')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
              currentPage === 'modules' ? 'text-[#f26a4f] font-semibold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Modüller
          </button>

          <button
            onClick={() => handleNavClick('blog')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
              currentPage === 'blog' ? 'text-[#f26a4f] font-semibold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Blog
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
              currentPage === 'about' ? 'text-[#f26a4f] font-semibold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Hakkında
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
              currentPage === 'contact' ? 'text-[#f26a4f] font-semibold' : 'text-neutral-300 hover:text-white'
            }`}
          >
            İletişim & SSS
          </button>
        </nav>

        {/* Zone 3: Actions & Portals Dropdown Menu */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          
          {/* Açılır Portallar & Giriş Menüsü */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                currentPage === 'admin' || currentPage === 'member'
                  ? 'bg-[#c24128]/20 text-[#f26a4f] border-[#c24128]/40'
                  : isUserLoggedIn
                  ? 'bg-[#181a24] text-white border-neutral-700 hover:bg-[#202432]'
                  : isAdminLoggedIn
                  ? 'bg-[#181b24] text-white border-neutral-700/80 hover:bg-[#202432]'
                  : 'bg-[#181a20] text-neutral-300 border-neutral-700/70 hover:text-white hover:bg-[#20222a]'
              }`}
            >
              {isUserLoggedIn && currentUser ? (
                <>
                  <div className="w-5 h-5 rounded-md bg-[#c24128] text-white flex items-center justify-center font-bold text-[10px]">
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <span className="max-w-[120px] truncate">{currentUser.fullName}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400">
                    Pro
                  </span>
                </>
              ) : isAdminLoggedIn ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Yönetici: Ahmet Ş.</span>
                  {newLeadsCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#c24128] text-white text-[10px] font-bold font-mono leading-none">
                      {newLeadsCount}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-center -space-x-1">
                    <User className="w-3.5 h-3.5 text-neutral-300" />
                    <Lock className="w-3.5 h-3.5 text-[#f26a4f]" />
                  </div>
                  <span>Giriş Portalları</span>
                  {newLeadsCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#c24128] text-white text-[10px] font-bold font-mono leading-none">
                      {newLeadsCount}
                    </span>
                  )}
                </>
              )}
              <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${adminDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu Popup with both User & Admin sections */}
            {adminDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#141620] border border-neutral-700 rounded-xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-xs divide-y divide-neutral-800">
                
                {/* BÖLÜM 1: YÖNETİCİ GİRİŞİ (CMS & CRM) */}
                <div className="pb-2.5 space-y-1">
                  <div className="px-2.5 py-1 flex items-center justify-between text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-neutral-300">
                      <Lock className="w-3 h-3 text-[#f26a4f]" />
                      <span>Yönetici Portalı (CMS)</span>
                    </span>
                    {isAdminLoggedIn && (
                      <span className="text-[10px] text-emerald-400 font-mono font-normal">Aktif</span>
                    )}
                  </div>

                  {isAdminLoggedIn ? (
                    <>
                      <button
                        onClick={() => {
                          onNavigateAdminTab?.('dashboard');
                          handleNavClick('admin');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-200 hover:text-white hover:bg-[#c24128] transition-colors cursor-pointer text-left font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#f26a4f] group-hover:text-white" />
                        <span>Yönetici Paneline Git</span>
                      </button>

                      <button
                        onClick={() => {
                          onNavigateAdminTab?.('leads');
                          handleNavClick('admin');
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-left font-medium"
                      >
                        <div className="flex items-center gap-2.5">
                          <Users className="w-4 h-4 text-neutral-400" />
                          <span>Restoran Başvuruları (CRM)</span>
                        </div>
                        {newLeadsCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-[#c24128] text-white text-[10px] font-bold font-mono">
                            {newLeadsCount} Yeni
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          onNavigateAdminTab?.('blog');
                          handleNavClick('admin');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-left font-medium"
                      >
                        <FileText className="w-4 h-4 text-neutral-400" />
                        <span>Blog Makale Yönetimi</span>
                      </button>

                      <button
                        onClick={() => {
                          onNavigateAdminTab?.('reviews');
                          handleNavClick('admin');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-left font-medium"
                      >
                        <Star className="w-4 h-4 text-amber-400" />
                        <span>Öne Çıkan Yorumlar</span>
                      </button>

                      <button
                        onClick={() => {
                          onAdminLogout();
                          setAdminDropdownOpen(false);
                          if (currentPage === 'admin') onNavigate('home');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer text-left font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Yönetici Çıkışı</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setAdminDropdownOpen(false);
                          onOpenAdminLogin();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-left font-medium"
                      >
                        <Lock className="w-4 h-4 text-neutral-400" />
                        <span>Yönetici Şifresi ile Giriş</span>
                      </button>

                      <button
                        onClick={() => {
                          setAdminDropdownOpen(false);
                          onQuickAdminLogin();
                        }}
                        className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer text-left text-[11px]"
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>Hızlı Demo Admin</span>
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono">1-Tık</span>
                      </button>
                    </>
                  )}
                </div>

                {/* BÖLÜM 2: KULLANICI GİRİŞİ & ÜYELİK (Yönetici Girişinin Altında) */}
                <div className="pt-2.5 space-y-1">
                  <div className="px-2.5 py-1 flex items-center justify-between text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-white">
                      <User className="w-3 h-3 text-[#f26a4f]" />
                      <span>Kullanıcı & Restoran Üyeliği</span>
                    </span>
                    {isUserLoggedIn && (
                      <span className="text-[10px] text-emerald-400 font-mono font-normal">Giriş Yapıldı</span>
                    )}
                  </div>

                  {isUserLoggedIn && currentUser ? (
                    <>
                      {/* Logged in User Details */}
                      <div className="px-3 py-2 rounded-lg bg-[#0e1017] border border-neutral-800 mb-1">
                        <p className="text-white font-bold truncate text-xs">{currentUser.fullName}</p>
                        <p className="text-[11px] text-[#f26a4f] truncate">{currentUser.restaurantName}</p>
                        <p className="text-[10px] text-neutral-400 font-mono">{currentUser.tier} Üye • {currentUser.city}</p>
                      </div>

                      <button
                        onClick={() => handleNavClick('member')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-200 hover:text-white hover:bg-[#c24128] transition-colors cursor-pointer text-left font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#f26a4f] group-hover:text-white" />
                        <span>Üye Paneli & Genel Bakış</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('member')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-left font-medium"
                      >
                        <BookOpen className="w-4 h-4 text-neutral-400" />
                        <span>Kayıtlı Reçeteler & Maliyetler</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('member')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-left font-medium"
                      >
                        <CreditCard className="w-4 h-4 text-neutral-400" />
                        <span>Abonelik & Fatura Geçmişi</span>
                      </button>

                      <button
                        onClick={() => handleNavClick('member')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-left font-medium"
                      >
                        <Users className="w-4 h-4 text-neutral-400" />
                        <span>Mutfak Ekibi Yönetimi</span>
                      </button>

                      <div className="pt-1 mt-1 border-t border-neutral-800">
                        <button
                          onClick={() => {
                            onUserLogout();
                            setAdminDropdownOpen(false);
                            if (currentPage === 'member') onNavigate('home');
                          }}
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer text-left font-medium"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Kullanıcı Oturumunu Kapat</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setAdminDropdownOpen(false);
                          onOpenUserLogin('login');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-left font-medium"
                      >
                        <User className="w-4 h-4 text-[#f26a4f]" />
                        <span>Kullanıcı Girişi Yap</span>
                      </button>

                      <button
                        onClick={() => {
                          setAdminDropdownOpen(false);
                          onOpenUserLogin('register');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-left font-medium"
                      >
                        <UserPlus className="w-4 h-4 text-emerald-400" />
                        <span>Yeni Üye Kaydı Oluştur</span>
                      </button>

                      <button
                        onClick={() => {
                          setAdminDropdownOpen(false);
                          onQuickUserLogin();
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#c24128]/20 hover:bg-[#c24128]/35 text-[#f26a4f] hover:text-white transition-colors cursor-pointer text-left font-semibold border border-[#c24128]/30"
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Demo Üye Girişi: Ahmet Şef</span>
                        </span>
                        <span className="text-[10px] text-amber-300 font-mono">Pro</span>
                      </button>
                    </>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* Primary CTA */}
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold text-white bg-[#c24128] hover:bg-[#aa3620] active:bg-[#942e1a] rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="hidden md:inline">Restoranını Ücretsiz Ekle</span>
            <span className="inline md:hidden">Ücretsiz Ekle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors rounded-lg focus:outline-none cursor-pointer"
          aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-800 bg-[#14161b] px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-150 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                currentPage === 'home'
                  ? 'bg-neutral-800/80 text-white font-semibold'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/40'
              }`}
            >
              <span>Anasayfa</span>
              {currentPage === 'home' && <span className="w-1.5 h-1.5 rounded-full bg-[#e05338]"></span>}
            </button>
            <button
              onClick={() => handleNavClick('home', '#sorun-ve-cozum')}
              className="text-left px-3 py-2.5 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/40 rounded-lg transition-colors"
            >
              Sorun & Çözüm
            </button>
            <button
              onClick={() => handleNavClick('modules')}
              className={`text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                currentPage === 'modules'
                  ? 'bg-[#c24128]/15 text-[#f26a4f] font-semibold border border-[#c24128]/30'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/40'
              }`}
            >
              <span>Modüller (Canlı Demo)</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">4 Modül</span>
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className={`text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                currentPage === 'blog'
                  ? 'bg-[#c24128]/15 text-[#f26a4f] font-semibold border border-[#c24128]/30'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/40'
              }`}
            >
              <span>Blog Rehberleri</span>
              <span className="text-[10px] font-mono text-neutral-400">11 Makale</span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                currentPage === 'about'
                  ? 'bg-[#c24128]/15 text-[#f26a4f] font-semibold border border-[#c24128]/30'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/40'
              }`}
            >
              <span>Hakkında & Vizyon</span>
              {currentPage === 'about' && <span className="w-1.5 h-1.5 rounded-full bg-[#e05338]"></span>}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                currentPage === 'contact'
                  ? 'bg-[#c24128]/15 text-[#f26a4f] font-semibold border border-[#c24128]/30'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/40'
              }`}
            >
              <span>İletişim & SSS</span>
              {currentPage === 'contact' && <span className="w-1.5 h-1.5 rounded-full bg-[#e05338]"></span>}
            </button>
          </div>

          {/* Mobile User & Membership Section */}
          <div className="pt-3 border-t border-neutral-800 space-y-2">
            <div className="flex items-center justify-between px-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <User className="w-3 h-3 text-[#f26a4f]" />
                <span>Kullanıcı Girişi & Üyelik</span>
              </span>
              {isUserLoggedIn && (
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-mono">
                  Pro Üye
                </span>
              )}
            </div>

            {isUserLoggedIn && currentUser ? (
              <div className="p-3 rounded-xl bg-[#181a24] border border-neutral-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{currentUser.fullName}</p>
                    <p className="text-[11px] text-neutral-400">{currentUser.restaurantName}</p>
                  </div>
                  <button
                    onClick={() => {
                      onUserLogout();
                      setMobileMenuOpen(false);
                      if (currentPage === 'member') onNavigate('home');
                    }}
                    className="text-[11px] text-red-400 hover:underline"
                  >
                    Çıkış
                  </button>
                </div>

                <button
                  onClick={() => handleNavClick('member')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#c24128] text-white text-xs font-semibold cursor-pointer"
                >
                  <span>Üye Kontrol Paneline Git</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenUserLogin('login');
                  }}
                  className="px-3 py-2.5 rounded-xl bg-[#1a1d26] border border-neutral-700 text-white text-xs font-medium text-center hover:bg-neutral-800"
                >
                  Kullanıcı Girişi
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onQuickUserLogin();
                  }}
                  className="px-3 py-2.5 rounded-xl bg-[#c24128]/20 border border-[#c24128]/40 text-[#f26a4f] text-xs font-semibold text-center flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Demo Üye</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Admin Options */}
          <div className="pt-2 border-t border-neutral-800 space-y-2">
            <div className="flex items-center justify-between px-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-[#f26a4f]" />
                <span>Yönetici Portalı (CMS & CRM)</span>
              </span>
              {newLeadsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#c24128] text-white text-[10px] font-bold font-mono">
                  {newLeadsCount} Yeni
                </span>
              )}
            </div>

            {isAdminLoggedIn ? (
              <div className="space-y-1.5">
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-neutral-800 text-white text-xs font-semibold cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-[#f26a4f]" />
                    <span>Yönetici Paneline Git</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onQuickAdminLogin();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#1a1d26] border border-neutral-700/80 text-white text-xs font-semibold cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#f26a4f]" />
                  <span>Yönetici Demo Girişi Yap</span>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-[#c24128] hover:bg-[#aa3620] active:bg-[#942e1a] rounded-xl transition-colors shadow-md cursor-pointer mt-2"
            >
              <span>Restoranını Ücretsiz Ekle</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
