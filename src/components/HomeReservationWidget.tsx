import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export default function HomeReservationWidget() {
  const { openReservation } = useRestaurant();
  const [selectedBranch, setSelectedBranch] = useState('Victoria Island Flagship');
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('2026-11-25');
  const [time, setTime] = useState('7:30 PM');

  const handleLaunchReservation = (e: React.FormEvent) => {
    e.preventDefault();
    openReservation();
  };

  return (
    <section className="py-20 bg-[#1C1B1B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#292727] via-[#242323] to-[#1C1B1B] border border-[#F5B900]/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Decorative Gold Radial */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5B900]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1B1B] border border-[#F5B900]/40 text-xs font-semibold uppercase tracking-widest text-[#F5B900]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Table &amp; Salon Reservations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              An Unforgettable Evening Awaits You
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed font-light">
              Experience the warmth of Nigerian hospitality in our regal dining rooms, VIP private salons, or breeze waterfront terrace.
            </p>
          </div>

          {/* Quick Booking Bar */}
          <form
            onSubmit={handleLaunchReservation}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 bg-[#1C1B1B]/80 p-4 rounded-2xl border border-white/10 backdrop-blur-md"
          >
            {/* Branch */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#F5B900]" /> Location
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full bg-[#282727] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5B900]"
              >
                <option value="Victoria Island Flagship">Victoria Island, Lagos</option>
                <option value="Lekki Waterfront">Lekki Phase 1, Lagos</option>
                <option value="Maitama Abuja Lounge">Maitama, Abuja</option>
              </select>
            </div>

            {/* Guests */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1">
                <Users className="w-3 h-3 text-[#F5B900]" /> Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-[#282727] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5B900]"
              >
                <option value="1">1 Person</option>
                <option value="2">2 Persons (Couple)</option>
                <option value="4">4 Persons (Family)</option>
                <option value="6">6 Persons (Banquet)</option>
                <option value="10">10+ Persons (VIP Salon)</option>
              </select>
            </div>

            {/* Date */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#F5B900]" /> Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#282727] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5B900]"
              />
            </div>

            {/* Time */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#F5B900]" /> Time Slot
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#282727] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5B900]"
              >
                <option value="1:00 PM">1:00 PM (Lunch)</option>
                <option value="6:00 PM">6:00 PM (Sunset)</option>
                <option value="7:30 PM">7:30 PM (Prime Dinner)</option>
                <option value="9:30 PM">9:30 PM (Late Night)</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-[#242323] bg-gradient-to-r from-[#F5B900] via-[#FFCE3B] to-[#D99A25] hover:brightness-110 shadow-gold-glow flex items-center justify-center gap-1.5 transition-all h-[38px]"
              >
                <span>Find Table</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Guarantee Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#43852C]" />
              <span>Zero reservation fees</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F5B900]" />
              <span>Complimentary valet parking</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#D99A25]" />
              <span>Instant WhatsApp confirmation</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
