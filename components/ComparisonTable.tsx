'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface Listing {
  id: number;
  name: string;
  city?: string | null;
  category?: string | null;
  rating?: number | null;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
}

interface ComparisonTableProps {
  topThree: Listing[];
}

export default function ComparisonTable({ topThree }: ComparisonTableProps) {
  const { t } = useLanguage();

  if (topThree.length < 2) return null;

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-[#E6D4B0] mb-12">
      <div className="bg-gradient-to-r from-[#3B7A57] to-[#4A9B6E] px-8 py-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          {t('best.compare.top')} {topThree.length}
        </h2>
        <p className="text-[#FFF5E6] mt-2">
          {t('best.compare.description')}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F5E6CA]">
              <th className="px-6 py-4 text-left text-sm font-bold text-[#2D5F43]">
                {t('best.compare.feature')}
              </th>
              {topThree.map((listing, index) => (
                <th key={listing.id} className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      {index === 0 && <span className="text-2xl">🥇</span>}
                      {index === 1 && <span className="text-2xl">🥈</span>}
                      {index === 2 && <span className="text-2xl">🥉</span>}
                      <span className="text-sm font-bold text-[#2D5F43]">#{index + 1}</span>
                    </div>
                    <Link 
                      href={`/listing/${listing.id}`}
                      className="text-sm font-bold text-[#3B7A57] hover:text-[#2D5F43] text-center line-clamp-2 hover:underline"
                    >
                      {listing.name}
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6D4B0]">
            {/* Rating */}
            <tr className="hover:bg-[#FFF9F0] transition-colors">
              <td className="px-6 py-4 font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {t('listing.rating')}
              </td>
              {topThree.map(listing => (
                <td key={listing.id} className="px-6 py-4 text-center">
                  <span className="inline-flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full text-lg font-bold text-yellow-700">
                    ⭐ {listing.rating?.toFixed(1) || 'N/A'}
                  </span>
                </td>
              ))}
            </tr>

            {/* Location */}
            <tr className="hover:bg-[#FFF9F0] transition-colors">
              <td className="px-6 py-4 font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#3B7A57]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {t('listing.location')}
              </td>
              {topThree.map(listing => (
                <td key={listing.id} className="px-6 py-4 text-center text-gray-700">
                  {listing.city || 'N/A'}
                </td>
              ))}
            </tr>

            {/* Category */}
            <tr className="hover:bg-[#FFF9F0] transition-colors">
              <td className="px-6 py-4 font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#3B7A57]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                {t('listing.category')}
              </td>
              {topThree.map(listing => (
                <td key={listing.id} className="px-6 py-4 text-center text-gray-700">
                  {listing.category || 'N/A'}
                </td>
              ))}
            </tr>

            {/* Phone */}
            <tr className="hover:bg-[#FFF9F0] transition-colors">
              <td className="px-6 py-4 font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#3B7A57]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {t('listing.phone')}
              </td>
              {topThree.map(listing => (
                <td key={listing.id} className="px-6 py-4 text-center">
                  {listing.phone ? (
                    <span className="text-green-600 font-semibold">✓ {t('best.available')}</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Website */}
            <tr className="hover:bg-[#FFF9F0] transition-colors">
              <td className="px-6 py-4 font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#3B7A57]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                </svg>
                {t('listing.website')}
              </td>
              {topThree.map(listing => (
                <td key={listing.id} className="px-6 py-4 text-center">
                  {listing.website ? (
                    <a 
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3B7A57] hover:text-[#2D5F43] font-semibold hover:underline"
                    >
                      ✓ {t('best.visit')}
                    </a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Action */}
            <tr className="bg-[#FFF9F0]">
              <td className="px-6 py-4 font-semibold text-gray-700">
                {t('best.action')}
              </td>
              {topThree.map(listing => (
                <td key={listing.id} className="px-6 py-4 text-center">
                  <Link
                    href={`/listing/${listing.id}`}
                    className="inline-block bg-gradient-to-r from-[#3B7A57] to-[#4A9B6E] hover:from-[#2D5F43] hover:to-[#3B7A57] text-white font-bold py-2 px-6 rounded-lg transition-all duration-200 hover:shadow-lg"
                  >
                    {t('view.details')}
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

