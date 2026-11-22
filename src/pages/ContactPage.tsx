import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Send,
  MessageCircle,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { RESTAURANT_BRANCHES, FAQS } from '../data/menuData';
import { useRestaurant } from '../context/RestaurantContext';

export default function ContactPage() {
  const { showToast } = useRestaurant();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('Table Reservations & VIP Dining');
  const [branch, setBranch] = useState('Victoria Island Flagship');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      showToast('Thank you! Your message has reached our VIP Concierge team.');
    }, 900);
  };

  return (
    <div className="bg-[#242323] text-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative py-28 md:py-36 bg-[#1A1919] overflow-hidden border-b border-[#F5B900]/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F5B900]/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#242323] border border-[#F5B900]/40 text-xs font-semibold uppercase tracking-widest text-[#F5B900] mb-6 shadow-gold-subtle">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect With PRECIOUS</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            We Are At Your Service in Lagos &amp; Abuja
          </h1>

          <p className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Whether booking a candlelit table, ordering fast food delivery, or hosting a state banquet, our concierge is available 24/7.
          </p>
        </div>
      </section>

      {/* 2. THREE BRANCHES SHOWCASE */}
      <section className="py-20 md:py-28 bg-[#242323]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A25]">
              Prime Locations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Visit Our Dining Sanctuaries
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RESTAURANT_BRANCHES.map((b) => (
              <div
                key={b.id}
                className="bg-[#1C1B1B] rounded-2xl overflow-hidden border border-white/10 hover:border-[#F5B900]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-gold-subtle"
              >
                {/* Branch Image */}
                <div className="relative h-60 overflow-hidden bg-black/40">
                  <img
                    src={b.image}
                    alt={b.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1B] via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#242323]/90 backdrop-blur-md border border-[#F5B900]/40 text-[#F5B900] text-xs font-bold">
                    {b.city} • {b.area}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#F5B900] transition-colors">
                      {b.name}
                    </h3>

                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#F5B900] flex-shrink-0 mt-0.5" />
                        <span>{b.address}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-[#F5B900] flex-shrink-0" />
                        <a
                          href={`tel:${b.phone}`}
                          className="hover:text-[#F5B900] transition-colors"
                        >
                          {b.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-[#F5B900] flex-shrink-0" />
                        <a
                          href={`mailto:${b.email}`}
                          className="hover:text-[#F5B900] transition-colors"
                        >
                          {b.email}
                        </a>
                      </div>

                      <div className="flex items-start gap-2.5 pt-1">
                        <Clock className="w-4 h-4 text-[#F5B900] flex-shrink-0 mt-0.5" />
                        <div>
                          <div>{b.openingHours}</div>
                          <div className="text-[#43852C] font-semibold">{b.fastFoodHours}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amenities Tags */}
                  <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                    {b.features.map((feat, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-[#282727] text-[10px] text-gray-300 border border-white/5"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* WhatsApp Quick Chat */}
                  <div className="pt-3 border-t border-white/5">
                    <a
                      href={`https://wa.me/23480077324687?text=Hello%20PRECIOUS%20Concierge,%20inquiring%20about%20your%20${encodeURIComponent(b.name)}%20location.`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#282727] hover:bg-[#F5B900] hover:text-[#242323] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>Chat with Branch Host</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM & HOTLINES */}
      <section className="py-20 md:py-28 bg-[#1E1D1D] border-y border-[#F5B900]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Col: Contact Info & Hotline Details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A25]">
                  Get In Touch
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  Direct Line to Our Hospitality Team
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                  Have a question regarding custom catering, corporate dining accounts, or need immediate assistance with an active delivery?
                </p>
              </div>

              {/* Quick Contacts */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#242323] border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5B900]/15 flex items-center justify-center text-[#F5B900]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      Toll-Free Reservation &amp; Hotline
                    </span>
                    <a
                      href="tel:+23480077324687"
                      className="block text-sm sm:text-base font-bold text-white hover:text-[#F5B900] transition-colors"
                    >
                      +234 800 PRECIOUS (773 24687)
                    </a>
                    <span className="text-[11px] text-gray-400">Available 24 Hours Daily</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#242323] border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366]">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      Instant WhatsApp VIP Host
                    </span>
                    <a
                      href="https://wa.me/23480077324687"
                      target="_blank"
                      rel="noreferrer"
                      className="block text-sm sm:text-base font-bold text-white hover:text-[#F5B900] transition-colors"
                    >
                      Chat Live on WhatsApp
                    </a>
                    <span className="text-[11px] text-[#43852C] font-semibold">Average Response &lt; 2 Mins</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#242323] border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D99A25]/15 flex items-center justify-center text-[#D99A25]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      Official Inquiries &amp; Events
                    </span>
                    <a
                      href="mailto:concierge@preciousrestaurant.ng"
                      className="block text-sm sm:text-base font-bold text-white hover:text-[#F5B900] transition-colors"
                    >
                      concierge@preciousrestaurant.ng
                    </a>
                    <span className="text-[11px] text-gray-400">Banquet &amp; Media Desks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Contact Form */}
            <div className="lg:col-span-7 bg-[#242323] p-8 sm:p-10 rounded-3xl border border-[#F5B900]/30 shadow-2xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#43852C]/20 border border-[#43852C] flex items-center justify-center mx-auto text-[#43852C]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Message Delivered to Concierge
                  </h3>
                  <p className="text-xs text-gray-300 max-w-sm mx-auto">
                    Thank you, <strong>{fullName}</strong>. Your inquiry has been routed to our <strong>{department}</strong> desk. We will respond via email or phone within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#1C1B1B] text-xs font-semibold text-gray-300 hover:text-white border border-white/10"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                    Send Us an Inquiry
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-1 font-medium">Your Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#1C1B1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                        placeholder="Chief Adeleke Adeleke"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1 font-medium">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#1C1B1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                        placeholder="adeleke@example.ng"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-1 font-medium">Phone Number (+234)</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#1C1B1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                        placeholder="+234 803 123 4567"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1 font-medium">Preferred Branch</label>
                      <select
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full bg-[#1C1B1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                      >
                        <option value="Victoria Island Flagship">Victoria Island, Lagos</option>
                        <option value="Lekki Waterfront">Lekki Phase 1, Lagos</option>
                        <option value="Maitama Abuja Lounge">Maitama, Abuja</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1 font-medium">Department / Nature of Inquiry</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-[#1C1B1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                    >
                      <option value="Table Reservations & VIP Dining">Table Reservations &amp; VIP Dining</option>
                      <option value="Fast Food Express Delivery">Fast Food Express Delivery &amp; Takeaway</option>
                      <option value="Royal Banquets & Event Catering">Royal Banquets &amp; Event Catering</option>
                      <option value="Private In-Residence Chef">Private In-Residence Chef Booking</option>
                      <option value="Corporate Accounts & Boardroom Dining">Corporate Accounts &amp; Boardroom Dining</option>
                      <option value="Press, Media & Partnerships">Press, Media &amp; Partnerships</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1 font-medium">Your Message / Request</label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#1C1B1B] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5B900]"
                      placeholder="Share details of your inquiry..."
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-[#242323] bg-gradient-to-r from-[#F5B900] via-[#FFCE3B] to-[#D99A25] hover:brightness-110 shadow-gold-glow flex items-center justify-center gap-2 transition-all"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message to Concierge</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE FAQS ACCORDION */}
      <section className="py-20 md:py-28 bg-[#242323]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A25]">
              Common Inquiries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#1C1B1B] rounded-2xl border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-white/5 transition-colors"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#F5B900] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
