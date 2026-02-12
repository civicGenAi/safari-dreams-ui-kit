import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, FileText, MapPin, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookingFormModal } from '@/components/BookingFormModal';

// Import map and experience images
import baseMap from '@/assets/nav/destination.png';
import migrationImg from '@/assets/nav/migration.avif';
import romanticImg from '@/assets/nav/romantic.jpg';
import beachesImg from '@/assets/nav/beaches.jpg';
import adventuresImg from '@/assets/nav/adventures.jpg';
import luxuryImg from '@/assets/nav/luxury.jpg';
import gorillaImg from '@/assets/nav/gollial.jpg';
import crossborderImg from '@/assets/nav/crossboarder.avif';
import daytoursImg from '@/assets/nav/daytours.jpg';
import logo from '@/assets/logo.png'; 

interface Destination {
  name: string;
  slug: string;
  tours: number;
  flag: string;
  // Pin position on Africa map (percentage from top-left)
  pinTop: string;
  pinLeft: string;
}

const destinations: Destination[] = [
  { name: 'Tanzania', slug: 'tanzania', tours: 29, flag: '🇹🇿', pinTop: '52%', pinLeft: '58%' },
  { name: 'Kenya', slug: 'kenya', tours: 4, flag: '🇰🇪', pinTop: '46%', pinLeft: '60%' },
  { name: 'Rwanda', slug: 'rwanda', tours: 6, flag: '🇷🇼', pinTop: '48%', pinLeft: '54%' },
  { name: 'Uganda', slug: 'uganda', tours: 4, flag: '🇺🇬', pinTop: '45%', pinLeft: '55%' },
];

interface TravelIdea {
  name: string;
  slug: string;
  tours: number;
  image: string;
}

const travelIdeas: TravelIdea[] = [
  { name: 'Migration Safaris', slug: 'migration-safaris', tours: 6, image: migrationImg },
  { name: 'Romantic Holidays', slug: 'romantic-holidays', tours: 8, image: romanticImg },
  { name: 'Safari Beach Holidays', slug: 'safari-beach-holidays', tours: 10, image: beachesImg },
  { name: 'Adventure Seekers', slug: 'adventure-seekers', tours: 12, image: adventuresImg },
  { name: 'Luxury Tours', slug: 'luxury-tours', tours: 7, image: luxuryImg },
  { name: 'Gorilla and Chimp Trekking', slug: 'gorilla-chimp-trekking', tours: 5, image: gorillaImg },
  { name: 'Cross Border Safaris', slug: 'cross-border-safaris', tours: 9, image: crossborderImg },
  { name: 'Day Tours', slug: 'day-tours', tours: 8, image: daytoursImg },
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
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null);
  const [hoveredExperience, setHoveredExperience] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get current experience image
  const currentExperienceImage = hoveredExperience 
    ? travelIdeas.find(idea => idea.slug === hoveredExperience)?.image || migrationImg
    : migrationImg;

  const currentExperienceName = hoveredExperience
    ? travelIdeas.find(idea => idea.slug === hoveredExperience)?.name || ''
    : 'Migration Safaris';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/98 backdrop-blur-lg shadow-lg border-b border-border py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Logo"
                className="h-12 md:h-14 w-auto"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <Link to="/" className={`font-heading text-sm uppercase tracking-widest transition-colors link-underline ${
                isScrolled ? 'text-charcoal hover:text-primary font-semibold' : 'text-primary-foreground/90 hover:text-primary-foreground'
              }`}>Home</Link>

              {/* Destinations Mega Dropdown */}
              <div 
                className="relative" 
                onMouseEnter={() => setIsDestinationsOpen(true)} 
                onMouseLeave={() => {
                  setIsDestinationsOpen(false);
                  setHoveredDestination(null);
                }}
              >
                <Link to="/destinations" className={`flex items-center gap-1 font-heading text-sm uppercase tracking-widest transition-colors ${
                  isScrolled ? 'text-charcoal hover:text-primary font-semibold' : 'text-primary-foreground/90 hover:text-primary-foreground'
                }`}>
                  Destinations
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDestinationsOpen ? 'rotate-180' : ''}`} />
                </Link>

                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ease-out ${
                  isDestinationsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="bg-background rounded-2xl shadow-2xl border border-border/50 overflow-hidden" style={{ width: '600px' }}>
                    <div className="flex">
                      {/* Left side - Destination List */}
                      <div className="w-1/2 p-5 bg-muted/30">
                        <h3 className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Choose Your Destination
                        </h3>
                        <div className="space-y-1">
                          {destinations.map((dest) => (
                            <Link
                              key={dest.name}
                              to={`/destinations/${dest.slug}`}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                hoveredDestination === dest.slug 
                                  ? 'bg-primary/10 shadow-sm' 
                                  : 'hover:bg-background'
                              } ${activeDestination === dest.slug ? 'bg-primary/10' : ''}`}
                              onMouseEnter={() => setHoveredDestination(dest.slug)}
                            >
                              <span className="text-2xl">{dest.flag}</span>
                              <div className="flex-1">
                                <span className={`font-heading text-sm font-semibold block transition-colors ${
                                  hoveredDestination === dest.slug ? 'text-primary' : 'text-foreground group-hover:text-primary'
                                }`}>
                                  {dest.name}
                                </span>
                                <span className="text-xs text-muted-foreground">{dest.tours}+ Tours</span>
                              </div>
                              <ChevronDown className={`w-4 h-4 -rotate-90 transition-all duration-200 ${
                                hoveredDestination === dest.slug ? 'opacity-100 translate-x-0 text-primary' : 'opacity-0 -translate-x-2'
                              }`} />
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <Link 
                            to="/destinations" 
                            className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                          >
                            Explore All Destinations →
                          </Link>
                        </div>
                      </div>

                      {/* Right side - Map Preview */}
                      <div className="w-1/2 relative bg-gradient-to-br from-amber-50/50 to-orange-50/50 p-4">
                        <div className="relative w-full h-full min-h-[280px] flex items-center justify-center">
                          {/* Base Map */}
                          <div className="relative">
                            <img 
                              src={baseMap} 
                              alt="East Africa Map" 
                              className={`w-full max-w-[220px] h-auto transition-all duration-300 ${
                                hoveredDestination ? 'opacity-40' : 'opacity-100'
                              }`}
                            />
                            
                            {/* Highlighted Country Overlay Effect */}
                            {hoveredDestination && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <img 
                                  src={baseMap} 
                                  alt={`${hoveredDestination} highlighted`}
                                  className="w-full max-w-[220px] h-auto animate-fade-in"
                                  style={{
                                    filter: 'drop-shadow(0 0 20px hsl(var(--primary) / 0.4)) brightness(1.1)',
                                    clipPath: hoveredDestination === 'tanzania' 
                                      ? 'polygon(20% 35%, 85% 35%, 85% 95%, 20% 95%)'
                                      : hoveredDestination === 'kenya'
                                      ? 'polygon(35% 15%, 75% 15%, 75% 45%, 35% 45%)'
                                      : hoveredDestination === 'uganda'
                                      ? 'polygon(15% 10%, 45% 10%, 45% 40%, 15% 40%)'
                                      : 'polygon(10% 30%, 35% 30%, 35% 55%, 10% 55%)'
                                  }}
                                />
                              </div>
                            )}

                            {/* Destination Pin Markers - positioned for Africa map */}
                            {destinations.map((dest) => (
                              <div 
                                key={dest.slug}
                                className={`absolute transition-all duration-300 ${
                                  hoveredDestination === dest.slug ? 'scale-150 z-10' : 'scale-100'
                                }`}
                                style={{ top: dest.pinTop, left: dest.pinLeft }}
                              >
                                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                  hoveredDestination === dest.slug 
                                    ? 'bg-primary shadow-lg shadow-primary/50' 
                                    : 'bg-amber-600/70'
                                }`} />
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Hovered destination name */}
                        {hoveredDestination && (
                          <div className="absolute bottom-4 left-4 right-4 text-center animate-fade-in">
                            <span className="inline-block px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full text-sm font-heading font-semibold text-primary shadow-sm">
                              {destinations.find(d => d.slug === hoveredDestination)?.flag}{' '}
                              {destinations.find(d => d.slug === hoveredDestination)?.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experiences Mega Dropdown */}
              <div 
                className="relative" 
                onMouseEnter={() => setIsTravelIdeasOpen(true)} 
                onMouseLeave={() => {
                  setIsTravelIdeasOpen(false);
                  setHoveredExperience(null);
                }}
              >
                <Link to="/travel-ideas" className={`flex items-center gap-1 font-heading text-sm uppercase tracking-widest transition-colors ${
                  isScrolled ? 'text-charcoal hover:text-primary font-semibold' : 'text-primary-foreground/90 hover:text-primary-foreground'
                }`}>
                  Experiences
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isTravelIdeasOpen ? 'rotate-180' : ''}`} />
                </Link>

                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ease-out ${
                  isTravelIdeasOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}>
                  <div className="bg-background rounded-2xl shadow-2xl border border-border/50 overflow-hidden" style={{ width: '700px' }}>
                    <div className="flex">
                      {/* Left side - Experience List */}
                      <div className="w-2/5 p-5 bg-muted/30">
                        <h3 className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                          <Compass className="w-4 h-4" />
                          Safari Experiences
                        </h3>
                        <div className="space-y-0.5">
                          {travelIdeas.map((idea) => (
                            <Link
                              key={idea.name}
                              to={`/travel-ideas/${idea.slug}`}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                                hoveredExperience === idea.slug 
                                  ? 'bg-primary/10 shadow-sm' 
                                  : 'hover:bg-background'
                              } ${activeCategory === idea.slug ? 'bg-primary/10' : ''}`}
                              onMouseEnter={() => setHoveredExperience(idea.slug)}
                            >
                              <span className={`font-heading text-sm font-medium transition-colors flex-1 ${
                                hoveredExperience === idea.slug ? 'text-primary' : 'text-foreground group-hover:text-primary'
                              }`}>
                                {idea.name}
                              </span>
                              <ChevronDown className={`w-4 h-4 -rotate-90 transition-all duration-200 ${
                                hoveredExperience === idea.slug ? 'opacity-100 translate-x-0 text-primary' : 'opacity-0 -translate-x-2'
                              }`} />
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <Link 
                            to="/travel-ideas" 
                            className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                          >
                            View All Experiences →
                          </Link>
                        </div>
                      </div>

                      {/* Right side - Image Preview */}
                      <div className="w-3/5 relative overflow-hidden">
                        <div className="relative w-full h-full min-h-[380px]">
                          {/* Image with crossfade */}
                          <div 
                            className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out"
                            style={{ 
                              backgroundImage: `url(${currentExperienceImage})`,
                              transform: hoveredExperience ? 'scale(1.03)' : 'scale(1)'
                            }}
                          />
                          
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          
                          {/* Experience title overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="animate-fade-in">
                              <span className="inline-block px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary-foreground mb-2">
                                Featured Experience
                              </span>
                              <h4 className="font-heading text-2xl font-bold text-white">
                                {currentExperienceName}
                              </h4>
                              <p className="text-white/80 text-sm mt-1">
                                Discover unforgettable moments
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
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
              }`}>Contact Us</Link>
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
