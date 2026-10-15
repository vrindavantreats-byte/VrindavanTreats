import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { FoodCard } from '../components/FoodCard';
import { MENU_ITEMS, STORE_INFO } from '../data/menuData';
import { getStoreStatusIST } from '../utils/storeStatus';
import { usePageMeta } from '../hooks/usePageMeta';

export const HomePage: React.FC = () => {
  const status = getStoreStatusIST();
  usePageMeta({
    title: 'Vrindavan Treats | Amul Franchise & Pure Veg Quick Bites | Deolali, Nashik',
    description:
      'Vrindavan Treats — Official Amul Franchise ice cream parlour & 100% vegetarian quick-service food shop in Deolali, Nashik. Burgers, Pizzas, Sandwiches, Momos, Shakes & Amul Ice Creams. Open daily 9 AM–11 PM.',
    canonicalPath: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://vrindavantreats.in/#website',
          url: 'https://vrindavantreats.in/',
          name: 'Vrindavan Treats',
          description: 'Official Amul Franchise & Pure Veg Quick Service Food Shop in Deolali, Nashik',
          publisher: {
            '@id': 'https://vrindavantreats.in/#business',
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Where is Vrindavan Treats located in Nashik?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Vrindavan Treats is located at Shop No. E6, Town Square Building, Vijay Nagar, Deolali, Nashik, Maharashtra 422502.',
              },
            },
            {
              '@type': 'Question',
              name: 'What are the opening hours of Vrindavan Treats?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Vrindavan Treats is open every day from Monday to Sunday, 9:00 AM to 11:00 PM IST.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is Vrindavan Treats an official Amul franchise?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, Vrindavan Treats is an authorized Amul franchise ice cream parlour serving genuine Amul ice creams, shakes, and pure vegetarian quick bites made with authentic Amul dairy.',
              },
            },
            {
              '@type': 'Question',
              name: 'Does Vrindavan Treats serve 100% pure vegetarian food?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, our entire kitchen and parlour are 100% pure vegetarian, serving burgers, pizzas, sandwiches, momos, fries, thick shakes, and Amul ice creams.',
              },
            },
          ],
        },
      ],
    },
  });

  // Featured selection: 8 top items from distinct categories
  const featuredItems = MENU_ITEMS.filter((item) => item.isBestSeller || item.isChefsSpecial).slice(0, 8);

  const categoriesQuickList = [
    { name: 'Drinks', path: '/menu?cat=shakes-drinks', icon: '🥤' },
    { name: 'Burgers', path: '/menu?cat=burger', icon: '🍔' },
    { name: 'Pizzas', path: '/menu?cat=pizza', icon: '🍕' },
    { name: 'Sandwiches', path: '/menu?cat=sandwich', icon: '🥪' },
    { name: 'Momos', path: '/menu?cat=momos', icon: '🥟' },
    { name: 'Quick Bites', path: '/menu?cat=quick-bites', icon: '🍟' },
  ];

  return (
    <div className="bg-white text-gray-900 space-y-12 sm:space-y-20 pb-20 overflow-x-hidden w-full">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-4 sm:pt-10 pb-12 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative curved red accents */}
        <div className="absolute top-10 -left-6 w-12 h-20 bg-[#E52E2D] rounded-r-full opacity-80 pointer-events-none hidden md:block" />
        <div className="absolute top-72 -left-6 w-10 h-16 bg-[#E52E2D] rounded-r-full opacity-80 pointer-events-none hidden md:block" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left">
            {/* SEO Subtitle Tag */}
            <span className="inline-block px-3.5 py-1 rounded-full bg-red-50 text-[#E52E2D] text-xs font-extrabold tracking-wide uppercase border border-red-100">
              Amul Franchise &amp; Pure Veg Quick Bites • Deolali, Nashik
            </span>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight leading-[1.12]">
                The Number <span className="text-[#E52E2D]">#1</span>
                <br />
                Choice Your Hunger
                <br />
                Solution
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-gray-500 max-w-lg leading-relaxed">
              Vrindavan Treats brings you the finest 100% pure vegetarian quick bites—crispy burgers, loaded pizzas, grilled sandwiches, and steamed momos paired with thick creamy shakes in Deolali, Nashik.
            </p>

            {/* Dual Hero Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
              <Link
                to="/order"
                className="w-full sm:w-auto text-center px-7 py-3.5 rounded-full bg-[#E52E2D] hover:bg-[#D0201F] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg hover:shadow-red-500/25 active:scale-95"
              >
                Place Your Order
              </Link>
              <Link
                to="/menu"
                className="w-full sm:w-auto text-center px-7 py-3.5 rounded-full bg-white hover:bg-red-50 text-[#E52E2D] border-2 border-[#E52E2D] font-bold text-sm tracking-wide transition-all"
              >
                View Full Menu
              </Link>
            </div>

            {/* Category Quick Icon Boxes Strip */}
            <div className="pt-2 sm:pt-4">
              <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar py-1">
                {categoriesQuickList.map((cat) => (
                  <Link
                    key={cat.name}
                    to={cat.path}
                    className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-2xl bg-red-50 hover:bg-red-100 text-[#E52E2D] border border-red-100 flex items-center justify-center text-lg sm:text-xl transition-all hover:scale-105 shadow-2xs"
                    title={cat.name}
                  >
                    <span>{cat.icon}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Hero Visual Composition */}
          <div className="lg:col-span-6 relative flex justify-center items-center pt-4 sm:pt-0">
            {/* Red Angular Backdrop Graphic */}
            <div className="relative w-full max-w-[280px] xs:max-w-xs sm:max-w-sm md:max-w-md aspect-square">
              {/* Slanted red background shape */}
              <div className="absolute inset-0 bg-[#E52E2D] rounded-[36px] sm:rounded-[48px] transform rotate-3 shadow-2xl" />

              {/* Burger Container */}
              <div className="absolute inset-2 rounded-[30px] sm:rounded-[42px] overflow-hidden bg-white shadow-inner flex items-center justify-center">
                <img
                  src="/images/generated/hero-burger.jpg"
                  alt="Vrindavan Treats Gourmet Double Decker Burger"
                  width="448"
                  height="448"
                  fetchPriority="high"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* 25% OFF Bubble Sticker on top right */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-white text-[#E52E2D] w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-xl border-2 border-[#E52E2D] flex flex-col items-center justify-center font-black leading-none transform rotate-12">
                <span className="text-xs sm:text-sm">25%</span>
                <span className="text-[8px] sm:text-[9px] font-bold tracking-wider">OFF</span>
              </div>

              {/* Floating Overlapping Card Bottom-Right: responsive to avoid mobile overflow */}
              <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-6 w-52 sm:w-64 bg-[#0C362B] text-white p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl border border-emerald-800 transform hover:-translate-y-1 transition-transform">
                <span className="text-[9px] sm:text-[10px] font-extrabold text-[#F59E0B] uppercase tracking-wider block">
                  TODAY'S SPECIAL
                </span>
                <h3 className="font-display font-black text-base sm:text-xl text-[#F59E0B] tracking-tight">
                  TASTY BURGER
                </h3>
                
                <div className="relative mt-2 rounded-xl sm:rounded-2xl overflow-hidden h-20 sm:h-24 bg-black/20">
                  <img
                    src="/images/generated/vt-special-burger.jpg"
                    alt="Today's Special Gourmet Burger at Vrindavan Treats"
                    width="256"
                    height="96"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  {/* Starburst 50% OFF sticker badge */}
                  <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-[#F59E0B] text-gray-900 w-10 h-10 sm:w-11 sm:h-11 rounded-full font-black text-center flex flex-col items-center justify-center leading-none shadow-md transform rotate-6 border border-white">
                    <span className="text-[10px] sm:text-[11px]">50%</span>
                    <span className="text-[7px] sm:text-[8px] font-bold">OFF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PROMO BANNERS SECTION ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Featured Offers &amp; Chef's Specials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Card 1: Dark Teal "FRIDAY SPECIAL TASTY BURGER" */}
          <div className="md:col-span-1 lg:col-span-4 bg-[#0C362B] text-white rounded-3xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-1 relative z-10">
              <span className="text-[11px] font-extrabold text-[#F59E0B] uppercase tracking-wider block">
                FRIDAY SPECIAL
              </span>
              <h3 className="font-display font-black text-2xl text-[#F59E0B] leading-tight">
                TASTY BURGER
              </h3>
            </div>

            <div className="my-4 relative h-36 sm:h-40 rounded-2xl overflow-hidden bg-black/30">
              <img
                src="/images/generated/aloo-tikki-burger.jpg"
                alt="Crispy Aloo Tikki Burger Deal at Vrindavan Treats"
                width="384"
                height="160"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute bottom-2 right-2 bg-[#F59E0B] text-gray-900 w-11 h-11 sm:w-12 sm:h-12 rounded-full font-black flex flex-col items-center justify-center leading-none shadow-lg border-2 border-white">
                <span className="text-xs font-black">50%</span>
                <span className="text-[8px] font-bold">OFF</span>
              </div>
            </div>

            <div className="flex items-center justify-between relative z-10 pt-2">
              <Link
                to="/menu?cat=burger"
                className="px-4 py-2 rounded-full bg-[#E52E2D] hover:bg-[#D0201F] text-white text-xs font-bold tracking-wide transition-all shadow-sm"
              >
                Order Burger
              </Link>
              <span className="text-sm font-black text-amber-400">From ₹89</span>
            </div>
          </div>

          {/* Card 2: Center 2 stacked banners */}
          <div className="md:col-span-1 lg:col-span-4 flex flex-col gap-5 sm:gap-6">
            {/* Top Red banner: TODAY SPECIAL VEG MOMOS */}
            <div className="bg-[#E52E2D] text-white rounded-3xl p-5 shadow-md flex items-center justify-between gap-3 group">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-white/90">
                  TODAY SPECIAL
                </span>
                <h4 className="font-display font-black text-lg sm:text-xl text-white leading-tight">
                  Hot Momos
                </h4>
                <span className="text-xs font-bold text-amber-300 block">From ₹79</span>
                <Link
                  to="/menu?cat=momos"
                  className="inline-block mt-2 px-3.5 py-1.5 rounded-full bg-white text-[#E52E2D] hover:bg-gray-100 text-xs font-bold transition-all shadow-xs"
                >
                  Add To Cart
                </Link>
              </div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-white/10 shadow-md">
                <img
                  src="/images/veg-momos-user.jpg"
                  alt="Fresh Steamed Veg Momos at Vrindavan Treats"
                  width="96"
                  height="96"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
            </div>

            {/* Bottom Green banner: FOR LIMITED TIME ONLY */}
            <div className="bg-[#15803D] text-white rounded-3xl p-5 shadow-md flex items-center justify-between gap-3 group">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200">
                  FOR LIMITED TIME ONLY
                </span>
                <h4 className="font-display font-black text-lg sm:text-xl text-white leading-tight">
                  35% Offer
                </h4>
                <Link
                  to="/menu?cat=pizza"
                  className="inline-block mt-2 px-3.5 py-1.5 rounded-full bg-white text-[#15803D] hover:bg-gray-100 text-xs font-bold transition-all shadow-xs"
                >
                  Add To Cart
                </Link>
              </div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-white/10 shadow-md">
                <img
                  src="/images/generated/cheese-corn-pizza.jpg"
                  alt="Cheese and Corn Pizza at Vrindavan Treats"
                  width="96"
                  height="96"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Right dark card "VT SPECIAL BURGER" */}
          <div className="md:col-span-2 lg:col-span-4 bg-gray-900 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between group">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider block">
                CHEF'S SPECIAL
              </span>
              <h3 className="font-display font-black text-2xl text-white leading-tight">
                VT SPECIAL BURGER
              </h3>
            </div>

            <div className="my-4 relative h-36 sm:h-40 rounded-2xl overflow-hidden bg-black/40">
              <img
                src="/images/generated/veg-cheese-burger.jpg"
                alt="Chef's Special Veg Cheese Burger at Vrindavan Treats"
                width="384"
                height="160"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                to="/order"
                className="px-4 py-2 rounded-full bg-white text-gray-900 hover:bg-gray-100 text-xs font-bold tracking-wide transition-all shadow-sm"
              >
                Add To Cart
              </Link>
              <span className="text-sm font-black text-amber-400">₹139 Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== "Our Featured Food" SECTION ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif italic font-bold text-3xl sm:text-4xl text-gray-900">
            Our Featured Food
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Prepared fresh to order with genuine Amul dairy butter, cheese, and milk.
          </p>
        </div>

        {/* Products Grid - Fully Responsive */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {featuredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>

        {/* View All Menu CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 rounded-full bg-[#E52E2D] hover:bg-[#D0201F] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg hover:shadow-red-500/25 group"
          >
            <span>Explore Complete Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ===================== ABOUT VRINDAVAN TREATS & SHOP PHOTO ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-3xl p-6 sm:p-10 lg:p-14 border border-gray-100 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <span className="font-serif italic text-[#E52E2D] text-base sm:text-lg font-bold">
                About Vrindavan Treats
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-gray-900 leading-tight">
                Amul Franchise Parlour & Pure Veg Quick Bites Counter
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Vrindavan Treats brings the best of both worlds together at Vijay Nagar, Deolali. On one side, enjoy a dedicated <strong>Amul Ice Cream Franchise Parlour</strong> with genuine dairy goodies. On the other side, savour a <strong>100% pure vegetarian quick-service food counter</strong> serving freshly grilled sandwiches, burgers, pizzas, momos and crispy bites.
              </p>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                  <span>100% Pure Vegetarian menu prepared with authentic Amul dairy</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                  <span>Hygienic parlour setup with temperature-controlled Amul freezers</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                  <span>Open all 7 days from 9:00 AM to 11:00 PM IST in Deolali, Nashik</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/about"
                  className="text-center px-6 py-3 rounded-full bg-[#E52E2D] hover:bg-[#D0201F] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md"
                >
                  Learn More About Us
                </Link>
                <a
                  href={`tel:${STORE_INFO.phoneRaw}`}
                  className="text-center px-6 py-3 rounded-full bg-white hover:bg-gray-100 text-gray-900 font-bold text-xs sm:text-sm tracking-wide border border-gray-200 transition-all shadow-2xs"
                >
                  Call: {STORE_INFO.phone}
                </a>
              </div>
            </div>

            {/* Right: Actual Shop Photograph */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-white">
                <img
                  src="/images/shop-interior.webp"
                  alt="Vrindavan Treats Shop Interior and Amul Counter in Deolali, Nashik"
                  width="600"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover object-center"
                />
                <div className="p-3.5 sm:p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-gray-600">
                  <div>
                    <span className="font-bold text-gray-900 block">
                      Inside Vrindavan Treats
                    </span>
                    <span>Town Square Building, Vijay Nagar, Deolali</span>
                  </div>
                  <span className="self-start sm:self-auto px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-bold text-[10px] sm:text-[11px] border border-emerald-200">
                    Verified Amul Parlour
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== LOCATION & HOURS SECTION ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-1">
          <span className="font-serif italic text-[#E52E2D] text-sm sm:text-base font-bold">
            Visit Our Store
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-gray-900">
            Location, Hours & Direct Contact
          </h2>
        </div>
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {/* Hours card */}
            <div className="space-y-3 p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-[#E52E2D] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900">Opening Hours</h3>
                <p className="text-xs text-gray-600">
                  Every Day (Monday – Sunday)<br />
                  <span className="text-[#E52E2D] font-bold text-sm">9:00 AM – 11:00 PM IST</span>
                </p>
              </div>
              <div className="pt-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${status.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                  <span>{status.statusText}</span>
                </span>
              </div>
            </div>

            {/* Address card */}
            <div className="space-y-3 p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-[#E52E2D] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900">Visit Our Shop</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Shop No. E6, Town Square Building, Vijay Nagar, Nashik, Devlali, Maharashtra 422502
                </p>
              </div>
              <a
                href={STORE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#E52E2D] hover:underline font-bold pt-1"
              >
                <span>Open Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Contact card */}
            <div className="sm:col-span-2 lg:col-span-1 space-y-3 p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900">Direct Inquiries</h3>
                <p className="text-xs text-gray-600">
                  Call or WhatsApp for orders & menu inquiries:
                </p>
              </div>
              <div className="pt-1">
                <a
                  href={`tel:${STORE_INFO.phoneRaw}`}
                  className="font-extrabold text-base text-gray-900 hover:text-[#E52E2D] block transition-colors"
                >
                  {STORE_INFO.phone}
                </a>
                <span className="text-[11px] text-gray-400 block mt-0.5">
                  Email: {STORE_INFO.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FINAL BOTTOM CALL TO ACTION ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E52E2D] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">
              Ready to Treat Yourself?
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              Which Food Do You Want to Order Today?
            </h2>
            <p className="text-xs sm:text-sm text-white/90 max-w-xl">
              Select your favourites from our menu, configure quantities, and submit your inquiry with zero hassle.
            </p>
          </div>
          <div className="shrink-0 w-full sm:w-auto">
            <Link
              to="/order"
              className="block sm:inline-block w-full text-center px-8 py-3.5 sm:py-4 rounded-full bg-white hover:bg-gray-100 text-[#E52E2D] font-extrabold text-sm tracking-wide transition-all shadow-lg active:scale-95"
            >
              Start Order Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
