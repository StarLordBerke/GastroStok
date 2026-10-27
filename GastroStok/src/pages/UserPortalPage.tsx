import React, { useState } from 'react';
import { 
  UserAccount, 
  SavedRecipe, 
  SubscriptionInvoice, 
  TeamMember,
  PageView 
} from '../types';
import { 
  User, 
  Building, 
  CreditCard, 
  BookOpen, 
  Bell, 
  Users, 
  Shield, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  Trash2, 
  Download, 
  AlertTriangle, 
  Clock, 
  ChefHat, 
  DollarSign, 
  LogOut, 
  ExternalLink,
  Save,
  Check,
  TrendingUp,
  Receipt,
  Smartphone,
  Key,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface UserPortalPageProps {
  currentUser: UserAccount;
  onUpdateUser: (updated: UserAccount) => void;
  onLogout: () => void;
  onNavigate: (page: PageView) => void;
  initialTab?: string;
}

const INITIAL_RECIPES: SavedRecipe[] = [
  {
    id: 'rcp-1',
    name: 'Dana Bonfile & Trüflü Patates Püresi',
    category: 'Ana Yemek',
    portionCost: 185.50,
    portionPrice: 580.00,
    wasteTarget: 4.5,
    prepTime: '22 dk',
    ingredientsCount: 7,
    lastUpdated: 'Dün, 16:30'
  },
  {
    id: 'rcp-2',
    name: 'Izgara Norveç Somonu & Kuşkonmaz',
    category: 'Balık & Deniz Ürünleri',
    portionCost: 142.00,
    portionPrice: 490.00,
    wasteTarget: 3.8,
    prepTime: '18 dk',
    ingredientsCount: 6,
    lastUpdated: '3 gün önce'
  },
  {
    id: 'rcp-3',
    name: 'Karamelize Soğanlı Smash Burger (Double)',
    category: 'Casual & Burger',
    portionCost: 92.40,
    portionPrice: 320.00,
    wasteTarget: 2.5,
    prepTime: '12 dk',
    ingredientsCount: 9,
    lastUpdated: 'Geçen hafta'
  },
  {
    id: 'rcp-4',
    name: 'Ev Yapımı Pappardelle Osso Buco Ragù',
    category: 'Makarna & Hamur',
    portionCost: 88.00,
    portionPrice: 380.00,
    wasteTarget: 3.0,
    prepTime: '25 dk',
    ingredientsCount: 8,
    lastUpdated: '12 Ekim 2026'
  },
  {
    id: 'rcp-5',
    name: 'Orijinal Mascarpone Tiramisù Tradizionale',
    category: 'Tatlı',
    portionCost: 46.50,
    portionPrice: 210.00,
    wasteTarget: 1.5,
    prepTime: '15 dk',
    ingredientsCount: 5,
    lastUpdated: '08 Ekim 2026'
  }
];

const INITIAL_INVOICES: SubscriptionInvoice[] = [
  {
    id: 'inv-001',
    invoiceNo: 'GST-2026-8941',
    date: '14 Ekim 2026',
    amount: '₺1.490,00',
    plan: 'Pro Mutfak (Yıllık İndirimli)',
    status: 'Ödendi'
  },
  {
    id: 'inv-002',
    invoiceNo: 'GST-2026-7812',
    date: '14 Eylül 2026',
    amount: '₺1.490,00',
    plan: 'Pro Mutfak',
    status: 'Ödendi'
  },
  {
    id: 'inv-003',
    invoiceNo: 'GST-2026-6620',
    date: '14 Ağustos 2026',
    amount: '₺1.490,00',
    plan: 'Pro Mutfak',
    status: 'Ödendi'
  }
];

const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@bistrogalata.com',
    role: 'Baş Aşçı',
    accessLevel: 'Yönetici',
    status: 'Aktif'
  },
  {
    id: 'team-2',
    name: 'Canan Güneş',
    email: 'canan@bistrogalata.com',
    role: 'Sous Chef',
    accessLevel: 'Düzenleyebilir',
    status: 'Aktif'
  },
  {
    id: 'team-3',
    name: 'Burak Demir',
    email: 'burak@bistrogalata.com',
    role: 'Depo Sorumlusu',
    accessLevel: 'Düzenleyebilir',
    status: 'Aktif'
  },
  {
    id: 'team-4',
    name: 'Emre Çetin',
    email: 'emre@bistrogalata.com',
    role: 'Barista',
    accessLevel: 'Görüntüleyici',
    status: 'Davet Gönderildi'
  }
];

export const UserPortalPage: React.FC<UserPortalPageProps> = ({
  currentUser,
  onUpdateUser,
  onLogout,
  onNavigate,
  initialTab = 'dashboard'
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  
  // Profile form state
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [restaurantName, setRestaurantName] = useState(currentUser.restaurantName);
  const [restaurantType, setRestaurantType] = useState(currentUser.restaurantType);
  const [city, setCity] = useState(currentUser.city);
  const [posSystem, setPosSystem] = useState(currentUser.posSystem);
  const [role, setRole] = useState(currentUser.role);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  // Notifications state
  const [notifState, setNotifState] = useState(currentUser.notifications);
  const [threshold, setThreshold] = useState(currentUser.stockAlertThreshold || 20);
  const [notifSuccessMsg, setNotifSuccessMsg] = useState('');

  // Recipes state
  const [recipes, setRecipes] = useState<SavedRecipe[]>(INITIAL_RECIPES);
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);
  const [newRecipeName, setNewRecipeName] = useState('');
  const [newRecipeCategory, setNewRecipeCategory] = useState('Ana Yemek');
  const [newRecipeCost, setNewRecipeCost] = useState('120');
  const [newRecipePrice, setNewRecipePrice] = useState('360');
  const [newRecipePrepTime, setNewRecipePrepTime] = useState('20 dk');
  const [newRecipeWaste, setNewRecipeWaste] = useState('4.0');

  // Team state
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [isAddTeamOpen, setIsAddTeamOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamEmail, setNewTeamEmail] = useState('');
  const [newTeamRole, setNewTeamRole] = useState<TeamMember['role']>('Sous Chef');
  const [newTeamAccess, setNewTeamAccess] = useState<TeamMember['accessLevel']>('Düzenleyebilir');

  // Security state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState('');
  const [twoFactor, setTwoFactor] = useState(currentUser.twoFactorEnabled || false);

  // Invoices & Toast state
  const [invoices, setInvoices] = useState<SubscriptionInvoice[]>(INITIAL_INVOICES);
  const [invoiceToast, setInvoiceToast] = useState('');
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 3500);
  };

  // Save profile changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserAccount = {
      ...currentUser,
      fullName,
      email,
      phone,
      restaurantName,
      restaurantType,
      city,
      posSystem,
      role
    };
    onUpdateUser(updated);
    setProfileSuccessMsg('Profil ve işletme bilgileriniz başarıyla güncellendi.');
    setTimeout(() => setProfileSuccessMsg(''), 4000);
  };

  // Save notifications & thresholds
  const handleSaveNotifs = () => {
    const updated: UserAccount = {
      ...currentUser,
      notifications: notifState,
      stockAlertThreshold: threshold
    };
    onUpdateUser(updated);
    setNotifSuccessMsg('Bildirim tercihleri ve kritik stok eşiği kaydedildi.');
    setTimeout(() => setNotifSuccessMsg(''), 4000);
  };

  // Add recipe
  const handleAddRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipeName.trim()) return;

    const newR: SavedRecipe = {
      id: `rcp-${Date.now().toString().slice(-5)}`,
      name: newRecipeName.trim(),
      category: newRecipeCategory,
      portionCost: parseFloat(newRecipeCost) || 0,
      portionPrice: parseFloat(newRecipePrice) || 0,
      wasteTarget: parseFloat(newRecipeWaste) || 3.0,
      prepTime: newRecipePrepTime || '15 dk',
      ingredientsCount: 6,
      lastUpdated: 'Az önce'
    };

    setRecipes([newR, ...recipes]);
    setNewRecipeName('');
    setIsAddRecipeOpen(false);
  };

  const handleDeleteRecipe = (id: string) => {
    setRecipes(recipes.filter(r => r.id !== id));
  };

  // Add team member
  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim() || !newTeamEmail.trim()) return;

    const newM: TeamMember = {
      id: `team-${Date.now().toString().slice(-4)}`,
      name: newTeamName.trim(),
      email: newTeamEmail.trim(),
      role: newTeamRole,
      accessLevel: newTeamAccess,
      status: 'Davet Gönderildi'
    };

    setTeam([...team, newM]);
    setNewTeamName('');
    setNewTeamEmail('');
    setIsAddTeamOpen(false);
  };

  const handleDeleteTeam = (id: string) => {
    setTeam(team.filter(m => m.id !== id));
  };

  // Password change
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    if (newPass.length < 6) {
      setPassError('Yeni şifreniz en az 6 karakter olmalıdır.');
      return;
    }
    if (newPass !== confirmPass) {
      setPassError('Yeni şifreler birbiriyle eşleşmiyor.');
      return;
    }
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    setSecuritySuccess('Şifreniz başarıyla güncellendi. Yeni şifreniz aktif.');
    setTimeout(() => setSecuritySuccess(''), 4000);
  };

  const handleDownloadInvoice = (invNo: string) => {
    setInvoiceToast(`${invNo} numaralı e-arşiv fatura PDF olarak indiriliyor...`);
    setTimeout(() => setInvoiceToast(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0e1017] text-neutral-100 py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Toast Notice Banner */}
      {toastNotice && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 p-4 rounded-xl bg-[#1a1d29] border border-[#c24128]/60 text-white text-xs shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastNotice}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Member Header Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#171926] via-[#141622] to-[#1d161a] border border-neutral-700/80 p-6 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c24128]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c24128] to-[#8d2a17] text-white flex items-center justify-center font-bold text-2xl shadow-xl shadow-[#c24128]/30 shrink-0">
                {currentUser.fullName.charAt(0)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {currentUser.fullName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    {currentUser.tier} Üye
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-neutral-400">
                  <span className="flex items-center gap-1 text-white font-medium">
                    <Building className="w-3.5 h-3.5 text-[#f26a4f]" />
                    {currentUser.restaurantName}
                  </span>
                  <span>•</span>
                  <span>{currentUser.city}</span>
                  <span>•</span>
                  <span className="text-neutral-300">{currentUser.role}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <button
                onClick={() => onNavigate('modules')}
                className="flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-[#1a1c28] hover:bg-[#222536] text-neutral-200 border border-neutral-700/80 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ChefHat className="w-3.5 h-3.5 text-[#f26a4f]" />
                <span>Mutfak Modülleri</span>
              </button>

              <button
                onClick={() => onNavigate('home')}
                className="flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-[#1a1c28] hover:bg-[#222536] text-neutral-200 border border-neutral-700/80 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                <span>Anasayfa</span>
              </button>

              <button
                onClick={onLogout}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Güvenli Çıkış"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Çıkış</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-neutral-800/80">
            <div className="p-3 rounded-xl bg-[#0e1017]/70 border border-neutral-800">
              <span className="text-[11px] text-neutral-400 block mb-0.5">Abonelik Paketi</span>
              <p className="text-sm font-bold text-white flex items-center gap-1">
                <span>{currentUser.tier} Mutfak</span>
                <span className="text-[10px] text-emerald-400 font-mono font-normal">Yıllık</span>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#0e1017]/70 border border-neutral-800">
              <span className="text-[11px] text-neutral-400 block mb-0.5">Kayıtlı Reçeteler</span>
              <p className="text-sm font-bold text-[#f26a4f] font-mono">
                {recipes.length} Menü Kalemi
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#0e1017]/70 border border-neutral-800">
              <span className="text-[11px] text-neutral-400 block mb-0.5">Kritik Stok Uyarısı</span>
              <p className="text-sm font-bold text-amber-400 font-mono">
                %{currentUser.stockAlertThreshold || 20} Eşik Seviyesi
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#0e1017]/70 border border-neutral-800">
              <span className="text-[11px] text-neutral-400 block mb-0.5">Mutfak Ekip Üyeleri</span>
              <p className="text-sm font-bold text-white font-mono">
                {team.length} Personel Aktif
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none border-b border-neutral-800">
          {[
            { id: 'dashboard', label: 'Genel Bakış', icon: TrendingUp },
            { id: 'recipes', label: `Reçetelerim (${recipes.length})`, icon: BookOpen },
            { id: 'profile', label: 'Profil & Restoran', icon: Building },
            { id: 'billing', label: 'Abonelik & Faturalar', icon: CreditCard },
            { id: 'alerts', label: 'Stok Eşikleri & Bildirim', icon: Bell },
            { id: 'team', label: `Mutfak Ekibi (${team.length})`, icon: Users },
            { id: 'security', label: 'Güvenlik & Şifre', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#c24128] text-white shadow-lg shadow-[#c24128]/25'
                    : 'bg-[#14161f] text-neutral-400 hover:text-white hover:bg-[#1a1c28] border border-neutral-800/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT AREAS */}

        {/* TAB 1: DASHBOARD / GENEL BAKIŞ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#14161f] border border-neutral-800 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-neutral-400">Bu Ay Önlenebilir Fire Tasarrufu</span>
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white font-mono">₺34.850,00</div>
                <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                  <span>↑ %18,4</span>
                  <span className="text-neutral-400">geçen aya göre tasarruf artışı</span>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#14161f] border border-neutral-800 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-neutral-400">Kritik Stok Uyarıları (Acil)</span>
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-amber-300 font-mono">2 Kalem</div>
                <p className="text-xs text-neutral-400 mt-1">
                  Dana Bonfile (Kalan: 3.2 kg), Taze Krema (Kalan: 4 lt)
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#14161f] border border-neutral-800 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-neutral-400">POS & Mutfak Entegrasyonu</span>
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white font-mono">{currentUser.posSystem || 'SambaPOS'}</div>
                <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Canlı senkronizasyon aktif</span>
                </p>
              </div>
            </div>

            {/* Quick Navigation Cards into GastroStok Operations */}
            <div className="p-6 rounded-2xl bg-[#14161f] border border-neutral-800">
              <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#f26a4f]" />
                Mutfak İşlem Kısayolları
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  onClick={() => onNavigate('modules')}
                  className="p-4 rounded-xl bg-[#181a24] hover:bg-[#202332] border border-neutral-700/60 text-left transition-colors cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#c24128]/20 text-[#f26a4f] flex items-center justify-center mb-2 group-hover:bg-[#c24128] group-hover:text-white transition-colors">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-white mb-1">Stok & Gramaj Girişi</h3>
                  <p className="text-[11px] text-neutral-400">Bugünkü sevkiyatı ve faturalı girişleri barkodla kaydet.</p>
                </button>

                <button
                  onClick={() => onNavigate('modules')}
                  className="p-4 rounded-xl bg-[#181a24] hover:bg-[#202332] border border-neutral-700/60 text-left transition-colors cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-white mb-1">Vardiya Fire Raporu</h3>
                  <p className="text-[11px] text-neutral-400">Hazırlık, yanık veya bozulma firelerini gramaj bazında işle.</p>
                </button>

                <button
                  onClick={() => onNavigate('modules')}
                  className="p-4 rounded-xl bg-[#181a24] hover:bg-[#202332] border border-neutral-700/60 text-left transition-colors cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-white mb-1">AI Talep & Sipariş</h3>
                  <p className="text-[11px] text-neutral-400">Yarınki hava durumu ve rezervasyonlara göre tedarik tahmini yap.</p>
                </button>

                <button
                  onClick={() => setActiveTab('recipes')}
                  className="p-4 rounded-xl bg-[#181a24] hover:bg-[#202332] border border-neutral-700/60 text-left transition-colors cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-white mb-1">Yeni Reçete Ekle</h3>
                  <p className="text-[11px] text-neutral-400">Menü kaleminin maliyet ve fire hedefini anında sisteme ekle.</p>
                </button>
              </div>
            </div>

            {/* Recent Activity Log */}
            <div className="p-6 rounded-2xl bg-[#14161f] border border-neutral-800">
              <h2 className="text-sm font-bold text-white mb-4">Son İşlem Günlüğü (Mutfak & Sistem)</h2>
              <div className="space-y-3">
                {[
                  { title: 'Haftalık Et & Kümes Hayvanı Siparişi İletildi', time: 'Bugün 10:15', by: 'Ahmet Şef', tag: 'Tedarikçi Siparişi' },
                  { title: '4.8 kg Dana Antrikot trim firesi kaydedildi', time: 'Dün 22:40', by: 'Canan Güneş (Sous Chef)', tag: 'Fire Girişi' },
                  { title: 'SambaPOS günlük 312 porsiyon satış verisi senkronize edildi', time: 'Dün 23:59', by: 'Otomatik Entegrasyon', tag: 'POS Verisi' },
                  { title: 'Taze Krema kritik stok uyarısı SMS olarak iletildi', time: '2 gün önce', by: 'GastroStok Bot', tag: 'SMS Bildirimi' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#0e1017] border border-neutral-800 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#f26a4f]"></div>
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="text-[11px] text-neutral-400">{item.by} • {item.time}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 text-[10px] font-mono">
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RECIPES (Kayıtlı Reçetelerim) */}
        {activeTab === 'recipes' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Reçetelerim & Porsiyon Maliyetleri</h2>
                <p className="text-xs text-neutral-400">
                  Her tabağın gramaj maliyetini, hedef fire oranını ve net kârlılık marjını takip edin.
                </p>
              </div>

              <button
                onClick={() => setIsAddRecipeOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#c24128] hover:bg-[#d94b30] text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#c24128]/25"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Reçete Oluştur</span>
              </button>
            </div>

            {/* Add Recipe Modal Overlay */}
            {isAddRecipeOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="w-full max-w-md bg-[#161822] border border-neutral-700 rounded-2xl p-6 shadow-2xl">
                  <h3 className="text-base font-bold text-white mb-1">Yeni Reçete Kartı Ekle</h3>
                  <p className="text-xs text-neutral-400 mb-4">Porsiyon maliyeti ve menü satış fiyatını girin.</p>

                  <form onSubmit={handleAddRecipe} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">Yemek / Menü Adı *</label>
                      <input
                        type="text"
                        required
                        value={newRecipeName}
                        onChange={(e) => setNewRecipeName(e.target.value)}
                        placeholder="Örn: Trüflü Levrek Ceviche"
                        className="w-full px-3 py-2 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1">Kategori</label>
                        <select
                          value={newRecipeCategory}
                          onChange={(e) => setNewRecipeCategory(e.target.value)}
                          className="w-full px-3 py-2 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                        >
                          <option value="Ana Yemek">Ana Yemek</option>
                          <option value="Başlangıç & Meze">Başlangıç & Meze</option>
                          <option value="Balık & Deniz">Balık & Deniz</option>
                          <option value="Tatlı">Tatlı</option>
                          <option value="İçecek & Kokteyl">İçecek & Kokteyl</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1">Hazırlık Süresi</label>
                        <input
                          type="text"
                          value={newRecipePrepTime}
                          onChange={(e) => setNewRecipePrepTime(e.target.value)}
                          placeholder="20 dk"
                          className="w-full px-3 py-2 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1">Porsiyon Maliyeti (₺) *</label>
                        <input
                          type="number"
                          step="0.1"
                          required
                          value={newRecipeCost}
                          onChange={(e) => setNewRecipeCost(e.target.value)}
                          className="w-full px-3 py-2 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1">Menü Fiyatı (₺) *</label>
                        <input
                          type="number"
                          step="1"
                          required
                          value={newRecipePrice}
                          onChange={(e) => setNewRecipePrice(e.target.value)}
                          className="w-full px-3 py-2 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">Hedef Fire Oranı (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newRecipeWaste}
                        onChange={(e) => setNewRecipeWaste(e.target.value)}
                        className="w-full px-3 py-2 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsAddRecipeOpen(false)}
                        className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        İptal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#c24128] hover:bg-[#d94b30] text-white transition-colors cursor-pointer"
                      >
                        Reçeteyi Kaydet
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Recipe Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map((rcp) => {
                const profitMargin = rcp.portionPrice > 0 
                  ? (((rcp.portionPrice - rcp.portionCost) / rcp.portionPrice) * 100).toFixed(1)
                  : '0';
                const foodCostPercent = rcp.portionPrice > 0
                  ? ((rcp.portionCost / rcp.portionPrice) * 100).toFixed(1)
                  : '0';

                return (
                  <div
                    key={rcp.id}
                    className="p-5 rounded-2xl bg-[#14161f] border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#c24128]/20 text-[#f26a4f] border border-[#c24128]/30">
                          {rcp.category}
                        </span>
                        <button
                          onClick={() => handleDeleteRecipe(rcp.id)}
                          className="p-1 rounded text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Reçeteyi Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h3 className="text-sm font-bold text-white mb-3 line-clamp-2">
                        {rcp.name}
                      </h3>

                      <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-[#0c0e14] border border-neutral-800/80 mb-3 text-xs">
                        <div>
                          <span className="text-[10px] text-neutral-400 block">Porsiyon Maliyeti</span>
                          <span className="font-bold text-white font-mono">₺{rcp.portionCost.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-neutral-400 block">Menü Satış Fiyatı</span>
                          <span className="font-bold text-emerald-400 font-mono">₺{rcp.portionPrice.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-neutral-400 block">Food Cost %</span>
                          <span className="font-bold text-amber-400 font-mono">%{foodCostPercent}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-neutral-400 block">Brüt Kâr Marjı</span>
                          <span className="font-bold text-emerald-400 font-mono">%{profitMargin}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-neutral-500" />
                        {rcp.prepTime}
                      </span>
                      <span>Hedef Fire: %{rcp.wasteTarget}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: PROFILE & RESTAURANT (Profil & İşletme) */}
        {activeTab === 'profile' && (
          <div className="p-6 rounded-2xl bg-[#14161f] border border-neutral-800 space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-base font-bold text-white">Profil & Restoran Bilgileri</h2>
              <p className="text-xs text-neutral-400">
                F&B ekibiniz ve faturalandırma için geçerli olan işletme detaylarını güncelleyin.
              </p>
            </div>

            {profileSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{profileSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Yetkili Adı Soyadı</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Mutfaktaki Rol / Unvan</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Mutfak Şefi & Kurucu"
                    className="w-full px-3.5 py-2.5 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">E-Posta Adresi (Giriş için kullanılır)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">Telefon Numarası (SMS Bildirimleri için)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                  />
                </div>
              </div>

              <div className="border-t border-neutral-800 pt-4">
                <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3">İşletme Detayları</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">Restoran / Mekan Adı</label>
                    <input
                      type="text"
                      required
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">Konum / Şehir</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">Mutfak & Konsept Tipi</label>
                    <select
                      value={restaurantType}
                      onChange={(e) => setRestaurantType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                    >
                      <option value="Alakart Restoran & Şarap Evi">Alakart Restoran & Şarap Evi</option>
                      <option value="Bistro & Brasserie">Bistro & Brasserie</option>
                      <option value="Artisan Kafe & Fırın">Artisan Kafe & Fırın</option>
                      <option value="Fast Casual & Burger">Fast Casual & Burger</option>
                      <option value="Otel Mutfağı">Otel Mutfağı</option>
                      <option value="Meyhane & Balıkçı">Meyhane & Balıkçı</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">Kullanılan Kasa / POS Sistemi</label>
                    <input
                      type="text"
                      value={posSystem}
                      onChange={(e) => setPosSystem(e.target.value)}
                      placeholder="SambaPOS, Simpra, Mikro, Vega vb."
                      className="w-full px-3.5 py-2.5 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#c24128] hover:bg-[#d94b30] text-white transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-[#c24128]/25"
                >
                  <Save className="w-4 h-4" />
                  <span>Değişiklikleri Kaydet</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: BILLING & SUBSCRIPTION (Abonelik & Faturalar) */}
        {activeTab === 'billing' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {invoiceToast && (
              <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{invoiceToast}</span>
              </div>
            )}

            {/* Current Plan Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#161824] via-[#141620] to-[#1e151b] border border-neutral-700/80">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#c24128] text-white">
                      Aktif Plan: Pro Mutfak
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">Yıllık Taahhüt</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">₺1.490,00 <span className="text-xs font-normal text-neutral-400">/ ay (Yıllık peşin faturalandırılır)</span></h2>
                  <p className="text-xs text-neutral-400">
                    Bir sonraki yenileme tarihi: <strong className="text-white">{currentUser.tierExpiry}</strong>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => showToast('Plan değiştirme talebiniz F&B müşteri danışmanımıza iletildi.')}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer border border-neutral-700"
                  >
                    Planı Değiştir
                  </button>
                  <button
                    onClick={() => showToast('Kurumsal çok şubeli Enterprise paket danışmanımız en kısa sürede sizi arayacaktır.')}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#c24128] hover:bg-[#d94b30] text-white transition-colors cursor-pointer shadow-lg shadow-[#c24128]/25"
                  >
                    Enterprise Çok Şube'ye Yükselt
                  </button>
                </div>
              </div>

              {/* Plan Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-neutral-800 text-xs">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sınırsız Reçete & Gramaj Girişi</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>5 Adet Mutfak Ekip Kullanıcısı</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kritik Stok SMS & WhatsApp Uyarıları</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-6 rounded-2xl bg-[#14161f] border border-neutral-800">
              <h2 className="text-sm font-bold text-white mb-3">Kayıtlı Ödeme Yöntemi</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0e1017] border border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-[10px] text-white font-mono">
                    VISA
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">•••• •••• •••• 4812</p>
                    <p className="text-[11px] text-neutral-400">Son Kullanma: 08/29 • GastroStok Otomatik Çekim</p>
                  </div>
                </div>

                <button
                  onClick={() => showToast('Ödeme kartı güncelleme penceresi simüle edildi.')}
                  className="text-xs text-[#f26a4f] hover:underline font-medium cursor-pointer"
                >
                  Kartı Güncelle
                </button>
              </div>
            </div>

            {/* Invoices History Table */}
            <div className="p-6 rounded-2xl bg-[#14161f] border border-neutral-800">
              <h2 className="text-sm font-bold text-white mb-4">Fatura Geçmişi & Makbuzlar</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 font-medium pb-2">
                      <th className="py-2.5 px-3">Fatura No</th>
                      <th className="py-2.5 px-3">Tarih</th>
                      <th className="py-2.5 px-3">Paket</th>
                      <th className="py-2.5 px-3">Tutar</th>
                      <th className="py-2.5 px-3">Durum</th>
                      <th className="py-2.5 px-3 text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-neutral-800/20 transition-colors">
                        <td className="py-3 px-3 font-mono font-medium text-white">{inv.invoiceNo}</td>
                        <td className="py-3 px-3 text-neutral-400">{inv.date}</td>
                        <td className="py-3 px-3 text-neutral-300">{inv.plan}</td>
                        <td className="py-3 px-3 font-mono font-semibold text-white">{inv.amount}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleDownloadInvoice(inv.invoiceNo)}
                            className="inline-flex items-center gap-1 text-[11px] text-neutral-300 hover:text-white hover:underline cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-[#f26a4f]" />
                            <span>PDF İndir</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ALERTS & THRESHOLDS (Stok Eşikleri & Bildirim) */}
        {activeTab === 'alerts' && (
          <div className="p-6 rounded-2xl bg-[#14161f] border border-neutral-800 space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-base font-bold text-white">Stok Eşik Değerleri & Bildirim Ayarları</h2>
              <p className="text-xs text-neutral-400">
                Depo seviyeleri kritik sınırın altına indiğinde veya SKT yaklaştığında anında uyarı alın.
              </p>
            </div>

            {notifSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{notifSuccessMsg}</span>
              </div>
            )}

            {/* Threshold Slider */}
            <div className="p-5 rounded-xl bg-[#0e1017] border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white">Kritik Stok Uyarı Eşiği (%)</h3>
                  <p className="text-[11px] text-neutral-400">
                    Toplam stok miktarı bu yüzdenin altına indiğinde sistem otomatik uyarı üretir.
                  </p>
                </div>
                <span className="text-lg font-bold text-[#f26a4f] font-mono">%{threshold}</span>
              </div>

              <input
                type="range"
                min="10"
                max="40"
                step="5"
                value={threshold}
                onChange={(e) => setThreshold(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#c24128]"
              />

              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>%10 (Çok Kritik)</span>
                <span>%20 (Tavsiye Edilen)</span>
                <span>%30 (Güvenli Tampon)</span>
                <span>%40 (Yüksek Önlem)</span>
              </div>
            </div>

            {/* Notification Toggles */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Bildirim Kanalları</h3>

              {[
                {
                  key: 'criticalStockSms' as const,
                  title: 'Kritik Stok SMS Bildirimi',
                  desc: 'Eşik altına düşen hammadde olduğunda yetkili şef telefonuna anlık SMS gönder.',
                  channel: 'SMS'
                },
                {
                  key: 'emailAlerts' as const,
                  title: 'Son Kullanma Tarihi (SKT) Uyarıları',
                  desc: 'Depoda SKT tarihine 3 gün kalan ürünler için günlük sabah 08:00 e-posta listesi.',
                  channel: 'E-Posta'
                },
                {
                  key: 'weeklyDigest' as const,
                  title: 'Haftalık Mutfak Fire Özeti & Kârlılık Bülteni',
                  desc: 'Pazartesi sabahları haftalık porsiyon fire ve maliyet tasarruf raporu.',
                  channel: 'Bülten'
                },
                {
                  key: 'smsAlerts' as const,
                  title: 'Vardiya Sonu Kapanış Özeti',
                  desc: 'Gece kapanışında girilen zayiat dökümünü yöneticiye ilet.',
                  channel: 'Mobil'
                }
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 rounded-xl bg-[#0e1017] border border-neutral-800"
                >
                  <div className="pr-4">
                    <p className="text-xs font-semibold text-white">{item.title}</p>
                    <p className="text-[11px] text-neutral-400">{item.desc}</p>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={notifState[item.key]}
                      onChange={(e) => setNotifState({ ...notifState, [item.key]: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c24128]"></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSaveNotifs}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#c24128] hover:bg-[#d94b30] text-white transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-[#c24128]/25"
              >
                <Save className="w-4 h-4" />
                <span>Ayarları Kaydet</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: TEAM (Mutfak Ekibi) */}
        {activeTab === 'team' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Mutfak Ekibi & Yetkilendirme</h2>
                <p className="text-xs text-neutral-400">
                  Sous Chef, Barista ve depo sorumlularınıza hesap açarak mutfak operasyonlarını paylaştırın.
                </p>
              </div>

              <button
                onClick={() => setIsAddTeamOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#c24128] hover:bg-[#d94b30] text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#c24128]/25"
              >
                <Plus className="w-4 h-4" />
                <span>Ekip Üyesi Davet Et</span>
              </button>
            </div>

            {/* Add Team Modal */}
            {isAddTeamOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="w-full max-w-md bg-[#161822] border border-neutral-700 rounded-2xl p-6 shadow-2xl">
                  <h3 className="text-base font-bold text-white mb-1">Mutfak Ekip Üyesi Davet Et</h3>
                  <p className="text-xs text-neutral-400 mb-4">GastroStok sistemine davet e-postası gönderilecektir.</p>

                  <form onSubmit={handleAddTeam} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">Personel Adı Soyadı *</label>
                      <input
                        type="text"
                        required
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                        placeholder="Örn: Mehmet Can"
                        className="w-full px-3 py-2 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">E-Posta Adresi *</label>
                      <input
                        type="email"
                        required
                        value={newTeamEmail}
                        onChange={(e) => setNewTeamEmail(e.target.value)}
                        placeholder="mehmet@bistrogalata.com"
                        className="w-full px-3 py-2 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1">Mutfak Rolü</label>
                        <select
                          value={newTeamRole}
                          onChange={(e) => setNewTeamRole(e.target.value as TeamMember['role'])}
                          className="w-full px-3 py-2 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                        >
                          <option value="Baş Aşçı">Baş Aşçı</option>
                          <option value="Sous Chef">Sous Chef</option>
                          <option value="Barista">Barista</option>
                          <option value="Depo Sorumlusu">Depo Sorumlusu</option>
                          <option value="F&B Müdürü">F&B Müdürü</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-300 mb-1">Erişim Yetkisi</label>
                        <select
                          value={newTeamAccess}
                          onChange={(e) => setNewTeamAccess(e.target.value as TeamMember['accessLevel'])}
                          className="w-full px-3 py-2 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                        >
                          <option value="Düzenleyebilir">Düzenleyebilir</option>
                          <option value="Görüntüleyici">Sadece Görüntüle</option>
                          <option value="Yönetici">Tam Yetkili Yönetici</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsAddTeamOpen(false)}
                        className="px-4 py-2 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        İptal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#c24128] hover:bg-[#d94b30] text-white transition-colors cursor-pointer"
                      >
                        Davet Gönder
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Team Table */}
            <div className="p-6 rounded-2xl bg-[#14161f] border border-neutral-800">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-800 text-neutral-400 font-medium pb-2">
                      <th className="py-2.5 px-3">Personel</th>
                      <th className="py-2.5 px-3">Rol</th>
                      <th className="py-2.5 px-3">Yetki Düzeyi</th>
                      <th className="py-2.5 px-3">Durum</th>
                      <th className="py-2.5 px-3 text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {team.map((member) => (
                      <tr key={member.id} className="hover:bg-neutral-800/20 transition-colors">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-[#c24128]/20 text-[#f26a4f] flex items-center justify-center font-bold text-xs">
                              {member.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-white">{member.name}</p>
                              <p className="text-[11px] text-neutral-400 font-mono">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-neutral-300">{member.role}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-neutral-800 text-neutral-300 font-medium">
                            {member.accessLevel}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            member.status === 'Aktif'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          {member.id !== 'team-1' ? (
                            <button
                              onClick={() => handleDeleteTeam(member.id)}
                              className="p-1 rounded text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                              title="Ekip Üyesini Çıkar"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <span className="text-[10px] text-neutral-500 italic">Hesap Sahibi</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SECURITY & PASSWORD (Güvenlik & Şifre) */}
        {activeTab === 'security' && (
          <div className="p-6 rounded-2xl bg-[#14161f] border border-neutral-800 space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-base font-bold text-white">Güvenlik & Oturum Yönetimi</h2>
              <p className="text-xs text-neutral-400">
                Hesap şifrenizi yenileyin ve aktif mutfak tablet cihazlarını denetleyin.
              </p>
            </div>

            {passError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{passError}</span>
              </div>
            )}

            {securitySuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{securitySuccess}</span>
              </div>
            )}

            {/* Password Change Form */}
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Şifre Değiştir</h3>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Mevcut Şifre</label>
                <input
                  type="password"
                  required
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Yeni Şifre (En az 6 karakter)</label>
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Yeni Şifre (Tekrar)</label>
                <input
                  type="password"
                  required
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-[#0e1017] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#c24128]"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#c24128] hover:bg-[#d94b30] text-white transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-[#c24128]/25"
              >
                <Key className="w-4 h-4" />
                <span>Şifreyi Güncelle</span>
              </button>
            </form>

            {/* 2FA Toggle */}
            <div className="border-t border-neutral-800 pt-5">
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#0e1017] border border-neutral-800">
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>İki Aşamalı Doğrulama (2FA)</span>
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Giriş yaparken telefonunuza tek kullanımlık SMS onay kodu gönderilsin.
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={twoFactor}
                    onChange={(e) => setTwoFactor(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c24128]"></div>
                </label>
              </div>
            </div>

            {/* Active Devices */}
            <div className="border-t border-neutral-800 pt-5">
              <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3">Aktif Oturumlar & Cihazlar</h3>
              
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0e1017] border border-neutral-800 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                    <div>
                      <p className="font-semibold text-white">Apple Mac OS • Chrome 130 (Bu Oturum)</p>
                      <p className="text-[11px] text-neutral-400">İstanbul, Türkiye • IP: 176.234.xx.xx</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono font-medium">Şu an aktif</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0e1017] border border-neutral-800 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-500"></div>
                    <div>
                      <p className="font-semibold text-white">Mutfak Tableti • iPad Safari</p>
                      <p className="text-[11px] text-neutral-400">Bistro Galata Mutfak İstasyonu • 2 saat önce</p>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast('Mutfak tableti oturumu güvenle sonlandırıldı.')}
                    className="text-[11px] text-red-400 hover:underline cursor-pointer"
                  >
                    Oturumu Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
