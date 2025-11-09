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
    
    // Search
    'search.placeholder': 'ابحث عن المدينة أو المتجر أو نوع التمر...',
    'find.dates': 'ابحث عن التمور',
    
    // Footer
    'footer.rights': '© 2025 دليل التمور السعودية. جميع الحقوق محفوظة.',
    'footer.tagline': 'نربط بين أفضل موردي التمور في المملكة',
    
    // Loading
    'loading': 'جاري التحميل...',
    
    // Best of Pages
    'best.of': 'الأفضل في',
    'best.title': 'أفضل التمور',
    'best.subtitle': 'أفضل التمور في المملكة العربية السعودية',
    'best.by.city': 'أفضل التمور حسب المدينة',
    'best.by.category': 'أفضل التمور حسب الفئة',
    'best.suppliers': 'أفضل الموردين',
    'best.ranked': 'مرتبة حسب التقييم',
    'best.updated': 'محدث',
    'best.view.all': 'تصفح جميع صفحات الأفضل',
    'best.editors.pick': 'اختيار المحرر',
    
    // Comparison Table
    'best.compare.top': 'مقارنة أفضل',
    'best.compare.description': 'قارن بين أفضل الموردين جنبًا إلى جنب',
    'best.compare.feature': 'الميزة',
    'best.available': 'متوفر',
    'best.visit': 'زيارة',
    'best.action': 'إجراء',
    
    // Stats
    'best.stats.title': 'إحصائيات رئيسية',
    'best.stats.avg.rating': 'متوسط التقييم',
    'best.stats.top.rating': 'أعلى تقييم',
    'best.stats.has.phone': 'لديه رقم هاتف',
    'best.stats.has.website': 'لديه موقع إلكتروني',
    
    // Filters
    'best.filters.title': 'تصفية النتائج',
    'best.filters.min.rating': 'الحد الأدنى للتقييم',
    'best.filters.all': 'الكل',
    'best.filters.features': 'الميزات',
    'best.filters.has.phone': 'لديه رقم هاتف',
    'best.filters.has.website': 'لديه موقع إلكتروني',
    'best.filters.with.phone': 'مع رقم الهاتف',
    'best.filters.with.website': 'مع الموقع الإلكتروني',
    
    // Buyer's Guide
    'best.guide.title': 'دليل المشتري',
    'best.guide.subtitle': 'نصائح الخبراء للتسوق الذكي',
    'best.guide.tips': 'نصائح التسوق',
    'best.guide.seasonal': 'معلومات موسمية',
    'best.guide.varieties': 'الأصناف المتوفرة',
    'best.guide.features': 'الميزات الرئيسية',
    'best.guide.price.range': 'نطاق السعر',
    'best.guide.why.choose': 'لماذا تختار من هذه القائمة؟',
    'best.guide.verified': 'تقييمات موثوقة',
    'best.guide.verified.desc': 'جميع التقييمات من عملاء حقيقيين',
    'best.guide.quality': 'جودة مضمونة',
    'best.guide.quality.desc': 'موردون معتمدون ومتحققون',
    'best.guide.updated': 'محدث بانتظام',
    'best.guide.updated.desc': 'معلومات دقيقة ومحدثة',
    
    // Map
    'best.map.title': 'عرض الخريطة',
    'best.map.locations': 'موقع على الخريطة',
    'best.map.open.full': 'فتح في خرائط جوجل',
    'best.map.all.locations': 'جميع المواقع',
    'best.map.directions': 'الحصول على اتجاهات',
    
    // Unique Intro
    'best.intro.why': 'لماذا هذه الأفضل؟',
    'best.filtered.count': 'نتيجة مطابقة',
    'best.no.results': 'لا توجد نتائج مطابقة',
    'best.no.results.text': 'حاول تعديل الفلاتر الخاصة بك',
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
    
    // Search
    'search.placeholder': 'Search by City, Store Name, or Date Type...',
    'find.dates': 'FIND DATES',
    
    // Footer
    'footer.rights': '© 2025 Saudi Dates Directory. All rights reserved.',
    'footer.tagline': 'Connecting Saudi Arabia\'s finest dates suppliers',
    
    // Loading
    'loading': 'Loading...',
    
    // Best of Pages
    'best.of': 'Best of',
    'best.title': 'Best Dates',
    'best.subtitle': 'Best Dates in Saudi Arabia',
    'best.by.city': 'Best Dates by City',
    'best.by.category': 'Best Dates by Category',
    'best.suppliers': 'Top Suppliers',
    'best.ranked': 'Ranked by Rating',
    'best.updated': 'Updated',
    'best.view.all': 'Browse All Best of Pages',
    'best.editors.pick': "Editor's Pick",
    
    // Comparison Table
    'best.compare.top': 'Compare Top',
    'best.compare.description': 'Compare top suppliers side by side',
    'best.compare.feature': 'Feature',
    'best.available': 'Available',
    'best.visit': 'Visit',
    'best.action': 'Action',
    
    // Stats
    'best.stats.title': 'Key Statistics',
    'best.stats.avg.rating': 'Average Rating',
    'best.stats.top.rating': 'Top Rating',
    'best.stats.has.phone': 'Has Phone',
    'best.stats.has.website': 'Has Website',
    
    // Filters
    'best.filters.title': 'Filter Results',
    'best.filters.min.rating': 'Minimum Rating',
    'best.filters.all': 'All',
    'best.filters.features': 'Features',
    'best.filters.has.phone': 'Has phone number',
    'best.filters.has.website': 'Has website',
    'best.filters.with.phone': 'With phone',
    'best.filters.with.website': 'With website',
    
    // Buyer's Guide
    'best.guide.title': "Buyer's Guide",
    'best.guide.subtitle': 'Expert tips for smart shopping',
    'best.guide.tips': 'Shopping Tips',
    'best.guide.seasonal': 'Seasonal Information',
    'best.guide.varieties': 'Available Varieties',
    'best.guide.features': 'Key Features',
    'best.guide.price.range': 'Price Range',
    'best.guide.why.choose': 'Why Choose From This List?',
    'best.guide.verified': 'Verified Ratings',
    'best.guide.verified.desc': 'All ratings from real customers',
    'best.guide.quality': 'Quality Assured',
    'best.guide.quality.desc': 'Certified and verified suppliers',
    'best.guide.updated': 'Regularly Updated',
    'best.guide.updated.desc': 'Accurate and current information',
    
    // Map
    'best.map.title': 'Map View',
    'best.map.locations': 'locations on map',
    'best.map.open.full': 'Open in Google Maps',
    'best.map.all.locations': 'All Locations',
    'best.map.directions': 'Get directions',
    
    // Unique Intro
    'best.intro.why': 'Why These Are the Best?',
    'best.filtered.count': 'matching results',
    'best.no.results': 'No matching results',
    'best.no.results.text': 'Try adjusting your filters',
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

