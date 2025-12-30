import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, MapPin, ArrowRight } from 'lucide-react';
import { mockTours } from '@/data/mockData';

export const ToursSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  const filters = ['All', 'Safari', 'Trekking', 'Beach', 'Wildlife'];

  const filteredTours = activeFilter === 'All'
    ? mockTours
    : mockTours.filter(tour => tour.category.toLowerCase() === activeFilter.toLowerCase());

  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      default:
        return b.popular ? 1 : -1;
    }
  });

  const toursToShow = sortedTours.slice(0, 6);

  return (
    <section id="tours" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-secondary" />
            <span className="font-heading text-sm uppercase tracking-widest text-secondary">
              Featured Tours
            </span>
            <div className="w-12 h-px bg-secondary" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Popular Safari Packages
          </h2>
          <p className="text-muted-foreground text-lg">
            Carefully curated safari experiences with transparent pricing and expert guides.
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-6 border-b border-border">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg font-heading text-sm transition-all ${
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-heading">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-input bg-background text-foreground font-heading text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {toursToShow.map((tour, index) => (
            <article
              key={tour.id}
              className="group bg-background rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Tour Image */}
              <Link to={`/tours/${tour.slug}`} className="block relative h-56 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Popular Badge */}
                {tour.popular && (
                  <div className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-xs font-heading font-semibold">
                    POPULAR
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-heading font-medium">
                  {tour.category}
                </div>
              </Link>

              {/* Tour Content */}
              <div className="p-6">
                {/* Location */}
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="font-heading">{tour.location}</span>
                </div>

                {/* Title */}
                <Link to={`/tours/${tour.slug}`}>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {tour.title}
                  </h3>
                </Link>

                {/* Tour Details */}
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span className="font-heading">{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span className="font-heading">{tour.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="font-heading font-semibold text-foreground">{tour.rating}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-2xl font-bold text-foreground">${tour.price}</span>
                      <span className="text-sm text-muted-foreground">/person</span>
                    </div>
                    {tour.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">${tour.originalPrice}</span>
                    )}
                  </div>
                  <Link to={`/tours/${tour.slug}`}>
                    <Button variant="primary" size="sm" className="gap-1.5 group-hover:gap-2.5 transition-all">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Show All Tours Button */}
        <div className="text-center">
          <Link to="/tours">
            <Button variant="gold" size="xl" className="gap-2">
              View All {filteredTours.length} Tours
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
