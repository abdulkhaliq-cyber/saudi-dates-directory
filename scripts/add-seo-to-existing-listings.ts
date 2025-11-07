// Script to add SEO titles and descriptions to existing listings that don't have them
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function addSeoToExistingListings() {
  try {
    console.log('🔍 Finding listings without SEO data...\n');

    // Find all listings that are missing seoTitle or description
    const listingsWithoutSeo = await prisma.listing.findMany({
      where: {
        OR: [
          { seoTitle: null },
          { description: null },
        ],
      },
    });

    console.log(`📊 Found ${listingsWithoutSeo.length} listings without SEO data\n`);

    if (listingsWithoutSeo.length === 0) {
      console.log('✅ All listings already have SEO data!');
      return;
    }

    let updated = 0;
    let failed = 0;

    for (const listing of listingsWithoutSeo) {
      try {
        // Generate SEO title
        const seoTitle = listing.seoTitle || 
          `${listing.name}${listing.category ? ` - ${listing.category}` : ''}${listing.city ? ` in ${listing.city}` : ''} | Saudi Dates Directory`;

        // Generate description
        const description = listing.description ||
          `${listing.name}${listing.city ? ` – Premium dates supplier located in ${listing.city}, Saudi Arabia.` : ' – Premium dates supplier in Saudi Arabia.'}${listing.category ? ` Specializing in ${listing.category}.` : ''}${listing.rating ? ` Rated ${listing.rating.toFixed(1)} stars.` : ''} Find quality Saudi dates and connect with trusted suppliers.`;

        // Update the listing
        await prisma.listing.update({
          where: { id: listing.id },
          data: {
            seoTitle: seoTitle.substring(0, 200), // Limit to 200 chars for SEO
            description: description.substring(0, 500), // Limit to 500 chars
          },
        });

        updated++;
        console.log(`✅ Updated #${listing.id}: ${listing.name}`);
      } catch (error) {
        failed++;
        console.error(`❌ Failed to update #${listing.id}: ${listing.name}`, error);
      }
    }

    console.log('\n' + '='.repeat(80));
    console.log(`✅ Successfully updated: ${updated} listings`);
    if (failed > 0) {
      console.log(`❌ Failed to update: ${failed} listings`);
    }
    console.log('='.repeat(80));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
addSeoToExistingListings();

