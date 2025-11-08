import { prisma } from '@/lib/prisma';
import HomePageClient from '@/components/HomePageClient';
import OrganizationSchema from '@/components/OrganizationSchema';
import ItemListSchema from '@/components/ItemListSchema';

export const metadata = {
  title: 'DatesSouq - Find Premium Dates Suppliers in Saudi Arabia',
  description: 'Discover the best dates suppliers, wholesalers, and shops across Saudi Arabia. Browse by city, ratings, and reviews at DatesSouq.com',
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
    <>
      {/* SEO Schema Markup */}
      <OrganizationSchema />
      <ItemListSchema 
        listings={listings}
        pageType="homepage"
        title="Premium Dates Suppliers in Saudi Arabia - DatesSouq"
        description="Complete directory of top-rated dates suppliers, wholesalers, and shops across Saudi Arabia"
      />
      
      <HomePageClient 
        listings={listings}
        cities={cities}
        categories={categories}
      />
    </>
  );
}
