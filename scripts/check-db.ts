// Quick script to check database connection and data
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('🔌 Testing database connection...\n');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully!\n');
    
    // Count listings
    const count = await prisma.listing.count();
    console.log(`📊 Total listings in database: ${count}\n`);
    
    if (count > 0) {
      // Get first 5 listings
      const listings = await prisma.listing.findMany({
        take: 5,
        select: {
          id: true,
          name: true,
          city: true,
          category: true,
          rating: true,
        },
      });
      
      console.log('📋 Sample listings:');
      listings.forEach((listing) => {
        console.log(`  ${listing.id}. ${listing.name} - ${listing.city} (${listing.category || 'N/A'})`);
      });
    } else {
      console.log('⚠️  No listings found in database.');
      console.log('   Add listings via Make.com or /api/addListing endpoint');
    }
    
    console.log('\n✨ Database check complete!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();

