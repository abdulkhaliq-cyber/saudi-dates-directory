import Script from 'next/script';

interface ListingSeoProps {
  listing: {
    id: number;
    name: string;
    city?: string | null;
    rating?: number | null;
    category?: string | null;
    seoTitle?: string | null;
    website?: string | null;
    address?: string | null;
    phone?: string | null;
    latitude?: number | null;
    longitude?: number | null;
  };
  domain?: string;
}

export default function ListingSeo({ listing, domain = 'https://yourdomain.com' }: ListingSeoProps) {
  const canonical = `${domain}/listing/${listing.id}`;
  
  // Create JSON-LD structured data for better SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: listing.name,
    description: `${listing.name} – located in ${listing.city || 'Saudi Arabia'}, rated ${listing.rating ? listing.rating.toFixed(1) : 'N/A'} stars. ${listing.category ? `Category: ${listing.category}.` : ''} Premium dates supplier in Saudi Arabia.`,
    url: canonical,
    ...(listing.phone && { telephone: listing.phone }),
    ...(listing.website && { sameAs: [listing.website] }),
    ...(listing.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: listing.rating.toFixed(1),
        bestRating: '5',
        worstRating: '1',
        ratingCount: '1',
      },
    }),
    ...(listing.address && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: listing.city || 'Saudi Arabia',
        addressCountry: 'SA',
        streetAddress: listing.address,
      },
    }),
    ...(listing.latitude && listing.longitude && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: listing.latitude,
        longitude: listing.longitude,
      },
    }),
    ...(listing.category && {
      '@type': ['LocalBusiness', 'Store'],
      category: listing.category,
    }),
  };

  return (
    <Script
      id={`listing-jsonld-${listing.id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

