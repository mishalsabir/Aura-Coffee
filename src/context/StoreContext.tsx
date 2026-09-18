import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recipe, Category, CartItem, Order, OrderStatus, Customer } from '../types';
import { INITIAL_RECIPES, INITIAL_CATEGORIES, INITIAL_ORDERS, INITIAL_CUSTOMERS } from '../data/initialData';

interface StoreContextType {
  recipes: Recipe[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  cart: CartItem[];
  favorites: string[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isSearchOpen: boolean;
  searchQuery: string;
  activeView: 'customer' | 'admin';
  adminTab: string;
  hasIntroPlayed: boolean;
  toastMessage: string | null;

  // Recipe actions
  addRecipe: (recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) => Recipe;
  updateRecipe: (id: string, updates: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  toggleRecipeStatus: (id: string) => void;

  // Category actions
  addCategory: (name: string) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Cart actions
  addToCart: (recipe: Recipe, quantity?: number) => void;
  removeFromCart: (recipeId: string) => void;
  updateCartQuantity: (recipeId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartTax: number;
  cartTotal: number;

  // Order actions
  createOrder: (customer: Order['customer']) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // UI state
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setActiveView: (view: 'customer' | 'admin') => void;
  setAdminTab: (tab: string) => void;
  setHasIntroPlayed: (played: boolean) => void;
  replayIntro: () => void;
  showToast: (msg: string) => void;
  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  RECIPES: 'aura_coffee_recipes_v3_pkr',
  CATEGORIES: 'aura_coffee_categories_v3_pkr',
  ORDERS: 'aura_coffee_orders_v3_pkr',
  CUSTOMERS: 'aura_coffee_customers_v3_pkr',
  FAVORITES: 'aura_coffee_favorites_v3_pkr',
  INTRO_PLAYED: 'aura_coffee_intro_played_v3',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Recipes state
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECIPES);
      return saved ? JSON.parse(saved) : INITIAL_RECIPES;
    } catch {
      return INITIAL_RECIPES;
    }
  });

  // Categories state
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Customers state
  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : ['rec-8', 'rec-2'];
    } catch {
      return ['rec-8', 'rec-2'];
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'customer' | 'admin'>('customer');
  const [adminTab, setAdminTab] = useState('recipes');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Intro state: check session or localStorage
  const [hasIntroPlayed, setHasIntroPlayedState] = useState<boolean>(() => {
    try {
      const sessionDismiss = sessionStorage.getItem(STORAGE_KEYS.INTRO_PLAYED);
      return sessionDismiss === 'true';
    } catch {
      return false;
    }
  });

  const setHasIntroPlayed = (played: boolean) => {
    setHasIntroPlayedState(played);
    try {
      sessionStorage.setItem(STORAGE_KEYS.INTRO_PLAYED, String(played));
    } catch (e) {
      console.warn(e);
    }
  };

  const replayIntro = () => {
    setHasIntroPlayedState(false);
    sessionStorage.removeItem(STORAGE_KEYS.INTRO_PLAYED);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
    } catch (e) {
      console.error(e);
    }
  }, [recipes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
    } catch (e) {
      console.error(e);
    }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Broadcast channel for cross-tab sync
  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('aura_coffee_channel');
      channel.onmessage = (event) => {
        if (event.data?.type === 'SYNC') {
          const rec = localStorage.getItem(STORAGE_KEYS.RECIPES);
          if (rec) setRecipes(JSON.parse(rec));
          const cat = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
          if (cat) setCategories(JSON.parse(cat));
          const ord = localStorage.getItem(STORAGE_KEYS.ORDERS);
          if (ord) setOrders(JSON.parse(ord));
        }
      };
    } catch (e) {
      console.warn('BroadcastChannel not supported', e);
    }
    return () => {
      if (channel) channel.close();
    };
  }, []);

  const notifySync = () => {
    try {
      const channel = new BroadcastChannel('aura_coffee_channel');
      channel.postMessage({ type: 'SYNC' });
      channel.close();
    } catch {
      // ignore
    }
  };

  // RECIPE ACTIONS
  const addRecipe = (recipeData: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: `rec-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setRecipes((prev) => [newRecipe, ...prev]);
    showToast(`"${newRecipe.name}" added to menu`);
    notifySync();
    return newRecipe;
  };

  const updateRecipe = (id: string, updates: Partial<Recipe>) => {
    setRecipes((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const updated = { ...r, ...updates, updated_at: new Date().toISOString() };
          return updated;
        }
        return r;
      })
    );
    showToast('Recipe updated successfully');
    notifySync();
  };

  const deleteRecipe = (id: string) => {
    const target = recipes.find((r) => r.id === id);
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    if (target) showToast(`"${target.name}" removed from menu`);
    notifySync();
  };

  const toggleRecipeStatus = (id: string) => {
    setRecipes((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const newStatus = r.status === 'active' ? 'inactive' : 'active';
          showToast(`"${r.name}" is now ${newStatus === 'active' ? 'visible on website' : 'hidden from website'}`);
          return { ...r, status: newStatus, updated_at: new Date().toISOString() };
        }
        return r;
      })
    );
    notifySync();
  };

  // CATEGORY ACTIONS
  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
      status: 'active',
      badgeColor: 'bg-[#4a2e1b] text-[#edd5be] border border-[#6b452b]',
    };
    setCategories((prev) => [...prev, newCategory]);
    showToast(`Category "${name}" created`);
    notifySync();
    return newCategory;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    showToast('Category updated');
    notifySync();
  };

  const deleteCategory = (id: string) => {
    const target = categories.find((c) => c.id === id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    if (target) showToast(`Category "${target.name}" deleted`);
    notifySync();
  };

  // CART ACTIONS
  const addToCart = (recipe: Recipe, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.recipe.id === recipe.id);
      if (existing) {
        return prev.map((item) =>
          item.recipe.id === recipe.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { recipe, quantity }];
    });
    showToast(`Added ${recipe.name} to cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (recipeId: string) => {
    setCart((prev) => prev.filter((item) => item.recipe.id !== recipeId));
  };

  const updateCartQuantity = (recipeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(recipeId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.recipe.id === recipeId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.recipe.price * item.quantity, 0);
  const cartTax = Math.round(cartSubtotal * 0.08);
  const cartTotal = cartSubtotal + cartTax;

  // ORDER ACTIONS
  const createOrder = (customerData: Order['customer']) => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: customerData,
      items: cart.map((item) => ({
        recipeId: item.recipe.id,
        name: item.recipe.name,
        price: item.recipe.price,
        quantity: item.quantity,
        image: item.recipe.image,
      })),
      subtotal: cartSubtotal,
      tax: cartTax,
      total: cartTotal,
      status: 'Pending',
      created_at: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update or add customer record
    setCustomers((prev) => {
      const existing = prev.find((c) => c.email.toLowerCase() === customerData.email.toLowerCase());
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpent: +(c.totalSpent + newOrder.total).toFixed(2),
                lastOrderDate: newOrder.created_at,
              }
            : c
        );
      } else {
        const newCust: Customer = {
          id: `cust-${Date.now()}`,
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
          totalOrders: 1,
          totalSpent: newOrder.total,
          lastOrderDate: newOrder.created_at,
        };
        return [newCust, ...prev];
      }
    });

    clearCart();
    notifySync();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order #${orderId} updated to "${status}"`);
    notifySync();
  };

  // FAVORITES
  const toggleFavorite = (recipeId: string) => {
    setFavorites((prev) => {
      if (prev.includes(recipeId)) {
        return prev.filter((id) => id !== recipeId);
      } else {
        return [...prev, recipeId];
      }
    });
  };

  const isFavorite = (recipeId: string) => favorites.includes(recipeId);

  // RESET UTILITY
  const resetToDefaults = () => {
    setRecipes(INITIAL_RECIPES);
    setCategories(INITIAL_CATEGORIES);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    localStorage.removeItem(STORAGE_KEYS.RECIPES);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
    showToast('Reset data to default luxury coffee menu');
    notifySync();
  };

  return (
    <StoreContext.Provider
      value={{
        recipes,
        categories,
        orders,
        customers,
        cart,
        favorites,
        isCartOpen,
        isCheckoutOpen,
        isSearchOpen,
        searchQuery,
        activeView,
        adminTab,
        hasIntroPlayed,
        toastMessage,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        toggleRecipeStatus,
        addCategory,
        updateCategory,
        deleteCategory,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartTax,
        cartTotal,
        createOrder,
        updateOrderStatus,
        toggleFavorite,
        isFavorite,
        setIsCartOpen,
        setIsCheckoutOpen,
        setIsSearchOpen,
        setSearchQuery,
        setActiveView,
        setAdminTab,
        setHasIntroPlayed,
        replayIntro,
        showToast,
        resetToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

