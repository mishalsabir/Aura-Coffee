import React from 'react';
import { ShoppingBag, DollarSign, Users, Coffee, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AnalyticsView: React.FC = () => {
  const { orders, recipes, customers } = useStore();

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalCustomers = customers.length;
  const totalRecipes = recipes.length;

  // Mock revenue chart points (PKR)
  const revenueData = [
    { day: 'Mon', revenue: 42000, orders: 28 },
    { day: 'Tue', revenue: 58000, orders: 36 },
    { day: 'Wed', revenue: 64000, orders: 42 },
    { day: 'Thu', revenue: 72000, orders: 48 },
    { day: 'Fri', revenue: 98000, orders: 64 },
    { day: 'Sat', revenue: 142000, orders: 92 },
    { day: 'Sun', revenue: 128000, orders: 84 },
  ];

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  // Category sales breakdown
  const categoryBreakdown = [
    { category: 'Specialty', percentage: 38, count: 184, color: 'bg-purple-500' },
    { category: 'Hot Coffee', percentage: 28, count: 136, color: 'bg-amber-600' },
    { category: 'Cold Coffee', percentage: 20, count: 96, color: 'bg-blue-500' },
    { category: 'Espresso', percentage: 8, count: 42, color: 'bg-amber-800' },
    { category: 'Desserts', percentage: 6, count: 30, color: 'bg-yellow-600' },
  ];

  return (
    <div className="space-y-8 text-aura-cream">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-aura-cream">
          Business & Roastery Analytics
        </h1>
        <p className="text-xs sm:text-sm text-aura-cream/60 mt-1">
          Performance metrics, revenue telemetry, and coffee consumption patterns.
        </p>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Orders */}
        <div className="p-5 rounded-2xl bg-[#140e0b] border border-[#2a1d15] shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-aura-cream/60 uppercase tracking-wider block">
              Total Orders
            </span>
            <span className="font-serif text-3xl font-bold text-aura-cream">
              {totalOrders + 138}
            </span>
            <div className="flex items-center space-x-1 text-emerald-400 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% this week</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-aura-surface border border-aura-border flex items-center justify-center text-aura-gold">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="p-5 rounded-2xl bg-[#140e0b] border border-[#2a1d15] shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-aura-cream/60 uppercase tracking-wider block">
              Total Revenue
            </span>
            <span className="font-serif 2xl:text-3xl text-2xl font-bold text-aura-gold whitespace-nowrap">
              Rs. {(totalRevenue + 148000).toLocaleString()}
            </span>
            <div className="flex items-center space-x-1 text-emerald-400 text-xs font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+24.1% vs target</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-aura-surface border border-aura-border flex items-center justify-center text-aura-gold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Total Customers */}
        <div className="p-5 rounded-2xl bg-[#140e0b] border border-[#2a1d15] shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-aura-cream/60 uppercase tracking-wider block">
              Registered Guests
            </span>
            <span className="font-serif text-3xl font-bold text-aura-cream">
              {totalCustomers + 210}
            </span>
            <div className="flex items-center space-x-1 text-aura-gold text-xs font-semibold">
              <span>88% return rate</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-aura-surface border border-aura-border flex items-center justify-center text-aura-gold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Total Recipes */}
        <div className="p-5 rounded-2xl bg-[#140e0b] border border-[#2a1d15] shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-aura-cream/60 uppercase tracking-wider block">
              Active Recipes
            </span>
            <span className="font-serif text-3xl font-bold text-aura-cream">
              {totalRecipes}
            </span>
            <div className="flex items-center space-x-1 text-aura-cream/60 text-xs">
              <span>across {new Set(recipes.map((r) => r.category)).size} categories</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-aura-surface border border-aura-border flex items-center justify-center text-aura-gold">
            <Coffee className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Modern Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Revenue Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#120d0a] border border-[#241913] shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-aura-cream">Weekly Revenue & Volume</h3>
              <p className="text-xs text-aura-cream/50">Daily revenue distribution in PKR (Rs.)</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-aura-surface border border-aura-border text-aura-gold">
              Last 7 Days
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2">
            {revenueData.map((item) => {
              const heightPercent = (item.revenue / maxRevenue) * 100;
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-aura-cream/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Rs. {item.revenue.toLocaleString()}
                  </span>
                  <div className="w-full max-w-[42px] bg-aura-surface rounded-t-lg overflow-hidden h-44 flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-aura-gold-dark to-aura-gold rounded-t-lg group-hover:brightness-125 transition-all duration-300"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs text-aura-cream/60 font-medium">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Popular Categories Breakdown (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#120d0a] border border-[#241913] shadow-xl space-y-5">
          <div>
            <h3 className="font-serif text-lg font-bold text-aura-cream">Popular Categories</h3>
            <p className="text-xs text-aura-cream/50">Sales distribution across drink styles</p>
          </div>

          <div className="space-y-4">
            {categoryBreakdown.map((cat) => (
              <div key={cat.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-aura-cream">{cat.category}</span>
                  <span className="text-aura-cream/60 font-mono">
                    {cat.count} orders ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-aura-surface overflow-hidden">
                  <div
                    className={`h-full ${cat.color} rounded-full`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Top selling item callout */}
          <div className="p-4 rounded-xl bg-aura-surface/60 border border-aura-border/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-aura-gold font-semibold block">
                Top Drink Today
              </span>
              <span className="font-serif text-sm font-bold text-aura-cream">
                Caramel Latte (64 orders)
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">+Rs. 67,200</span>
          </div>
        </div>
      </div>
    </div>
  );
};

