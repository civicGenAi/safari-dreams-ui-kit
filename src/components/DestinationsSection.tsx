import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Globe, Users, Handshake, Lightbulb, ArrowRight } from 'lucide-react';
import worldMap from '@/assets/world-map.webp';

interface Destination {
  name: string;
  slug: string;
  tours: number;
  flag: string;
  description: string;
  image: string;
  coordinates: { x: string; y: string };
  facts?: {
    visaRequirements?: string;
    languages?: string;
    currency?: string;
    area?: string;
  };
}

const destinations: Destination[] = [
  {
    name: 'Tanzania',
    slug: 'tanzania',
    tours: 29,
    flag: '🇹🇿',
    description: 'Serengeti, Kilimanjaro, and Zanzibar beaches.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600',
    coordinates: { x: '54%', y: '58%' },
    facts: {
      visaRequirements: 'Commonwealth & EAC citizens - don\'t need visa. Everyone else need a visa.',
      languages: 'English, Swahili',
      currency: 'Tanzania Shilling, USD, Euro',
      area: '945,087 km2',
    },
  },
  {
    name: 'Kenya',
    slug: 'kenya',
    tours: 4,
    flag: '🇰🇪',
    description: 'Experience the Masai Mara and witness the Great Migration.',
    image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=600',
    coordinates: { x: '55%', y: '52%' },
  },
  {
    name: 'Rwanda',
    slug: 'rwanda',
    tours: 6,
    flag: '🇷🇼',
    description: 'Trek with mountain gorillas in lush volcanic forests.',
    image: 'https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=600',
    coordinates: { x: '52%', y: '54%' },
  },
  {
    name: 'Uganda',
    slug: 'uganda',
    tours: 4,
    flag: '🇺🇬',
    description: 'The Pearl of Africa with diverse wildlife and landscapes.',
    image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600',
    coordinates: { x: '53%', y: '50%' },
  },
  {
    name: 'Israel',
    slug: 'israel',
    tours: 2,
    flag: '🇮🇱',
    description: 'Sacred pilgrimage sites and ancient history.',
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600',
    coordinates: { x: '57%', y: '32%' },
  },
  {
    name: 'Egypt',
    slug: 'egypt',
    tours: 2,
    flag: '🇪🇬',
    description: 'Pyramids, Pharaohs, and the majestic Nile River.',
    image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600',
    coordinates: { x: '54%', y: '35%' },
  },
  {
    name: 'Jordan',
    slug: 'jordan',
    tours: 1,
    flag: '🇯🇴',
    description: 'Ancient Petra and the stunning Wadi Rum desert.',
    image: 'https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=600',
    coordinates: { x: '58%', y: '33%' },
  },
];

const stats = [
  { icon: Lightbulb, value: '50+', label: 'TRAVEL IDEAS' },
  { icon: Globe, value: '7+', label: 'DESTINATIONS' },
  { icon: Users, value: '200+', label: 'REPEAT CLIENTS' },
  { icon: Handshake, value: '50+', label: 'SERVICE PARTNERS' },
];

// Staggered card heights and offsets for visual interest
const cardStyles = [
  { height: 'h-[380px]', offset: 'mt-0' },        // Israel - tall
  { height: 'h-[420px]', offset: 'mt-8' },        // Kenya - taller, offset down
  { height: 'h-[360px]', offset: 'mt-4' },        // Rwanda - medium
  { height: 'h-[400px]', offset: 'mt-12' },       // Tanzania - tall, more offset
  { height: 'h-[340px]', offset: 'mt-2' },        // Uganda - shorter
  { height: 'h-[380px]', offset: 'mt-10' },       // Egypt - medium, offset
  { height: 'h-[360px]', offset: 'mt-6' },        // Jordan - medium
];

// All 7 destinations in display order
const displayOrder = ['Israel', 'Kenya', 'Rwanda', 'Tanzania', 'Uganda', 'Egypt', 'Jordan'];

export const DestinationsSection = () => {
  const orderedDestinations = displayOrder
    .map(name => destinations.find(d => d.name === name))
    .filter(Boolean) as Destination[];

  return (
    <section id="destinations" className="py-24 lg:py-32 bg-[#f8f6f3]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-heading text-sm uppercase tracking-widest text-foreground font-semibold mb-4 block">
            POPULAR DESTINATIONS
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary italic mb-6">
            Must See<br />Destinations
          </h2>
          <div className="w-16 h-1 bg-primary/60 mx-auto" />
        </div>

        {/* Staggered Cards Grid */}
        <div className="flex justify-center gap-4 md:gap-6 lg:gap-8 flex-wrap lg:flex-nowrap mb-16">
          {orderedDestinations.map((dest, index) => (
            <Link
              key={dest.name}
              to={`/destinations/${dest.slug}`}
              className={`group relative w-[180px] md:w-[200px] lg:w-[220px] ${cardStyles[index].height} ${cardStyles[index].offset} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex-shrink-0`}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <h3 className="font-display text-2xl md:text-3xl text-white font-medium tracking-wide">
                  {dest.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-foreground/80 text-lg">
            Talk to Us, Call{' '}
            <a href="tel:+255688535848" className="text-primary font-semibold hover:underline">
              +(255) 688 535848
            </a>
            {' '}or{' '}
            <Link 
              to="/booking" 
              className="inline-flex items-center gap-1 text-foreground font-semibold underline underline-offset-4 hover:text-primary transition-colors"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-muted border-t border-border mt-16">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <span className="block font-display text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground font-heading uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};