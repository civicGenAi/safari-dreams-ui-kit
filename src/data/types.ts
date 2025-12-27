// Central types for the application
// Ready for API integration - just swap the data source

export interface Tour {
  id: string;
  title: string;
  slug: string;
  location: string;
  destination: string;
  duration: string;
  durationDays: number;
  groupSize: string;
  minGroupSize: number;
  maxGroupSize: number;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  popular?: boolean;
  featured?: boolean;
  category: string;
  description: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Difficult';
  bestTime: string;
  languages: string[];
  cancellationPolicy: string;
  requirements: string[];
  faqs: FAQ[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  accommodation?: string;
  meals?: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Destination {
  name: string;
  slug: string;
  country: string;
  tours: number;
  flag: string;
  description: string;
  longDescription: string;
  coordinates: { x: string; y: string };
  image: string;
  gallery: string[];
  highlights: string[];
  bestTime: string;
  climate: string;
  currency: string;
  language: string;
  timezone: string;
  attractions: Attraction[];
}

export interface Attraction {
  name: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  tour: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
  verified: boolean;
  images?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

export interface BookingFormData {
  tourId: string;
  tourTitle: string;
  date: Date | null;
  adults: number;
  children: number;
  infants: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests: string;
  addOns: string[];
  accommodation?: string;
  insurance: boolean;
}
