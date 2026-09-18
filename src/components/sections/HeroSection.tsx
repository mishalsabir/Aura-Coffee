import { ArrowRight, ChevronDown } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, TiktokIcon } from '../common/SocialIcons';
import { SteamParticles } from '../3d/SteamParticles';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOrderCoffee: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreMenu, onOrderCoffee }) => {
  return (
    <section id="home" className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0d0907] select-none">
      {/* Seamless Living Video Background — Pure Dreamina AI Atmosphere (NO static image) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#0d0907]">
        <video
          src="/videos/dreamina-coffee.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center sm:object-[70%_center] filter brightness-[0.70] contrast-[1.10] scale-105"
          style={{
            WebkitMaskImage:
              'radial-gradient(ellipse 90% 90% at 70% 50%, #000 40%, rgba(0,0,0,0.85) 65%, transparent 95%)',
            maskImage:
              'radial-gradient(ellipse 90% 90% at 70% 50%, #000 40%, rgba(0,0,0,0.85) 65%, transparent 95%)',
          }}
        />

        {/* Cinematic Vignette and Dark Gradients to melt video 100% into #0d0907 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0907] via-[#0d0907]/80 to-[#0d0907]/30 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0907] via-transparent to-[#0d0907]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0907]/70 via-transparent to-[#0d0907]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,163,115,0.12)_0%,transparent_60%)]" />
      </div>

      {/* Realistic Rising Steam & Floating Gold Particles */}
      <SteamParticles />

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full pt-28 sm:pt-36 md:pt-48 pb-12 sm:pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-xl space-y-5 sm:space-y-6">
          {/* Eyebrow */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <span className="h-[1px] w-6 sm:w-8 bg-aura-gold/60" />
            <span className="text-[11px] sm:text-xs md:text-sm tracking-[0.25em] sm:tracking-[0.35em] text-aura-gold uppercase font-medium">
              PREMIUM SPECIALTY COFFEE
            </span>
          </div>

          {/* Main Headings matching Reference #1 */}
          <div className="space-y-1.5 sm:space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-aura-cream font-bold tracking-tight leading-[1.05] drop-shadow-2xl">
              AURA COFFEE
            </h1>
            <p className="text-xs sm:text-base md:text-xl font-medium tracking-[0.2em] sm:tracking-[0.25em] text-aura-cream/90 uppercase">
              CRAFTED FOR THE MOMENT
            </p>
          </div>

          {/* Body Narrative */}
          <p className="text-xs sm:text-sm md:text-base text-aura-cream/75 leading-relaxed font-light max-w-md">
            Exceptional coffee, carefully roasted and beautifully crafted for every moment.
          </p>

          {/* Call to Action Buttons matching Reference #1 */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            {/* Explore Menu Pill Button */}
            <button
              onClick={onExploreMenu}
              className="group px-7 py-3 rounded-full bg-aura-gold-btn hover:bg-aura-gold-btnHover text-aura-dark font-medium text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 shadow-lg shadow-aura-gold/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>EXPLORE MENU</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Order Coffee Outlined Button */}
            <button
              onClick={onOrderCoffee}
              className="group px-7 py-3 rounded-full border border-aura-cream/40 hover:border-aura-gold bg-black/30 hover:bg-aura-gold/10 text-aura-cream hover:text-aura-gold font-medium text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center space-x-2.5 backdrop-blur-sm transition-all duration-300"
            >
              <span>ORDER COFFEE</span>
              <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar matching Reference #1 */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-6 sm:pb-8 flex items-center justify-between text-xs text-aura-cream/60">
        {/* Left Tagline */}
        <div className="flex items-center space-x-3">
          <span className="w-6 h-[1px] bg-aura-gold/50" />
          <span className="tracking-[0.25em] uppercase text-[11px] font-medium text-aura-cream/70">
            GOOD COFFEE. GOOD MOMENTS.
          </span>
        </div>

        {/* Center Scroll Indicator */}
        <a
          href="#story"
          className="flex flex-col items-center space-y-1.5 text-aura-cream/60 hover:text-aura-gold transition-colors group"
        >
          <div className="w-8 h-8 rounded-full border border-aura-cream/30 group-hover:border-aura-gold flex items-center justify-center transition-colors">
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </div>
          <span className="text-[9px] tracking-[0.25em] uppercase">SCROLL DOWN</span>
        </a>

        {/* Right Social Icons */}
        <div className="hidden sm:flex items-center space-x-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-aura-gold transition-colors"
            title="Instagram"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-aura-gold transition-colors"
            title="Facebook"
          >
            <FacebookIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-aura-gold transition-colors"
            title="TikTok"
          >
            <TiktokIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-aura-gold transition-colors"
            title="YouTube"
          >
            <YoutubeIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
