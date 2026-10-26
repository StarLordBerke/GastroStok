import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  MessageSquare, 
  Store, 
  Settings, 
  ShieldCheck, 
  LogOut, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  Eye, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  BarChart2, 
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Bell,
  Sliders,
  Check,
  X,
  Send,
  Download,
  Calendar,
  Lock,
  Sparkles,
  UtensilsCrossed,
  Star,
  Quote,
  MapPin
} from 'lucide-react';
import { PageView, BlogPost, LeadItem, ReviewItem } from '../types';
import { BLOG_POSTS } from '../data/blogData';
import { INITIAL_REVIEWS } from '../data/reviewsData';

export type AdminTab = 'dashboard' | 'blog' | 'leads' | 'messages' | 'venues' | 'settings' | 'team' | 'reviews';

export interface AdminPageProps {
  onNavigateSite: (page: PageView) => void;
  onLogout: () => void;
  activeTab?: AdminTab;
  onTabChange?: (tab: AdminTab) => void;
  leads?: LeadItem[];
  onUpdateLeadStatus?: (id: string, newStatus: LeadItem['status']) => void;
  onSaveLeadNote?: (id: string, notes: string) => void;
  onDeleteLead?: (id: string) => void;
  reviews?: ReviewItem[];
  onUpdateReview?: (updatedReview: ReviewItem) => void;
  onAddReview?: (newReview: ReviewItem) => void;
  onDeleteReview?: (id: string) => void;
  onToggleReviewFeatured?: (id: string) => void;
}


interface MessageItem {
  id: string;
  sender: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
  replied?: boolean;
}

interface VenueItem {
  id: string;
  name: string;
  city: string;
  concept: string;
  posType: string;
  monthlySpend: number;
  wasteReductionRate: number;
  status: 'Aktif' | 'Deneme (14 Gün)' | 'Askıda';
  licenseExpiry: string;
}

export const AdminPage: React.FC<AdminPageProps> = ({ 
  onNavigateSite, 
  onLogout,
  activeTab: controlledActiveTab,
  onTabChange,
  leads: propsLeads,
  onUpdateLeadStatus: propsOnUpdateLeadStatus,
  onSaveLeadNote: propsOnSaveLeadNote,
  onDeleteLead: propsOnDeleteLead,
  reviews: propsReviews,
  onUpdateReview: propsOnUpdateReview,
  onAddReview: propsOnAddReview,
  onDeleteReview: propsOnDeleteReview,
  onToggleReviewFeatured: propsOnToggleReviewFeatured
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<AdminTab>(controlledActiveTab || 'dashboard');
  const activeTab = controlledActiveTab || internalActiveTab;
  const setActiveTab = (tab: AdminTab) => {
    setInternalActiveTab(tab);
    onTabChange?.(tab);
  };
  
  // Blog state for CMS
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [blogSearch, setBlogSearch] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('all');
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // New post form state
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Mutfak Yönetimi');
  const [newPostSummary, setNewPostSummary] = useState('');
  const [newPostReadTime, setNewPostReadTime] = useState('5 dk okuma');
  const [newPostImage, setNewPostImage] = useState('/src/assets/images/blog_chef_portioning_1792911350428.jpg');
  const [newPostAuthorName, setNewPostAuthorName] = useState('Şef Murat Dağdeviren');
  const [newPostAuthorRole, setNewPostAuthorRole] = useState('Gastronomi Direktörü');
  const [newPostContent, setNewPostContent] = useState('');

  // Leads state (local fallback if propsLeads not supplied)
  const [localLeads, setLocalLeads] = useState<LeadItem[]>([
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
  ]);

  const leads = propsLeads || localLeads;
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | LeadItem['status']>('all');


  // Messages state
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'msg-1',
      sender: 'Kaan Demir (Şef)',
      email: 'kaan.demir@restoran.com',
      subject: 'SambaPOS SQL Entegrasyon Süresi',
      message: 'Merhaba, mevcut SambaPOS veritabanımız yerel SQL Server üzerinde koşuyor. GastroStok bulutuna bağlamak için statik IP gerekiyor mu?',
      date: '25 Ekim 2026 12:10',
      isRead: false
    },
    {
      id: 'msg-2',
      sender: 'Elif Yılmaz (Satın Alma Müdürü)',
      email: 'elif@zincirrestoran.com',
      subject: 'Merkezi Mutfak Dağıtım Modülü Hakkında',
      message: 'Şubeler arası hammadde transferlerinde dijital irsaliye çıktısı alabiliyor muyuz? Demo talep etmek istiyoruz.',
      date: '24 Ekim 2026 15:40',
      isRead: true,
      replied: true
    },
    {
      id: 'msg-3',
      sender: 'Barış Tuncer (İşletmeci)',
      email: 'baris@cafemola.com',
      subject: '14 Günlük Denemede Reçete Sınırı Var mı?',
      message: 'Menümüzde yaklaşık 80 kalem içecek ve tatlı var. Ücretsiz deneme sürecinde tümünü girebiliyor muyuz?',
      date: '23 Ekim 2026 08:50',
      isRead: true
    }
  ]);
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);
  const [replyText, setReplyText] = useState('');

  // Venues state
  const [venues, setVenues] = useState<VenueItem[]>([
    {
      id: 'ven-1',
      name: 'Bistro Galata · Merkez Şube',
      city: 'İstanbul',
      concept: 'Alakart Mutfak',
      posType: 'SambaPOS API',
      monthlySpend: 480000,
      wasteReductionRate: 64,
      status: 'Aktif',
      licenseExpiry: '14 Kasım 2027'
    },
    {
      id: 'ven-2',
      name: 'Moda Roastery & Coffee',
      city: 'İstanbul',
      concept: 'Nitelikli Kafe',
      posType: 'Simpra Cloud POS',
      monthlySpend: 195000,
      wasteReductionRate: 72,
      status: 'Aktif',
      licenseExpiry: '01 Eylül 2027'
    },
    {
      id: 'ven-3',
      name: 'Nişantaşı Brasserie & Grill',
      city: 'İstanbul',
      concept: 'Fine Dining Alakart',
      posType: 'Omnitron POS',
      monthlySpend: 1250000,
      wasteReductionRate: 68,
      status: 'Aktif',
      licenseExpiry: '20 Mart 2028'
    },
    {
      id: 'ven-4',
      name: 'Kadıköy Burger Mutfak',
      city: 'İstanbul',
      concept: 'Fast Casual / Burger',
      posType: 'Mikro Yazılım',
      monthlySpend: 310000,
      wasteReductionRate: 58,
      status: 'Deneme (14 Gün)',
      licenseExpiry: '06 Kasım 2026'
    },
    {
      id: 'ven-5',
      name: 'Alsancak Gourmet Lounge',
      city: 'İzmir',
      concept: 'Bistro & Kokteyl Bar',
      posType: 'Vega POS',
      monthlySpend: 540000,
      wasteReductionRate: 61,
      status: 'Aktif',
      licenseExpiry: '12 Ocak 2027'
    }
  ]);

  // Site Settings state
  const [settingsData, setSettingsData] = useState({
    siteTitle: 'GastroStok - AI Destekli Restoran Stok ve Fire Yönetimi',
    metaDescription: 'Mutfaktaki fireyi durdurun. Yapay zeka ile stoklarınızı yönetin, karlılığınızı artırın.',
    contactPhone: '+90 (212) 809 44 20',
    contactEmail: 'destek@gastrostok.com',
    address: 'Büyükdere Cad. No: 193, Levent / İstanbul',
    maintenanceMode: false,
    showSponsorsMarquee: true,
    enableGastroBot: true,
    allowRegistrations: true
  });
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Filtered blog posts
  const filteredPosts = posts.filter(p => {
    const matchCat = blogCategoryFilter === 'all' || p.category === blogCategoryFilter;
    const matchSearch = p.title.toLowerCase().includes(blogSearch.toLowerCase()) || 
                        p.author.name.toLowerCase().includes(blogSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  // Handle lead status change
  const handleUpdateLeadStatus = (id: string, newStatus: LeadItem['status']) => {
    if (propsOnUpdateLeadStatus) {
      propsOnUpdateLeadStatus(id, newStatus);
    } else {
      setLocalLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
    }
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  // Handle lead note save
  const handleSaveLeadNote = (id: string, notes: string) => {
    if (propsOnSaveLeadNote) {
      propsOnSaveLeadNote(id, notes);
    } else {
      setLocalLeads(prev => prev.map(lead => lead.id === id ? { ...lead, notes } : lead));
    }
  };

  // Handle lead delete
  const handleDeleteLead = (id: string) => {
    if (propsOnDeleteLead) {
      propsOnDeleteLead(id);
    } else {
      setLocalLeads(prev => prev.filter(lead => lead.id !== id));
    }
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(null);
    }
  };


  // Handle message mark read
  const handleMarkMessageRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  // Handle reply message
  const handleSendReply = (id: string) => {
    if (!replyText.trim()) return;
    setMessages(prev => prev.map(m => m.id === id ? { ...m, replied: true, isRead: true } : m));
    setReplyText('');
    setSelectedMessage(null);
  };

  // Reviews state and CRM synchronization
  const [localReviews, setLocalReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const reviews = propsReviews || localReviews;
  const [reviewSearch, setReviewSearch] = useState('');
  const [reviewVenueFilter, setReviewVenueFilter] = useState('all');
  const [reviewFeaturedFilter, setReviewFeaturedFilter] = useState<'all' | 'featured' | 'hidden'>('all');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);

  // Review Form fields
  const [reviewFormName, setReviewFormName] = useState('');
  const [reviewFormRole, setReviewFormRole] = useState('');
  const [reviewFormRestaurant, setReviewFormRestaurant] = useState('');
  const [reviewFormLocation, setReviewFormLocation] = useState('');
  const [reviewFormVenueType, setReviewFormVenueType] = useState<ReviewItem['venueType']>('Alakart Restoran');
  const [reviewFormAvatarImage, setReviewFormAvatarImage] = useState('/src/assets/images/chef_burak_avatar_1793003569801.jpg');
  const [reviewFormRating, setReviewFormRating] = useState(5);
  const [reviewFormHighlightMetric, setReviewFormHighlightMetric] = useState('');
  const [reviewFormReviewText, setReviewFormReviewText] = useState('');
  const [reviewFormPosSystem, setReviewFormPosSystem] = useState('SambaPOS');
  const [reviewFormFeatured, setReviewFormFeatured] = useState(true);
  const [reviewFormDate, setReviewFormDate] = useState('Ekim 2026');

  const AVATAR_PRESETS = [
    { label: 'Şef Burak Taşkın', path: '/src/assets/images/chef_burak_avatar_1793003569801.jpg' },
    { label: 'Zeynep Karaca', path: '/src/assets/images/barista_zeynep_avatar_1793003585881.jpg' },
    { label: 'Şef Caner Yalçın', path: '/src/assets/images/chef_caner_avatar_1793003602715.jpg' },
    { label: 'Haluk Dinçer', path: '/src/assets/images/haluk_dincer_avatar_1793003619391.jpg' },
    { label: 'Murat Çetinkaya', path: '/src/assets/images/murat_cetinkaya_avatar_1793003636998.jpg' },
    { label: 'Deniz Aksoy', path: '/src/assets/images/deniz_aksoy_avatar_1793003652960.jpg' },
  ];

  const handleToggleReviewFeatured = (id: string) => {
    if (propsOnToggleReviewFeatured) {
      propsOnToggleReviewFeatured(id);
    } else {
      setLocalReviews(prev => prev.map(r => r.id === id ? { ...r, featured: !r.featured } : r));
    }
  };

  const handleDeleteReviewItem = (id: string) => {
    if (confirm('Bu müşteri yorumunu silmek istediğinize emin misiniz?')) {
      if (propsOnDeleteReview) {
        propsOnDeleteReview(id);
      } else {
        setLocalReviews(prev => prev.filter(r => r.id !== id));
      }
    }
  };

  const handleOpenEditReview = (item: ReviewItem) => {
    setEditingReview(item);
    setReviewFormName(item.name);
    setReviewFormRole(item.role);
    setReviewFormRestaurant(item.restaurant);
    setReviewFormLocation(item.location);
    setReviewFormVenueType(item.venueType);
    setReviewFormAvatarImage(item.avatarImage || '/src/assets/images/chef_burak_avatar_1793003569801.jpg');
    setReviewFormRating(item.rating);
    setReviewFormHighlightMetric(item.highlightMetric);
    setReviewFormReviewText(item.reviewText);
    setReviewFormPosSystem(item.posSystem || 'SambaPOS');
    setReviewFormFeatured(item.featured !== false);
    setReviewFormDate(item.date || 'Ekim 2026');
    setIsReviewModalOpen(true);
  };

  const handleOpenCreateReview = () => {
    setEditingReview(null);
    setReviewFormName('');
    setReviewFormRole('Yönetici Şef & Kurucu Ortak');
    setReviewFormRestaurant('');
    setReviewFormLocation('İstanbul');
    setReviewFormVenueType('Alakart Restoran');
    setReviewFormAvatarImage('/src/assets/images/chef_burak_avatar_1793003569801.jpg');
    setReviewFormRating(5);
    setReviewFormHighlightMetric('%65 Fire Azalması · ₺280.000 Yıllık Tasarruf');
    setReviewFormReviewText('');
    setReviewFormPosSystem('SambaPOS');
    setReviewFormFeatured(true);
    setReviewFormDate('Ekim 2026');
    setIsReviewModalOpen(true);
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewFormName.trim() || !reviewFormReviewText.trim()) return;

    if (editingReview) {
      const updated: ReviewItem = {
        ...editingReview,
        name: reviewFormName,
        role: reviewFormRole,
        restaurant: reviewFormRestaurant,
        location: reviewFormLocation,
        venueType: reviewFormVenueType,
        avatarImage: reviewFormAvatarImage,
        avatarInitials: reviewFormName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase(),
        rating: reviewFormRating,
        highlightMetric: reviewFormHighlightMetric,
        reviewText: reviewFormReviewText,
        posSystem: reviewFormPosSystem,
        featured: reviewFormFeatured,
        date: reviewFormDate,
        verified: true
      };
      if (propsOnUpdateReview) {
        propsOnUpdateReview(updated);
      } else {
        setLocalReviews(prev => prev.map(r => r.id === updated.id ? updated : r));
      }
    } else {
      const newReview: ReviewItem = {
        id: `rev-${Date.now()}`,
        name: reviewFormName,
        role: reviewFormRole,
        restaurant: reviewFormRestaurant,
        location: reviewFormLocation,
        venueType: reviewFormVenueType,
        avatarImage: reviewFormAvatarImage,
        avatarInitials: reviewFormName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase(),
        avatarColor: 'from-[#c24128] to-[#8d2a17]',
        rating: reviewFormRating,
        highlightMetric: reviewFormHighlightMetric,
        reviewText: reviewFormReviewText,
        posSystem: reviewFormPosSystem,
        featured: reviewFormFeatured,
        date: reviewFormDate,
        verified: true
      };
      if (propsOnAddReview) {
        propsOnAddReview(newReview);
      } else {
        setLocalReviews(prev => [newReview, ...prev]);
      }
    }
    setIsReviewModalOpen(false);
  };

  const filteredReviews = reviews.filter(r => {
    const matchCat = reviewVenueFilter === 'all' || r.venueType === reviewVenueFilter;
    const matchStatus = reviewFeaturedFilter === 'all' 
      ? true 
      : reviewFeaturedFilter === 'featured' 
      ? r.featured !== false 
      : r.featured === false;
    const searchLower = reviewSearch.toLowerCase();
    const matchSearch = !reviewSearch.trim() || 
      r.name.toLowerCase().includes(searchLower) ||
      r.restaurant.toLowerCase().includes(searchLower) ||
      r.location.toLowerCase().includes(searchLower) ||
      r.reviewText.toLowerCase().includes(searchLower) ||
      (r.posSystem && r.posSystem.toLowerCase().includes(searchLower)) ||
      r.highlightMetric.toLowerCase().includes(searchLower);
    return matchCat && matchStatus && matchSearch;
  });

  // Save new or edited post
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim()) return;

    if (editingPost) {
      // Update
      setPosts(prev => prev.map(p => {
        if (p.id === editingPost.id) {
          return {
            ...p,
            title: newPostTitle,
            category: newPostCategory,
            summary: newPostSummary,
            readTime: newPostReadTime,
            image: newPostImage,
            author: { name: newPostAuthorName, role: newPostAuthorRole },
            content: newPostContent ? newPostContent.split('\n\n') : p.content
          };
        }
        return p;
      }));
      setEditingPost(null);
    } else {
      // Create new
      const newPost: BlogPost = {
        id: `blog-${Date.now()}`,
        title: newPostTitle,
        slug: newPostTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        category: newPostCategory,
        readTime: newPostReadTime,
        date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
        summary: newPostSummary || 'Yeni yayınlanan blog makalesi.',
        image: newPostImage,
        author: {
          name: newPostAuthorName,
          role: newPostAuthorRole
        },
        content: newPostContent 
          ? newPostContent.split('\n\n') 
          : ['GastroStok mutfak teknolojileri ve reçete optimizasyonu içeriği.'],
        keyTakeaways: [
          'Reçete disiplini ve dijital gramaj tartımı fireyi minimize eder.',
          'Adisyon verileri ile anlık hammadde düşümü kârlılığı korur.'
        ]
      };
      setPosts(prev => [newPost, ...prev]);
    }

    // Reset
    setIsNewPostModalOpen(false);
    setNewPostTitle('');
    setNewPostSummary('');
    setNewPostContent('');
  };

  const handleOpenEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setNewPostTitle(post.title);
    setNewPostCategory(post.category);
    setNewPostSummary(post.summary);
    setNewPostReadTime(post.readTime);
    setNewPostImage(post.image);
    setNewPostAuthorName(post.author.name);
    setNewPostAuthorRole(post.author.role);
    setNewPostContent(post.content.join('\n\n'));
    setIsNewPostModalOpen(true);
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Bu blog makalesini silmek istediğinize emin misiniz?')) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0e0f13] text-neutral-100 flex flex-col font-sans">
      
      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#14151b] border-b border-neutral-800 px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
        
        {/* Brand & Admin Badge */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#c24128] flex items-center justify-center text-white font-bold shadow-sm">
            <UtensilsCrossed className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">Gastro<span className="text-[#f26a4f]">Stok</span></span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#c24128]/20 text-[#f26a4f] rounded-full border border-[#c24128]/30 font-semibold uppercase tracking-wider">
                Yönetici Paneli
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono hidden sm:block">
              Canlı Bulut Yönetim Sistemi v2.4 · 25 Ekim 2026
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          
          {/* Quick Site Return */}
          <button
            onClick={() => onNavigateSite('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-[#1c1e26] hover:bg-[#252834] rounded-lg border border-neutral-700/70 transition-colors cursor-pointer"
          >
            <span>Canlı Siteye Dön</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {/* Admin Profile & Logout */}
          <div className="flex items-center gap-2 pl-3 border-l border-neutral-800">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#c24128] to-amber-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              AŞ
            </div>
            <div className="text-left hidden md:block">
              <span className="text-xs font-semibold text-white block leading-tight">Ahmet Şen</span>
              <span className="text-[10px] text-emerald-400 block font-mono leading-tight">Süper Admin</span>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 text-neutral-400 hover:text-[#f26a4f] hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer ml-1"
              title="Güvenli Çıkış Yap"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Sidebar / Mobile & Tablet Top Bar */}
        <aside className="w-full md:w-64 bg-[#121318] border-b md:border-b-0 border-r-0 md:border-r border-neutral-800/80 p-2 sm:p-3 flex md:flex-col justify-between overflow-x-auto md:overflow-visible shrink-0 no-scrollbar touch-pan-x">
          
          <nav className="flex md:flex-col gap-1 w-full min-w-max md:min-w-0">
            {[
              { id: 'dashboard', label: 'Genel Bakış', icon: LayoutDashboard },
              { id: 'blog', label: 'Blog & İçerik CMS', icon: FileText, badge: `${posts.length}` },
              { id: 'leads', label: 'Restoran Başvuruları', icon: Users, badge: `${leads.filter(l => l.status === 'Yeni').length} Yeni` },
              { id: 'reviews', label: 'Öne Çıkan Yorumlar', icon: Star, badge: `${reviews.filter(r => r.featured !== false).length}` },
              { id: 'messages', label: 'İletişim Mesajları', icon: MessageSquare, badge: `${messages.filter(m => !m.isRead).length}` },
              { id: 'venues', label: 'Kayıtlı Şubeler & POS', icon: Store, badge: `${venues.length}` },
              { id: 'settings', label: 'Site Ayarları & SEO', icon: Settings },
              { id: 'team', label: 'Ekip & Güvenlik', icon: ShieldCheck },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#c24128] text-white shadow-md shadow-[#c24128]/20 font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ml-2 ${
                      isActive ? 'bg-black/25 text-white' : 'bg-[#1e2029] text-[#f26a4f] border border-neutral-700/60'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer info */}
          <div className="hidden md:block p-3 bg-[#171922] rounded-xl border border-neutral-800/80 text-[11px] text-neutral-400 font-mono space-y-1">
            <div className="flex items-center justify-between text-neutral-300">
              <span>Sistem Uptime:</span>
              <span className="text-emerald-400 font-bold">%99.98</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Sunucu Lokasyonu:</span>
              <span>İstanbul, TR</span>
            </div>
            <div className="flex items-center justify-between">
              <span>API Gecikmesi:</span>
              <span>24 ms</span>
            </div>
          </div>

        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">

          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Yönetici Genel Bakış Paneli</h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    GastroStok platform metrikleri, anlık müşteri başvuruları ve mutfak tasarruf performansı.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setActiveTab('leads')}
                    className="flex items-center gap-2 px-3.5 py-2 bg-[#c24128] hover:bg-[#aa3620] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yeni Başvuru İncele</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                <div className="bg-[#15171f] p-5 rounded-2xl border border-neutral-800/90 space-y-3">
                  <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
                    <span>Aylık Toplam Ziyaretçi</span>
                    <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      +18.4%
                    </span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">42.850</p>
                  <p className="text-[11px] text-neutral-400">Son 30 günde organik ve yönlendirme trafiği</p>
                </div>

                <div className="bg-[#15171f] p-5 rounded-2xl border border-neutral-800/90 space-y-3">
                  <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
                    <span>Yeni Demo Başvuruları</span>
                    <span className="text-[#f26a4f] font-mono text-[11px] bg-[#c24128]/15 px-1.5 py-0.5 rounded border border-[#c24128]/30">
                      {leads.length} Toplam
                    </span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#f26a4f] font-mono">
                    {leads.filter(l => l.status === 'Yeni').length} Bekleyen
                  </p>
                  <p className="text-[11px] text-neutral-400">Son 48 saat içinde restoranlardan gelen formlar</p>
                </div>

                <div className="bg-[#15171f] p-5 rounded-2xl border border-neutral-800/90 space-y-3">
                  <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
                    <span>Kurtarılan Mutfak Fire Tasarrufu</span>
                    <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      Kümülatif
                    </span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">4.820.000 ₺</p>
                  <p className="text-[11px] text-neutral-400">GastroStok kullanan şubelerin kurtardığı net hammadde</p>
                </div>

                <div className="bg-[#15171f] p-5 rounded-2xl border border-neutral-800/90 space-y-3">
                  <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
                    <span>Aktif Entegre Şubeler</span>
                    <span className="text-neutral-400 font-mono text-[11px] bg-neutral-800 px-1.5 py-0.5 rounded">
                      POS Senkron
                    </span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">148 Şube</p>
                  <p className="text-[11px] text-neutral-400">SambaPOS, Simpra, Mikro vb. adisyon bağlı</p>
                </div>

              </div>

              {/* Recent Events & Lead Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Recent Leads Table Preview */}
                <div className="lg:col-span-7 bg-[#15171f] rounded-2xl p-5 border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">Son Restoran Kayıtları (Leads)</h3>
                      <p className="text-xs text-neutral-400">Formu dolduran kafe ve şefler</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="text-xs font-semibold text-[#f26a4f] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <span>Tümünü Gör</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="divide-y divide-neutral-800/80">
                    {leads.slice(0, 4).map(l => (
                      <div key={l.id} className="py-3 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-white">{l.restaurantName}</p>
                          <p className="text-neutral-400 text-[11px]">{l.contactName} · {l.city} · {l.venueType}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                            l.status === 'Yeni' ? 'bg-[#c24128]/20 text-[#f26a4f] border border-[#c24128]/30' :
                            l.status === 'İletişimde' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                            l.status === 'Onaylandı' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                            'bg-neutral-800 text-neutral-300'
                          }`}>
                            {l.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live System Activity Feed */}
                <div className="lg:col-span-5 bg-[#15171f] rounded-2xl p-5 border border-neutral-800 space-y-4">
                  <h3 className="text-base font-bold text-white">Sistem Olay Günlüğü (Audit Log)</h3>
                  
                  <div className="space-y-3 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-[#121318] border border-neutral-800/80 flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                      <div>
                        <p className="text-neutral-200">Bistro Galata: SambaPOS adisyon düşümü tamamlandı (42 adisyon).</p>
                        <span className="text-[10px] text-neutral-500">10 dakika önce</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#121318] border border-neutral-800/80 flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                      <div>
                        <p className="text-neutral-200">Moda Coffee: Badem sütü SKT kritik seviyeye indi (Alarm verildi).</p>
                        <span className="text-[10px] text-neutral-500">28 dakika önce</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#121318] border border-neutral-800/80 flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#f26a4f] mt-1.5 shrink-0"></span>
                      <div>
                        <p className="text-neutral-200">AI Motoru: Cuma akşamı yağış tahminiyle sipariş sepeti revize edildi.</p>
                        <span className="text-[10px] text-neutral-500">1 saat önce</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#121318] border border-neutral-800/80 flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                      <div>
                        <p className="text-neutral-200">Bulut Yedekleme: Tüm mutfak reçeteleri şifrelenerek yedeklendi.</p>
                        <span className="text-[10px] text-neutral-500">Bugün 03:00</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Featured Customer Reviews Highlights in Dashboard */}
              <div className="bg-[#15171f] rounded-2xl p-5 border border-neutral-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <span>Öne Çıkan Müşteri Yorumları & Restoran Şefleri</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          {reviews.filter(r => r.featured !== false).length} Yayında
                        </span>
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Anasayfada sergilenen doğrulanmış şefler, kafe işletmecileri ve restoran tasarruf başarıları
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#c24128]/20 hover:bg-[#c24128] text-[#f26a4f] hover:text-white border border-[#c24128]/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <span>Tüm Yorumları Yönet ({reviews.length})</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Reviewers Quick Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                  {reviews.slice(0, 6).map(rev => (
                    <div 
                      key={rev.id} 
                      onClick={() => handleOpenEditReview(rev)}
                      className="p-3 bg-[#121318] hover:bg-[#181a24] border border-neutral-800 hover:border-neutral-700 rounded-xl transition-all cursor-pointer flex items-center gap-3 group"
                    >
                      <div className="relative shrink-0">
                        {rev.avatarImage ? (
                          <img 
                            src={rev.avatarImage} 
                            alt={rev.name} 
                            className="w-10 h-10 rounded-full object-cover border border-neutral-700 group-hover:border-[#c24128] transition-colors"
                          />
                        ) : (
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${rev.avatarColor || 'from-[#c24128] to-[#8d2a17]'} text-white flex items-center justify-center font-bold text-xs`}>
                            {rev.avatarInitials}
                          </div>
                        )}
                        {rev.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-black absolute -bottom-0.5 -right-0.5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-bold text-white truncate group-hover:text-[#f26a4f] transition-colors">
                            {rev.name}
                          </p>
                          <div className="flex items-center text-amber-400 shrink-0">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span className="text-[10px] font-mono ml-0.5 font-bold">{rev.rating}.0</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-neutral-400 truncate">{rev.restaurant} · {rev.venueType}</p>
                        <p className="text-[10px] text-emerald-400 font-mono truncate">{rev.highlightMetric}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: BLOG CMS */}
          {activeTab === 'blog' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Blog & İçerik Yönetim Sistemi (CMS)</h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    GastroStok sitesindeki tüm blog yazılarını oluşturun, düzenleyin, görsellerini yönetin.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingPost(null);
                    setNewPostTitle('');
                    setNewPostSummary('');
                    setNewPostContent('');
                    setIsNewPostModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#c24128] hover:bg-[#aa3620] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-sm self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni Makale Ekle</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#15171f] p-3 rounded-2xl border border-neutral-800">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={blogSearch}
                    onChange={e => setBlogSearch(e.target.value)}
                    placeholder="Başlık veya yazar ara..."
                    className="w-full pl-9 pr-3 py-1.5 bg-[#121318] border border-neutral-700/80 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-neutral-400 shrink-0" />
                  <select
                    value={blogCategoryFilter}
                    onChange={e => setBlogCategoryFilter(e.target.value)}
                    className="px-3 py-1.5 bg-[#121318] border border-neutral-700/80 rounded-xl text-xs text-neutral-300 focus:outline-none focus:border-[#c24128]"
                  >
                    <option value="all">Tüm Kategoriler ({posts.length})</option>
                    <option value="Mutfak Yönetimi">Mutfak Yönetimi</option>
                    <option value="Kafe & Barista">Kafe & Barista</option>
                    <option value="Maliyet & Kârlılık">Maliyet & Kârlılık</option>
                    <option value="Veri & AI">Veri & AI</option>
                    <option value="Tedarik Zinciri">Tedarik Zinciri</option>
                    <option value="Depo & Lojistik">Depo & Lojistik</option>
                  </select>
                </div>
              </div>

              {/* Posts Table */}
              <div className="bg-[#15171f] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#121318] text-neutral-400 font-mono uppercase text-[10px] border-b border-neutral-800">
                      <tr>
                        <th className="py-3 px-4">Kapak & Başlık</th>
                        <th className="py-3 px-4">Kategori</th>
                        <th className="py-3 px-4">Yazar</th>
                        <th className="py-3 px-4">Tarih / Okuma</th>
                        <th className="py-3 px-4">Durum</th>
                        <th className="py-3 px-4 text-right">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/70 text-neutral-200">
                      {filteredPosts.map(post => (
                        <tr key={post.id} className="hover:bg-neutral-800/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-14 h-10 object-cover rounded-lg border border-neutral-700 shrink-0"
                              />
                              <div className="max-w-xs">
                                <p className="font-semibold text-white truncate">{post.title}</p>
                                <p className="text-[11px] text-neutral-400 truncate">{post.summary}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#c24128]/15 text-[#f26a4f] border border-[#c24128]/30">
                              {post.category}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-white">{post.author.name}</p>
                            <p className="text-[10px] text-neutral-400">{post.author.role}</p>
                          </td>
                          <td className="py-3 px-4 font-mono text-neutral-400">
                            <div>{post.date}</div>
                            <div className="text-[10px] text-neutral-500">{post.readTime}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                              Yayında
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => handleOpenEditPost(post)}
                                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                                title="Yazıyı Düzenle"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                                title="Yazıyı Sil"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: LEADS (RESTORAN BAŞVURULARI) */}
          {activeTab === 'leads' && (() => {
            const filteredLeads = leads.filter(l => {
              const matchStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
              const matchSearch = 
                l.restaurantName.toLowerCase().includes(leadSearch.toLowerCase()) ||
                l.contactName.toLowerCase().includes(leadSearch.toLowerCase()) ||
                l.phone.includes(leadSearch) ||
                l.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
                l.posSystem.toLowerCase().includes(leadSearch.toLowerCase());
              return matchStatus && matchSearch;
            });

            return (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold text-white">Restoran & Demo Başvuruları (CRM)</h2>
                      {leads.some(l => l.status === 'Yeni') && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#c24128]/20 text-[#f26a4f] border border-[#c24128]/40 animate-pulse font-semibold">
                          {leads.filter(l => l.status === 'Yeni').length} Yeni Restoran
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                      Web sitesindeki "Ücretsiz Restoran Ekle" formundan anlık düşen başvurular ve müşteri adımları.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 bg-[#15171f] rounded-xl border border-neutral-800 text-xs font-mono text-neutral-300">
                      Toplam: <strong className="text-white">{leads.length}</strong> Restoran
                    </span>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#15171f] p-3 rounded-2xl border border-neutral-800">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={leadSearch}
                      onChange={e => setLeadSearch(e.target.value)}
                      placeholder="Restoran adı, yetkili, telefon veya POS ara..."
                      className="w-full pl-9 pr-3 py-2 bg-[#121318] border border-neutral-700/80 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                    />
                  </div>

                  {/* Status Filter Buttons */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                    {[
                      { key: 'all', label: `Tümü (${leads.length})` },
                      { key: 'Yeni', label: `Yeni (${leads.filter(l => l.status === 'Yeni').length})` },
                      { key: 'İletişimde', label: 'İletişimde' },
                      { key: 'Demo Yapıldı', label: 'Demo Yapıldı' },
                      { key: 'Onaylandı', label: 'Onaylandı' },
                      { key: 'Arşivlendi', label: 'Arşiv' }
                    ].map(f => (
                      <button
                        key={f.key}
                        onClick={() => setLeadStatusFilter(f.key as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                          leadStatusFilter === f.key
                            ? 'bg-[#c24128] text-white shadow-sm'
                            : 'bg-[#121318] text-neutral-400 hover:text-white hover:bg-neutral-800'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Leads Table */}
                <div className="bg-[#15171f] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#121318] text-neutral-400 font-mono uppercase text-[10px] border-b border-neutral-800">
                        <tr>
                          <th className="py-3 px-4">İşletme Adı</th>
                          <th className="py-3 px-4">Yetkili & İletişim</th>
                          <th className="py-3 px-4">Konsept / Lokasyon</th>
                          <th className="py-3 px-4">POS Sistemi</th>
                          <th className="py-3 px-4">Başvuru Tarihi</th>
                          <th className="py-3 px-4">Durum Değiştir</th>
                          <th className="py-3 px-4 text-right">İşlem</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/70 text-neutral-200">
                        {filteredLeads.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-12 text-center text-neutral-400 text-xs">
                              Aradığınız kriterlere uygun restoran başvurusu bulunamadı.
                            </td>
                          </tr>
                        ) : (
                          filteredLeads.map(lead => (
                            <tr 
                              key={lead.id} 
                              className={`transition-colors ${
                                lead.status === 'Yeni' 
                                  ? 'bg-[#c24128]/5 hover:bg-[#c24128]/10' 
                                  : 'hover:bg-neutral-800/30'
                              }`}
                            >
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  {lead.status === 'Yeni' && (
                                    <span className="w-2 h-2 rounded-full bg-[#f26a4f] shrink-0 animate-ping"></span>
                                  )}
                                  <div>
                                    <span className="font-semibold text-white block text-sm">
                                      {lead.restaurantName}
                                    </span>
                                    {lead.notes && (
                                      <span className="text-[10px] text-neutral-400 line-clamp-1 italic max-w-xs">
                                        "{lead.notes}"
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <p className="font-medium text-neutral-200">{lead.contactName}</p>
                                <p className="text-[11px] font-mono text-neutral-400">{lead.phone}</p>
                                <p className="text-[10px] text-neutral-500">{lead.email}</p>
                              </td>
                              <td className="py-3 px-4">
                                <p className="text-white">{lead.venueType}</p>
                                <p className="text-[11px] text-neutral-400">{lead.city}</p>
                              </td>
                              <td className="py-3 px-4 font-mono text-neutral-300">
                                <span className="px-2 py-0.5 rounded bg-neutral-800/80 border border-neutral-700/60 text-[11px]">
                                  {lead.posSystem}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-mono text-[11px] text-neutral-400 whitespace-nowrap">
                                {lead.date}
                              </td>
                              <td className="py-3 px-4">
                                <select
                                  value={lead.status}
                                  onChange={e => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold focus:outline-none cursor-pointer border ${
                                    lead.status === 'Yeni' ? 'bg-[#c24128]/20 text-[#f26a4f] border-[#c24128]/40' :
                                    lead.status === 'İletişimde' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                                    lead.status === 'Demo Yapıldı' ? 'bg-blue-500/20 text-blue-400 border-blue-500/40' :
                                    lead.status === 'Onaylandı' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                                    'bg-neutral-800 text-neutral-400 border-neutral-700'
                                  }`}
                                >
                                  <option value="Yeni">Yeni Başvuru</option>
                                  <option value="İletişimde">İletişimde</option>
                                  <option value="Demo Yapıldı">Demo Yapıldı</option>
                                  <option value="Onaylandı">Onaylandı (Sözleşme)</option>
                                  <option value="Arşivlendi">Arşivlendi</option>
                                </select>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    onClick={() => setSelectedLead(lead)}
                                    className="px-2.5 py-1 bg-[#1e212b] hover:bg-[#272a38] text-[11px] text-neutral-300 hover:text-white rounded-lg border border-neutral-700/70 transition-colors cursor-pointer"
                                  >
                                    Not / Detay
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (confirm(`"${lead.restaurantName}" başvurusunu silmek istediğinize emin misiniz?`)) {
                                        handleDeleteLead(lead.id);
                                      }
                                    }}
                                    className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                                    title="Başvuruyu Sil"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            );
          })()}

          {/* TAB 4: CONTACT MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">İletişim & Gelen Mesaj Kutusu</h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    İletişim sayfasından ziyaretçilerin gönderdiği sorular ve geri bildirimler.
                  </p>
                </div>

                <div className="text-xs font-mono text-neutral-400">
                  Okunmamış: <span className="text-[#f26a4f] font-bold">{messages.filter(m => !m.isRead).length}</span> mesaj
                </div>
              </div>

              {/* Messages List */}
              <div className="grid grid-cols-1 gap-4">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      !msg.isRead 
                        ? 'bg-[#181a23] border-[#c24128]/50 shadow-md' 
                        : 'bg-[#15171f] border-neutral-800 opacity-90'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800">
                      <div className="flex items-center gap-2">
                        {!msg.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#f26a4f]"></span>
                        )}
                        <h4 className="font-bold text-white text-sm">{msg.subject}</h4>
                        {msg.replied && (
                          <span className="px-2 py-0.5 bg-emerald-500/15 text-emerald-400 text-[10px] rounded border border-emerald-500/30 font-mono">
                            Yanıtlandı
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-neutral-400">{msg.date}</span>
                    </div>

                    <div className="py-3">
                      <p className="text-xs font-medium text-neutral-400 mb-1">
                        Kimden: <span className="text-neutral-200">{msg.sender}</span> ({msg.email})
                      </p>
                      <p className="text-xs text-neutral-300 leading-relaxed mt-2 bg-[#121318] p-3 rounded-xl border border-neutral-800/80">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      {!msg.isRead && (
                        <button
                          onClick={() => handleMarkMessageRead(msg.id)}
                          className="px-3 py-1.5 bg-[#1e2029] hover:bg-[#272a36] text-xs text-neutral-300 rounded-lg border border-neutral-700/60 cursor-pointer"
                        >
                          Okundu İşaretle
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedMessage(msg);
                          handleMarkMessageRead(msg.id);
                        }}
                        className="px-3 py-1.5 bg-[#c24128] hover:bg-[#aa3620] text-xs font-semibold text-white rounded-lg cursor-pointer"
                      >
                        Hızlı Yanıtla
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 5: REGISTERED VENUES & POS */}
          {activeTab === 'venues' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Kayıtlı Restoran Şubeleri & POS Durumları</h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    GastroStok sistemine bağlı aktif restoranlar, aylık bütçeleri ve kurtarılan fire oranları.
                  </p>
                </div>

                <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                  Tüm POS Webhook Bağlantıları Aktif
                </div>
              </div>

              {/* Venues Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {venues.map(ven => (
                  <div key={ven.id} className="bg-[#15171f] p-5 rounded-2xl border border-neutral-800 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-white text-base">{ven.name}</h4>
                        <p className="text-xs text-neutral-400">{ven.city} · {ven.concept}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        ven.status === 'Aktif' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                        'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}>
                        {ven.status}
                      </span>
                    </div>

                    <div className="bg-[#121318] p-3 rounded-xl border border-neutral-800/80 space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">POS Altyapısı:</span>
                        <span className="text-white font-semibold">{ven.posType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Aylık Hammadde:</span>
                        <span className="text-white font-semibold">{ven.monthlySpend.toLocaleString('tr-TR')} ₺</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Kurtarılan Fire:</span>
                        <span className="text-emerald-400 font-bold">%{ven.wasteReductionRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Lisans Bitiş:</span>
                        <span className="text-neutral-300">{ven.licenseExpiry}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs">
                      <button 
                        onClick={() => alert(`${ven.name} için canlı veri senkronizasyonu başlatıldı.`)}
                        className="text-[#f26a4f] hover:underline font-medium cursor-pointer"
                      >
                        Senkronizasyonu Tetikle
                      </button>
                      <span className="text-[10px] text-neutral-500 font-mono">ID: {ven.id}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 6: SETTINGS & SEO */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
              
              <div>
                <h2 className="text-2xl font-bold text-white">Platform Ayarları & SEO Yapılandırması</h2>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Site başlığı, meta etiketleri, iletişim bilgileri ve operasyonel modüllerin görünüm ayarları.
                </p>
              </div>

              {settingsSavedToast && (
                <div className="p-3 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Ayarlar başarıyla güncellendi ve site geneline uygulandı.</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="bg-[#15171f] p-6 rounded-2xl border border-neutral-800 space-y-6 text-xs">
                
                {/* General site info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[#e05338]">
                    Genel SEO ve Başlık Bilgileri
                  </h3>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">Web Sitesi Başlığı (HTML Title)</label>
                    <input
                      type="text"
                      value={settingsData.siteTitle}
                      onChange={e => setSettingsData({ ...settingsData, siteTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-[#121318] border border-neutral-700/80 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">Meta Açıklaması (Meta Description)</label>
                    <textarea
                      rows={2}
                      value={settingsData.metaDescription}
                      onChange={e => setSettingsData({ ...settingsData, metaDescription: e.target.value })}
                      className="w-full px-3 py-2 bg-[#121318] border border-neutral-700/80 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                    />
                  </div>
                </div>

                {/* Contact info */}
                <div className="space-y-4 pt-4 border-t border-neutral-800">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[#e05338]">
                    İletişim & Şirket Bilgileri
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">İletişim Telefonu</label>
                      <input
                        type="text"
                        value={settingsData.contactPhone}
                        onChange={e => setSettingsData({ ...settingsData, contactPhone: e.target.value })}
                        className="w-full px-3 py-2 bg-[#121318] border border-neutral-700/80 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-300 font-medium mb-1">Destek E-postası</label>
                      <input
                        type="email"
                        value={settingsData.contactEmail}
                        onChange={e => setSettingsData({ ...settingsData, contactEmail: e.target.value })}
                        className="w-full px-3 py-2 bg-[#121318] border border-neutral-700/80 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">Ofis Adresi</label>
                    <input
                      type="text"
                      value={settingsData.address}
                      onChange={e => setSettingsData({ ...settingsData, address: e.target.value })}
                      className="w-full px-3 py-2 bg-[#121318] border border-neutral-700/80 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                    />
                  </div>
                </div>

                {/* Feature Toggles */}
                <div className="space-y-4 pt-4 border-t border-neutral-800">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[#e05338]">
                    Özellik Anahtarları (Feature Toggles)
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 bg-[#121318] rounded-xl border border-neutral-800 cursor-pointer">
                      <div>
                        <span className="font-semibold text-white block">GastroBot AI Asistanı</span>
                        <span className="text-neutral-400 text-[11px]">Sağ alt köşede ziyaretçilere bilgi veren asistan açık olsun.</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsData.enableGastroBot}
                        onChange={e => setSettingsData({ ...settingsData, enableGastroBot: e.target.checked })}
                        className="w-4 h-4 accent-[#c24128]"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-[#121318] rounded-xl border border-neutral-800 cursor-pointer">
                      <div>
                        <span className="font-semibold text-white block">Sponsor Kayan Bant (Marquee)</span>
                        <span className="text-neutral-400 text-[11px]">Anasayfadaki 10 adet sponsor logosu döngüsü gösterilsin.</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsData.showSponsorsMarquee}
                        onChange={e => setSettingsData({ ...settingsData, showSponsorsMarquee: e.target.checked })}
                        className="w-4 h-4 accent-[#c24128]"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-[#121318] rounded-xl border border-neutral-800 cursor-pointer">
                      <div>
                        <span className="font-semibold text-white block">14 Günlük Ücretsiz Deneme Başvuruları</span>
                        <span className="text-neutral-400 text-[11px]">Ziyaretçiler modal üzerinden kayıt oluşturabilsin.</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsData.allowRegistrations}
                        onChange={e => setSettingsData({ ...settingsData, allowRegistrations: e.target.checked })}
                        className="w-4 h-4 accent-[#c24128]"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-[#121318] rounded-xl border border-neutral-800 cursor-pointer">
                      <div>
                        <span className="font-semibold text-white block">Bakım Modu (Maintenance)</span>
                        <span className="text-neutral-400 text-[11px]">Siteyi sadece yöneticilerin erişebileceği bakım moduna al.</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settingsData.maintenanceMode}
                        onChange={e => setSettingsData({ ...settingsData, maintenanceMode: e.target.checked })}
                        className="w-4 h-4 accent-[#c24128]"
                      />
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#c24128] hover:bg-[#aa3620] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-md"
                  >
                    Değişiklikleri Kaydet
                  </button>
                </div>

              </form>

            </div>
          )}

          {/* TAB 7: TEAM & SECURITY */}
          {activeTab === 'team' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div>
                <h2 className="text-2xl font-bold text-white">Yönetici Ekibi & Güvenlik (RBAC)</h2>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Yönetici rolleri, iki aşamalı doğrulama ve erişim izinleri.
                </p>
              </div>

              <div className="bg-[#15171f] rounded-2xl border border-neutral-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121318] text-neutral-400 font-mono uppercase text-[10px] border-b border-neutral-800">
                    <tr>
                      <th className="py-3 px-4">Yönetici</th>
                      <th className="py-3 px-4">E-posta</th>
                      <th className="py-3 px-4">Rol & Yetki</th>
                      <th className="py-3 px-4">2FA Güvenlik</th>
                      <th className="py-3 px-4">Son Giriş</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/70 text-neutral-200">
                    <tr className="hover:bg-neutral-800/30">
                      <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#c24128] flex items-center justify-center text-[10px]">AŞ</div>
                        <span>Ahmet Şen</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-neutral-300">admin@gastrostok.com</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#c24128]/20 text-[#f26a4f] border border-[#c24128]/30 font-semibold">
                          Süper Admin
                        </span>
                      </td>
                      <td className="py-3 px-4 text-emerald-400 font-mono">Aktif (FIDO2)</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-neutral-400">Şimdi Aktif</td>
                    </tr>
                    <tr className="hover:bg-neutral-800/30">
                      <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px]">ZK</div>
                        <span>Zeynep Kaya</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-neutral-300">zeynep@gastrostok.com</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          İçerik Editörü
                        </span>
                      </td>
                      <td className="py-3 px-4 text-emerald-400 font-mono">Aktif (SMS)</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-neutral-400">Dün 18:45</td>
                    </tr>
                    <tr className="hover:bg-neutral-800/30">
                      <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center text-[10px]">CB</div>
                        <span>Caner Bulut</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-neutral-300">caner@gastrostok.com</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          Müşteri Temsilcisi
                        </span>
                      </td>
                      <td className="py-3 px-4 text-emerald-400 font-mono">Aktif (Google Auth)</td>
                      <td className="py-3 px-4 font-mono text-[11px] text-neutral-400">23 Ekim 2026</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 8: FEATURED REVIEWS MANAGEMENT */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e05338] mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Müşteri Geri Bildirimleri & Sosyal Kanıt</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                    <span>Öne Çıkan Müşteri Yorumları & Restoran Şefleri</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {reviews.length} Toplam
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
                    Anasayfada yer alan şef ve işletmeci profil fotoğraflarını, tasarruf metriklerini, POS entegrasyonlarını ve yorum metinlerini buradan yönetebilirsiniz.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
                  <button
                    onClick={() => {
                      onNavigateSite('home');
                      setTimeout(() => {
                        const el = document.getElementById('musteri-yorumlari');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 border border-neutral-700/80"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Sitede İncele</span>
                  </button>
                  <button
                    onClick={handleOpenCreateReview}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#c24128] hover:bg-[#aa3620] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yeni Yorum Ekle</span>
                  </button>
                </div>
              </div>

              {/* KPI Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-[#15171f] p-4 rounded-2xl border border-neutral-800 space-y-1">
                  <span className="text-[11px] text-neutral-400 block font-medium">Toplam Kayıtlı Yorum</span>
                  <p className="text-2xl font-extrabold text-white font-mono">{reviews.length}</p>
                  <span className="text-[10px] text-neutral-500">Sistem veritabanında</span>
                </div>

                <div className="bg-[#15171f] p-4 rounded-2xl border border-neutral-800 space-y-1">
                  <span className="text-[11px] text-neutral-400 block font-medium">Anasayfada Yayında</span>
                  <p className="text-2xl font-extrabold text-emerald-400 font-mono">
                    {reviews.filter(r => r.featured !== false).length}
                  </p>
                  <span className="text-[10px] text-emerald-400/80 font-mono">Ziyaretçilere görünür</span>
                </div>

                <div className="bg-[#15171f] p-4 rounded-2xl border border-neutral-800 space-y-1">
                  <span className="text-[11px] text-neutral-400 block font-medium">Ortalama Puan</span>
                  <div className="flex items-center gap-1">
                    <p className="text-2xl font-extrabold text-amber-400 font-mono">
                      {(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1)}
                    </p>
                    <div className="flex text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-500">Mükemmel memnuniyet</span>
                </div>

                <div className="bg-[#15171f] p-4 rounded-2xl border border-neutral-800 space-y-1">
                  <span className="text-[11px] text-neutral-400 block font-medium">Doğrulanmış İşletme</span>
                  <p className="text-2xl font-extrabold text-[#f26a4f] font-mono">%100</p>
                  <span className="text-[10px] text-neutral-500">Tüm mutfaklar teyitli</span>
                </div>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#15171f] p-3 rounded-2xl border border-neutral-800">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={reviewSearch}
                    onChange={e => setReviewSearch(e.target.value)}
                    placeholder="Şef adı, restoran, şehir, POS veya yorum ara..."
                    className="w-full pl-9 pr-3 py-2 bg-[#121318] border border-neutral-700/80 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={reviewVenueFilter}
                    onChange={e => setReviewVenueFilter(e.target.value)}
                    className="px-3 py-2 bg-[#121318] border border-neutral-700/80 rounded-xl text-xs text-neutral-300 focus:outline-none focus:border-[#c24128]"
                  >
                    <option value="all">Tüm Mutfak Türleri</option>
                    <option value="Alakart Restoran">Alakart Restoran</option>
                    <option value="Kafe & Roastery">Kafe & Roastery</option>
                    <option value="Çok Şubeli Zincir">Çok Şubeli Zincir</option>
                    <option value="Otel & Ziyafet">Otel & Ziyafet</option>
                    <option value="Meyhane & Bistro">Meyhane & Bistro</option>
                  </select>

                  <select
                    value={reviewFeaturedFilter}
                    onChange={e => setReviewFeaturedFilter(e.target.value as any)}
                    className="px-3 py-2 bg-[#121318] border border-neutral-700/80 rounded-xl text-xs text-neutral-300 focus:outline-none focus:border-[#c24128]"
                  >
                    <option value="all">Tüm Durumlar</option>
                    <option value="featured">Yayında Olanlar</option>
                    <option value="hidden">Gizlenenler</option>
                  </select>
                </div>
              </div>

              {/* Reviews Cards Grid */}
              {filteredReviews.length === 0 ? (
                <div className="bg-[#15171f] rounded-2xl p-12 text-center border border-neutral-800 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-neutral-800/80 flex items-center justify-center text-neutral-400 mx-auto">
                    <Star className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">Eşleşen Yorum Bulunamadı</h3>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                    Arama kriterlerinize uygun müşteri yorumu yok. Filtreleri temizleyebilir veya yeni bir yorum ekleyebilirsiniz.
                  </p>
                  <button
                    onClick={() => {
                      setReviewSearch('');
                      setReviewVenueFilter('all');
                      setReviewFeaturedFilter('all');
                    }}
                    className="px-4 py-2 bg-neutral-800 text-neutral-200 text-xs font-semibold rounded-xl hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredReviews.map(rev => {
                    const isFeatured = rev.featured !== false;
                    return (
                      <div
                        key={rev.id}
                        className={`bg-[#15171f] rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden group ${
                          isFeatured 
                            ? 'border-neutral-800 hover:border-neutral-700 shadow-md' 
                            : 'border-neutral-800/60 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <div className="p-5 space-y-4">
                          
                          {/* Card Top: Avatar, Name, Venue Info & Featured Toggle */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="relative shrink-0">
                                {rev.avatarImage ? (
                                  <img
                                    src={rev.avatarImage}
                                    alt={rev.name}
                                    className="w-12 h-12 rounded-2xl object-cover border border-neutral-700 shadow-sm"
                                  />
                                ) : (
                                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${rev.avatarColor || 'from-[#c24128] to-[#8d2a17]'} text-white flex items-center justify-center font-bold text-sm shadow-sm`}>
                                    {rev.avatarInitials}
                                  </div>
                                )}
                                {rev.verified && (
                                  <div className="absolute -bottom-1 -right-1 bg-[#15171f] rounded-full p-0.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0">
                                <h4 className="text-sm font-bold text-white truncate flex items-center gap-1.5">
                                  <span>{rev.name}</span>
                                </h4>
                                <p className="text-[11px] text-[#f26a4f] truncate font-medium">
                                  {rev.role}
                                </p>
                                <p className="text-[11px] text-neutral-400 truncate flex items-center gap-1 mt-0.5">
                                  <Store className="w-3 h-3 shrink-0 text-neutral-500" />
                                  <span className="truncate">{rev.restaurant}</span>
                                </p>
                              </div>
                            </div>

                            {/* Status Badge */}
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold shrink-0 ${
                              isFeatured
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                            }`}>
                              {isFeatured ? 'Yayında' : 'Gizli'}
                            </span>
                          </div>

                          {/* Location, POS, and Rating Row */}
                          <div className="flex flex-wrap items-center gap-2 text-[11px]">
                            <div className="flex items-center text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-600'}`}
                                />
                              ))}
                              <span className="ml-1 font-mono font-bold text-[10px]">{rev.rating}.0</span>
                            </div>

                            <div className="flex items-center gap-1 text-neutral-400 bg-[#121318] px-2 py-0.5 rounded-md border border-neutral-800">
                              <MapPin className="w-3 h-3 text-neutral-500" />
                              <span className="truncate">{rev.location}</span>
                            </div>

                            {rev.posSystem && (
                              <span className="px-2 py-0.5 rounded-md bg-[#181a24] text-neutral-300 font-mono text-[10px] border border-neutral-800">
                                {rev.posSystem}
                              </span>
                            )}
                          </div>

                          {/* Highlight Metric Pill */}
                          <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-transparent border border-emerald-500/30">
                            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                              <Sparkles className="w-3.5 h-3.5 shrink-0" />
                              <span className="leading-snug">{rev.highlightMetric}</span>
                            </div>
                          </div>

                          {/* Review Text */}
                          <div className="relative">
                            <Quote className="w-6 h-6 text-neutral-700/60 absolute -top-1 -left-1 pointer-events-none" />
                            <p className="text-xs text-neutral-300 leading-relaxed italic pl-5 line-clamp-4">
                              "{rev.reviewText}"
                            </p>
                          </div>

                        </div>

                        {/* Card Footer Actions */}
                        <div className="p-3 bg-[#121318] border-t border-neutral-800/80 flex items-center justify-between text-xs">
                          <span className="text-[10px] font-mono text-neutral-500">{rev.date}</span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleToggleReviewFeatured(rev.id)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                                isFeatured
                                  ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                                  : 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30'
                              }`}
                              title={isFeatured ? 'Anasayfadan Kaldır' : 'Anasayfada Göster'}
                            >
                              {isFeatured ? 'Gizle' : 'Öne Çıkar'}
                            </button>

                            <button
                              onClick={() => handleOpenEditReview(rev)}
                              className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded-lg transition-colors cursor-pointer"
                              title="Yorumu Düzenle"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteReviewItem(rev.id)}
                              className="p-1.5 bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                              title="Yorumu Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

        </main>

      </div>

      {/* MODAL 1: Lead Detail & Notes Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#161820] rounded-2xl border border-neutral-700 max-w-lg w-full p-4 sm:p-6 space-y-4 shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedLead.restaurantName}</h3>
                <p className="text-xs text-neutral-400">{selectedLead.city} · {selectedLead.venueType}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-[#121318] p-3 rounded-xl border border-neutral-800 font-mono">
              <div>
                <span className="text-neutral-500 block">Yetkili Kişi:</span>
                <span className="text-white font-semibold">{selectedLead.contactName}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Telefon:</span>
                <span className="text-white font-semibold">{selectedLead.phone}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">E-posta:</span>
                <span className="text-neutral-300">{selectedLead.email}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Mevcut POS:</span>
                <span className="text-[#f26a4f] font-semibold">{selectedLead.posSystem}</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-medium text-neutral-300">Görüşme Notları / CRM Kaydı:</label>
              <textarea
                rows={3}
                defaultValue={selectedLead.notes || ''}
                id="leadNotesInput"
                placeholder="Bu restoranla ilgili yapılan görüşme notlarını buraya kaydedin..."
                className="w-full p-3 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono text-neutral-500">{selectedLead.date}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Kapat
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('leadNotesInput') as HTMLTextAreaElement;
                    if (el) handleSaveLeadNote(selectedLead.id, el.value);
                    setSelectedLead(null);
                  }}
                  className="px-4 py-2 bg-[#c24128] hover:bg-[#aa3620] text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Notu Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Message Reply Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#161820] rounded-2xl border border-neutral-700 max-w-lg w-full p-4 sm:p-6 space-y-4 shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-bold text-white">Mesajı Yanıtla: {selectedMessage.subject}</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#121318] p-3 rounded-xl border border-neutral-800 text-xs">
              <p className="text-neutral-400 font-mono text-[11px] mb-1">
                Kime: <strong className="text-white">{selectedMessage.sender}</strong> ({selectedMessage.email})
              </p>
              <p className="text-neutral-300 italic">"{selectedMessage.message}"</p>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-medium text-neutral-300">GastroStok Yanıt Metni:</label>
              <textarea
                rows={4}
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Merhaba, sorunuz için teşekkür ederiz..."
                className="w-full p-3 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-semibold cursor-pointer"
              >
                İptal
              </button>
              <button
                onClick={() => handleSendReply(selectedMessage.id)}
                disabled={!replyText.trim()}
                className="px-4 py-2 bg-[#c24128] hover:bg-[#aa3620] disabled:opacity-40 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Yanıtı Gönder</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Add / Edit Blog Post Modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#161820] rounded-2xl border border-neutral-700 max-w-2xl w-full p-4 sm:p-6 space-y-4 shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-lg font-bold text-white">
                {editingPost ? 'Blog Makalesini Düzenle' : 'Yeni Blog Makalesi Oluştur'}
              </h3>
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Makale Başlığı *</label>
                <input
                  type="text"
                  required
                  value={newPostTitle}
                  onChange={e => setNewPostTitle(e.target.value)}
                  placeholder="Örn: Restoranlarda Porsiyon Sapmalarını Sıfırlama Yolları"
                  className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Kategori</label>
                  <select
                    value={newPostCategory}
                    onChange={e => setNewPostCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                  >
                    <option value="Mutfak Yönetimi">Mutfak Yönetimi</option>
                    <option value="Kafe & Barista">Kafe & Barista</option>
                    <option value="Maliyet & Kârlılık">Maliyet & Kârlılık</option>
                    <option value="Veri & AI">Veri & AI</option>
                    <option value="Tedarik Zinciri">Tedarik Zinciri</option>
                    <option value="Depo & Lojistik">Depo & Lojistik</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Tahmini Okuma Süresi</label>
                  <input
                    type="text"
                    value={newPostReadTime}
                    onChange={e => setNewPostReadTime(e.target.value)}
                    placeholder="Örn: 5 dk okuma"
                    className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Kapak Resmi Dosya Yolu / URL</label>
                <input
                  type="text"
                  value={newPostImage}
                  onChange={e => setNewPostImage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white font-mono text-[11px] focus:outline-none focus:border-[#c24128]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Yazar Adı</label>
                  <input
                    type="text"
                    value={newPostAuthorName}
                    onChange={e => setNewPostAuthorName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Yazar Unvanı</label>
                  <input
                    type="text"
                    value={newPostAuthorRole}
                    onChange={e => setNewPostAuthorRole(e.target.value)}
                    className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Kısa Özet (Summary)</label>
                <textarea
                  rows={2}
                  value={newPostSummary}
                  onChange={e => setNewPostSummary(e.target.value)}
                  placeholder="Makale kartında görünecek çarpıcı bir cümle..."
                  className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Makale İçeriği (Paragraflar arasında çift satır boşluk bırakın)
                </label>
                <textarea
                  rows={5}
                  value={newPostContent}
                  onChange={e => setNewPostContent(e.target.value)}
                  placeholder="Makalenin detaylı içeriğini buraya yazın..."
                  className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#c24128] hover:bg-[#aa3620] text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {editingPost ? 'Değişiklikleri Güncelle' : 'Makaleyi Yayınla'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Add / Edit Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#161820] rounded-2xl border border-neutral-700 max-w-2xl w-full p-4 sm:p-6 space-y-4 shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {editingReview ? 'Müşteri Yorumunu Düzenle' : 'Yeni Müşteri Yorumu & Şef Ekle'}
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Anasayfada yer alan öne çıkan müşteri yorumları bölümüyle senkronize edilir.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4 text-xs">
              
              {/* Row 1: Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Şef / Yetkili Adı Soyadı *</label>
                  <input
                    type="text"
                    required
                    value={reviewFormName}
                    onChange={e => setReviewFormName(e.target.value)}
                    placeholder="Örn: Şef Burak Taşkın"
                    className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Görevi / Pozisyonu *</label>
                  <input
                    type="text"
                    required
                    value={reviewFormRole}
                    onChange={e => setReviewFormRole(e.target.value)}
                    placeholder="Örn: Yönetici Şef & Kurucu Ortak"
                    className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                  />
                </div>
              </div>

              {/* Row 2: Restaurant Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Restoran / İşletme Adı *</label>
                  <input
                    type="text"
                    required
                    value={reviewFormRestaurant}
                    onChange={e => setReviewFormRestaurant(e.target.value)}
                    placeholder="Örn: Bistro Galata"
                    className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Şehir & İlçe *</label>
                  <input
                    type="text"
                    required
                    value={reviewFormLocation}
                    onChange={e => setReviewFormLocation(e.target.value)}
                    placeholder="Örn: Beyoğlu, İstanbul"
                    className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                  />
                </div>
              </div>

              {/* Row 3: Venue Type & POS System */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Mutfak / İşletme Türü</label>
                  <select
                    value={reviewFormVenueType}
                    onChange={e => setReviewFormVenueType(e.target.value as ReviewItem['venueType'])}
                    className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                  >
                    <option value="Alakart Restoran">Alakart Restoran</option>
                    <option value="Kafe & Roastery">Kafe & Roastery</option>
                    <option value="Çok Şubeli Zincir">Çok Şubeli Zincir</option>
                    <option value="Otel & Ziyafet">Otel & Ziyafet</option>
                    <option value="Meyhane & Bistro">Meyhane & Bistro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Entegre POS Sistemi</label>
                  <input
                    type="text"
                    value={reviewFormPosSystem}
                    onChange={e => setReviewFormPosSystem(e.target.value)}
                    placeholder="Örn: SambaPOS, Simpra POS, Mikro"
                    className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                  />
                </div>
              </div>

              {/* Row 4: Star Rating & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Puan Değerlendirmesi</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewFormRating(star)}
                        className={`p-2 rounded-xl border flex items-center gap-1 cursor-pointer transition-colors ${
                          reviewFormRating >= star 
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' 
                            : 'bg-[#121318] border-neutral-800 text-neutral-600'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${reviewFormRating >= star ? 'fill-amber-400' : ''}`} />
                        <span className="font-mono text-xs">{star}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Yorum Tarihi</label>
                  <input
                    type="text"
                    value={reviewFormDate}
                    onChange={e => setReviewFormDate(e.target.value)}
                    placeholder="Örn: Ekim 2026"
                    className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                  />
                </div>
              </div>

              {/* Row 5: Highlight Metric */}
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Öne Çıkan Başarı / Tasarruf Metriği *
                </label>
                <input
                  type="text"
                  required
                  value={reviewFormHighlightMetric}
                  onChange={e => setReviewFormHighlightMetric(e.target.value)}
                  placeholder="Örn: %72 Fire Azalması · ₺380.000 Yıllık Tasarruf"
                  className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128]"
                />
              </div>

              {/* Row 6: Review Text */}
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Müşteri Yorumu (Alıntı Metni) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={reviewFormReviewText}
                  onChange={e => setReviewFormReviewText(e.target.value)}
                  placeholder="Şefin veya işletmecinin GastroStok hakkındaki samimi değerlendirmesini buraya yazın..."
                  className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-[#c24128] leading-relaxed"
                />
              </div>

              {/* Row 7: Avatar Selection & Presets */}
              <div className="space-y-2">
                <label className="block text-neutral-300 font-medium">
                  Profil Fotoğrafı Seçimi (Gerçek Restoran Şefleri & İşletmeciler)
                </label>
                
                {/* 6 Avatar Presets */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {AVATAR_PRESETS.map((preset) => {
                    const isSelected = reviewFormAvatarImage === preset.path;
                    return (
                      <button
                        type="button"
                        key={preset.path}
                        onClick={() => {
                          setReviewFormAvatarImage(preset.path);
                          if (!editingReview && !reviewFormName) {
                            setReviewFormName(preset.label);
                          }
                        }}
                        className={`flex items-center gap-2 p-2 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#c24128]/20 border-[#c24128] text-white shadow-sm'
                            : 'bg-[#121318] border-neutral-800 hover:border-neutral-700 text-neutral-300'
                        }`}
                      >
                        <img
                          src={preset.path}
                          alt={preset.label}
                          className="w-8 h-8 rounded-full object-cover shrink-0 border border-neutral-700"
                        />
                        <span className="text-[11px] font-medium truncate">{preset.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-1">
                  <label className="block text-neutral-400 text-[11px] mb-1">Özel Görsel Dosya Yolu veya URL</label>
                  <input
                    type="text"
                    value={reviewFormAvatarImage}
                    onChange={e => setReviewFormAvatarImage(e.target.value)}
                    placeholder="/src/assets/images/chef_avatar.jpg veya https://..."
                    className="w-full px-3 py-2 bg-[#121318] border border-neutral-700 rounded-xl text-white font-mono text-[11px] focus:outline-none focus:border-[#c24128]"
                  />
                </div>
              </div>

              {/* Row 8: Featured Switch */}
              <div className="p-3 bg-[#121318] rounded-xl border border-neutral-800 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">Anasayfada Öne Çıkar</p>
                  <p className="text-[11px] text-neutral-400">
                    Açık olduğunda bu yorum anasayfadaki "Öne Çıkan Müşteri Yorumları" bölümünde ziyaretçilere gösterilir.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reviewFormFeatured}
                    onChange={e => setReviewFormFeatured(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-semibold cursor-pointer hover:bg-neutral-700"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#c24128] hover:bg-[#aa3620] text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm"
                >
                  {editingReview ? 'Değişiklikleri Güncelle' : 'Müşteri Yorumunu Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
