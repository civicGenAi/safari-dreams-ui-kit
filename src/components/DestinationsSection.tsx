import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';

interface Destination {
  name: string;
  slug: string;
  tours: number;
  flag: string;
  description: string;
  coordinates: { x: number; y: number };
}

const destinations: Destination[] = [
  {
    name: 'Tanzania',
    slug: 'tanzania',
    tours: 29,
    flag: '🇹🇿',
    description: 'Home to Serengeti, Kilimanjaro, and Zanzibar beaches.',
    coordinates: { x: 58, y: 55 },
  },
  {
    name: 'Kenya',
    slug: 'kenya',
    tours: 4,
    flag: '🇰🇪',
    description: 'Experience the Masai Mara and witness the Great Migration.',
    coordinates: { x: 60, y: 48 },
  },
  {
    name: 'Rwanda',
    slug: 'rwanda',
    tours: 6,
    flag: '🇷🇼',
    description: 'Trek with mountain gorillas in lush volcanic forests.',
    coordinates: { x: 54, y: 50 },
  },
  {
    name: 'Uganda',
    slug: 'uganda',
    tours: 4,
    flag: '🇺🇬',
    description: 'The Pearl of Africa with diverse wildlife and landscapes.',
    coordinates: { x: 55, y: 47 },
  },
  {
    name: 'Israel',
    slug: 'israel',
    tours: 2,
    flag: '🇮🇱',
    description: 'Sacred pilgrimage sites and ancient history.',
    coordinates: { x: 58, y: 28 },
  },
  {
    name: 'Egypt',
    slug: 'egypt',
    tours: 2,
    flag: '🇪🇬',
    description: 'Pyramids, Pharaohs, and the majestic Nile River.',
    coordinates: { x: 54, y: 30 },
  },
  {
    name: 'Jordan',
    slug: 'jordan',
    tours: 1,
    flag: '🇯🇴',
    description: 'Ancient Petra and the stunning Wadi Rum desert.',
    coordinates: { x: 59, y: 29 },
  },
];

export const DestinationsSection = () => {
  const [activeDestination, setActiveDestination] = useState<string | null>('Tanzania');

  const activeData = destinations.find(d => d.name === activeDestination);

  return (
    <section id="destinations" className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-primary" />
            <span className="font-heading text-sm uppercase tracking-widest text-primary">
              Explore Destinations
            </span>
            <div className="w-12 h-px bg-primary" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Discover Your Next
            <span className="text-gradient-primary block">Dream Destination</span>
          </h2>
        </div>

        {/* Map and List Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: World Map */}
          <div className="relative bg-card rounded-3xl p-8 border border-border shadow-lg">
            <svg
              viewBox="0 0 100 70"
              className="w-full h-auto"
              style={{ minHeight: '400px' }}
            >
              {/* Africa and Middle East simplified map */}
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--muted))" />
                  <stop offset="100%" stopColor="hsl(var(--border))" />
                </linearGradient>
              </defs>
              
              {/* Africa Continent Outline */}
              <path
                d="M40,20 L55,18 L65,25 L68,35 L65,50 L60,60 L55,65 L45,62 L38,55 L35,45 L36,35 L38,25 Z"
                fill="url(#mapGradient)"
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
                className="transition-all duration-500"
              />
              
              {/* Middle East Region */}
              <path
                d="M55,15 L70,12 L75,18 L72,28 L65,25 L55,18 Z"
                fill="url(#mapGradient)"
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
                className="transition-all duration-500"
              />

              {/* Destination Markers */}
              {destinations.map((dest) => (
                <g key={dest.name}>
                  {/* Pulse ring for active */}
                  {activeDestination === dest.name && (
                    <circle
                      cx={dest.coordinates.x}
                      cy={dest.coordinates.y}
                      r="4"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="0.5"
                      className="animate-pulse-dot"
                    />
                  )}
                  
                  {/* Marker dot */}
                  <circle
                    cx={dest.coordinates.x}
                    cy={dest.coordinates.y}
                    r={activeDestination === dest.name ? "2.5" : "1.5"}
                    fill={activeDestination === dest.name ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setActiveDestination(dest.name)}
                  />
                  
                  {/* Label for active destination */}
                  {activeDestination === dest.name && (
                    <text
                      x={dest.coordinates.x + 4}
                      y={dest.coordinates.y + 1}
                      fill="hsl(var(--foreground))"
                      fontSize="3"
                      fontFamily="Montserrat"
                      fontWeight="600"
                    >
                      {dest.name}
                    </text>
                  )}
                </g>
              ))}

              {/* Connecting lines animation */}
              <path
                d="M58,55 Q60,45 60,48 Q62,40 58,28 Q58,28 54,30 Q56,29 59,29"
                fill="none"
                stroke="hsl(var(--primary) / 0.3)"
                strokeWidth="0.3"
                strokeDasharray="2,2"
                className="animate-draw-path"
              />
            </svg>

            {/* Map Legend */}
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                <span className="text-sm text-muted-foreground">Available</span>
              </div>
            </div>
          </div>

          {/* Right: Destination List */}
          <div className="space-y-4">
            {destinations.map((dest) => (
              <Link
                key={dest.name}
                to={`/destinations/${dest.slug}`}
                className={`group flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
                  activeDestination === dest.name
                    ? 'bg-primary text-primary-foreground border-primary shadow-primary'
                    : 'bg-card border-border hover:border-primary/50 hover:shadow-md'
                }`}
                onMouseEnter={() => setActiveDestination(dest.name)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{dest.flag}</span>
                  <div>
                    <h3 className={`font-display text-xl font-bold ${
                      activeDestination === dest.name ? 'text-primary-foreground' : 'text-foreground'
                    }`}>
                      {dest.name}
                    </h3>
                    <p className={`text-sm ${
                      activeDestination === dest.name ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {dest.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`font-heading font-bold text-lg ${
                    activeDestination === dest.name ? 'text-primary-foreground' : 'text-primary'
                  }`}>
                    ({dest.tours})
                  </span>
                  <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                    activeDestination === dest.name ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`} />
                </div>
              </Link>
            ))}

            {/* Active Destination Preview */}
            {activeData && (
              <div className="mt-8 p-6 rounded-2xl bg-secondary/5 border border-secondary/20">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-heading font-semibold text-foreground">
                    Quick Preview: {activeData.name}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  {activeData.description}
                </p>
                <Link
                  to={`/destinations/${activeData.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-heading text-sm uppercase tracking-wider hover:gap-3 transition-all"
                >
                  View {activeData.tours} Tours
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
