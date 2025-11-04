// API route to fetch a single listing by ID
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const id = parseInt(slug);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid listing ID' },
        { status: 400 }
      );
    }
    
    // Fetch listing
    const listing = await prisma.listing.findUnique({
      where: { id },
    });
    
    if (!listing) {
      return NextResponse.json(
        { success: false, error: 'Listing not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: listing,
    });
  } catch (error) {
    console.error('Error fetching listing:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch listing' },
      { status: 500 }
    );
  }
}

