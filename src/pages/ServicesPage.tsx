import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UtensilsCrossed,
  Flame,
  Truck,
  Crown,
  Sparkles,
  Building,
  Check,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  Send,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { SERVICES_LIST } from '../data/menuData';
import { useRestaurant } from '../context/RestaurantContext';

export default function ServicesPage() {
  const { openReservation, showToast } = useRestaurant();

  // Quote Request State
  const [eventType, setEventType] = useState('Luxury Wedding Reception');
  const [guestCount, setGuestCount] = useState('100 - 250 Guests');
  const [cuisineChoice, setCuisineChoice] = useState('All Four Cuisines (Full Banquet)');
  const [eventDate, setEventDate] = useState('2026-12-15');
  const [eventLocation, setEventLocation] = useState('Victoria Island / Ikoyi, Lagos');
  const [clientName, setClientName] = useState('Lady Folake Danjuma');
  const [clientPhone, setClientPhone] = useState('+234 802 345 6789');
  const [clientEmail, setClientEmail] = useState('folake.danjuma@luxurygroup.ng');
  const [notes, setNotes] = useState('Need live Suya grill station and four-course seated dinner.');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setQuoteSubmitted(true);
      setIsSubmitting(false);
      showToast('Catering inquiry submitted! Our Banquet Director will contact you within 2 hours.');
    }, 1000);
  };

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-[#F5B900]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#F5B900]" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-[#F5B900]" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-[#F5B900]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#F5B900]" />;
      case 'Building':
        return <Building className="w-6 h-6 text-[#F5B900]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#F5B900]" />;
    }
  };

  return (
    <div className="bg-[#242323] text-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative py-28 md:py-36 bg-[#1A1919] overflow-hidden border-b border-[#F5B900]/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F5B900]/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#242323] border border-[#F5B900]/40 text-xs font-semibold uppercase tracking-widest text-[#F5B900] mb-6 shadow-gold-subtle">
            <Crown className="w-3.5 h-3.5" />
            <span>Bespoke Hospitality</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Exceptional Culinary Services Tailored to Every Occasion
          </h1>

          <p className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            From regal dine-in salons and 24/7 fast food express delivery to full-scale event catering and private master chefs in your home.
          </p>
        </div>
      </section>

      {/* 2. SERVICES SHOWCASE GRID */}
      <section className="py-20 md:py-28 bg-[#242323]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A25]">
              Full Spectrum Catering &amp; Hospitality
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Six Pillars of Service Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_LIST.map((service) => (
              <div
                key={service.id}
                className="bg-[#1C1B1B] rounded-2xl overflow-hidden border border-white/10 hover:border-[#F5B900]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-gold-subtle"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-black/40">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1B] via-transparent to-transparent pointer-events-none" />

                  {service.badge && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#242323]/90 backdrop-blur-md border border-[#F5B900]/40 text-[#F5B900] text-[10px] font-bold uppercase tracking-wider">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-[#282727] border border-[#F5B900]/30 flex items-center justify-center mb-2">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#F5B900] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {service.longDescription}
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  <div className="pt-3 border-t border-white/5 space-y-2 text-xs text-gray-300">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#F5B900] flex-shrink-0 mt-0.5" />
                        <span className="text-[11px]">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-white/5">
                    {service.id === 'fine-dining' ? (
                      <button
                        onClick={() => openReservation()}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#282727] hover:bg-[#F5B900] hover:text-[#242323] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Reserve Dining Salon</span>
                      </button>
                    ) : service.id === 'fast-food-express' || service.id === 'hot-doorstep-delivery' ? (
                      <Link
                        to="/menu"
                        className="w-full py-2.5 px-4 rounded-xl bg-[#282727] hover:bg-[#F5B900] hover:text-[#242323] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                      >
                        <Flame className="w-3.5 h-3.5" />
                        <span>Order For Delivery / Takeaway</span>
                      </Link>
                    ) : (
                      <a
                        href="#catering-quote"
                        className="w-full py-2.5 px-4 rounded-xl bg-[#282727] hover:bg-[#F5B900] hover:text-[#242323] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Request Custom Proposal</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE BANQUET & CATERING PROPOSAL FORM */}
      <section id="catering-quote" className="py-20 md:py-28 bg-[#1E1D1D] border-t border-[#F5B900]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#242323] rounded-3xl p-8 sm:p-12 border border-[#F5B900]/30 shadow-2xl relative overflow-hidden">
            <div className="space-y-3 mb-8 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A25]">
                Plan Your Milestone Celebration
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Request a Royal Catering Consultation
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 font-light">
                Our Banquet Director will assemble a bespoke four-course proposal, mobile kitchen setup, and waitstaff schedule for your review.
              </p>
            </div>

            {quoteSubmitted ? (
              <div className="p-8 text-center bg-[#1C1B1B] rounded-2xl border border-[#43852C] space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#43852C]/20 border border-[#43852C] flex items-center justify-center mx-auto text-[#43852C]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Proposal Request Dispatched
                </h3>
                <p className="text-xs text-gray-300 max-w-md mx-auto">
                  Thank you, <strong>{clientName}</strong>. Our Catering Director has received your specifications for <strong>{eventType}</strong> ({guestCount}) on <strong>{eventDate}</strong>. We will reach out to <strong>{clientPhone}</strong> promptly.
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/23480077324687?text=Hello%20PRECIOUS%20Catering%20Director,%20I%20just%20submitted%20a%20banquet%20inquiry."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F5B900] to-[#D99A25] text-[#242323] text-xs font-bold uppercase tracking-wider shadow-gold-glow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Speed Up via WhatsApp Concierge</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-5 text-xs">
                {/* Event Type & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-1.5 font-medium">Event Type</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-[#1C1B1B] border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-[#F5B900]"
                    >
                      <option value="Luxury Wedding Reception">Luxury Wedding Reception</option>
                      <option value="State / Diplomatic Banquet">State / Diplomatic Banquet</option>
                      <option value="Corporate Gala & Awards">Corporate Gala &amp; Awards</option>
                      <option value="Milestone Birthday Soirée">Milestone Birthday Soirée</option>
                      <option value="Private In-Residence Chef Dinner">Private In-Residence Chef Dinner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1.5 font-medium">Expected Guest Count</label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full bg-[#1C1B1B] border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-[#F5B900]"
                    >
                      <option value="10 - 30 Guests (Private Dining)">10 - 30 Guests (Private Salon)</option>
                      <option value="50 - 100 Guests">50 - 100 Guests</option>
                      <option value="100 - 250 Guests">100 - 250 Guests</option>
                      <option value="250 - 500 Guests">250 - 500 Guests</option>
                      <option value="500 - 2,000+ Guests (Royal Scale)">500 - 2,000+ Guests (Mega Banquet)</option>
                    </select>
                  </div>
                </div>

                {/* Date & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-1.5 font-medium">Event Date</label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-[#1C1B1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1.5 font-medium">Venue City &amp; Area</label>
                    <input
                      type="text"
                      required
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      className="w-full bg-[#1C1B1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                      placeholder="e.g. Landmark Centre, VI Lagos or Transcorp Hilton Abuja"
                    />
                  </div>
                </div>

                {/* Cuisine Preference */}
                <div>
                  <label className="block text-gray-300 mb-1.5 font-medium">Desired Cuisine Selection</label>
                  <select
                    value={cuisineChoice}
                    onChange={(e) => setCuisineChoice(e.target.value)}
                    className="w-full bg-[#1C1B1B] border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-[#F5B900]"
                  >
                    <option value="All Four Cuisines (Full Banquet)">All Four Cuisines (African, Continental, Chinese &amp; Fast Food stations)</option>
                    <option value="African Heritage & Live Suya Grills">African Heritage &amp; Live Suya Charcoal Grills</option>
                    <option value="Continental Steaks & Gourmet Pastas">Continental Fine Steaks &amp; Artisanal Pastas</option>
                    <option value="Pan-Asian Wok & Dim Sum Bar">Pan-Asian Live Wok &amp; Dim Sum Steamer Bar</option>
                    <option value="Gourmet Fast Food Live Burger & Shawarma Bar">Gourmet Fast Food Live Burger &amp; Shawarma Bar</option>
                  </select>
                </div>

                {/* Client Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-gray-300 mb-1.5 font-medium">Your Name</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[#1C1B1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                      placeholder="e.g. Lady Folake Danjuma"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1.5 font-medium">Phone (+234)</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-[#1C1B1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                      placeholder="+234 802 345 6789"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1.5 font-medium">Email Address</label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-[#1C1B1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                      placeholder="folake@example.ng"
                    />
                  </div>
                </div>

                {/* Special Notes */}
                <div>
                  <label className="block text-gray-300 mb-1.5 font-medium">
                    Special Vision or Specific Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#1C1B1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                    placeholder="Tell us about your event theme, dietary requirements, champagne pairings, or live station desires."
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <p className="text-[11px] text-gray-400">
                    * Zero obligation. Complete custom quotation within 2 business hours.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-[#242323] bg-gradient-to-r from-[#F5B900] via-[#FFCE3B] to-[#D99A25] hover:brightness-110 shadow-gold-glow flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Catering Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
