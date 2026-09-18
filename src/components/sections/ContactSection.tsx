import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ContactSection: React.FC = () => {
  const { showToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    showToast('Your message was delivered to our cafe concierge');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 bg-[#0d0907] relative overflow-hidden text-aura-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] sm:tracking-[0.35em] text-aura-gold uppercase block mb-1.5 sm:mb-2">
            VISIT OUR ROASTERY
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-aura-cream">
            COME SAY HELLO
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-aura-cream/70 font-light mt-2 sm:mt-3">
            We would love to welcome you into our warm espresso atelier.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Info Cards & Interactive Map Simulation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-aura-surface border border-aura-border space-y-2">
                <MapPin className="w-5 h-5 text-aura-gold" />
                <h4 className="font-serif text-base font-bold text-aura-cream">Our Atelier</h4>
                <p className="text-xs text-aura-cream/65 leading-relaxed">
                  Nishtar Colony, Ferozepur Road, Lahore, Pakistan
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-aura-surface border border-aura-border space-y-2">
                <Clock className="w-5 h-5 text-aura-gold" />
                <h4 className="font-serif text-base font-bold text-aura-cream">Brewing Hours</h4>
                <p className="text-xs text-aura-cream/65 leading-relaxed">
                  Mon – Fri: 7:00 AM – 11:30 PM<br />
                  Sat – Sun: 8:00 AM – 1:00 AM
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-aura-surface border border-aura-border space-y-2">
                <Phone className="w-5 h-5 text-aura-gold" />
                <h4 className="font-serif text-base font-bold text-aura-cream">Direct Line</h4>
                <a
                  href="tel:03224362414"
                  className="text-xs text-aura-cream/80 hover:text-aura-gold transition-colors font-mono block"
                >
                  03224362414
                </a>
                <span className="text-[10px] text-aura-cream/50 block">Table Reservations & Delivery</span>
              </div>

              <div className="p-5 rounded-2xl bg-aura-surface border border-aura-border space-y-2">
                <Mail className="w-5 h-5 text-aura-gold" />
                <h4 className="font-serif text-base font-bold text-aura-cream">Concierge Email</h4>
                <a
                  href="mailto:mishalsabir789@gmail.com"
                  className="text-xs text-aura-cream/80 hover:text-aura-gold transition-colors block truncate"
                >
                  mishalsabir789@gmail.com
                </a>
                <span className="text-[10px] text-aura-cream/50 block">Events & Micro-Lot Catering</span>
              </div>
            </div>

            {/* Stylized Dark Coffee Interactive Map Container */}
            <div className="relative h-72 rounded-2xl overflow-hidden border border-aura-border shadow-xl bg-black/60 group">
              <iframe
                title="AURA Coffee Map Location — Nishtar Colony, Ferozepur Road, Lahore"
                src="https://maps.google.com/maps?q=Nishtar+Colony,+Ferozepur+Road,+Lahore,+Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter invert-[0.9] hue-rotate-[175deg] contrast-[1.2] opacity-85 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
              
              {/* Map Overlay Badge with Direct Navigation Link */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-lg bg-[#0d0907]/95 border border-aura-gold/50 text-[11px] font-semibold text-aura-gold flex items-center space-x-2 backdrop-blur-md shadow-lg pointer-events-auto">
                  <MapPin className="w-3.5 h-3.5 text-aura-gold animate-bounce" />
                  <span>AURA COFFEE — Nishtar Colony, Ferozepur Road, LHR</span>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Nishtar+Colony+Ferozepur+Road+Lahore"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-aura-gold hover:bg-aura-gold-btnHover text-aura-dark text-[11px] font-bold tracking-wider uppercase flex items-center space-x-1.5 shadow-md pointer-events-auto transition-all"
                >
                  <span>Open in Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-6">
            <div className="p-5 sm:p-8 md:p-10 rounded-2xl bg-[#140e0b] border border-[#2c2018] shadow-2xl">
              <h3 className="font-serif text-2xl font-bold text-aura-cream mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-aura-cream/60 mb-6">
                Inquire about private coffee tastings, corporate gifting, or general feedback.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-aura-cream">Message Sent</h4>
                  <p className="text-xs text-aura-cream/70">
                    Our team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-aura-cream/80 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Julian Montgomery"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-aura-cream placeholder:text-aura-cream/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-aura-cream/80 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="julian@example.com"
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-aura-cream placeholder:text-aura-cream/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-aura-cream/80 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-aura-cream placeholder:text-aura-cream/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-aura-cream/80 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your thoughts or request with us..."
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-aura-cream placeholder:text-aura-cream/30 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-aura-gold-btn hover:bg-aura-gold-btnHover text-aura-dark font-semibold text-xs tracking-widest uppercase flex items-center justify-center space-x-2 transition-all shadow-md transform hover:-translate-y-0.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>SEND MESSAGE</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

