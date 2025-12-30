import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import worldMap from '@/assets/world-map.webp';

const destinations = [
  { name: 'Kenya', slug: 'kenya', tours: 4, coordinates: { x: '55%', y: '48%' } },
  { name: 'Rwanda', slug: 'rwanda', tours: 6, coordinates: { x: '52%', y: '51%' } },
  { name: 'Tanzania', slug: 'tanzania', tours: 29, coordinates: { x: '54%', y: '53%' } },
  { name: 'Uganda', slug: 'uganda', tours: 8, coordinates: { x: '53%', y: '48%' } },
  { name: 'Israel', slug: 'israel', tours: 5, coordinates: { x: '54%', y: '40%' } },
  { name: 'Egypt', slug: 'egypt', tours: 7, coordinates: { x: '52%', y: '38%' } },
  { name: 'Jordan', slug: 'jordan', tours: 6, coordinates: { x: '55%', y: '40%' } },
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
              className="w-full h-auto"
            />

            {/* Destination Markers */}
            {destinations.map((dest) => (
              <div
                key={dest.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: dest.coordinates.x, top: dest.coordinates.y }}
              >
                {/* Pulse ring */}
                <span className="absolute inset-0 w-6 h-6 -m-1 rounded-full bg-primary/30 animate-pulse" />

                {/* Marker dot */}
                <span className="relative flex items-center justify-center w-4 h-4 rounded-full border-2 border-background shadow-lg bg-primary group-hover:scale-150 transition-transform duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-background" />
                </span>

                {/* Tooltip */}
                <span className="absolute left-1/2 -translate-x-1/2 -top-10 bg-secondary text-secondary-foreground text-xs font-heading font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {dest.name}
                  <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-secondary" />
                </span>
              </div>
            ))}
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