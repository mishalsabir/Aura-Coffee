import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartTax,
    cartTotal,
    setIsCheckoutOpen,
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-[#120d0a] border-l border-aura-border text-aura-cream shadow-2xl flex flex-col justify-between transform transition-transform duration-300">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-aura-border flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-5 h-5 text-aura-gold" />
              <h2 className="font-serif text-xl tracking-wider font-semibold">Your Coffee Order</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-aura-surface text-aura-cream/70 hover:text-aura-cream transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 no-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-aura-surface border border-aura-border flex items-center justify-center text-aura-gold">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-lg text-aura-cream">Your cart is empty</h3>
                <p className="text-sm text-aura-cream/60 max-w-xs">
                  Discover our freshly roasted specialty coffees and exquisite bakery selections.
                </p>
                <a
                  href="#menu"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-2.5 rounded-full bg-aura-gold-btn text-aura-dark text-xs tracking-wider uppercase font-medium hover:bg-aura-gold-btnHover transition-colors"
                >
                  Explore Menu
                </a>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.recipe.id}
                  className="flex items-center space-x-4 p-3.5 rounded-xl bg-aura-surface border border-aura-border/80 hover:border-aura-gold/30 transition-all"
                >
                  <img
                    src={item.recipe.image}
                    alt={item.recipe.name}
                    className="w-16 h-16 rounded-lg object-cover border border-aura-border"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-semibold truncate text-aura-cream">
                      {item.recipe.name}
                    </h4>
                    <span className="text-xs text-aura-gold block mt-0.5">
                      Rs. {item.recipe.price.toLocaleString()}
                    </span>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateCartQuantity(item.recipe.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md bg-aura-card border border-aura-border flex items-center justify-center hover:border-aura-gold/60 text-aura-cream/80 hover:text-aura-cream"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold px-1 text-aura-cream">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.recipe.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md bg-aura-card border border-aura-border flex items-center justify-center hover:border-aura-gold/60 text-aura-cream/80 hover:text-aura-cream"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between space-y-3">
                    <button
                      onClick={() => removeFromCart(item.recipe.id)}
                      className="text-aura-cream/40 hover:text-red-400 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-sm text-aura-cream">
                      Rs. {(item.recipe.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-aura-border bg-aura-surface/60 backdrop-blur-md space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-aura-cream/70">
                  <span>Subtotal</span>
                  <span>Rs. {cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-aura-cream/70">
                  <span>Estimated Tax (8%)</span>
                  <span>Rs. {cartTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-aura-cream pt-2 border-t border-aura-border">
                  <span>Total</span>
                  <span className="text-aura-gold font-sans">Rs. {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 rounded-full bg-aura-gold-btn hover:bg-aura-gold-btnHover text-aura-dark font-medium text-xs tracking-widest uppercase flex items-center justify-center space-x-2 shadow-lg shadow-aura-gold/15 transition-all transform hover:-translate-y-0.5"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

