import { Link } from 'react-router-dom';
import { MapPin, Sparkles, Church } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const WhyChooseUsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-muted/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            At Demi Tours and Travel we love what we do
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-display">
            Let us be your passport to the savannah world
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Well Crafted Itineraries */}
          <div className="group relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-96">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800"
                alt="Safari itinerary"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <MapPin className="w-10 h-10 text-white" />
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-4">
                Well Crafted Itineraries
              </h3>

              <p className="text-white/90 mb-6 line-clamp-2">
                With our presence across 7 countries in East Africa and the Holy Land, we craft personalized journeys.
              </p>

              <Link to="/destinations" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="primary" className="shadow-lg">
                  Find Your Choice
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 2: Take a Break */}
          <div className="group relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-96">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"
                alt="Relaxation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Sparkles className="w-10 h-10 text-white" />
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-4">
                Take a Break
              </h3>

              <p className="text-white/90 mb-6 line-clamp-2">
                Discover ultimate relaxation and rejuvenation. From pristine beaches to luxury lodges.
              </p>

              <Link to="/travel-ideas" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="secondary" className="shadow-lg">
                  Take a Break
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 3: Pilgrimage Tours */}
          <div className="group relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-96">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800"
                alt="Pilgrimage"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Church className="w-10 h-10 text-white" />
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-4">
                Pilgrimage Tours
              </h3>

              <p className="text-white/90 mb-6 line-clamp-2">
                Embark on spiritual journeys to sacred sites in Egypt, Jordan, and Israel.
              </p>

              <Link to="/travel-ideas/pilgrimages" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="gold" className="shadow-lg">
                  Take the Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
