import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Phone, Mail, ArrowRight } from 'lucide-react';

export const CtaBookingSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
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
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              At Demi Tours and Travel
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl font-display text-gradient-gold">
              We treat our clients like family
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
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

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                Free Consultation
              </h3>
              <p className="text-muted-foreground text-sm">
                No obligations, just expert advice tailored to your dreams
              </p>
            </div>

            <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-secondary/50 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                24/7 Support
              </h3>
              <p className="text-muted-foreground text-sm">
                We're here for you before, during, and after your journey
              </p>
            </div>

            <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                Quick Response
              </h3>
              <p className="text-muted-foreground text-sm">
                Custom itinerary delivered within 24 hours
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Prefer to talk? Call us directly
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-foreground font-heading">
              <a
                href="tel:+255123456789"
                className="flex items-center gap-2 text-lg hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
                +255 123 456 789
              </a>
              <span className="hidden sm:block text-muted-foreground">|</span>
              <a
                href="mailto:info@demitoursandtravel.com"
                className="flex items-center gap-2 text-lg hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@demitoursandtravel.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
