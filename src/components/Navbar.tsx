import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, MapPin, FileText } from 'lucide-react';
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

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className={`font-display text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-secondary' : 'text-primary-foreground'
              }`}>
                DeMi<span className="text-primary">Tours</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <Link to="/" className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                isScrolled ? 'text-foreground hover:text-primary' : 'text-primary-foreground/90 hover:text-primary-foreground'
              }`}>Home</Link>

              <div className="relative" onMouseEnter={() => setIsDestinationsOpen(true)} onMouseLeave={() => setIsDestinationsOpen(false)}>
                <button className={`flex items-center gap-1 font-heading text-sm uppercase tracking-widest transition-colors ${
                  isScrolled ? 'text-foreground hover:text-primary' : 'text-primary-foreground/90 hover:text-primary-foreground'
                }`}>
                  Destinations
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDestinationsOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                  isDestinationsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="bg-background rounded-2xl shadow-lift p-6 min-w-[400px] border border-border">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="font-display text-lg font-semibold">Explore Destinations</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {destinations.map((dest) => (
                        <Link key={dest.name} to={`/destinations/${dest.slug}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group">
                          <span className="text-2xl">{dest.flag}</span>
                          <div>
                            <span className="font-heading font-medium text-foreground group-hover:text-primary transition-colors">{dest.name}</span>
                            <span className="block text-xs text-muted-foreground">{dest.tours} Tours</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/travel-ideas" className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                isScrolled ? 'text-foreground hover:text-primary' : 'text-primary-foreground/90 hover:text-primary-foreground'
              }`}>Travel Ideas</Link>
              <Link to="/our-story" className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                isScrolled ? 'text-foreground hover:text-primary' : 'text-primary-foreground/90 hover:text-primary-foreground'
              }`}>Our Story</Link>
              <Link to="/wild-tales" className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                isScrolled ? 'text-foreground hover:text-primary' : 'text-primary-foreground/90 hover:text-primary-foreground'
              }`}>Wild Tales</Link>
              <Link to="/contact" className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                isScrolled ? 'text-foreground hover:text-primary' : 'text-primary-foreground/90 hover:text-primary-foreground'
              }`}>Get in Touch</Link>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <Button variant="primary" size="lg" className="gap-2">
                <FileText className="w-4 h-4" />
                Request Free Quote
              </Button>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`lg:hidden p-2 transition-colors ${
              isScrolled ? 'text-foreground' : 'text-primary-foreground'
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
              <span className="font-display text-xl font-bold text-secondary">DeMi<span className="text-primary">Tours</span></span>
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
