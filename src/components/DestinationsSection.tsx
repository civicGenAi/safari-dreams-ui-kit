import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Globe, Users, Handshake, Lightbulb } from 'lucide-react';
import worldMap from '@/assets/world-map.webp';

interface Destination {
  name: string;
  slug: string;
  tours: number;
  flag: string;
  description: string;
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
    description: 'Zanzibar, an archipelago off Tanzania\'s coast, is famous for its pristine beaches, clear waters, and rich cultural heritage. Visitors can relax on the island\'s white sand beaches, go snorkeling or scuba diving, and explore the Stone Town, a UNESCO World Heritage Site that showcases the influences of African, Arab, and European cultures.\n\nOther notable destinations in Tanzania include the Ngorongoro Conservation Area, which features an enormous crater teeming with wildlife, and Tarangire National Park, known for its large elephant herds. The Olduvai Gorge, a site where some of the oldest human remains were discovered, and the ruins of the ancient city of Kilwa Kisiwani are also fascinating attractions for history and culture enthusiasts.\n\nIn conclusion, Tanzania offers a diverse range of attractions that are sure to satisfy any traveler\'s desires, from wildlife safaris to cultural experiences to relaxing beach getaways. With its stunning natural beauty, rich cultural heritage, and friendly locals, Tanzania is truly a must-visit destination for anyone seeking an unforgettable African adventure.',
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

const stats = [
  { icon: Lightbulb, value: '50+', label: 'TRAVEL IDEAS' },
  { icon: Globe, value: '7+', label: 'DESTINATIONS' },
  { icon: Users, value: '200+', label: 'REPEAT CLIENTS' },
  { icon: Handshake, value: '50+', label: 'SERVICE PARTNERS' },
];

export const DestinationsSection = () => {
  const [activeDestination, setActiveDestination] = useState<string>('Tanzania');

  const activeData = destinations.find(d => d.name === activeDestination);

  return (
    <section id="destinations" className="pb-0 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-24 lg:py-32">
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

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image with Country Facts Overlay */}
          <div className="relative">
            {/* Safari Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800"
                alt={activeData?.name || 'Safari destination'}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
            </div>

            {/* Country Facts Overlay Box */}
            {activeData?.facts && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[90%] max-w-md bg-primary/95 text-primary-foreground rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-primary-foreground/40 flex items-center justify-center">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold">Please Note Below</h4>
                    <p className="text-primary-foreground/80 text-sm">Country Facts</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-dashed border-primary-foreground/30">
                  <div className="flex justify-between border-b border-dotted border-primary-foreground/20 pb-2">
                    <span className="text-sm font-medium">Country</span>
                    <span className="text-sm text-primary-foreground/80">{activeData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-dotted border-primary-foreground/20 pb-2">
                    <span className="text-sm font-medium">Visa Requirements</span>
                    <span className="text-sm text-primary-foreground/80 text-right max-w-[200px]">{activeData.facts.visaRequirements}</span>
                  </div>
                  <div className="flex justify-between border-b border-dotted border-primary-foreground/20 pb-2">
                    <span className="text-sm font-medium">Languages spoken</span>
                    <span className="text-sm text-primary-foreground/80">{activeData.facts.languages}</span>
                  </div>
                  <div className="flex justify-between border-b border-dotted border-primary-foreground/20 pb-2">
                    <span className="text-sm font-medium">Currency used</span>
                    <span className="text-sm text-primary-foreground/80">{activeData.facts.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Area (km2)</span>
                    <span className="text-sm text-primary-foreground/80">{activeData.facts.area}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Description Text */}
          <div className="lg:pt-8">
            <div className="prose prose-lg max-w-none">
              {activeData?.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                  {paragraph.split(', ').map((part, i, arr) => (
                    <span key={i}>
                      {i > 0 && ', '}
                      {part.includes('Zanzibar') || part.includes('Ngorongoro') || part.includes('Tarangire') || part.includes('Olduvai') || part.includes('Kilwa') || part.includes('wildlife safaris') || part.includes('cultural experiences') || part.includes('beach getaways') ? (
                        <span className="text-primary">{part}</span>
                      ) : (
                        part
                      )}
                    </span>
                  ))}
                </p>
              ))}
            </div>

            {/* Destination Quick Select */}
            <div className="flex flex-wrap gap-2 mt-8">
              {destinations.map((dest) => (
                <button
                  key={dest.name}
                  onClick={() => setActiveDestination(dest.name)}
                  className={`px-4 py-2 rounded-full text-sm font-heading transition-all ${
                    activeDestination === dest.name
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {dest.name} ({dest.tours})
                </button>
              ))}
            </div>

            <Link
              to={`/destinations/${activeData?.slug}`}
              className="inline-flex items-center gap-2 text-primary font-heading text-sm uppercase tracking-wider hover:gap-3 transition-all mt-8"
            >
              Explore {activeData?.name}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-muted border-t border-border mt-32">
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
