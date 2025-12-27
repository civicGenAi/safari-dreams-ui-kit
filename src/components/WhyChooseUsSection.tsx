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
          <div className="group relative bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-8 flex flex-col h-full">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <MapPin className="w-8 h-8 text-primary" />
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Well Crafted Itineraries
              </h3>

              <p className="text-muted-foreground mb-6 flex-grow">
                With our presence across 7 countries in East Africa and the Holy Land, we craft personalized journeys that showcase the best of each destination with expert local knowledge.
              </p>

              <Link to="/destinations">
                <Button variant="primary" className="w-full group-hover:shadow-lg transition-shadow">
                  Find Your Choice
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 2: Take a Break */}
          <div className="group relative bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-8 flex flex-col h-full">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Sparkles className="w-8 h-8 text-secondary" />
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Take a Break
              </h3>

              <p className="text-muted-foreground mb-6 flex-grow">
                Discover ultimate relaxation and rejuvenation through our curated experiences. From pristine beaches to luxury lodges, we create perfect escapes for your body and soul.
              </p>

              <Link to="/travel-ideas">
                <Button variant="secondary" className="w-full group-hover:shadow-lg transition-shadow">
                  Take a Break
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 3: Pilgrimage Tours */}
          <div className="group relative bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-8 flex flex-col h-full">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Church className="w-8 h-8 text-accent" />
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Pilgrimage Tours
              </h3>

              <p className="text-muted-foreground mb-6 flex-grow">
                Embark on spiritual journeys to sacred sites in Egypt, Jordan, and Israel. Experience the profound history and religious significance of the Holy Land with expert guidance.
              </p>

              <Link to="/travel-ideas/pilgrimages">
                <Button variant="gold" className="w-full group-hover:shadow-lg transition-shadow">
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
