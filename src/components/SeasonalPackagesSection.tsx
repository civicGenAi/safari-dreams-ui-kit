import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const packages = [
  {
    title: 'Suns Out Bums Out',
    discount: '15% off on all advance bookings',
    image: '/src/assets/home_fastbooking_beach_lady.webp',
    cta: 'Book Now',
  },
  {
    title: 'Repeat Clients',
    discount: '18% off on all advance bookings',
    image: '/src/assets/idea_crossborder_elephants.webp',
    cta: 'Book Now',
  },
  {
    title: 'Exclusive Deals',
    discount: 'Want to save up to 25%? Book 3 months upfront.',
    image: '/src/assets/home_fastbooking_cheetah.webp',
    cta: 'Book Now',
  },
];

export const SeasonalPackagesSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-[#4A5D6F] to-[#5B7A8F] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="seasonal-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#seasonal-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header with Hot Air Balloon */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <svg className="w-20 h-20" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Hot air balloon */}
              <ellipse cx="50" cy="45" rx="35" ry="40" fill="#D4AF37" opacity="0.3" />
              <ellipse cx="50" cy="45" rx="35" ry="40" fill="none" stroke="#D4AF37" strokeWidth="2" />

              {/* Balloon segments */}
              <path d="M15 45 Q50 20 85 45" stroke="#8B7355" strokeWidth="2" fill="none" />
              <path d="M15 45 Q50 70 85 45" stroke="#8B7355" strokeWidth="2" fill="none" />
              <line x1="50" y1="10" x2="50" y2="80" stroke="#8B7355" strokeWidth="2" />
              <line x1="20" y1="30" x2="80" y2="30" stroke="#8B7355" strokeWidth="2" />
              <line x1="20" y1="60" x2="80" y2="60" stroke="#8B7355" strokeWidth="2" />

              {/* Basket */}
              <rect x="42" y="85" width="16" height="20" rx="2" fill="#8B7355" stroke="#6B5345" strokeWidth="1.5" />
              <line x1="42" y1="90" x2="58" y2="90" stroke="#6B5345" strokeWidth="1" />
              <line x1="42" y1="95" x2="58" y2="95" stroke="#6B5345" strokeWidth="1" />
              <line x1="42" y1="100" x2="58" y2="100" stroke="#6B5345" strokeWidth="1" />

              {/* Ropes */}
              <line x1="35" y1="80" x2="42" y2="85" stroke="#6B5345" strokeWidth="1.5" />
              <line x1="65" y1="80" x2="58" y2="85" stroke="#6B5345" strokeWidth="1.5" />
              <line x1="25" y1="70" x2="42" y2="85" stroke="#6B5345" strokeWidth="1.5" />
              <line x1="75" y1="70" x2="58" y2="85" stroke="#6B5345" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="relative inline-block">
            <span className="absolute -top-8 -right-12 text-white/40 font-heading text-xs uppercase tracking-widest">
              GRAB THIS
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Best Value Experiences
            </h2>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 bg-white/30" />
            <div className="h-px w-16 bg-white/30" />
          </div>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-transparent" />

                {/* Title overlay on image */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                    {pkg.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 bg-white">
                <p className="text-foreground/80 text-base mb-6 min-h-[3rem]">
                  {pkg.discount}
                </p>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-foreground font-heading text-sm uppercase tracking-wider hover:gap-3 transition-all group/link"
                >
                  {pkg.cta}
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
