import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Minus,
  Clock,
  Flame,
  ShieldCheck,
  Award,
  Sparkles,
  ShoppingBag,
  Check,
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { ExtraProtein } from '../types';

export default function QuickViewModal() {
  const {
    quickViewItem,
    closeQuickView,
    addToCart,
    formatPrice,
  } = useRestaurant();

  const [quantity, setQuantity] = useState(1);
  const [selectedSpice, setSelectedSpice] = useState<string>('Medium');
  const [selectedSide, setSelectedSide] = useState<string>('Standard');
  const [selectedProtein, setSelectedProtein] = useState<ExtraProtein | undefined>(undefined);
  const [instructions, setInstructions] = useState('');

  // Reset states when item changes
  useEffect(() => {
    if (quickViewItem) {
      setQuantity(1);
      setSelectedSpice(
        quickViewItem.spiceLevelOptions ? quickViewItem.spiceLevelOptions[0] : 'Standard'
      );
      setSelectedSide(
        quickViewItem.sidesOptions ? quickViewItem.sidesOptions[0] : 'Standard'
      );
      setSelectedProtein(undefined);
      setInstructions('');
    }
  }, [quickViewItem]);

  if (!quickViewItem) return null;

  const proteinExtraUSD = selectedProtein ? selectedProtein.priceUSD : 0;
  const proteinExtraNGN = selectedProtein ? selectedProtein.priceNGN : 0;

  const currentUnitUSD = quickViewItem.priceUSD + proteinExtraUSD;
  const currentUnitNGN = quickViewItem.priceNGN + proteinExtraNGN;
  const totalPriceUSD = currentUnitUSD * quantity;
  const totalPriceNGN = currentUnitNGN * quantity;

  const handleAdd = () => {
    addToCart(quickViewItem, quantity, {
      spiceLevel: selectedSpice,
      side: selectedSide,
      protein: selectedProtein,
      instructions,
    });
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={closeQuickView}
      />

      <div className="relative w-full max-w-3xl bg-[#242323] text-white rounded-2xl shadow-2xl border border-[#F5B900]/30 overflow-hidden my-8 z-10 animate-slide-up">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-gray-300 hover:text-white hover:bg-black/90 transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Food Image & Badges */}
          <div className="relative h-64 md:h-full min-h-[300px] bg-black/50 overflow-hidden">
            <img
              src={quickViewItem.image}
              alt={quickViewItem.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#242323] via-transparent to-black/30 pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {quickViewItem.isChefSpecial && (
                <span className="px-2.5 py-1 rounded-md bg-[#F5B900] text-[#242323] text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-gold-glow">
                  <Sparkles className="w-3 h-3" /> Chef’s Special
                </span>
              )}
              {quickViewItem.isBestseller && (
                <span className="px-2.5 py-1 rounded-md bg-[#D99A25] text-white text-[10px] font-bold uppercase tracking-wider">
                  Bestseller
                </span>
              )}
              {quickViewItem.isHalal && (
                <span className="px-2.5 py-1 rounded-md bg-[#43852C] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Halal
                </span>
              )}
            </div>

            {/* Preparation Details bottom overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gray-300 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#F5B900]" />
                {quickViewItem.preparationTime}
              </span>
              <span>{quickViewItem.portionSize}</span>
              {quickViewItem.calories && <span>{quickViewItem.calories}</span>}
            </div>
          </div>

          {/* Right: Dish Details & Customizer */}
          <div className="p-6 md:p-7 flex flex-col justify-between space-y-5 max-h-[80vh] overflow-y-auto">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#D99A25] mb-1">
                {quickViewItem.categoryLabel}
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight">
                {quickViewItem.name}
              </h2>

              {/* Price */}
              <div className="mt-2 text-xl font-bold text-[#F5B900]">
                {formatPrice(currentUnitUSD, currentUnitNGN)}
                <span className="text-xs font-normal text-gray-400 ml-2">
                  (incl. taxes &amp; service)
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs md:text-sm text-gray-300 leading-relaxed">
                {quickViewItem.description}
              </p>

              {/* Ingredients Chips */}
              <div className="mt-4">
                <span className="text-[11px] font-semibold text-gray-400 block mb-1.5 uppercase tracking-wider">
                  Fresh Ingredients:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewItem.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-2 py-0.5 rounded-md bg-[#1C1B1B] text-[11px] text-gray-300 border border-white/10"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Spice Level Selector */}
              {quickViewItem.spiceLevelOptions && (
                <div className="mt-4">
                  <span className="text-[11px] font-semibold text-gray-300 block mb-1.5 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-[#F5B900]" /> Choose Spice Level:
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    {quickViewItem.spiceLevelOptions.map((spice) => (
                      <button
                        key={spice}
                        type="button"
                        onClick={() => setSelectedSpice(spice)}
                        className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                          selectedSpice === spice
                            ? 'border-[#F5B900] bg-[#F5B900]/20 text-[#F5B900] font-bold'
                            : 'border-white/10 bg-[#1C1B1B] text-gray-300 hover:border-white/20'
                        }`}
                      >
                        {spice}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sides Selector */}
              {quickViewItem.sidesOptions && (
                <div className="mt-4">
                  <span className="text-[11px] font-semibold text-gray-300 block mb-1.5">
                    Select Accompaniment / Side:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {quickViewItem.sidesOptions.map((side) => (
                      <button
                        key={side}
                        type="button"
                        onClick={() => setSelectedSide(side)}
                        className={`py-1.5 px-2 rounded-lg border text-left truncate transition-all ${
                          selectedSide === side
                            ? 'border-[#F5B900] bg-[#F5B900]/20 text-[#F5B900] font-bold'
                            : 'border-white/10 bg-[#1C1B1B] text-gray-300 hover:border-white/20'
                        }`}
                      >
                        {side}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Extra Protein Add-On */}
              {quickViewItem.proteinOptions && quickViewItem.proteinOptions.length > 0 && (
                <div className="mt-4">
                  <span className="text-[11px] font-semibold text-[#D99A25] block mb-1.5">
                    Add Extra Royal Protein (Optional):
                  </span>
                  <div className="space-y-1.5 text-xs">
                    {quickViewItem.proteinOptions.map((protein) => {
                      const isSelected = selectedProtein?.name === protein.name;
                      return (
                        <button
                          key={protein.name}
                          type="button"
                          onClick={() =>
                            setSelectedProtein(isSelected ? undefined : protein)
                          }
                          className={`w-full p-2 rounded-lg border flex items-center justify-between transition-all ${
                            isSelected
                              ? 'border-[#F5B900] bg-[#F5B900]/20 text-white'
                              : 'border-white/10 bg-[#1C1B1B] text-gray-300 hover:border-white/20'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <span
                              className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                                isSelected
                                  ? 'border-[#F5B900] bg-[#F5B900] text-[#242323]'
                                  : 'border-gray-500'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </span>
                            <span>{protein.name}</span>
                          </span>
                          <span className="text-[#F5B900] font-semibold">
                            +{formatPrice(protein.priceUSD, protein.priceNGN)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions: Quantity & Add to Cart */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              <div className="flex items-center border border-white/15 rounded-xl bg-[#1C1B1B] p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:text-[#F5B900] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 text-sm font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 hover:text-[#F5B900] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-[#242323] bg-gradient-to-r from-[#F5B900] via-[#FFCE3B] to-[#D99A25] hover:brightness-110 shadow-gold-glow flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  Add To Bag • {formatPrice(totalPriceUSD, totalPriceNGN)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
