import React, { useState } from 'react';
import { Plus, Check, Sparkles, Star, Flame } from 'lucide-react';
import type { MenuItem } from '../types';
import { useOrder } from '../context/OrderContext';
import { STORE_INFO } from '../data/menuData';

interface FoodCardProps {
  item: MenuItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addItem } = useOrder();
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    item.variants && item.variants.length > 0 ? item.variants[0].name : undefined
  );
  const [extraCheese, setExtraCheese] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Compute current display price
  let currentPrice = item.price;
  if (selectedVariant && item.variants) {
    const v = item.variants.find((v) => v.name === selectedVariant);
    if (v) currentPrice = v.price;
  }
  if (extraCheese && item.allowExtraCheese) {
    currentPrice += STORE_INFO.extraCheesePrice;
  }

  const handleAdd = () => {
    addItem(item, selectedVariant, extraCheese);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-red-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-4">
      {/* Top Image Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl bg-gray-50 mb-4">
        <img
          src={item.image}
          alt={`${item.name} - Fresh Vegetarian food at Vrindavan Treats Deolali`}
          loading="lazy"
          decoding="async"
          width="320"
          height="208"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 items-center">
          {/* 100% Veg mark */}
          <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-md shadow-xs border border-emerald-500">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="text-[10px] font-bold text-emerald-800 tracking-wider">VEG</span>
          </span>

          {item.isChefsSpecial && (
            <span className="inline-flex items-center gap-1 bg-[#E52E2D] text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-md shadow-xs">
              <Sparkles className="w-3 h-3 fill-current" />
              Special
            </span>
          )}

          {item.isBestSeller && !item.isChefsSpecial && (
            <span className="inline-flex items-center gap-1 bg-amber-500 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-md shadow-xs">
              <Flame className="w-3 h-3 fill-current" />
              Popular
            </span>
          )}
        </div>

        {/* Category Pill */}
        <div className="absolute bottom-2.5 right-2.5">
          <span className="bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {item.categoryLabel}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col justify-between space-y-3 px-1">
        <div>
          <div className="flex items-center gap-1 text-amber-500 text-xs mb-1">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-bold text-gray-700">4.9</span>
            <span className="text-gray-400 text-[11px]">(Amul Fresh)</span>
          </div>
          
          <h3 className="font-display font-bold text-lg text-gray-900 group-hover:text-[#E52E2D] transition-colors leading-snug">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Variants / Size options if applicable */}
        {item.variants && item.variants.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Size / Style:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {item.variants.map((v) => (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => setSelectedVariant(v.name)}
                  className={`text-xs py-1.5 px-2 rounded-xl font-bold border transition-all text-center ${
                    selectedVariant === v.name
                      ? 'bg-[#E52E2D] text-white border-[#E52E2D] shadow-xs'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span>{v.name}</span>
                  <span className="ml-1 opacity-90 text-[10px]">₹{v.price}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Extra Cheese add-on option if allowed */}
        {item.allowExtraCheese && (
          <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer bg-red-50/50 hover:bg-red-50 p-2 rounded-xl border border-red-100 select-none transition-colors">
            <input
              type="checkbox"
              checked={extraCheese}
              onChange={(e) => setExtraCheese(e.target.checked)}
              className="rounded text-[#E52E2D] focus:ring-[#E52E2D] w-3.5 h-3.5"
            />
            <span className="font-medium text-[11px]">Add Extra Amul Cheese</span>
            <span className="text-[11px] font-bold text-[#E52E2D] ml-auto">+₹20</span>
          </label>
        )}

        {/* Card Footer: Price & Add Button */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Price</span>
            <span className="font-extrabold text-xl text-gray-900">₹{currentPrice}</span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`px-4 py-2.5 rounded-full font-bold text-xs tracking-wide flex items-center gap-1.5 transition-all shadow-sm active:scale-95 ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#E52E2D] hover:bg-[#D0201F] text-white hover:shadow-md hover:shadow-red-500/20'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add To Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
