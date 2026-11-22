import React from 'react';
import { Phone, Clock, Sparkles, MapPin } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export default function AnnouncementBar() {
  const { currency, toggleCurrency } = useRestaurant();

  return (
    <div className="bg-[#1C1B1B] border-b border-[#F5B900]/20 text-white text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Locations & Fast Food Badge */}
        <div className="flex items-center gap-4 text-gray-300 text-[11px] md:text-xs">
          <div className="flex items-center gap-1.5 text-[#F5B900]">
            <MapPin className="w-3.5 h-3.5" />
            <span className="font-semibold tracking-wide text-white">Lagos (VI &amp; Lekki) • Abuja (Maitama)</span>
          </div>
          <span className="hidden sm:inline text-gray-600">|</span>
          <div className="hidden sm:flex items-center gap-1.5 text-[#43852C]">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-semibold">Fast Food 24/7 Delivery Hub</span>
          </div>
        </div>

        {/* Center: Promo / Delivery Highlight */}
        <div className="flex items-center gap-2 text-center text-[11px] md:text-xs text-gray-200">
          <Sparkles className="w-3.5 h-3.5 text-[#F5B900] animate-pulse" />
          <span>
            Complimentary VIP Delivery on orders above{' '}
            <strong className="text-[#F5B900] font-bold">₦30,000 / $40</strong>
          </span>
        </div>

        {/* Right: Direct Hotline & Currency Selector */}
        <div className="flex items-center gap-4 text-[11px] md:text-xs">
          <a
            href="tel:+23480077324687"
            className="flex items-center gap-1.5 text-gray-300 hover:text-[#F5B900] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#F5B900]" />
            <span className="font-medium">Hotline: +234 800 PRECIOUS</span>
          </a>

          <div className="flex items-center gap-1 bg-[#282727] px-2 py-0.5 rounded border border-[#F5B900]/20">
            <span className="text-[10px] text-gray-400">Currency:</span>
            <button
              onClick={toggleCurrency}
              className="text-[#F5B900] font-bold hover:underline focus:outline-none flex items-center gap-0.5"
              title="Click to toggle between NGN and USD"
            >
              <span>{currency === 'NGN' ? '🇳🇬 NGN (₦)' : '🇺🇸 USD ($)'}</span>
              <span className="text-[9px] text-gray-400">⇄</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
