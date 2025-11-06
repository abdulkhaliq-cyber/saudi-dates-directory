// Reusable ListingCard component
import Link from 'next/link';

interface ListingCardProps {
  listing: {
    id: number;
    name: string;
    category?: string | null;
    city?: string | null;
    phone?: string | null;
    rating?: number | null;
  };
}

// Helper function to render star ratings
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          // Full star
          return (
            <svg key={index} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        } else if (index === fullStars && hasHalfStar) {
          // Half star
          return (
            <svg key={index} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <defs>
                <linearGradient id={`half-${index}`}>
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="#d1d5db" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path fill={`url(#half-${index})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        } else {
          // Empty star
          return (
            <svg key={index} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        }
      })}
      <span className="ml-2 text-sm font-medium text-gray-700">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.03] transition-all duration-300 overflow-hidden border-2 border-[#E6D4B0] group">
      {/* Card Header with gradient */}
      <div className="bg-gradient-to-br from-[#F5E6CA] to-[#FFF5E6] p-1">
        <div className="h-1 bg-gradient-to-r from-[#3B7A57] to-[#52A876]"></div>
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        {/* Name - Bold and Clickable */}
        <Link 
          href={`/listing/${listing.id}`}
          className="block"
        >
          <h3 className="text-xl font-bold text-[#2D5F43] group-hover:text-[#3B7A57] transition-colors duration-200 mb-3 line-clamp-2 font-['Cairo']">
            {listing.name}
          </h3>
        </Link>

        {/* Category Badge */}
        {listing.category && (
          <div className="mb-3">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-[#3B7A57] text-white shadow-sm">
              {listing.category}
            </span>
          </div>
        )}

        {/* City */}
        {listing.city && (
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <svg className="w-4 h-4 mr-2 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{listing.city}</span>
          </div>
        )}

        {/* Rating with Stars */}
        {listing.rating && (
          <div className="mb-4 pb-4 border-b border-gray-100">
            <StarRating rating={listing.rating} />
          </div>
        )}

        {/* Phone - Click to Call */}
        {listing.phone && (
          <a
            href={`tel:${listing.phone}`}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#3B7A57] to-[#4A9B6E] hover:from-[#2D5F43] hover:to-[#3B7A57] text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 shadow-md"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="text-sm">Call Now</span>
          </a>
        )}

        {/* View Details Link */}
        <Link
          href={`/listing/${listing.id}`}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-[#F5E6CA] hover:bg-[#E6D4B0] text-[#2D5F43] font-bold py-3.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg border-2 border-[#E6D4B0] hover:border-[#3B7A57] group/button"
        >
          <span className="text-sm">View Details</span>
          <svg className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

