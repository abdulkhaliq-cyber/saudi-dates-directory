'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import FilterableListings from './FilterableListings';
import AdSlot from './AdSlot';
import LanguageToggle from './LanguageToggle';
import Link from 'next/link';

interface HomePageClientProps {
  listings: any[];
  cities: Array<{ name: string; count: number }>;
  categories: Array<{ category: string; count: number }>;
}

export default function HomePageClient({ listings, cities, categories }: HomePageClientProps) {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F5E6CA]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#3B7A57] via-[#2D5F43] to-[#1F4430] text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-20 sm:px-8 lg:px-12">
          {/* Language Toggle - Top Right */}
          <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'} mb-6`}>
            <LanguageToggle />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-['Amiri'] tracking-wide">
            🌴 {t('site.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-[#FFF5E6] font-light">
            {t('site.subtitle')}
          </p>
          <p className="text-lg text-[#E6D4B0] bg-white/10 inline-block px-6 py-2 rounded-full backdrop-blur-sm">
            {listings.length} {t('site.suppliers')}
          </p>
        </div>
      </div>

      {/* Cities Filter */}
      {cities.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-10 sm:px-8 lg:px-12">
          <h2 className="text-2xl font-bold text-[#2D5F43] mb-5 font-['Cairo']">
            📍 {t('browse.city')}
          </h2>
          <div className={`flex flex-wrap gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {cities.map((city, index) => (
              <span
                key={index}
                className="bg-white px-5 py-2.5 rounded-full shadow-md text-sm font-medium text-[#2D5F43] hover:bg-[#3B7A57] hover:text-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-[#E6D4B0]"
              >
                {city.name} ({city.count})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Listings Grid with Filters */}
      <div className="max-w-7xl mx-auto px-6 py-10 sm:px-8 lg:px-12">
        {/* Ad Slot - Top Position */}
        <div className="mb-10">
          <AdSlot position="top" />
        </div>

        {/* Filterable Listings Component */}
        <FilterableListings 
          initialListings={listings}
          cities={cities}
          categories={categories}
        />
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1F4430] to-[#2D5F43] text-white mt-16 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:px-8 lg:px-12">
          {/* Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company */}
            <div>
              <h3 className="font-bold text-[#FFF5E6] text-lg mb-4 font-['Cairo']">
                {isRTL ? 'الشركة' : 'Company'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-[#E6D4B0] hover:text-white transition-colors">
                    {isRTL ? 'من نحن' : 'About Us'}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-[#E6D4B0] hover:text-white transition-colors">
                    {isRTL ? 'تواصل معنا' : 'Contact'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Businesses */}
            <div>
              <h3 className="font-bold text-[#FFF5E6] text-lg mb-4 font-['Cairo']">
                {isRTL ? 'للشركات' : 'For Businesses'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/advertise" className="text-[#E6D4B0] hover:text-white transition-colors">
                    {isRTL ? 'أعلن معنا' : 'Advertise'}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-[#E6D4B0] hover:text-white transition-colors">
                    {isRTL ? 'إضافة قائمة' : 'Add Listing'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-bold text-[#FFF5E6] text-lg mb-4 font-['Cairo']">
                {isRTL ? 'تواصل معنا' : 'Connect'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:info@saudidates.com" className="text-[#E6D4B0] hover:text-white transition-colors">
                    {isRTL ? 'البريد الإلكتروني' : 'Email'}
                  </a>
                </li>
                <li>
                  <a href="tel:+966500000000" className="text-[#E6D4B0] hover:text-white transition-colors">
                    {isRTL ? 'الهاتف' : 'Phone'}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-[#E6D4B0] text-lg font-['Amiri']">
              {t('footer.rights')}
            </p>
            <p className="text-[#FFF5E6] text-sm mt-2">
              🌴 {t('footer.tagline')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

