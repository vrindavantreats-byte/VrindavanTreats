import React from 'react';
import { STORE_INFO } from '../data/menuData';
import { usePageMeta } from '../hooks/usePageMeta';

export const PrivacyPolicyPage: React.FC = () => {
  usePageMeta({
    title: 'Privacy Policy | Vrindavan Treats',
    description:
      'Privacy policy for Vrindavan Treats customer inquiries, contact details handling, and order requests.',
    canonicalPath: '/privacy-policy',
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
          name: 'Privacy Policy',
          item: 'https://vrindavantreats.in/privacy-policy',
        },
      ],
    },
  });
  return (
    <div className="bg-white pb-24">
      {/* Clean Light Hero */}
      <section className="bg-gradient-to-b from-red-50/70 to-white text-gray-900 py-14 sm:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="font-serif italic text-[#E52E2D] text-base sm:text-lg font-bold tracking-wide">
            Transparency & User Information
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-gray-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            How Vrindavan Treats handles customer information requested through our website.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="bg-gray-50 rounded-3xl p-8 sm:p-14 border border-gray-100 shadow-xs space-y-8 text-gray-800">
          <div className="space-y-3">
            <h2 className="font-display font-black text-2xl text-gray-900">
              1. Information Requested
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              When using the order inquiry form on this website, we request exactly three pieces of customer contact information:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 pl-2">
              <li><strong>Full Name:</strong> To identify who is requesting or picking up the food order.</li>
              <li><strong>Mobile Number:</strong> To contact you via call or WhatsApp regarding order confirmation and pickup readiness.</li>
              <li><strong>Email Address:</strong> To send an inquiry reference or communicate if telephone reach is unavailable.</li>
            </ul>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-200">
            <h2 className="font-display font-black text-2xl text-gray-900">
              2. Purpose of Use
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              Any information submitted is used solely for the practical purpose of fulfilling your food inquiry, scheduling pickup times, and answering inquiries. We do not sell, rent, or distribute personal information to external marketing agencies or third parties.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-200">
            <h2 className="font-display font-black text-2xl text-gray-900">
              3. Data Security & Storage
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              Your contact and order inquiry details are securely transmitted to our verified shop backend and order processing channels to ensure timely fulfillment. We do not maintain advertising trackers or share customer information with any marketing networks.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-200">
            <h2 className="font-display font-black text-2xl text-gray-900">
              4. Contact Us Concerning Privacy
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              If you have any questions or wish to request the removal of any contact details shared with us, please reach out directly:
            </p>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 text-xs space-y-1.5 mt-2">
              <p><strong>Business:</strong> {STORE_INFO.name}</p>
              <p><strong>Address:</strong> {STORE_INFO.address}</p>
              <p><strong>Phone:</strong> {STORE_INFO.phone}</p>
              <p><strong>Email:</strong> {STORE_INFO.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
