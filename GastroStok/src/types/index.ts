export type PageView = 'home' | 'about' | 'blog' | 'contact' | 'modules' | 'admin' | 'member';

export type ModuleId = 'stok' | 'fire' | 'tahmin' | 'siparis';

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  restaurantName: string;
  restaurantType: string;
  city: string;
  role: string;
  posSystem: string;
  tier: 'Free' | 'Pro' | 'Enterprise';
  tierExpiry: string;
  joinedDate: string;
  notifications: {
    emailAlerts: boolean;
    smsAlerts: boolean;
    weeklyDigest: boolean;
    criticalStockSms: boolean;
  };
  stockAlertThreshold: number;
  twoFactorEnabled?: boolean;
}

export interface SavedRecipe {
  id: string;
  name: string;
  category: string;
  portionCost: number;
  portionPrice: number;
  wasteTarget: number;
  prepTime: string;
  ingredientsCount: number;
  lastUpdated: string;
}

export interface SubscriptionInvoice {
  id: string;
  date: string;
  amount: string;
  plan: string;
  status: 'Ödendi' | 'Beklemede';
  invoiceNo: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Baş Aşçı' | 'Sous Chef' | 'Barista' | 'Depo Sorumlusu' | 'F&B Müdürü';
  accessLevel: 'Yönetici' | 'Düzenleyebilir' | 'Görüntüleyici';
  status: 'Aktif' | 'Davet Gönderildi';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  image: string;
  author: {
    name: string;
    role: string;
  };
}

export interface SponsorItem {
  id: string;
  name: string;
  category: string;
  description: string;
  badge: string;
}

export interface LeadItem {
  id: string;
  restaurantName: string;
  contactName: string;
  phone: string;
  email: string;
  city: string;
  venueType: string;
  posSystem: string;
  date: string;
  status: 'Yeni' | 'İletişimde' | 'Demo Yapıldı' | 'Onaylandı' | 'Arşivlendi';
  notes?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  restaurant: string;
  location: string;
  venueType: 'Alakart Restoran' | 'Kafe & Roastery' | 'Çok Şubeli Zincir' | 'Otel & Ziyafet' | 'Meyhane & Bistro';
  avatarInitials: string;
  avatarColor: string;
  avatarImage: string;
  rating: number;
  highlightMetric: string;
  reviewText: string;
  date: string;
  verified: boolean;
  posSystem: string;
  featured?: boolean;
}



