import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import ListingCard from '@/components/ListingCard';
import AdSlot from '@/components/AdSlot';
import AffiliateBanner from '@/components/AffiliateBanner';

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

        {/* Ad Slot - Top Position */}
        <div className="mb-8">
          <AdSlot position="top" />
        </div>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="flex flex-col">
                <ListingCard listing={listing} />
                {/* Affiliate Banner below each listing */}
                <AffiliateBanner />
              </div>
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
