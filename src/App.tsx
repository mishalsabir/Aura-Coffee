import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AudioProvider } from './context/AudioContext';
import { CoffeeIntro } from './components/3d/CoffeeIntro';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { StorySection } from './components/sections/StorySection';
import { MenuSection } from './components/sections/MenuSection';
import { SignatureSection } from './components/sections/SignatureSection';
import { BeansSection } from './components/sections/BeansSection';
import { BestSellersSection } from './components/sections/BestSellersSection';
import { DessertsSection } from './components/sections/DessertsSection';
import { GallerySection } from './components/sections/GallerySection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { CheckoutModal } from './components/common/CheckoutModal';
import { SearchModal } from './components/common/SearchModal';
import { Toast } from './components/common/Toast';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainApp: React.FC = () => {
  const { hasIntroPlayed, setHasIntroPlayed, activeView, setIsCartOpen } = useStore();
  const [activeSection, setActiveSection] = useState('home');

  // Track active section on scroll for Navbar indicator
  useEffect(() => {
    if (activeView === 'admin') return;

    const sections = ['home', 'story', 'menu', 'beans', 'gallery', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  return (
    <>
      {/* 1. Cinematic 3D Coffee Intro */}
      {!hasIntroPlayed && (
        <CoffeeIntro onComplete={() => setHasIntroPlayed(true)} />
      )}

      {/* 2. Admin Dashboard View vs Customer Website View */}
      {activeView === 'admin' ? (
        <AdminDashboard />
      ) : (
        <div className="min-h-screen bg-[#0d0907] flex flex-col selection:bg-aura-gold selection:text-aura-dark">
          {/* Navigation Bar matching Reference #1 */}
          <Navbar activeSection={activeSection} />

          {/* Hero Section matching Reference #1 */}
          <HeroSection
            onExploreMenu={() => {
              const el = document.getElementById('menu');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOrderCoffee={() => {
              setIsCartOpen(true);
            }}
          />

          {/* Our Story Section */}
          <StorySection />

          {/* Interactive Menu Section matching Reference #2 */}
          <MenuSection />

          {/* Signature Coffee: Midnight Caramel Latte with 3D Cup */}
          <SignatureSection />

          {/* Single-Origin Beans: Ethiopia, Colombia, Brazil */}
          <BeansSection />

          {/* Best Sellers Horizontal Showcase */}
          <BestSellersSection />

          {/* Desserts: Sweet Moments */}
          <DessertsSection />

          {/* Atelier Photo Gallery with Lightbox */}
          <GallerySection />

          {/* Guest Reviews Carousel */}
          <ReviewsSection />

          {/* Location, Interactive Map & Contact Form */}
          <ContactSection />

          {/* Luxury Footer */}
          <Footer />

          {/* Modals & Drawers */}
          <CartDrawer />
          <CheckoutModal />
          <SearchModal />
        </div>
      )}

      {/* Real-time Notification Toast */}
      <Toast />
    </>
  );
};

export function App() {
  return (
    <StoreProvider>
      <AudioProvider>
        <MainApp />
      </AudioProvider>
    </StoreProvider>
  );
}

export default App;
