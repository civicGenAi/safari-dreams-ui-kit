import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockTours } from '@/data/mockData';

export const ToursSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout>();

  const filters = ['All', 'Safari', 'Trekking', 'Beach', 'Wildlife'];

  const filteredTours = activeFilter === 'All'
    ? mockTours
    : mockTours.filter(tour => tour.category.toLowerCase() === activeFilter.toLowerCase());

  const toursToShow = filteredTours.slice(0, 9);
  const cardsPerView = 3;
  const totalSlides = Math.max(0, Math.ceil(toursToShow.length / cardsPerView) - 1);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [totalSlides]);

  const startAutoScroll = () => {
    stopAutoScroll();
    if (totalSlides > 0) {
      autoScrollRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev >= totalSlides ? 0 : prev + 1));
      }, 4000);
    }
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentSlide(0);
    stopAutoScroll();
    setTimeout(startAutoScroll, 500);
  };

  const nextSlide = () => {
    stopAutoScroll();
    setCurrentSlide(prev => (prev >= totalSlides ? 0 : prev + 1));
    setTimeout(startAutoScroll, 500);
  };

  const prevSlide = () => {
    stopAutoScroll();
    setCurrentSlide(prev => (prev <= 0 ? totalSlides : prev - 1));
    setTimeout(startAutoScroll, 500);
  };

  return (
    <section id="tours" className="py-24 lg:py-32 bg-muted/20">
      <div className="container mx-auto px-4 lg:px-8">
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

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-5 py-2.5 rounded-full font-heading text-sm uppercase tracking-wider transition-all ${
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={scrollRef}>
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)`,
              }}
            >
              {toursToShow.map((tour) => (
                <div
                  key={tour.id}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <article className="group bg-card rounded-3xl overflow-hidden shadow-md card-hover border border-border h-full">
                    <Link to={`/tours/${tour.slug}`} className="block relative h-64 img-zoom">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-card opacity-60" />

                      {tour.popular && (
                        <div className="absolute top-4 left-4 bg-sunset text-primary-foreground px-3 py-1.5 rounded-full text-xs font-heading font-semibold uppercase tracking-wider">
                          Popular
                        </div>
                      )}

                      <div className="absolute top-4 right-4 glass text-primary-foreground px-4 py-2 rounded-xl">
                        <div className="flex items-baseline gap-1">
                          <span className="font-display text-xl font-bold">${tour.price}</span>
                          <span className="text-xs opacity-80">/person</span>
                        </div>
                        {tour.originalPrice && (
                          <span className="text-xs line-through opacity-60">${tour.originalPrice}</span>
                        )}
                      </div>

                      <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-sunset hover:bg-background transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>

                      <div className="absolute bottom-4 left-4 glass-dark text-primary-foreground px-3 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider">
                        {tour.category}
                      </div>
                    </Link>

                    <div className="p-6">
                      <span className="text-secondary font-heading text-sm uppercase tracking-wider">
                        {tour.location}
                      </span>

                      <Link to={`/tours/${tour.slug}`}>
                        <h3 className="font-display text-xl font-bold text-foreground mt-2 mb-4 group-hover:text-primary transition-colors">
                          {tour.title}
                        </h3>
                      </Link>

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

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-secondary text-secondary" />
                            <span className="font-heading font-semibold text-foreground">{tour.rating}</span>
                          </div>
                          <span className="text-muted-foreground text-sm">({tour.reviews} reviews)</span>
                        </div>
                        <Link to={`/tours/${tour.slug}`}>
                          <Button variant="ghost" size="sm" className="text-primary gap-1 group-hover:gap-2 transition-all">
                            Details
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {totalSlides > 0 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all z-10"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all z-10"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: totalSlides + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                stopAutoScroll();
                setCurrentSlide(index);
                setTimeout(startAutoScroll, 500);
              }}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? 'w-12 bg-primary'
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/tours">
            <Button variant="gold" size="xl" className="gap-2">
              View All Tours
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
