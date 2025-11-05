import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdSlot from '@/components/AdSlot';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({
    where: { id: parseInt(id) },
  });

  if (!listing) {
    return {
      title: 'Listing Not Found',
    };
  }

  return {
    title: listing.seoTitle || `${listing.name} - Saudi Dates Directory`,
    description: `${listing.name} in ${listing.city || 'Saudi Arabia'}. ${listing.category || 'Dates supplier'}. Contact: ${listing.phone || 'See details'}.`,
    openGraph: {
      title: listing.seoTitle || listing.name,
      description: `Find ${listing.name} - Premium dates supplier in Saudi Arabia`,
    },
  };
}

// Fetch listing data
async function getListing(id: number) {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id },
    });
    return listing;
  } catch (error) {
    console.error('Error fetching listing:', error);
    return null;
  }
}

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getListing(parseInt(id));

  if (!listing) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-amber-200 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Directory
          </Link>
        </div>
      </div>

      {/* Listing Details */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {listing.name}
                </h1>
                {listing.category && (
                  <span className="inline-block px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-full">
                    {listing.category}
                  </span>
                )}
              </div>
              {listing.rating && (
                <div className="flex items-center bg-white px-4 py-2 rounded-full ml-4">
                  <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-2 text-2xl font-bold text-gray-900">
                    {listing.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                
                {listing.phone && (
                  <div className="mb-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-5 h-5 mr-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span className="font-medium">Phone</span>
                    </div>
                    <a 
                      href={`tel:${listing.phone}`}
                      className="text-lg text-amber-600 hover:text-amber-700 font-semibold ml-8"
                    >
                      {listing.phone}
                    </a>
                  </div>
                )}

                {listing.website && (
                  <div className="mb-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-5 h-5 mr-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Website</span>
                    </div>
                    <a 
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-amber-600 hover:text-amber-700 font-semibold ml-8 break-all"
                    >
                      {listing.website}
                    </a>
                  </div>
                )}

                {listing.address && (
                  <div className="mb-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-5 h-5 mr-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Address</span>
                    </div>
                    <p className="text-gray-900 ml-8">{listing.address}</p>
                  </div>
                )}

                {listing.city && (
                  <div className="mb-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-5 h-5 mr-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">City</span>
                    </div>
                    <p className="text-gray-900 ml-8">{listing.city}</p>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                
                <div className="space-y-3">
                  {listing.phone && (
                    <a
                      href={`tel:${listing.phone}`}
                      className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      Call Now
                    </a>
                  )}

                  {listing.website && (
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                      </svg>
                      Visit Website
                    </a>
                  )}

                  {/* Google Maps link - prioritize coordinates, fallback to mapsUrl */}
                  {(listing.latitude && listing.longitude) ? (
                    <a
                      href={`https://maps.google.com/?q=${listing.latitude},${listing.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      View on Google Maps
                    </a>
                  ) : listing.mapsUrl && (
                    <a
                      href={listing.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      View on Google Maps
                    </a>
                  )}
                </div>

                {/* Additional Info */}
                {(listing.latitude && listing.longitude) && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Location Coordinates</h3>
                    <p className="text-sm text-gray-600">
                      Lat: {listing.latitude}<br />
                      Long: {listing.longitude}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* SEO Title if exists */}
            {listing.seoTitle && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">SEO Title</h3>
                <p className="text-gray-900">{listing.seoTitle}</p>
              </div>
            )}
          </div>
        </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Sidebar Ad Slot */}
              <AdSlot position="sidebar" />
              
              {/* Additional sidebar content can go here */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  {listing.category && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{listing.category}</span>
                    </div>
                  )}
                  {listing.city && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{listing.city}</span>
                    </div>
                  )}
                  {listing.rating && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium">{listing.rating.toFixed(1)} ⭐</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Listings
          </Link>
        </div>
      </div>
    </div>
  );
}

