import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  User,
  Heart,
  ExternalLink,
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { TableReservation } from '../types';

export default function ReservationModal() {
  const {
    isReservationOpen,
    closeReservation,
    submitReservation,
    reservationSuccess,
    clearReservationSuccess,
  } = useRestaurant();

  const [branch, setBranch] = useState('Victoria Island Flagship');
  const [seatingArea, setSeatingArea] = useState<
    'main-dining' | 'vip-lounge' | 'outdoor-terrace' | 'private-dining'
  >('vip-lounge');
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState('2026-11-25');
  const [timeSlot, setTimeSlot] = useState('7:30 PM (Dinner)');
  const [occasion, setOccasion] = useState('Romantic Dinner');
  const [fullName, setFullName] = useState('Chief Babatunde Adeleke');
  const [email, setEmail] = useState('babatunde.adeleke@example.ng');
  const [phone, setPhone] = useState('+234 803 555 0192');
  const [specialRequests, setSpecialRequests] = useState('Window or terrace view if available, celebrating anniversary.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isReservationOpen && !reservationSuccess) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      submitReservation({
        fullName,
        email,
        phone,
        partySize,
        date,
        timeSlot,
        seatingArea,
        occasion,
        specialRequests,
      });
      setIsSubmitting(false);
    }, 900);
  };

  const handleClose = () => {
    clearReservationSuccess();
    closeReservation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-2xl bg-[#242323] text-white rounded-2xl shadow-2xl border border-[#F5B900]/30 overflow-hidden my-8 z-10 animate-slide-up">
        {/* SUCCESS CONFIRMATION */}
        {reservationSuccess ? (
          <div className="p-6 md:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#43852C]/20 border border-[#43852C] flex items-center justify-center mx-auto text-[#43852C] animate-pulse">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#F5B900] font-semibold">
                Table Reserved Successfully
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
                We Await Your Arrival, {reservationSuccess.fullName.split(' ')[0]}
              </h2>
              <p className="text-xs text-gray-400">
                A confirmation SMS &amp; email have been dispatched to your contact.
              </p>
            </div>

            {/* Booking Card */}
            <div className="bg-[#1C1B1B] p-5 rounded-xl border border-white/10 text-xs text-left space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-semibold text-[#D99A25] uppercase tracking-wider text-[11px]">
                  Reservation Voucher
                </span>
                <span className="font-mono bg-[#282727] px-2 py-0.5 rounded text-[#F5B900]">
                  RES-{Math.floor(1000 + Math.random() * 9000)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-gray-300">
                <div>
                  <span className="text-gray-500 block text-[10px]">Location</span>
                  <span className="font-semibold text-white">{branch}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Dining Area</span>
                  <span className="font-semibold text-white capitalize">
                    {reservationSuccess.seatingArea.replace('-', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Date &amp; Time</span>
                  <span className="font-semibold text-[#F5B900]">
                    {reservationSuccess.date} • {reservationSuccess.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Party Size</span>
                  <span className="font-semibold text-white">
                    {reservationSuccess.partySize} {reservationSuccess.partySize === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
              </div>

              {reservationSuccess.specialRequests && (
                <div className="pt-2 border-t border-white/5">
                  <span className="text-gray-500 block text-[10px]">Special Notes</span>
                  <span className="text-gray-300 italic">{reservationSuccess.specialRequests}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/23480077324687?text=Hello%20PRECIOUS%20Concierge,%20confirming%20my%20reservation%20for%20${reservationSuccess.partySize}%20guests%20on%20${reservationSuccess.date}%20at%20${reservationSuccess.timeSlot}.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-[#242323] bg-gradient-to-r from-[#F5B900] to-[#D99A25] hover:brightness-110 flex items-center justify-center gap-2 shadow-gold-glow"
              >
                <span>Notify VIP Host via WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={handleClose}
                className="py-3 px-6 rounded-xl font-semibold text-xs tracking-wider text-white bg-[#323030] hover:bg-[#3D3B3B] transition-colors"
              >
                Close &amp; Return
              </button>
            </div>
          </div>
        ) : (
          /* RESERVATION FORM */
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#1C1B1B]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F5B900]/20 flex items-center justify-center text-[#F5B900]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                    Reserve a Royal Table at PRECIOUS
                  </h3>
                  <p className="text-xs text-gray-400">
                    Victoria Island • Lekki Phase 1 • Maitama Abuja
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeReservation}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 md:p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
              {/* Branch Selection */}
              <div>
                <label className="block text-gray-300 mb-1.5 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F5B900]" /> Select Branch
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'Victoria Island Flagship',
                    'Lekki Waterfront',
                    'Maitama Abuja Lounge',
                  ].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBranch(b)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        branch === b
                          ? 'border-[#F5B900] bg-[#F5B900]/15 text-white font-semibold'
                          : 'border-white/10 bg-[#1C1B1B] text-gray-300 hover:border-white/20'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Area Selection */}
              <div>
                <label className="block text-gray-300 mb-1.5 font-medium">
                  Dining Area Preference
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  {[
                    { id: 'vip-lounge', label: 'VIP Royal Salon' },
                    { id: 'main-dining', label: 'Main Dining Room' },
                    { id: 'outdoor-terrace', label: 'Outdoor Terrace' },
                    { id: 'private-dining', label: 'Chef Private Table' },
                  ].map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setSeatingArea(area.id as any)}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        seatingArea === area.id
                          ? 'border-[#F5B900] bg-[#F5B900]/20 text-[#F5B900] font-bold'
                          : 'border-white/10 bg-[#1C1B1B] text-gray-300 hover:border-white/20'
                      }`}
                    >
                      {area.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date, Time & Guests Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1 font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#F5B900]" /> Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#1C1B1B] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F5B900]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#F5B900]" /> Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#1C1B1B] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F5B900]"
                  >
                    <option value="12:30 PM (Lunch)">12:30 PM (Lunch)</option>
                    <option value="1:30 PM (Lunch)">1:30 PM (Lunch)</option>
                    <option value="3:00 PM (Afternoon)">3:00 PM (Afternoon)</option>
                    <option value="6:00 PM (Early Dinner)">6:00 PM (Early Dinner)</option>
                    <option value="7:30 PM (Dinner)">7:30 PM (Prime Dinner)</option>
                    <option value="9:00 PM (Dinner)">9:00 PM (Late Dinner)</option>
                    <option value="10:30 PM (Supper)">10:30 PM (VIP Lounge)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 font-medium flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#F5B900]" /> Party Size
                  </label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    className="w-full bg-[#1C1B1B] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F5B900]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-gray-300 mb-1 font-medium">Occasion</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-[#1C1B1B] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F5B900]"
                >
                  <option value="Romantic Dinner">Romantic Dinner / Date Night</option>
                  <option value="Business Dining">Executive Business Meeting</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Anniversary">Wedding Anniversary</option>
                  <option value="Family Gathering">Family Gathering</option>
                  <option value="Casual Fine Dining">Casual Fine Dining</option>
                </select>
              </div>

              {/* Guest Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#1C1B1B] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F5B900]"
                    placeholder="Chief Babatunde Adeleke"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Phone (+234)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1C1B1B] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F5B900]"
                    placeholder="+234 803 555 0192"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1C1B1B] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F5B900]"
                    placeholder="babatunde@example.ng"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-gray-300 mb-1">
                  Special Requests / Dietary Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#1C1B1B] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#F5B900]"
                  placeholder="e.g. Quiet booth, extra flowers on table, gluten-free options"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-white/10 bg-[#1C1B1B] flex items-center justify-between">
              <button
                type="button"
                onClick={closeReservation}
                className="text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-[#242323] bg-gradient-to-r from-[#F5B900] via-[#FFCE3B] to-[#D99A25] hover:brightness-110 shadow-gold-glow flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Reserving Table...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Confirm Table Reservation</span>
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
