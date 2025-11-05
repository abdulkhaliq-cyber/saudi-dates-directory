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
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Filter Listings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* City Filter */}
          <div>
            <label htmlFor="city-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by City
            </label>
            <select
              id="city-filter"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5a8a5a] focus:border-[#5a8a5a] bg-white text-gray-900 transition-all"
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
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5a8a5a] focus:border-[#5a8a5a] bg-white text-gray-900 transition-all"
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
              className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-800 font-medium rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {isFiltering && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {selectedCity && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#e8ede8] text-[#3a5a3a] text-sm rounded-full">
                City: {selectedCity}
                <button
                  onClick={() => setSelectedCity('')}
                  className="hover:text-[#1f301f]"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#e8ede8] text-[#3a5a3a] text-sm rounded-full">
                Category: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory('')}
                  className="hover:text-[#1f301f]"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {isFiltering ? 'Filtered Results' : 'All Listings'}
        </h2>
        <span className="text-gray-600">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayListings.map((listing: Listing) => (
            <div key={listing.id} className="flex flex-col">
              <ListingCard listing={listing} />
              <AffiliateBanner />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            No Listings Found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or{' '}
            <button onClick={handleReset} className="text-[#5a8a5a] hover:text-[#486e48] font-semibold transition-colors">
              reset all filters
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

