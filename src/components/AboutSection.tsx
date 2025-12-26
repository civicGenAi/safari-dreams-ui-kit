import { Button } from '@/components/ui/button';
import { Award, Users, MapPin, Calendar } from 'lucide-react';

const stats = [
  { icon: Calendar, value: '15+', label: 'Years Experience' },
  { icon: Users, value: '10K+', label: 'Happy Travelers' },
  { icon: MapPin, value: '50+', label: 'Destinations' },
  { icon: Award, value: '98%', label: 'Satisfaction Rate' },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-lift">
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800"
                alt="Safari vehicle with tourists viewing wildlife"
                className="w-full h-[500px] object-cover"
              />
            </div>
            
            {/* Decorative Frame */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-secondary rounded-3xl -z-10" />
            
            {/* Experience Badge */}
            <div className="absolute -bottom-8 -right-4 lg:-right-12 bg-primary text-primary-foreground rounded-2xl p-6 shadow-lift z-20">
              <span className="block font-display text-5xl font-bold text-secondary">15+</span>
              <span className="block font-heading text-sm uppercase tracking-wider mt-1">Years of</span>
              <span className="block font-heading text-sm uppercase tracking-wider">Excellence</span>
            </div>

            {/* Floating Quote */}
            <div className="absolute top-8 -right-4 lg:-right-8 glass-dark rounded-2xl p-4 max-w-[200px] z-20">
              <span className="text-4xl text-secondary font-display">"</span>
              <p className="text-primary-foreground text-sm leading-relaxed -mt-4">
                The best safari experience of our lives!
              </p>
              <span className="block mt-2 text-primary-foreground/70 text-xs">— Sarah & John</span>
            </div>
          </div>

          {/* Content Side */}
          <div>
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-secondary" />
              <span className="font-heading text-sm uppercase tracking-widest text-secondary">
                About DeMi Tours
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Your Gateway to
              <span className="text-gradient-gold block">Unforgettable Adventures</span>
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Since 2009, DeMi Tours has been crafting extraordinary safari experiences across 
              East Africa and beyond. We believe every journey should be as unique as the 
              travelers who embark on it.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our team of expert guides and travel specialists are passionate about sharing 
              the wonders of Africa with you. From the majestic Serengeti plains to the 
              snow-capped peak of Kilimanjaro, we create memories that last a lifetime.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                'Expert Local Guides',
                'Customized Itineraries',
                'Sustainable Tourism',
                '24/7 Support',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                  </div>
                  <span className="font-heading text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button variant="forest" size="xl">
                Our Story
              </Button>
              <Button variant="outline-forest" size="lg">
                Meet Our Team
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative p-8 rounded-2xl bg-card border border-border text-center group hover:border-secondary/50 transition-colors duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary/10 text-secondary mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-7 h-7" />
              </div>
              <span className="block font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
                {stat.value}
              </span>
              <span className="font-heading text-sm uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
