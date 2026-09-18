import React, { useRef } from 'react';
import { Star, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const BestSellersSection: React.FC = () => {
  const { recipes, addToCart } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Best seller products from database
  const bestSellers = recipes
    .filter((r) => r.status === 'active')
    .slice(0, 6);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0d0907] relative overflow-hidden text-aura-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] sm:tracking-[0.35em] text-aura-gold uppercase block mb-1.5 sm:mb-2">
              CURATED FAVORITES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-aura-cream">
              BEST SELLERS
            </h2>
            <p className="text-xs sm:text-sm text-aura-cream/70 font-light mt-1.5 sm:mt-2">
              The drinks our guests return for day after day.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 mt-4 sm:mt-0">
            <button
              onClick={() => scroll('left')}
              className="p-2 sm:p-3 rounded-full border border-aura-border bg-aura-surface hover:border-aura-gold/60 text-aura-cream hover:text-aura-gold transition-colors"
              title="Scroll Left"
            >
              <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 sm:p-3 rounded-full border border-aura-border bg-aura-surface hover:border-aura-gold/60 text-aura-cream hover:text-aura-gold transition-colors"
              title="Scroll Right"
            >
              <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Smooth Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 sm:pb-6 no-scrollbar scroll-smooth snap-x touch-pan-x"
        >
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="w-[260px] sm:w-80 shrink-0 snap-start rounded-2xl bg-[#140e0b] border border-[#2a1d15] hover:border-aura-gold/40 p-4 flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-aura-gold flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-aura-gold text-aura-gold" />
                    <span>{product.rating || 4.9}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] tracking-wider uppercase text-aura-gold font-semibold">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-aura-cream group-hover:text-aura-gold transition-colors truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs text-aura-cream/60 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-aura-border/60">
                <span className="font-serif text-lg font-bold text-aura-cream">
                  Rs. {product.price.toLocaleString()}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-2 rounded-full bg-aura-gold-btn hover:bg-aura-gold-btnHover text-aura-dark text-xs font-semibold tracking-wider uppercase flex items-center space-x-1.5 transition-all shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

