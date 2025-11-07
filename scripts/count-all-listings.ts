// Count all listings in database
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function countListings() {
  try {
    const total = await prisma.listing.count();
    console.log(`\n📊 Total listings in database: ${total}\n`);
    
    // Get the last 10 listings
    const recent = await prisma.listing.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        name: true,
        city: true,
        createdAt: true,
      },
    });
    
    console.log('📋 Most recent 10 listings:');
    console.log('─'.repeat(80));
    recent.forEach((listing) => {
      const date = new Date(listing.createdAt).toLocaleString();
      console.log(`${listing.id}. ${listing.name} (${listing.city}) - ${date}`);
    });
    console.log('─'.repeat(80));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

countListings();

