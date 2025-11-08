import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import OrganizationSchema from '@/components/OrganizationSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

export const metadata = {
  title: 'Best of Saudi Dates — Top Suppliers by City & Category | DatesSouq',
  description: 'Browse curated lists of the best dates suppliers in Saudi Arabia. Find top-rated sellers by city or category, ranked by customer reviews.',
  keywords: 'best dates Saudi Arabia, top dates suppliers, dates by city, premium dates sellers, Saudi dates directory',
  alternates: {
    canonical: 'https://datessouq.com/best',
  },
  openGraph: {
    type: 'website',
    title: 'Best of Saudi Dates — Top Suppliers Collections',
    description: 'Discover curated collections of the best dates suppliers across Saudi Arabia.',
    url: 'https://datessouq.com/best',
    siteName: 'DatesSouq',
    locale: 'ar_SA',
  },
};

// Get available cities and categories with ratings
async function getAvailableCollections() {
  try {
    // Get top cities with ratings
    const cities = await prisma.listing.groupBy({
      by: ['city'],
      where: {
        city: { not: null },
        rating: { not: null },
      },
      _count: {
        id: true,
      },
      _avg: {
        rating: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 20,
    });

    // Get top categories with ratings
    const categories = await prisma.listing.groupBy({
      by: ['category'],
      where: {
        category: { not: null },
        rating: { not: null },
      },
      _count: {
        id: true,
      },
      _avg: {
        rating: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 10,
    });

    return {
      cities: cities.filter(c => c.city && c._count.id >= 3),
      categories: categories.filter(c => c.category && c._count.id >= 3),
    };
  } catch (error) {
    console.error('Error fetching collections:', error);
    return { cities: [], categories: [] };
  }
}

// Helper to create URL-friendly slug
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default async function BestOfIndexPage() {
  const { cities, categories } = await getAvailableCollections();
  
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Best of', url: '/best' },
  ];
  
  return (
    <>
      {/* SEO Schemas */}
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbs} />
      
      <div className="min-h-screen bg-[#F5E6CA]">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#3B7A57] via-[#2D5F43] to-[#1F4430] text-white py-16 shadow-xl">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <Link 
              href="/" 
              className="inline-flex items-center text-[#FFF5E6] hover:text-white mb-6 transition-all duration-200 font-bold bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-sm hover:bg-white/20"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl">🏆</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Best of Saudi Dates
                </h1>
                <p className="text-xl text-[#FFF5E6]">
                  أفضل التمور في المملكة العربية السعودية
                </p>
              </div>
            </div>
            
            <p className="text-lg text-[#F5E6CA] max-w-3xl">
              Explore curated collections of top-rated dates suppliers across Saudi Arabia. 
              Browse by city or category to find the perfect dates for your needs.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8 lg:px-12">
          {/* Cities Section */}
          {cities.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <svg className="w-8 h-8 text-[#3B7A57]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <h2 className="text-3xl font-bold text-[#2D5F43]">
                  Best Dates by City
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cities.map((city) => {
                  if (!city.city) return null;
                  const slug = createSlug(city.city);
                  const avgRating = city._avg.rating?.toFixed(1) || 'N/A';
                  
                  return (
                    <Link
                      key={city.city}
                      href={`/best/${slug}`}
                      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden border-2 border-[#E6D4B0] hover:border-[#3B7A57]"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-[#2D5F43] group-hover:text-[#3B7A57] transition-colors">
                              {city.city}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {city._count.id} suppliers
                            </p>
                          </div>
                          <div className="flex items-center gap-1 bg-[#F5E6CA] px-3 py-1 rounded-full">
                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-semibold text-[#2D5F43]">{avgRating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-[#3B7A57] group-hover:text-[#2D5F43] transition-colors">
                          <span className="text-sm font-semibold">View Best Suppliers</span>
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Categories Section */}
          {categories.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <svg className="w-8 h-8 text-[#3B7A57]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                <h2 className="text-3xl font-bold text-[#2D5F43]">
                  Best Dates by Category
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => {
                  if (!category.category) return null;
                  const slug = createSlug(category.category);
                  const avgRating = category._avg.rating?.toFixed(1) || 'N/A';
                  
                  return (
                    <Link
                      key={category.category}
                      href={`/best/${slug}`}
                      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden border-2 border-[#E6D4B0] hover:border-[#3B7A57]"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-[#2D5F43] group-hover:text-[#3B7A57] transition-colors">
                              {category.category}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {category._count.id} suppliers
                            </p>
                          </div>
                          <div className="flex items-center gap-1 bg-[#F5E6CA] px-3 py-1 rounded-full">
                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-semibold text-[#2D5F43]">{avgRating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-[#3B7A57] group-hover:text-[#2D5F43] transition-colors">
                          <span className="text-sm font-semibold">View Best Suppliers</span>
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

