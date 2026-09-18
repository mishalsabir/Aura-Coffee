import React, { useState } from 'react';
import {
  LayoutDashboard,
  Coffee,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  PackageCheck,
  FolderTree,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  onCloseMobile,
}) => {
  const { orders, setActiveView } = useStore();
  const [menuExpanded, setMenuExpanded] = useState(true);

  const pendingOrdersCount = orders.filter((o) => o.status !== 'Completed' && o.status !== 'Cancelled').length;

  const handleSelect = (tab: string) => {
    setActiveTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="w-64 bg-[#0d0907] border-r border-[#241913] flex flex-col justify-between h-screen sticky top-0 text-aura-cream select-none z-30">
      {/* Top Section */}
      <div>
        {/* Logo matching Reference #3 */}
        <div className="p-6 border-b border-[#241913] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full border border-aura-gold/40 flex items-center justify-center bg-aura-surface">
              <svg viewBox="0 0 100 100" className="w-5 h-5 text-aura-gold fill-current">
                <path d="M50 15 C50 15 35 35 35 55 C35 70 45 80 50 80 C55 80 65 70 65 55 C65 35 50 15 50 15 Z" />
                <path d="M30 35 C20 45 20 60 30 70 C38 60 40 45 30 35 Z" opacity="0.75" />
                <path d="M70 35 C80 45 80 60 70 70 C62 60 60 45 70 35 Z" opacity="0.75" />
              </svg>
            </div>
            <div>
              <span className="font-serif tracking-[0.25em] text-aura-cream font-bold text-base block">
                AURA
              </span>
              <span className="text-[9px] tracking-[0.35em] text-aura-gold/90 uppercase font-medium">
                COFFEE
              </span>
            </div>
          </div>
        </div>

        {/* Navigation List matching Reference #3 */}
        <nav className="p-4 space-y-1.5 text-sm">
          {/* Dashboard */}
          <button
            onClick={() => handleSelect('analytics')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all ${
              activeTab === 'analytics'
                ? 'bg-aura-surface text-aura-gold font-semibold shadow-sm'
                : 'text-aura-cream/70 hover:text-aura-cream hover:bg-aura-surface/40'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-aura-gold/80" />
            <span>Dashboard</span>
          </button>

          {/* Menu Dropdown Group */}
          <div>
            <button
              onClick={() => setMenuExpanded(!menuExpanded)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'recipes' || activeTab === 'categories' || activeTab === 'inventory'
                  ? 'bg-aura-surface/80 text-aura-cream font-medium'
                  : 'text-aura-cream/70 hover:text-aura-cream hover:bg-aura-surface/40'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Coffee className="w-4 h-4 text-aura-gold" />
                <span>Menu</span>
              </div>
              {menuExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-aura-cream/50" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-aura-cream/50" />
              )}
            </button>

            {menuExpanded && (
              <div className="pl-9 pr-2 py-1 space-y-1">
                {/* Recipes */}
                <button
                  onClick={() => handleSelect('recipes')}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                    activeTab === 'recipes'
                      ? 'text-aura-gold font-semibold bg-aura-card/60'
                      : 'text-aura-cream/60 hover:text-aura-cream hover:bg-aura-surface/30'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeTab === 'recipes' ? 'bg-aura-gold' : 'bg-aura-cream/40'
                    }`}
                  />
                  <span>Recipes</span>
                </button>

                {/* Categories */}
                <button
                  onClick={() => handleSelect('categories')}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                    activeTab === 'categories'
                      ? 'text-aura-gold font-semibold bg-aura-card/60'
                      : 'text-aura-cream/60 hover:text-aura-cream hover:bg-aura-surface/30'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeTab === 'categories' ? 'bg-aura-gold' : 'bg-aura-cream/40'
                    }`}
                  />
                  <span>Categories</span>
                </button>

                {/* Inventory */}
                <button
                  onClick={() => handleSelect('inventory')}
                  className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                    activeTab === 'inventory'
                      ? 'text-aura-gold font-semibold bg-aura-card/60'
                      : 'text-aura-cream/60 hover:text-aura-cream hover:bg-aura-surface/30'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeTab === 'inventory' ? 'bg-aura-gold' : 'bg-aura-cream/40'
                    }`}
                  />
                  <span>Inventory</span>
                </button>
              </div>
            )}
          </div>

          {/* Orders */}
          <button
            onClick={() => handleSelect('orders')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
              activeTab === 'orders'
                ? 'bg-aura-surface text-aura-gold font-semibold shadow-sm'
                : 'text-aura-cream/70 hover:text-aura-cream hover:bg-aura-surface/40'
            }`}
          >
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-4 h-4 text-aura-gold/80" />
              <span>Orders</span>
            </div>
            {pendingOrdersCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#dfbe90] text-[#120d0a] text-[10px] font-bold">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          {/* Customers */}
          <button
            onClick={() => handleSelect('customers')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all ${
              activeTab === 'customers'
                ? 'bg-aura-surface text-aura-gold font-semibold shadow-sm'
                : 'text-aura-cream/70 hover:text-aura-cream hover:bg-aura-surface/40'
            }`}
          >
            <Users className="w-4 h-4 text-aura-gold/80" />
            <span>Customers</span>
          </button>

          {/* Analytics */}
          <button
            onClick={() => handleSelect('analytics')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all ${
              activeTab === 'analytics'
                ? 'bg-aura-surface text-aura-gold font-semibold shadow-sm'
                : 'text-aura-cream/70 hover:text-aura-cream hover:bg-aura-surface/40'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-aura-gold/80" />
            <span>Analytics</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => handleSelect('settings')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all ${
              activeTab === 'settings'
                ? 'bg-aura-surface text-aura-gold font-semibold shadow-sm'
                : 'text-aura-cream/70 hover:text-aura-cream hover:bg-aura-surface/40'
            }`}
          >
            <Settings className="w-4 h-4 text-aura-gold/80" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Bottom Sidebar Graphic matching Reference #3 */}
      <div className="p-4 border-t border-[#241913] space-y-3">
        {/* "View Website" link */}
        <button
          onClick={() => setActiveView('customer')}
          className="w-full py-2.5 px-3.5 rounded-xl bg-aura-surface border border-aura-border hover:border-aura-gold text-aura-cream/80 hover:text-aura-gold text-xs font-medium flex items-center justify-center space-x-2 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Customer Website</span>
        </button>

        {/* Artistic coffee cup with script typography matching Reference #3 */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-t from-black via-aura-surface/40 to-transparent p-3 pt-6 border border-aura-border/40 text-center">
          <img
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80"
            alt="Coffee artwork"
            className="w-20 h-20 rounded-full mx-auto object-cover border border-aura-gold/30 shadow-lg mb-2 filter brightness-90"
          />
          <p className="font-script text-xl text-aura-gold/90 leading-tight">
            Good Coffee,
          </p>
          <p className="font-script text-xl text-aura-gold/90 leading-tight">
            Good Moments.
          </p>
        </div>
      </div>
    </aside>
  );
};

