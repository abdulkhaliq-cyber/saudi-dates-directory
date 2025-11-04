// API route to fetch all cities with listing counts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get unique cities with their listing counts
    const listings = await prisma.listing.groupBy({
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
    
    const cities = listings.map((item) => ({
      name: item.city,
      count: item._count.city,
    }));
    
    return NextResponse.json({
      success: true,
      data: cities,
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cities' },
      { status: 500 }
    );
  }
}

