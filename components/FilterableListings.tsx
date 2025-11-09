'use client';

// Client-side filterable listings component with SWR
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import HorizontalListingCard from './HorizontalListingCard';
import AffiliateBanner from './AffiliateBanner';
import { useLanguage } from '@/contexts/LanguageContext';

interface Listing {
  id: number;
  name: string;
  category?: string | null;
  city?: string | null;
  phone?: string | null;
  rating?: number | null;
}

interface FilterableListingsProps {
  initialListings: Listing[];
  cities: Array<{ name: string; count: number }>;
  categories: Array<{ category: string; count: number }>;
  heroSearchTerm?: string;
}

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FilterableListings({ 
  initialListings, 
  cities,
  categories,
  heroSearchTerm
}: FilterableListingsProps) {
  const { t, isRTL } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentSearch, setCurrentSearch] = useState<string>(heroSearchTerm || '');
  const [minRating, setMinRating] = useState<number>(0);

  // Sync hero search term to local state on initial load/change
  useEffect(() => {
    // This ensures that the state inside the filtering component updates when the Hero Search input changes.
    if (heroSearchTerm !== undefined) {
      setCurrentSearch(heroSearchTerm);
    }
  }, [heroSearchTerm]);
  
  // Build API URL with filters
  const buildUrl = () => {
    const params = new URLSearchParams();
    
    // Logic for all filters
    if (selectedCity) params.append('city', selectedCity);
    if (selectedCategory) params.append('category', selectedCategory);
    if (currentSearch) params.append('search', currentSearch); // Use 'search' parameter for API route
    if (minRating > 0) params.append('minRating', minRating.toString());
    
    // Only fetch if any filter is active
    if (!selectedCity && !selectedCategory && !currentSearch && minRating === 0) {
        return null;
    }
    
    return `/api/businesses?${params.toString()}`;
  };

  // Determine if we need to fetch data
  const shouldFetch = !!selectedCity || !!selectedCategory || !!currentSearch || minRating > 0;

  // Use SWR for data fetching with automatic revalidation
  const { data, error, isLoading } = useSWR(
    shouldFetch ? buildUrl() : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Use filtered data if available, otherwise use initial listings
  const displayListings = shouldFetch && data?.data ? data.data : initialListings;
  const isFiltering = shouldFetch;

  // Reset filters
  const handleReset = () => {
    setSelectedCity('');
    setSelectedCategory('');
    setCurrentSearch('');
    setMinRating(0);
  };

  return (
    <div className="space-y-8">
      {/* Filter Controls */}
      <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-[#E6D4B0]">
        <h3 className="text-2xl font-bold text-[#2D5F43] mb-6 font-['Cairo']">
          🔍 {t('all.listings')}
        </h3>
        
        {/* NEW Search and Rating filters at the top of the grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Search Input */}
            <div>
              <label htmlFor="search-input" className="block text-sm font-bold text-[#2D5F43] mb-2">
                🔎 {t('filter.search')}
              </label>
              <input
                id="search-input"
                type="text"
                value={currentSearch}
                onChange={(e) => setCurrentSearch(e.target.value)}
                placeholder={t('search.placeholder') || 'Search by Name, Address, or Category...'}
                className="w-full px-4 py-3 border-2 border-[#E6D4B0] rounded-xl focus:ring-2 focus:ring-[#3B7A57] focus:border-[#3B7A57] bg-white text-gray-900 font-medium transition-all shadow-sm hover:shadow-md"
              />
            </div>
            
            {/* Minimum Rating Filter */}
            <div>
              <label htmlFor="rating-filter" className="block text-sm font-bold text-[#2D5F43] mb-2">
                ⭐ {t('best.filters.min.rating')}
              </label>
              <select
                id="rating-filter"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full px-4 py-3 border-2 border-[#E6D4B0] rounded-xl focus:ring-2 focus:ring-[#3B7A57] focus:border-[#3B7A57] bg-white text-gray-900 font-medium transition-all shadow-sm hover:shadow-md"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <option value="0" className="text-gray-600">{t('best.filters.all')}</option>
                <option value="4.0">4.0+ ⭐</option>
                <option value="4.5">4.5+ ⭐</option>
                <option value="5.0">5.0 ⭐</option>
              </select>
            </div>
        </div>

        {/* City, Category, and Reset controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* City Filter */}
          <div>
            <label htmlFor="city-filter" className="block text-sm font-bold text-[#2D5F43] mb-2">
              📍 {t('filter.city')}
            </label>
            <select
              id="city-filter"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E6D4B0] rounded-xl focus:ring-2 focus:ring-[#3B7A57] focus:border-[#3B7A57] bg-white text-gray-900 font-medium transition-all shadow-sm hover:shadow-md"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="" className="text-gray-600">{t('all.cities')}</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name} className="text-gray-900">
                  {city.name} ({city.count})
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category-filter" className="block text-sm font-bold text-[#2D5F43] mb-2">
              🏷️ {t('filter.category')}
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E6D4B0] rounded-xl focus:ring-2 focus:ring-[#3B7A57] focus:border-[#3B7A57] bg-white text-gray-900 font-medium transition-all shadow-sm hover:shadow-md"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="" className="text-gray-600">{t('all.categories')}</option>
              {categories.map((cat) => (
                <option key={cat.category} value={cat.category} className="text-gray-900">
                  {cat.category} ({cat.count})
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <button
              onClick={handleReset}
              disabled={!isFiltering}
              className="w-full px-4 py-3 bg-[#F5E6CA] hover:bg-[#E6D4B0] disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-[#2D5F43] font-bold rounded-xl transition-all border-2 border-[#E6D4B0] hover:border-[#3B7A57] shadow-sm hover:shadow-md"
            >
              🔄 {t('filter.reset')}
            </button>
          </div>
        </div>

        {/* Active Filters Display - ADDED SEARCH AND RATING FILTERS */}
        {isFiltering && (
          <div className={`mt-6 flex flex-wrap gap-3 items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="text-sm font-bold text-[#2D5F43]">✨ {t('active.filters')}:</span>
            
            {currentSearch && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B5A2B] text-white text-sm font-medium rounded-full shadow-md">
                🔎 {currentSearch}
                <button
                  onClick={() => setCurrentSearch('')}
                  className="hover:bg-white/20 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </span>
            )}
            {minRating > 0 && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F0A500] text-white text-sm font-medium rounded-full shadow-md">
                ⭐ {minRating}+
                <button
                  onClick={() => setMinRating(0)}
                  className="hover:bg-white/20 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCity && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#3B7A57] text-white text-sm font-medium rounded-full shadow-md">
                📍 {selectedCity}
                <button
                  onClick={() => setSelectedCity('')}
                  className="hover:bg-white/20 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#3B7A57] text-white text-sm font-medium rounded-full shadow-md">
                🏷️ {selectedCategory}
                <button
                  onClick={() => setSelectedCategory('')}
                  className="hover:bg-white/20 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className={`flex items-center justify-between bg-white p-6 rounded-xl shadow-md border-2 border-[#E6D4B0] ${isRTL ? 'flex-row-reverse' : ''}`}>
        <h2 className="text-2xl font-bold text-[#2D5F43] font-['Cairo']">
          {isFiltering ? `🔍 ${t('filtered.results')}` : `📋 ${t('all.listings')}`}
        </h2>
        <span className="text-[#3B7A57] font-bold text-lg bg-[#F5E6CA] px-4 py-2 rounded-full">
          {isLoading ? (
            <span className="animate-pulse">{t('loading')}</span>
          ) : (
            `${displayListings.length} ${displayListings.length === 1 ? t('listing') : t('listings')}`
          )}
        </span>
      </div>

      {/* Listings Grid */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          Error loading listings. Please try again.
        </div>
      )}

      {isLoading && isFiltering ? (
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-48"></div>
            </div>
          ))}
        </div>
      ) : displayListings.length > 0 ? (
        <div className="space-y-6">
          {displayListings.map((listing: Listing, index: number) => (
            <div key={listing.id}>
              <HorizontalListingCard listing={listing} />
              {/* Show affiliate banner every 5 listings */}
              {(index + 1) % 5 === 0 && <div className="my-6"><AffiliateBanner /></div>}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-xl p-16 text-center border-2 border-[#E6D4B0]">
          <div className="text-7xl mb-6">🔍</div>
          <h3 className="text-3xl font-bold text-[#2D5F43] mb-4 font-['Cairo']">
            {t('no.listings')}
          </h3>
          <p className="text-gray-600 text-lg mb-6">
            {t('no.listings.text')}{' '}
            <button onClick={handleReset} className="text-[#3B7A57] hover:text-[#2D5F43] font-bold transition-colors underline">
              {t('reset.all')}
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
