import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RestaurantProvider } from './context/RestaurantContext';

// Components
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ReservationModal from './components/ReservationModal';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';
import ToastNotification from './components/ToastNotification';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

// Four Core Required Pages + Dedicated Menu Catalogue
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import MenuPage from './pages/MenuPage';

function MainApp() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#242323] text-white selection:bg-[#F5B900] selection:text-[#242323]">
      <ScrollToTop />

      {/* 1. Global Announcement Bar (Locations, Delivery & Currency) */}
      <AnnouncementBar />

      {/* 2. Sticky Glass Navigation Bar with Logo, Cart & Order Now */}
      <Navbar />

      {/* 3. Main Route Displays */}
      <main className="flex-1">
        <Routes>
          {/* Four Core Required Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Full Interactive Menu & Catalogue */}
          <Route path="/menu" element={<MenuPage />} />

          {/* Convenience Category Redirects */}
          <Route path="/african" element={<Navigate to="/menu?category=african" replace />} />
          <Route path="/fast-food" element={<Navigate to="/menu?category=fast-food" replace />} />
          <Route path="/continental" element={<Navigate to="/menu?category=continental" replace />} />
          <Route path="/chinese" element={<Navigate to="/menu?category=chinese" replace />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 4. Global Footer with Brand, Branches & Tasting Club */}
      <Footer />

      {/* 5. 24/7 WhatsApp Concierge Floating Action Button */}
      <WhatsAppButton />

      {/* 6. Global Interactive Drawers & Modals */}
      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <ReservationModal />
      <QuickViewModal />
      <SearchModal />
      <ToastNotification />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <RestaurantProvider>
        <MainApp />
      </RestaurantProvider>
    </HashRouter>
  );
}
