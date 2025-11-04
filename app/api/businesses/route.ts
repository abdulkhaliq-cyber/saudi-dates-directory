// API route to fetch listings with filtering and pagination
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;
    
    // Filters
    const city = searchParams.get('city');
    const minRating = searchParams.get('minRating');
    const search = searchParams.get('search');
    
    // Build where clause
    const where: any = {};
    
    if (city) {
      where.city = city;
    }
    
    if (minRating) {
      where.rating = {
        gte: parseFloat(minRating),
      };
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    // Fetch listings with pagination
    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { rating: 'desc' },
          { createdAt: 'desc' },
        ],
      }),
      prisma.listing.count({ where }),
    ]);
    
    return NextResponse.json({
      success: true,
      data: listings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

