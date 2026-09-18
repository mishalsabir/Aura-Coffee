import React, { useState } from 'react';
import { Search, Bell, RotateCcw, Menu, ExternalLink } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface AdminHeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onToggleMobileSidebar: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onToggleMobileSidebar,
}) => {
  const { resetToDefaults, setActiveView } = useStore();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="h-20 bg-[#0d0907] border-b border-[#241913] px-6 md:px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile Toggle & Global Search matching Reference #3 */}
      <div className="flex items-center space-x-4 flex-1 max-w-md">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 text-aura-cream/70 hover:text-aura-cream"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="w-4 h-4 text-aura-cream/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes, categories, or orders..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-aura-surface border border-aura-border text-xs sm:text-sm text-aura-cream placeholder:text-aura-cream/35 focus:outline-none focus:border-aura-gold/50"
          />
        </div>
      </div>

      {/* Right Controls matching Reference #3 */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        {/* Reset Demo Data Button */}
        <button
          onClick={resetToDefaults}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-aura-border hover:border-aura-gold/40 text-[11px] text-aura-cream/70 hover:text-aura-gold transition-colors"
          title="Reset database to initial luxury coffee menu"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sample Data</span>
        </button>

        {/* View Website pill */}
        <button
          onClick={() => setActiveView('customer')}
          className="px-3.5 py-1.5 rounded-full bg-aura-surface border border-aura-gold/30 hover:border-aura-gold text-aura-gold text-xs font-semibold tracking-wider uppercase flex items-center space-x-1.5 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          <span>Website</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 text-aura-cream/70 hover:text-aura-cream rounded-full hover:bg-aura-surface transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
              3
            </span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl bg-aura-surface border border-aura-border shadow-2xl p-4 text-xs text-aura-cream space-y-3 z-50">
              <div className="font-semibold text-aura-gold pb-2 border-b border-aura-border flex justify-between">
                <span>Recent Alerts</span>
                <span className="text-[10px] text-aura-cream/50">Realtime</span>
              </div>
              <div className="space-y-2">
                <p className="text-aura-cream/90">
                  <strong>New Order #ORD-8942</strong> received for Caramel Latte.
                </p>
                <p className="text-aura-cream/70">Ethiopia Yirgacheffe batch roasted today.</p>
                <p className="text-aura-cream/70">Menu price change synchronized with frontend.</p>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar matching Reference #3 */}
        <div className="flex items-center space-x-3 pl-2 border-l border-aura-border/70">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="Admin profile"
            className="w-9 h-9 rounded-full object-cover border border-aura-gold/40 shadow-sm"
          />
          <div className="hidden md:block text-left">
            <span className="font-semibold text-xs text-aura-cream block leading-tight">Admin</span>
            <span className="text-[10px] text-aura-cream/50 block">Restaurant Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
};

