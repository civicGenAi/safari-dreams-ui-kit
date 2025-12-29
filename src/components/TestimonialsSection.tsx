import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import feedbackClient1 from '@/assets/feedback_client.webp';
import feedbackClient2 from '@/assets/feedback_client2.webp';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  title: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'ANAT K',
    location: 'Haifa, Israel',
    title: 'Great Safari, Professional Planning',
    rating: 5,
    text: '"In one word- Wow!!! What an adventure. Great Safari production, everything was planned to the letter. Great choice of lodges and the BEST guide! Huruma, the guide, was the icing on the cake - professional spotting abilities upgraded the entire safari experience. Asanta sana"',
  },
  {
    id: '2',
    name: 'SARAH T',
    location: 'London, UK',
    title: 'Life-Changing Experience',
    rating: 5,
    text: '"An absolutely magical experience! The guides were incredibly knowledgeable, and we saw all of the Big Five in just three days. The accommodations exceeded our expectations. Would highly recommend DeMi Tours to anyone!"',
  },
  {
    id: '3',
    name: 'JAMES W',
    location: 'Sydney, Australia',
    title: 'Unforgettable Kilimanjaro Summit',
    rating: 5,
    text: '"Climbing Kilimanjaro was a life-changing experience. The DeMi Tours team made sure we were safe and well-prepared at every step. Reaching the summit at sunrise was absolutely unforgettable. Thank you!"',
  },
  {
    id: '4',
    name: 'MARIA R',
    location: 'Madrid, Spain',
    title: 'Gorilla Trekking Adventure',
    rating: 5,
    text: '"The gorilla trekking in Rwanda was beyond words. Coming face to face with these gentle giants was the most incredible wildlife encounter of my life. DeMi Tours handled every detail perfectly."',
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary font-medium">
            AUTHENTIC TRAVELER FEEDBACK
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-6 italic">
            Our Travelers experiences...
          </h2>
          <div className="w-16 h-px bg-primary/60 mx-auto mt-6" />
        </div>

        {/* Main Content - Images on sides, testimonial in center */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Image */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="relative">
              <img
                src={feedbackClient1}
                alt="Happy traveler"
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent rounded-3xl" />
            </div>
          </div>

          {/* Center - Testimonials Carousel */}
          <div className="lg:col-span-6 relative">
            <div className="relative min-h-[350px] flex items-center">
              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-0 lg:-left-4 z-10 w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors bg-background/80 backdrop-blur-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 lg:-right-4 z-10 w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors bg-background/80 backdrop-blur-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Testimonials */}
              <div className="w-full px-16">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`transition-all duration-700 ${
                      index === currentIndex
                        ? 'opacity-100 block'
                        : 'opacity-0 hidden'
                    }`}
                  >
                    <div className="bg-background rounded-3xl p-8 md:p-10 shadow-xl border border-border text-center">
                      {/* Title */}
                      <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-6 underline decoration-primary/30 underline-offset-4">
                        {testimonial.title}
                      </h3>

                      {/* Quote */}
                      <blockquote className="font-display text-base md:text-lg text-muted-foreground leading-relaxed mb-6 italic">
                        {testimonial.text}
                      </blockquote>

                      {/* Stars */}
                      <div className="flex items-center justify-center gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                        ))}
                      </div>
                    </div>

                    {/* Author Badge - Outside card */}
                    <div className="flex justify-center -mt-5">
                      <div className="bg-muted/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                        <span className="block font-heading font-bold text-foreground text-sm tracking-wide">
                          {testimonial.name}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {testimonial.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="relative">
              <img
                src={feedbackClient2}
                alt="Safari photographer"
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
