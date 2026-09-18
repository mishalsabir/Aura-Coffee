import React, { useState } from 'react';
import { X, CheckCircle, Coffee, MapPin, Clock, CreditCard, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartSubtotal, cartTax, cartTotal, createOrder } = useStore();

  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: 'card',
  });

  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please provide your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const order = await createOrder({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: orderType,
        address: orderType === 'delivery' ? formData.address : undefined,
      });

      // Trigger luxury celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4a373', '#f3dfbf', '#ffffff', '#9d7448'],
        });
      } catch {
        // ignore
      }

      setIsSubmitting(false);
      setCompletedOrder(order);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: '',
      paymentMethod: 'card',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-[#140e0b] border border-aura-border rounded-2xl shadow-2xl overflow-hidden text-aura-cream">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-aura-border flex items-center justify-between bg-aura-surface/80 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-aura-gold/15 border border-aura-gold/30 flex items-center justify-center text-aura-gold">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold">
                {completedOrder ? 'Order Confirmed' : 'Checkout & Order'}
              </h2>
              <p className="text-[11px] text-aura-cream/60">AURA COFFEE Specialty Roasters</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-aura-cream/60 hover:text-aura-cream rounded-full hover:bg-aura-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {completedOrder ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-8 h-8 animate-pulse" />
            </div>

            <div>
              <span className="text-xs font-semibold tracking-widest text-aura-gold uppercase block mb-1">
                Order Received
              </span>
              <h3 className="font-serif text-2xl font-bold text-aura-cream">
                Thank You, {completedOrder.customer.name}!
              </h3>
              <p className="text-xs text-aura-cream/70 mt-1">
                Your order is currently sent to our baristas.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-aura-surface border border-aura-border text-left space-y-2 text-sm">
              <div className="flex justify-between pb-2 border-b border-aura-border">
                <span className="text-aura-cream/60">Order Reference</span>
                <span className="font-mono font-bold text-aura-gold">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-aura-cream/60">Service Method</span>
                <span className="capitalize font-medium text-aura-cream">
                  {completedOrder.customer.type}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-aura-cream/60">Total Paid</span>
                <span className="font-bold text-aura-cream">Rs. {completedOrder.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-aura-border">
                <span className="text-aura-cream/60">Current Status</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-900/60 text-amber-300 text-xs font-semibold border border-amber-600/40">
                  {completedOrder.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 text-xs text-aura-cream/60">
              <Clock className="w-3.5 h-3.5 text-aura-gold" />
              <span>Estimated preparation time: 8–12 minutes</span>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-full bg-aura-gold-btn hover:bg-aura-gold-btnHover text-aura-dark font-medium text-xs tracking-widest uppercase transition-all shadow-md"
            >
              Done & Return to Cafe
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
            {/* Service Type Switch */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-aura-surface border border-aura-border">
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`py-2 text-xs font-semibold rounded-lg tracking-wider uppercase transition-all flex items-center justify-center space-x-2 ${
                  orderType === 'pickup'
                    ? 'bg-aura-gold text-aura-dark shadow-md'
                    : 'text-aura-cream/70 hover:text-aura-cream'
                }`}
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>Cafe Pickup</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-2 text-xs font-semibold rounded-lg tracking-wider uppercase transition-all flex items-center justify-center space-x-2 ${
                  orderType === 'delivery'
                    ? 'bg-aura-gold text-aura-dark shadow-md'
                    : 'text-aura-cream/70 hover:text-aura-cream'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Express Delivery</span>
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-aura-cream/80 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Marcus Sterling"
                  className="w-full px-3.5 py-2.5 rounded-lg glass-input text-sm text-aura-cream placeholder:text-aura-cream/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-aura-cream/80 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="marcus@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg glass-input text-sm text-aura-cream placeholder:text-aura-cream/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-aura-cream/80 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="03224362414"
                    className="w-full px-3.5 py-2.5 rounded-lg glass-input text-sm text-aura-cream placeholder:text-aura-cream/30"
                  />
                </div>
              </div>

              {orderType === 'delivery' && (
                <div>
                  <label className="block text-xs font-medium text-aura-cream/80 mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House/Street, Nishtar Colony, Ferozepur Road, Lahore"
                    className="w-full px-3.5 py-2.5 rounded-lg glass-input text-sm text-aura-cream placeholder:text-aura-cream/30"
                  />
                </div>
              )}
            </div>

            {/* Order Summary Miniature */}
            <div className="p-3.5 rounded-xl bg-aura-surface border border-aura-border space-y-2">
              <div className="flex justify-between items-center text-xs text-aura-cream/70">
                <span>Items ({cart.length})</span>
                <span>Rs. {cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-aura-cream/70">
                <span>Taxes & Roasting Fee</span>
                <span>Rs. {cartTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-aura-cream pt-1.5 border-t border-aura-border">
                <span>Total Due</span>
                <span className="text-aura-gold font-mono">Rs. {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Security Assurance */}
            <div className="flex items-center space-x-2 text-[11px] text-aura-cream/50">
              <ShieldCheck className="w-4 h-4 text-aura-gold" />
              <span>Encrypted instant dispatch directly to our Nishtar Colony baristas.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-3.5 rounded-full bg-aura-gold-btn hover:bg-aura-gold-btnHover text-aura-dark font-semibold text-xs tracking-widest uppercase flex items-center justify-center space-x-2 shadow-lg shadow-aura-gold/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              <CreditCard className="w-4 h-4" />
              <span>{isSubmitting ? 'Processing Order...' : `Place Order — Rs. ${cartTotal.toLocaleString()}`}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

