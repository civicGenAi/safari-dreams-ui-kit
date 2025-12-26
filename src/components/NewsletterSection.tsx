import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle } from 'lucide-react';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1920"
          alt="African sunset landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/80 to-charcoal/70" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-primary-foreground/90 text-sm font-heading uppercase tracking-wider">
              Newsletter
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Get Exclusive Travel
            <span className="text-secondary block">Tips & Offers</span>
          </h2>

          <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
            Subscribe to our newsletter and be the first to know about special deals, 
            new destinations, and insider travel tips.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-14 px-6 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-secondary transition-colors"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="gold"
                size="xl"
                className="gap-2 min-w-[160px]"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
            <p className="text-primary-foreground/60 text-sm mt-4">
              Join 15,000+ subscribers. No spam, unsubscribe anytime.
            </p>
          </form>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
            {[
              'Early Access to Deals',
              'Exclusive Discounts',
              'Travel Inspiration',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span className="text-primary-foreground/80 font-heading text-sm">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
