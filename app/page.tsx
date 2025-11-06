import { prisma } from '@/lib/prisma';
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
    <div className="min-h-screen bg-[#F5E6CA]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#3B7A57] via-[#2D5F43] to-[#1F4430] text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-20 sm:px-8 lg:px-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-['Amiri'] tracking-wide">
            🌴 Saudi Dates Directory
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-[#FFF5E6] font-light">
            Discover Premium Dates Suppliers Across Saudi Arabia
          </p>
          <p className="text-lg text-[#E6D4B0] bg-white/10 inline-block px-6 py-2 rounded-full backdrop-blur-sm">
            {listings.length} Premium Suppliers Listed
          </p>
        </div>
      </div>

      {/* Cities Filter */}
      {cities.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-10 sm:px-8 lg:px-12">
          <h2 className="text-2xl font-bold text-[#2D5F43] mb-5 font-['Cairo']">
            📍 Browse by City
          </h2>
          <div className="flex flex-wrap gap-3">
            {cities.map((city, index) => (
              <span
                key={index}
                className="bg-white px-5 py-2.5 rounded-full shadow-md text-sm font-medium text-[#2D5F43] hover:bg-[#3B7A57] hover:text-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-[#E6D4B0]"
              >
                {city.name} ({city.count})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Listings Grid with Filters */}
      <div className="max-w-7xl mx-auto px-6 py-10 sm:px-8 lg:px-12">
        {/* Ad Slot - Top Position */}
        <div className="mb-10">
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
      <footer className="bg-gradient-to-r from-[#1F4430] to-[#2D5F43] text-white mt-16 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8 lg:px-12 text-center">
          <p className="text-[#E6D4B0] text-lg font-['Amiri']">
            © 2025 Saudi Dates Directory. All rights reserved.
          </p>
          <p className="text-[#FFF5E6] text-sm mt-2">
            🌴 Connecting Saudi Arabia's finest dates suppliers
          </p>
        </div>
      </footer>
    </div>
  );
}
