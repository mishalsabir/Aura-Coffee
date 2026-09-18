const { Client } = require('pg');

const client = new Client({
  host: 'aws-0-ap-south-1.pooler.supabase.com',
  port: 5432,
  user: 'postgres.eoantwunakrzetppwrix',
  password: 'AraM@78Cw&t.%pF',
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
});

const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Espresso', status: 'active', badgeColor: 'bg-[#4a2e1b] text-[#edd5be] border border-[#6b452b]' },
  { id: 'cat-2', name: 'Hot Coffee', status: 'active', badgeColor: 'bg-[#5e271d] text-[#f7cfc8] border border-[#85382b]' },
  { id: 'cat-3', name: 'Cold Coffee', status: 'active', badgeColor: 'bg-[#183952] text-[#c4e3fb] border border-[#235073]' },
  { id: 'cat-4', name: 'Specialty', status: 'active', badgeColor: 'bg-[#3b244d] text-[#e5d0f7] border border-[#54336e]' },
  { id: 'cat-5', name: 'Desserts', status: 'active', badgeColor: 'bg-[#543d22] text-[#fce4c3] border border-[#785731]' },
];

const INITIAL_RECIPES = [
  {
    id: 'rec-1',
    name: 'Espresso',
    description: 'Rich, bold and full of character. Our classic espresso is pure coffee in its simplest form.',
    price: 650,
    category: 'Espresso',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.9,
    isSignature: false,
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
    isSignature: false,
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
    isSignature: false,
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
    isSignature: false,
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
    isSignature: false,
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
    isSignature: false,
    isBestSeller: true,
    calories: 280,
    volume: '260ml',
    created_at: '2026-01-12T10:30:00Z',
    updated_at: '2026-01-12T10:30:00Z'
  },
  {
    id: 'rec-7',
    name: 'Cold Brew',
    description: 'Slow-steeped for 18 hours. Smooth, bold and naturally sweet with zero bitterness.',
    price: 850,
    category: 'Cold Coffee',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.96,
    isSignature: false,
    isBestSeller: true,
    calories: 5,
    volume: '300ml',
    created_at: '2026-01-13T11:00:00Z',
    updated_at: '2026-01-13T11:00:00Z'
  },
  {
    id: 'rec-8',
    name: 'Midnight Caramel Latte',
    description: 'Our crown jewel. Bold espresso, silky steamed microfoam, and handcrafted scorched sea-salt caramel drizzle.',
    price: 1050,
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 5.0,
    isSignature: true,
    isBestSeller: true,
    calories: 240,
    volume: '280ml',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'rec-9',
    name: 'Iced Spanish Latte',
    description: 'Condensed milk, espresso and fresh cold milk poured over crystal ice.',
    price: 980,
    category: 'Cold Coffee',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.89,
    isSignature: false,
    isBestSeller: true,
    calories: 210,
    volume: '320ml',
    created_at: '2026-01-14T12:00:00Z',
    updated_at: '2026-01-14T12:00:00Z'
  },
  {
    id: 'rec-10',
    name: 'Nitro Cold Brew',
    description: 'Cold brew infused with nitrogen for an ultra-creamy head and velvety cascade.',
    price: 920,
    category: 'Cold Coffee',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.94,
    isSignature: false,
    isBestSeller: false,
    calories: 5,
    volume: '300ml',
    created_at: '2026-01-15T13:00:00Z',
    updated_at: '2026-01-15T13:00:00Z'
  },
  {
    id: 'rec-11',
    name: 'Artisan Butter Croissant',
    description: 'Flaky, buttery French pastry baked fresh every morning with golden crust.',
    price: 550,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.91,
    isSignature: false,
    isBestSeller: true,
    calories: 260,
    volume: '1 pc',
    created_at: '2026-01-16T07:00:00Z',
    updated_at: '2026-01-16T07:00:00Z'
  },
  {
    id: 'rec-12',
    name: 'Belgian Dark Chocolate Brownie',
    description: 'Dense, fudgy brownie made with 70% Valrhona dark chocolate and sea-salt flakes.',
    price: 680,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    rating: 4.97,
    isSignature: false,
    isBestSeller: true,
    calories: 380,
    volume: '1 pc',
    created_at: '2026-01-16T07:30:00Z',
    updated_at: '2026-01-16T07:30:00Z'
  }
];

const INITIAL_CUSTOMERS = [
  {
    id: 'cust-1',
    name: 'Bilal Khan',
    email: 'bilal.khan@example.com',
    phone: '+92 300 1234567',
    totalOrders: 14,
    totalSpent: 14700,
    lastOrderDate: '2026-09-17T14:22:00Z'
  },
  {
    id: 'cust-2',
    name: 'Ayesha Malik',
    email: 'ayesha.m@example.com',
    phone: '+92 321 9876543',
    totalOrders: 8,
    totalSpent: 8400,
    lastOrderDate: '2026-09-16T11:05:00Z'
  },
  {
    id: 'cust-3',
    name: 'Hamza Tariq',
    email: 'hamza.t@example.com',
    phone: '+92 333 5551234',
    totalOrders: 21,
    totalSpent: 22050,
    lastOrderDate: '2026-09-18T09:40:00Z'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-1001',
    customer: {
      name: 'Bilal Khan',
      email: 'bilal.khan@example.com',
      phone: '+92 300 1234567',
      address: 'House 14, Nishtar Colony, Lahore',
      type: 'delivery'
    },
    items: [
      { recipeId: 'rec-8', name: 'Midnight Caramel Latte', price: 1050, quantity: 2, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80' },
      { recipeId: 'rec-11', name: 'Artisan Butter Croissant', price: 550, quantity: 2, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80' }
    ],
    subtotal: 3200,
    tax: 0,
    total: 3200,
    status: 'Preparing',
    created_at: '2026-09-18T10:15:00Z'
  },
  {
    id: 'ORD-1002',
    customer: {
      name: 'Ayesha Malik',
      email: 'ayesha.m@example.com',
      phone: '+92 321 9876543',
      type: 'pickup'
    },
    items: [
      { recipeId: 'rec-2', name: 'Cappuccino', price: 850, quantity: 1, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80' },
      { recipeId: 'rec-12', name: 'Belgian Dark Chocolate Brownie', price: 680, quantity: 1, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80' }
    ],
    subtotal: 1530,
    tax: 0,
    total: 1530,
    status: 'Ready',
    created_at: '2026-09-18T11:30:00Z'
  }
];

async function migrate() {
  try {
    console.log('Connecting to Supabase PostgreSQL...');
    await client.connect();
    console.log('Connected!');

    // 1. Create Tables
    console.log('Creating tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        badge_color TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS recipes (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price NUMERIC NOT NULL,
        category TEXT NOT NULL,
        image TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        rating NUMERIC DEFAULT 4.9,
        is_signature BOOLEAN DEFAULT false,
        is_best_seller BOOLEAN DEFAULT false,
        calories INTEGER,
        volume TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL,
        total_orders INTEGER DEFAULT 0,
        total_spent NUMERIC DEFAULT 0,
        last_order_date TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        customer_address TEXT,
        order_type TEXT NOT NULL DEFAULT 'pickup',
        items JSONB NOT NULL,
        subtotal NUMERIC NOT NULL,
        tax NUMERIC NOT NULL DEFAULT 0,
        total NUMERIC NOT NULL,
        status TEXT NOT NULL DEFAULT 'Pending',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 2. Enable Row Level Security (RLS) & Policies
    console.log('Configuring RLS Policies...');
    const tables = ['categories', 'recipes', 'customers', 'orders'];
    for (const t of tables) {
      await client.query(`
        ALTER TABLE ${t} ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Public select on ${t}" ON ${t};
        DROP POLICY IF EXISTS "Public insert on ${t}" ON ${t};
        DROP POLICY IF EXISTS "Public update on ${t}" ON ${t};
        DROP POLICY IF EXISTS "Public delete on ${t}" ON ${t};
        
        CREATE POLICY "Public select on ${t}" ON ${t} FOR SELECT USING (true);
        CREATE POLICY "Public insert on ${t}" ON ${t} FOR INSERT WITH CHECK (true);
        CREATE POLICY "Public update on ${t}" ON ${t} FOR UPDATE USING (true);
        CREATE POLICY "Public delete on ${t}" ON ${t} FOR DELETE USING (true);
      `);
    }

    // 3. Enable Realtime Replication
    console.log('Enabling Realtime Replication...');
    for (const t of tables) {
      try {
        await client.query(`ALTER PUBLICATION supabase_realtime ADD TABLE ${t};`);
        console.log(`Added ${t} to supabase_realtime`);
      } catch (err) {
        if (err.message.includes('already in publication')) {
          console.log(`${t} already in publication`);
        } else {
          console.warn(`Warning on publication for ${t}:`, err.message);
        }
      }
    }

    // 4. Seed Categories
    console.log('Seeding Categories...');
    for (const cat of INITIAL_CATEGORIES) {
      await client.query(`
        INSERT INTO categories (id, name, status, badge_color)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          status = EXCLUDED.status,
          badge_color = EXCLUDED.badge_color;
      `, [cat.id, cat.name, cat.status, cat.badgeColor]);
    }

    // 5. Seed Recipes
    console.log('Seeding Recipes...');
    for (const r of INITIAL_RECIPES) {
      await client.query(`
        INSERT INTO recipes (id, name, description, price, category, image, status, rating, is_signature, is_best_seller, calories, volume, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          price = EXCLUDED.price,
          category = EXCLUDED.category,
          image = EXCLUDED.image,
          status = EXCLUDED.status,
          rating = EXCLUDED.rating,
          is_signature = EXCLUDED.is_signature,
          is_best_seller = EXCLUDED.is_best_seller,
          calories = EXCLUDED.calories,
          volume = EXCLUDED.volume,
          updated_at = EXCLUDED.updated_at;
      `, [
        r.id, r.name, r.description, r.price, r.category, r.image, r.status,
        r.rating, r.isSignature, r.isBestSeller, r.calories, r.volume,
        r.created_at, r.updated_at
      ]);
    }

    // 6. Seed Customers
    console.log('Seeding Customers...');
    for (const c of INITIAL_CUSTOMERS) {
      await client.query(`
        INSERT INTO customers (id, name, email, phone, total_orders, total_spent, last_order_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          phone = EXCLUDED.phone,
          total_orders = EXCLUDED.total_orders,
          total_spent = EXCLUDED.total_spent,
          last_order_date = EXCLUDED.last_order_date;
      `, [c.id, c.name, c.email, c.phone, c.totalOrders, c.totalSpent, c.lastOrderDate]);
    }

    // 7. Seed Orders
    console.log('Seeding Orders...');
    for (const o of INITIAL_ORDERS) {
      await client.query(`
        INSERT INTO orders (id, customer_name, customer_email, customer_phone, customer_address, order_type, items, subtotal, tax, total, status, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (id) DO UPDATE SET
          status = EXCLUDED.status,
          total = EXCLUDED.total;
      `, [
        o.id, o.customer.name, o.customer.email, o.customer.phone,
        o.customer.address || null, o.customer.type, JSON.stringify(o.items),
        o.subtotal, o.tax, o.total, o.status, o.created_at
      ]);
    }

    // 8. Verification Counts
    console.log('--- Verification ---');
    const catCount = await client.query('SELECT count(*) FROM categories;');
    const recCount = await client.query('SELECT count(*) FROM recipes;');
    const custCount = await client.query('SELECT count(*) FROM customers;');
    const ordCount = await client.query('SELECT count(*) FROM orders;');

    console.log(`Categories count: ${catCount.rows[0].count}`);
    console.log(`Recipes count: ${recCount.rows[0].count}`);
    console.log(`Customers count: ${custCount.rows[0].count}`);
    console.log(`Orders count: ${ordCount.rows[0].count}`);

    await client.end();
    console.log('Migration and seeding completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();

