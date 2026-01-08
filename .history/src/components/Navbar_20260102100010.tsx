import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingFormModal } from '@/components/BookingFormModal';

interface Destination {
  name: string;
  slug: string;
  tours: number;
  flag: string;
}

const destinations: Destination[] = [
  { name: 'Tanzania', slug: 'tanzania', tours: 29, flag: '🇹🇿' },
  { name: 'Kenya', slug: 'kenya', tours: 4, flag: '🇰🇪' },
  { name: 'Rwanda', slug: 'rwanda', tours: 6, flag: '🇷🇼' },
  { name: 'Uganda', slug: 'uganda', tours: 4, flag: '🇺🇬' },
];

interface TravelIdea {
  name: string;
  slug: string;
  tours: number;
  icon: string;
}

const travelIdeas: TravelIdea[] = [
  { name: 'Migration Safaris', slug: 'migration-safaris', tours: 6, icon: '🦓' },
  { name: 'Romantic Holidays', slug: 'romantic-holidays', tours: 8, icon: '💑' },
  { name: 'Safari Beach Holidays', slug: 'safari-beach-holidays', tours: 10, icon: '🏖️' },
  { name: 'Adventure Seekers', slug: 'adventure-seekers', tours: 12, icon: '🏔️' },
  { name: 'Luxury Tours', slug: 'luxury-tours', tours: 7, icon: '✨' },
  { name: 'Gorilla and Chimp Trekking', slug: 'gorilla-chimp-trekking', tours: 5, icon: '🦍' },
  { name: 'Cross Border Safaris', slug: 'cross-border-safaris', tours: 9, icon: '🌍' },
  { name: 'Day Tours', slug: 'day-tours', tours: 8, icon: '🚙' },
];

interface NavbarProps {
  activeCategory?: string;
  activeDestination?: string;
}

export const Navbar = ({ activeCategory, activeDestination }: NavbarProps = {}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [isTravelIdeasOpen, setIsTravelIdeasOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/98 backdrop-blur-lg shadow-lg border-b border-border py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img
                src="/RCGP_Logo_Small-removebg-preview-1.webp"
                alt="Logo"
                className="h-12 md:h-14 w-auto"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <Link to="/" className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                isScrolled ? 'text-charcoal hover:text-primary font-semibold' : 'text-primary-foreground/90 hover:text-primary-foreground'
              }`}>Explore</Link>

              <div className="relative" onMouseEnter={() => setIsDestinationsOpen(true)} onMouseLeave={() => setIsDestinationsOpen(false)}>
                <Link to="/destinations" className={`flex items-center gap-1 font-heading text-sm uppercase tracking-widest transition-colors ${
                  isScrolled ? 'text-charcoal hover:text-primary font-semibold' : 'text-primary-foreground/90 hover:text-primary-foreground'
                }`}>
                  Destinations
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDestinationsOpen ? 'rotate-180' : ''}`} />
                </Link>

                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                  isDestinationsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="bg-background rounded-2xl shadow-lift p-4 min-w-[240px] border border-border">
                    <div className="space-y-1">
                      {destinations.map((dest, index) => (
                        <div key={dest.name}>
                          <Link
                            to={`/destinations/${dest.slug}`}
                            className={`block px-3 py-2 rounded-lg hover:bg-muted transition-colors group ${
                              activeDestination === dest.slug ? 'bg-primary/10' : ''
                            }`}
                          >
                            <span className={`font-heading text-sm font-medium transition-colors ${
                              activeDestination === dest.slug ? 'text-primary' : 'text-foreground group-hover:text-primary'
                            }`}>{dest.name}</span>
                          </Link>
                          {index < destinations.length - 1 && (
                            <div className="h-px bg-border/50 my-1" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Ideas Dropdown */}
              <div className="relative" onMouseEnter={() => setIsTravelIdeasOpen(true)} onMouseLeave={() => setIsTravelIdeasOpen(false)}>
                <Link to="/travel-ideas" className={`flex items-center gap-1 font-heading text-sm uppercase tracking-widest transition-colors ${
                  isScrolled ? 'text-charcoal hover:text-primary font-semibold' : 'text-primary-foreground/90 hover:text-primary-foreground'
                }`}>
                  Experiences
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isTravelIdeasOpen ? 'rotate-180' : ''}`} />
                </Link>

                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                  isTravelIdeasOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="bg-background rounded-2xl shadow-lift p-4 min-w-[260px] border border-border">
                    <div className="space-y-1 max-h-[350px] overflow-y-auto">
                      {travelIdeas.map((idea, index) => (
                        <div key={idea.name}>
                          <Link
                            to={`/travel-ideas/${idea.slug}`}
                            className={`block px-3 py-2 rounded-lg hover:bg-muted transition-colors group ${
                              activeCategory === idea.slug ? 'bg-primary/10' : ''
                            }`}
                          >
                            <span className={`font-heading text-sm font-medium transition-colors ${
                              activeCategory === idea.slug ? 'text-primary' : 'text-foreground group-hover:text-primary'
                            }`}>{idea.name}</span>
                          </Link>
                          {index < travelIdeas.length - 1 && (
                            <div className="h-px bg-border/50 my-1" />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-border">
                      <Link to="/travel-ideas" className="text-xs text-primary hover:underline font-medium">
                        View All →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/our-story" className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                isScrolled ? 'text-charcoal hover:text-primary font-semibold' : 'text-primary-foreground/90 hover:text-primary-foreground'
              }`}>About Us</Link>
              <Link to="/wild-tales" className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                isScrolled ? 'text-charcoal hover:text-primary font-semibold' : 'text-primary-foreground/90 hover:text-primary-foreground'
              }`}>Stories</Link>
              <Link to="/contact" className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                isScrolled ? 'text-charcoal hover:text-primary font-semibold' : 'text-primary-foreground/90 hover:text-primary-foreground'
              }`}>Plan Your Trip</Link>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                className="gap-2"
                onClick={() => setIsBookingModalOpen(true)}
              >
                <FileText className="w-4 h-4" />
                Request Free Quote
              </Button>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`lg:hidden p-2 transition-colors ${
              isScrolled ? 'text-charcoal' : 'text-primary-foreground'
            }`}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-charcoal/80 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-background shadow-lift transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <img src="/RCGP_Logo_Small-removebg-preview-1.webp" alt="Logo" className="h-10 w-auto" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-foreground"><X className="w-6 h-6" /></button>
            </div>
            <Button
              variant="primary"
              size="xl"
              className="w-full mb-6 gap-2"
              onClick={() => {
                setIsBookingModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
            >
              <FileText className="w-5 h-5" />
              Request Free Quote
            </Button>
            <nav className="space-y-1">
              <Link to="/" className="block py-3 px-4 font-heading text-sm uppercase tracking-wider text-foreground hover:bg-muted rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Explore</Link>
              <Link to="/travel-ideas" className="block py-3 px-4 font-heading text-sm uppercase tracking-wider text-foreground hover:bg-muted rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Experiences</Link>
              <Link to="/our-story" className="block py-3 px-4 font-heading text-sm uppercase tracking-wider text-foreground hover:bg-muted rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
              <Link to="/wild-tales" className="block py-3 px-4 font-heading text-sm uppercase tracking-wider text-foreground hover:bg-muted rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Stories</Link>
              <Link to="/contact" className="block py-3 px-4 font-heading text-sm uppercase tracking-wider text-foreground hover:bg-muted rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Plan Your Trip</Link>
            </nav>
          </div>
        </div>
      </div>

      <BookingFormModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};
