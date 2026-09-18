import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu as MenuIcon, X, Volume2, VolumeX, Sparkles, LayoutDashboard } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAudio } from '../../context/AudioContext';

interface NavbarProps {
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'home' }) => {
  const { cartCount, setIsCartOpen, setIsSearchOpen, setActiveView, replayIntro } = useStore();
  const { isMuted, toggleMute } = useAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Our Story', href: '#story', id: 'story' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'Coffee Beans', href: '#beans', id: 'beans' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#0d0907]/90 via-[#0d0907]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo matching Reference #1 */}
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-full border border-aura-gold/40 flex items-center justify-center bg-aura-surface/50 backdrop-blur-md group-hover:border-aura-gold transition-colors">
              <svg viewBox="0 0 100 100" className="w-5 h-5 text-aura-gold fill-current">
                <path d="M50 15 C50 15 35 35 35 55 C35 70 45 80 50 80 C55 80 65 70 65 55 C65 35 50 15 50 15 Z" />
                <path d="M30 35 C20 45 20 60 30 70 C38 60 40 45 30 35 Z" opacity="0.75" />
                <path d="M70 35 C80 45 80 60 70 70 C62 60 60 45 70 35 Z" opacity="0.75" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.25em] text-aura-cream font-bold text-lg leading-tight">
                AURA
              </span>
              <span className="text-[10px] tracking-[0.35em] text-aura-gold/90 uppercase font-medium">
                COFFEE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm tracking-wide transition-colors duration-200 py-1 ${
                    isActive ? 'text-aura-cream font-medium' : 'text-aura-cream/70 hover:text-aura-cream'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-aura-gold rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action Icons matching Reference #1 */}
          <div className="flex items-center space-x-2 sm:space-x-3.5 md:space-x-5">
            {/* Audio Toggle */}
            <button
              onClick={toggleMute}
              className="p-2 text-aura-cream/70 hover:text-aura-gold transition-colors hidden sm:block"
              title={isMuted ? 'Turn on Sound Effects' : 'Mute Sound Effects'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-aura-gold" />}
            </button>

            {/* Replay 3D Intro */}
            <button
              onClick={replayIntro}
              className="p-2 text-aura-cream/70 hover:text-aura-gold transition-colors hidden lg:flex items-center space-x-1.5 text-xs"
              title="Replay 3D Experience"
            >
              <Sparkles className="w-3.5 h-3.5 text-aura-gold" />
              <span className="text-[11px] tracking-wider uppercase opacity-80">3D Intro</span>
            </button>

            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 sm:p-2 text-aura-cream/80 hover:text-aura-gold transition-colors"
              title="Search Menu"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 sm:p-2 text-aura-cream/80 hover:text-aura-gold transition-colors"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 ? (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-aura-gold text-aura-espresso text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              ) : (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-aura-surface border border-aura-borderLight text-aura-cream/70 text-[9px] flex items-center justify-center">
                  0
                </span>
              )}
            </button>

            {/* Order Now Pill Button */}
            <a
              href="#menu"
              className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full bg-aura-gold-btn hover:bg-aura-gold-btnHover text-aura-dark font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-glow-gold transform hover:-translate-y-0.5"
            >
              Order Now
            </a>

            {/* Admin Dashboard Switcher Button */}
            <button
              onClick={() => setActiveView('admin')}
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-aura-borderLight hover:border-aura-gold/60 bg-aura-surface/70 text-aura-gold hover:text-aura-gold-light text-xs tracking-wider uppercase transition-all duration-200"
              title="Open Admin Dashboard"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[11px] font-semibold">Admin</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-aura-cream/80 hover:text-aura-gold transition-colors"
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Animated Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 bg-[#0d0907]/98 backdrop-blur-2xl md:hidden transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full border border-aura-gold/40 flex items-center justify-center bg-aura-surface">
              <svg viewBox="0 0 100 100" className="w-4 h-4 text-aura-gold fill-current">
                <path d="M50 15 C50 15 35 35 35 55 C35 70 45 80 50 80 C55 80 65 70 65 55 C65 35 50 15 50 15 Z" />
                <path d="M30 35 C20 45 20 60 30 70 C38 60 40 45 30 35 Z" opacity="0.75" />
                <path d="M70 35 C80 45 80 60 70 70 C62 60 60 45 70 35 Z" opacity="0.75" />
              </svg>
            </div>
            <span className="font-serif tracking-[0.25em] text-aura-cream font-bold text-sm">AURA COFFEE</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-aura-cream hover:text-aura-gold"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col space-y-5 my-auto text-center py-4 overflow-y-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-xl sm:text-2xl text-aura-cream hover:text-aura-gold tracking-wider transition-colors"
            >
              {link.name}
            </a>
          ))}

          <div className="w-16 h-[1px] bg-aura-border mx-auto my-2" />

          {/* Replay 3D Intro Experience on Mobile */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              replayIntro();
            }}
            className="text-aura-cream/90 hover:text-aura-gold text-sm tracking-widest uppercase font-medium py-2 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-aura-gold" />
            <span>Replay 3D Intro</span>
          </button>

          {/* Sound Toggle on Mobile */}
          <button
            onClick={toggleMute}
            className="text-aura-cream/70 hover:text-aura-gold text-xs tracking-wider uppercase py-1 flex items-center justify-center space-x-2"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-aura-gold" />}
            <span>{isMuted ? 'Sound Muted' : 'Sound Effects ON'}</span>
          </button>

          {/* Admin Dashboard */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setActiveView('admin');
            }}
            className="text-aura-gold font-serif text-lg tracking-wider py-2 flex items-center justify-center space-x-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Admin Dashboard</span>
          </button>
        </div>

        <div className="flex flex-col space-y-3 pt-4 border-t border-aura-border">
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 text-center rounded-full bg-aura-gold text-aura-dark font-semibold tracking-widest uppercase text-xs sm:text-sm shadow-md"
          >
            Order Now
          </a>
          <p className="text-center text-[10px] tracking-widest text-aura-cream/50 uppercase">
            Good Coffee. Good Moments.
          </p>
        </div>
      </div>
    </>
  );
};

