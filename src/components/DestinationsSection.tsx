import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Destination {
  name: string;
  tours: number;
  flag: string;
  image: string;
  featured?: boolean;
}

const destinations: Destination[] = [
  {
    name: 'Tanzania',
    tours: 29,
    flag: '🇹🇿',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600',
    featured: true,
  },
  {
    name: 'Kenya',
    tours: 4,
    flag: '🇰🇪',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600',
  },
  {
    name: 'Rwanda',
    tours: 6,
    flag: '🇷🇼',
    image: 'https://images.unsplash.com/photo-1583867095486-3e0e2e66cf44?w=600',
  },
  {
    name: 'Uganda',
    tours: 4,
    flag: '🇺🇬',
    image: 'https://images.unsplash.com/photo-1619451683083-44ce5ca01a17?w=600',
  },
  {
    name: 'Israel',
    tours: 2,
    flag: '🇮🇱',
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600',
  },
  {
    name: 'Egypt',
    tours: 2,
    flag: '🇪🇬',
    image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600',
  },
  {
    name: 'Jordan',
    tours: 1,
    flag: '🇯🇴',
    image: 'https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=600',
  },
];

export const DestinationsSection = () => {
  return (
    <section id="destinations" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-secondary" />
            <span className="font-heading text-sm uppercase tracking-widest text-secondary">
              Explore Destinations
            </span>
            <div className="w-12 h-px bg-secondary" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Discover Your Next
            <span className="text-gradient-gold block">Dream Destination</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From the savannas of Africa to the ancient wonders of the Middle East, 
            explore our handpicked destinations for unforgettable experiences.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Featured Tanzania - Large Card */}
          <div className="md:col-span-2 md:row-span-2">
            <a
              href="#tanzania"
              className="group relative block h-full min-h-[400px] md:min-h-full rounded-3xl overflow-hidden card-hover"
            >
              <img
                src={destinations[0].image}
                alt={destinations[0].name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-card" />
              
              {/* Featured Badge */}
              <div className="absolute top-6 left-6 bg-secondary text-charcoal px-4 py-1.5 rounded-full text-sm font-heading font-semibold uppercase tracking-wider">
                Featured
              </div>
              
              {/* Tour Count Badge */}
              <div className="absolute top-6 right-6 glass text-primary-foreground px-4 py-2 rounded-full font-heading font-semibold">
                {destinations[0].tours} Tours
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{destinations[0].flag}</span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
                    {destinations[0].name}
                  </h3>
                </div>
                <p className="text-primary-foreground/80 mb-4 max-w-md">
                  Experience the world-famous Serengeti, climb Kilimanjaro, and discover pristine beaches of Zanzibar.
                </p>
                <div className="flex items-center gap-2 text-secondary font-heading text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                  Explore Destination
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          </div>

          {/* Other Destinations */}
          {destinations.slice(1).map((dest) => (
            <a
              key={dest.name}
              href={`#${dest.name.toLowerCase()}`}
              className="group relative block h-[280px] rounded-2xl overflow-hidden card-hover"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-card" />
              
              {/* Tour Count */}
              <div className="absolute top-4 right-4 glass text-primary-foreground px-3 py-1.5 rounded-full text-sm font-heading font-medium">
                {dest.tours} Tours
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{dest.flag}</span>
                  <h3 className="font-display text-xl font-bold text-primary-foreground">
                    {dest.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-secondary font-heading text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline-forest" size="xl" className="gap-2">
            View All Destinations
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
