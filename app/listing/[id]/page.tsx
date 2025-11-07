import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ListingSeo from '@/components/ListingSeo';
import ListingDetailClient from '@/components/ListingDetailClient';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({
    where: { id: parseInt(id) },
  });

  if (!listing) {
    return {
      title: 'Listing Not Found',
    };
  }

  const title = listing.seoTitle || `${listing.name} - DatesSouq`;
  const description = `${listing.name} – located in ${listing.city || 'Saudi Arabia'}, rated ${listing.rating ? listing.rating.toFixed(1) : 'N/A'} stars. ${listing.category ? `Category: ${listing.category}.` : ''} Premium dates supplier in Saudi Arabia.`;
  const domain = 'https://datessouq.com';
  const canonical = `${domain}/listing/${listing.id}`;

  return {
    title: title,
    description: description,
    keywords: `${listing.name}, dates supplier, ${listing.city || 'Saudi Arabia'}, ${listing.category || 'dates'}, premium dates, ajwa dates, medjool dates`,
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
          url: `${domain}/og-image-placeholder.jpg`, // TODO: Replace with actual image
          width: 1200,
          height: 630,
          alt: listing.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      site: '@saudidates', // TODO: Replace with your Twitter handle
      creator: '@saudidates',
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

// Fetch listing data
async function getListing(id: number) {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id },
    });
    return listing;
  } catch (error) {
    console.error('Error fetching listing:', error);
    return null;
  }
}

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getListing(parseInt(id));

  if (!listing) {
    notFound();
  }

  return (
    <>
      {/* SEO Component */}
      <ListingSeo 
        listing={listing}
        domain="https://datessouq.com"
      />
      
      {/* Client Component with all UI */}
      <ListingDetailClient listing={listing} />
    </>
  );
}

