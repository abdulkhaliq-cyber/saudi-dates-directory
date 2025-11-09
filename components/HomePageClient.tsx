'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import FilterableListings from './FilterableListings';
import AdSlot from './AdSlot';
import LanguageToggle from './LanguageToggle';
import TopNavBar from './TopNavBar';
import Link from 'next/link';
import { useState } from 'react';

interface HomePageClientProps {
  listings: any[];
  cities: Array<{ name: string; count: number }>;
  categories: Array<{ category: string; count: number }>;
}

export default function HomePageClient({ listings, cities, categories }: HomePageClientProps) {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="min-h-screen bg-[#FBF8F3]">
      {/* Top Navigation Bar */}
      <TopNavBar />
      
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-[500px] md:h-[450px] w-full bg-cover bg-center shadow-lg overflow-hidden"
        style={{
          backgroundImage: 'url(/hero.png)',
          backgroundPosition: 'center',
        }}
      >
        {/* Subtle Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        
        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-center items-center px-6 py-12 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full text-center">

          <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-white drop-shadow-2xl mb-4">
            {t('site.title')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light drop-shadow-lg max-w-2xl mb-8">
            {t('site.subtitle')}
          </p>

          {/* Search Bar + CTA Button */}
          <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={t('search.placeholder') || 'Search by City, Store Name, or Date Type...'}
              className="flex-1 px-6 py-4 rounded-lg text-gray-800 placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-[#3B7A57] shadow-xl bg-white"
            />
            {/* The button is cosmetic but shows intent. Actual filtering happens below. */}
            <button className="px-8 py-4 bg-[#8B5A2B] hover:bg-[#6B4221] text-white font-bold rounded-lg transition-all duration-200 hover:shadow-2xl whitespace-nowrap">
              {t('find.dates') || 'FIND DATES'}
            </button>
          </div>

          {/* Supplier Count Badge */}
          <p className="text-base md:text-lg text-white bg-white/20 backdrop-blur-md px-6 py-3 rounded-full font-medium mt-6 shadow-lg">
            🌴 {listings.length} {t('site.suppliers')}
          </p>
        </div>
      </div>

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
          heroSearchTerm={searchTerm}
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
