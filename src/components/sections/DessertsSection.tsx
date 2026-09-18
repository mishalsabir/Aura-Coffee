import React from 'react';
import { ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const DessertsSection: React.FC = () => {
  const { recipes, addToCart } = useStore();

  // Desserts category recipes
  const dessertItems = recipes.filter(
    (r) => r.category.toLowerCase() === 'desserts' && r.status === 'active'
  );

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-[#0a0604] relative overflow-hidden text-aura-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-aura-surface border border-aura-gold/30 text-aura-gold text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase mb-3 sm:mb-4">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>ARTISAN BAKERY & PATISSERIE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-aura-cream">
            SWEET MOMENTS
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-aura-cream/75 font-light italic font-serif mt-2">
            “Better with coffee.”
          </p>
        </div>

        {/* 4 Dessert Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {dessertItems.map((dessert) => (
            <div
              key={dessert.id}
              className="group rounded-2xl bg-[#140e0b] border border-[#2a1d15] hover:border-aura-gold/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/70 transform hover:-translate-y-1.5"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/50">
                  <img
                    src={dessert.image}
                    alt={dessert.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 brightness-95 group-hover:brightness-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] uppercase font-semibold text-aura-gold">
                    Fresh Daily
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-lg font-bold text-aura-cream group-hover:text-aura-gold transition-colors">
                    {dessert.name}
                  </h3>
                  <p className="text-xs text-aura-cream/65 line-clamp-2 leading-relaxed">
                    {dessert.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between">
                <span className="font-serif text-base font-bold text-aura-cream">
                  Rs. {dessert.price.toLocaleString()}
                </span>
                <button
                  onClick={() => addToCart(dessert)}
                  className="px-4 py-2 rounded-full bg-aura-surface hover:bg-aura-gold text-aura-cream hover:text-aura-dark border border-aura-border hover:border-aura-gold text-xs font-semibold tracking-wider uppercase flex items-center space-x-1.5 transition-all shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

