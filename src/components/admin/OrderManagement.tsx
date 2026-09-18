import React, { useState } from 'react';
import { ShoppingBag, Clock, Phone, MapPin, Search } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { OrderStatus } from '../../types';

interface OrderManagementProps {
  searchFilter: string;
}

export const OrderManagement: React.FC<OrderManagementProps> = ({ searchFilter }) => {
  const { orders, updateOrderStatus } = useStore();
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const allStatuses: (OrderStatus | 'All')[] = [
    'All',
    'Pending',
    'Confirmed',
    'Preparing',
    'Ready',
    'Completed',
    'Cancelled',
  ];

  const filteredOrders = orders.filter((order) => {
    const matchStatus = statusFilter === 'All' || order.status === statusFilter;
    const q = searchFilter.toLowerCase().trim();
    const matchSearch =
      !q ||
      order.id.toLowerCase().includes(q) ||
      order.customer.name.toLowerCase().includes(q) ||
      order.customer.email.toLowerCase().includes(q) ||
      order.items.some((i) => i.name.toLowerCase().includes(q));

    return matchStatus && matchSearch;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-950 text-amber-300 border border-amber-800/80';
      case 'Confirmed':
        return 'bg-blue-950 text-blue-300 border border-blue-800/80';
      case 'Preparing':
        return 'bg-purple-950 text-purple-300 border border-purple-800/80';
      case 'Ready':
        return 'bg-teal-950 text-teal-300 border border-teal-800/80';
      case 'Completed':
        return 'bg-emerald-950 text-emerald-300 border border-emerald-800/80';
      case 'Cancelled':
        return 'bg-rose-950 text-rose-300 border border-rose-800/80';
      default:
        return 'bg-aura-surface text-aura-cream';
    }
  };

  return (
    <div className="space-y-6 text-aura-cream">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-aura-cream">
          Orders Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-aura-cream/60 mt-1">
          Monitor incoming customer orders in real-time, view item breakdowns, and update order statuses.
        </p>
      </div>

      {/* Status Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {allStatuses.map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all shrink-0 ${
              statusFilter === st
                ? 'bg-[#dfbe90] text-[#120d0a] font-bold shadow-sm'
                : 'bg-aura-surface text-aura-cream/70 hover:text-aura-cream border border-aura-border'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-[#120d0a] border border-[#241913] rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#241913] text-aura-cream/50 text-[11px] uppercase tracking-wider bg-aura-surface/40">
                <th className="py-3.5 px-4 font-semibold">Order ID</th>
                <th className="py-3.5 px-4 font-semibold">Customer</th>
                <th className="py-3.5 px-4 font-semibold">Items</th>
                <th className="py-3.5 px-4 font-semibold">Total</th>
                <th className="py-3.5 px-4 font-semibold">Date & Service</th>
                <th className="py-3.5 px-4 font-semibold text-right">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#20150f]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-aura-cream/50">
                    No orders found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-aura-surface/50 transition-colors">
                    {/* Order ID */}
                    <td className="py-4 px-4 font-mono font-bold text-aura-gold whitespace-nowrap">
                      {order.id}
                    </td>

                    {/* Customer Info */}
                    <td className="py-4 px-4">
                      <span className="font-semibold text-aura-cream block">
                        {order.customer.name}
                      </span>
                      <span className="text-[11px] text-aura-cream/60 block">
                        {order.customer.email}
                      </span>
                      <span className="text-[10px] text-aura-cream/40 block">
                        {order.customer.phone}
                      </span>
                    </td>

                    {/* Items List */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs">
                            <span className="font-mono text-aura-gold">{item.quantity}x</span>
                            <span className="text-aura-cream/90 truncate">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Total */}
                    <td className="py-4 px-4 font-mono font-bold text-aura-cream whitespace-nowrap">
                      Rs. {order.total.toLocaleString()}
                    </td>

                    {/* Date & Service */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-aura-cream/70">
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-aura-gold/80" />
                        <span>{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <span className="text-[10px] uppercase font-semibold text-aura-cream/50 block mt-0.5">
                        {order.customer.type}
                        {order.customer.address && ` • ${order.customer.address.slice(0, 18)}...`}
                      </span>
                    </td>

                    {/* Status Dropdown Selector */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer focus:outline-none ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        <option value="Pending" className="bg-[#120d0a] text-amber-300">Pending</option>
                        <option value="Confirmed" className="bg-[#120d0a] text-blue-300">Confirmed</option>
                        <option value="Preparing" className="bg-[#120d0a] text-purple-300">Preparing</option>
                        <option value="Ready" className="bg-[#120d0a] text-teal-300">Ready</option>
                        <option value="Completed" className="bg-[#120d0a] text-emerald-300">Completed</option>
                        <option value="Cancelled" className="bg-[#120d0a] text-rose-300">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

