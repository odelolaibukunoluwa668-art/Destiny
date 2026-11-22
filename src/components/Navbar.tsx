import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  Calendar,
  Menu as MenuIcon,
  X,
  Phone,
  UtensilsCrossed,
  Flame,
  ChevronRight,
  Clock,
} from 'lucide-react';
import PreciousLogo from './PreciousLogo';
import { useRestaurant } from '../context/RestaurantContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const {
    cartCount,
    openCart,
    openSearch,
    openReservation,
    openCheckout,
  } = useRestaurant();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Menu', path: '/menu' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'glass-nav-scrolled py-3 shadow-luxury-elevation'
          : 'glass-nav-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex-shrink-0">
          <PreciousLogo variant="header" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-3.5 py-2 text-sm font-medium tracking-wide transition-all rounded-lg relative ${
                  isActive
                    ? 'text-[#F5B900] font-semibold'
                    : 'text-gray-200 hover:text-[#F5B900] hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-transparent via-[#F5B900] to-transparent rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Action Controls & CTAs */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5">
          {/* Live Search Trigger */}
          <button
            onClick={openSearch}
            className="p-2 text-gray-300 hover:text-[#F5B900] transition-colors rounded-lg hover:bg-white/5 focus:outline-none"
            aria-label="Search dishes and menu"
            title="Search dishes"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Book a Table Reservation Trigger (Desktop) */}
          <button
            onClick={() => openReservation()}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D99A25]/40 text-gray-200 text-xs font-medium tracking-wide hover:border-[#F5B900] hover:text-[#F5B900] hover:bg-[#F5B900]/10 transition-all focus:outline-none"
          >
            <Calendar className="w-3.5 h-3.5 text-[#F5B900]" />
            <span>Book Table</span>
          </button>

          {/* Shopping Cart Drawer Trigger with Live Animated Counter */}
          <button
            onClick={openCart}
            className="relative p-2.5 text-gray-200 hover:text-[#F5B900] transition-all rounded-lg hover:bg-white/5 focus:outline-none group"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-gradient-to-br from-[#F5B900] to-[#D99A25] text-[#242323] text-[11px] font-extrabold rounded-full flex items-center justify-center shadow-gold-glow animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Prominent Golden "Order Now" Button */}
          <Link
            to="/menu"
            className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-[#242323] bg-gradient-to-r from-[#F5B900] via-[#FFCE3B] to-[#D99A25] hover:brightness-110 shadow-gold-glow transition-all transform hover:-translate-y-0.5 focus:outline-none"
          >
            <Flame className="w-3.5 h-3.5 fill-[#242323]" />
            <span>Order Now</span>
          </Link>

          {/* Mobile Animated Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-200 hover:text-[#F5B900] focus:outline-none transition-colors rounded-lg hover:bg-white/5"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#F5B900]" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Animated Slide-down Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[70px] bottom-0 bg-[#242323]/98 backdrop-blur-2xl border-b border-[#F5B900]/25 z-50 overflow-y-auto px-6 py-6 flex flex-col justify-between shadow-2xl animate-fade-in">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#D99A25] font-semibold border-b border-white/10 pb-2">
              Navigation Menu
            </div>
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#F5B900]/20 to-transparent text-[#F5B900] font-semibold border-l-4 border-[#F5B900]'
                        : 'text-gray-200 hover:text-[#F5B900] hover:bg-white/5'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </NavLink>
              ))}
            </div>

            {/* Quick Action CTAs */}
            <div className="pt-4 space-y-3">
              <Link
                to="/menu"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm uppercase tracking-wider text-[#242323] bg-gradient-to-r from-[#F5B900] via-[#FFCE3B] to-[#D99A25] flex items-center justify-center gap-2 shadow-gold-glow"
              >
                <Flame className="w-4 h-4 fill-[#242323]" />
                <span>Order Online Now</span>
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openReservation();
                }}
                className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm tracking-wide text-white bg-[#323030] border border-[#D99A25]/40 hover:border-[#F5B900] flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#F5B900]" />
                <span>Book a Table (VIP &amp; Terrace)</span>
              </button>
            </div>
          </div>

          {/* Mobile Footer Info */}
          <div className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-400 space-y-2">
            <div className="flex items-center gap-2 text-gray-300">
              <Phone className="w-4 h-4 text-[#F5B900]" />
              <span>Hotline: +234 800 PRECIOUS (773 24687)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-4 h-4 text-[#43852C]" />
              <span>Fast Food 24/7 Delivery Hub Across Lagos &amp; Abuja</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
