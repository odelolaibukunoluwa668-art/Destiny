import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Send,
  Heart,
} from 'lucide-react';
import PreciousLogo from './PreciousLogo';
import { useRestaurant } from '../context/RestaurantContext';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useRestaurant();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    showToast('Welcome to the PRECIOUS Tasting Club! Check your inbox for your 10% welcome gift.');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#1C1B1B] text-white border-t border-[#F5B900]/20 relative overflow-hidden">
      {/* Decorative Gold Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-[#F5B900]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand Identity & Mission */}
          <div className="lg:col-span-2 space-y-5">
            <PreciousLogo variant="footer" />
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              PRECIOUS is Nigeria’s distinguished culinary house. We curate exceptional dining experiences fusing time-honored African traditions, gourmet fast food, prime continental steaks, and wok-fired pan-Asian artistry.
            </p>

            {/* Quality & Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2A2828] border border-[#F5B900]/30 text-xs text-gray-200">
                <ShieldCheck className="w-4 h-4 text-[#43852C]" />
                <span className="font-medium">100% Halal Certified</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2A2828] border border-[#F5B900]/30 text-xs text-gray-200">
                <Award className="w-4 h-4 text-[#F5B900]" />
                <span className="font-medium">HACCP Food Safety</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2B2A2A] hover:bg-[#F5B900] hover:text-[#242323] transition-colors flex items-center justify-center text-gray-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2B2A2A] hover:bg-[#F5B900] hover:text-[#242323] transition-colors flex items-center justify-center text-gray-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2B2A2A] hover:bg-[#F5B900] hover:text-[#242323] transition-colors flex items-center justify-center text-gray-300"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#F5B900] font-sans">
              Discover
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-[#F5B900] transition-colors">
                  Home Experience
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F5B900] transition-colors">
                  Our Culinary Story
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F5B900] transition-colors">
                  Bespoke Services &amp; Catering
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#F5B900] transition-colors">
                  Full Food Menu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F5B900] transition-colors">
                  Contact &amp; Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: The Four Cuisines */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#F5B900] font-sans">
              Our Cuisines
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/menu?category=african" className="hover:text-[#F5B900] transition-colors flex items-center gap-1.5">
                  <span className="text-xs text-[#D99A25]">❖</span> African Heritage Delicacies
                </Link>
              </li>
              <li>
                <Link to="/menu?category=fast-food" className="hover:text-[#F5B900] transition-colors flex items-center gap-1.5">
                  <span className="text-xs text-[#D99A25]">❖</span> Gourmet Fast Food &amp; Grills
                </Link>
              </li>
              <li>
                <Link to="/menu?category=continental" className="hover:text-[#F5B900] transition-colors flex items-center gap-1.5">
                  <span className="text-xs text-[#D99A25]">❖</span> Continental Prime Steaks
                </Link>
              </li>
              <li>
                <Link to="/menu?category=chinese" className="hover:text-[#F5B900] transition-colors flex items-center gap-1.5">
                  <span className="text-xs text-[#D99A25]">❖</span> Imperial Chinese &amp; Dim Sum
                </Link>
              </li>
              <li>
                <Link to="/menu?category=drinks" className="hover:text-[#F5B900] transition-colors flex items-center gap-1.5">
                  <span className="text-xs text-[#D99A25]">❖</span> Artisanal Zobo &amp; Cocktails
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Locations & VIP Concierge */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-[#F5B900] font-sans">
              Our Locations
            </h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="space-y-1">
                <span className="font-semibold text-white flex items-center gap-1 text-[#F5B900]">
                  <MapPin className="w-3.5 h-3.5" /> Victoria Island Flagship
                </span>
                <p className="text-gray-400 pl-4.5">14B Adetokunbo Ademola St, VI, Lagos</p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-white flex items-center gap-1 text-[#F5B900]">
                  <MapPin className="w-3.5 h-3.5" /> Lekki Phase 1 Waterfront
                </span>
                <p className="text-gray-400 pl-4.5">Plot 8 Admiralty Way, Lekki, Lagos</p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-white flex items-center gap-1 text-[#F5B900]">
                  <MapPin className="w-3.5 h-3.5" /> Maitama Diplomatic Lounge
                </span>
                <p className="text-gray-400 pl-4.5">22 Gana Street, Maitama, Abuja</p>
              </div>

              <div className="pt-2 text-[11px] text-[#43852C] font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Fast Food Express: Open 24/7 (Delivery Hub)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h5 className="font-serif text-lg font-bold text-white flex items-center gap-2 justify-center md:justify-start">
              <span>Join The PRECIOUS Tasting Club</span>
              <span className="text-xs font-sans px-2 py-0.5 rounded bg-[#F5B900]/20 text-[#F5B900] border border-[#F5B900]/40 uppercase tracking-wider">
                VIP Perks
              </span>
            </h5>
            <p className="text-xs text-gray-400">
              Receive secret off-menu releases, priority banquet invitations, and an instant 10% voucher.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex items-center max-w-md">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your VIP email address..."
              required
              className="bg-[#282727] text-white placeholder-gray-400 text-xs px-4 py-3 rounded-l-xl border border-[#F5B900]/30 focus:outline-none focus:border-[#F5B900] w-full sm:w-72"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#F5B900] to-[#D99A25] text-[#242323] px-5 py-3 rounded-r-xl font-bold text-xs uppercase tracking-wider hover:brightness-110 flex items-center gap-1.5 shadow-gold-glow flex-shrink-0"
            >
              <span>Join</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} PRECIOUS Restaurant &amp; Fast Food. All rights reserved. Nigeria.</p>
          <div className="flex items-center space-x-6 text-xs text-gray-400">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Food Hygiene Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
