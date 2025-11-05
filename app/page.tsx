import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata = {
  title: 'Saudi Dates Directory - Find Premium Dates Suppliers in Saudi Arabia',
  description: 'Discover the best dates suppliers, wholesalers, and shops across Saudi Arabia. Browse by city, ratings, and reviews.',
};

// Fetch all listings from database
async function getAllListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: [
        { rating: 'desc' },
        { createdAt: 'desc' },
      ],
    });
    return listings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

async function getCities() {
  try {
    const result = await prisma.listing.groupBy({
      by: ['city'],
      _count: {
        city: true,
      },
      where: {
        city: {
          not: null,
        },
      },
      orderBy: {
        _count: {
          city: 'desc',
        },
      },
      take: 10,
    });
    return result.map((item) => ({
      name: item.city!,
      count: item._count.city,
    }));
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}

export default async function Home() {
  const listings = await getAllListings();
  const cities = await getCities();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Saudi Dates Directory
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-amber-100">
            Discover Premium Dates Suppliers Across Saudi Arabia
          </p>
          <p className="text-lg text-amber-200">
            {listings.length} Premium Suppliers Listed
          </p>
        </div>
      </div>

      {/* Cities Filter */}
      {cities.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Filter by City
          </h2>
          <div className="flex flex-wrap gap-2">
            {cities.map((city, index) => (
              <span
                key={index}
                className="bg-white px-4 py-2 rounded-full shadow text-sm font-medium text-gray-700 hover:bg-amber-50 transition-colors cursor-pointer"
              >
                {city.name} ({city.count})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          All Listings
        </h2>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <Link
                key={listing.id}
                href={`/listing/${listing.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                {/* Header with category badge */}
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-2xl">🌴</span>
                    {listing.rating && (
                      <div className="flex items-center bg-white/20 px-2 py-1 rounded-full">
                        <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-white text-sm font-semibold">
                          {listing.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Name */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {listing.name}
                  </h3>

                  {/* Category Badge */}
                  {listing.category && (
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full mb-3">
                      {listing.category}
                    </span>
                  )}

                  {/* City */}
                  {listing.city && (
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{listing.city}</span>
                    </div>
                  )}

                  {/* View Details Button */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-amber-600 font-medium text-sm group-hover:text-amber-700 flex items-center">
                      View Details
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">🌴</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Listings Yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              This directory is ready to accept listings. Connect it to your data source or use the API to add listings.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-lg mx-auto">
              <p className="text-sm text-gray-700 mb-2">Add listings via API:</p>
              <code className="bg-gray-900 text-green-400 px-4 py-2 rounded text-xs block">
                POST /api/addListing
              </code>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Saudi Dates Directory. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
