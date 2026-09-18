import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { RecipeManagement } from './RecipeManagement';
import { CategoryManagement } from './CategoryManagement';
import { OrderManagement } from './OrderManagement';
import { AnalyticsView } from './AnalyticsView';
import { CustomersView } from './CustomersView';
import { useStore } from '../../context/StoreContext';
import { Package, Settings as SettingsIcon, Save } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { adminTab, setAdminTab, showToast } = useStore();
  const [searchFilter, setSearchFilter] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Settings State
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'AURA COFFEE Roastery & Atelier',
    currency: 'PKR (Rs.)',
    taxRate: '5.00',
    orderLeadTime: '15',
    address: 'Nishtar Colony, Ferozepur Road, Lahore, Pakistan',
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Store settings saved successfully');
  };

  return (
    <div className="min-h-screen bg-[#0d0907] flex text-aura-cream">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar activeTab={adminTab} setActiveTab={setAdminTab} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-64 h-full bg-[#0d0907] z-10 shadow-2xl">
            <AdminSidebar
              activeTab={adminTab}
              setActiveTab={setAdminTab}
              onCloseMobile={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          searchQuery={searchFilter}
          setSearchQuery={setSearchFilter}
          onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        <main className="p-3 sm:p-6 md:p-8 flex-1 overflow-y-auto min-w-0">
          {adminTab === 'recipes' && <RecipeManagement searchFilter={searchFilter} />}
          {adminTab === 'categories' && <CategoryManagement />}
          {adminTab === 'orders' && <OrderManagement searchFilter={searchFilter} />}
          {adminTab === 'analytics' && <AnalyticsView />}
          {adminTab === 'customers' && <CustomersView />}

          {/* Inventory Tab */}
          {adminTab === 'inventory' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-aura-cream">
                  Roastery Inventory
                </h1>
                <p className="text-xs sm:text-sm text-aura-cream/60 mt-1">
                  Track raw green bean stocks, roasted bean canisters, dairy supplies, and bakery inventory.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#120d0a] border border-[#241913] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-aura-cream">Ethiopia Yirgacheffe</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Optimal
                    </span>
                  </div>
                  <p className="text-xs text-aura-cream/60">Green Bean Sacks: 140 kg in dry cellar</p>
                  <div className="w-full bg-aura-surface h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[78%]" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#120d0a] border border-[#241913] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-aura-cream">Colombia Huila Valley</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-950 text-amber-300 border border-amber-800">
                      Reorder Soon
                    </span>
                  </div>
                  <p className="text-xs text-aura-cream/60">Green Bean Sacks: 32 kg in dry cellar</p>
                  <div className="w-full bg-aura-surface h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[35%]" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#120d0a] border border-[#241913] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-aura-cream">Organic Oat & Whole Milk</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Optimal
                    </span>
                  </div>
                  <p className="text-xs text-aura-cream/60">Cold Fridge Storage: 85 Liters</p>
                  <div className="w-full bg-aura-surface h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[85%]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {adminTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-aura-cream">
                  Atelier Settings
                </h1>
                <p className="text-xs sm:text-sm text-aura-cream/60 mt-1">
                  Configure restaurant operational parameters, currencies, and tax rates.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-[#120d0a] border border-[#241913] space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-aura-cream/80 mb-1">
                    Store Brand Name
                  </label>
                  <input
                    type="text"
                    value={storeSettings.storeName}
                    onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-aura-cream/80 mb-1">
                      Currency
                    </label>
                    <input
                      type="text"
                      value={storeSettings.currency}
                      onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-aura-cream/80 mb-1">
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={storeSettings.taxRate}
                      onChange={(e) => setStoreSettings({ ...storeSettings, taxRate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-aura-cream/80 mb-1">
                    Store Address
                  </label>
                  <input
                    type="text"
                    value={storeSettings.address}
                    onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#dfbe90] hover:bg-[#eccaa0] text-[#120d0a] font-semibold text-xs tracking-wider uppercase flex items-center space-x-2 transition-all shadow-md mt-4"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Atelier Settings</span>
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

