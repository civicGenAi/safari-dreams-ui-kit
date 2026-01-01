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
    <section id="tours" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Animated SVG Tour Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          {/* Map markers - scattered */}
          <g opacity="0.04" fill="#EE8509">
            <path d="M250 200 C250 200 250 180 250 170 C250 160 240 150 250 150 C260 150 250 160 250 170 C250 180 250 200 250 200 Z" />
            <circle cx="250" cy="155" r="4" fill="#FFF" />

            <path d="M1180 300 C1180 300 1180 280 1180 270 C1180 260 1170 250 1180 250 C1190 250 1180 260 1180 270 C1180 280 1180 300 1180 300 Z" />
            <circle cx="1180" cy="255" r="4" fill="#FFF" />
          </g>

          {/* Luggage/travel bag silhouettes */}
          <g opacity="0.05" stroke="#2D3748" fill="none">
            <rect x="150" y="650" width="30" height="35" rx="3" strokeWidth="2" />
            <rect x="155" y="645" width="20" height="5" rx="2" strokeWidth="1.5" />
            <line x1="165" y1="665" x2="165" y2="680" strokeWidth="1.5" />

            <rect x="1250" y="700" width="28" height="32" rx="3" strokeWidth="2" />
            <rect x="1254" y="695" width="20" height="5" rx="2" strokeWidth="1.5" />
            <line x1="1264" y1="715" x2="1264" y2="728" strokeWidth="1.5" />
          </g>

          {/* Airplane flight paths - dotted trails */}
          <g opacity="0.03" stroke="#EE8509" fill="none">
            <path d="M100 350 Q400 320 700 350" strokeWidth="2" strokeDasharray="4 8">
              <animate attributeName="stroke-dashoffset" values="0;24;0" dur="12s" repeatCount="indefinite" />
            </path>
            <path d="M800 400 Q1000 380 1200 400" strokeWidth="2" strokeDasharray="4 8">
              <animate attributeName="stroke-dashoffset" values="0;24;0" dur="14s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Small airplanes */}
          <g opacity="0.04" fill="#2D3748">
            <g>
              <path d="M720 340 L728 343 L735 340 L728 346 L720 340 Z" />
              <rect x="726" y="340" width="4" height="8" />
              <animateTransform attributeName="transform" type="translate" values="0,0; 40,-5; 80,0" dur="16s" repeatCount="indefinite" />
            </g>
          </g>

          {/* Star ratings decorative */}
          <g opacity="0.04" fill="#EE8509">
            <path d="M350 550 L352 555 L357 555 L353 558 L355 563 L350 560 L345 563 L347 558 L343 555 L348 555 Z">
              <animate attributeName="opacity" values="0.04;0.06;0.04" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M365 555 L367 560 L372 560 L368 563 L370 568 L365 565 L360 568 L362 563 L358 560 L363 560 Z">
              <animate attributeName="opacity" values="0.04;0.06;0.04" dur="3.5s" repeatCount="indefinite" />
            </path>
            <path d="M380 550 L382 555 L387 555 L383 558 L385 563 L380 560 L375 563 L377 558 L373 555 L378 555 Z">
              <animate attributeName="opacity" values="0.04;0.06;0.04" dur="4s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Calendar/time dots */}
          <g opacity="0.04" fill="#2D3748">
            <circle cx="1050" cy="200" r="2" />
            <circle cx="1060" cy="200" r="2" />
            <circle cx="1070" cy="200" r="2" />
            <circle cx="1080" cy="200" r="2" />
            <circle cx="1050" cy="210" r="2" />
            <circle cx="1060" cy="210" r="2" />
            <circle cx="1070" cy="210" r="2" />
          </g>

          {/* Price tag shapes */}
          <g opacity="0.05" stroke="#EE8509" fill="none">
            <path d="M100 500 L120 500 L125 505 L120 510 L100 510 Z" strokeWidth="1.5" />
            <circle cx="105" cy="505" r="2" fill="#EE8509" />

            <path d="M1320 550 L1340 550 L1345 555 L1340 560 L1320 560 Z" strokeWidth="1.5" />
            <circle cx="1325" cy="555" r="2" fill="#EE8509" />
          </g>

          {/* Decorative border elements - corners */}
          <g opacity="0.04" stroke="#2D3748" fill="none">
            <path d="M30 30 L60 30 M30 30 L30 60" strokeWidth="2" strokeLinecap="round" />
            <path d="M1410 30 L1380 30 M1410 30 L1410 60" strokeWidth="2" strokeLinecap="round" />
            <path d="M30 870 L60 870 M30 870 L30 840" strokeWidth="2" strokeLinecap="round" />
            <path d="M1410 870 L1380 870 M1410 870 L1410 840" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
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
