import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111827] text-gray-300 border-t border-gray-800">
      {/* Top Banner with Brand Essence */}
      <div className="border-b border-gray-800 bg-[#1F2937]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className="font-serif italic text-red-400 text-base font-bold block">
                Pure Vegetarian Treats & Official Amul Parlour
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
                Vrindavan Treats · Deolali, Nashik
              </h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/menu"
                className="px-6 py-2.5 rounded-full bg-white hover:bg-gray-100 text-gray-900 font-bold text-sm tracking-wide transition-all shadow-md"
              >
                Explore Full Menu
              </Link>
              <Link
                to="/order"
                className="px-6 py-2.5 rounded-full bg-[#E52E2D] hover:bg-[#D0201F] text-white font-bold text-sm tracking-wide transition-all shadow-md"
              >
                Place Your Order
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E52E2D] text-white flex items-center justify-center font-black text-lg">
                VT
              </div>
              <span className="font-display font-black text-xl text-white tracking-wide">
                VRINDAVAN <span className="text-[#E52E2D]">TREATS</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Official Amul franchise ice cream parlour and pure vegetarian quick-service food shop in Deolali, Nashik. Freshly prepared burgers, pizzas, sandwiches, momos, shakes, and genuine Amul dairy treats.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 border border-emerald-500 rounded-xs p-0.5 bg-white">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              </span>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                100% Pure Vegetarian Amul Dairy
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider border-l-2 border-[#E52E2D] pl-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-white transition-colors">
                  Food Catalogue & Prices
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Vrindavan Treats
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-400 hover:text-white transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact & Shop Location
                </Link>
              </li>
              <li>
                <Link to="/order" className="text-gray-400 hover:text-white transition-colors">
                  Order Inquiry Form
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider border-l-2 border-[#E52E2D] pl-2">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={`tel:${STORE_INFO.phoneRaw}`}
                  className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors group"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E52E2D] shrink-0" />
                  <span>{STORE_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappRaw}?text=${encodeURIComponent('Hello Vrindavan Treats, I would like to enquire about your menu.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors group"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>WhatsApp: {STORE_INFO.whatsapp}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${STORE_INFO.email}`}
                  className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors group"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E52E2D] shrink-0" />
                  <span className="truncate">{STORE_INFO.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-gray-300 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#E52E2D] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white">Opening Hours:</span>
                  <span className="text-xs text-gray-400">9:00 AM – 11:00 PM IST (Daily)</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Address & Directions */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider border-l-2 border-[#E52E2D] pl-2">
              Store Address
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-[#E52E2D] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {STORE_INFO.address}
              </p>
            </div>
            <a
              href={STORE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold tracking-wide transition-colors border border-gray-700"
            >
              <span>Get Google Maps Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Vrindavan Treats. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <span className="text-red-400">Official Amul Franchise · Deolali, Nashik</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
