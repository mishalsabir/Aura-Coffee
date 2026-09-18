import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Recipe, Category, CartItem, Order, OrderStatus, Customer } from '../types';
import { INITIAL_RECIPES, INITIAL_CATEGORIES, INITIAL_ORDERS, INITIAL_CUSTOMERS } from '../data/initialData';
import { supabase } from '../lib/supabase';

interface StoreContextType {
  recipes: Recipe[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  cart: CartItem[];
  favorites: string[];
  isLoading: boolean;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isSearchOpen: boolean;
  searchQuery: string;
  activeView: 'customer' | 'admin';
  adminTab: string;
  hasIntroPlayed: boolean;
  toastMessage: string | null;

  // Recipe actions
  addRecipe: (recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) => Promise<Recipe>;
  updateRecipe: (id: string, updates: Partial<Recipe>) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  toggleRecipeStatus: (id: string) => Promise<void>;

  // Category actions
  addCategory: (name: string) => Promise<Category>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

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
  createOrder: (customer: Order['customer']) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;

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
  resetToDefaults: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Helpers to map between DB schema (snake_case) and Client types (camelCase)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDbRecipeToClient = (r: any): Recipe => ({
  id: r.id,
  name: r.name,
  description: r.description || '',
  price: Number(r.price),
  category: r.category,
  image: r.image,
  status: r.status as 'active' | 'inactive',
  rating: r.rating ? Number(r.rating) : 4.9,
  isSignature: Boolean(r.is_signature),
  isBestSeller: Boolean(r.is_best_seller),
  calories: r.calories ? Number(r.calories) : undefined,
  volume: r.volume || undefined,
  created_at: r.created_at,
  updated_at: r.updated_at,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapClientRecipeToDb = (r: Partial<Recipe>): Record<string, any> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: Record<string, any> = {};
  if (r.id !== undefined) out.id = r.id;
  if (r.name !== undefined) out.name = r.name;
  if (r.description !== undefined) out.description = r.description;
  if (r.price !== undefined) out.price = r.price;
  if (r.category !== undefined) out.category = r.category;
  if (r.image !== undefined) out.image = r.image;
  if (r.status !== undefined) out.status = r.status;
  if (r.rating !== undefined) out.rating = r.rating;
  if (r.isSignature !== undefined) out.is_signature = r.isSignature;
  if (r.isBestSeller !== undefined) out.is_best_seller = r.isBestSeller;
  if (r.calories !== undefined) out.calories = r.calories;
  if (r.volume !== undefined) out.volume = r.volume;
  if (r.updated_at !== undefined) out.updated_at = r.updated_at;
  return out;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDbCategoryToClient = (c: any): Category => ({
  id: c.id,
  name: c.name,
  status: c.status as 'active' | 'inactive',
  badgeColor: c.badge_color || undefined,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDbOrderToClient = (o: any): Order => ({
  id: o.id,
  customer: {
    name: o.customer_name,
    email: o.customer_email,
    phone: o.customer_phone,
    address: o.customer_address || undefined,
    type: o.order_type as 'pickup' | 'delivery',
  },
  items: typeof o.items === 'string' ? JSON.parse(o.items) : o.items,
  subtotal: Number(o.subtotal),
  tax: Number(o.tax),
  total: Number(o.total),
  status: o.status as OrderStatus,
  created_at: o.created_at,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDbCustomerToClient = (c: any): Customer => ({
  id: c.id,
  name: c.name,
  email: c.email,
  phone: c.phone,
  totalOrders: Number(c.total_orders || 0),
  totalSpent: Number(c.total_spent || 0),
  lastOrderDate: c.last_order_date,
});

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialized with fallback defaults, populated from Supabase
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [favorites, setFavorites] = useState<string[]>(['rec-8', 'rec-2']);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'customer' | 'admin'>('customer');
  const [adminTab, setAdminTab] = useState('recipes');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Intro state: session-based
  const [hasIntroPlayed, setHasIntroPlayedState] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('aura_intro_played') === 'true';
    } catch {
      return false;
    }
  });

  const setHasIntroPlayed = (played: boolean) => {
    setHasIntroPlayedState(played);
    try {
      sessionStorage.setItem('aura_intro_played', String(played));
    } catch {
      // ignore
    }
  };

  const replayIntro = () => {
    setHasIntroPlayedState(false);
    try {
      sessionStorage.removeItem('aura_intro_played');
    } catch {
      // ignore
    }
  };

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  }, []);

  // 1. Initial Data Fetch from Supabase Database
  const fetchAllData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [recRes, catRes, ordRes, custRes] = await Promise.all([
        supabase.from('recipes').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('created_at', { ascending: true }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('customers').select('*').order('last_order_date', { ascending: false }),
      ]);

      if (recRes.data && recRes.data.length > 0) {
        setRecipes(recRes.data.map(mapDbRecipeToClient));
      }
      if (catRes.data && catRes.data.length > 0) {
        setCategories(catRes.data.map(mapDbCategoryToClient));
      }
      if (ordRes.data && ordRes.data.length > 0) {
        setOrders(ordRes.data.map(mapDbOrderToClient));
      }
      if (custRes.data && custRes.data.length > 0) {
        setCustomers(custRes.data.map(mapDbCustomerToClient));
      }
    } catch (err) {
      console.error('Error fetching Supabase data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 2. Real-time Subscription via Supabase Channels
  useEffect(() => {
    fetchAllData();

    // Listen to real-time changes across all 4 tables
    const channel = supabase
      .channel('aura-realtime-db-sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'recipes' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newItem = mapDbRecipeToClient(payload.new);
            setRecipes((prev) => [newItem, ...prev.filter((r) => r.id !== newItem.id)]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedItem = mapDbRecipeToClient(payload.new);
            setRecipes((prev) =>
              prev.map((r) => (r.id === updatedItem.id ? updatedItem : r))
            );
          } else if (payload.eventType === 'DELETE') {
            const deletedId = (payload.old as { id: string }).id;
            setRecipes((prev) => prev.filter((r) => r.id !== deletedId));
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'categories' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newItem = mapDbCategoryToClient(payload.new);
            setCategories((prev) => [...prev.filter((c) => c.id !== newItem.id), newItem]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedItem = mapDbCategoryToClient(payload.new);
            setCategories((prev) =>
              prev.map((c) => (c.id === updatedItem.id ? updatedItem : c))
            );
          } else if (payload.eventType === 'DELETE') {
            const deletedId = (payload.old as { id: string }).id;
            setCategories((prev) => prev.filter((c) => c.id !== deletedId));
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newItem = mapDbOrderToClient(payload.new);
            setOrders((prev) => [newItem, ...prev.filter((o) => o.id !== newItem.id)]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedItem = mapDbOrderToClient(payload.new);
            setOrders((prev) =>
              prev.map((o) => (o.id === updatedItem.id ? updatedItem : o))
            );
          } else if (payload.eventType === 'DELETE') {
            const deletedId = (payload.old as { id: string }).id;
            setOrders((prev) => prev.filter((o) => o.id !== deletedId));
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'customers' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newItem = mapDbCustomerToClient(payload.new);
            setCustomers((prev) => [newItem, ...prev.filter((c) => c.id !== newItem.id)]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedItem = mapDbCustomerToClient(payload.new);
            setCustomers((prev) =>
              prev.map((c) => (c.id === updatedItem.id ? updatedItem : c))
            );
          } else if (payload.eventType === 'DELETE') {
            const deletedId = (payload.old as { id: string }).id;
            setCustomers((prev) => prev.filter((c) => c.id !== deletedId));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAllData]);

  // 3. RECIPE DATABASE ACTIONS
  const addRecipe = async (
    recipeData: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Recipe> => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: `rec-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Optimistic UI update
    setRecipes((prev) => [newRecipe, ...prev]);
    showToast(`"${newRecipe.name}" added to Supabase database`);

    // Supabase DB insert
    const dbPayload = mapClientRecipeToDb(newRecipe);
    const { error } = await supabase.from('recipes').insert([dbPayload]);
    if (error) {
      console.error('Failed to insert recipe into Supabase:', error);
      showToast(`Error saving to database: ${error.message}`);
    }

    return newRecipe;
  };

  const updateRecipe = async (id: string, updates: Partial<Recipe>): Promise<void> => {
    const timestamp = new Date().toISOString();
    // Optimistic update
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates, updated_at: timestamp } : r))
    );
    showToast('Recipe updated in Supabase');

    const dbPayload = mapClientRecipeToDb({ ...updates, updated_at: timestamp });
    const { error } = await supabase.from('recipes').update(dbPayload).eq('id', id);
    if (error) {
      console.error('Failed to update recipe in Supabase:', error);
      showToast(`Error updating database: ${error.message}`);
    }
  };

  const deleteRecipe = async (id: string): Promise<void> => {
    const target = recipes.find((r) => r.id === id);
    // Optimistic update
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    if (target) showToast(`"${target.name}" removed from database`);

    const { error } = await supabase.from('recipes').delete().eq('id', id);
    if (error) {
      console.error('Failed to delete recipe from Supabase:', error);
      showToast(`Error deleting from database: ${error.message}`);
    }
  };

  const toggleRecipeStatus = async (id: string): Promise<void> => {
    const target = recipes.find((r) => r.id === id);
    if (!target) return;
    const newStatus = target.status === 'active' ? 'inactive' : 'active';
    const timestamp = new Date().toISOString();

    setRecipes((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: newStatus, updated_at: timestamp } : r
      )
    );
    showToast(
      `"${target.name}" is now ${newStatus === 'active' ? 'visible on website' : 'hidden from website'}`
    );

    const { error } = await supabase
      .from('recipes')
      .update({ status: newStatus, updated_at: timestamp })
      .eq('id', id);

    if (error) {
      console.error('Failed to toggle status in Supabase:', error);
    }
  };

  // 4. CATEGORY DATABASE ACTIONS
  const addCategory = async (name: string): Promise<Category> => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
      status: 'active',
      badgeColor: 'bg-[#4a2e1b] text-[#edd5be] border border-[#6b452b]',
    };

    setCategories((prev) => [...prev, newCategory]);
    showToast(`Category "${name}" created in database`);

    const { error } = await supabase.from('categories').insert([
      {
        id: newCategory.id,
        name: newCategory.name,
        status: newCategory.status,
        badge_color: newCategory.badgeColor,
      },
    ]);

    if (error) {
      console.error('Failed to insert category into Supabase:', error);
      showToast(`Error saving category: ${error.message}`);
    }

    return newCategory;
  };

  const updateCategory = async (id: string, updates: Partial<Category>): Promise<void> => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    showToast('Category updated in Supabase');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dbPayload: Record<string, any> = {};
    if (updates.name !== undefined) dbPayload.name = updates.name;
    if (updates.status !== undefined) dbPayload.status = updates.status;
    if (updates.badgeColor !== undefined) dbPayload.badge_color = updates.badgeColor;

    const { error } = await supabase.from('categories').update(dbPayload).eq('id', id);
    if (error) {
      console.error('Failed to update category in Supabase:', error);
    }
  };

  const deleteCategory = async (id: string): Promise<void> => {
    const target = categories.find((c) => c.id === id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    if (target) showToast(`Category "${target.name}" deleted`);

    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      console.error('Failed to delete category in Supabase:', error);
    }
  };

  // 5. CART ACTIONS (Client Session)
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

  // 6. ORDER DATABASE ACTIONS
  const createOrder = async (customerData: Order['customer']): Promise<Order> => {
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

    // Optimistic UI update
    setOrders((prev) => [newOrder, ...prev]);

    // Insert order into Supabase
    const { error: orderErr } = await supabase.from('orders').insert([
      {
        id: newOrder.id,
        customer_name: customerData.name,
        customer_email: customerData.email,
        customer_phone: customerData.phone,
        customer_address: customerData.address || null,
        order_type: customerData.type,
        items: newOrder.items,
        subtotal: newOrder.subtotal,
        tax: newOrder.tax,
        total: newOrder.total,
        status: newOrder.status,
        created_at: newOrder.created_at,
      },
    ]);

    if (orderErr) {
      console.error('Failed to save order in Supabase:', orderErr);
    }

    // Upsert Customer in Supabase
    const existingCust = customers.find(
      (c) => c.email.toLowerCase() === customerData.email.toLowerCase()
    );

    const updatedCustomer: Customer = existingCust
      ? {
          ...existingCust,
          totalOrders: existingCust.totalOrders + 1,
          totalSpent: +(existingCust.totalSpent + newOrder.total).toFixed(2),
          lastOrderDate: newOrder.created_at,
        }
      : {
          id: `cust-${Date.now()}`,
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
          totalOrders: 1,
          totalSpent: newOrder.total,
          lastOrderDate: newOrder.created_at,
        };

    setCustomers((prev) => [
      updatedCustomer,
      ...prev.filter((c) => c.email.toLowerCase() !== customerData.email.toLowerCase()),
    ]);

    await supabase.from('customers').upsert([
      {
        id: updatedCustomer.id,
        name: updatedCustomer.name,
        email: updatedCustomer.email,
        phone: updatedCustomer.phone,
        total_orders: updatedCustomer.totalOrders,
        total_spent: updatedCustomer.totalSpent,
        last_order_date: updatedCustomer.lastOrderDate,
      },
    ]);

    clearCart();
    showToast(`Order #${newOrder.id} placed successfully!`);
    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order #${orderId} updated to "${status}" in Supabase`);

    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      console.error('Failed to update order status in Supabase:', error);
    }
  };

  // 7. FAVORITES
  const toggleFavorite = (recipeId: string) => {
    setFavorites((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );
  };

  const isFavorite = (recipeId: string) => favorites.includes(recipeId);

  // 8. RESET UTILITY (Reseeds Supabase)
  const resetToDefaults = async (): Promise<void> => {
    setIsLoading(true);
    showToast('Resetting Supabase database to default menu...');

    try {
      // Re-seed Supabase database
      for (const r of INITIAL_RECIPES) {
        await supabase.from('recipes').upsert([mapClientRecipeToDb(r)]);
      }
      for (const c of INITIAL_CATEGORIES) {
        await supabase.from('categories').upsert([
          {
            id: c.id,
            name: c.name,
            status: c.status,
            badge_color: c.badgeColor,
          },
        ]);
      }
      await fetchAllData();
      showToast('Database reset to master luxury coffee menu!');
    } catch (err) {
      console.error('Error resetting to defaults:', err);
    } finally {
      setIsLoading(false);
    }
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
        isLoading,
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
