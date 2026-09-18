import React, { useState } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Recipe } from '../../types';

export const MenuSection: React.FC = () => {
  const { recipes, categories, addToCart, toggleFavorite, isFavorite } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter recipes by category and active status
  const visibleRecipes = recipes.filter((recipe) => {
    if (recipe.status !== 'active') return false;
    if (selectedCategory === 'All') return true;
    return recipe.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Dynamic category pills list from database
  const activeCategories = ['All', ...categories.filter((c) => c.status === 'active').map((c) => c.name)];

  return (
    <section id="menu" className="py-16 sm:py-24 md:py-32 bg-[#0d0907] relative overflow-hidden text-aura-cream">
      {/* Decorative subtle coffee bean background texture */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-aura-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-aura-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header matching Reference #2 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] sm:tracking-[0.35em] text-aura-gold uppercase block mb-1.5 sm:mb-2">
              OUR SIGNATURES
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-aura-cream">
              THE MENU
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-aura-cream/70 font-light mt-1.5 sm:mt-2">
              Premium coffee. Crafted with passion.
            </p>
          </div>

          <div className="hidden md:block text-right">
            <span className="text-xs tracking-[0.3em] text-aura-cream/60 uppercase font-medium">
              GOOD COFFEE. GOOD MOMENTS.
            </span>
            <div className="w-12 h-[1px] bg-aura-gold/60 ml-auto mt-2" />
          </div>
        </div>

        {/* Category Filter Pills matching Reference #2 */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 overflow-x-auto pb-3 mb-8 sm:mb-12 no-scrollbar touch-pan-x px-1">
          {activeCategories.map((category) => {
            const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs font-medium tracking-wider transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-[#dfbe90] text-[#120d0a] shadow-lg shadow-aura-gold/20 font-semibold scale-105'
                    : 'bg-[#18110d] text-aura-cream/70 hover:text-aura-cream border border-[#2e2017] hover:border-aura-gold/40'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Recipes Grid matching Reference #2 */}
        {visibleRecipes.length === 0 ? (
          <div className="text-center py-20 bg-aura-surface/40 rounded-2xl border border-aura-border">
            <p className="text-aura-cream/60">No items currently available in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFav={isFavorite(recipe.id)}
                onToggleFav={() => toggleFavorite(recipe.id)}
                onAddToCart={() => addToCart(recipe)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

interface RecipeCardProps {
  recipe: Recipe;
  isFav: boolean;
  onToggleFav: () => void;
  onAddToCart: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isFav, onToggleFav, onAddToCart }) => {
  return (
    <div className="group rounded-2xl bg-[#140e0b] border border-[#2a1d15] hover:border-aura-gold/40 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:shadow-black/60 transform hover:-translate-y-1">
      {/* Top Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
        <img
          src={recipe.image}
          alt={recipe.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 brightness-95 group-hover:brightness-105"
        />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-aura-cream/90 border border-white/10">
            {recipe.category}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={onToggleFav}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-aura-cream hover:text-red-400 transition-colors"
          title={isFav ? 'Remove Favorite' : 'Add to Favorites'}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isFav ? 'fill-red-500 text-red-500' : 'text-aura-cream/80'
            }`}
          />
        </button>
      </div>

      {/* Content Area matching Reference #2 */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-lg font-bold text-aura-cream group-hover:text-aura-gold transition-colors">
              {recipe.name}
            </h3>
          </div>
          <p className="text-xs text-aura-cream/65 line-clamp-2 leading-relaxed font-light">
            {recipe.description}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="space-y-3 pt-2">
          <span className="font-serif text-base font-semibold text-aura-cream block">
            Rs. {recipe.price.toLocaleString()}
          </span>

          <button
            onClick={onAddToCart}
            className="w-full py-2.5 px-4 rounded-full border border-aura-borderLight hover:border-aura-gold bg-aura-surface hover:bg-aura-gold text-aura-cream hover:text-aura-dark text-xs font-semibold tracking-wider uppercase flex items-center justify-center space-x-2 transition-all duration-200 group/btn shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

