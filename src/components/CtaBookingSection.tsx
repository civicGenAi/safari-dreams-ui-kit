import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Phone, ArrowRight } from 'lucide-react';

export const CtaBookingSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 15 L45 30 L30 45 L15 30 Z" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading */}
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              At Demi Tours and Travel
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl font-display text-gradient-gold">
              We treat our clients like family
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/booking" className="w-full sm:w-auto">
              <Button
                variant="gold"
                size="xl"
                className="w-full sm:w-auto gap-3 text-lg px-8 py-7 shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <Calendar className="w-6 h-6" />
                Plan Your Safari
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <Link to="/contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="xl"
                className="w-full sm:w-auto gap-3 text-lg px-8 py-7 border-2 hover:bg-muted/50"
              >
                <Phone className="w-6 h-6" />
                Speak to an Expert
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
