'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

export default function ContactPage() {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success message
    // Later, integrate with email service or API
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            {isRTL ? '📧 تواصل معنا' : '📧 Contact Us'}
          </h1>
          <p className="text-xl text-[#FFF5E6] font-light">
            {isRTL 
              ? 'نحن هنا للمساعدة! تواصل معنا لأي استفسارات'
              : 'We\'re here to help! Get in touch with us'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-10 border-2 border-[#E6D4B0]">
          {isRTL ? (
            <>
              {/* Arabic Content */}
              <div className="prose prose-lg max-w-none mb-8" dir="rtl">
                <h2 className="text-3xl font-bold text-[#2D5F43] mb-6 font-['Cairo']">
                  تواصل معنا
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  هل لديك سؤال أو اقتراح؟ نود أن نسمع منك! املأ النموذج أدناه وسنعود إليك في أقرب وقت ممكن.
                </p>

                {/* Contact Info Cards */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-[#F5E6CA] to-[#FFF5E6] p-4 rounded-xl border-2 border-[#E6D4B0]">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#3B7A57] text-white p-3 rounded-full">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-[#2D5F43]">البريد الإلكتروني</p>
                        <a href="mailto:info@saudidates.com" className="text-[#3B7A57] hover:text-[#2D5F43] text-sm">
                          info@saudidates.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#F5E6CA] to-[#FFF5E6] p-4 rounded-xl border-2 border-[#E6D4B0]">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#3B7A57] text-white p-3 rounded-full">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-[#2D5F43]">الهاتف</p>
                        <a href="tel:+966500000000" className="text-[#3B7A57] hover:text-[#2D5F43] text-sm">
                          +966 50 000 0000
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* English Content */}
              <div className="prose prose-lg max-w-none mb-8">
                <h2 className="text-3xl font-bold text-[#2D5F43] mb-6 font-['Cairo']">
                  Get In Touch
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  Have a question or suggestion? We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
                </p>

                {/* Contact Info Cards */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-[#F5E6CA] to-[#FFF5E6] p-4 rounded-xl border-2 border-[#E6D4B0]">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#3B7A57] text-white p-3 rounded-full">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-[#2D5F43]">Email</p>
                        <a href="mailto:info@saudidates.com" className="text-[#3B7A57] hover:text-[#2D5F43] text-sm">
                          info@saudidates.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#F5E6CA] to-[#FFF5E6] p-4 rounded-xl border-2 border-[#E6D4B0]">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#3B7A57] text-white p-3 rounded-full">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-[#2D5F43]">Phone</p>
                        <a href="tel:+966500000000" className="text-[#3B7A57] hover:text-[#2D5F43] text-sm">
                          +966 50 000 0000
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-[#2D5F43] mb-2">
                {isRTL ? 'الاسم *' : 'Name *'}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#E6D4B0] rounded-xl focus:ring-2 focus:ring-[#3B7A57] focus:border-[#3B7A57] transition-all"
                placeholder={isRTL ? 'أدخل اسمك' : 'Enter your name'}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-[#2D5F43] mb-2">
                {isRTL ? 'البريد الإلكتروني *' : 'Email *'}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#E6D4B0] rounded-xl focus:ring-2 focus:ring-[#3B7A57] focus:border-[#3B7A57] transition-all"
                placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-bold text-[#2D5F43] mb-2">
                {isRTL ? 'الموضوع *' : 'Subject *'}
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#E6D4B0] rounded-xl focus:ring-2 focus:ring-[#3B7A57] focus:border-[#3B7A57] transition-all"
              >
                <option value="">{isRTL ? 'اختر موضوعاً' : 'Select a subject'}</option>
                <option value="general">{isRTL ? 'استفسار عام' : 'General Inquiry'}</option>
                <option value="advertising">{isRTL ? 'فرص الإعلان' : 'Advertising Opportunities'}</option>
                <option value="listing">{isRTL ? 'إضافة قائمة' : 'Add a Listing'}</option>
                <option value="support">{isRTL ? 'الدعم الفني' : 'Technical Support'}</option>
                <option value="partnership">{isRTL ? 'فرص الشراكة' : 'Partnership Opportunities'}</option>
                <option value="other">{isRTL ? 'أخرى' : 'Other'}</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-[#2D5F43] mb-2">
                {isRTL ? 'الرسالة *' : 'Message *'}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#E6D4B0] rounded-xl focus:ring-2 focus:ring-[#3B7A57] focus:border-[#3B7A57] transition-all resize-none"
                placeholder={isRTL ? 'أخبرنا كيف يمكننا مساعدتك...' : 'Tell us how we can help you...'}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#3B7A57] to-[#4A9B6E] hover:from-[#2D5F43] hover:to-[#3B7A57] text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitted}
            >
              {submitted 
                ? (isRTL ? '✓ تم الإرسال!' : '✓ Sent Successfully!')
                : (isRTL ? '📤 إرسال الرسالة' : '📤 Send Message')}
            </button>
          </form>

          {/* Success Message */}
          {submitted && (
            <div className="mt-6 bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center">
              <p className="text-green-700 font-bold">
                {isRTL 
                  ? '✓ شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.'
                  : '✓ Thank you! Your message has been sent successfully. We\'ll get back to you soon.'}
              </p>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-8 bg-gradient-to-br from-[#F5E6CA] to-[#FFF5E6] p-6 rounded-xl border-2 border-[#E6D4B0]" dir={isRTL ? 'rtl' : 'ltr'}>
            <h3 className="font-bold text-[#2D5F43] mb-3 text-lg">
              {isRTL ? '💼 للاستفسارات التجارية:' : '💼 For Business Inquiries:'}
            </h3>
            <p className="text-gray-700 mb-2">
              {isRTL 
                ? 'إذا كنت تمثل شركة تجارية وتود مناقشة فرص الشراكة أو الإعلان، يرجى الاتصال بنا مباشرة:'
                : 'If you represent a business and would like to discuss partnership or advertising opportunities, please contact us directly:'}
            </p>
            <p className="text-[#3B7A57] font-semibold">
              📧 business@saudidates.com
            </p>
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

