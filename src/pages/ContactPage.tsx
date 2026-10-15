import React from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Navigation,
} from 'lucide-react';
import { STORE_INFO } from '../data/menuData';
import { getStoreStatusIST } from '../utils/storeStatus';
import { usePageMeta } from '../hooks/usePageMeta';

export const ContactPage: React.FC = () => {
  usePageMeta({
    title: 'Contact Us & Store Location | Vrindavan Treats — Deolali, Nashik',
    description:
      'Contact Vrindavan Treats in Deolali, Nashik. Phone & WhatsApp: +91 77969 02555, Email: swapnilharak@gmail.com. Address: Shop No. E6, Town Square Building, Vijay Nagar.',
    canonicalPath: '/contact',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
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
              name: 'Contact Us',
              item: 'https://vrindavantreats.in/contact',
            },
          ],
        },
        {
          '@type': 'LocalBusiness',
          name: STORE_INFO.name,
          telephone: STORE_INFO.phone,
          email: STORE_INFO.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Shop No. E6, Town Square Building, Vijay Nagar',
            addressLocality: 'Deolali',
            addressRegion: 'Maharashtra',
            postalCode: '422502',
            addressCountry: 'IN',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 19.9475,
            longitude: 73.8577,
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '09:00',
              closes: '23:00',
            },
          ],
        },
      ],
    },
  });
  const status = getStoreStatusIST();

  const daysOfWeek = [
    { day: 'Monday', hours: '9:00 AM – 11:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM – 11:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM – 11:00 PM' },
    { day: 'Thursday', hours: '9:00 AM – 11:00 PM' },
    { day: 'Friday', hours: '9:00 AM – 11:00 PM' },
    { day: 'Saturday', hours: '9:00 AM – 11:00 PM' },
    { day: 'Sunday', hours: '9:00 AM – 11:00 PM' },
  ];

  return (
    <div className="bg-white pb-24">
      {/* Clean Light Hero Section */}
      <section className="bg-gradient-to-b from-red-50/70 to-white text-gray-900 py-14 sm:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="font-serif italic text-[#E52E2D] text-base sm:text-lg font-bold tracking-wide">
            We Would Love to Hear From You
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Reach out by phone, WhatsApp, or email, or drop by our parlour in Vijay Nagar, Deolali.
          </p>
        </div>
      </section>

      {/* Responsive Grid of Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 1. Phone Contact Card */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#E52E2D] flex items-center justify-center shadow-xs">
                <Phone className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-[#E52E2D] uppercase tracking-wider block">
                Call Us Directly
              </span>
              <h3 className="font-display font-black text-2xl text-gray-900">
                Phone Support
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Call us for immediate questions regarding menu items, today’s special preparations, or bulk food inquiries.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <a
                href={`tel:${STORE_INFO.phoneRaw}`}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#E52E2D] hover:bg-[#D0201F] text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Call {STORE_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* 2. WhatsApp Contact Card */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
                <MessageCircle className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                Instant Chat
              </span>
              <h3 className="font-display font-black text-2xl text-gray-900">
                WhatsApp Chat
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Connect with our team directly on WhatsApp for quick inquiries, bulk orders, or food inquiries.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <a
                href={`https://wa.me/${STORE_INFO.whatsappRaw}?text=${encodeURIComponent(
                  'Hello Vrindavan Treats! I would like to get in touch regarding your menu.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* 3. Email Contact Card */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                <Mail className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                Official Email
              </span>
              <h3 className="font-display font-black text-2xl text-gray-900">
                Email Us
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Send formal questions, partnership queries, or detailed feedback directly to our email inbox.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <a
                href={`mailto:${STORE_INFO.email}`}
                className="w-full py-3.5 px-4 rounded-2xl bg-gray-900 hover:bg-black text-white font-bold text-xs tracking-wide flex items-center justify-center gap-2 transition-all shadow-md truncate"
              >
                <Mail className="w-4 h-4 text-white shrink-0" />
                <span className="truncate">{STORE_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* 4. Location & Directions Card */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 lg:col-span-2">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#E52E2D] flex items-center justify-center shadow-xs">
                <MapPin className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-[#E52E2D] uppercase tracking-wider block">
                Shop Location
              </span>
              <h3 className="font-display font-black text-2xl text-gray-900">
                Our Store Address
              </h3>
              <p className="text-sm text-gray-800 leading-relaxed font-semibold bg-gray-50 p-4 rounded-2xl border border-gray-100">
                {STORE_INFO.address}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Conveniently located at Town Square Building in Vijay Nagar, Devlali. Ample parking, welcoming seating, and hygienic parlours.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4 items-center">
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-[#E52E2D] hover:bg-[#D0201F] text-white font-bold text-xs tracking-wide flex items-center gap-2 transition-all shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>Open Google Maps Directions</span>
              </a>
              <span className="text-xs text-gray-400 font-medium">
                Pincode: 422502 · Deolali, Nashik
              </span>
            </div>
          </div>

          {/* 5. Opening Hours Card (7 Days with Live IST Status) */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-xs">
                  <Clock className="w-7 h-7" />
                </div>
                {/* Live IST Status indicator */}
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    status.isOpen
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                    }`}
                  ></span>
                  <span>{status.isOpen ? 'Open Now' : 'Closed'}</span>
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Store Timings
                </span>
                <h3 className="font-display font-black text-2xl text-gray-900">
                  Opening Hours
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Current Time: <strong>{status.timeStringIST}</strong>
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs divide-y divide-gray-100">
                {daysOfWeek.map((item) => (
                  <div key={item.day} className="flex justify-between py-1.5 text-gray-700">
                    <span className="font-medium">{item.day}</span>
                    <span className="font-bold text-gray-900">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-400 italic text-center">
              We operate every single day including weekends and holidays.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
