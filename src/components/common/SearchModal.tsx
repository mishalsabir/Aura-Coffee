import React, { useState, useMemo } from 'react';
import { Search, X, Plus, Coffee } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, recipes, addToCart } = useStore();
  const [query, setQuery] = useState('');

  const filteredRecipes = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return recipes
      .filter((r) => r.status === 'active')
      .filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      );
  }, [recipes, query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center p-4 pt-20">
      <div className="relative w-full max-w-2xl bg-[#140e0b] border border-aura-border rounded-2xl shadow-2xl overflow-hidden text-aura-cream">
        {/* Search Bar Input */}
        <div className="p-4 border-b border-aura-border flex items-center space-x-3 bg-aura-surface">
          <Search className="w-5 h-5 text-aura-gold shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search espresso, iced brew, latte art, desserts..."
            className="w-full bg-transparent text-aura-cream placeholder:text-aura-cream/40 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-aura-cream/50 hover:text-aura-cream text-xs px-1.5 py-0.5"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-full hover:bg-aura-card text-aura-cream/60 hover:text-aura-cream"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-aura-cream/50 space-y-2">
              <Coffee className="w-8 h-8 mx-auto text-aura-gold/40" />
              <p className="text-sm">Type to explore our handcrafted recipes and origins</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Espresso', 'Caramel Latte', 'Cold Brew', 'Croissant'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="text-xs px-3 py-1 rounded-full bg-aura-surface border border-aura-border hover:border-aura-gold/50 text-aura-cream/70"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="py-12 text-center text-aura-cream/50">
              <p className="text-sm">No recipes found matching "{query}"</p>
            </div>
          ) : (
            filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="flex items-center justify-between p-3 rounded-xl bg-aura-surface border border-aura-border hover:border-aura-gold/40 transition-colors"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-14 h-14 rounded-lg object-cover border border-aura-border shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-serif font-semibold text-aura-cream text-sm truncate">
                        {recipe.name}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-aura-card border border-aura-border text-aura-gold uppercase tracking-wider">
                        {recipe.category}
                      </span>
                    </div>
                    <p className="text-xs text-aura-cream/60 line-clamp-1 mt-0.5">
                      {recipe.description}
                    </p>
                    <span className="text-xs font-semibold text-aura-gold block mt-0.5">
                      Rs. {recipe.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(recipe);
                    setIsSearchOpen(false);
                  }}
                  className="ml-3 shrink-0 p-2 rounded-full bg-aura-gold-btn hover:bg-aura-gold-btnHover text-aura-dark transition-colors"
                  title="Add to Cart"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

