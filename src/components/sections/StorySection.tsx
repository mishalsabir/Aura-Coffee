import React from 'react';
import { ArrowRight, Flame, Award, HeartHandshake } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-16 sm:py-24 md:py-32 bg-[#0a0604] relative overflow-hidden text-aura-cream">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-aura-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left: Large Cinematic Split Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-aura-border shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80"
                alt="Artisan coffee roasting and green beans inspection"
                className="w-full h-[320px] sm:h-[450px] md:h-[560px] object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0604] via-transparent to-transparent" />

              {/* Floating Quality Badge */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-3.5 sm:p-5 rounded-xl bg-[#140e0b]/90 border border-aura-gold/30 backdrop-blur-md flex items-center justify-between">
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-aura-gold font-semibold block">
                    Micro-Lot Roastery
                  </span>
                  <span className="font-serif text-sm sm:text-base font-bold text-aura-cream">
                    100% Arabica Specialty Grade
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-aura-surface border border-aura-gold/50 flex items-center justify-center text-aura-gold">
                  <Flame className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Decorative Gold Border Offset */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-aura-gold/15 rounded-2xl -z-10 pointer-events-none hidden md:block" />
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="h-[1px] w-6 bg-aura-gold" />
              <span className="text-xs font-semibold tracking-[0.3em] text-aura-gold uppercase">
                OUR PHILOSOPHY
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-aura-cream leading-tight">
              MORE THAN COFFEE
            </h2>

            <p className="text-base text-aura-cream/80 leading-relaxed font-light">
              At <strong className="text-aura-cream font-medium">AURA COFFEE</strong>, we believe every cup is a moment of stillness and connection in a hurried world. Our beans are ethically sourced from smallholder farmers across Ethiopia, Colombia, and Brazil, honoring the soil, altitude, and ancestral cultivation methods that give each origin its distinct soul.
            </p>

            <p className="text-sm text-aura-cream/70 leading-relaxed">
              Inside our roastery, heat and airflow are calibrated to the second. By coaxing out delicate floral aromatics, rich caramel sugars, and velvety chocolate tones, we create handcrafted drinks that elevate coffee from a daily routine into an extraordinary sensory ritual.
            </p>

            {/* Pillar highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-aura-surface/60 border border-aura-border flex items-start space-x-3">
                <Award className="w-5 h-5 text-aura-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-aura-cream">Small-Batch Precision</h4>
                  <p className="text-xs text-aura-cream/60 mt-0.5">Roasted weekly in 15kg drums for peak aromatics.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-aura-surface/60 border border-aura-border flex items-start space-x-3">
                <HeartHandshake className="w-5 h-5 text-aura-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-semibold text-aura-cream">Direct Origin Trade</h4>
                  <p className="text-xs text-aura-cream/60 mt-0.5">Paying above fair-trade premiums directly to growers.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#beans"
                className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-full border border-aura-gold/40 hover:border-aura-gold bg-aura-surface text-aura-cream hover:text-aura-gold text-xs font-semibold tracking-widest uppercase transition-all duration-300 group"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

