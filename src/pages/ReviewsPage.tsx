import React from 'react';
import { MessageSquareHeart, ExternalLink, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';
import { usePageMeta } from '../hooks/usePageMeta';

export const ReviewsPage: React.FC = () => {
  usePageMeta({
    title: 'Customer Reviews | Vrindavan Treats — Deolali, Nashik',
    description:
      'Read genuine customer reviews for Vrindavan Treats in Deolali, Nashik. Share your experience and help others discover the best vegetarian food and Amul ice cream parlour near Vijay Nagar.',
    canonicalPath: '/reviews',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://vrindavantreats.in/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Customer Reviews',
          item: 'https://vrindavantreats.in/reviews',
        },
      ],
    },
  });
  return (
    <div className="bg-white pb-24">
      {/* Clean Light Hero Section */}
      <section className="bg-gradient-to-b from-red-50/70 to-white text-gray-900 py-14 sm:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="font-serif italic text-[#E52E2D] text-base sm:text-lg font-bold tracking-wide">
            Guest Feedback & Ratings
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight">
            Customer Reviews
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            We value honest, transparent experiences from our guests in Deolali and Nashik.
          </p>
        </div>
      </section>

      {/* Main Tasteful Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="bg-gray-50 rounded-3xl p-8 sm:p-14 border border-gray-100 shadow-xs text-center space-y-8">
          <div className="w-20 h-20 rounded-full bg-red-100 text-[#E52E2D] flex items-center justify-center mx-auto shadow-sm">
            <MessageSquareHeart className="w-10 h-10" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <span className="font-serif italic text-[#E52E2D] text-lg font-bold">
              Authentic Guest Experiences
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-gray-900">
              Customer reviews will appear here when available
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed pt-1">
              At Vrindavan Treats, we believe in complete authenticity. We never publish fabricated reviews, stock testimonials, or simulated star ratings. Genuine guest feedback from our store visitors will be featured here as it is collected.
            </p>
          </div>

          {/* Interactive Actions for Genuine Guests */}
          <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gray-900 hover:bg-black text-white font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>View or Leave a Review on Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={`https://wa.me/${STORE_INFO.whatsappRaw}?text=${encodeURIComponent(
                'Hello Vrindavan Treats! I recently visited your shop and would like to share feedback about my experience.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share Feedback Directly on WhatsApp</span>
            </a>
          </div>

          <p className="text-[11px] text-gray-400 italic">
            Have you visited us in Vijay Nagar, Deolali? We’d love to hear your thoughts on our burgers, pizzas, momos, shakes, and Amul ice creams.
          </p>
        </div>
      </section>
    </div>
  );
};
