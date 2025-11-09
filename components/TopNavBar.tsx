'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function TopNavBar() {
  const { t, isRTL } = useLanguage();

  return (
    <nav className="bg-white border-b border-[#E6D4B0] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🌴</span>
          <span className="text-xl font-bold text-[#2D5F43] group-hover:text-[#3B7A57] transition-colors">
            DatesSouq
          </span>
        </Link>

        {/* Center Navigation */}
        <div className={`hidden md:flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Link 
            href="/best" 
            className="text-[#2D5F43] hover:text-[#3B7A57] font-medium transition-colors"
          >
            {isRTL ? 'الأفضل' : 'Best Of'}
          </Link>
          <Link 
            href="/about" 
            className="text-[#2D5F43] hover:text-[#3B7A57] font-medium transition-colors"
          >
            {isRTL ? 'من نحن' : 'About'}
          </Link>
          <Link 
            href="/contact" 
            className="text-[#2D5F43] hover:text-[#3B7A57] font-medium transition-colors"
          >
            {isRTL ? 'تواصل' : 'Contact'}
          </Link>
        </div>

        {/* Right Actions */}
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <LanguageToggle />
          
          <Link 
            href="/advertise" 
            className="hidden sm:block px-4 py-2 bg-[#F5E6CA] text-[#2D5F43] font-semibold rounded-lg hover:bg-[#E6D4B0] transition-all border border-[#D4C29A]"
          >
            {isRTL ? '🎯 أعلن معنا' : '🎯 Advertise'}
          </Link>
          
          <Link 
            href="/contact" 
            className="px-4 py-2 bg-[#3B7A57] text-white font-semibold rounded-lg hover:bg-[#2D5F43] transition-all shadow-md"
          >
            {isRTL ? '+ إضافة عملك' : '+ Add Business'}
          </Link>
        </div>
      </div>

      {/* Mobile Menu (optional - simplified) */}
      <div className="md:hidden border-t border-[#E6D4B0] px-6 py-3 flex gap-4 overflow-x-auto">
        <Link href="/best" className="text-sm text-[#2D5F43] whitespace-nowrap">
          {isRTL ? 'الأفضل' : 'Best Of'}
        </Link>
        <Link href="/about" className="text-sm text-[#2D5F43] whitespace-nowrap">
          {isRTL ? 'من نحن' : 'About'}
        </Link>
        <Link href="/contact" className="text-sm text-[#2D5F43] whitespace-nowrap">
          {isRTL ? 'تواصل' : 'Contact'}
        </Link>
        <Link href="/advertise" className="text-sm text-[#2D5F43] whitespace-nowrap">
          {isRTL ? 'أعلن معنا' : 'Advertise'}
        </Link>
      </div>
    </nav>
  );
}

