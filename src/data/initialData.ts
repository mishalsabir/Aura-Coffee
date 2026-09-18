import { Recipe, Category, Order, Customer, Review, CoffeeBean } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Espresso', status: 'active', badgeColor: 'bg-[#4a2e1b] text-[#edd5be] border border-[#6b452b]' },
  { id: 'cat-2', name: 'Hot Coffee', status: 'active', badgeColor: 'bg-[#5e271d] text-[#f7cfc8] border border-[#85382b]' },
  { id: 'cat-3', name: 'Cold Coffee', status: 'active', badgeColor: 'bg-[#183952] text-[#c4e3fb] border border-[#235073]' },
  { id: 'cat-4', name: 'Specialty', status: 'active', badgeColor: 'bg-[#3b244d] text-[#e5d0f7] border border-[#54336e]' },
  { id: 'cat-5', name: 'Desserts', status: 'active', badgeColor: 'bg-[#543d22] text-[#fce4c3] border border-[#785731]' },
];

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    name: 'Espresso',
    description: 'Rich, bold and full of character. Our classic espresso is pure coffee in its simplest form.',
    price: 650,
    category: 'Espresso',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.9,
    isBestSeller: true,
    calories: 5,
    volume: '30ml',
    created_at: '2026-01-10T08:00:00Z',
    updated_at: '2026-01-10T08:00:00Z'
  },
  {
    id: 'rec-2',
    name: 'Cappuccino',
    description: 'A perfect balance of espresso, steamed milk and velvety foam with a sprinkle of cocoa.',
    price: 850,
    category: 'Hot Coffee',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.95,
    isBestSeller: true,
    calories: 120,
    volume: '180ml',
    created_at: '2026-01-10T08:30:00Z',
    updated_at: '2026-01-10T08:30:00Z'
  },
  {
    id: 'rec-3',
    name: 'Flat White',
    description: 'Smooth, rich and velvety. A double shot of espresso with steamed milk.',
    price: 950,
    category: 'Hot Coffee',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.88,
    isBestSeller: false,
    calories: 130,
    volume: '160ml',
    created_at: '2026-01-11T09:00:00Z',
    updated_at: '2026-01-11T09:00:00Z'
  },
  {
    id: 'rec-4',
    name: 'Latte',
    description: 'Espresso with steamed milk and a hint of foam. Silky, comforting and smooth.',
    price: 890,
    category: 'Hot Coffee',
    image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.85,
    isBestSeller: true,
    calories: 150,
    volume: '240ml',
    created_at: '2026-01-11T09:15:00Z',
    updated_at: '2026-01-11T09:15:00Z'
  },
  {
    id: 'rec-5',
    name: 'Americano',
    description: 'Smooth, bold and refreshing. Espresso with hot water.',
    price: 690,
    category: 'Hot Coffee',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.75,
    isBestSeller: false,
    calories: 10,
    volume: '240ml',
    created_at: '2026-01-12T10:00:00Z',
    updated_at: '2026-01-12T10:00:00Z'
  },
  {
    id: 'rec-6',
    name: 'Mocha',
    description: 'Espresso, steamed milk, rich dark chocolate and a touch of sweetness.',
    price: 990,
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.92,
    isBestSeller: true,
    calories: 280,
    volume: '260ml',
    created_at: '2026-01-12T10:30:00Z',
    updated_at: '2026-01-12T10:30:00Z'
  },
  {
    id: 'rec-7',
    name: 'Cold Brew',
    description: 'Slow brewed for a smoother, less acidic taste. Steeped cold for 20 hours.',
    price: 850,
    category: 'Cold Coffee',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.94,
    isBestSeller: true,
    calories: 15,
    volume: '300ml',
    created_at: '2026-01-13T11:00:00Z',
    updated_at: '2026-01-13T11:00:00Z'
  },
  {
    id: 'rec-8',
    name: 'Caramel Latte',
    description: 'Espresso with steamed milk and handcrafted caramel. Sweet, warm and decadent.',
    price: 1050,
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.96,
    isSignature: true,
    calories: 240,
    volume: '260ml',
    created_at: '2026-01-13T11:30:00Z',
    updated_at: '2026-01-13T11:30:00Z'
  },
  {
    id: 'rec-9',
    name: 'Tiramisu Latte',
    description: 'Espresso, milk and Italian-inspired tiramisu flavor, dusted with rich cacao.',
    price: 1150,
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.97,
    isSignature: true,
    calories: 270,
    volume: '260ml',
    created_at: '2026-01-14T09:00:00Z',
    updated_at: '2026-01-14T09:00:00Z'
  },
  {
    id: 'rec-10',
    name: 'Iced Vanilla Latte',
    description: 'Chilled espresso with Madagascar vanilla bean syrup and fresh cold milk over ice.',
    price: 990,
    category: 'Cold Coffee',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.89,
    isBestSeller: true,
    calories: 190,
    volume: '350ml',
    created_at: '2026-01-14T09:30:00Z',
    updated_at: '2026-01-14T09:30:00Z'
  },
  // Desserts
  {
    id: 'rec-11',
    name: 'Chocolate Brownie',
    description: 'Rich, fudgy and irresistible. Baked with 70% dark Belgian cocoa and walnuts.',
    price: 550,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.95,
    calories: 380,
    created_at: '2026-01-15T12:00:00Z',
    updated_at: '2026-01-15T12:00:00Z'
  },
  {
    id: 'rec-12',
    name: 'Blueberry Cheesecake',
    description: 'Creamy, fresh and delightful. Baked New York style with wild berry reduction.',
    price: 890,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.93,
    calories: 420,
    created_at: '2026-01-15T12:30:00Z',
    updated_at: '2026-01-15T12:30:00Z'
  },
  {
    id: 'rec-13',
    name: 'Croissant',
    description: 'Buttery, flaky and fresh baked every morning using imported French butter.',
    price: 650,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.88,
    calories: 260,
    created_at: '2026-01-16T08:00:00Z',
    updated_at: '2026-01-16T08:00:00Z'
  },
  {
    id: 'rec-14',
    name: 'Vanilla Muffin',
    description: 'Soft, moist and flavorful crumb topped with crunchy demerara sugar crystals.',
    price: 490,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.82,
    calories: 310,
    created_at: '2026-01-16T08:30:00Z',
    updated_at: '2026-01-16T08:30:00Z'
  }
];

export const INITIAL_BEANS: CoffeeBean[] = [
  {
    id: 'bean-1',
    origin: 'Yirgacheffe',
    country: 'ETHIOPIA',
    notes: ['Floral', 'Fruity', 'Bright'],
    tagline: 'Floral • Fruity • Bright',
    description: 'Grown at high altitudes in rich volcanic soils. Jasmine blossom aroma with bergamot and delicate peach finish.',
    roastLevel: 'Light',
    altitude: '1,900m - 2,200m',
    process: 'Washed / Sun Dried',
    price: 2950,
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bean-2',
    origin: 'Huila Valley',
    country: 'COLOMBIA',
    notes: ['Balanced', 'Caramel', 'Smooth'],
    tagline: 'Balanced • Caramel • Smooth',
    description: 'Handpicked along Andean mountain slopes. Velvety body highlighting milk chocolate, brown sugar, and red apple acidity.',
    roastLevel: 'Medium',
    altitude: '1,600m - 1,850m',
    process: 'Fully Washed',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bean-3',
    origin: 'Cerrado Mineiro',
    country: 'BRAZIL',
    notes: ['Chocolate', 'Nutty', 'Rich'],
    tagline: 'Chocolate • Nutty • Rich',
    description: 'Naturally sweet and exceptionally creamy. Low acidity with intense dark cacao, roasted hazelnut, and toasted praline.',
    roastLevel: 'Medium-Dark',
    altitude: '1,100m - 1,350m',
    process: 'Natural Dry Process',
    price: 2650,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-8942',
    customer: {
      name: 'Eleanor Vance',
      email: 'eleanor.v@aura-guest.com',
      phone: '03224362414',
      type: 'pickup'
    },
    items: [
      { recipeId: 'rec-8', name: 'Caramel Latte', price: 1050, quantity: 2, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80' },
      { recipeId: 'rec-11', name: 'Chocolate Brownie', price: 550, quantity: 1, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80' }
    ],
    subtotal: 2650,
    tax: 212,
    total: 2862,
    status: 'Preparing',
    created_at: '2026-09-18T10:15:00Z'
  },
  {
    id: 'ORD-8941',
    customer: {
      name: 'Marcus Sterling',
      email: 'marcus@sterling-arch.com',
      phone: '03001234567',
      type: 'delivery',
      address: 'Nishtar Colony, Ferozepur Road, Lahore'
    },
    items: [
      { recipeId: 'rec-1', name: 'Espresso', price: 650, quantity: 3, image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80' },
      { recipeId: 'rec-13', name: 'Croissant', price: 650, quantity: 2, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80' }
    ],
    subtotal: 3250,
    tax: 260,
    total: 3510,
    status: 'Ready',
    created_at: '2026-09-18T09:42:00Z'
  },
  {
    id: 'ORD-8940',
    customer: {
      name: 'Sophia Laurent',
      email: 'sophia@laurent-design.co',
      phone: '03339876543',
      type: 'pickup'
    },
    items: [
      { recipeId: 'rec-9', name: 'Tiramisu Latte', price: 1150, quantity: 1, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80' },
      { recipeId: 'rec-12', name: 'Blueberry Cheesecake', price: 890, quantity: 1, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80' }
    ],
    subtotal: 2040,
    tax: 163,
    total: 2203,
    status: 'Completed',
    created_at: '2026-09-18T08:30:00Z'
  },
  {
    id: 'ORD-8939',
    customer: {
      name: 'David Chen',
      email: 'mishalsabir789@gmail.com',
      phone: '03224362414',
      type: 'delivery',
      address: 'Main Boulevard, Nishtar Colony, Lahore'
    },
    items: [
      { recipeId: 'rec-7', name: 'Cold Brew', price: 850, quantity: 4, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80' }
    ],
    subtotal: 3400,
    tax: 272,
    total: 3672,
    status: 'Completed',
    created_at: '2026-09-17T16:20:00Z'
  },
  {
    id: 'ORD-8938',
    customer: {
      name: 'Amara Okafor',
      email: 'amara.o@globalcreative.net',
      phone: '03214567890',
      type: 'pickup'
    },
    items: [
      { recipeId: 'rec-2', name: 'Cappuccino', price: 850, quantity: 2, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80' }
    ],
    subtotal: 1700,
    tax: 136,
    total: 1836,
    status: 'Pending',
    created_at: '2026-09-18T10:45:00Z'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Eleanor Vance',
    email: 'eleanor.v@aura-guest.com',
    phone: '03224362414',
    totalOrders: 14,
    totalSpent: 18500,
    lastOrderDate: '2026-09-18T10:15:00Z'
  },
  {
    id: 'cust-2',
    name: 'Marcus Sterling',
    email: 'marcus@sterling-arch.com',
    phone: '03001234567',
    totalOrders: 22,
    totalSpent: 42300,
    lastOrderDate: '2026-09-18T09:42:00Z'
  },
  {
    id: 'cust-3',
    name: 'Sophia Laurent',
    email: 'sophia@laurent-design.co',
    phone: '03339876543',
    totalOrders: 9,
    totalSpent: 16400,
    lastOrderDate: '2026-09-18T08:30:00Z'
  },
  {
    id: 'cust-4',
    name: 'Mishal Sabir',
    email: 'mishalsabir789@gmail.com',
    phone: '03224362414',
    totalOrders: 18,
    totalSpent: 38900,
    lastOrderDate: '2026-09-17T16:20:00Z'
  },
  {
    id: 'cust-5',
    name: 'Amara Okafor',
    email: 'amara.o@globalcreative.net',
    phone: '03214567890',
    totalOrders: 5,
    totalSpent: 9400,
    lastOrderDate: '2026-09-18T10:45:00Z'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Julian Montgomery',
    role: 'Architect & Coffee Connoisseur',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    text: 'AURA COFFEE has redefined my morning ritual. The Midnight Caramel Latte strikes that rare harmony of intense roast and velvety sweetness that you only find in world-class espresso bars.',
    date: 'September 2026'
  },
  {
    id: 'rev-2',
    name: 'Camilla Thorne',
    role: 'Food & Lifestyle Critic',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    text: 'The Ethiopian single origin is extraordinary — notes of jasmine and sweet stone fruit that linger long after the last sip. Truly one of the finest coffee experiences anywhere.',
    date: 'August 2026'
  },
  {
    id: 'rev-3',
    name: 'Dr. Henrik Lindqvist',
    role: 'Designer & Author',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    text: 'Atmosphere, precision brewing, and exquisite pastries. The craft behind their espresso extraction is unmatched. A masterclass in luxury hospitality.',
    date: 'July 2026'
  }
];

export const GALLERY_IMAGES = [
  {
    id: 'gal-1',
    title: 'Artisan Pour Over',
    category: 'Extraction',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80',
    span: 'col-span-1 md:col-span-2 row-span-2'
  },
  {
    id: 'gal-2',
    title: 'Signature Latte Art',
    category: 'Craft',
    url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'gal-3',
    title: 'Golden Espresso Extraction',
    category: 'Roast',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'gal-4',
    title: 'Warm Cafe Interior',
    category: 'Atmosphere',
    url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80',
    span: 'col-span-1 md:col-span-2 row-span-1'
  },
  {
    id: 'gal-5',
    title: 'Fresh Single Origin Beans',
    category: 'Beans',
    url: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'gal-6',
    title: 'Morning Pastries & Fresh Bakes',
    category: 'Pastry',
    url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    span: 'col-span-1 row-span-1'
  }
];

export const PRESET_IMAGE_LIBRARY = [
  { name: 'Classic Espresso Shot', url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80' },
  { name: 'Velvety Cappuccino with Cocoa', url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ceramic Flat White', url: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80' },
  { name: 'Layered Glass Latte', url: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=800&q=80' },
  { name: 'Deep Americano', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Iced Cold Brew with Ice', url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80' },
  { name: 'Caramel Drizzle Macchiato', url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80' },
  { name: 'Whipped Mocha with Chocolate', url: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Artisan Pastry & Croissant', url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80' },
  { name: 'Rich Chocolate Cake & Brownie', url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80' },
];

