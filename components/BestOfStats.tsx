'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface BestOfStatsProps {
  totalCount: number;
  avgRating: number;
  hasPhone: number;
  hasWebsite: number;
  topRating: number;
}

export default function BestOfStats({ totalCount, avgRating, hasPhone, hasWebsite, topRating }: BestOfStatsProps) {
  const { t } = useLanguage();

  const phonePercentage = Math.round((hasPhone / totalCount) * 100);
  const websitePercentage = Math.round((hasWebsite / totalCount) * 100);

  return (
    <div className="bg-gradient-to-br from-white to-[#FFF9F0] rounded-2xl shadow-xl border-2 border-[#E6D4B0] p-8 mb-12">
      <h2 className="text-2xl font-bold text-[#2D5F43] mb-6 flex items-center gap-3">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
        {t('best.stats.title')}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Average Rating */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#E6D4B0] hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-[#2D5F43] mb-1">
            {avgRating.toFixed(1)} ⭐
          </div>
          <div className="text-sm text-gray-600">
            {t('best.stats.avg.rating')}
          </div>
        </div>

        {/* Top Rating */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#E6D4B0] hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-[#2D5F43] mb-1">
            {topRating.toFixed(1)} 🏆
          </div>
          <div className="text-sm text-gray-600">
            {t('best.stats.top.rating')}
          </div>
        </div>

        {/* Phone Coverage */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#E6D4B0] hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-[#2D5F43] mb-1">
            {phonePercentage}%
          </div>
          <div className="text-sm text-gray-600">
            {t('best.stats.has.phone')}
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${phonePercentage}%` }}
            />
          </div>
        </div>

        {/* Website Coverage */}
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#E6D4B0] hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-[#2D5F43] mb-1">
            {websitePercentage}%
          </div>
          <div className="text-sm text-gray-600">
            {t('best.stats.has.website')}
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${websitePercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

