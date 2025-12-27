import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

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

const safariImages = [
  'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
  'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800',
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
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

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Empty Space */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Center Images */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="relative group overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                src={safariImages[0]}
                alt="Safari experience"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="relative group overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                src={safariImages[1]}
                alt="Safari adventure"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Testimonials */}
          <div className="lg:col-span-7">
            <div className="relative min-h-[400px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    index === currentIndex
                      ? 'opacity-100 translate-x-0'
                      : index < currentIndex
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-secondary text-secondary" />
                      ))}
                    </div>

                    <blockquote className="font-display text-xl md:text-2xl lg:text-3xl text-primary-foreground leading-relaxed mb-8">
                      "{testimonial.text}"
                    </blockquote>

                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-3 border-secondary shadow-lg"
                      />
                      <div>
                        <span className="block font-heading font-semibold text-primary-foreground text-lg">
                          {testimonial.name}
                        </span>
                        <span className="text-primary-foreground/70">
                          {testimonial.location}
                        </span>
                      </div>
                      <div className="ml-auto text-right hidden sm:block">
                        <span className="block font-heading text-sm text-secondary font-semibold">
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

            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentIndex
                      ? 'w-12 bg-secondary'
                      : 'w-2 bg-primary-foreground/30 hover:bg-primary-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-16 border-t border-primary-foreground/10">
          <div className="flex items-center gap-3 text-primary-foreground/80">
            <div className="w-14 h-14 bg-primary-foreground/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Star className="w-7 h-7 fill-secondary text-secondary" />
            </div>
            <div>
              <span className="block font-display text-2xl font-bold text-primary-foreground">4.9/5</span>
              <span className="text-sm text-primary-foreground/60">TripAdvisor</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-primary-foreground/80">
            <div className="w-14 h-14 bg-primary-foreground/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Star className="w-7 h-7 fill-secondary text-secondary" />
            </div>
            <div>
              <span className="block font-display text-2xl font-bold text-primary-foreground">5.0/5</span>
              <span className="text-sm text-primary-foreground/60">Google Reviews</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-primary-foreground/80">
            <div className="w-14 h-14 bg-primary-foreground/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <span className="font-display text-xl font-bold text-secondary">2.8K+</span>
            </div>
            <div>
              <span className="block font-display text-2xl font-bold text-primary-foreground">Reviews</span>
              <span className="text-sm text-primary-foreground/60">Verified Travelers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
