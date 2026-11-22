import React from 'react';
import {
  Sparkles,
  Flame,
  Clock,
  ShieldCheck,
  ShoppingBag,
  Calendar,
  Check,
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { MENU_ITEMS } from '../data/menuData';

export default function HomeSpotlight() {
  const { openReservation, addToCart, formatPrice } = useRestaurant();

  // Find the Royal Jollof item
  const signatureItem =
    MENU_ITEMS.find((i) => i.id === 'royal-jollof-platter') || MENU_ITEMS[0];

  return (
    <section className="py-20 md:py-28 bg-[#242323] relative overflow-hidden border-y border-[#F5B900]/20">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#F5B900]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Dish Imagery with Royal Accents */}
          <div className="relative">
            {/* Golden decorative frame */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#F5B900]/40 shadow-2xl bg-black/50">
              <img
                src={signatureItem.image}
                alt={signatureItem.name}
                className="w-full h-[420px] md:h-[480px] object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-[#242323]/90 backdrop-blur-md border border-[#F5B900]/50 text-[#F5B900] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Chef’s Masterpiece of the Month</span>
              </div>

              {/* Bottom Details Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#1C1B1B]/90 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px]">Price</span>
                  <span className="text-base font-bold text-[#F5B900]">
                    {formatPrice(signatureItem.priceUSD, signatureItem.priceNGN)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 block text-[10px]">Prep Window</span>
                  <span className="text-white font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#F5B900]" />
                    {signatureItem.preparationTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Circular Stamp / Seal */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-gradient-to-br from-[#F5B900] to-[#D99A25] p-1 shadow-gold-glow items-center justify-center text-center text-[#242323] rotate-12">
              <div className="w-full h-full rounded-full border-2 border-dashed border-[#242323] flex flex-col items-center justify-center p-2">
                <Flame className="w-5 h-5 fill-[#242323]" />
                <span className="text-[10px] font-extrabold uppercase tracking-tight leading-tight">
                  Smoky Firewood Recipe
                </span>
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative & Order CTA */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A25]">
                Culinary Director’s Signature
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                {signatureItem.name}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              There is party jollof, and then there is PRECIOUS Royal Jollof. Crafted using ancestral open-flame technique with charred sweet bell peppers, pure groundnut oil, scented uziza, and 24-hour slow-marinated goat meat reduction that coats every individual grain of premium basmati.
            </p>

            {/* Key Notes Checklist */}
            <div className="space-y-2.5 text-xs text-gray-200">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#43852C]/20 text-[#43852C] flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span>Authentic wood-smoked flavor without artificial liquid seasonings</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#43852C]/20 text-[#43852C] flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span>Includes ripe caramelized dodo (plantain) &amp; tender peppered goat meat</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#43852C]/20 text-[#43852C] flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span>Pairs exquisitely with our house-crafted Chapman Royale</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => addToCart(signatureItem)}
                className="px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-[#242323] bg-gradient-to-r from-[#F5B900] via-[#FFCE3B] to-[#D99A25] hover:brightness-110 shadow-gold-glow flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Signature Dish</span>
              </button>

              <button
                type="button"
                onClick={() => openReservation('Chef’s Special Table')}
                className="px-7 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-[#1C1B1B] hover:bg-[#2A2828] border border-[#F5B900]/40 flex items-center justify-center gap-2 transition-all hover:text-[#F5B900]"
              >
                <Calendar className="w-4 h-4 text-[#F5B900]" />
                <span>Reserve Tasting Table</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
