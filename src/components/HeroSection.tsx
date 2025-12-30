import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import warrior01 from '@/assets/hero/revslider_welcome_warrior01.webp';
import migration02 from '@/assets/hero/revslider_migration02.jpg';
import pilgrimage03 from '@/assets/hero/revslider_pilgrimage_dome03.jpg';
import adventure04 from '@/assets/hero/revslider_adventure04.jpg';
import luxury05 from '@/assets/hero/revslider_luxury05.jpg';

interface Slide {
  image: string;
  titleFirstPart: string;
  titleSecondPart: string;
  buttonText: string;
  buttonLink: string;
}

const slides: Slide[] = [
  {
    image: warrior01,
    titleFirstPart: 'An Epic & Pulsating',
    titleSecondPart: 'adventure',
    buttonText: 'Take Me There',
    buttonLink: '/travel-ideas/pilgrimages',
  },
  {
    image: migration02,
    titleFirstPart: 'The Great Migration',
    titleSecondPart: 'leap of faith',
    buttonText: 'Take Me There',
    buttonLink: '/travel-ideas/migration-safaris',
  },
  {
    image: pilgrimage03,
    titleFirstPart: 'Holy Land',
    titleSecondPart: 'pilgrimage',
    buttonText: 'Take Me There',
    buttonLink: '/travel-ideas/pilgrimages',
  },
  {
    image: adventure04,
    titleFirstPart: 'Come With Us to a',
    titleSecondPart: 'new experience',
    buttonText: "Let's Go",
    buttonLink: '/travel-ideas/day-tours',
  },
  {
    image: luxury05,
    titleFirstPart: 'Experience Total Luxury',
    titleSecondPart: 'in the wild',
    buttonText: "Let's Go",
    buttonLink: '/travel-ideas/luxury-tours',
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
            alt={slide.titleFirstPart}
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
          {/* Title */}
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-primary-foreground leading-tight mb-8 text-shadow-hero transition-all duration-700 delay-100 ${
              isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}
          >
            <span className="font-heading font-semibold block mb-2 animate-fade-in-up">
              {slides[currentSlide].titleFirstPart}
            </span>
            <span className="font-display font-bold block text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              {slides[currentSlide].titleSecondPart}
            </span>
          </h1>

          {/* CTA Button */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
              isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}
          >
            <Link to={slides[currentSlide].buttonLink}>
              <button className="px-8 py-4 border-2 border-white text-white font-heading font-semibold text-lg uppercase tracking-wider hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                {slides[currentSlide].buttonText}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-1/2 translate-y-1/2 left-4 lg:left-8">
        <button
          onClick={prevSlide}
          className="group relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary-foreground hover:bg-white/20 hover:scale-110 transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 relative z-10" />
          <div className="absolute inset-0 rounded-full border-2 border-white/40 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>
      <div className="absolute bottom-1/2 translate-y-1/2 right-4 lg:right-8">
        <button
          onClick={nextSlide}
          className="group relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary-foreground hover:bg-white/20 hover:scale-110 transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 relative z-10" />
          <div className="absolute inset-0 rounded-full border-2 border-white/40 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>

      {/* Slide Indicators - Dotted with Expand on Hover */}
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
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-12 bg-secondary'
                : 'w-3 bg-primary-foreground/40 hover:w-8 hover:bg-primary-foreground/60'
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
