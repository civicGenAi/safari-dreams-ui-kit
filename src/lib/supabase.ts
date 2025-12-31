import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface Package {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  images?: string[];
  destination: string;
  category: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  included: string[];
  excluded: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  created_at: string;
  updated_at: string;
}
