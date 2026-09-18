import React, { useState } from 'react';
import { ArrowRight, Check, LayoutDashboard } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, TiktokIcon } from './SocialIcons';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { setActiveView, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Subscribed to AURA Private Reserve club');
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#090604] border-t border-aura-border text-aura-cream pt-12 sm:pt-20 pb-8 sm:pb-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-aura-gold/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 pb-10 sm:pb-16 border-b border-aura-border/70">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-aura-gold/40 flex items-center justify-center bg-aura-surface">
                <svg viewBox="0 0 100 100" className="w-6 h-6 text-aura-gold fill-current">
                  <path d="M50 15 C50 15 35 35 35 55 C35 70 45 80 50 80 C55 80 65 70 65 55 C65 35 50 15 50 15 Z" />
                  <path d="M30 35 C20 45 20 60 30 70 C38 60 40 45 30 35 Z" opacity="0.75" />
                  <path d="M70 35 C80 45 80 60 70 70 C62 60 60 45 70 35 Z" opacity="0.75" />
                </svg>
              </div>
              <div>
                <span className="font-serif tracking-[0.25em] text-aura-cream font-bold text-xl block">
                  AURA
                </span>
                <span className="text-[10px] tracking-[0.35em] text-aura-gold/90 uppercase font-medium">
                  COFFEE ROASTERS
                </span>
              </div>
            </div>

            <p className="text-sm text-aura-cream/65 leading-relaxed max-w-sm">
              Exceptional coffee, carefully roasted and beautifully crafted for every moment. Experience the harmony of rare single-origin beans and artisanal brewing.
            </p>

            <div className="pt-1">
              <p className="font-script text-2xl text-aura-gold/90 tracking-wide">
                Good Coffee, Good Moments.
              </p>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-aura-gold uppercase">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-aura-cream/70">
              <li>
                <a href="#home" className="hover:text-aura-cream transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-aura-cream transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-aura-cream transition-colors">
                  The Menu
                </a>
              </li>
              <li>
                <a href="#beans" className="hover:text-aura-cream transition-colors">
                  Coffee Beans
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-aura-cream transition-colors">
                  Cafe Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-aura-cream transition-colors">
                  Come Say Hello
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Cafe Hours & Location */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-aura-gold uppercase">
              Hours & Atelier
            </h4>
            <div className="space-y-2.5 text-sm text-aura-cream/70">
              <p className="text-aura-cream font-medium">AURA Flagship Espresso Bar</p>
              <p className="text-xs text-aura-cream/60">Nishtar Colony, Ferozepur Road, Lahore</p>
              <p className="text-xs text-aura-gold/90 font-mono">
                <a href="tel:03224362414" className="hover:underline">03224362414</a>
              </p>
              <p className="text-xs text-aura-cream/60">
                <a href="mailto:mishalsabir789@gmail.com" className="hover:text-aura-gold transition-colors">
                  mishalsabir789@gmail.com
                </a>
              </p>
              <div className="pt-1 text-xs space-y-0.5 text-aura-cream/50">
                <p>Mon – Fri: 7:00 AM – 11:30 PM</p>
                <p>Sat – Sun: 8:00 AM – 1:00 AM</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveView('admin')}
                className="inline-flex items-center space-x-2 text-xs text-aura-gold/80 hover:text-aura-gold underline underline-offset-4"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin Management Portal</span>
              </button>
            </div>
          </div>

          {/* Col 5: Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-aura-gold uppercase">
              Private Reserve
            </h4>
            <p className="text-xs text-aura-cream/65">
              Receive invitations to micro-lot cupping sessions and newly arrived single-origin harvests.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 rounded-full glass-input text-xs text-aura-cream placeholder:text-aura-cream/40 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 w-8 rounded-full bg-aura-gold text-aura-dark flex items-center justify-center hover:bg-aura-gold-btnHover transition-colors"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] text-emerald-400 block pl-2">
                  Welcome to our coffee journey.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar matching Reference #1 */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-aura-cream/50 space-y-4 md:space-y-0">
          <p>
            &copy; {new Date().getFullYear()} AURA COFFEE. All rights reserved. Crafted for the moment.
          </p>

          <div className="flex items-center space-x-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-aura-gold transition-colors"
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-aura-gold transition-colors"
              title="Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-aura-gold transition-colors"
              title="TikTok"
            >
              <TiktokIcon className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-aura-gold transition-colors"
              title="YouTube"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
