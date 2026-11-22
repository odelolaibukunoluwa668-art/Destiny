import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Flame,
  Search,
  Plus,
  Eye,
  Clock,
  Sparkles,
  ShieldCheck,
  Star,
  SlidersHorizontal,
  Calendar,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';
import { useRestaurant } from '../context/RestaurantContext';
import { CuisineCategory, MenuItem } from '../types';

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as CuisineCategory) || 'all';

  const [activeCategory, setActiveCategory] = useState<CuisineCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating'>('recommended');

  const { openQuickView, addToCart, openReservation, formatPrice } = useRestaurant();

  const categories: { id: CuisineCategory; label: string }[] = [
    { id: 'all', label: 'All Creations' },
    { id: 'main-course', label: 'Main Courses (Flyer)' },
    { id: 'appetizers', label: 'Appetizers (Flyer)' },
    { id: 'african', label: 'African Delicacies' },
    { id: 'fast-food', label: 'Gourmet Fast Food' },
    { id: 'continental', label: 'Continental' },
    { id: 'chinese', label: 'Chinese Wok' },
    { id: 'drinks', label: 'Drinks & Mocktails' },
  ];

  const handleCategoryChange = (cat: CuisineCategory) => {
    setActiveCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filteredDishes = useMemo(() => {
    let result = MENU_ITEMS.filter((item) => {
      // Category filter
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;

      // Search filter
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(q));

      // Diet tag filter
      let matchesDiet = true;
      if (selectedDiet === 'spicy') matchesDiet = !!item.isSpicy;
      if (selectedDiet === 'special') matchesDiet = !!item.isChefSpecial;
      if (selectedDiet === 'halal') matchesDiet = !!item.isHalal;
      if (selectedDiet === 'vegetarian') matchesDiet = !!item.isVegetarian;

      return matchesCategory && matchesSearch && matchesDiet;
    });

    // Sorting
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, searchQuery, selectedDiet, sortBy]);

  return (
    <div className="bg-[#242323] text-white min-h-screen">
      {/* 1. HERO HEADER */}
      <section className="relative py-24 md:py-32 bg-[#1A1919] overflow-hidden border-b border-[#F5B900]/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F5B900]/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#242323] border border-[#F5B900]/40 text-xs font-semibold uppercase tracking-widest text-[#F5B900] mb-5 shadow-gold-subtle">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Grand Gastronomy Catalogue</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-4">
            The PRECIOUS Royal Menu
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Inspired directly by our kitchen’s master offerings: African heritage feasts, dry-aged continental cuts, authentic Chinese wok heirlooms, and 24/7 gourmet fast food.
          </p>
        </div>
      </section>

      {/* 2. FILTER & SEARCH CONTROL BAR */}
      <section className="sticky top-[69px] z-30 bg-[#1C1B1B]/95 backdrop-blur-xl border-b border-[#F5B900]/20 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {/* Top Bar: Search Input & Sort Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dish, steak, soup, rice..."
                className="w-full bg-[#282727] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#F5B900]"
              />
            </div>

            {/* Diet Filter Chips & Sorting */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar justify-between sm:justify-end">
              <div className="flex items-center gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'special', label: 'Chef’s Special' },
                  { id: 'spicy', label: 'Spicy' },
                  { id: 'halal', label: 'Halal' },
                ].map((diet) => (
                  <button
                    key={diet.id}
                    onClick={() => setSelectedDiet(diet.id)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-[11px] font-medium transition-all ${
                      selectedDiet === diet.id
                        ? 'bg-[#F5B900] text-[#242323] font-bold shadow-gold-glow'
                        : 'bg-[#282727] text-gray-300 hover:text-white border border-white/5'
                    }`}
                  >
                    {diet.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 text-xs">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#282727] text-white border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] focus:outline-none focus:border-[#F5B900]"
                >
                  <option value="recommended">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cuisine Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#F5B900] to-[#D99A25] text-[#242323] shadow-gold-glow'
                    : 'bg-[#242323] text-gray-300 hover:text-white hover:bg-[#2C2A2A] border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MENU DISHES GRID */}
      <section className="py-16 md:py-24 bg-[#242323]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-8 pb-3 border-b border-white/10">
            <span>
              Showing <strong className="text-white">{filteredDishes.length}</strong> delicacies
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#43852C]" />
              <span>Prepared Fresh Upon Order</span>
            </div>
          </div>

          {filteredDishes.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1C1B1B] border border-[#F5B900]/20 flex items-center justify-center mx-auto text-gray-500">
                <Flame className="w-8 h-8 text-[#F5B900]/50" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                No Delicacies Found
              </h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                No items match your active filters. Try clearing your search query or selecting "All Creations".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setSelectedDiet('all');
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F5B900] to-[#D99A25] text-[#242323] text-xs font-bold uppercase tracking-wider shadow-gold-glow"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDishes.map((dish: MenuItem) => (
                <div
                  key={dish.id}
                  className="bg-[#1C1B1B] rounded-2xl overflow-hidden border border-white/10 hover:border-[#F5B900]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-gold-subtle"
                >
                  {/* Image & Badges */}
                  <div className="relative h-56 overflow-hidden bg-black/40">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1B] via-transparent to-transparent pointer-events-none" />

                    {/* Dietary Tags */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                      {dish.isChefSpecial && (
                        <span className="px-2 py-0.5 rounded bg-[#F5B900] text-[#242323] text-[9px] font-extrabold uppercase tracking-wider shadow-sm">
                          Chef's Special
                        </span>
                      )}
                      {dish.isSpicy && (
                        <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-0.5">
                          <Flame className="w-2.5 h-2.5" /> Spicy
                        </span>
                      )}
                      {dish.isHalal && (
                        <span className="px-2 py-0.5 rounded bg-[#43852C] text-white text-[9px] font-bold uppercase tracking-wider">
                          Halal
                        </span>
                      )}
                    </div>

                    {/* Quick View Button */}
                    <button
                      type="button"
                      onClick={() => openQuickView(dish)}
                      className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/70 hover:bg-[#F5B900] hover:text-[#242323] text-white backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100"
                      title="Inspect & Customize"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Dish Info */}
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

                      {/* Ingredients Preview */}
                      <div className="pt-1 flex flex-wrap gap-1">
                        {dish.ingredients.slice(0, 3).map((ing, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-[#282727] text-gray-400 px-1.5 py-0.2 rounded"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
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
                          className="p-2 rounded-lg bg-[#282727] hover:bg-[#343232] text-gray-300 hover:text-white text-xs border border-white/10"
                          title="Customize"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => addToCart(dish)}
                          className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#F5B900] to-[#D99A25] text-[#242323] text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-gold-glow flex items-center gap-1"
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
          )}
        </div>
      </section>

      {/* 4. BANQUET RESERVATION PROMO */}
      <section className="py-20 bg-gradient-to-r from-[#1C1B1B] via-[#2A2828] to-[#1C1B1B] border-t border-[#F5B900]/20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A25]">
            Host Your Guests With Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Planning a Dinner Party or VIP Salon Dining?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light">
            Reserve our VIP private suites, enjoy dedicated sommelier wine service, and pre-order tasting menus for your guests.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openReservation()}
              className="px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-[#242323] bg-gradient-to-r from-[#F5B900] to-[#D99A25] hover:brightness-110 shadow-gold-glow flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table Now</span>
            </button>

            <a
              href="https://wa.me/23480077324687"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-[#242323] hover:bg-[#323030] border border-[#F5B900]/40 flex items-center gap-2"
            >
              <span>WhatsApp Concierge</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
