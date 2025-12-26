import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  tour: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah & Michael Thompson',
    location: 'New York, USA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 5,
    text: 'An absolutely magical experience! The guides were incredibly knowledgeable, and we saw all of the Big Five in just three days. The accommodations exceeded our expectations.',
    tour: 'Serengeti Safari',
    date: 'October 2024',
  },
  {
    id: '2',
    name: 'James & Emily Watson',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 5,
    text: 'Climbing Kilimanjaro was a life-changing experience. The DeMi Tours team made sure we were safe and well-prepared at every step. Reaching the summit was unforgettable.',
    tour: 'Kilimanjaro Summit',
    date: 'September 2024',
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    location: 'Madrid, Spain',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    rating: 5,
    text: 'The gorilla trekking in Rwanda was beyond words. Coming face to face with these gentle giants was the most incredible wildlife encounter of my life.',
    tour: 'Rwanda Gorillas',
    date: 'November 2024',
  },
  {
    id: '4',
    name: 'David & Lisa Chen',
    location: 'Sydney, Australia',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    rating: 5,
    text: 'From the moment we landed in Tanzania, everything was perfectly organized. The sunset over the Serengeti is something we\'ll never forget. Highly recommend!',
    tour: 'Tanzania Explorer',
    date: 'August 2024',
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 lg:py-32 bg-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-secondary" />
            <span className="font-heading text-sm uppercase tracking-widest text-secondary">
              Testimonials
            </span>
            <div className="w-12 h-px bg-secondary" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            What Our Travelers
            <span className="text-secondary block">Say About Us</span>
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Large Quote Icon */}
          <Quote className="absolute -top-8 left-0 w-24 h-24 text-secondary/20" />
          
          {/* Cards Container */}
          <div className="relative">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 md:p-12">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-secondary text-secondary" />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <blockquote className="font-display text-xl md:text-2xl lg:text-3xl text-primary-foreground leading-relaxed mb-8">
                      "{testimonial.text}"
                    </blockquote>
                    
                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-secondary"
                      />
                      <div>
                        <span className="block font-heading font-semibold text-primary-foreground">
                          {testimonial.name}
                        </span>
                        <span className="text-primary-foreground/70 text-sm">
                          {testimonial.location}
                        </span>
                      </div>
                      <div className="ml-auto text-right hidden sm:block">
                        <span className="block font-heading text-sm text-secondary">
                          {testimonial.tour}
                        </span>
                        <span className="text-primary-foreground/60 text-sm">
                          {testimonial.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-2 border-primary-foreground/30 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-secondary'
                      : 'w-2 bg-primary-foreground/30 hover:bg-primary-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-2 border-primary-foreground/30 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-16 border-t border-primary-foreground/10">
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 fill-secondary text-secondary" />
            </div>
            <div>
              <span className="block font-display text-xl font-bold text-primary-foreground">4.9/5</span>
              <span className="text-xs text-primary-foreground/60">TripAdvisor</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 fill-secondary text-secondary" />
            </div>
            <div>
              <span className="block font-display text-xl font-bold text-primary-foreground">5.0/5</span>
              <span className="text-xs text-primary-foreground/60">Google Reviews</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <div className="w-12 h-12 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
              <span className="font-display text-lg font-bold text-secondary">2.8K+</span>
            </div>
            <div>
              <span className="block font-display text-xl font-bold text-primary-foreground">Reviews</span>
              <span className="text-xs text-primary-foreground/60">Verified Travelers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
