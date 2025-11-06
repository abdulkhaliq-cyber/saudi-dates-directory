'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

export default function AboutPage() {
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
            {isRTL ? '🌴 من نحن' : '🌴 About Us'}
          </h1>
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
                  مرحباً بك في دليل التمور السعودية
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  دليل التمور السعودية هو منصتك الموثوقة للعثور على أفضل موردي التمور في المملكة العربية السعودية. نحن نربط بين المشترين وموردي التمور المتميزين في جميع أنحاء المملكة.
                </p>

                <h3 className="text-2xl font-bold text-[#3B7A57] mb-4 mt-8 font-['Cairo']">
                  رسالتنا
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  مهمتنا هي تسهيل اكتشاف التمور السعودية الممتازة من خلال توفير دليل شامل للموردين والتجار وتجار الجملة. نحن نؤمن بالحفاظ على التراث الغني لزراعة التمور في المملكة العربية السعودية مع مساعدة الشركات على النمو والازدهار.
                </p>

                <h3 className="text-2xl font-bold text-[#3B7A57] mb-4 mt-8 font-['Cairo']">
                  ما نقدمه
                </h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B7A57] text-2xl mt-1">✓</span>
                    <span className="text-gray-700 leading-relaxed">
                      دليل شامل لموردي التمور في المملكة
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B7A57] text-2xl mt-1">✓</span>
                    <span className="text-gray-700 leading-relaxed">
                      معلومات مفصلة عن كل مورد مع التقييمات
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B7A57] text-2xl mt-1">✓</span>
                    <span className="text-gray-700 leading-relaxed">
                      بحث سهل حسب المدينة والفئة
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B7A57] text-2xl mt-1">✓</span>
                    <span className="text-gray-700 leading-relaxed">
                      تفاصيل اتصال محدثة ومواقع على الخرائط
                    </span>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-[#3B7A57] mb-4 mt-8 font-['Cairo']">
                  لماذا التمور السعودية؟
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  المملكة العربية السعودية هي موطن لبعض من أجود أنواع التمور في العالم، بما في ذلك تمر العجوة الشهير وتمر المجدول وتمر الخلاص. ينتج مزارعو المملكة أكثر من 400 نوع من التمور، ويحافظون على تقاليد تمتد لآلاف السنين.
                </p>

                <div className="bg-gradient-to-br from-[#F5E6CA] to-[#FFF5E6] p-6 rounded-xl border-2 border-[#E6D4B0] mt-8">
                  <p className="text-[#2D5F43] font-bold text-center text-lg">
                    🌴 نربط بين أكثر من 100+ مورد تمور في جميع أنحاء المملكة
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* English Content */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-[#2D5F43] mb-6 font-['Cairo']">
                  Welcome to Saudi Dates Directory
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Saudi Dates Directory is your trusted platform for finding the finest dates suppliers across the Kingdom of Saudi Arabia. We connect buyers with premium dates suppliers throughout the region.
                </p>

                <h3 className="text-2xl font-bold text-[#3B7A57] mb-4 mt-8 font-['Cairo']">
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our mission is to make discovering premium Saudi dates effortless by providing a comprehensive directory of suppliers, retailers, and wholesalers. We believe in preserving the rich heritage of Saudi date cultivation while helping businesses grow and thrive.
                </p>

                <h3 className="text-2xl font-bold text-[#3B7A57] mb-4 mt-8 font-['Cairo']">
                  What We Offer
                </h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B7A57] text-2xl mt-1">✓</span>
                    <span className="text-gray-700 leading-relaxed">
                      Comprehensive directory of dates suppliers across Saudi Arabia
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B7A57] text-2xl mt-1">✓</span>
                    <span className="text-gray-700 leading-relaxed">
                      Detailed information about each supplier with ratings and reviews
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B7A57] text-2xl mt-1">✓</span>
                    <span className="text-gray-700 leading-relaxed">
                      Easy search and filtering by city, category, and more
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3B7A57] text-2xl mt-1">✓</span>
                    <span className="text-gray-700 leading-relaxed">
                      Up-to-date contact details and map locations
                    </span>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-[#3B7A57] mb-4 mt-8 font-['Cairo']">
                  Why Saudi Dates?
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Saudi Arabia is home to some of the world's finest dates, including the renowned Ajwa dates, Medjool, and Khalas varieties. The Kingdom produces over 400 types of dates, maintaining traditions that stretch back thousands of years.
                </p>

                <div className="bg-gradient-to-br from-[#F5E6CA] to-[#FFF5E6] p-6 rounded-xl border-2 border-[#E6D4B0] mt-8">
                  <p className="text-[#2D5F43] font-bold text-center text-lg">
                    🌴 Connecting 100+ dates suppliers across the Kingdom
                  </p>
                </div>
              </div>
            </>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="/"
              className="flex-1 bg-gradient-to-r from-[#3B7A57] to-[#4A9B6E] hover:from-[#2D5F43] hover:to-[#3B7A57] text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-center shadow-lg hover:shadow-xl hover:scale-105"
            >
              {isRTL ? 'تصفح الموردين' : 'Browse Suppliers'}
            </Link>
            <Link
              href="/contact"
              className="flex-1 bg-[#F5E6CA] hover:bg-[#E6D4B0] text-[#2D5F43] font-bold py-4 px-6 rounded-xl transition-all duration-200 text-center border-2 border-[#E6D4B0] hover:border-[#3B7A57] shadow-md hover:shadow-lg"
            >
              {isRTL ? 'تواصل معنا' : 'Contact Us'}
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

