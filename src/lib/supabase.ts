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
    activities?: string[];
    images?: string[];
  }[];
  created_at: string;
  updated_at: string;
}

export interface TravelIdea {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  images?: string[];
  destination?: string;
  category: 'Migration Safaris' | 'Romantic Holidays' | 'Safari Beach Holidays' | 'Adventure Seekers' | 'Luxury Tours' | 'Gorilla and Chimp Trekking' | 'Cross Border Safaris' | 'Day Tours' | 'Pilgrimage Tours';
  category_type?: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  included: string[];
  excluded: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities?: string[];
    images?: string[];
  }[];
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  images?: string[];
  author_name: string;
  category: string;
  tags?: string[];
  read_time: number;
  is_featured: boolean;
  status: 'draft' | 'published';
  published_date?: string;
  created_at: string;
  updated_at: string;
}

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed_at: string;
  status: 'active' | 'unsubscribed';
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  submitted_at: string;
}

export interface BookingRequest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  destination: string;
  travel_style: string;
  start_date: string;
  end_date: string;
  adults: number;
  children: number;
  accommodation: string;
  budget?: string;
  special_requirements?: string;
  package_title?: string;
  package_slug?: string;
  status: 'new' | 'contacted' | 'quoted' | 'booked' | 'cancelled';
  submitted_at: string;
}
