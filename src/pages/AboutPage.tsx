import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Flame,
  Award,
  ShieldCheck,
  Globe,
  Users,
  Clock,
  Heart,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { CHEF_TEAM, RESTAURANT_BRANCHES } from '../data/menuData';
import { useRestaurant } from '../context/RestaurantContext';

export default function AboutPage() {
  const { openReservation } = useRestaurant();

  return (
    <div className="bg-[#242323] text-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative py-28 md:py-36 bg-[#1A1919] overflow-hidden border-b border-[#F5B900]/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F5B900]/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#242323] border border-[#F5B900]/40 text-xs font-semibold uppercase tracking-widest text-[#F5B900] mb-6 shadow-gold-subtle">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The PRECIOUS Heritage</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Where Nigerian Heritage Meets Culinary Elegance
          </h1>

          <p className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Founded with a passion to celebrate the majestic depth of African gastronomy alongside global continental, Chinese wok, and fast food mastery.
          </p>
        </div>
      </section>

      {/* 2. THE FOUNDING STORY */}
      <section className="py-20 md:py-28 bg-[#242323]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Story Image Grid */}
            <div className="grid grid-cols-2 gap-4 relative">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-white/10 h-64 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                    alt="Precision Cooking"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-[#F5B900]/30 h-48 shadow-gold-subtle bg-[#1C1B1B] p-6 flex flex-col justify-center">
                  <span className="font-serif text-3xl font-bold text-[#F5B900]">12+</span>
                  <span className="text-xs uppercase tracking-wider text-gray-300 font-semibold mt-1">
                    Years of Culinary Excellence in Nigeria
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden border border-[#F5B900]/30 h-48 shadow-gold-subtle bg-[#1C1B1B] p-6 flex flex-col justify-center">
                  <span className="font-serif text-3xl font-bold text-[#F5B900]">350k+</span>
                  <span className="text-xs uppercase tracking-wider text-gray-300 font-semibold mt-1">
                    Discerning Diners &amp; Banquets Hosted
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10 h-64 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                    alt="Luxury Ambiance"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A25]">
                Our Genesis &amp; Vision
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Born in Nigeria, Designed for the World
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
                PRECIOUS began with an audacious premise: Nigerian food deserves to be celebrated with the utmost luxury, technique, and reverence. We set out to prove that native delicacies—the smoky resonance of wood-fired Jollof, the herbal complexity of Uziza and Egusi, the fierce heat of Cameroonian pepper—could stand shoulder-to-shoulder with the finest dry-aged steaks in Paris and imperial wok creations in Hong Kong.
              </p>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
                At the same time, we recognized modern life’s tempo. We established our state-of-the-art <strong>Fast Food Express Hubs</strong>, ensuring that whether you sit down for a three-course VIP dinner or order a double Wagyu burger and golden meat pie for home delivery, the standard remains uncompromisingly regal.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#43852C]" />
                  <span>Farm-traceable ingredients</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#43852C]" />
                  <span>100% Halal certified meats</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#43852C]" />
                  <span>Zero artificial flavor pastes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#43852C]" />
                  <span>24/7 fast food express dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MEET OUR CULINARY MASTERS */}
      <section className="py-20 md:py-28 bg-[#1E1D1D] border-y border-[#F5B900]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A25]">
              The Artisans Behind The Fire
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Meet Our Executive Chef Brigade
            </h2>
            <p className="text-sm text-gray-400 font-light">
              Every dish is orchestrated by culinary visionaries combining decades of Michelin-caliber training with native generational mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CHEF_TEAM.map((chef) => (
              <div
                key={chef.id}
                className="bg-[#242323] rounded-2xl overflow-hidden border border-white/10 hover:border-[#F5B900]/50 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                {/* Chef Image */}
                <div className="relative h-72 overflow-hidden bg-black/40">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#242323] via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#242323]/80 backdrop-blur-md border border-[#F5B900]/40 text-[#F5B900] text-[10px] font-bold">
                    {chef.experienceYears} Years Exp.
                  </span>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99A25]">
                      {chef.role}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#F5B900] transition-colors">
                      {chef.name}
                    </h3>
                    <p className="text-xs text-[#F5B900] font-medium">
                      Specialty: {chef.specialty}
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed pt-1">
                      {chef.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">
                      Signature Creation:
                    </span>
                    <span className="text-xs font-semibold text-gray-200">
                      {chef.signatureDish}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR DINING SPACES & ARCHITECTURE */}
      <section className="py-20 md:py-28 bg-[#242323]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A25]">
              Atmosphere &amp; Design
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Spaces Designed for Intimacy &amp; Royalty
            </h2>
            <p className="text-sm text-gray-300 font-light">
              Deep charcoal panels, warm brushed gold chandeliers, sound-dampened acoustic serenity, and bespoke velvet seating ensure your dining privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1C1B1B] rounded-2xl overflow-hidden border border-white/10 hover:border-[#F5B900]/40 transition-all">
              <div className="h-60 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                  alt="The Gold Salon"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-xl font-bold text-white">
                  The Royal Salon (Victoria Island)
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Our flagship dining sanctum in Victoria Island featuring 24-karat gold leaf motifs, sommelier wine display, and private dining alcoves.
                </p>
              </div>
            </div>

            <div className="bg-[#1C1B1B] rounded-2xl overflow-hidden border border-white/10 hover:border-[#F5B900]/40 transition-all">
              <div className="h-60 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
                  alt="Waterfront Terrace"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-xl font-bold text-white">
                  Waterfront Terrace (Lekki Phase 1)
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Sweeping Atlantic breeze, open-sky cocktail lounges, and live jazz saxophonists performing every Friday and Saturday evening.
                </p>
              </div>
            </div>

            <div className="bg-[#1C1B1B] rounded-2xl overflow-hidden border border-white/10 hover:border-[#F5B900]/40 transition-all">
              <div className="h-60 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80"
                  alt="Diplomatic Lounge"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-xl font-bold text-white">
                  Diplomatic Suites (Maitama, Abuja)
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Executive conference suites, secured armed VIP escort protocol, and discreet private tables favored by ambassadors and state ministers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="py-20 bg-gradient-to-r from-[#1C1B1B] via-[#2D2B2B] to-[#1C1B1B] border-t border-[#F5B900]/20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Experience the Magic of PRECIOUS Tonight
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light">
            Whether for a celebratory banquet or a fast gourmet delivery to your doorstep, our chefs are ready to serve you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openReservation()}
              className="px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-[#242323] bg-gradient-to-r from-[#F5B900] to-[#D99A25] hover:brightness-110 shadow-gold-glow flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>

            <Link
              to="/menu"
              className="px-8 py-4 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-[#242323] hover:bg-[#323030] border border-[#F5B900]/40 flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-[#F5B900]" />
              <span>Explore The Menu</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
