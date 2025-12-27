import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  { name: 'Israel', slug: 'israel', tours: 2, flag: '🇮🇱' },
  { name: 'Egypt', slug: 'egypt', tours: 2, flag: '🇪🇬' },
  { name: 'Jordan', slug: 'jordan', tours: 1, flag: '🇯🇴' },
];

interface TravelIdea {
  name: string;
  slug: string;
  tours: number;
  icon: string;
}

const travelIdeas: TravelIdea[] = [
  { name: 'Migration Safari', slug: 'migration-safari', tours: 6, icon: '🦓' },
  { name: 'Romantic Holidays', slug: 'romantic-holidays', tours: 8, icon: '💑' },
  { name: 'Safari Beach Holidays', slug: 'safari-beach-holidays', tours: 6, icon: '🏖️' },
  { name: 'Adventure Seekers', slug: 'adventure-seekers', tours: 6, icon: '🏔️' },
  { name: 'Luxury Tours', slug: 'luxury-tours', tours: 2, icon: '✨' },
  { name: 'Gorilla & Chimp Trekking', slug: 'gorilla-chimp-trekking', tours: 10, icon: '🦍' },
  { name: 'Cross Border Trekking', slug: 'cross-border-trekking', tours: 3, icon: '🥾' },
  { name: 'Cross Border Safari', slug: 'cross-border-safari', tours: 4, icon: '🌍' },
  { name: 'Pilgrimages', slug: 'pilgrimages', tours: 2, icon: '⛪' },
  { name: 'Day Tours', slug: 'day-tours', tours: 5, icon: '🚙' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [isTravelIdeasOpen, setIsTravelIdeasOpen] = useState(false);

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
                src="/src/assets/RCGP_Logo_Small-removebg-preview-1.webp"
                alt="Logo"
                className="h-12 md:h-14 w-auto"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <Link to="/" className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                isScrolled ? 'text-charcoal hover:text-primary font-semibold' : 'text-primary-foreground/90 hover:text-primary-foreground'
              }`}>Home</Link>

              <div className="relative" onMouseEnter={() => setIsDestinationsOpen(true)} onMouseLeave={() => setIsDestinationsOpen(false)}>
                <button className={`flex items-center gap-1 font-heading text-sm uppercase tracking-widest transition-colors ${
                  isScrolled ? 'text-charcoal hover:text-primary font-semibold' : 'text-primary-foreground/90 hover:text-primary-foreground'
                }`}>
                  Destinations
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDestinationsOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                  isDestinationsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="bg-background rounded-2xl shadow-lift p-4 min-w-[240px] border border-border">
                    <div className="mb-3 pb-3 border-b border-border">
                      <span className="font-display text-base font-semibold">Destinations</span>
                    </div>
                    <div className="space-y-1">
                      {destinations.map((dest) => (
                        <Link key={dest.name} to={`/destinations/${dest.slug}`} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors group">
                          <span className="font-heading text-sm font-medium text-foreground group-hover:text-primary transition-colors">{dest.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">{dest.tours}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Ideas Dropdown */}
              <div className="relative" onMouseEnter={() => setIsTravelIdeasOpen(true)} onMouseLeave={() => setIsTravelIdeasOpen(false)}>
                <button className={`flex items-center gap-1 font-heading text-sm uppercase tracking-widest transition-colors ${
                  isScrolled ? 'text-charcoal hover:text-primary font-semibold' : 'text-primary-foreground/90 hover:text-primary-foreground'
                }`}>
                  Travel Ideas
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isTravelIdeasOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                  isTravelIdeasOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="bg-background rounded-2xl shadow-lift p-4 min-w-[260px] border border-border">
                    <div className="mb-3 pb-3 border-b border-border">
                      <span className="font-display text-base font-semibold">Travel Ideas</span>
                    </div>
                    <div className="space-y-1 max-h-[350px] overflow-y-auto">
                      {travelIdeas.map((idea) => (
                        <Link key={idea.name} to={`/travel-ideas/${idea.slug}`} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors group">
                          <span className="font-heading text-sm font-medium text-foreground group-hover:text-primary transition-colors flex-1">{idea.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">{idea.tours}+</span>
                        </Link>
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
              }`}>Our Story</Link>
              <Link to="/wild-tales" className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                isScrolled ? 'text-charcoal hover:text-primary font-semibold' : 'text-primary-foreground/90 hover:text-primary-foreground'
              }`}>Wild Tales</Link>
              <Link to="/contact" className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                isScrolled ? 'text-charcoal hover:text-primary font-semibold' : 'text-primary-foreground/90 hover:text-primary-foreground'
              }`}>Get in Touch</Link>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <Button variant="primary" size="lg" className="gap-2">
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
              <img src="/src/assets/RCGP_Logo_Small-removebg-preview-1.webp" alt="Logo" className="h-10 w-auto" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-foreground"><X className="w-6 h-6" /></button>
            </div>
            <Button variant="primary" size="xl" className="w-full mb-6 gap-2"><FileText className="w-5 h-5" />Request Free Quote</Button>
            <nav className="space-y-1">
              <Link to="/" className="block py-3 px-4 font-heading text-sm uppercase tracking-wider text-foreground hover:bg-muted rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/travel-ideas" className="block py-3 px-4 font-heading text-sm uppercase tracking-wider text-foreground hover:bg-muted rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Travel Ideas</Link>
              <Link to="/our-story" className="block py-3 px-4 font-heading text-sm uppercase tracking-wider text-foreground hover:bg-muted rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
              <Link to="/wild-tales" className="block py-3 px-4 font-heading text-sm uppercase tracking-wider text-foreground hover:bg-muted rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Wild Tales</Link>
              <Link to="/contact" className="block py-3 px-4 font-heading text-sm uppercase tracking-wider text-foreground hover:bg-muted rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Get in Touch</Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
