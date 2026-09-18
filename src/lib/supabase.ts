import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://eoantwunakrzetppwrix.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvYW50d3VuYWtyemV0cHB3cml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3NDU0NDgsImV4cCI6MjEwNTMyMTQ0OH0.cUT-qrVUsgnUD6P_SW0rb7Ac0OHRqK7jMt-KKuejqEQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});
