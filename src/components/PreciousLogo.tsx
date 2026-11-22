import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'header' | 'footer' | 'compact' | 'light';
  className?: string;
  showSubtitle?: boolean;
}

export default function PreciousLogo({
  variant = 'header',
  className = '',
  showSubtitle = true,
}: LogoProps) {
  const isFooter = variant === 'footer';

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-3.5 group focus:outline-none ${className}`}
      aria-label="PRECIOUS Restaurant & Fast Food Home"
    >
      {/* Visual Luxury Culinary Emblem */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        {/* Outer Golden Aura */}
        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#F5B900] via-[#D99A25] to-[#8C5E0E] p-[1.5px] transition-transform duration-500 group-hover:scale-105 shadow-gold-glow">
          <div className="w-full h-full rounded-[10px] bg-[#242323] flex items-center justify-center relative overflow-hidden">
            {/* Subtle radial inner glow */}
            <div className="absolute inset-0 bg-radial from-[#F5B900]/15 to-transparent pointer-events-none" />

            {/* Custom SVG Icon combining Royal Crown, Cloche & Monogram P */}
            <svg
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-[#F5B900] transition-colors duration-300"
            >
              {/* Cloche Dome Arc */}
              <path
                d="M10 28C10 21.3726 15.3726 16 22 16C28.6274 16 34 21.3726 34 28"
                stroke="url(#goldGradient)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {/* Cloche Handle / Crown Peak */}
              <circle cx="22" cy="13" r="2.2" fill="url(#goldGradient)" />
              <path
                d="M20 14.5L24 14.5"
                stroke="url(#goldGradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Dish Rim Base */}
              <path
                d="M7 29.5C7 28.6716 7.67157 28 8.5 28H35.5C36.3284 28 37 28.6716 37 29.5C37 30.3284 36.3284 31 35.5 31H8.5C7.67157 31 7 30.3284 7 29.5Z"
                fill="url(#goldGradient)"
              />
              {/* Royal Monogram 'P' Centered */}
              <path
                d="M19 33V20H23.8C25.8 20 27.2 21.1 27.2 22.8C27.2 24.5 25.8 25.6 23.8 25.6H21.2V33H19ZM21.2 24H23.6C24.6 24 25.2 23.5 25.2 22.8C25.2 22.1 24.6 21.6 23.6 21.6H21.2V24Z"
                fill="#FFFFFF"
              />
              {/* Subtle Decorative Golden Sparks */}
              <circle cx="13" cy="18" r="0.8" fill="#F5B900" />
              <circle cx="31" cy="18" r="0.8" fill="#F5B900" />

              <defs>
                <linearGradient
                  id="goldGradient"
                  x1="7"
                  y1="13"
                  x2="37"
                  y2="33"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFECA8" />
                  <stop offset="0.5" stopColor="#F5B900" />
                  <stop offset="1" stopColor="#D99A25" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Typography Brand Name & Tagline */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-serif text-2xl md:text-3xl font-bold tracking-[0.12em] uppercase text-white transition-colors duration-300 group-hover:text-[#F5B900]">
            PRECIOUS
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F5B900] shadow-[0_0_8px_#F5B900]" />
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-2 -mt-0.5">
            <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.24em] uppercase text-[#D99A25] font-sans">
              RESTAURANT &amp; FAST FOOD
            </span>
            <span className="hidden sm:inline-block text-[8px] text-[#43852C] font-bold tracking-widest uppercase">
              • NIGERIA
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
