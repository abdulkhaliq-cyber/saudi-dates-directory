import Script from 'next/script';

interface ListingItem {
  id: number;
  name: string;
  city?: string | null;
  rating?: number | null;
  category?: string | null;
}

interface ItemListSchemaProps {
  listings: ListingItem[];
  domain?: string;
  pageType?: 'homepage' | 'city' | 'category' | 'best-of';
  title?: string;
  description?: string;
}

export default function ItemListSchema({ 
  listings, 
  domain = 'https://datessouq.com',
  pageType = 'homepage',
  title = 'Premium Dates Suppliers in Saudi Arabia',
  description = 'Complete directory of top-rated dates suppliers across Saudi Arabia'
}: ItemListSchemaProps) {
  
  const itemListElements = listings.slice(0, 50).map((listing, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'LocalBusiness',
      '@id': `${domain}/listing/${listing.id}`,
      name: listing.name,
      url: `${domain}/listing/${listing.id}`,
      ...(listing.city && { 
        address: {
          '@type': 'PostalAddress',
          addressLocality: listing.city,
          addressCountry: 'SA'
        }
      }),
      ...(listing.rating && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: listing.rating.toFixed(1),
          bestRating: '5',
          worstRating: '1'
        }
      }),
      ...(listing.category && { category: listing.category })
    }
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    description: description,
    numberOfItems: listings.length,
    itemListElement: itemListElements
  };

  return (
    <Script
      id={`itemlist-schema-${pageType}`}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

