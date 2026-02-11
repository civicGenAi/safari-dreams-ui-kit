import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import cheetahImage from '@/assets/home_fastbooking_cheetah.webp';
import beachLadyImage from '@/assets/home_fastbooking_beach_lady.webp';
import dayTourImage from '@/assets/ideas_daytour_leopardkill.webp';

export const WhyChooseUsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            At Migration Safaridirect we love what we do
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground font-display">
            Let us be your passport to the savannah world
          </p>
        </div>

        {/* Creative Asymmetric Layout */}
        <div className="grid md:grid-cols-12 gap-6 lg:gap-8 auto-rows-[280px]">
          {/* Large Card - Left Top (Well Crafted Itineraries) */}
          <div className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 md:col-span-7 md:row-span-2 border-2 border-primary/10">
            <div className="absolute inset-0">
              <img
                src={cheetahImage}
                alt="Safari itinerary"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: '50% 25%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-transparent" />
            </div>

            <div className="relative h-full flex flex-col justify-end p-8 lg:p-10">
              <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
                  Well Crafted Itineraries
                </h3>

                <p className="text-white/90 text-base lg:text-lg mb-6 max-w-md">
                  With our presence across 4 countries in East Africa, we craft personalized journeys that create unforgettable memories.
                </p>

                <Link to="/destinations" className="inline-block">
                  <Button variant="primary" className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                    Find Your Choice
                  </Button>
                </Link>
              </div>
            </div>

            {/* Decorative badge */}
            <div className="absolute top-6 right-6 bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-heading font-semibold">
              POPULAR
            </div>
          </div>

          {/* Medium Card - Right Top (Take a Break) */}
          <div className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 md:col-span-5 md:row-span-1 border-2 border-secondary/10">
            <div className="absolute inset-0">
              <img
                src={beachLadyImage}
                alt="Relaxation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: '50% 30%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-transparent" />
            </div>

            <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">
                Take a Break
              </h3>

              <p className="text-white/90 text-sm lg:text-base mb-4 line-clamp-2">
                Discover ultimate relaxation and rejuvenation. From pristine beaches to luxury lodges.
              </p>

              <Link to="/travel-ideas" className="inline-block">
                <Button variant="secondary" size="sm" className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                  Explore
                </Button>
              </Link>
            </div>
          </div>

          {/* Medium Card - Right Bottom (Day Tours) */}
          <div className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 md:col-span-5 md:row-span-1 border-2 border-[#D4AF37]/10">
            <div className="absolute inset-0">
              <img
                src={dayTourImage}
                alt="Day Tours"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: '50% 35%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-transparent" />
            </div>

            <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">
                Day Tours
              </h3>

              <p className="text-white/90 text-sm lg:text-base mb-4 line-clamp-2">
                Perfect short excursions and city tours for those with limited time but unlimited curiosity.
              </p>

              <Link to="/travel-ideas/day-tours" className="inline-block">
                <Button variant="gold" size="sm" className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                  Discover Tours
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
