import React from 'react';
import HomeHero from '../components/HomeHero';
import HomeIntro from '../components/HomeIntro';
import HomeMenuSection from '../components/HomeMenuSection';
import HomeSpotlight from '../components/HomeSpotlight';
import HomeReservationWidget from '../components/HomeReservationWidget';
import HomeTestimonials from '../components/HomeTestimonials';
import HomeGallery from '../components/HomeGallery';

export default function HomePage() {
  return (
    <div className="bg-[#242323] text-white min-h-screen">
      {/* 1. Cinematic Hero Section */}
      <HomeHero />

      {/* 2. Brand Story & The Four Culinary Realms */}
      <HomeIntro />

      {/* 3. Signature Food Menu Section (With dishes from flyer) */}
      <HomeMenuSection />

      {/* 4. Chef's Specialty Spotlight (Royal Jollof & Asun) */}
      <HomeSpotlight />

      {/* 5. Interactive Table & Salon Reservation Widget */}
      <HomeReservationWidget />

      {/* 6. Guest Impressions & Dignitary Testimonials */}
      <HomeTestimonials />

      {/* 7. Instagram Culinary Gallery & Visual Showcase */}
      <HomeGallery />
    </div>
  );
}
