import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, Sparkles, FileText, Image as ImageIcon } from 'lucide-react';
import { FoodCard } from '../components/FoodCard';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import type { FoodCategory } from '../types';
import { usePageMeta } from '../hooks/usePageMeta';

export const MenuPage: React.FC = () => {
  usePageMeta({
    title: 'Menu | Vrindavan Treats — Amul Ice Cream & Veg Food, Deolali Nashik',
    description:
      'Browse the full Vrindavan Treats menu — burgers, pizzas, sandwiches, veg momos, peri peri fries, thick shakes and Amul ice creams in Deolali, Nashik.',
    canonicalPath: '/menu',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Vrindavan Treats Pure Vegetarian Food Menu',
      description: 'Full food menu including burgers, pizzas, sandwiches, momos, quick bites and shakes in Deolali, Nashik.',
      numberOfItems: MENU_ITEMS.length,
      itemListElement: MENU_ITEMS.slice(0, 20).map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          image: item.image.startsWith('http') ? item.image : `https://vrindavantreats.in${item.image}`,
          offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
          },
          suitableForDiet: 'https://schema.org/VegetarianDiet',
        },
      })),
    },
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = (searchParams.get('cat') as FoodCategory) || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [onlyChefsSpecial, setOnlyChefsSpecial] = useState(false);
  const [isMenuBoardModalOpen, setIsMenuBoardModalOpen] = useState(false);

  const handleCategoryChange = (category: FoodCategory) => {
    if (category === 'all') {
      searchParams.delete('cat');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ cat: category });
    }
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (currentCategory !== 'all' && item.category !== currentCategory) {
        return false;
      }
      // Chef's special filter
      if (onlyChefsSpecial && !item.isChefsSpecial) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        return matchesName || matchesCategory || matchesDesc;
      }
      return true;
    });
  }, [currentCategory, onlyChefsSpecial, searchQuery]);

  return (
    <div className="bg-white pb-24 w-full overflow-x-hidden">
      {/* Clean Light Hero Header */}
      <section className="bg-gradient-to-b from-red-50/70 to-white text-gray-900 py-10 sm:py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="font-serif italic text-[#E52E2D] text-sm sm:text-base md:text-lg font-bold tracking-wide">
            100% Pure Vegetarian Quick Bites & Shakes
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-gray-900 tracking-tight">
            Our Complete Food Menu
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed px-2">
            Every price and variant transcribed accurately from our official shop menu board in Deolali. Handcrafted with genuine Amul butter and cheese.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setIsMenuBoardModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-gray-50 text-gray-700 hover:text-[#E52E2D] text-xs font-bold tracking-wide transition-colors border border-gray-200 shadow-xs"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#E52E2D]" />
              <span>View Authentic Store Menu Board Photo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Filter & Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Search Bar & Filters Controls */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-sm space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search burgers, pizzas, momos, shakes..."
                className="w-full pl-11 pr-10 py-2.5 sm:py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E52E2D] focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Chef's Special Toggle */}
            <div className="flex items-center gap-3 justify-end">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer select-none bg-gray-50 px-4 py-2.5 sm:py-3 rounded-2xl border border-gray-200 hover:bg-gray-100 transition-colors w-full sm:w-auto justify-center">
                <input
                  type="checkbox"
                  checked={onlyChefsSpecial}
                  onChange={(e) => setOnlyChefsSpecial(e.target.checked)}
                  className="rounded text-[#E52E2D] focus:ring-[#E52E2D] w-4 h-4"
                />
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-current" />
                <span>Chef's Specials Only</span>
              </label>
            </div>
          </div>

          {/* Category Tabs with Smooth Horizontal Scrolling */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-1 -mx-2 px-2 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => {
              const isActive = currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id as FoodCategory)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                    isActive
                      ? 'bg-[#E52E2D] text-white border-[#E52E2D] shadow-md shadow-red-500/20 scale-102'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count & Extra Cheese Note */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-gray-500 px-1">
          <div>
            Showing <strong className="text-gray-900">{filteredItems.length}</strong> items
            {currentCategory !== 'all' && <span> in this category</span>}
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </div>
          <div className="inline-flex items-center gap-1.5 bg-red-50 text-[#E52E2D] px-3 py-1 rounded-full border border-red-100 font-semibold text-[11px] sm:text-xs">
            <span>🧀 Extra Amul Cheese available on select items for +₹20</span>
          </div>
        </div>

        {/* Food Catalogue Grid */}
        {filteredItems.length === 0 ? (
          <div className="mt-12 sm:mt-16 bg-white rounded-3xl p-8 sm:p-12 text-center border border-gray-100 space-y-4 max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center mx-auto">
              <Search className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-gray-900">No menu items found</h3>
            <p className="text-xs text-gray-500">
              No results found for your search query. Try checking for another item or resetting the filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setOnlyChefsSpecial(false);
                handleCategoryChange('all');
              }}
              className="px-5 py-2.5 bg-[#E52E2D] text-white rounded-full text-xs font-bold shadow-md hover:bg-[#D0201F]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Menu Board Photo Modal */}
      {isMenuBoardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-2xl">
            <div className="p-4 bg-gray-900 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="font-display font-bold text-sm sm:text-base truncate">
                  Vrindavan Treats — Authentic Menu Board
                </h3>
              </div>
              <button
                onClick={() => setIsMenuBoardModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 sm:p-4 max-h-[80vh] overflow-y-auto bg-gray-50">
              <img
                src="/images/menu-board.jpg"
                alt="Official Vrindavan Treats Menu Board"
                className="w-full h-auto rounded-xl shadow-lg border border-gray-200"
              />
              <p className="text-center text-xs text-gray-500 mt-3 font-medium">
                Source of Truth: Original menu board at Vrindavan Treats, Shop No. E6, Town Square Building, Deolali, Nashik.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
