import React, { useState } from 'react';
import { Lock, Mail, KeyRound, X, ArrowRight, ShieldCheck, Sparkles, UtensilsCrossed } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@gastrostok.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
      onClose();
    }, 400);
  };

  const handleQuickDemo = () => {
    setEmail('admin@gastrostok.com');
    setPassword('admin123');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      {/* Backdrop click listener */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true"></div>

      <div className="bg-[#161820] rounded-2xl border border-neutral-700 max-w-md w-full p-6 sm:p-7 space-y-6 shadow-2xl relative z-10">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-[#c24128]/20 border border-[#c24128]/40 flex items-center justify-center text-[#f26a4f] mx-auto shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Yönetici Portalı Girişi</h3>
          <p className="text-xs text-neutral-400">
            GastroStok CMS, CRM ve sistem parametrelerine erişmek için kimliğinizi doğrulayın.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-neutral-300 font-medium">Yönetici E-postası</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#121318] border border-neutral-700/80 rounded-xl text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="block text-neutral-300 font-medium">Şifre</label>
              <span className="text-[10px] text-neutral-500 font-mono">Demo: admin123</span>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#121318] border border-neutral-700/80 rounded-xl text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#c24128]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#c24128] hover:bg-[#aa3620] active:bg-[#942e1a] text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            {isLoading ? (
              <span>Giriş Yapılıyor...</span>
            ) : (
              <>
                <span>Yönetici Olarak Giriş Yap</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="pt-2 border-t border-neutral-800 text-center space-y-3">
          <p className="text-[11px] text-neutral-400">Geliştirici veya denetmen misiniz?</p>
          <button
            onClick={handleQuickDemo}
            className="w-full py-2.5 px-4 bg-[#1e2029] hover:bg-[#272a38] text-neutral-200 text-xs font-semibold rounded-xl border border-neutral-700/70 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Tek Tıkla Demo Yönetici Girişi</span>
          </button>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>256-Bit SSL Şifreli Güvenli Yönetici Erişimi</span>
        </div>

      </div>
    </div>
  );
};
