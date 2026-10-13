import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { STORE_INFO } from '../data/menuData';
import { getStoreStatusIST } from '../utils/storeStatus';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount, setIsDrawerOpen } = useOrder();
  const location = useLocation();
  const status = getStoreStatusIST();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'About Us', path: '/about' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-xs">
      {/* Top Announcement Strip */}
      <div className="bg-[#111827] text-gray-200 text-xs py-1.5 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center justify-center w-3.5 h-3.5 border border-emerald-500 rounded-xs p-0.5 bg-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            </span>
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">100% Pure Veg</span>
            <span className="text-gray-600 hidden md:inline">•</span>
            <span className="text-amber-400 font-medium hidden md:inline">Official Amul Franchise Parlour</span>
            <span className="text-gray-600 hidden lg:inline">•</span>
            <span className="text-gray-300 hidden lg:inline">Deolali, Nashik</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-gray-300">
            <div className="flex items-center gap-1.5">
              <span className={`inline-block w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span className="font-semibold text-white">{status.statusText}</span>
            </div>
            <span className="hidden sm:inline text-gray-600">|</span>
            <a
              href={`tel:${STORE_INFO.phoneRaw}`}
              className="hover:text-[#E52E2D] transition-colors font-bold text-white hidden sm:inline"
            >
              📞 {STORE_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar - Clean White Swigo Style */}
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Styled like SWIGO brand mark */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-[#E52E2D] flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
                <span>VT</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl text-gray-900 tracking-tight flex items-center">
                  VRINDAVAN <span className="text-[#E52E2D] ml-1">TREATS</span>
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest -mt-1">
                  Amul Franchise · Pure Veg
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-6">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-bold tracking-wide transition-all relative py-2 ${
                      active
                        ? 'text-[#E52E2D]'
                        : 'text-gray-700 hover:text-[#E52E2D]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E52E2D] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Action Icons (User, Cart, CTA Button) */}
            <div className="flex items-center gap-3">
              {/* Order Cart Drawer Button */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="relative p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors focus:outline-none"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-5 h-5 text-gray-800" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#E52E2D] text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale-in">
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Red Rounded CTA Button (Reference Style "Book a Table" / "Place Your Order") */}
              <Link
                to="/order"
                className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#E52E2D] hover:bg-[#D0201F] text-white text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg hover:shadow-red-500/20 active:scale-95"
              >
                Place Your Order
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                    active
                      ? 'bg-red-50 text-[#E52E2D]'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-[#E52E2D]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                to="/order"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-3 rounded-xl bg-[#E52E2D] hover:bg-[#D0201F] text-white font-bold text-base shadow-md"
              >
                Place Your Order
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
