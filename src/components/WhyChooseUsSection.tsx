import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import cheetahImage from '@/assets/home_fastbooking_cheetah.webp';
import beachLadyImage from '@/assets/home_fastbooking_beach_lady.webp';
import baptismSiteImage from '@/assets/tour_pilgrimage_jordan_baptism_site.jpg';

export const WhyChooseUsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-muted/50 to-background relative overflow-hidden">
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
                src={cheetahImage}
                alt="Safari itinerary"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/40 to-transparent" />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
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
                src={beachLadyImage}
                alt="Relaxation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/40 to-transparent" />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
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
                src={baptismSiteImage}
                alt="Pilgrimage"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/40 to-transparent" />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
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
