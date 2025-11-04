import { prisma } from '@/lib/prisma';
import ListingCard from '@/components/ListingCard';
import Link from 'next/link';

export const metadata = {
  title: 'Saudi Dates Directory - Find Premium Dates Suppliers in Saudi Arabia',
  description: 'Discover the best dates suppliers, wholesalers, and shops across Saudi Arabia. Browse by city, ratings, and reviews.',
};

async function getListings(limit = 12) {
  try {
    const listings = await prisma.listing.findMany({
      take: limit,
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
  const listings = await getListings();
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
          
          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search for dates suppliers..."
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button className="bg-amber-600 hover:bg-amber-700 px-8 py-4 rounded-lg font-semibold transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cities Section */}
      {cities.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Browse by City
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cities.map((city, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
              >
                <div className="font-semibold text-gray-900">{city.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {city.count} listings
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Listings Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Top Rated Suppliers
          </h2>
        </div>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-6xl mb-4">🌴</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Listings Yet
            </h3>
            <p className="text-gray-600 mb-4">
              Run the import script to populate the directory with data from Google Maps.
            </p>
            <code className="bg-gray-100 px-4 py-2 rounded text-sm">
              npm run import:google-maps
            </code>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Our Directory?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="font-semibold text-lg mb-2">Location-Based</h3>
              <p className="text-gray-600">
                Find dates suppliers near you across all major Saudi cities
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="font-semibold text-lg mb-2">Verified Reviews</h3>
              <p className="text-gray-600">
                Real ratings and reviews from Google Maps to help you decide
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-semibold text-lg mb-2">Direct Contact</h3>
              <p className="text-gray-600">
                Get phone numbers, websites, and addresses instantly
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Saudi Dates Directory. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
