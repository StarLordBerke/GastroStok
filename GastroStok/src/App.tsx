/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageView, BlogPost, ModuleId, LeadItem, UserAccount, ReviewItem } from './types';
import { INITIAL_REVIEWS } from './data/reviewsData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SponsorsMarquee } from './components/SponsorsMarquee';
import { ProblemSolution } from './components/ProblemSolution';
import { WhoIsItFor } from './components/WhoIsItFor';
import { Modules } from './components/Modules';
import { WasteCalculator } from './components/WasteCalculator';
import { Benefits } from './components/Benefits';
import { FeaturedBlog } from './components/FeaturedBlog';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import { RegisterModal } from './components/RegisterModal';
import { BlogModal } from './components/BlogModal';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { ModulesPage } from './pages/ModulesPage';
import { AdminPage, AdminTab } from './pages/AdminPage';
import { UserPortalPage } from './pages/UserPortalPage';
import { GastroBot } from './components/GastroBot';
import { AdminLoginModal } from './components/AdminLoginModal';
import { UserLoginModal, DEMO_USER_ACCOUNT } from './components/UserLoginModal';

const INITIAL_DEMO_LEADS: LeadItem[] = [
  {
    id: 'lead-1',
    restaurantName: 'Bistro Galata',
    contactName: 'Murat Dağdeviren',
    phone: '0532 111 22 33',
    email: 'galata@bistro.com',
    city: 'İstanbul / Beyoğlu',
    venueType: 'Alakart Restoran',
    posSystem: 'SambaPOS',
    date: '25 Ekim 2026 14:20',
    status: 'Yeni',
    notes: 'Haftalık 120 kg et tüketimi var, porsiyon firelerinden şikayetçi.'
  },
  {
    id: 'lead-2',
    restaurantName: 'Moda Artisan Coffee',
    contactName: 'Zeynep Akın',
    phone: '0544 222 33 44',
    email: 'moda@artisancoffee.com',
    city: 'İstanbul / Kadıköy',
    venueType: 'Kafe & Barista',
    posSystem: 'Simpra POS',
    date: '24 Ekim 2026 18:05',
    status: 'İletişimde',
    notes: 'Süt israfını önlemek ve günlük barista vardiya dökümlerini bağlamak istiyor.'
  },
  {
    id: 'lead-3',
    restaurantName: 'Alsancak Brasserie & Bar',
    contactName: 'Cemil Karahan',
    phone: '0505 777 88 99',
    email: 'cemil@alsancakbrasserie.com',
    city: 'İzmir / Konak',
    venueType: 'Bistro & Lounge',
    posSystem: 'Mikro Yazılım',
    date: '23 Ekim 2026 11:45',
    status: 'Demo Yapıldı',
    notes: 'Görüntülü demo yapıldı, mutfak şefi Salı günü reçeteleri Excel ile yükleyecek.'
  },
  {
    id: 'lead-4',
    restaurantName: 'Lezzet Dünyası 4 Şube',
    contactName: 'Haluk Yıldırım',
    phone: '0533 999 00 11',
    email: 'haluk@lezzetdunyasi.com.tr',
    city: 'Ankara / Çankaya',
    venueType: 'Çok Şubeli Zincir',
    posSystem: 'Omnitron',
    date: '21 Ekim 2026 09:30',
    status: 'Onaylandı',
    notes: 'Yıllık kurumsal sözleşme hazırlandı, 4 şube için entegrasyon API anahtarları tanımlandı.'
  },
  {
    id: 'lead-5',
    restaurantName: 'Bodrum Marina Balıkçısı',
    contactName: 'Selim Taşkın',
    phone: '0542 333 44 55',
    email: 'selim@marinabalik.com',
    city: 'Muğla / Bodrum',
    venueType: 'Alakart Restoran',
    posSystem: 'Vega POS',
    date: '19 Ekim 2026 16:15',
    status: 'Arşivlendi',
    notes: 'Kış sezonunda kapalı, Nisan ayında tekrar aranacak.'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedModule, setSelectedModule] = useState<ModuleId>('stok');
  
  // Modals
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isUserLoginOpen, setIsUserLoginOpen] = useState(false);
  const [userLoginTab, setUserLoginTab] = useState<'login' | 'register'>('login');
  
  // Auth states
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('gastrostok_user_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('User session read error:', e);
    }
    return null;
  });

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [adminActiveTab, setAdminActiveTab] = useState<AdminTab>('dashboard');

  // Sync user session to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('gastrostok_user_session', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('gastrostok_user_session');
      }
    } catch (e) {
      console.warn('User session storage error:', e);
    }
  }, [currentUser]);

  // Shared CRM Leads state with LocalStorage persistence
  const [leads, setLeads] = useState<LeadItem[]>(() => {
    try {
      const saved = localStorage.getItem('gastrostok_crm_leads');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage leads read error:', e);
    }
    return INITIAL_DEMO_LEADS;
  });

  // Sync leads to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('gastrostok_crm_leads', JSON.stringify(leads));
    } catch (e) {
      console.warn('LocalStorage leads write error:', e);
    }
  }, [leads]);

  // Shared Customer Reviews state with LocalStorage persistence
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('gastrostok_customer_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage reviews read error:', e);
    }
    return INITIAL_REVIEWS;
  });

  // Sync reviews to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('gastrostok_customer_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.warn('LocalStorage reviews write error:', e);
    }
  }, [reviews]);

  const handleUpdateReview = (updatedReview: ReviewItem) => {
    setReviews(prev => prev.map(r => r.id === updatedReview.id ? updatedReview : r));
  };

  const handleAddReview = (newReview: ReviewItem) => {
    setReviews(prev => [newReview, ...prev]);
  };

  const handleDeleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const handleToggleReviewFeatured = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, featured: !r.featured } : r));
  };

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectModule = (modId: ModuleId) => {
    setSelectedModule(modId);
    handleNavigate('modules');
  };

  // Adding new lead from "Ücretsiz Restoran Ekle" form
  const handleAddNewLead = (newLead: LeadItem) => {
    setLeads(prev => [newLead, ...prev]);
  };

  const handleUpdateLeadStatus = (id: string, newStatus: LeadItem['status']) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
  };

  const handleSaveLeadNote = (id: string, notes: string) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, notes } : lead));
  };

  const handleDeleteLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  // Direct shortcut from RegisterModal to open Admin Leads CRM
  const handleViewLeadInAdmin = () => {
    setIsRegisterOpen(false);
    setIsAdminLoggedIn(true);
    setAdminActiveTab('leads');
    handleNavigate('admin');
  };

  // User Auth Handlers
  const handleUserLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    handleNavigate('member');
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    if (currentPage === 'member') {
      handleNavigate('home');
    }
  };

  const handleQuickUserLogin = () => {
    setCurrentUser(DEMO_USER_ACCOUNT);
    handleNavigate('member');
  };

  const handleOpenUserLoginModal = (tab: 'login' | 'register' = 'login') => {
    setUserLoginTab(tab);
    setIsUserLoginOpen(true);
  };

  const newLeadsCount = leads.filter(l => l.status === 'Yeni').length;

  return (
    <div className="min-h-screen bg-[#111215] text-neutral-100 flex flex-col font-sans selection:bg-[#c24128]/25 selection:text-[#f26a4f]">
      {/* 3-Zone Top Bar Contract Navbar with Page Navigators & Admin/User Dropdown */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenRegister={() => setIsRegisterOpen(true)}
        // Admin props
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onAdminLogout={() => setIsAdminLoggedIn(false)}
        onQuickAdminLogin={() => {
          setIsAdminLoggedIn(true);
          setAdminActiveTab('dashboard');
          handleNavigate('admin');
        }}
        newLeadsCount={newLeadsCount}
        onNavigateAdminTab={(tab) => {
          setIsAdminLoggedIn(true);
          setAdminActiveTab(tab);
          handleNavigate('admin');
        }}
        // User & Membership props
        currentUser={currentUser}
        isUserLoggedIn={!!currentUser}
        onOpenUserLogin={handleOpenUserLoginModal}
        onUserLogout={handleUserLogout}
        onQuickUserLogin={handleQuickUserLogin}
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <Hero onOpenRegister={() => setIsRegisterOpen(true)} />

            {/* Sorun ve Çözüm */}
            <ProblemSolution />

            {/* Kimler İçin */}
            <WhoIsItFor />

            {/* 4 Ana Modül */}
            <Modules onSelectModule={handleSelectModule} />

            {/* Mutfak Fire & Stok Hesaplayıcı */}
            <WasteCalculator onOpenRegister={() => setIsRegisterOpen(true)} />

            {/* Kazanımlar */}
            <Benefits />

            {/* 10 Fictional Sponsors Marquee (Blog yazılarının hemen üzerinde) */}
            <SponsorsMarquee />

            {/* Öne Çıkan 6 Blog Gönderisi */}
            <FeaturedBlog
              onSelectPost={(post) => setSelectedPost(post)}
              onNavigateToBlog={() => handleNavigate('blog')}
            />

            {/* Öne Çıkan 6 Müşteri Yorumu (Blog bölümünün hemen altında) */}
            <CustomerReviews
              reviews={reviews}
              onOpenRegister={() => setIsRegisterOpen(true)}
            />
          </>
        )}

        {currentPage === 'modules' && (
          <ModulesPage
            initialModule={selectedModule}
            onNavigateHome={() => handleNavigate('home')}
            onOpenRegister={() => setIsRegisterOpen(true)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onOpenRegister={() => setIsRegisterOpen(true)} />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            onSelectPost={(post) => setSelectedPost(post)}
            onOpenRegister={() => setIsRegisterOpen(true)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {/* User / Member Dashboard */}
        {currentPage === 'member' && (
          currentUser ? (
            <UserPortalPage
              currentUser={currentUser}
              onUpdateUser={(updated) => setCurrentUser(updated)}
              onLogout={handleUserLogout}
              onNavigate={handleNavigate}
            />
          ) : (
            <div className="py-20 text-center px-4">
              <h2 className="text-xl font-bold text-white mb-2">Üye Girişi Gerekli</h2>
              <p className="text-sm text-neutral-400 mb-6">
                Mutfak kontrol panelinizi, reçetelerinizi ve faturalarınızı görüntülemek için lütfen giriş yapın.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleOpenUserLoginModal('login')}
                  className="px-5 py-2.5 rounded-xl bg-[#c24128] text-white text-xs font-semibold cursor-pointer"
                >
                  Giriş Yap
                </button>
                <button
                  onClick={handleQuickUserLogin}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 text-neutral-200 text-xs font-semibold border border-neutral-700 cursor-pointer"
                >
                  Demo Hesapla Başla
                </button>
              </div>
            </div>
          )
        )}

        {currentPage === 'admin' && (
          <AdminPage
            onNavigateSite={handleNavigate}
            onLogout={() => {
              setIsAdminLoggedIn(false);
              handleNavigate('home');
            }}
            activeTab={adminActiveTab}
            onTabChange={(tab) => setAdminActiveTab(tab)}
            leads={leads}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            onSaveLeadNote={handleSaveLeadNote}
            onDeleteLead={handleDeleteLead}
            reviews={reviews}
            onUpdateReview={handleUpdateReview}
            onAddReview={handleAddReview}
            onDeleteReview={handleDeleteReview}
            onToggleReviewFeatured={handleToggleReviewFeatured}
          />
        )}
      </main>

      {/* Footer (Hidden on Admin Page for full workspace focus) */}
      {currentPage !== 'admin' && (
        <Footer
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenRegister={() => setIsRegisterOpen(true)}
          onOpenUserLogin={handleOpenUserLoginModal}
        />
      )}

      {/* Restoranını Ücretsiz Ekle Modal Formu (Anlık CRM Senkronizasyonlu) */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegisterSuccess={handleAddNewLead}
        onViewInAdmin={handleViewLeadInAdmin}
      />

      {/* Blog Makale Okuyucu Modalı */}
      <BlogModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      {/* Yönetici Girişi Modalı */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          handleNavigate('admin');
        }}
      />

      {/* Kullanıcı Girişi & Üyelik Modalı */}
      <UserLoginModal
        isOpen={isUserLoginOpen}
        onClose={() => setIsUserLoginOpen(false)}
        onLoginSuccess={handleUserLoginSuccess}
        onOpenAdminLogin={() => {
          setIsUserLoginOpen(false);
          setIsAdminLoginOpen(true);
        }}
        initialTab={userLoginTab}
      />

      {/* GastroBot AI Asistanı */}
      <GastroBot
        onOpenRegister={() => setIsRegisterOpen(true)}
        onNavigateModules={() => handleNavigate('modules')}
      />
    </div>
  );
}
