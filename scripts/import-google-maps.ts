// Script to scrape Google Maps data using Outscraper and import to database
import { outscraperClient } from '../lib/outscraper';
import { prisma } from '../lib/prisma';

interface GoogleMapsPlace {
  name?: string;
  full_address?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  site?: string;
  place_id?: string;
  reviews?: number;
  rating?: number;
  type?: string;
  subtypes?: string[];
}

async function scrapeAndImport(query: string, language = 'en', region = 'SA') {
  try {
    console.log(`🔍 Scraping Google Maps for: "${query}"`);
    console.log(`📍 Region: ${region}, Language: ${language}`);
    
    // Scrape Google Maps using Outscraper
    const results = await outscraperClient.googleMapsSearch(
      [query],
      language,
      region,
      100 // limit to 100 results per query
    );

    if (!results || results.length === 0) {
      console.log('❌ No results found');
      return;
    }

    console.log(`✅ Found ${results[0]?.length || 0} results`);

    let imported = 0;
    let skipped = 0;

    // Process each result
    for (const place of results[0] as GoogleMapsPlace[]) {
      try {
        if (!place.name) {
          skipped++;
          continue;
        }

        // Check if already exists
        const existing = await prisma.listing.findUnique({
          where: { name: place.name },
        });

        if (existing) {
          console.log(`⏭️  Skipping (already exists): ${place.name}`);
          skipped++;
          continue;
        }

        // Create listing
        const mapsUrl = place.place_id 
          ? `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
          : undefined;

        await prisma.listing.create({
          data: {
            name: place.name,
            category: place.subtypes?.[0] || place.type || 'Dates Supplier',
            city: place.city,
            phone: place.phone,
            website: place.site,
            rating: place.rating,
            mapsUrl,
            address: place.full_address,
            latitude: place.latitude,
            longitude: place.longitude,
          },
        });

        console.log(`✅ Imported: ${place.name}${place.city ? ` (${place.city})` : ''}`);
        imported++;
      } catch (error) {
        console.error(`❌ Error importing ${place.name}:`, error);
        skipped++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Imported: ${imported}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   📍 Total processed: ${imported + skipped}`);
  } catch (error) {
    console.error('❌ Error during scraping:', error);
    throw error;
  }
}

// Main execution
async function main() {
  const queries = [
    'dates supplier saudi arabia',
    'dates wholesaler riyadh',
    'dates shop jeddah',
    'تمور الرياض', // Dates Riyadh in Arabic
    'تمور جدة',    // Dates Jeddah in Arabic
  ];

  console.log('🚀 Starting Google Maps scraping...\n');

  for (const query of queries) {
    await scrapeAndImport(query);
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Add delay between queries to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('✅ All done!');
}

main()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

