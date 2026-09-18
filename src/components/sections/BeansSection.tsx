import React from 'react';
import { INITIAL_BEANS } from '../../data/initialData';
import { ShoppingBag, Mountain, Wind, Flame } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const BeansSection: React.FC = () => {
  const { showToast } = useStore();

  const handleOrderBeans = (origin: string, price: number) => {
    showToast(`Added 250g Whole Bean bag (${origin}) — Rs. ${price.toLocaleString()}`);
  };

  return (
    <section id="beans" className="py-16 sm:py-24 md:py-32 bg-[#0a0604] relative overflow-hidden text-aura-cream">
      {/* Background accents */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-aura-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] sm:tracking-[0.35em] text-aura-gold uppercase block mb-1.5 sm:mb-2">
            SINGLE ORIGIN SELECTION
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-aura-cream">
            FROM BEAN TO CUP
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-aura-cream/70 font-light mt-2 sm:mt-3">
            Sustainably cultivated at high altitudes, washed in mountain springs, and roasted in micro-lots.
          </p>
        </div>

        {/* 3 Premium Bean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {INITIAL_BEANS.map((bean) => (
            <div
              key={bean.id}
              className="group rounded-2xl bg-[#140e0b] border border-[#2a1d15] hover:border-aura-gold/50 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/80 transform hover:-translate-y-1.5"
            >
              <div>
                {/* Bean Imagery with 3D Tilt container */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/60 mb-6 border border-aura-border">
                  <img
                    src={bean.image}
                    alt={`${bean.country} - ${bean.origin} Coffee Beans`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140e0b] via-transparent to-transparent" />

                  {/* Roast Level Tag */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] tracking-wider uppercase font-semibold text-aura-gold flex items-center space-x-1.5">
                    <Flame className="w-3 h-3 text-aura-gold" />
                    <span>{bean.roastLevel} Roast</span>
                  </div>

                  {/* Origin Badge */}
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[11px] font-semibold tracking-widest text-aura-gold/90 uppercase block">
                      {bean.origin}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-aura-cream tracking-wide">
                      {bean.country}
                    </h3>
                  </div>
                </div>

                {/* Flavor Notes Tagline */}
                <div className="p-2.5 rounded-lg bg-aura-surface border border-aura-border/80 text-center mb-4">
                  <p className="text-xs font-semibold text-aura-gold tracking-wider uppercase">
                    {bean.tagline}
                  </p>
                </div>

                <p className="text-xs text-aura-cream/70 leading-relaxed font-light mb-6">
                  {bean.description}
                </p>

                {/* Terroir Metrics */}
                <div className="space-y-2 border-t border-b border-aura-border/60 py-3 mb-6 text-xs text-aura-cream/70">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1.5">
                      <Mountain className="w-3.5 h-3.5 text-aura-gold" />
                      <span>Altitude</span>
                    </span>
                    <span className="font-medium text-aura-cream">{bean.altitude}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1.5">
                      <Wind className="w-3.5 h-3.5 text-aura-gold" />
                      <span>Processing</span>
                    </span>
                    <span className="font-medium text-aura-cream">{bean.process}</span>
                  </div>
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[10px] text-aura-cream/50 uppercase block">250g Whole Bean</span>
                  <span className="font-serif text-lg font-bold text-aura-cream">
                    Rs. {bean.price.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => handleOrderBeans(bean.country, bean.price)}
                  className="px-5 py-2.5 rounded-full bg-aura-gold-btn hover:bg-aura-gold-btnHover text-aura-dark text-xs font-semibold tracking-wider uppercase flex items-center space-x-1.5 shadow-md hover:shadow-glow-gold transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Beans</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

