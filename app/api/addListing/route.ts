// API route to add or update a listing
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Extract listing data from the request
    const {
      name,
      category,
      city,
      phone,
      website,
      rating,
      mapsUrl,
      address,
      latitude,
      longitude,
    } = body;
    
    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name is required' 
        },
        { status: 400 }
      );
    }
    
    // Upsert the listing (update if exists, create if not)
    const listing = await prisma.listing.upsert({
      where: { name },
      update: {
        category: category || undefined,
        city: city || undefined,
        phone: phone || undefined,
        website: website || undefined,
        rating: rating ? parseFloat(rating) : undefined,
        mapsUrl: mapsUrl || undefined,
        address: address || undefined,
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
      },
      create: {
        name,
        category: category || null,
        city: city || null,
        phone: phone || null,
        website: website || null,
        rating: rating ? parseFloat(rating) : null,
        mapsUrl: mapsUrl || null,
        address: address || null,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
      },
    });
    
    return NextResponse.json(
      {
        success: true,
        message: 'Listing added/updated successfully',
        data: listing,
      },
      { status: 200 }
    );
    
  } catch (error: any) {
    console.error('Error adding/updating listing:', error);
    
    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'A listing with this name already exists' 
        },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to add/update listing',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// Optional: Handle GET requests to test the endpoint
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'POST to this endpoint to add a listing',
    endpoint: '/api/addListing',
    method: 'POST',
    requiredFields: ['name'],
    optionalFields: [
      'category',
      'city',
      'phone',
      'website',
      'rating',
      'mapsUrl',
      'address',
      'latitude',
      'longitude',
    ],
    example: {
      name: 'Al Qassim Dates Company',
      category: 'Dates Supplier',
      city: 'Riyadh',
      phone: '+966501234567',
      website: 'https://example.com',
      rating: 4.5,
      mapsUrl: 'https://maps.google.com/...',
      address: '123 King Fahd Road, Riyadh',
      latitude: 24.7136,
      longitude: 46.6753,
    },
  });
}

