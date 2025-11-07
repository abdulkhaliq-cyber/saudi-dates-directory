// Script to identify and optionally remove non-dates businesses
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

// Keywords that indicate it's NOT a dates business
const NON_DATES_KEYWORDS = [
  'hospital',
  'مستشفى',
  'عيادة',
  'clinic',
  'pharmacy',
  'صيدلية',
  'school',
  'مدرسة',
  'university',
  'جامعة',
  'bank',
  'بنك',
  'hotel',
  'فندق',
  'restaurant',
  'مطعم',
  'coffee',
  'قهوة',
  'gas station',
  'محطة وقود',
  'supermarket',
  'سوبر ماركت',
];

// Categories that are clearly not dates-related
const NON_DATES_CATEGORIES = [
  'المستشفى الحكومي',
  'hospital',
  'clinic',
  'pharmacy',
  'school',
  'bank',
  'hotel',
  'restaurant',
  'attractions',
  'معالم سياحية',
];

async function identifyNonDatesBusinesses() {
  try {
    console.log('🔍 Scanning for non-dates businesses...\n');

    // Find businesses with suspicious names
    const suspiciousListings = await prisma.listing.findMany({
      where: {
        OR: [
          // Check if name contains non-dates keywords
          ...NON_DATES_KEYWORDS.map(keyword => ({
            name: { contains: keyword, mode: 'insensitive' as const }
          })),
          // Check if category is non-dates
          ...NON_DATES_CATEGORIES.map(category => ({
            category: { equals: category, mode: 'insensitive' as const }
          })),
        ]
      },
      orderBy: { id: 'asc' }
    });

    console.log(`Found ${suspiciousListings.length} potentially non-dates businesses:\n`);
    console.log('='.repeat(80));

    if (suspiciousListings.length === 0) {
      console.log('✅ No obvious non-dates businesses found!');
      return;
    }

    suspiciousListings.forEach((listing, index) => {
      console.log(`${index + 1}. ID: ${listing.id}`);
      console.log(`   Name: ${listing.name}`);
      console.log(`   Category: ${listing.category || 'N/A'}`);
      console.log(`   City: ${listing.city || 'N/A'}`);
      console.log('   ' + '-'.repeat(76));
    });

    console.log('\n' + '='.repeat(80));
    console.log(`Total suspicious businesses: ${suspiciousListings.length}`);
    console.log('='.repeat(80));

    // Ask if user wants to delete these
    console.log('\n⚠️  To DELETE these businesses, run:');
    console.log('   npx tsx scripts/delete-non-dates-businesses.ts');
    console.log('\n💡 Or manually review and delete from Prisma Studio:');
    console.log('   npx prisma studio');

    // Save IDs to a file for easy deletion
    const idsToDelete = suspiciousListings.map(l => l.id);
    console.log(`\n📝 IDs to consider deleting: ${idsToDelete.join(', ')}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

identifyNonDatesBusinesses();

