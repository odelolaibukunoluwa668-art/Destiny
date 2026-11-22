import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/menuData';

export default function HomeTestimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const item = TESTIMONIALS[currentIdx];

  return (
    <section className="py-20 md:py-28 bg-[#242323] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A25]">
            Guest Impressions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Loved by Lagos, Celebrated in Abuja
          </h2>
          <p className="text-sm text-gray-400 font-light">
            Hear from distinguished patrons, business leaders, and culinary critics who make PRECIOUS their dining haven.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto bg-[#1C1B1B] rounded-3xl p-8 sm:p-12 border border-[#F5B900]/30 shadow-2xl relative">
          <Quote className="w-12 h-12 text-[#F5B900]/20 absolute top-8 right-8 pointer-events-none" />

          {/* Rating */}
          <div className="flex items-center gap-1 text-[#F5B900] mb-6">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#F5B900]" />
            ))}
          </div>

          {/* Quote Text */}
          <blockquote className="font-serif text-lg sm:text-2xl text-white leading-relaxed font-normal mb-8">
            "{item.review}"
          </blockquote>

          {/* Author Details & Favorite Dish */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-4">
              <img
                src={item.avatar}
                alt={item.author}
                className="w-13 h-13 rounded-full object-cover border-2 border-[#F5B900]"
              />
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>{item.author}</span>
                  {item.verifiedGuest && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#43852C]" />
                  )}
                </h4>
                <p className="text-xs text-gray-400">{item.role}</p>
                <p className="text-[11px] text-[#D99A25]">{item.location}</p>
              </div>
            </div>

            <div className="bg-[#242323] px-3.5 py-2 rounded-xl border border-white/5 self-start sm:self-center">
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                Favorite Dish:
              </span>
              <span className="text-xs font-semibold text-[#F5B900]">
                {item.favoriteDish}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 mt-8 justify-end">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-[#242323] hover:bg-[#F5B900] hover:text-[#242323] text-white border border-white/10 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-[#242323] hover:bg-[#F5B900] hover:text-[#242323] text-white border border-white/10 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
