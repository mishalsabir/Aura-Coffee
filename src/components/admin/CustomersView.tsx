import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Phone, ShoppingBag, DollarSign } from 'lucide-react';

export const CustomersView: React.FC = () => {
  const { customers } = useStore();

  return (
    <div className="space-y-6 text-aura-cream">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-aura-cream">
          Customer Directory
        </h1>
        <p className="text-xs sm:text-sm text-aura-cream/60 mt-1">
          Registered cafe patrons, membership tier, and historical order totals.
        </p>
      </div>

      <div className="bg-[#120d0a] border border-[#241913] rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[#241913] text-aura-cream/50 text-[11px] uppercase tracking-wider bg-aura-surface/40">
              <th className="py-3.5 px-6 font-semibold">Guest Name</th>
              <th className="py-3.5 px-6 font-semibold">Contact</th>
              <th className="py-3.5 px-6 font-semibold">Orders Count</th>
              <th className="py-3.5 px-6 font-semibold">Total Spent</th>
              <th className="py-3.5 px-6 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#20150f]">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-aura-surface/50 transition-colors">
                <td className="py-4 px-6">
                  <span className="font-semibold text-aura-cream block">{c.name}</span>
                  <span className="text-[10px] text-aura-gold/80 uppercase font-semibold">
                    Gold Reserve Member
                  </span>
                </td>

                <td className="py-4 px-6 space-y-0.5">
                  <div className="flex items-center space-x-1.5 text-aura-cream/70 text-xs">
                    <Mail className="w-3 h-3 text-aura-gold/60" />
                    <span>{c.email}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-aura-cream/50 text-xs">
                    <Phone className="w-3 h-3 text-aura-gold/60" />
                    <span>{c.phone}</span>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <span className="font-mono font-bold text-aura-cream">
                    {c.totalOrders} visits
                  </span>
                </td>

                <td className="py-4 px-6">
                  <span className="font-mono font-bold text-aura-gold whitespace-nowrap">
                    Rs. {c.totalSpent.toLocaleString()}
                  </span>
                </td>

                <td className="py-4 px-6 text-right">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    VIP Connoisseur
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

