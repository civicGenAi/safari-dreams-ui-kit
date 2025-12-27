import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight } from 'lucide-react';

export const ClientFamilySection = () => {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920"
          alt="Safari family experience"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/75 to-charcoal/85" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Heart className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            At Demi Tours and Travel
          </h3>
          <p className="font-display text-2xl md:text-3xl lg:text-4xl text-primary mb-8">
            We Treat Our Clients Like Family
          </p>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Your journey is our passion. Let us craft an unforgettable experience
            that exceeds your expectations. Reach out today and become part of our family.
          </p>
          <Link to="/contact">
            <Button variant="primary" size="xl" className="gap-2 shadow-2xl">
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
