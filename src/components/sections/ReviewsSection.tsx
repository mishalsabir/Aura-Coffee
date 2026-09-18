import React, { useState, useEffect } from 'react';
import { REVIEWS } from '../../data/initialData';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto carousel rotation every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const currentReview = REVIEWS[currentIdx];

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-[#0a0604] relative overflow-hidden text-aura-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] sm:tracking-[0.35em] text-aura-gold uppercase block mb-1.5 sm:mb-2">
            CONNOISSEUR TESTIMONIALS
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-aura-cream">
            WHAT OUR GUESTS SAY
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#140e0b] border border-[#2c2018] p-5 sm:p-12 shadow-2xl overflow-hidden">
          {/* Subtle Quote Watermark */}
          <Quote className="absolute top-6 right-8 w-24 h-24 text-aura-gold/5 pointer-events-none" />

          <div className="flex flex-col items-center text-center space-y-6 relative z-10">
            {/* Stars */}
            <div className="flex items-center space-x-1 text-aura-gold">
              {[...Array(currentReview.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-aura-gold text-aura-gold" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="font-serif text-lg sm:text-xl md:text-2xl text-aura-cream/90 leading-relaxed italic max-w-2xl">
              “{currentReview.text}”
            </p>

            {/* User Info */}
            <div className="flex items-center space-x-4 pt-4 border-t border-aura-border/60">
              <img
                src={currentReview.avatar}
                alt={currentReview.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-aura-gold/40 shadow-md"
              />
              <div className="text-left">
                <h4 className="font-serif text-base font-bold text-aura-cream">
                  {currentReview.name}
                </h4>
                <p className="text-xs text-aura-gold/80">{currentReview.role}</p>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8 pt-4">
            <div className="flex space-x-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIdx ? 'w-8 bg-aura-gold' : 'w-2 bg-aura-border'
                  }`}
                  title={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentIdx((currentIdx - 1 + REVIEWS.length) % REVIEWS.length)}
                className="p-2 rounded-full border border-aura-border bg-aura-surface hover:border-aura-gold text-aura-cream hover:text-aura-gold transition-colors"
                title="Previous Review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentIdx((currentIdx + 1) % REVIEWS.length)}
                className="p-2 rounded-full border border-aura-border bg-aura-surface hover:border-aura-gold text-aura-cream hover:text-aura-gold transition-colors"
                title="Next Review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

