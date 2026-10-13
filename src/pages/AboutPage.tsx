import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';
import { usePageMeta } from '../hooks/usePageMeta';

export const AboutPage: React.FC = () => {
  usePageMeta({
    title: 'About Us | Vrindavan Treats — Amul Franchise Parlour, Deolali Nashik',
    description:
      'Learn about Vrindavan Treats — the official Amul franchise ice cream parlour and 100% pure vegetarian food shop at Vijay Nagar, Deolali, Nashik. Open every day 9 AM–11 PM.',
    canonicalPath: '/about',
  });
  return (
    <div className="bg-white pb-24">
      {/* Clean Light Hero Section */}
      <section className="bg-gradient-to-b from-red-50/70 to-white text-gray-900 py-14 sm:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="font-serif italic text-[#E52E2D] text-base sm:text-lg font-bold tracking-wide">
            Our Story & Values
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight">
            About Vrindavan Treats
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            An official Amul franchise ice cream parlour and pure vegetarian quick-service food shop nestled in Town Square Building, Vijay Nagar, Deolali.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-gray-50 rounded-3xl p-8 sm:p-14 lg:p-16 border border-gray-100 shadow-xs space-y-16">
          {/* Grid with Text and Real Interior Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="font-serif italic text-[#E52E2D] text-lg font-bold">
                The Dual Food Experience
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-gray-900 leading-tight">
                Bringing Real Amul Ice Creams and Pure Veg Quick Bites Together
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                <p>
                  <strong>Vrindavan Treats</strong> was established with a clear and honest focus: to provide food lovers in Deolali and Nashik with a reliable destination where pure vegetarian quick-service food meets the beloved goodness of genuine Amul ice creams.
                </p>
                <p>
                  Operating as an authorized Amul franchise parlour, we house official Amul display freezers showcasing classic Amul scoops, tubs, cones, and sundaes alongside real milk shakes. Right beside it, our kitchen prepares fresh vegetarian quick bites on order—from crispy fries and toasted sandwiches to grilled burgers, loaded pizzas, and steamed or fried momos.
                </p>
                <p>
                  We believe in transparency, pure vegetarian hygiene, and consistent quality every day of the week.
                </p>
              </div>

              {/* Core Commitments */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>100% Pure Vegetarian</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Strictly pure vegetarian kitchen using fresh vegetables and authentic Amul dairy.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Official Amul Franchise</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Authentic Amul supply, proper temperature storage, and trusted dairy quality.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    <span>Fresh to Order</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Hot items are prepared upon ordering to preserve crispness and rich flavours.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#E52E2D]" />
                    <span>Open 7 Days a Week</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Serving daily from 9:00 AM to 11:00 PM IST at Vijay Nagar, Deolali.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: The Real Shop Photograph */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="/images/shop-interior.webp"
                  alt="Real Shop Interior of Vrindavan Treats Amul Franchise Parlour in Deolali"
                  className="w-full h-full object-cover"
                />
                <div className="p-5 bg-white space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-900">
                      Vrindavan Treats Parlour Interior
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Actual Shop Photo
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Featuring the authentic Amul glass-top freezers, parlor branding, and hygiene counter in Deolali.
                  </p>
                </div>
              </div>

              {/* Address Snippet Card */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start gap-3 shadow-2xs">
                <MapPin className="w-5 h-5 text-[#E52E2D] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-gray-900 block font-semibold">Store Address:</strong>
                  <p className="text-gray-600 leading-relaxed">
                    {STORE_INFO.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div className="mt-12 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#E52E2D] hover:bg-[#D0201F] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg hover:shadow-red-500/25"
          >
            <span>Explore Our Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
