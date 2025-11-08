'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface BuyersGuideProps {
  type: 'city' | 'category';
  name: string;
}

// Guide content for cities and categories
const cityGuides: Record<string, { tips: string[]; seasonal: string; varieties: string[] }> = {
  'riyadh': {
    tips: ['Look for suppliers near King Fahd Road for easy access', 'Many offer bulk discounts for large orders', 'Check opening hours during Ramadan'],
    seasonal: 'Peak season: May-August for fresh harvest dates',
    varieties: ['Ajwa', 'Sukkari', 'Safawi', 'Khalas']
  },
  'madinah': {
    tips: ['Famous for Ajwa dates - buy from certified suppliers', 'Many shops near the Prophet\'s Mosque', 'Ask for authenticity certificates'],
    seasonal: 'Year-round availability, fresh Ajwa in summer',
    varieties: ['Ajwa (Premium)', 'Safawi', 'Anbar']
  },
  'jeddah': {
    tips: ['Diverse selection from across Saudi Arabia', 'Coastal suppliers may offer better preservation', 'Check expiry dates for imported varieties'],
    seasonal: 'Best selection during Ramadan and Eid',
    varieties: ['Mixed varieties', 'Medjool', 'Deglet Noor']
  },
};

const categoryGuides: Record<string, { tips: string[]; features: string[]; priceRange: string }> = {
  'dates shop': {
    tips: ['Compare prices across multiple shops', 'Ask for samples before bulk purchase', 'Check packaging dates'],
    features: ['Retail packaging', 'Gift boxes available', 'Multiple varieties'],
    priceRange: 'SAR 20-100 per kg'
  },
  'dates supplier': {
    tips: ['Best for bulk orders', 'Negotiate for better prices', 'Request quality certificates'],
    features: ['Wholesale pricing', 'Bulk packaging', 'Direct from farms'],
    priceRange: 'SAR 15-80 per kg'
  },
  'dates farm': {
    tips: ['Fresh from source', 'Visit during harvest season', 'Book in advance for tours'],
    features: ['Farm-fresh quality', 'Organic options', 'Farm visits available'],
    priceRange: 'SAR 10-60 per kg'
  },
};

export default function BuyersGuide({ type, name }: BuyersGuideProps) {
  const { t } = useLanguage();
  
  const normalizedName = name.toLowerCase().replace(/[-_]/g, ' ');
  const guide = type === 'city' 
    ? cityGuides[normalizedName] 
    : categoryGuides[normalizedName];

  if (!guide) return null;

  return (
    <div className="bg-gradient-to-br from-[#F5E6CA] to-[#FFF9F0] rounded-2xl shadow-xl border-2 border-[#D4C29A] p-8 mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#3B7A57] p-3 rounded-lg">
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#2D5F43]">
            {t('best.guide.title')}
          </h2>
          <p className="text-gray-600 text-sm">
            {t('best.guide.subtitle')}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Shopping Tips */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-[#E6D4B0]">
          <h3 className="text-lg font-bold text-[#2D5F43] mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            {t('best.guide.tips')}
          </h3>
          <ul className="space-y-3">
            {guide.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-[#3B7A57] font-bold mt-0.5">•</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Seasonal Info or Features */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-[#E6D4B0]">
          {type === 'city' && 'seasonal' in guide ? (
            <>
              <h3 className="text-lg font-bold text-[#2D5F43] mb-4 flex items-center gap-2">
                <span className="text-2xl">📅</span>
                {t('best.guide.seasonal')}
              </h3>
              <p className="text-gray-700 mb-6">{guide.seasonal}</p>
              
              <h4 className="text-md font-bold text-[#2D5F43] mb-3 flex items-center gap-2">
                <span className="text-xl">🌴</span>
                {t('best.guide.varieties')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {guide.varieties.map((variety, index) => (
                  <span
                    key={index}
                    className="bg-[#F5E6CA] text-[#2D5F43] px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {variety}
                  </span>
                ))}
              </div>
            </>
          ) : 'features' in guide ? (
            <>
              <h3 className="text-lg font-bold text-[#2D5F43] mb-4 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                {t('best.guide.features')}
              </h3>
              <ul className="space-y-3 mb-6">
                {guide.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-[#FFF9F0] rounded-lg p-4 border-l-4 border-[#3B7A57]">
                <h4 className="text-sm font-bold text-[#2D5F43] mb-1">
                  {t('best.guide.price.range')}
                </h4>
                <p className="text-lg font-bold text-[#3B7A57]">{guide.priceRange}</p>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* Why Choose From This List */}
      <div className="mt-6 bg-white rounded-xl p-6 shadow-md border border-[#E6D4B0]">
        <h3 className="text-lg font-bold text-[#2D5F43] mb-4 flex items-center gap-2">
          <span className="text-2xl">🏆</span>
          {t('best.guide.why.choose')}
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-yellow-100 p-2 rounded-lg flex-shrink-0">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">{t('best.guide.verified')}</h4>
              <p className="text-xs text-gray-600">{t('best.guide.verified.desc')}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">{t('best.guide.quality')}</h4>
              <p className="text-xs text-gray-600">{t('best.guide.quality.desc')}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">{t('best.guide.updated')}</h4>
              <p className="text-xs text-gray-600">{t('best.guide.updated.desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

