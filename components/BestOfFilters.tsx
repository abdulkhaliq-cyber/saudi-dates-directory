'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BestOfFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  minRating: number;
  hasPhone: boolean;
  hasWebsite: boolean;
}

export default function BestOfFilters({ onFilterChange }: BestOfFiltersProps) {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<FilterState>({
    minRating: 0,
    hasPhone: false,
    hasWebsite: false,
  });

  const handleRatingChange = (rating: number) => {
    const newFilters = { ...filters, minRating: rating };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleToggle = (key: 'hasPhone' | 'hasWebsite') => {
    const newFilters = { ...filters, [key]: !filters[key] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const resetState = { minRating: 0, hasPhone: false, hasWebsite: false };
    setFilters(resetState);
    onFilterChange(resetState);
  };

  const hasActiveFilters = filters.minRating > 0 || filters.hasPhone || filters.hasWebsite;

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-[#E6D4B0] p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#2D5F43] flex items-center gap-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          {t('best.filters.title')}
        </h3>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-[#3B7A57] hover:text-[#2D5F43] font-semibold flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            {t('filter.reset')}
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Minimum Rating Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {t('best.filters.min.rating')}
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 0, label: t('best.filters.all') },
              { value: 3, label: '3+ ⭐' },
              { value: 4, label: '4+ ⭐' },
              { value: 4.5, label: '4.5+ ⭐' },
              { value: 5, label: '5 ⭐' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => handleRatingChange(option.value)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  filters.minRating === option.value
                    ? 'bg-gradient-to-r from-[#3B7A57] to-[#4A9B6E] text-white shadow-lg scale-105'
                    : 'bg-[#F5E6CA] text-[#2D5F43] hover:bg-[#E6D4B0]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Filters */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {t('best.filters.features')}
          </label>
          <div className="space-y-3">
            {/* Has Phone */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.hasPhone}
                onChange={() => handleToggle('hasPhone')}
                className="w-5 h-5 rounded border-2 border-[#3B7A57] text-[#3B7A57] focus:ring-2 focus:ring-[#3B7A57] focus:ring-offset-0 cursor-pointer"
              />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#3B7A57]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-700 group-hover:text-[#2D5F43] font-medium">
                  {t('best.filters.has.phone')}
                </span>
              </div>
            </label>

            {/* Has Website */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.hasWebsite}
                onChange={() => handleToggle('hasWebsite')}
                className="w-5 h-5 rounded border-2 border-[#3B7A57] text-[#3B7A57] focus:ring-2 focus:ring-[#3B7A57] focus:ring-offset-0 cursor-pointer"
              />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#3B7A57]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 group-hover:text-[#2D5F43] font-medium">
                  {t('best.filters.has.website')}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-[#E6D4B0]">
            <div className="flex flex-wrap gap-2">
              {filters.minRating > 0 && (
                <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                  ⭐ {filters.minRating}+
                  <button
                    onClick={() => handleRatingChange(0)}
                    className="hover:bg-yellow-200 rounded-full p-0.5"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
              {filters.hasPhone && (
                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  📞 {t('best.filters.with.phone')}
                  <button
                    onClick={() => handleToggle('hasPhone')}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
              {filters.hasWebsite && (
                <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                  🌐 {t('best.filters.with.website')}
                  <button
                    onClick={() => handleToggle('hasWebsite')}
                    className="hover:bg-purple-200 rounded-full p-0.5"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

