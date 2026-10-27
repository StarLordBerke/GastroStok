import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { X, Calendar, Clock, User, CheckCircle2, Share2, ArrowLeft, Check } from 'lucide-react';
import { getAssetUrl, handleImageFallback } from '../utils/assets';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && post) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [post, onClose]);

  if (!post) return null;

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true"></div>

      <div className="relative w-full max-w-3xl bg-[#161820] rounded-2xl border border-neutral-700/80 shadow-2xl z-10 max-h-[92vh] overflow-y-auto">
        
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 px-5 sm:px-6 py-4 bg-[#121318]/95 backdrop-blur-md border-b border-neutral-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Listeye Dön</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-400 px-2.5 py-1 bg-neutral-800 rounded-md">
              {post.category}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-900">
          <img
            src={getAssetUrl(post.image)}
            alt={post.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={handleImageFallback}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161820] via-transparent to-transparent"></div>
        </div>

        {/* Article Content */}
        <div className="p-6 sm:p-10 space-y-8 -mt-6 relative z-10">
          
          {/* Metadata */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#e05338]" /> {post.date}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-400" /> {post.readTime}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-neutral-300">
                <User className="w-3.5 h-3.5 text-[#e05338]" /> {post.author.name} ({post.author.role})
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-base text-neutral-300 font-medium leading-relaxed pb-4 border-b border-neutral-800">
              {post.summary}
            </p>
          </div>

          {/* Key Takeaways Box */}
          <div className="bg-[#1b1e28] rounded-xl p-5 border border-neutral-700/80 space-y-3">
            <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-[#f26a4f]">
              Yazıdan Çıkarılacak Temel Dersler:
            </h4>
            <ul className="space-y-2 text-sm text-neutral-200">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#e05338] shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full Paragraphs */}
          <div className="space-y-5 text-neutral-200 text-sm sm:text-base leading-relaxed">
            {post.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author Footnote */}
          <div className="pt-6 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>Yazar: {post.author.name} · {post.author.role}</span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Bağlantı Kopyalandı</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Paylaş</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
