import { getServerSideSitemap } from 'next-sitemap';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // Fetch all listings from database
  const listings = await prisma.listing.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const domain = process.env.SITE_URL || 'https://yourdomain.com';

  // Generate sitemap fields for each listing
  const fields = listings.map((listing) => ({
    loc: `${domain}/listing/${listing.id}`,
    lastmod: listing.updatedAt ? listing.updatedAt.toISOString() : new Date().toISOString(),
    changefreq: 'weekly' as const,
    priority: 0.9,
  }));

  return getServerSideSitemap(fields);
}

