// Script to delete identified non-dates businesses
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

// IDs identified from the previous scan
// ID 158: Hail General Hospital - definitely not dates
// ID 159: Qamar AL Madina - has "(dates)" in name but categorized as "attractions" - KEEP this one, just recategorize
const IDS_TO_DELETE = [158]; // Only delete the hospital

async function deleteNonDatesBusinesses() {
  try {
    console.log('🗑️  Preparing to delete non-dates businesses...\n');

    // First, show what we're about to delete
    const toDelete = await prisma.listing.findMany({
      where: {
        id: { in: IDS_TO_DELETE }
      }
    });

    if (toDelete.length === 0) {
      console.log('✅ No businesses to delete!');
      return;
    }

    console.log('Will delete these businesses:');
    console.log('='.repeat(80));
    toDelete.forEach(listing => {
      console.log(`ID: ${listing.id} - ${listing.name} (${listing.category})`);
    });
    console.log('='.repeat(80));

    // Delete them
    const result = await prisma.listing.deleteMany({
      where: {
        id: { in: IDS_TO_DELETE }
      }
    });

    console.log(`\n✅ Successfully deleted ${result.count} non-dates businesses`);

    // Fix the "Qamar AL Madina" listing by updating its category
    console.log('\n🔧 Fixing category for Qamar AL Madina (dates)...');
    await prisma.listing.update({
      where: { id: 159 },
      data: {
        category: 'Dates Supplier', // Change from "attractions" to proper category
      }
    });
    console.log('✅ Updated category to "Dates Supplier"');

    // Show final count
    const finalCount = await prisma.listing.count();
    console.log(`\n📊 Total listings remaining: ${finalCount}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteNonDatesBusinesses();

