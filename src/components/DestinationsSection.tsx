import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin } from 'lucide-react';
import worldMap from '@/assets/world-map.webp';

interface Destination {
  name: string;
  slug: string;
  tours: number;
  flag: string;
  description: string;
  coordinates: { x: string; y: string };
}

const destinations: Destination[] = [
  {
    name: 'Tanzania',
    slug: 'tanzania',
    tours: 29,
    flag: '🇹🇿',
    description: 'Home to Serengeti, Kilimanjaro, and Zanzibar beaches.',
    coordinates: { x: '54%', y: '58%' },
  },
  {
    name: 'Kenya',
    slug: 'kenya',
    tours: 4,
    flag: '🇰🇪',
    description: 'Experience the Masai Mara and witness the Great Migration.',
    coordinates: { x: '55%', y: '52%' },
  },
  {
    name: 'Rwanda',
    slug: 'rwanda',
    tours: 6,
    flag: '🇷🇼',
    description: 'Trek with mountain gorillas in lush volcanic forests.',
    coordinates: { x: '52%', y: '54%' },
  },
  {
    name: 'Uganda',
    slug: 'uganda',
    tours: 4,
    flag: '🇺🇬',
    description: 'The Pearl of Africa with diverse wildlife and landscapes.',
    coordinates: { x: '53%', y: '50%' },
  },
  {
    name: 'Israel',
    slug: 'israel',
    tours: 2,
    flag: '🇮🇱',
    description: 'Sacred pilgrimage sites and ancient history.',
    coordinates: { x: '57%', y: '32%' },
  },
  {
    name: 'Egypt',
    slug: 'egypt',
    tours: 2,
    flag: '🇪🇬',
    description: 'Pyramids, Pharaohs, and the majestic Nile River.',
    coordinates: { x: '54%', y: '35%' },
  },
  {
    name: 'Jordan',
    slug: 'jordan',
    tours: 1,
    flag: '🇯🇴',
    description: 'Ancient Petra and the stunning Wadi Rum desert.',
    coordinates: { x: '58%', y: '33%' },
  },
];

export const DestinationsSection = () => {
  const [activeDestination, setActiveDestination] = useState<string | null>('Tanzania');

  const activeData = destinations.find(d => d.name === activeDestination);

  return (
    <section id="destinations" className="py-24 lg:py-32 bg-background relative overflow-hidden">
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
          {/* Left: World Map Image */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-muted to-background border border-border shadow-lg p-6">
            <div className="relative aspect-[16/10]">
              <img
                src={worldMap}
                alt="World Map showing tour destinations"
                className="w-full h-full object-contain opacity-90"
              />
              
              {/* Destination Markers */}
              {destinations.map((dest) => (
                <button
                  key={dest.name}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group ${
                    activeDestination === dest.name ? 'z-20' : 'z-10'
                  }`}
                  style={{ left: dest.coordinates.x, top: dest.coordinates.y }}
                  onMouseEnter={() => setActiveDestination(dest.name)}
                  onClick={() => setActiveDestination(dest.name)}
                >
                  {/* Pulse ring for active */}
                  {activeDestination === dest.name && (
                    <span className="absolute inset-0 w-8 h-8 -m-2 rounded-full bg-primary/30 animate-ping" />
                  )}
                  
                  {/* Marker dot */}
                  <span className={`relative flex items-center justify-center w-4 h-4 rounded-full border-2 border-background shadow-lg transition-all duration-300 ${
                    activeDestination === dest.name 
                      ? 'bg-primary scale-150' 
                      : 'bg-primary/70 hover:bg-primary hover:scale-125'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-background" />
                  </span>

                  {/* Tooltip */}
                  <span className={`absolute left-1/2 -translate-x-1/2 -top-10 bg-secondary text-secondary-foreground text-xs font-heading font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg transition-all duration-300 ${
                    activeDestination === dest.name 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible translate-y-2'
                  }`}>
                    {dest.flag} {dest.name}
                    <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-secondary" />
                  </span>
                </button>
              ))}
            </div>

            {/* Map Legend */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                <span className="text-sm text-muted-foreground">Available</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {destinations.length} Countries • {destinations.reduce((acc, d) => acc + d.tours, 0)} Tours
              </span>
            </div>
          </div>

          {/* Right: Destination List */}
          <div className="space-y-3">
            {destinations.map((dest) => (
              <Link
                key={dest.name}
                to={`/destinations/${dest.slug}`}
                className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                  activeDestination === dest.name
                    ? 'bg-primary text-primary-foreground border-primary shadow-primary'
                    : 'bg-card border-border hover:border-primary/50 hover:shadow-md'
                }`}
                onMouseEnter={() => setActiveDestination(dest.name)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{dest.flag}</span>
                  <div>
                    <h3 className={`font-display text-lg font-bold ${
                      activeDestination === dest.name ? 'text-primary-foreground' : 'text-foreground'
                    }`}>
                      {dest.name}
                    </h3>
                    <p className={`text-sm line-clamp-1 ${
                      activeDestination === dest.name ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {dest.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
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
              <div className="mt-6 p-5 rounded-2xl bg-muted/50 border border-border">
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
