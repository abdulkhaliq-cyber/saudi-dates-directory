// Listing card component for displaying listing information
import Link from 'next/link';

interface ListingCardProps {
  listing: {
    id: number;
    name: string;
    category?: string | null;
    address?: string | null;
    city?: string | null;
    phone?: string | null;
    website?: string | null;
    rating?: number | null;
    mapsUrl?: string | null;
  };
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Header with icon */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="text-4xl">🌴</div>
          {listing.rating && (
            <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
              <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 font-semibold">{listing.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {listing.name}
        </h3>
        
        {/* Category */}
        {listing.category && (
          <div className="mb-3">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
              {listing.category}
            </span>
          </div>
        )}
        
        {/* Location */}
        {(listing.city || listing.address) && (
          <div className="flex items-start text-gray-600 text-sm mb-3">
            <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>
              {listing.city}
              {listing.address && listing.city && ', '}
              {listing.address}
            </span>
          </div>
        )}
        
        {/* Contact buttons */}
        <div className="flex flex-col gap-2 mt-4">
          {listing.phone && (
            <a
              href={`tel:${listing.phone}`}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors text-center flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Now
            </a>
          )}
          <div className="grid grid-cols-2 gap-2">
            {listing.website && (
              <a
                href={listing.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors text-center"
              >
                Website
              </a>
            )}
            {listing.mapsUrl && (
              <a
                href={listing.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors text-center"
              >
                Maps
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

