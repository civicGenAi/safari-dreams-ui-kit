import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import worldMap from '@/assets/world-map.webp';

const destinations = [
  { name: 'Kenya', slug: 'kenya', tours: 4 },
  { name: 'Rwanda', slug: 'rwanda', tours: 6 },
  { name: 'Tanzania', slug: 'tanzania', tours: 29 },
  { name: 'Uganda', slug: 'uganda', tours: 8 },
  { name: 'Israel', slug: 'israel', tours: 5 },
  { name: 'Egypt', slug: 'egypt', tours: 7 },
  { name: 'Jordan', slug: 'jordan', tours: 6 },
];

export const DestinationsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-muted/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: World Map */}
          <div className="relative">
            <img
              src={worldMap}
              alt="World Map"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider">
              Escape the ordinary with demi tours and travel
            </p>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Our Destinations
            </h2>

            <blockquote className="text-lg italic text-muted-foreground border-l-4 border-primary pl-6 py-2">
              "A destination is not a place, it is an experience just for you and your relaxation: time to recharge, take care of yourself, disconnect and reconnect with yourself."
              <footer className="text-sm font-semibold mt-2">- Anthony Bourdain</footer>
            </blockquote>

            {/* Destinations List */}
            <ul className="space-y-3">
              {destinations.map((dest) => (
                <li key={dest.slug} className="flex items-center justify-between group">
                  <Link
                    to={`/destinations/${dest.slug}`}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span className="font-heading font-medium">{dest.name}</span>
                  </Link>
                  <span className="text-sm text-muted-foreground">({dest.tours})</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="pt-6">
              <Link to="/destinations">
                <Button variant="primary" size="lg">
                  Browse Our Destination
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
