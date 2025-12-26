import { Button } from '@/components/ui/button';
import { Clock, Users, Star, Heart, ArrowRight } from 'lucide-react';

interface Tour {
  id: string;
  title: string;
  location: string;
  duration: string;
  groupSize: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  popular?: boolean;
  category: string;
}

const tours: Tour[] = [
  {
    id: '1',
    title: '7 Days Serengeti & Ngorongoro Safari',
    location: 'Tanzania',
    duration: '7 Days',
    groupSize: '2-8',
    price: 3499,
    originalPrice: 3999,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1534177616064-ef1a5c91e6e8?w=600',
    popular: true,
    category: 'Safari',
  },
  {
    id: '2',
    title: 'Kilimanjaro Summit Expedition',
    location: 'Tanzania',
    duration: '8 Days',
    groupSize: '4-12',
    price: 2899,
    rating: 4.8,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1621414050946-1b936a78be32?w=600',
    category: 'Trekking',
  },
  {
    id: '3',
    title: 'Gorilla Trekking Experience',
    location: 'Rwanda',
    duration: '4 Days',
    groupSize: '2-6',
    price: 4299,
    rating: 5.0,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1583867095486-3e0e2e66cf44?w=600',
    popular: true,
    category: 'Wildlife',
  },
  {
    id: '4',
    title: 'Zanzibar Beach & Culture',
    location: 'Tanzania',
    duration: '5 Days',
    groupSize: '2-10',
    price: 1599,
    rating: 4.7,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=600',
    category: 'Beach',
  },
  {
    id: '5',
    title: 'Masai Mara Great Migration',
    location: 'Kenya',
    duration: '6 Days',
    groupSize: '2-8',
    price: 3199,
    originalPrice: 3599,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600',
    popular: true,
    category: 'Safari',
  },
  {
    id: '6',
    title: 'Holy Land Pilgrimage Tour',
    location: 'Israel',
    duration: '10 Days',
    groupSize: '10-25',
    price: 2799,
    rating: 4.8,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600',
    category: 'Pilgrimage',
  },
];

export const ToursSection = () => {
  return (
    <section id="tours" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-secondary" />
              <span className="font-heading text-sm uppercase tracking-widest text-secondary">
                Featured Tours
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Trending
              <span className="text-gradient-gold"> Safari Tours</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover our most popular safari experiences, handpicked for unforgettable adventures.
            </p>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Safari', 'Trekking', 'Beach', 'Wildlife'].map((filter, index) => (
              <button
                key={filter}
                className={`px-5 py-2.5 rounded-full font-heading text-sm uppercase tracking-wider transition-all ${
                  index === 0
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <article
              key={tour.id}
              className="group bg-card rounded-3xl overflow-hidden shadow-md card-hover border border-border"
            >
              {/* Image */}
              <div className="relative h-64 img-zoom">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-card opacity-60" />
                
                {/* Badges */}
                {tour.popular && (
                  <div className="absolute top-4 left-4 bg-sunset text-primary-foreground px-3 py-1.5 rounded-full text-xs font-heading font-semibold uppercase tracking-wider">
                    Popular
                  </div>
                )}
                
                {/* Price Tag */}
                <div className="absolute top-4 right-4 glass text-primary-foreground px-4 py-2 rounded-xl">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-xl font-bold">${tour.price}</span>
                    <span className="text-xs opacity-80">/person</span>
                  </div>
                  {tour.originalPrice && (
                    <span className="text-xs line-through opacity-60">${tour.originalPrice}</span>
                  )}
                </div>
                
                {/* Favorite Button */}
                <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-sunset hover:bg-background transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                
                {/* Category */}
                <div className="absolute bottom-4 left-4 glass-dark text-primary-foreground px-3 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider">
                  {tour.category}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Location */}
                <span className="text-secondary font-heading text-sm uppercase tracking-wider">
                  {tour.location}
                </span>
                
                {/* Title */}
                <h3 className="font-display text-xl font-bold text-foreground mt-2 mb-4 group-hover:text-primary transition-colors">
                  {tour.title}
                </h3>
                
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{tour.groupSize}</span>
                  </div>
                </div>
                
                {/* Rating & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-secondary text-secondary" />
                      <span className="font-heading font-semibold text-foreground">{tour.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">({tour.reviews} reviews)</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary gap-1 group-hover:gap-2 transition-all">
                    Details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="gold" size="xl" className="gap-2">
            View All Tours
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
