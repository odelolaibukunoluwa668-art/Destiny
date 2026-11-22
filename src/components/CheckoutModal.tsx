import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Building2,
  Banknote,
  Smartphone,
  CheckCircle2,
  Copy,
  Clock,
  MapPin,
  Truck,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useRestaurant, PlacedOrderReceipt } from '../context/RestaurantContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const {
    cart,
    subtotalUSD,
    subtotalNGN,
    hasFreeDelivery,
    formatPrice,
    submitOrder,
    placedOrderReceipt,
    clearPlacedOrder,
    showToast,
  } = useRestaurant();

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [fullName, setFullName] = useState('Chief Babatunde Adeleke');
  const [phone, setPhone] = useState('+234 803 555 0192');
  const [email, setEmail] = useState('babatunde.adeleke@example.ng');
  const [city, setCity] = useState('Lagos - Victoria Island');
  const [address, setAddress] = useState('Plot 28, Akin Adesola Street, Victoria Island');
  const [deliveryNotes, setDeliveryNotes] = useState('Call gate security upon arrival.');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'pos' | 'ussd'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  if (!isOpen && !placedOrderReceipt) return null;

  const deliveryFeeUSD = orderType === 'delivery' ? (hasFreeDelivery ? 0 : 4) : 0;
  const deliveryFeeNGN = orderType === 'delivery' ? (hasFreeDelivery ? 0 : 2500) : 0;
  const grandTotalUSD = subtotalUSD + deliveryFeeUSD;
  const grandTotalNGN = subtotalNGN + deliveryFeeNGN;

  const handleCopyAccount = (acc: string) => {
    navigator.clipboard.writeText(acc);
    setCopiedAccount(true);
    showToast('Bank Account Number Copied!');
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert('Please provide your name and phone number');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitOrder({
        fullName,
        phone,
        email,
        city,
        address: orderType === 'delivery' ? address : 'Self Pick-up at Victoria Island Flagship',
        deliveryNotes,
        paymentMethod:
          paymentMethod === 'card'
            ? 'Debit/Credit Card (Paystack/Visa)'
            : paymentMethod === 'transfer'
            ? 'Direct Bank Transfer (GTBank / Zenith)'
            : paymentMethod === 'pos'
            ? 'POS Terminal on Delivery'
            : 'USSD Mobile Transfer',
      });
      setIsSubmitting(false);
    }, 1200);
  };

  const handleCloseAll = () => {
    clearPlacedOrder();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={handleCloseAll}
      />

      <div className="relative w-full max-w-2xl bg-[#242323] text-white rounded-2xl shadow-2xl border border-[#F5B900]/30 overflow-hidden my-8 z-10 animate-slide-up">
        {/* SUCCESS CONFIRMATION RECEIPT SCREEN */}
        {placedOrderReceipt ? (
          <div className="p-6 md:p-8 space-y-6">
            {/* Success Icon & Header */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-[#43852C]/20 border border-[#43852C] flex items-center justify-center mx-auto text-[#43852C] animate-pulse">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#F5B900] font-semibold">
                Order Confirmed &amp; In The Kitchen
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
                Thank You, {placedOrderReceipt.customerName.split(' ')[0]}!
              </h2>
              <p className="text-xs text-gray-400">
                Order Reference:{' '}
                <strong className="text-white font-mono tracking-wider bg-[#1C1B1B] px-2 py-1 rounded border border-white/10">
                  {placedOrderReceipt.orderNumber}
                </strong>
              </p>
            </div>

            {/* Live Progress Tracker */}
            <div className="bg-[#1C1B1B] p-4 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span className="font-semibold text-[#F5B900]">Live Order Status</span>
                <span className="flex items-center gap-1 text-[#43852C] font-semibold">
                  <Clock className="w-3.5 h-3.5" /> Est: {placedOrderReceipt.estimatedDeliveryTime}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                <div className="space-y-1">
                  <div className="h-1.5 rounded-full bg-[#F5B900]" />
                  <span className="text-[#F5B900] font-bold">1. Confirmed</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 rounded-full bg-[#F5B900] animate-pulse" />
                  <span className="text-[#F5B900] font-bold">2. Cooking</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 rounded-full bg-gray-700" />
                  <span className="text-gray-400">3. Dispatch</span>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 rounded-full bg-gray-700" />
                  <span className="text-gray-400">4. Delivered</span>
                </div>
              </div>
            </div>

            {/* Summary List */}
            <div className="bg-[#1C1B1B] p-4 rounded-xl border border-white/10 space-y-3 text-xs">
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] text-[#D99A25]">
                Order Details
              </h4>
              <div className="divide-y divide-white/5 space-y-2">
                {placedOrderReceipt.items.map((item) => (
                  <div key={item.id} className="pt-2 flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-white">
                        {item.quantity}x {item.menuItem.name}
                      </span>
                      {item.selectedSpiceLevel && (
                        <span className="text-gray-400 block text-[10px]">
                          Spice: {item.selectedSpiceLevel} | Side: {item.selectedSide}
                        </span>
                      )}
                    </div>
                    <span className="text-[#F5B900] font-semibold">
                      {formatPrice(item.totalPriceUSD, item.totalPriceNGN)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 space-y-1 text-gray-300">
                <div className="flex justify-between">
                  <span>Destination</span>
                  <span className="text-white text-right max-w-xs truncate">
                    {placedOrderReceipt.deliveryAddress}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Mode</span>
                  <span className="text-white">{placedOrderReceipt.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-1">
                  <span className="font-serif">Total Paid</span>
                  <span className="text-[#F5B900] font-sans">
                    {formatPrice(placedOrderReceipt.totalUSD, placedOrderReceipt.totalNGN)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/23480077324687?text=Hello%20PRECIOUS%20Concierge,%20I%20just%20placed%20order%20${placedOrderReceipt.orderNumber}.%20Kindly%20confirm%20dispatch.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-[#242323] bg-gradient-to-r from-[#F5B900] to-[#D99A25] hover:brightness-110 flex items-center justify-center gap-2 shadow-gold-glow"
              >
                <span>Track on WhatsApp Concierge</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={handleCloseAll}
                className="py-3 px-6 rounded-xl font-semibold text-xs tracking-wider text-white bg-[#323030] hover:bg-[#3D3B3B] transition-colors"
              >
                Done / Back to Dining
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM */
          <form onSubmit={handleSubmitOrder}>
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#1C1B1B]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F5B900]/20 flex items-center justify-center text-[#F5B900]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                    PRECIOUS Gourmet Checkout
                  </h3>
                  <p className="text-xs text-gray-400">
                    Fast &amp; Secure Checkout • Lagos &amp; Abuja Dispatch
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 md:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Order Type Toggle: Delivery or Pickup */}
              <div className="grid grid-cols-2 gap-3 bg-[#1C1B1B] p-1.5 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    orderType === 'delivery'
                      ? 'bg-gradient-to-r from-[#F5B900] to-[#D99A25] text-[#242323] shadow-gold-glow'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>VIP Doorstep Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    orderType === 'pickup'
                      ? 'bg-gradient-to-r from-[#F5B900] to-[#D99A25] text-[#242323] shadow-gold-glow'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Express Pick-up Counter</span>
                </button>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5B900]">
                  1. Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#1C1B1B] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                      placeholder="e.g. Chief Babatunde Adeleke"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Phone Number (Nigerian Format)</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#1C1B1B] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                      placeholder="+234 803 555 0192"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-gray-300 mb-1">Email (For Instant Digital Receipt)</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#1C1B1B] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                      placeholder="babatunde@example.ng"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address (if Delivery selected) */}
              {orderType === 'delivery' && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5B900]">
                    2. Delivery Location
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-gray-300 mb-1">City &amp; Area</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#1C1B1B] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                      >
                        <option value="Lagos - Victoria Island">Lagos — Victoria Island</option>
                        <option value="Lagos - Ikoyi">Lagos — Ikoyi</option>
                        <option value="Lagos - Lekki Phase 1">Lagos — Lekki Phase 1 &amp; Chevron</option>
                        <option value="Lagos - Ikeja GRA">Lagos — Ikeja GRA &amp; Maryland</option>
                        <option value="Abuja - Maitama">Abuja — Maitama District</option>
                        <option value="Abuja - Wuse II">Abuja — Wuse II</option>
                        <option value="Abuja - Central Area">Abuja — Central Business District</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1">Street Address / Landmark</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-[#1C1B1B] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                        placeholder="House number, street name, apartment or estate name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1">Rider Instructions (Optional)</label>
                      <input
                        type="text"
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        className="w-full bg-[#1C1B1B] border border-white/10 rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:border-[#F5B900]"
                        placeholder="e.g. Ring bell at gate, call when on the avenue"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method Selection */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5B900]">
                  {orderType === 'delivery' ? '3.' : '2.'} Payment Method
                </h4>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  {/* Option 1: Card */}
                  <label
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#F5B900] bg-[#F5B900]/10 text-white'
                        : 'border-white/10 bg-[#1C1B1B] text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#F5B900]"
                    />
                    <CreditCard className="w-4 h-4 text-[#F5B900]" />
                    <span className="font-semibold">Debit Card / Paystack</span>
                  </label>

                  {/* Option 2: Bank Transfer */}
                  <label
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'transfer'
                        ? 'border-[#F5B900] bg-[#F5B900]/10 text-white'
                        : 'border-white/10 bg-[#1C1B1B] text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'transfer'}
                      onChange={() => setPaymentMethod('transfer')}
                      className="accent-[#F5B900]"
                    />
                    <Building2 className="w-4 h-4 text-[#F5B900]" />
                    <span className="font-semibold">Direct Bank Transfer</span>
                  </label>

                  {/* Option 3: POS on Delivery */}
                  <label
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'pos'
                        ? 'border-[#F5B900] bg-[#F5B900]/10 text-white'
                        : 'border-white/10 bg-[#1C1B1B] text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'pos'}
                      onChange={() => setPaymentMethod('pos')}
                      className="accent-[#F5B900]"
                    />
                    <Banknote className="w-4 h-4 text-[#F5B900]" />
                    <span className="font-semibold">POS / Cash on Delivery</span>
                  </label>

                  {/* Option 4: USSD */}
                  <label
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'ussd'
                        ? 'border-[#F5B900] bg-[#F5B900]/10 text-white'
                        : 'border-white/10 bg-[#1C1B1B] text-gray-300 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'ussd'}
                      onChange={() => setPaymentMethod('ussd')}
                      className="accent-[#F5B900]"
                    />
                    <Smartphone className="w-4 h-4 text-[#F5B900]" />
                    <span className="font-semibold">USSD Mobile Code</span>
                  </label>
                </div>

                {/* Bank Transfer Details Box if selected */}
                {paymentMethod === 'transfer' && (
                  <div className="bg-[#1C1B1B] p-4 rounded-xl border border-[#F5B900]/30 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[#F5B900] font-semibold">
                      <span>PRECIOUS Restaurant Official Accounts:</span>
                      <span className="text-[10px] text-gray-400">Instant Verification</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
                      <div className="p-2.5 bg-[#282727] rounded-lg border border-white/5 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white">Guaranty Trust Bank (GTB)</div>
                          <div className="font-mono text-sm text-[#F5B900]">0123456789</div>
                          <div className="text-[10px] text-gray-400">Precious Culinary Ltd</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyAccount('0123456789')}
                          className="p-1.5 text-gray-400 hover:text-[#F5B900]"
                          title="Copy account number"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-2.5 bg-[#282727] rounded-lg border border-white/5 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white">Zenith Bank Plc</div>
                          <div className="font-mono text-sm text-[#F5B900]">1012345678</div>
                          <div className="text-[10px] text-gray-400">Precious Hospitality Group</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyAccount('1012345678')}
                          className="p-1.5 text-gray-400 hover:text-[#F5B900]"
                          title="Copy account number"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Cost Breakdown */}
              <div className="bg-[#1C1B1B] p-4 rounded-xl border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Cart Subtotal ({cart.length} items)</span>
                  <span className="font-semibold text-white">{formatPrice(subtotalUSD, subtotalNGN)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>VIP Delivery Fee</span>
                  <span className="font-semibold text-white">
                    {orderType === 'pickup'
                      ? 'FREE (Pick-up)'
                      : hasFreeDelivery
                      ? 'FREE'
                      : formatPrice(deliveryFeeUSD, deliveryFeeNGN)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span className="font-serif">Grand Total</span>
                  <span className="text-[#F5B900] font-sans">
                    {formatPrice(grandTotalUSD, grandTotalNGN)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="p-5 border-t border-white/10 bg-[#1C1B1B] flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="flex-1 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-[#242323] bg-gradient-to-r from-[#F5B900] via-[#FFCE3B] to-[#D99A25] hover:brightness-110 shadow-gold-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#242323] border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </span>
                ) : (
                  <>
                    <span>Confirm &amp; Place Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
