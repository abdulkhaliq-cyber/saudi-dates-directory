import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import BestOfCard from '@/components/BestOfCard';
import ItemListSchema from '@/components/ItemListSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import OrganizationSchema from '@/components/OrganizationSchema';
import Link from 'next/link';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Decode and format slug for display
  const formattedSlug = decodeURIComponent(slug)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
  
  const title = `Best ${formattedSlug} Dates in Saudi Arabia — Top Suppliers ${currentYear}`;
  const description = `Discover the best ${formattedSlug} date sellers in Saudi Arabia. Compare ratings, reviews, and top picks. Updated ${currentMonth} ${currentYear}.`;
  
  const domain = 'https://datessouq.com';
  const canonical = `${domain}/best/${slug}`;
  
  return {
    title: title,
    description: description,
    keywords: `best ${formattedSlug} dates, ${formattedSlug} dates suppliers, premium ${formattedSlug} dates, Saudi Arabia dates, ${formattedSlug} dates sellers`,
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      type: 'website',
      title: title,
      description: description,
      url: canonical,
      siteName: 'DatesSouq',
      locale: 'ar_SA',
      images: [
        {
          url: `${domain}/og-image-placeholder.jpg`,
          width: 1200,
          height: 630,
          alt: `Best ${formattedSlug} Dates`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [`${domain}/og-image-placeholder.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Get best listings for a city or category
async function getBestListings(slug: string) {
  try {
    const decodedSlug = decodeURIComponent(slug).toLowerCase();
    
    // Try to match by city first
    const cityListings = await prisma.listing.findMany({
      where: {
        city: {
          contains: decodedSlug,
          mode: 'insensitive',
        },
        rating: {
          not: null,
        },
      },
      orderBy: {
        rating: 'desc',
      },
      take: 10,
    });
    
    if (cityListings.length > 0) {
      return { listings: cityListings, type: 'city', name: cityListings[0].city };
    }
    
    // Try to match by category
    const categoryListings = await prisma.listing.findMany({
      where: {
        category: {
          contains: decodedSlug,
          mode: 'insensitive',
        },
        rating: {
          not: null,
        },
      },
      orderBy: {
        rating: 'desc',
      },
      take: 10,
    });
    
    if (categoryListings.length > 0) {
      return { listings: categoryListings, type: 'category', name: categoryListings[0].category };
    }
    
    // No matches found
    return null;
  } catch (error) {
    console.error('Error fetching best listings:', error);
    return null;
  }
}

export default async function BestOfPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getBestListings(slug);
  
  if (!result || result.listings.length === 0) {
    notFound();
  }
  
  const { listings, type, name } = result;
  
  // Format display name
  const displayName = name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const pageTitle = type === 'city' 
    ? `Best Dates in ${displayName}`
    : `Best ${displayName} Dates`;
  
  const pageTitleAr = type === 'city'
    ? `أفضل التمور في ${displayName}`
    : `أفضل تمور ${displayName}`;
  
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Best of', url: '/best' },
    { name: displayName, url: `/best/${slug}` },
  ];
  
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      {/* SEO Schemas */}
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbs} />
      <ItemListSchema 
        listings={listings}
        pageType="best-of"
        title={pageTitle}
        description={`Top ${listings.length} ${displayName} dates suppliers in Saudi Arabia, ranked by rating and reviews`}
      />
      
      <div className="min-h-screen bg-[#F5E6CA]">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#3B7A57] via-[#2D5F43] to-[#1F4430] text-white py-16 shadow-xl">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Breadcrumbs */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-[#FFF5E6]">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>›</li>
                <li>
                  <Link href="/best" className="hover:text-white transition-colors">
                    Best of
                  </Link>
                </li>
                <li>›</li>
                <li className="text-white font-semibold">{displayName}</li>
              </ol>
            </nav>
            
            {/* Title */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl">🏆</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {pageTitle}
                </h1>
                <p className="text-xl text-[#FFF5E6]">
                  {pageTitleAr}
                </p>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-lg text-[#F5E6CA] max-w-3xl">
              {type === 'city' 
                ? `Discover the top ${listings.length} highest-rated dates suppliers in ${displayName}. Carefully ranked by customer reviews and ratings.`
                : `Browse the ${listings.length} best ${displayName} dates suppliers in Saudi Arabia. Premium quality, verified ratings.`
              }
            </p>
            
            {/* Stats */}
            <div className="mt-6 flex gap-6 text-[#FFF5E6]">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span>{listings.length} Top Suppliers</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Ranked by Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>Updated {currentYear}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing, index) => (
              <BestOfCard
                key={listing.id}
                listing={listing}
                rank={index + 1}
              />
            ))}
          </div>

          {/* Back Link */}
          <div className="mt-12 text-center">
            <Link
              href="/best"
              className="inline-flex items-center text-white bg-gradient-to-r from-[#3B7A57] to-[#4A9B6E] hover:from-[#2D5F43] hover:to-[#3B7A57] font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Browse All Best of Pages
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

