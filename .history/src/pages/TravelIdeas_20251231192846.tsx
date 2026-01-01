// src/lib/supabase.ts - Update TravelIdea interface

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
