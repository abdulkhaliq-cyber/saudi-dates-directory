import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
// Import the client component that was moved from its original location
import BestOfPageEnhanced from '@/components/BestOfPageEnhanced';
import ItemListSchema from '@/components/ItemListSchema';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import OrganizationSchema from '@/components/OrganizationSchema';

// Generate metadata for SEO (unchanged logic, only formatting adjusted)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
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


interface BestListingsResult {
  listings: Awaited<ReturnType<typeof prisma.listing.findMany>>;
  type: 'city' | 'category';
  name: string | null;
}
// Get best listings for a city or category (Increased 'take' limit for full filtering/map data)
async function getBestListings(slug: string): Promise<BestListingsResult | null> {
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
      take: 100, // Increased take limit for full map/filtering data
    });
    
    if (cityListings.length > 0) {
      const cityName = cityListings[0]?.city ?? null;
      return { listings: cityListings, type: 'city' as const, name: cityName };
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
      take: 100, // Increased take limit for full map/filtering data
    });
    
    if (categoryListings.length > 0) {
      const categoryName = categoryListings[0]?.category ?? null;
      return { listings: categoryListings, type: 'category' as const, name: categoryName };
    }
    
    // No matches found
    return null;
  } catch (error) {
    console.error('Error fetching best listings:', error);
    return null;
  }
}

// The default export now calls the client component for the UI
export default async function BestOfPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
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
  const description = `Top ${listings.length} ${displayName} dates suppliers in Saudi Arabia, ranked by rating and reviews`;
  
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Best of', url: '/best' },
    { name: displayName, url: `/best/${slug}` },
  ];

  return (
    <>
      {/* SEO Schemas (Kept in Server Component) */}
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbs} />
      <ItemListSchema 
        listings={listings}
        pageType="best-of"
        title={pageTitle}
        description={description}
      />
      
      {/* RENDER THE CLIENT COMPONENT WITH ALL DATA */}
      <BestOfPageEnhanced 
        initialData={{ listings, type, name }}
        params={{ slug }}
      />
    </>
  );
}
