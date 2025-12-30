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
    <section className="py-16 lg:py-20 bg-[#f5f3ef] relative overflow-hidden">
      {/* Animated SVG Nature Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* Grass at bottom */}
          <g opacity="0.06" fill="#EE8509">
            {[...Array(40)].map((_, i) => (
              <line
                key={`grass-${i}`}
                x1={i * 30}
                y1="280"
                x2={i * 30 + (i % 2 === 0 ? -5 : 5)}
                y2="250"
                stroke="#2D3748"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ animation: `sway ${3 + (i % 3)}s ease-in-out infinite`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </g>

          {/* Safari horizon line */}
          <path d="M0 240 Q300 230 600 235 T1200 240" stroke="#EE8509" strokeWidth="1" fill="none" opacity="0.04" strokeDasharray="8 8" />

          {/* Floating birds - top right */}
          <g opacity="0.05" fill="#2D3748">
            <path d="M950 40 Q955 35 960 40" stroke="#2D3748" strokeWidth="1.5" fill="none">
              <animateTransform attributeName="transform" type="translate" values="0,0; 20,-10; 0,0" dur="8s" repeatCount="indefinite" />
            </path>
            <path d="M920 60 Q925 55 930 60" stroke="#2D3748" strokeWidth="1.5" fill="none">
              <animateTransform attributeName="transform" type="translate" values="0,0; 15,-8; 0,0" dur="10s" repeatCount="indefinite" />
            </path>
            <path d="M980 50 Q985 45 990 50" stroke="#2D3748" strokeWidth="1.5" fill="none">
              <animateTransform attributeName="transform" type="translate" values="0,0; 18,-12; 0,0" dur="12s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Subtle sun rays - top left */}
          <g opacity="0.03" stroke="#EE8509" strokeWidth="2" fill="none">
            <line x1="100" y1="60" x2="100" y2="100" strokeDasharray="4 4">
              <animate attributeName="opacity" values="0.03;0.05;0.03" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="140" y1="80" x2="160" y2="110" strokeDasharray="4 4">
              <animate attributeName="opacity" values="0.03;0.05;0.03" dur="5s" repeatCount="indefinite" />
            </line>
            <line x1="60" y1="80" x2="40" y2="110" strokeDasharray="4 4">
              <animate attributeName="opacity" values="0.03;0.05;0.03" dur="6s" repeatCount="indefinite" />
            </line>
          </g>

          {/* Decorative dots pattern */}
          <g opacity="0.04" fill="#EE8509">
            <circle cx="200" cy="150" r="2" />
            <circle cx="400" cy="120" r="1.5" />
            <circle cx="700" cy="180" r="2" />
            <circle cx="1000" cy="140" r="1.5" />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
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
              <Link to="/tours">
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
