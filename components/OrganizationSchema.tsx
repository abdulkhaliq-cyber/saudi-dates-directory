import Script from 'next/script';

interface OrganizationSchemaProps {
  domain?: string;
}

export default function OrganizationSchema({ domain = 'https://datessouq.com' }: OrganizationSchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DatesSouq',
    alternateName: 'سوق التمور',
    url: domain,
    logo: `${domain}/logo.png`,
    description: 'Premier directory of dates suppliers in Saudi Arabia. Find top-rated dates sellers, wholesalers, and shops across the Kingdom.',
    foundingDate: '2025',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      areaServed: 'SA',
      availableLanguage: ['Arabic', 'English'],
    },
    sameAs: [
      // Add your social media profiles here
      // 'https://twitter.com/datessouq',
      // 'https://facebook.com/datessouq',
      // 'https://instagram.com/datessouq',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SA',
      addressRegion: 'Saudi Arabia',
    },
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

