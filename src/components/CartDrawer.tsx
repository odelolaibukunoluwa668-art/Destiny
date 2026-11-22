import React from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Flame,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  onOpenCheckout?: () => void;
}

export default function CartDrawer({ onOpenCheckout }: CartDrawerProps) {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    subtotalUSD,
    subtotalNGN,
    freeDeliveryThresholdUSD,
    remainingForFreeDeliveryUSD,
    hasFreeDelivery,
    currency,
    formatPrice,
    openCheckout,
  } = useRestaurant();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    closeCart();
    if (onOpenCheckout) {
      onOpenCheckout();
    } else {
      openCheckout();
    }
  };

  const deliveryFeeUSD = hasFreeDelivery ? 0 : 4;
  const deliveryFeeNGN = hasFreeDelivery ? 0 : 2500;
  const totalUSD = subtotalUSD + deliveryFeeUSD;
  const totalNGN = subtotalNGN + deliveryFeeNGN;

  // Free delivery progress percentage
  const freeDeliveryProgress = Math.min(100, Math.round((subtotalUSD / freeDeliveryThresholdUSD) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#242323] text-white shadow-2xl flex flex-col border-l border-[#F5B900]/25 animate-slide-up">
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#1C1B1B]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#F5B900]/20 flex items-center justify-center text-[#F5B900]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                  Your Gourmet Bag
                </h3>
                <p className="text-xs text-gray-400">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="bg-[#2D2B2B] px-5 py-3 border-b border-white/10 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 text-gray-300">
                <Truck className="w-3.5 h-3.5 text-[#F5B900]" />
                {hasFreeDelivery ? (
                  <span className="text-[#43852C] font-bold">VIP Free Delivery Unlocked!</span>
                ) : (
                  <span>
                    Add{' '}
                    <strong className="text-[#F5B900]">
                      {formatPrice(remainingForFreeDeliveryUSD, Math.round(remainingForFreeDeliveryUSD * 1150))}
                    </strong>{' '}
                    more for Free Delivery
                  </span>
                )}
              </span>
              <span className="font-bold text-gray-400">{freeDeliveryProgress}%</span>
            </div>
            <div className="w-full bg-[#1C1B1B] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#F5B900] to-[#43852C] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1C1B1B] border border-[#F5B900]/20 flex items-center justify-center mx-auto text-gray-500">
                  <Flame className="w-8 h-8 text-[#F5B900]/50" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg text-white">Your bag is empty</h4>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto">
                    Explore our exquisite selection of African, Continental, Chinese and Fast Food delicacies.
                  </p>
                </div>
                <Link
                  to="/menu"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-[#242323] bg-gradient-to-r from-[#F5B900] to-[#D99A25] shadow-gold-glow"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#2D2B2B] rounded-xl p-3.5 border border-white/5 flex gap-3.5 hover:border-[#F5B900]/30 transition-all"
                >
                  {/* Food Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-black/40 border border-[#F5B900]/20">
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm font-bold text-white truncate">
                        {item.menuItem.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-400 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Selected Options / Customizations */}
                    <div className="text-[11px] text-gray-400 space-y-0.5 mt-0.5">
                      {item.selectedSpiceLevel && (
                        <div>
                          Spice:{' '}
                          <span className="text-gray-200">{item.selectedSpiceLevel}</span>
                        </div>
                      )}
                      {item.selectedSide && item.selectedSide !== 'None' && (
                        <div>
                          Side: <span className="text-gray-200">{item.selectedSide}</span>
                        </div>
                      )}
                      {item.selectedProtein && (
                        <div>
                          Extra:{' '}
                          <span className="text-[#F5B900]">
                            {item.selectedProtein.name} (+
                            {formatPrice(item.selectedProtein.priceUSD, item.selectedProtein.priceNGN)})
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Quantity Controls & Price */}
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5">
                      <div className="flex items-center border border-white/10 rounded-lg bg-[#242323]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:text-[#F5B900] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:text-[#F5B900] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-[#F5B900]">
                          {formatPrice(item.totalPriceUSD, item.totalPriceNGN)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Order CTA */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#1C1B1B] border-t border-white/10 space-y-3">
              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">
                    {formatPrice(subtotalUSD, subtotalNGN)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <span>Estimated VIP Delivery</span>
                    {hasFreeDelivery && (
                      <span className="text-[10px] text-[#43852C] font-bold uppercase bg-[#43852C]/20 px-1 rounded">
                        FREE
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-white">
                    {hasFreeDelivery ? '₦0 / $0' : formatPrice(deliveryFeeUSD, deliveryFeeNGN)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span className="font-serif">Total</span>
                  <span className="text-[#F5B900] font-sans">
                    {formatPrice(totalUSD, totalNGN)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-[#242323] bg-gradient-to-r from-[#F5B900] via-[#FFCE3B] to-[#D99A25] hover:brightness-110 shadow-gold-glow flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                <button
                  onClick={clearCart}
                  className="hover:text-red-400 transition-colors"
                >
                  Clear Bag
                </button>
                <button
                  onClick={closeCart}
                  className="hover:text-[#F5B900] transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
