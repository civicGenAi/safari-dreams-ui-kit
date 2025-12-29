import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedBackground } from './AnimatedBackground';
import aboutImage from '@/assets/about.jpg';

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
                At DEMI TOURS and travel
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              We craft unforgettable travel ideas. Think of us as matchmakers.
            </h2>

            <p className="text-xl text-primary font-semibold mb-4">
              Jambo, welcome to demi tours and travel
            </p>

            <p className="text-muted-foreground leading-relaxed">
              DeMi Tours and Travel: Unveiling the Wonders of Africa and beyond.
            </p>
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
                src={aboutImage}
                alt="Safari adventure"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
            </div>

            {/* Experience Badge - Top Right */}
            <div className="absolute -top-4 right-0 lg:right-4 bg-primary text-primary-foreground rounded-2xl px-5 py-4 shadow-primary">
              <span className="block font-display text-3xl font-bold">20</span>
              <span className="block font-heading text-xs uppercase tracking-wider">Years of Experience</span>
            </div>

            {/* Stats Badge - Bottom Left */}
            <div className="absolute -bottom-4 left-0 lg:left-4 bg-secondary text-secondary-foreground rounded-2xl px-5 py-4 shadow-lg">
              <span className="block font-display text-3xl font-bold">40</span>
              <span className="block font-heading text-xs uppercase tracking-wider">Travel Ideas</span>
            </div>
          </div>

          {/* Right: Descriptions & CTA */}
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Nestled in the heart of Arusha, Tanzania, DeMi Tours and Travel beckons travellers with a kaleidoscope of experiences. We are more than just a travel agency; we are architects of adventure, curators of cultural immersion, and facilitators of personal transformation.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our diverse range of travel and tour packages cater to every wanderlust, from the intrepid explorer to the serene beachcomber.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Join DeMi Tours and Travel on an extraordinary adventure and discover the magic that awaits you in East Africa. We promise to unlock the wonders of the region, create lasting memories, and leave you yearning for your next African escapade.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary">20</div>
                <div className="text-xs text-muted-foreground">Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary">40</div>
                <div className="text-xs text-muted-foreground">Curated Travel Ideas</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary">200</div>
                <div className="text-xs text-muted-foreground">Repeat Clients</div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link to="/our-story">
                <Button variant="primary" size="lg">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
