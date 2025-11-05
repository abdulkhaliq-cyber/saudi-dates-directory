import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import FilterableListings from '@/components/FilterableListings';

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

async function getCategories() {
  try {
    const result = await prisma.listing.groupBy({
      by: ['category'],
      _count: {
        category: true,
      },
      where: {
        category: {
          not: null,
        },
      },
      orderBy: {
        _count: {
          category: 'desc',
        },
      },
    });
    return result.map((item) => ({
      category: item.category!,
      count: item._count.category,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function Home() {
  const listings = await getAllListings();
  const cities = await getCities();
  const categories = await getCategories();

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

      {/* Listings Grid with Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Ad Slot - Top Position */}
        <div className="mb-8">
          <AdSlot position="top" />
        </div>

        {/* Filterable Listings Component */}
        <FilterableListings 
          initialListings={listings}
          cities={cities}
          categories={categories}
        />
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
