'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

interface Listing {
  id: number;
  name: string;
  category?: string | null;
  city?: string | null;
  phone?: string | null;
  website?: string | null;
  rating?: number | null;
  description?: string | null;
  address?: string | null;
}

interface HorizontalListingCardProps {
  listing: Listing;
}

export default function HorizontalListingCard({ listing }: HorizontalListingCardProps) {
  const { t, isRTL } = useLanguage();

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-[#E6D4B0] group"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section - Left Side */}
        <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 bg-gradient-to-br from-[#F5E6CA] via-[#EAD7B0] to-[#D4C29A]">
          {/* Placeholder Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <div className="text-6xl mb-2">🌴</div>
              <p className="text-sm text-[#8B7355] font-medium">
                {listing.name.split(' ')[0]}
              </p>
            </div>
          </div>
          
          {/* Badge for Rating */}
          {listing.rating && (
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-bold text-[#2D5F43]">{listing.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Content Section - Right Side */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-[#1F3524] mb-3 group-hover:text-[#2F4A36] transition-colors">
                  {listing.name}
                </h3>
                
                {/* Category & City */}
                <div className={`flex flex-wrap items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {listing.category && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E6CFA6] text-[#3E2713] rounded-full text-base font-semibold shadow-sm tracking-wide">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                      </svg>
                      {listing.category}
                    </span>
                  )}
                  
                  {listing.city && (
                    <span className="inline-flex items-center gap-2 text-[#3B2B18] text-base font-semibold">
                      <svg className="w-4 h-4 text-[#7B4B1F]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {listing.city}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {listing.description && (
              <p className="text-[#3B3B3B] text-sm leading-relaxed mb-5 line-clamp-2">
                {listing.description}
              </p>
            )}

            {/* Address if available */}
            {listing.address && (
              <p className="text-xs text-[#735F46] mb-4 line-clamp-1">
                📍 {listing.address}
              </p>
            )}

            {/* Footer Actions */}
            <div className={`flex flex-wrap items-center gap-3 mt-auto pt-4 border-t border-[#EFDABB] ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Contact Buttons */}
              {listing.phone && (
                <a
                  href={`tel:${listing.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-[#EBD2AB] text-[#213828] rounded-lg hover:bg-[#D9BD8F] transition-all text-base font-semibold shadow-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {isRTL ? 'اتصل' : 'Call'}
                </a>
              )}

              {listing.website && (
                <a
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-[#EBD2AB] text-[#213828] rounded-lg hover:bg-[#D9BD8F] transition-all text-base font-semibold shadow-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                  </svg>
                  {isRTL ? 'موقع' : 'Website'}
                </a>
              )}

              {/* View Details - Primary CTA */}
              <Link
                href={`/listing/${listing.id}`}
                className="inline-flex items-center gap-3 px-6 py-2.5 bg-[#2F5A40] text-white rounded-lg hover:bg-[#244632] transition-all text-base font-semibold shadow-lg ml-auto"
              >
                {isRTL ? 'عرض التفاصيل' : 'View Details'}
                <svg className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

