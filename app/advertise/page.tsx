'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

export default function AdvertisePage() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F5E6CA]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3B7A57] via-[#2D5F43] to-[#1F4430] text-white py-10 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className={`flex items-center justify-between mb-6`}>
            <Link 
              href="/" 
              className="inline-flex items-center text-[#FFF5E6] hover:text-white transition-all duration-200 font-bold bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-sm hover:bg-white/20"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {isRTL ? 'العودة للرئيسية' : '← Back to Home'}
            </Link>
            <LanguageToggle />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-['Amiri'] tracking-wide">
            {isRTL ? '📢 أعلن معنا' : '📢 Advertise With Us'}
          </h1>
          <p className="text-xl text-[#FFF5E6] font-light">
            {isRTL 
              ? 'انشر أعمالك أمام آلاف المشترين المحتملين'
              : 'Grow your business and reach thousands of potential buyers'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-10 border-2 border-[#E6D4B0]">
          {isRTL ? (
            <>
              {/* Arabic Content */}
              <div className="prose prose-lg max-w-none" dir="rtl">
                <h2 className="text-3xl font-bold text-[#2D5F43] mb-6 font-['Cairo']">
                  عزز نمو أعمالك في قطاع التمور
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  دليل التمور السعودية هو المنصة الرائدة التي تربط موردي التمور بالمشترين في جميع أنحاء المملكة. انضم إلى شبكتنا المتنامية من الشركات الناجحة!
                </p>

                <h3 className="text-2xl font-bold text-[#3B7A57] mb-4 mt-8 font-['Cairo']">
                  📋 خيارات الإعلان
                </h3>

                {/* Premium Listing */}
                <div className="bg-gradient-to-br from-[#3B7A57] to-[#4A9B6E] text-white p-6 rounded-xl mb-6 shadow-lg">
                  <h4 className="text-2xl font-bold mb-3 font-['Cairo']">⭐ القائمة المميزة</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <span>✓</span>
                      <span>ظهور أولوية في نتائج البحث</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✓</span>
                      <span>شارة "مميز" على قائمتك</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✓</span>
                      <span>معلومات اتصال مفصلة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✓</span>
                      <span>صور وشعار الشركة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✓</span>
                      <span>تحليلات ومشاهدات الصفحة</span>
                    </li>
                  </ul>
                  <p className="text-[#FFF5E6] font-semibold">من 500 ريال / شهر</p>
                </div>

                {/* Banner Ads */}
                <div className="bg-gradient-to-br from-[#F5E6CA] to-[#FFF5E6] p-6 rounded-xl mb-6 border-2 border-[#E6D4B0]">
                  <h4 className="text-2xl font-bold text-[#2D5F43] mb-3 font-['Cairo']">🎯 إعلانات البانر</h4>
                  <ul className="space-y-2 mb-4 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-[#3B7A57]">✓</span>
                      <span>مواضع البانر العلوي على الصفحة الرئيسية</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#3B7A57]">✓</span>
                      <span>إعلانات الشريط الجانبي على صفحات القوائم</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#3B7A57]">✓</span>
                      <span>إعلانات مضمنة في نتائج البحث</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#3B7A57]">✓</span>
                      <span>تصميمات مخصصة متاحة</span>
                    </li>
                  </ul>
                  <p className="text-[#2D5F43] font-semibold">من 300 ريال / شهر</p>
                </div>

                {/* Sponsored Content */}
                <div className="bg-gradient-to-br from-[#D4C29A] to-[#E6D4B0] p-6 rounded-xl mb-6 border-2 border-[#3B7A57]">
                  <h4 className="text-2xl font-bold text-[#2D5F43] mb-3 font-['Cairo']">📝 المحتوى المدعوم</h4>
                  <ul className="space-y-2 mb-4 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-[#3B7A57]">✓</span>
                      <span>مقالات مميزة عن أعمالك</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#3B7A57]">✓</span>
                      <span>تسليط الضوء على المنتجات</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#3B7A57]">✓</span>
                      <span>مشاركة على وسائل التواصل الاجتماعي</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#3B7A57]">✓</span>
                      <span>فوائد تحسين محركات البحث</span>
                    </li>
                  </ul>
                  <p className="text-[#2D5F43] font-semibold">حسب الطلب - اتصل للحصول على سعر</p>
                </div>

                <h3 className="text-2xl font-bold text-[#3B7A57] mb-4 mt-8 font-['Cairo']">
                  🎁 لماذا تعلن معنا؟
                </h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B7A57] text-2xl mt-1">✓</span>
                    <span className="text-gray-700 leading-relaxed">
                      <strong>جمهور مستهدف:</strong> وصول إلى المشترين الذين يبحثون بنشاط عن موردي التمور
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B7A57] text-2xl mt-1">✓</span>
                    <span className="text-gray-700 leading-relaxed">
                      <strong>رؤية محلية:</strong> هيمن على سوق التمور في منطقتك
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B7A57] text-2xl mt-1">✓</span>
                    <span className="text-gray-700 leading-relaxed">
                      <strong>أسعار معقولة:</strong> خطط مرنة تناسب أي ميزانية
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B7A57] text-2xl mt-1">✓</span>
                    <span className="text-gray-700 leading-relaxed">
                      <strong>نتائج قابلة للقياس:</strong> تتبع المشاهدات والاستفسارات والتحويلات
                    </span>
                  </li>
                </ul>

                <div className="bg-gradient-to-br from-[#F5E6CA] to-[#FFF5E6] p-6 rounded-xl border-2 border-[#E6D4B0] mt-8 text-center">
                  <p className="text-[#2D5F43] font-bold text-xl mb-3">
                    🚀 جاهز للبدء؟
                  </p>
                  <p className="text-gray-700 mb-4">
                    تواصل معنا اليوم لمناقشة أفضل حزمة إعلانية لأعمالك
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* English Content */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-[#2D5F43] mb-6 font-['Cairo']">
                  Grow Your Dates Business
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Saudi Dates Directory is the leading platform connecting dates suppliers with buyers across the Kingdom. Join our growing network of successful businesses!
                </p>

                <h3 className="text-2xl font-bold text-[#3B7A57] mb-4 mt-8 font-['Cairo']">
                  📋 Advertising Options
                </h3>

                {/* Premium Listing */}
                <div className="bg-gradient-to-br from-[#3B7A57] to-[#4A9B6E] text-white p-6 rounded-xl mb-6 shadow-lg">
                  <h4 className="text-2xl font-bold mb-3 font-['Cairo']">⭐ Premium Listing</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Priority placement in search results</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✓</span>
                      <span>"Featured" badge on your listing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Extended contact information</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Photo gallery and company logo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Analytics and page view tracking</span>
                    </li>
                  </ul>
                  <p className="text-[#FFF5E6] font-semibold">Starting at 500 SAR/month</p>
                </div>

                {/* Banner Ads */}
                <div className="bg-gradient-to-br from-[#F5E6CA] to-[#FFF5E6] p-6 rounded-xl mb-6 border-2 border-[#E6D4B0]">
                  <h4 className="text-2xl font-bold text-[#2D5F43] mb-3 font-['Cairo']">🎯 Banner Advertising</h4>
                  <ul className="space-y-2 mb-4 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-[#3B7A57]">✓</span>
                      <span>Homepage top banner placements</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#3B7A57]">✓</span>
                      <span>Sidebar ads on listing pages</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#3B7A57]">✓</span>
                      <span>In-feed ads within search results</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#3B7A57]">✓</span>
                      <span>Custom designs available</span>
                    </li>
                  </ul>
                  <p className="text-[#2D5F43] font-semibold">Starting at 300 SAR/month</p>
                </div>

                {/* Sponsored Content */}
                <div className="bg-gradient-to-br from-[#D4C29A] to-[#E6D4B0] p-6 rounded-xl mb-6 border-2 border-[#3B7A57]">
                  <h4 className="text-2xl font-bold text-[#2D5F43] mb-3 font-['Cairo']">📝 Sponsored Content</h4>
                  <ul className="space-y-2 mb-4 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-[#3B7A57]">✓</span>
                      <span>Featured articles about your business</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#3B7A57]">✓</span>
                      <span>Product spotlight features</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#3B7A57]">✓</span>
                      <span>Social media promotion included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#3B7A57]">✓</span>
                      <span>SEO benefits for your website</span>
                    </li>
                  </ul>
                  <p className="text-[#2D5F43] font-semibold">Custom pricing - Contact for quote</p>
                </div>

                <h3 className="text-2xl font-bold text-[#3B7A57] mb-4 mt-8 font-['Cairo']">
                  🎁 Why Advertise With Us?
                </h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B7A57] text-2xl mt-1">✓</span>
                    <span className="text-gray-700 leading-relaxed">
                      <strong>Targeted Audience:</strong> Reach buyers actively searching for dates suppliers
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B7A57] text-2xl mt-1">✓</span>
                    <span className="text-gray-700 leading-relaxed">
                      <strong>Local Visibility:</strong> Dominate the dates market in your region
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B7A57] text-2xl mt-1">✓</span>
                    <span className="text-gray-700 leading-relaxed">
                      <strong>Affordable Pricing:</strong> Flexible plans to fit any budget
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B7A57] text-2xl mt-1">✓</span>
                    <span className="text-gray-700 leading-relaxed">
                      <strong>Measurable Results:</strong> Track views, inquiries, and conversions
                    </span>
                  </li>
                </ul>

                <div className="bg-gradient-to-br from-[#F5E6CA] to-[#FFF5E6] p-6 rounded-xl border-2 border-[#E6D4B0] mt-8 text-center">
                  <p className="text-[#2D5F43] font-bold text-xl mb-3">
                    🚀 Ready to Get Started?
                  </p>
                  <p className="text-gray-700 mb-4">
                    Contact us today to discuss the best advertising package for your business
                  </p>
                </div>
              </div>
            </>
          )}

          {/* CTA Button */}
          <div className="mt-10">
            <Link
              href="/contact"
              className="w-full block bg-gradient-to-r from-[#3B7A57] to-[#4A9B6E] hover:from-[#2D5F43] hover:to-[#3B7A57] text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-center shadow-lg hover:shadow-xl hover:scale-105"
            >
              {isRTL ? '📧 تواصل معنا للإعلان' : '📧 Contact Us to Advertise'}
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1F4430] to-[#2D5F43] text-white py-8 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#E6D4B0] font-['Amiri']">
            {isRTL 
              ? '© 2025 دليل التمور السعودية. جميع الحقوق محفوظة.'
              : '© 2025 Saudi Dates Directory. All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
}

