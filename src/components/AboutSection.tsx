import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Award, Users, MapPin, Calendar } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';

const features = [
  'Expert Local Guides',
  'Customized Itineraries',
  'Sustainable Tourism',
  '24/7 Support',
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-background overflow-hidden relative">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Three Column Layout */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          {/* Left: Heading & Label */}
          <div className="lg:text-left">
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6 lg:justify-start justify-center">
              <div className="w-12 h-px bg-primary" />
              <span className="font-heading text-sm uppercase tracking-widest text-primary">
                About Demi Tours
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Your Gateway to
              <span className="text-gradient-primary block mt-2">Unforgettable Adventures</span>
            </h2>

            {/* Features */}
            <div className="mt-10 space-y-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="font-heading text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Circular Image */}
          <div className="relative flex justify-center">
            {/* Decorative Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full border-2 border-dashed border-primary/30 animate-spin" style={{ animationDuration: '60s' }} />
            </div>
            
            {/* Main Circular Image */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-lift border-4 border-background">
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800"
                alt="Safari adventure"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
            </div>

            {/* Experience Badge - Top Right */}
            <div className="absolute -top-4 right-0 lg:right-4 bg-primary text-primary-foreground rounded-2xl px-5 py-4 shadow-primary">
              <span className="block font-display text-3xl font-bold">15+</span>
              <span className="block font-heading text-xs uppercase tracking-wider">Years</span>
            </div>

            {/* Stats Badge - Bottom Left */}
            <div className="absolute -bottom-4 left-0 lg:left-4 bg-secondary text-secondary-foreground rounded-2xl px-5 py-4 shadow-lg">
              <span className="block font-display text-3xl font-bold">10K+</span>
              <span className="block font-heading text-xs uppercase tracking-wider">Travelers</span>
            </div>
          </div>

          {/* Right: Descriptions & CTA */}
          <div className="space-y-6">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Since 2009, <span className="text-foreground font-semibold">Demi Tours and Travel</span> has been crafting extraordinary safari experiences across 
              East Africa and beyond. We believe every journey should be as unique as the 
              travelers who embark on it.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Our team of expert guides and travel specialists are passionate about sharing 
              the wonders of Africa with you. From the majestic Serengeti plains to the 
              snow-capped peak of Kilimanjaro, we create memories that last a lifetime.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              We take pride in sustainable tourism practices, supporting local communities, 
              and providing personalized service that makes every traveler feel like family.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/our-story">
                <Button variant="primary" size="lg">
                  Our Story
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
