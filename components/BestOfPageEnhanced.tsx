'use client';

// This is a preview of the enhanced Best of page
// Now implemented as a client component to handle filtering

import { useState, useMemo } from 'react';
import BestOfCard from './BestOfCard'; // Adjusted import
import ComparisonTable from './ComparisonTable'; // Adjusted import
import BestOfStats from './BestOfStats'; // Adjusted import
import BestOfFilters, { FilterState } from './BestOfFilters'; // Adjusted import
import BuyersGuide from './BuyersGuide'; // Adjusted import
import ListingsMap from './ListingsMap'; // Adjusted import
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

interface Listing {
  id: number;
  name: string;
  city?: string | null;
  category?: string | null;
  rating?: number | null;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  description?: string | null;
}

interface PageProps {
  params: { slug: string }; // Simplified prop structure for client component
  initialData: {
    listings: Listing[];
    type: 'city' | 'category';
    name: string | null; // Name can be null if deduced from slug
  };
}

export default function BestOfPageEnhanced({ params, initialData }: PageProps) {
  // const { slug } = use(params); // Use 'params' prop directly instead of 'use'
  const { slug } = params;
  const { t } = useLanguage();
  const { listings: allListings, type, name } = initialData;
  
  const [filters, setFilters] = useState<FilterState>({
    minRating: 0,
    hasPhone: false,
    hasWebsite: false,
  });

  // Apply filters
  const filteredListings = useMemo(() => {
    return allListings.filter(listing => {
      if (filters.minRating > 0 && (!listing.rating || listing.rating < filters.minRating)) {
        return false;
      }
      if (filters.hasPhone && !listing.phone) {
        return false;
      }
      if (filters.hasWebsite && !listing.website) {
        return false;
      }
      return true;
    });
  }, [allListings, filters]);

  // Calculate statistics
  const stats = useMemo(() => {
    // Only calculate stats if there are listings after filtering to avoid NaN
    const listToAnalyze = filteredListings.length > 0 ? filteredListings : allListings;
    
    return {
      totalCount: filteredListings.length,
      avgRating: listToAnalyze.reduce((sum, l) => sum + (l.rating || 0), 0) / listToAnalyze.length,
      hasPhone: filteredListings.filter(l => l.phone).length,
      hasWebsite: filteredListings.filter(l => l.website).length,
      topRating: Math.max(...listToAnalyze.map(l => l.rating || 0)),
    };
  }, [allListings, filteredListings, filters]);

  const displayName = name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const pageTitle = type === 'city' 
    ? `Best Dates in ${displayName}`
    : `Best ${displayName} Dates`;
  
  const pageTitleAr = type === 'city'
    ? `أفضل التمور في ${displayName}`
    : `أفضل تمور ${displayName}`;

  return (
    <div className="min-h-screen bg-[#F5E6CA]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3B7A57] via-[#2D5F43] to-[#1F4430] text-white py-16 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Breadcrumbs */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-[#FFF5E6]">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li>›</li>
              <li><Link href="/best" className="hover:text-white transition-colors">Best of</Link></li>
              <li>›</li>
              <li className="text-white font-semibold">{displayName}</li>
            </ol>
          </nav>

          {/* Title with Editor's Pick Badge */}
          <div className="flex items-start gap-4 mb-4">
            <span className="text-6xl">🏆</span>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl md:text-5xl font-bold">{pageTitle}</h1>
                {filteredListings[0] && (
                  <span className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                    ⭐ {t('best.editors.pick')}
                  </span>
                )}
              </div>
              <p className="text-xl text-[#FFF5E6]">
                {pageTitleAr}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-[#F5E6CA] max-w-3xl mb-6">
            {type === 'city' 
              ? `Discover the top ${allListings.length} highest-rated dates suppliers in ${displayName}. Carefully ranked by customer reviews and verified ratings. Compare features, prices, and find the perfect supplier for your needs.`
              : `Browse the ${allListings.length} best ${displayName} dates suppliers in Saudi Arabia. Premium quality, verified ratings, and expert recommendations to help you make the right choice.`
            }
          </p>

          {/* Stats Pills */}
          <div className="flex flex-wrap gap-3">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>{allListings.length} {t('best.suppliers')}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{t('best.ranked')}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>{t('best.updated')} 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8 lg:px-12">
        {/* Stats Section */}
        {/* Use allListings length for coverage % if filteredListings is 0 */}
        <BestOfStats 
          totalCount={allListings.length} 
          avgRating={stats.avgRating}
          hasPhone={allListings.filter(l => l.phone).length} // Base percentages on total
          hasWebsite={allListings.filter(l => l.website).length} // Base percentages on total
          topRating={stats.topRating}
        />

        {/* Comparison Table (Top 3 of unfiltered list) */}
        {allListings.length >= 2 && (
          <ComparisonTable topThree={allListings.slice(0, 3)} />
        )}

        {/* Buyer's Guide */}
        <BuyersGuide type={type} name={slug} />

        {/* Map View */}
        <ListingsMap listings={filteredListings.filter(l => l.latitude && l.longitude)} />

        {/* Filters */}
        <BestOfFilters onFilterChange={setFilters} />

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#2D5F43]">
            {filteredListings.length} {t('best.filtered.count')}
          </h2>
          {filteredListings.length < allListings.length && (
            <p className="text-gray-600">
              ({allListings.length - filteredListings.length} filtered out)
            </p>
          )}
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing, index) => (
              <BestOfCard
                key={listing.id}
                listing={listing}
                rank={index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border-2 border-[#E6D4B0]">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text gray-900 mb-2">
              {t('best.no.results')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('best.no.results.text')}
            </p>
            <button
              onClick={() => setFilters({ minRating: 0, hasPhone: false, hasWebsite: false })}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3B7A57] to-[#4A9B6E] text-white font-bold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              {t('filter.reset')}
            </button>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/best"
            className="inline-flex items-center text-white bg-gradient-to-r from-[#3B7A57] to-[#4A9B6E] hover:from-[#2D5F43] hover:to-[#3B7A57] font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('best.view.all')}
          </Link>
        </div>
      </div>
    </div>
  );
}
