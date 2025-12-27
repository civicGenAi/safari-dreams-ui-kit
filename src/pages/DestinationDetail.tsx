import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { mockDestinations, mockTours } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Calendar,
  DollarSign,
  Thermometer,
  Globe,
  Clock,
  Users,
  Star,
  ArrowRight,
  ChevronRight,
  Home,
} from 'lucide-react';

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const destination = mockDestinations.find((d) => d.slug === slug);

  if (!destination) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Destination Not Found</h1>
          <Link to="/tours" className="text-primary hover:underline">
            Browse all destinations
          </Link>
        </div>
      </div>
    );
  }

  // Get tours for this destination
  const destinationTours = mockTours.filter((t) => t.destination === slug);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 lg:px-8 pt-24 pb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/tours" className="hover:text-primary transition-colors">
            Destinations
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{destination.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[500px] mb-12">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 lg:px-8 pb-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-6xl">{destination.flag}</span>
                <Badge variant="secondary" className="text-base">
                  {destination.tours} Tours Available
                </Badge>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
                {destination.name}
              </h1>
              <p className="text-xl text-white/90">{destination.longDescription}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 pb-16">
        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-5 rounded-xl bg-card border border-border">
            <Calendar className="w-6 h-6 text-primary mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Best Time</div>
            <div className="font-heading font-semibold text-sm">{destination.bestTime}</div>
          </div>
          <div className="p-5 rounded-xl bg-card border border-border">
            <Thermometer className="w-6 h-6 text-primary mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Climate</div>
            <div className="font-heading font-semibold text-sm">{destination.climate}</div>
          </div>
          <div className="p-5 rounded-xl bg-card border border-border">
            <DollarSign className="w-6 h-6 text-primary mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Currency</div>
            <div className="font-heading font-semibold text-sm">{destination.currency}</div>
          </div>
          <div className="p-5 rounded-xl bg-card border border-border">
            <Globe className="w-6 h-6 text-primary mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Language</div>
            <div className="font-heading font-semibold text-sm">{destination.language}</div>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-12">
          <h2 className="text-3xl font-display font-bold mb-6">Why Visit {destination.name}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {destination.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-foreground">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Attractions */}
        <div className="mb-12">
          <h2 className="text-3xl font-display font-bold mb-6">Top Attractions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {destination.attractions.map((attraction, index) => (
              <div
                key={index}
                className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lift transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg mb-2">{attraction.name}</h3>
                  <p className="text-sm text-muted-foreground">{attraction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Tours */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-display font-bold">
              Tours in {destination.name}
            </h2>
            <Badge variant="secondary">{destinationTours.length} Tours</Badge>
          </div>

          {destinationTours.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-2xl">
              <p className="text-muted-foreground">No tours available for this destination yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinationTours.map((tour) => (
                <article
                  key={tour.id}
                  className="group bg-card rounded-2xl overflow-hidden shadow-md card-hover border border-border"
                >
                  <Link to={`/tours/${tour.slug}`} className="block relative h-52">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 glass text-primary-foreground px-3 py-1.5 rounded-lg">
                      <span className="font-display text-lg font-bold">${tour.price}</span>
                    </div>
                    {tour.popular && (
                      <div className="absolute top-3 left-3 bg-sunset text-white px-2 py-1 rounded-full text-xs font-heading">
                        Popular
                      </div>
                    )}
                  </Link>

                  <div className="p-5">
                    <Badge className="mb-2">{tour.category}</Badge>
                    <Link to={`/tours/${tour.slug}`}>
                      <h3 className="font-display text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {tour.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{tour.durationDays}D</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{tour.groupSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-secondary text-secondary" />
                        <span className="font-heading font-semibold">{tour.rating}</span>
                        <span className="text-muted-foreground text-sm">({tour.reviews})</span>
                      </div>
                      <Link to={`/tours/${tour.slug}`}>
                        <Button variant="ghost" size="sm" className="gap-1 group-hover:gap-2 transition-all">
                          View
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default DestinationDetail;
