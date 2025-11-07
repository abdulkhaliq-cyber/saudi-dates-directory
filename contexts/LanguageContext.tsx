'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface Translations {
  ar: {
    [key: string]: string;
  };
  en: {
    [key: string]: string;
  };
}

const translations: Translations = {
  ar: {
    // Header
    'site.title': 'دليل التمور السعودية',
    'site.subtitle': 'اكتشف أفضل موردي التمور في المملكة العربية السعودية',
    'site.suppliers': 'مورد مميز',
    'back.directory': 'العودة إلى الدليل',
    'back.listings': 'العودة إلى جميع القوائم',
    
    // Navigation
    'browse.city': 'البحث حسب المدينة',
    'filter.city': 'تصفية حسب المدينة',
    'filter.category': 'تصفية حسب الفئة',
    'filter.reset': 'إعادة تعيين الفلاتر',
    'active.filters': 'الفلاتر النشطة',
    
    // Listings
    'all.listings': 'جميع القوائم',
    'filtered.results': 'النتائج المصفاة',
    'no.listings': 'لم يتم العثور على قوائم',
    'no.listings.text': 'حاول تعديل الفلاتر أو',
    'reset.all': 'إعادة تعيين جميع الفلاتر',
    'listing': 'قائمة',
    'listings': 'قوائم',
    
    // Card
    'call.now': 'اتصل الآن',
    'view.details': 'عرض التفاصيل',
    
    // Detail Page
    'contact.info': 'معلومات الاتصال',
    'quick.actions': 'إجراءات سريعة',
    'phone': 'الهاتف',
    'website': 'الموقع الإلكتروني',
    'address': 'العنوان',
    'city': 'المدينة',
    'category': 'الفئة',
    'rating': 'التقييم',
    'visit.website': 'زيارة الموقع',
    'view.maps': 'عرض على خرائط جوجل',
    'location.coords': 'إحداثيات الموقع',
    'quick.info': 'معلومات سريعة',
    'location': 'الموقع',
    
    // Listing Detail (with prefix)
    'back.to.directory': 'العودة إلى الدليل',
    'back.to.all': 'العودة إلى جميع القوائم',
    'listing.contact.info': 'معلومات الاتصال',
    'listing.quick.actions': 'إجراءات سريعة',
    'listing.phone': 'الهاتف',
    'listing.website': 'الموقع الإلكتروني',
    'listing.address': 'العنوان',
    'listing.city': 'المدينة',
    'listing.visit.website': 'زيارة الموقع',
    'listing.view.maps': 'عرض على خرائط جوجل',
    'listing.coordinates': 'إحداثيات الموقع',
    'listing.lat': 'خط العرض',
    'listing.lng': 'خط الطول',
    'listing.quick.info': 'معلومات سريعة',
    'listing.category': 'الفئة',
    'listing.location': 'الموقع',
    'listing.rating': 'التقييم',
    
    // Dropdowns
    'all.cities': 'كل المدن',
    'all.categories': 'كل الفئات',
    
    // Footer
    'footer.rights': '© 2025 دليل التمور السعودية. جميع الحقوق محفوظة.',
    'footer.tagline': 'نربط بين أفضل موردي التمور في المملكة',
    
    // Loading
    'loading': 'جاري التحميل...',
  },
  en: {
    // Header
    'site.title': 'Saudi Dates Directory',
    'site.subtitle': 'Discover Premium Dates Suppliers Across Saudi Arabia',
    'site.suppliers': 'Premium Suppliers Listed',
    'back.directory': 'Back to Directory',
    'back.listings': 'Back to All Listings',
    
    // Navigation
    'browse.city': 'Browse by City',
    'filter.city': 'Filter by City',
    'filter.category': 'Filter by Category',
    'filter.reset': 'Reset Filters',
    'active.filters': 'Active filters',
    
    // Listings
    'all.listings': 'All Listings',
    'filtered.results': 'Filtered Results',
    'no.listings': 'No Listings Found',
    'no.listings.text': 'Try adjusting your filters or',
    'reset.all': 'reset all filters',
    'listing': 'listing',
    'listings': 'listings',
    
    // Card
    'call.now': 'Call Now',
    'view.details': 'View Details',
    
    // Detail Page
    'contact.info': 'Contact Information',
    'quick.actions': 'Quick Actions',
    'phone': 'Phone',
    'website': 'Website',
    'address': 'Address',
    'city': 'City',
    'category': 'Category',
    'rating': 'Rating',
    'visit.website': 'Visit Website',
    'view.maps': 'View on Google Maps',
    'location.coords': 'Location Coordinates',
    'quick.info': 'Quick Info',
    'location': 'Location',
    
    // Listing Detail (with prefix)
    'back.to.directory': 'Back to Directory',
    'back.to.all': 'Back to All Listings',
    'listing.contact.info': 'Contact Information',
    'listing.quick.actions': 'Quick Actions',
    'listing.phone': 'Phone',
    'listing.website': 'Website',
    'listing.address': 'Address',
    'listing.city': 'City',
    'listing.visit.website': 'Visit Website',
    'listing.view.maps': 'View on Google Maps',
    'listing.coordinates': 'Location Coordinates',
    'listing.lat': 'Latitude',
    'listing.lng': 'Longitude',
    'listing.quick.info': 'Quick Info',
    'listing.category': 'Category',
    'listing.location': 'Location',
    'listing.rating': 'Rating',
    
    // Dropdowns
    'all.cities': 'All Cities',
    'all.categories': 'All Categories',
    
    // Footer
    'footer.rights': '© 2025 Saudi Dates Directory. All rights reserved.',
    'footer.tagline': 'Connecting Saudi Arabia\'s finest dates suppliers',
    
    // Loading
    'loading': 'Loading...',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar'); // Default to Arabic
  const [mounted, setMounted] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
    setMounted(true);
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Update HTML dir attribute for RTL
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  // Apply RTL on mount
  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [mounted, isRTL, language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

