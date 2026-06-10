import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseClient = null;

if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('https://')) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
  }
}

if (!supabaseClient) {
  console.warn('Supabase URL or Anon Key is missing or invalid. Client Portal will run in fallback/offline mode.');
  // Create a safe mock client proxy to prevent runtime crashes
  supabaseClient = {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: new Error('Supabase not configured') }),
          order: async () => ({ data: [], error: new Error('Supabase not configured') })
        }),
        order: async () => ({ data: [], error: new Error('Supabase not configured') })
      }),
      insert: () => ({
        select: async () => ({ data: null, error: new Error('Supabase not configured') })
      })
    })
  };
}

export const supabase = supabaseClient;
