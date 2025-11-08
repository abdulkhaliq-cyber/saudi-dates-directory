'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Listing {
  id: number;
  name: string;
  city?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  rating?: number | null;
}

interface ListingsMapProps {
  listings: Listing[];
}

export default function ListingsMap({ listings }: ListingsMapProps) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter listings with coordinates
  const listingsWithCoords = listings.filter(l => l.latitude && l.longitude);

  if (listingsWithCoords.length === 0) {
    return null;
  }

  // Calculate center point (average of all coordinates)
  const centerLat = listingsWithCoords.reduce((sum, l) => sum + (l.latitude || 0), 0) / listingsWithCoords.length;
  const centerLng = listingsWithCoords.reduce((sum, l) => sum + (l.longitude || 0), 0) / listingsWithCoords.length;

  // Generate Google Maps URL with all markers
  const markers = listingsWithCoords
    .map((l, idx) => `markers=color:red%7Clabel:${idx + 1}%7C${l.latitude},${l.longitude}`)
    .join('&');
  
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${centerLat},${centerLng}&zoom=10`;
  
  // Interactive map link
  const interactiveMapUrl = `https://www.google.com/maps/search/?api=1&query=${centerLat},${centerLng}`;

  return (
    <div className="bg-white rounded-2xl shadow-xl border-2 border-[#E6D4B0] overflow-hidden mb-12">
      <div className="bg-gradient-to-r from-[#3B7A57] to-[#4A9B6E] px-8 py-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {t('best.map.title')}
          </h2>
          <p className="text-[#FFF5E6] text-sm mt-1">
            {listingsWithCoords.length} {t('best.map.locations')}
          </p>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white hover:text-[#FFF5E6] transition-colors"
        >
          {isExpanded ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="p-6">
          {/* Map Preview with Locations List */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Map Embed */}
            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={mapUrl}
                />
              </div>
              <a
                href={interactiveMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-[#3B7A57] hover:text-[#2D5F43] font-semibold"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                {t('best.map.open.full')}
              </a>
            </div>

            {/* Locations List */}
            <div className="max-h-96 overflow-y-auto pr-2">
              <h3 className="font-bold text-[#2D5F43] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                {t('best.map.all.locations')}
              </h3>
              <div className="space-y-2">
                {listingsWithCoords.map((listing, idx) => (
                  <div
                    key={listing.id}
                    className="flex items-start gap-3 p-3 bg-[#FFF9F0] rounded-lg hover:bg-[#F5E6CA] transition-colors"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">
                        {listing.name}
                      </h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                        {listing.city && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {listing.city}
                          </span>
                        )}
                        {listing.rating && (
                          <span className="flex items-center gap-1">
                            ⭐ {listing.rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                    <a
                      href={`https://www.google.com/maps?q=${listing.latitude},${listing.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 text-[#3B7A57] hover:text-[#2D5F43]"
                      title={t('best.map.directions')}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

