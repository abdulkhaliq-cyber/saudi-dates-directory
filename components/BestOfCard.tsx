'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface BestOfCardProps {
  listing: {
    id: number;
    name: string;
    city?: string | null;
    category?: string | null;
    rating?: number | null;
    description?: string | null;
    website?: string | null;
  };
  rank: number;
}

export default function BestOfCard({ listing, rank }: BestOfCardProps) {
  const { t } = useLanguage();
  
  const isTopThree = rank <= 3;
  
  const getRankBadge = () => {
    if (rank === 1) return { emoji: '🥇', color: 'from-yellow-400 to-yellow-600', text: 'text-yellow-900' };
    if (rank === 2) return { emoji: '🥈', color: 'from-gray-300 to-gray-500', text: 'text-gray-900' };
    if (rank === 3) return { emoji: '🥉', color: 'from-orange-300 to-orange-500', text: 'text-orange-900' };
    return { emoji: '🏆', color: 'from-[#3B7A57] to-[#4A9B6E]', text: 'text-white' };
  };

  const badge = getRankBadge();

  return (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
      isTopThree ? 'border-[#D4C29A]' : 'border-[#E6D4B0]'
    }`}>
      {/* Rank Badge */}
      <div className={`bg-gradient-to-r ${badge.color} px-6 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{badge.emoji}</span>
          <span className={`font-bold text-xl ${badge.text}`}>
            #{rank}
          </span>
        </div>
        {listing.rating && (
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className={`font-bold ${badge.text}`}>{listing.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#2D5F43] mb-3 line-clamp-2">
          {listing.name}
        </h3>

        <div className="space-y-2 mb-4">
          {listing.city && (
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4 text-[#3B7A57]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{listing.city}</span>
            </div>
          )}
          
          {listing.category && (
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4 text-[#3B7A57]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              <span className="text-sm">{listing.category}</span>
            </div>
          )}
        </div>

        {listing.description && (
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">
            {listing.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/listing/${listing.id}`}
            className="flex-1 text-center bg-gradient-to-r from-[#3B7A57] to-[#4A9B6E] hover:from-[#2D5F43] hover:to-[#3B7A57] text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg"
          >
            {t('view.details')}
          </Link>
          
          {listing.website && (
            <a
              href={listing.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-[#F5E6CA] hover:bg-[#E6D4B0] text-[#2D5F43] font-bold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg border-2 border-[#E6D4B0]"
              title={t('listing.visit.website')}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

