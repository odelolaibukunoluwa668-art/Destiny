import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  UtensilsCrossed,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Globe,
  Coffee,
} from 'lucide-react';

const REALMS = [
  {
    id: 'african',
    title: 'African Heritage Delicacies',
    subtitle: 'NATIVE SOUP & WOOD-FIRED GRILLS',
    description:
      'Smoky party jollof, velvety pounded yam with assorted egusi, crunchy seafood okra loaded with crab claws, and slow-charred peppered goat meat (asun).',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    link: '/menu?category=african',
    badge: 'Royal Heritage',
  },
  {
    id: 'fast-food',
    title: 'Gourmet Fast Food & Takeaway',
    subtitle: '24/7 EXPRESS DISPATCH HUB',
    description:
      'Double smashed Wagyu truffle burgers, loaded Lagos chicken shawarma, golden meat pies, and crispy chicken wings tossed in spicy honey-sriracha glaze.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    link: '/menu?category=fast-food',
    badge: '24/7 Available',
  },
  {
    id: 'continental',
    title: 'Continental Prime Cuts & Pastas',
    subtitle: 'PRECISION STEAKS & SEAFOOD',
    description:
      'Aged prime sirloin steak seared over embers with garlic-thyme butter, pan-crisped Norwegian salmon, and creamy artisanal pastas finished with aged parmesan.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    link: '/menu?category=continental',
    badge: 'Haute Cuisine',
  },
  {
    id: 'chinese',
    title: 'Imperial Chinese & Wok Hei',
    subtitle: 'HIGH-HEAT CANTONESE ARTISTRY',
    description:
      'High-heat wok-fried rice with jumbo prawns, tingly Szechuan fiery beef, sweet & sour chicken, and handcrafted bamboo-steamed dim sum baskets.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    link: '/menu?category=chinese',
    badge: 'Wok Master',
  },
];

export default function HomeIntro() {
  return (
    <section className="py-20 md:py-28 bg-[#242323] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1B1B] border border-[#F5B900]/30 text-xs font-semibold uppercase tracking-widest text-[#F5B900]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The PRECIOUS Gastronomy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Four Culinary Realms. One Unrivaled Destination.
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
            Founded in Nigeria with an obsession for culinary perfection, PRECIOUS honors the vibrant spices of African heritage alongside international continental, fast food, and pan-Asian disciplines.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REALMS.map((realm) => (
            <Link
              key={realm.id}
              to={realm.link}
              className="group relative rounded-2xl overflow-hidden bg-[#1C1B1B] border border-white/10 hover:border-[#F5B900]/50 transition-all duration-500 flex flex-col justify-between shadow-lg hover:shadow-gold-subtle"
            >
              {/* Image Container */}
              <div className="relative h-52 overflow-hidden bg-black/40">
                <img
                  src={realm.image}
                  alt={realm.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1B] via-transparent to-transparent" />
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#242323]/80 backdrop-blur-md border border-[#F5B900]/40 text-[#F5B900] text-[10px] font-bold uppercase tracking-wider">
                  {realm.badge}
                </span>
              </div>

              {/* Text Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99A25]">
                    {realm.subtitle}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#F5B900] transition-colors">
                    {realm.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {realm.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#F5B900] group-hover:translate-x-1 transition-transform">
                  <span>Explore Dishes</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quality Pillars Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#1C1B1B] border border-[#F5B900]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5B900]/15 flex items-center justify-center text-[#F5B900]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Halal</h4>
              <p className="text-[11px] text-gray-400">Strictly certified meats</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#43852C]/15 flex items-center justify-center text-[#43852C]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Farm Fresh</h4>
              <p className="text-[11px] text-gray-400">Locally harvested daily</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5B900]/15 flex items-center justify-center text-[#F5B900]">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Wok &amp; Hearth</h4>
              <p className="text-[11px] text-gray-400">Traditional charcoal fire</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D99A25]/15 flex items-center justify-center text-[#D99A25]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Master Chefs</h4>
              <p className="text-[11px] text-gray-400">International pedigree</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
