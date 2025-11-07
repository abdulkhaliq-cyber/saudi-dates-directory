// API route to add or update a listing
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    let body;
    try {
      body = await request.json();
    } catch (jsonError: any) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid JSON format',
          details: jsonError.message,
          hint: 'Check that numeric fields (rating, latitude, longitude) are not empty. Use null instead of empty values.'
        },
        { status: 400 }
      );
    }
    
    // Log the received body for debugging
    console.log('Received body:', JSON.stringify(body, null, 2));
    
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
      seoTitle,
      description,
    } = body;
    
    // Validate required fields
    if (!name || name === 'null' || name === '') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name is required and cannot be empty' 
        },
        { status: 400 }
      );
    }
    
    // Clean up numeric values - convert "null" strings to actual null
    const cleanRating = rating === 'null' || rating === '' || rating === null ? null : parseFloat(rating);
    const cleanLatitude = latitude === 'null' || latitude === '' || latitude === null ? null : parseFloat(latitude);
    const cleanLongitude = longitude === 'null' || longitude === '' || longitude === null ? null : parseFloat(longitude);
    
    console.log('Cleaned values:', { cleanRating, cleanLatitude, cleanLongitude });
    
    // Upsert the listing (update if exists, create if not)
    const listing = await prisma.listing.upsert({
      where: { name },
      update: {
        category: category || undefined,
        city: city || undefined,
        phone: phone || undefined,
        website: website || undefined,
        rating: cleanRating !== null ? cleanRating : undefined,
        mapsUrl: mapsUrl || undefined,
        address: address || undefined,
        latitude: cleanLatitude !== null ? cleanLatitude : undefined,
        longitude: cleanLongitude !== null ? cleanLongitude : undefined,
        seoTitle: seoTitle || undefined,
        description: description || undefined,
      },
      create: {
        name,
        category: category || null,
        city: city || null,
        phone: phone || null,
        website: website || null,
        rating: cleanRating,
        mapsUrl: mapsUrl || null,
        address: address || null,
        latitude: cleanLatitude,
        longitude: cleanLongitude,
        seoTitle: seoTitle || null,
        description: description || null,
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
    console.error('Error stack:', error.stack);
    console.error('Error code:', error.code);
    
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
    
    // Handle Prisma validation errors
    if (error.code?.startsWith('P')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Database validation error',
          details: error.message,
          code: error.code
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to add/update listing',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
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
      'seoTitle',
      'description',
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
      seoTitle: 'Al Qassim Dates - Premium Saudi Dates in Riyadh',
      description: 'Premium dates supplier in Riyadh offering authentic Saudi dates varieties. Trusted wholesale and retail provider serving customers across Saudi Arabia.',
    },
  });
}

