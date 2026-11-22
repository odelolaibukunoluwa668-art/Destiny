import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem, ExtraProtein, TableReservation } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface ToastState {
  id: number;
  message: string;
  itemImage?: string;
  type?: 'success' | 'info' | 'gold';
}

export interface PlacedOrderReceipt {
  orderNumber: string;
  items: CartItem[];
  subtotalUSD: number;
  subtotalNGN: number;
  deliveryFeeUSD: number;
  deliveryFeeNGN: number;
  totalUSD: number;
  totalNGN: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  paymentMethod: string;
  estimatedDeliveryTime: string;
  orderTimestamp: string;
}

interface RestaurantContextType {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (
    item: MenuItem,
    quantity?: number,
    options?: {
      spiceLevel?: string;
      side?: string;
      protein?: ExtraProtein;
      instructions?: string;
    }
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotalUSD: number;
  subtotalNGN: number;
  freeDeliveryThresholdUSD: number;
  remainingForFreeDeliveryUSD: number;
  hasFreeDelivery: boolean;

  // Quick View / Customizer Modal
  quickViewItem: MenuItem | null;
  openQuickView: (item: MenuItem) => void;
  closeQuickView: () => void;

  // Table Reservation Modal
  isReservationOpen: boolean;
  openReservation: (occasion?: string) => void;
  closeReservation: () => void;
  reservationSuccess: TableReservation | null;
  submitReservation: (data: TableReservation) => boolean;
  clearReservationSuccess: () => void;

  // Live Search Modal
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  // Checkout Modal
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  placedOrderReceipt: PlacedOrderReceipt | null;
  submitOrder: (orderInfo: {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    deliveryNotes?: string;
    paymentMethod: string;
  }) => void;
  clearPlacedOrder: () => void;

  // Currency
  currency: 'NGN' | 'USD';
  setCurrency: (c: 'NGN' | 'USD') => void;
  toggleCurrency: () => void;
  formatPrice: (usdAmount: number, ngnAmount?: number) => string;

  // Toast
  toast: ToastState | null;
  showToast: (message: string, image?: string) => void;
  dismissToast: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart State pre-populated with a signature item for instant visual delight
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('precious_restaurant_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    // Default starter item
    const defaultDish = MENU_ITEMS[0]; // Fried Rice Deluxe
    return [
      {
        id: `${defaultDish.id}-Mild-Default`,
        menuItem: defaultDish,
        quantity: 1,
        selectedSpiceLevel: 'Medium',
        selectedSide: 'Fried Plantain (Dodo)',
        totalPriceUSD: 10,
        totalPriceNGN: 8500,
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState<TableReservation | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [placedOrderReceipt, setPlacedOrderReceipt] = useState<PlacedOrderReceipt | null>(null);

  // Currency: default to Nigerian Naira 'NGN' with instant toggle to USD
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [toast, setToast] = useState<ToastState | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('precious_restaurant_cart', JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  // Toast auto dismiss
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3800);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message: string, itemImage?: string) => {
    setToast({
      id: Date.now(),
      message,
      itemImage,
      type: 'gold',
    });
  };

  const dismissToast = () => setToast(null);

  // Cart Handlers
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (
    item: MenuItem,
    quantity = 1,
    options?: {
      spiceLevel?: string;
      side?: string;
      protein?: ExtraProtein;
      instructions?: string;
    }
  ) => {
    const spice = options?.spiceLevel || (item.spiceLevelOptions ? item.spiceLevelOptions[0] : 'Standard');
    const side = options?.side || (item.sidesOptions ? item.sidesOptions[0] : 'None');
    const proteinExtraUSD = options?.protein ? options.protein.priceUSD : 0;
    const proteinExtraNGN = options?.protein ? options.protein.priceNGN : 0;

    const unitPriceUSD = item.priceUSD + proteinExtraUSD;
    const unitPriceNGN = item.priceNGN + proteinExtraNGN;

    const cartItemId = `${item.id}-${spice}-${side}-${options?.protein?.name || 'standard'}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.id === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.id === cartItemId
            ? {
                ...i,
                quantity: i.quantity + quantity,
                totalPriceUSD: (i.quantity + quantity) * unitPriceUSD,
                totalPriceNGN: (i.quantity + quantity) * unitPriceNGN,
              }
            : i
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          menuItem: item,
          quantity,
          selectedSpiceLevel: spice,
          selectedSide: side,
          selectedProtein: options?.protein,
          specialInstructions: options?.instructions,
          totalPriceUSD: unitPriceUSD * quantity,
          totalPriceNGN: unitPriceNGN * quantity,
        },
      ];
    });

    showToast(`Added ${quantity}x ${item.name} to your order!`, item.image);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const unitUSD = item.totalPriceUSD / item.quantity;
            const unitNGN = item.totalPriceNGN / item.quantity;
            return {
              ...item,
              quantity: newQty,
              totalPriceUSD: unitUSD * newQty,
              totalPriceNGN: unitNGN * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalUSD = cart.reduce((acc, item) => acc + item.totalPriceUSD, 0);
  const subtotalNGN = cart.reduce((acc, item) => acc + item.totalPriceNGN, 0);

  const freeDeliveryThresholdUSD = 40;
  const remainingForFreeDeliveryUSD = Math.max(0, freeDeliveryThresholdUSD - subtotalUSD);
  const hasFreeDelivery = subtotalUSD >= freeDeliveryThresholdUSD;

  // Currency
  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'NGN' ? 'USD' : 'NGN'));
  };

  const formatPrice = (usdAmount: number, ngnAmount?: number): string => {
    if (currency === 'NGN') {
      const amount = ngnAmount ?? Math.round(usdAmount * 1150);
      return `₦${amount.toLocaleString('en-NG')}`;
    }
    return `$${usdAmount.toFixed(0)}`;
  };

  // Modals
  const openQuickView = (item: MenuItem) => setQuickViewItem(item);
  const closeQuickView = () => setQuickViewItem(null);

  const openReservation = (occasion?: string) => {
    setIsReservationOpen(true);
  };
  const closeReservation = () => setIsReservationOpen(false);

  const submitReservation = (data: TableReservation) => {
    setReservationSuccess(data);
    showToast(`Table reserved for ${data.fullName} on ${data.date}!`);
    return true;
  };
  const clearReservationSuccess = () => setReservationSuccess(null);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const submitOrder = (orderInfo: {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    deliveryNotes?: string;
    paymentMethod: string;
  }) => {
    const deliveryFeeUSD = hasFreeDelivery ? 0 : 4;
    const deliveryFeeNGN = hasFreeDelivery ? 0 : 2500;
    const orderNumber = `PRC-${Math.floor(100000 + Math.random() * 900000)}`;

    const receipt: PlacedOrderReceipt = {
      orderNumber,
      items: [...cart],
      subtotalUSD,
      subtotalNGN,
      deliveryFeeUSD,
      deliveryFeeNGN,
      totalUSD: subtotalUSD + deliveryFeeUSD,
      totalNGN: subtotalNGN + deliveryFeeNGN,
      customerName: orderInfo.fullName,
      customerPhone: orderInfo.phone,
      deliveryAddress: orderInfo.address,
      deliveryCity: orderInfo.city,
      paymentMethod: orderInfo.paymentMethod,
      estimatedDeliveryTime: '30 - 45 Minutes',
      orderTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setPlacedOrderReceipt(receipt);
    clearCart();
    showToast(`Order #${orderNumber} Confirmed! We are firing up the kitchen.`);
  };

  const clearPlacedOrder = () => setPlacedOrderReceipt(null);

  return (
    <RestaurantContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotalUSD,
        subtotalNGN,
        freeDeliveryThresholdUSD,
        remainingForFreeDeliveryUSD,
        hasFreeDelivery,

        quickViewItem,
        openQuickView,
        closeQuickView,

        isReservationOpen,
        openReservation,
        closeReservation,
        reservationSuccess,
        submitReservation,
        clearReservationSuccess,

        isSearchOpen,
        openSearch,
        closeSearch,

        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        placedOrderReceipt,
        submitOrder,
        clearPlacedOrder,

        currency,
        setCurrency,
        toggleCurrency,
        formatPrice,

        toast,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = (): RestaurantContextType => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};

// Also keep CartContext alias for seamless backward compatibility
export const useCart = useRestaurant;
export const CartProvider = RestaurantProvider;
