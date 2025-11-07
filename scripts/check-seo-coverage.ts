// Script to check SEO coverage across all listings
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function checkSeoCoverage() {
  try {
    // Get total count
    const total = await prisma.listing.count();

    // Count listings with seoTitle
    const withSeoTitle = await prisma.listing.count({
      where: { seoTitle: { not: null } }
    });

    // Count listings with description
    const withDescription = await prisma.listing.count({
      where: { description: { not: null } }
    });

    // Find listings missing either field
    const missingSeo = await prisma.listing.findMany({
      where: {
        OR: [
          { seoTitle: null },
          { description: null },
        ]
      },
      select: {
        id: true,
        name: true,
        seoTitle: true,
        description: true,
      }
    });

    console.log('📊 SEO Coverage Report');
    console.log('='.repeat(80));
    console.log(`Total Listings: ${total}`);
    console.log(`With SEO Title: ${withSeoTitle} (${((withSeoTitle/total)*100).toFixed(1)}%)`);
    console.log(`With Description: ${withDescription} (${((withDescription/total)*100).toFixed(1)}%)`);
    console.log('='.repeat(80));

    if (missingSeo.length > 0) {
      console.log(`\n❌ ${missingSeo.length} listings missing SEO data:\n`);
      missingSeo.forEach(listing => {
        console.log(`ID: ${listing.id} - ${listing.name}`);
        if (!listing.seoTitle) console.log(`  ⚠️  Missing seoTitle`);
        if (!listing.description) console.log(`  ⚠️  Missing description`);
      });
    } else {
      console.log('\n✅ All listings have complete SEO data!');
    }

    // Show a sample of listings with their SEO data
    console.log('\n📋 Sample Listings (first 5):');
    console.log('='.repeat(80));
    const sample = await prisma.listing.findMany({
      take: 5,
      orderBy: { id: 'desc' },
      select: {
        id: true,
        name: true,
        seoTitle: true,
        description: true,
      }
    });

    sample.forEach(listing => {
      console.log(`\n#${listing.id}: ${listing.name}`);
      console.log(`SEO Title: ${listing.seoTitle ? listing.seoTitle.substring(0, 80) + '...' : '❌ Missing'}`);
      console.log(`Description: ${listing.description ? listing.description.substring(0, 100) + '...' : '❌ Missing'}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSeoCoverage();

