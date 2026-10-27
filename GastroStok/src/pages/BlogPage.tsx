import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { BlogPost } from '../types';
import { Search, Calendar, Clock, User, ArrowRight, BookOpen, Filter } from 'lucide-react';
import { getAssetUrl, handleImageFallback } from '../utils/assets';

interface BlogPageProps {
  onSelectPost: (post: BlogPost) => void;
  onOpenRegister: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onSelectPost, onOpenRegister }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const categories = [
    'Tümü',
    'Mutfak Yönetimi',
    'Kafe & Barista',
    'Depo & Lojistik',
    'Veri & AI',
    'Maliyet & Kârlılık',
    'Tedarik Zinciri'
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'Tümü' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-20 bg-[#111215]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e05338]">
            <BookOpen className="w-4 h-4" />
            <span>GastroStok Blog & Yayınları</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Restoran ve Kafe Yönetimi Rehberleri
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            Mutfaktaki fireyi durdurmak, menü kârlılığını maksimize etmek ve tedarik zincirini dijitalleştirmek için hazırlanan uzman makaleleri.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#16181f] p-4 sm:p-5 rounded-2xl border border-neutral-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Makale başlığı, konu veya anahtar kelime ara..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#111215] border border-neutral-700/80 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
              />
            </div>

            {/* Clear button if filtered */}
            {(searchTerm || selectedCategory !== 'Tümü') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Tümü');
                }}
                className="text-xs text-neutral-400 hover:text-white underline cursor-pointer shrink-0"
              >
                Filtreleri Temizle
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#c24128] text-white shadow-sm'
                    : 'bg-[#1e2029] text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts List */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onSelectPost(post)}
                className="bg-[#171920] rounded-2xl border border-neutral-800 overflow-hidden hover:border-[#c24128]/50 transition-all flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-[#c24128]/5"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={getAssetUrl(post.image)}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={handleImageFallback}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171920] via-transparent to-transparent opacity-80"></div>
                    
                    <div className="absolute top-3 left-3 bg-[#111215]/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-neutral-200 border border-neutral-700/70">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#e05338]" /> {post.date}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-neutral-400" /> {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-white group-hover:text-[#f26a4f] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-300 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-neutral-800/80 bg-[#15171d] flex items-center justify-between text-xs">
                  <span className="text-neutral-400 flex items-center gap-1.5 font-medium truncate max-w-[170px]">
                    <User className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="truncate">{post.author.name}</span>
                  </span>

                  <span className="text-[#f26a4f] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                    <span>Makaleyi Oku</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-[#171920] rounded-2xl border border-neutral-800 space-y-3">
            <Filter className="w-8 h-8 text-neutral-500 mx-auto" />
            <h3 className="text-base font-semibold text-white">Aradığınız kriterlere uygun makale bulunamadı</h3>
            <p className="text-xs text-neutral-400">Lütfen arama terimini değiştirin veya başka bir kategori seçin.</p>
          </div>
        )}

      </div>
    </div>
  );
};
