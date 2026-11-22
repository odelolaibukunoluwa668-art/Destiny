import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'A Royal Symphony of Flavors',
    subtitle: 'AUTHENTIC AFRICAN • FAST FOOD • CONTINENTAL • CHINESE',
    description:
      'Indulge in Nigeria’s premier luxury dining house. From firewood-style smoky Jollof and prime aged sirloin steaks to gourmet 24/7 fast food and wok-fired pan-Asian artistry.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85',
    featuredDish: 'Prime Sirloin Steak & Herb Butter',
    dishPriceUSD: 11,
    dishPriceNGN: 16500,
    tag: 'Chef’s Signature',
  },
  {
    id: 2,
    title: 'Nigeria’s Legendary Smoky Jollof Royale',
    subtitle: 'NATIVE HERITAGE MEETS HAUTE CUISINE',
    description:
      'Slow-simmered in fire-roasted plum peppers, seasoned with secret Cameroonian spices, served with caramelized dodo and fork-tender peppered goat meat.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=85',
    featuredDish: 'PRECIOUS Royal Jollof Platter',
    dishPriceUSD: 14,
    dishPriceNGN: 11000,
    tag: '#1 Bestseller',
  },
  {
    id: 3,
    title: 'Gourmet Fast Food Delivered In 35 Mins',
    subtitle: 'VICTORIA ISLAND • LEKKI • MAITAMA ABUJA',
    description:
      'Craving late-night excellence? Savor double smashed Wagyu burgers, loaded Lagos shawarma, and golden crispy chicken wings dispatched hot 24/7.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=85',
    featuredDish: 'PRECIOUS Royal Truffle Burger',
    dishPriceUSD: 11,
    dishPriceNGN: 9500,
    tag: '24/7 Express Dispatch',
  },
];

export default function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { openReservation, formatPrice } = useRestaurant();

  // Slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative min-h-[90vh] md:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#242323]">
      {/* Background Images with Crossfade */}
      {HERO_SLIDES.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-105"
          />
        </div>
      ))}

      {/* Atmospheric Charcoal & Gold Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#242323] via-black/40 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(36,35,35,0.7)_100%)] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full z-10 flex flex-col items-center text-center">
        {/* Rating & Location Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1B1B]/80 border border-[#F5B900]/40 backdrop-blur-md mb-6 shadow-gold-subtle animate-fade-in">
          <div className="flex items-center text-[#F5B900]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#F5B900]" />
            ))}
          </div>
          <span className="text-xs font-semibold text-white tracking-wide">
            4.9 / 5.0 Rating
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-xs text-[#D99A25] font-semibold">
            Lagos &amp; Abuja, Nigeria
          </span>
        </div>

        {/* Category Subtitle */}
        <div className="text-[11px] sm:text-xs font-bold tracking-[0.28em] uppercase text-[#F5B900] mb-3">
          {slide.subtitle}
        </div>

        {/* Main Display Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.08] max-w-5xl mb-6">
          {slide.title}
        </h1>

        {/* Supporting Paragraph */}
        <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          {slide.description}
        </p>

        {/* Interactive CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Order Online Primary Button */}
          <Link
            to="/menu"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-[#242323] bg-gradient-to-r from-[#F5B900] via-[#FFCE3B] to-[#D99A25] hover:brightness-110 shadow-gold-glow flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
          >
            <Flame className="w-4 h-4 fill-[#242323]" />
            <span>Order Food Online</span>
          </Link>

          {/* Book a Table Secondary Button */}
          <button
            onClick={() => openReservation()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-xs uppercase tracking-widest text-white bg-[#1C1B1B]/80 hover:bg-[#1C1B1B] border border-[#F5B900]/50 hover:border-[#F5B900] backdrop-blur-md flex items-center justify-center gap-2.5 transition-all hover:text-[#F5B900]"
          >
            <Calendar className="w-4 h-4 text-[#F5B900]" />
            <span>Book a Table</span>
          </button>
        </div>

        {/* Featured Dish Floating Preview Pill */}
        <div className="mt-12 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-xs text-gray-300">
          <span className="w-2 h-2 rounded-full bg-[#43852C] animate-pulse" />
          <span>
            Today’s Spotlight:{' '}
            <strong className="text-white font-medium">{slide.featuredDish}</strong>
          </span>
          <span className="text-[#F5B900] font-bold">
            {formatPrice(slide.dishPriceUSD, slide.dishPriceNGN)}
          </span>
          <span className="text-[10px] bg-[#F5B900]/20 text-[#F5B900] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            {slide.tag}
          </span>
        </div>

        {/* Slide Controls Dots */}
        <div className="flex items-center gap-2 mt-8">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all rounded-full ${
                idx === currentSlide
                  ? 'w-8 bg-[#F5B900]'
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={() =>
          setCurrentSlide(
            (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
          )
        }
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-[#F5B900] hover:text-[#242323] text-white border border-white/10 items-center justify-center transition-all z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-[#F5B900] hover:text-[#242323] text-white border border-white/10 items-center justify-center transition-all z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Gold Hairline */}
      <div className="absolute bottom-0 inset-x-0 gold-hairline z-20" />
    </section>
  );
}
