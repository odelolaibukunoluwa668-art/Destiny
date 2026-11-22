import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Plus,
  Clock,
  Sparkles,
  ShieldCheck,
  Eye,
  ArrowRight,
  Star,
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { MENU_ITEMS } from '../data/menuData';
import { CuisineCategory, MenuItem } from '../types';

export default function HomeMenuSection() {
  const { openQuickView, addToCart, formatPrice } = useRestaurant();
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Curations' },
    { id: 'main-course', label: 'Main Courses (Flyer)' },
    { id: 'appetizers', label: 'Appetizers (Flyer)' },
    { id: 'african', label: 'African Delicacies' },
    { id: 'fast-food', label: 'Gourmet Fast Food' },
    { id: 'continental', label: 'Continental' },
    { id: 'chinese', label: 'Chinese Wok' },
    { id: 'drinks', label: 'Artisanal Drinks' },
  ];

  const filteredDishes = MENU_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'main-course') return item.category === 'main-course';
    if (activeTab === 'appetizers') return item.category === 'appetizers';
    if (activeTab === 'african') return item.category === 'african';
    if (activeTab === 'fast-food') return item.category === 'fast-food';
    if (activeTab === 'continental') return item.category === 'continental';
    if (activeTab === 'chinese') return item.category === 'chinese';
    if (activeTab === 'drinks') return item.category === 'drinks';
    return true;
  }).slice(0, 8); // show top 8 on home page

  return (
    <section id="menu-section" className="py-20 md:py-28 bg-[#1E1D1D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#282727] border border-[#F5B900]/30 text-xs font-semibold uppercase tracking-widest text-[#F5B900]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Menu Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Signature Delicacies &amp; Feasts
            </h2>
            <p className="text-sm text-gray-400 max-w-xl font-light">
              Crafted fresh upon order by our culinary masters using ancestral fire-roasting, prime dry-aging, and high-heat wok techniques.
            </p>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F5B900] hover:text-[#FFCE3B] border-b border-[#F5B900]/50 pb-1 self-start md:self-end transition-colors"
          >
            <span>Explore Full 20+ Dish Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#F5B900] to-[#D99A25] text-[#242323] font-bold shadow-gold-glow'
                  : 'bg-[#282727] text-gray-300 hover:text-white hover:bg-[#343232] border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDishes.map((dish: MenuItem) => (
            <div
              key={dish.id}
              className="bg-[#242323] rounded-2xl overflow-hidden border border-white/10 hover:border-[#F5B900]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-gold-subtle"
            >
              {/* Image & Badges */}
              <div className="relative h-52 overflow-hidden bg-black/40">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#242323] via-transparent to-transparent pointer-events-none" />

                {/* Dietary Tags */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  {dish.isChefSpecial && (
                    <span className="px-2 py-0.5 rounded bg-[#F5B900] text-[#242323] text-[9px] font-extrabold uppercase tracking-wider shadow-sm">
                      Special
                    </span>
                  )}
                  {dish.isSpicy && (
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-0.5">
                      <Flame className="w-2.5 h-2.5" /> Spicy
                    </span>
                  )}
                </div>

                {/* Quick View Button overlay */}
                <button
                  type="button"
                  onClick={() => openQuickView(dish)}
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/70 hover:bg-[#F5B900] hover:text-[#242323] text-white backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100"
                  aria-label={`Quick customize ${dish.name}`}
                  title="Quick Customize & Inspect"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Dish Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-gray-400">
                    <span className="uppercase tracking-wider font-semibold text-[#D99A25]">
                      {dish.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#F5B900]" />
                      {dish.preparationTime}
                    </span>
                  </div>

                  <h3
                    onClick={() => openQuickView(dish)}
                    className="font-serif text-base font-bold text-white group-hover:text-[#F5B900] transition-colors cursor-pointer line-clamp-1"
                  >
                    {dish.name}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                {/* Bottom Price & Add to Cart */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-[#F5B900] font-sans">
                      {formatPrice(dish.priceUSD, dish.priceNGN)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openQuickView(dish)}
                      className="p-2 rounded-lg bg-[#2D2B2B] hover:bg-[#383636] text-gray-300 hover:text-white text-xs border border-white/10"
                      title="Customize"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => addToCart(dish)}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#F5B900] to-[#D99A25] text-[#242323] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-gold-glow flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu Banner CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#242323] via-[#2E2C2C] to-[#242323] border border-[#F5B900]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Hungry for More? Explore Our Complete Banquet Menu
            </h4>
            <p className="text-xs sm:text-sm text-gray-300">
              Discover over 25+ authentic delicacies, imperial dim sum baskets, drinks, and late-night fast food.
            </p>
          </div>

          <Link
            to="/menu"
            className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-[#242323] bg-gradient-to-r from-[#F5B900] via-[#FFCE3B] to-[#D99A25] hover:brightness-110 shadow-gold-glow flex-shrink-0 flex items-center gap-2"
          >
            <span>Open Interactive Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
