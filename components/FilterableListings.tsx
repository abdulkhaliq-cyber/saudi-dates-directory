'use client';

// Client-side filterable listings component with SWR
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import ListingCard from './ListingCard';
import AffiliateBanner from './AffiliateBanner';

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
}

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FilterableListings({ 
  initialListings, 
  cities,
  categories 
}: FilterableListingsProps) {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Build API URL with filters
  const buildUrl = () => {
    const params = new URLSearchParams();
    if (selectedCity) params.append('city', selectedCity);
    if (selectedCategory) params.append('category', selectedCategory);
    return `/api/businesses?${params.toString()}`;
  };

  // Use SWR for data fetching with automatic revalidation
  const { data, error, isLoading } = useSWR(
    selectedCity || selectedCategory ? buildUrl() : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Use filtered data if available, otherwise use initial listings
  const displayListings = data?.data || initialListings;
  const isFiltering = selectedCity || selectedCategory;

  // Reset filters
  const handleReset = () => {
    setSelectedCity('');
    setSelectedCategory('');
  };

  return (
    <div className="space-y-8">
      {/* Filter Controls */}
      <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-[#E6D4B0]">
        <h3 className="text-2xl font-bold text-[#2D5F43] mb-6 font-['Cairo']">
          🔍 Filter Listings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* City Filter */}
          <div>
            <label htmlFor="city-filter" className="block text-sm font-bold text-[#2D5F43] mb-2">
              📍 Filter by City
            </label>
            <select
              id="city-filter"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E6D4B0] rounded-xl focus:ring-2 focus:ring-[#3B7A57] focus:border-[#3B7A57] bg-white text-gray-900 font-medium transition-all shadow-sm hover:shadow-md"
            >
              <option value="" className="text-gray-600">All Cities</option>
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
              🏷️ Filter by Category
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E6D4B0] rounded-xl focus:ring-2 focus:ring-[#3B7A57] focus:border-[#3B7A57] bg-white text-gray-900 font-medium transition-all shadow-sm hover:shadow-md"
            >
              <option value="" className="text-gray-600">All Categories</option>
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
              🔄 Reset Filters
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {isFiltering && (
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <span className="text-sm font-bold text-[#2D5F43]">✨ Active filters:</span>
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
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-md border-2 border-[#E6D4B0]">
        <h2 className="text-2xl font-bold text-[#2D5F43] font-['Cairo']">
          {isFiltering ? '🔍 Filtered Results' : '📋 All Listings'}
        </h2>
        <span className="text-[#3B7A57] font-bold text-lg bg-[#F5E6CA] px-4 py-2 rounded-full">
          {isLoading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            `${displayListings.length} ${displayListings.length === 1 ? 'listing' : 'listings'}`
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl h-64"></div>
            </div>
          ))}
        </div>
      ) : displayListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayListings.map((listing: Listing) => (
            <div key={listing.id} className="flex flex-col">
              <ListingCard listing={listing} />
              <AffiliateBanner />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-xl p-16 text-center border-2 border-[#E6D4B0]">
          <div className="text-7xl mb-6">🔍</div>
          <h3 className="text-3xl font-bold text-[#2D5F43] mb-4 font-['Cairo']">
            No Listings Found
          </h3>
          <p className="text-gray-600 text-lg mb-6">
            Try adjusting your filters or{' '}
            <button onClick={handleReset} className="text-[#3B7A57] hover:text-[#2D5F43] font-bold transition-colors underline">
              reset all filters
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

