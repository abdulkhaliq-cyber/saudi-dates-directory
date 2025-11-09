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
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-screen md:h-96 w-full bg-cover bg-center shadow-xl overflow-hidden"
        style={{
          backgroundImage: 'url(/hero.png)',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Subtle Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-between md:justify-center items-center px-6 py-12 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
          {/* Language Toggle - Top Right */}
          <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'} w-full`}>
            <LanguageToggle />
          </div>

          {/* Center Content */}
          <div className="flex flex-col items-center text-center space-y-6 flex-1 flex md:flex-initial md:justify-center">
            <h1 className="text-4xl md:text-6xl font-bold font-['Playfair Display'] tracking-wider text-[#FFF5E6] drop-shadow-lg">
              {t('site.title')}
            </h1>
            <p className="text-lg md:text-xl text-[#F5E6CA] font-light drop-shadow-md max-w-2xl">
              {t('site.subtitle')}
            </p>

            {/* Search Bar + CTA Button */}
            <div className="w-full max-w-2xl mt-8 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder={t('search.placeholder') || 'Search by City, Store Name, or Date Type...'}
                className="flex-1 px-6 py-4 rounded-lg text-[#2D5F43] placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-[#3B7A57] shadow-lg"
              />
              <button className="px-8 py-4 bg-[#8B5A2B] hover:bg-[#704214] text-white font-bold rounded-lg transition-all duration-200 hover:shadow-xl whitespace-nowrap">
                {t('find.dates') || 'FIND DATES'}
              </button>
            </div>

            {/* Supplier Count Badge */}
            <p className="text-base md:text-lg text-[#FFF5E6] bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full font-medium mt-4">
              ✨ {listings.length} {t('site.suppliers')}
            </p>
          </div>
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

