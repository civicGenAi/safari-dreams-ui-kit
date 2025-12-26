import { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Destination {
  name: string;
  tours: number;
  flag: string;
}

const destinations: Destination[] = [
  { name: 'Tanzania', tours: 29, flag: '🇹🇿' },
  { name: 'Kenya', tours: 4, flag: '🇰🇪' },
  { name: 'Rwanda', tours: 6, flag: '🇷🇼' },
  { name: 'Uganda', tours: 4, flag: '🇺🇬' },
  { name: 'Israel', tours: 2, flag: '🇮🇱' },
  { name: 'Egypt', tours: 2, flag: '🇪🇬' },
  { name: 'Jordan', tours: 1, flag: '🇯🇴' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <span
                className={`font-display text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                  isScrolled ? 'text-primary' : 'text-primary-foreground'
                }`}
              >
                DeMi<span className="text-secondary">Tours</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <a
                href="/"
                className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                  isScrolled
                    ? 'text-foreground hover:text-primary'
                    : 'text-primary-foreground/90 hover:text-primary-foreground'
                }`}
              >
                Home
              </a>

              {/* Destinations Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setIsDestinationsOpen(true)}
                onMouseLeave={() => setIsDestinationsOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 font-heading text-sm uppercase tracking-widest transition-colors ${
                    isScrolled
                      ? 'text-foreground hover:text-primary'
                      : 'text-primary-foreground/90 hover:text-primary-foreground'
                  }`}
                >
                  Destinations
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isDestinationsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Mega Menu Dropdown */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                    isDestinationsOpen
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                  <div className="bg-background rounded-2xl shadow-lift p-6 min-w-[400px] border border-border">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                      <MapPin className="w-5 h-5 text-secondary" />
                      <span className="font-display text-lg font-semibold">Explore Destinations</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {destinations.map((dest) => (
                        <a
                          key={dest.name}
                          href={`#${dest.name.toLowerCase()}`}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group"
                        >
                          <span className="text-2xl">{dest.flag}</span>
                          <div>
                            <span className="font-heading font-medium text-foreground group-hover:text-primary transition-colors">
                              {dest.name}
                            </span>
                            <span className="block text-xs text-muted-foreground">
                              {dest.tours} Tours
                            </span>
                          </div>
                          <span className="ml-auto text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full font-medium">
                            {dest.tours}
                          </span>
                        </a>
                      ))}
                    </div>
                    <a
                      href="#destinations"
                      className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border text-primary font-heading text-sm uppercase tracking-wider hover:text-secondary transition-colors"
                    >
                      View All Destinations
                      <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="#travel-ideas"
                className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                  isScrolled
                    ? 'text-foreground hover:text-primary'
                    : 'text-primary-foreground/90 hover:text-primary-foreground'
                }`}
              >
                Travel Ideas
              </a>
              <a
                href="#about"
                className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                  isScrolled
                    ? 'text-foreground hover:text-primary'
                    : 'text-primary-foreground/90 hover:text-primary-foreground'
                }`}
              >
                Our Story
              </a>
              <a
                href="#blog"
                className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                  isScrolled
                    ? 'text-foreground hover:text-primary'
                    : 'text-primary-foreground/90 hover:text-primary-foreground'
                }`}
              >
                Blog
              </a>
              <a
                href="#contact"
                className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                  isScrolled
                    ? 'text-foreground hover:text-primary'
                    : 'text-primary-foreground/90 hover:text-primary-foreground'
                }`}
              >
                Contact
              </a>
            </div>

            {/* Right Side CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+255688535848"
                className={`flex items-center gap-2 font-heading text-sm transition-colors ${
                  isScrolled ? 'text-foreground' : 'text-primary-foreground'
                }`}
              >
                <Phone className="w-4 h-4 text-secondary" />
                <span>+255 688 535848</span>
              </a>
              <Button variant="gold" size="lg" className="gap-2">
                <FileText className="w-4 h-4" />
                Request Free Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isScrolled ? 'text-foreground' : 'text-primary-foreground'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-charcoal/80 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-background shadow-lift transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-xl font-bold text-primary">
                DeMi<span className="text-secondary">Tours</span>
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <Button variant="gold" size="xl" className="w-full mb-6 gap-2">
              <FileText className="w-5 h-5" />
              Request Free Quote
            </Button>

            <nav className="space-y-1">
              <a
                href="/"
                className="block py-3 px-4 font-heading text-sm uppercase tracking-wider text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Home
              </a>
              <div className="py-3 px-4">
                <span className="block font-heading text-sm uppercase tracking-wider text-foreground mb-3">
                  Destinations
                </span>
                <div className="grid grid-cols-2 gap-2 pl-2">
                  {destinations.map((dest) => (
                    <a
                      key={dest.name}
                      href={`#${dest.name.toLowerCase()}`}
                      className="flex items-center gap-2 py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{dest.flag}</span>
                      <span>{dest.name}</span>
                    </a>
                  ))}
                </div>
              </div>
              <a
                href="#travel-ideas"
                className="block py-3 px-4 font-heading text-sm uppercase tracking-wider text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Travel Ideas
              </a>
              <a
                href="#about"
                className="block py-3 px-4 font-heading text-sm uppercase tracking-wider text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Our Story
              </a>
              <a
                href="#blog"
                className="block py-3 px-4 font-heading text-sm uppercase tracking-wider text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Blog
              </a>
              <a
                href="#contact"
                className="block py-3 px-4 font-heading text-sm uppercase tracking-wider text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Contact
              </a>
            </nav>

            <div className="mt-8 pt-6 border-t border-border">
              <a
                href="tel:+255688535848"
                className="flex items-center gap-3 py-3 text-foreground"
              >
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground">Call us now</span>
                  <span className="font-heading font-medium">+255 688 535848</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
