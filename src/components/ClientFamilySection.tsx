import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight } from 'lucide-react';

export const ClientFamilySection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto bg-muted/30 rounded-3xl p-10 lg:p-16 border border-border">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            At Demi Tours and Travel
          </h3>
          <p className="font-display text-xl md:text-2xl text-primary mb-8">
            We Treat Our Clients Like Family
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Your journey is our passion. Let us craft an unforgettable experience
            that exceeds your expectations. Reach out today and become part of our family.
          </p>
          <Link to="/contact">
            <Button variant="primary" size="xl" className="gap-2">
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
