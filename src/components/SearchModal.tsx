import React, { useState, useMemo } from 'react';
import { Search, X, Flame, ArrowRight, Sparkles } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { MENU_ITEMS } from '../data/menuData';
import { CuisineCategory } from '../types';

export default function SearchModal() {
  const { isSearchOpen, closeSearch, openQuickView, addToCart, formatPrice } =
    useRestaurant();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CuisineCategory>('all');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={closeSearch}
      />

      <div className="relative w-full max-w-2xl bg-[#242323] text-white rounded-2xl shadow-2xl border border-[#F5B900]/30 overflow-hidden z-10 animate-slide-up">
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#1C1B1B] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#F5B900]" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search delicacies, ingredients (e.g. Jollof, Salmon, Suya, Shawarma)..."
            className="w-full bg-transparent text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="p-3 bg-[#1C1B1B]/60 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          {[
            { id: 'all', label: 'All Delicacies' },
            { id: 'african', label: 'African' },
            { id: 'fast-food', label: 'Fast Food' },
            { id: 'continental', label: 'Continental' },
            { id: 'chinese', label: 'Chinese Wok' },
            { id: 'main-course', label: 'Main Course' },
            { id: 'appetizers', label: 'Appetizers' },
            { id: 'drinks', label: 'Drinks' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as CuisineCategory)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-all text-[11px] ${
                selectedCategory === cat.id
                  ? 'bg-[#F5B900] text-[#242323] font-bold shadow-gold-glow'
                  : 'bg-[#2A2828] text-gray-300 hover:text-white hover:bg-[#343232]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2.5">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-gray-400 space-y-2">
              <Flame className="w-8 h-8 text-[#F5B900]/40 mx-auto" />
              <p className="text-sm">No culinary creations found matching "{searchTerm}"</p>
              <p className="text-xs text-gray-500">
                Try searching for "Jollof", "Steak", "Suya", "Fried Rice", or "Chicken"
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#2B2A2A] hover:bg-[#323030] p-3 rounded-xl border border-white/5 hover:border-[#F5B900]/30 transition-all flex items-center gap-3.5 group cursor-pointer"
                onClick={() => {
                  closeSearch();
                  openQuickView(item);
                }}
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-black/40 border border-[#F5B900]/20">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D99A25]">
                      {item.categoryLabel}
                    </span>
                    {item.isChefSpecial && (
                      <span className="text-[9px] bg-[#F5B900]/20 text-[#F5B900] px-1.5 py-0.2 rounded border border-[#F5B900]/40 font-bold">
                        Special
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif text-sm font-bold text-white truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 truncate">
                    {item.description}
                  </p>
                </div>

                <div className="text-right flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className="text-xs font-bold text-[#F5B900]">
                    {formatPrice(item.priceUSD, item.priceNGN)}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#F5B900] text-[#242323] text-[10px] font-bold uppercase tracking-wider hover:brightness-110 shadow-gold-glow flex items-center gap-1"
                  >
                    <span>+ Add</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
