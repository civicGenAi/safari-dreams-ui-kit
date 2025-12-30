import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const packages = [
  {
    title: 'Suns Out Bums Out',
    discount: '15%',
    description: 'off on all advance bookings',
    image: '/src/assets/home_fastbooking_beach_lady.webp',
    cta: 'Book Now',
    color: 'primary',
  },
  {
    title: 'Repeat Clients',
    discount: '18%',
    description: 'off on all advance bookings',
    image: '/src/assets/idea_crossborder_elephants.webp',
    cta: 'Book Now',
    color: 'secondary',
  },
  {
    title: 'Exclusive Deals',
    discount: '25%',
    description: 'Save up to 25%? Book 3 months upfront',
    image: '/src/assets/home_fastbooking_cheetah.webp',
    cta: 'Book Now',
    color: 'gold',
  },
];

export const SeasonalPackagesSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <span className="absolute -top-8 right-0 text-primary/60 font-heading text-xs uppercase tracking-widest animate-pulse">
              GRAB THIS
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Best Value Experiences
            </h2>
          </div>
        </div>

        {/* Creative Asymmetric Package Grid */}
        <div className="grid md:grid-cols-12 gap-6 lg:gap-8 auto-rows-[320px]">
          {/* Large Featured Card - Left (Suns Out Bums Out) */}
          <Link
            to="/contact"
            className="group relative md:col-span-7 md:row-span-2 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4"
          >
            <div className="absolute inset-0">
              <img
                src={packages[0].image}
                alt={packages[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent" />
            </div>

            <div className="relative h-full flex flex-col justify-between p-8 lg:p-12">
              {/* Discount Badge - Top */}
              <div className="self-start">
                <div className="bg-primary text-white rounded-full px-8 py-4 shadow-xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <div className="text-center">
                    <div className="text-5xl lg:text-6xl font-display font-bold">{packages[0].discount}</div>
                    <div className="text-sm font-heading uppercase tracking-wider mt-1">OFF</div>
                  </div>
                </div>
              </div>

              {/* Content - Bottom */}
              <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                <h3 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                  {packages[0].title}
                </h3>
                <p className="text-white/90 text-lg lg:text-xl mb-6 max-w-md">
                  {packages[0].description}
                </p>
                <div className="inline-flex items-center gap-3 bg-white text-foreground px-6 py-4 rounded-full font-heading font-semibold uppercase tracking-wider shadow-lg group-hover:gap-5 transition-all">
                  {packages[0].cta}
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </Link>

          {/* Medium Card - Top Right (Repeat Clients) */}
          <Link
            to="/contact"
            className="group relative md:col-span-5 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4"
          >
            <div className="absolute inset-0">
              <img
                src={packages[1].image}
                alt={packages[1].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent" />
            </div>

            <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
              {/* Discount Badge */}
              <div className="absolute top-6 right-6">
                <div className="bg-secondary text-white rounded-full w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-display font-bold">{packages[1].discount}</div>
                    <div className="text-xs font-heading uppercase">OFF</div>
                  </div>
                </div>
              </div>

              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">
                {packages[1].title}
              </h3>
              <p className="text-white/90 text-sm lg:text-base mb-4">
                {packages[1].description}
              </p>
              <div className="inline-flex items-center gap-2 text-white font-heading font-semibold uppercase tracking-wider group-hover:gap-4 transition-all">
                {packages[1].cta}
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>

          {/* Medium Card - Bottom Right (Exclusive Deals) */}
          <Link
            to="/contact"
            className="group relative md:col-span-5 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-2 border-[#D4AF37]/20"
          >
            <div className="absolute inset-0">
              <img
                src={packages[2].image}
                alt={packages[2].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent" />
            </div>

            <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
              {/* Discount Badge */}
              <div className="absolute top-6 right-6">
                <div className="bg-gradient-to-br from-[#D4AF37] to-[#F4E4A6] text-charcoal rounded-full w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all">
                  <div className="text-center">
                    <div className="text-3xl lg:text-4xl font-display font-bold">{packages[2].discount}</div>
                    <div className="text-xs font-heading uppercase font-bold">OFF</div>
                  </div>
                </div>
              </div>

              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">
                {packages[2].title}
              </h3>
              <p className="text-white/90 text-sm lg:text-base mb-4 line-clamp-2">
                {packages[2].description}
              </p>
              <div className="inline-flex items-center gap-2 bg-[#D4AF37] text-charcoal px-5 py-3 rounded-full font-heading font-semibold uppercase tracking-wider text-sm shadow-lg group-hover:gap-4 transition-all">
                {packages[2].cta}
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
