import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import staff images for avatars
import staffCaudence from '@/assets/footer_customer_care.webp';
import staffBrenda from '@/assets/footer_customer_care2.webp';
import staffAbel from '@/assets/footer_customer_care3.webp';
import staffHuruma from '@/assets/footer_customer_care4.webp';

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

  const staffAvatars = [staffCaudence, staffBrenda, staffAbel, staffHuruma];

  return (
    <section className="py-16 lg:py-20 bg-[#f5f3ef]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Newsletter Signup */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl italic text-secondary mb-4">
              Be The First To Know
            </h2>
            <p className="text-muted-foreground mb-6">
              Sign up for newest travel ideas, exclusive offers & tales to inspire you.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-12 px-5 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-secondary transition-colors"
                  required
                />
              </div>
              <Button
                type="submit"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 px-6 gap-2"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Divider */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 w-px h-24 bg-border" />

          {/* Right Column - We're Here To Help */}
          <div className="lg:pl-8">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl italic text-secondary mb-4">
              We're Here To Help
            </h2>
            <p className="text-muted-foreground mb-6">
              Speak to your destination expert.
            </p>
            
            <div className="flex items-center gap-6">
              {/* Stacked Avatars */}
              <div className="flex -space-x-3">
                {staffAvatars.map((avatar, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 rounded-full border-2 border-background overflow-hidden bg-muted"
                    style={{ zIndex: staffAvatars.length - index }}
                  >
                    <img
                      src={avatar}
                      alt={`Team member ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Book Now Button */}
              <Link to="/booking">
                <Button
                  variant="outline"
                  className="border-secondary/40 text-secondary hover:bg-secondary/10 h-10 px-5 gap-2"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
