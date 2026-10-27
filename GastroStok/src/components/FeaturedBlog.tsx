import React from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { BlogPost } from '../types';
import { BookOpen, ArrowRight, Clock, Calendar, User } from 'lucide-react';
import { getAssetUrl, handleImageFallback } from '../utils/assets';

interface FeaturedBlogProps {
  onSelectPost: (post: BlogPost) => void;
  onNavigateToBlog: () => void;
}

export const FeaturedBlog: React.FC<FeaturedBlogProps> = ({ onSelectPost, onNavigateToBlog }) => {
  return (
    <section id="blog-one-cikanlar" className="py-20 bg-[#121317] border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e05338]">
              <BookOpen className="w-4 h-4" />
              <span>GastroStok İçgörüleri & Rehberler</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Öne Çıkan Mutfak ve Stok Makaleleri
            </h2>
            <p className="text-sm sm:text-base text-neutral-300">
              Şefler, kafe yöneticileri ve işletme sahipleri için gıda maliyeti kontrolü, fire yönetimi ve menü mühendisliği ipuçları.
            </p>
          </div>

          <button
            onClick={onNavigateToBlog}
            className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-750 px-5 py-3 rounded-xl border border-neutral-700/80 hover:border-[#c24128]/50 transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            <span>Tüm Blog Sayfasını Gör (11 Makale)</span>
            <ArrowRight className="w-4 h-4 text-[#f26a4f]" />
          </button>
        </div>

        {/* 6 Featured Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {BLOG_POSTS.slice(0, 6).map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="bg-[#171920] rounded-2xl border border-neutral-800 overflow-hidden hover:border-[#c24128]/40 transition-all flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-[#c24128]/5"
            >
              <div>
                {/* Image Container with Fallback */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={getAssetUrl(post.image)}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={handleImageFallback}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171920] via-transparent to-transparent opacity-80"></div>
                  
                  {/* Category Chip */}
                  <div className="absolute top-3 left-3 bg-[#111215]/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-neutral-200 border border-neutral-700/70">
                    {post.category}
                  </div>
                </div>

                {/* Article Body */}
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

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#f26a4f] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 border-t border-neutral-800/80 bg-[#15171d] flex items-center justify-between text-xs">
                <span className="text-neutral-400 flex items-center gap-1.5 font-medium truncate max-w-[160px]">
                  <User className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span className="truncate">{post.author.name}</span>
                </span>

                <span className="text-[#f26a4f] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                  <span>Oku</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
