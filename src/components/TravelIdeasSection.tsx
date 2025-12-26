import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, Mountain, Umbrella, Church, Camera, Heart } from 'lucide-react';

const travelIdeas = [
  {
    icon: Compass,
    title: 'Safari Adventures',
    description: 'Witness the Big Five in their natural habitat across Tanzania and Kenya.',
    tours: 15,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400',
  },
  {
    icon: Mountain,
    title: 'Mountain Trekking',
    description: 'Conquer Kilimanjaro or explore the Rwenzori Mountains.',
    tours: 8,
    image: 'https://images.unsplash.com/photo-1621414050946-1b936a78be32?w=400',
  },
  {
    icon: Umbrella,
    title: 'Beach Holidays',
    description: 'Relax on pristine beaches of Zanzibar and the Swahili Coast.',
    tours: 12,
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=400',
  },
  {
    icon: Church,
    title: 'Pilgrimage Tours',
    description: 'Visit sacred sites in Israel, Jordan, and Egypt.',
    tours: 5,
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400',
  },
  {
    icon: Camera,
    title: 'Wildlife Photography',
    description: 'Capture stunning wildlife moments with expert guides.',
    tours: 6,
    image: 'https://images.unsplash.com/photo-1534177616064-ef1a5c91e6e8?w=400',
  },
  {
    icon: Heart,
    title: 'Honeymoon Escapes',
    description: 'Romantic getaways combining safari and beach paradise.',
    tours: 10,
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=400',
  },
];

export const TravelIdeasSection = () => {
  return (
    <section id="travel-ideas" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-secondary" />
            <span className="font-heading text-sm uppercase tracking-widest text-secondary">
              Travel Ideas
            </span>
            <div className="w-12 h-px bg-secondary" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Find Your Perfect
            <span className="text-gradient-gold block">Travel Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Whether you seek adventure, relaxation, or spiritual enrichment, 
            we have the perfect journey waiting for you.
          </p>
        </div>

        {/* Ideas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelIdeas.map((idea) => (
            <a
              key={idea.title}
              href="#"
              className="group relative bg-card rounded-3xl overflow-hidden card-hover border border-border"
            >
              {/* Image */}
              <div className="relative h-48 img-zoom">
                <img
                  src={idea.image}
                  alt={idea.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-card" />
                
                {/* Icon */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-secondary/90 flex items-center justify-center">
                  <idea.icon className="w-6 h-6 text-charcoal" />
                </div>
                
                {/* Tour Count */}
                <div className="absolute top-4 right-4 glass text-primary-foreground px-3 py-1.5 rounded-full text-sm font-heading">
                  {idea.tours} Tours
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {idea.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {idea.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-heading text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline-forest" size="xl" className="gap-2">
            View All Categories
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
