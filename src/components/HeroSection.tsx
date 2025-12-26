import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroSafari1 from '@/assets/hero-safari-1.jpg';
import heroSafari2 from '@/assets/hero-safari-2.jpg';
import heroSafari3 from '@/assets/hero-safari-3.jpg';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  location: string;
}

const slides: Slide[] = [
  {
    image: heroSafari1,
    title: 'Experience the Magic of African Safari',
    subtitle: 'Embark on an unforgettable journey through Tanzania\'s wilderness',
    location: 'Tanzania',
  },
  {
    image: heroSafari2,
    title: 'Witness the Great Migration',
    subtitle: 'Over 2 million wildebeest crossing the Serengeti plains',
    location: 'Serengeti',
  },
  {
    image: heroSafari3,
    title: 'Encounter the King of the Jungle',
    subtitle: 'Get up close with Africa\'s magnificent wildlife',
    location: 'Masai Mara',
  },
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 lg:px-8 flex items-center">
        <div className="max-w-3xl pt-20">
          {/* Location Tag */}
          <div
            className={`inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 transition-all duration-700 ${
              isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-primary-foreground/90 text-sm font-heading uppercase tracking-wider">
              {slides[currentSlide].location}
            </span>
          </div>

          {/* Title */}
          <h1
            className={`font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-primary-foreground font-bold leading-tight mb-6 text-shadow-hero transition-all duration-700 delay-100 ${
              isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}
          >
            {slides[currentSlide].title}
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl leading-relaxed transition-all duration-700 delay-200 ${
              isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}
          >
            {slides[currentSlide].subtitle}
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
              isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}
          >
            <Button variant="gold" size="xl">
              Explore Tours
            </Button>
            <Button variant="outline-white" size="xl" className="gap-2">
              <Play className="w-4 h-4" />
              Watch Video
            </Button>
          </div>

          {/* Rating Badge */}
          <div
            className={`mt-12 inline-flex items-center gap-4 glass-dark rounded-2xl px-6 py-4 transition-all duration-700 delay-400 ${
              isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
              ))}
            </div>
            <div className="h-8 w-px bg-primary-foreground/20" />
            <div>
              <span className="block text-primary-foreground font-display text-xl font-bold">
                4.9/5
              </span>
              <span className="text-primary-foreground/70 text-sm">
                Based on 2,847 reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-1/2 translate-y-1/2 left-4 lg:left-8">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute bottom-1/2 translate-y-1/2 right-4 lg:right-8">
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 800);
              }
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-10 bg-secondary'
                : 'w-2 bg-primary-foreground/40 hover:bg-primary-foreground/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="flex flex-col items-center gap-2 text-primary-foreground/60">
          <span className="text-xs font-heading uppercase tracking-widest rotate-90 origin-center translate-x-6 translate-y-8">
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-primary-foreground/60 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};
