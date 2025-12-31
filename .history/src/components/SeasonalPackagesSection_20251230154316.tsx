import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const packages = [
  {
    title: 'Suns Out Bums Out',
    discount: '15%',
    description: 'off on all advance bookings',
    image: '/src/assets/offers/home_special_offers2.webp',
    cta: 'Book Now',
    color: 'primary',
  },
  {
    title: 'Repeat Clients',
    discount: '18%',
    description: 'off on all advance bookings',
    image: '/src/assets/offers/lion_cubs_bromance.webp',
    cta: 'Book Now',
    color: 'secondary',
  },
  {
    title: 'Exclusive Deals',
    discount: '25%',
    description: 'Save up to 25%? Book 3 months upfront',
    image: '/src/assets/offers/home_special_offers_lion.webp',
    cta: 'Book Now',
    color: 'gold',
  },
];

export const SeasonalPackagesSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Animated decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <span className="absolute -top-8 right-0 text-primary font-heading text-xs uppercase tracking-widest">
              <span className="inline-block animate-bounce">✨</span> GRAB THIS
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Best Value Experiences
            </h2>
          </div>
        </div>

        {/* Staggered Card Layout with Diagonal Arrangement */}
        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {packages.map((pkg, index) => (
              <Link
                key={index}
                to="/contact"
                className="group relative"
                style={{
                  animation: `slideInUp 0.8s ease-out ${index * 0.2}s both`,
                }}
              >
                {/* Card Container */}
                <div
                  className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-8 hover:rotate-0"
                  style={{
                    transform: index === 1 ? 'translateY(40px)' : index === 2 ? 'translateY(80px)' : 'translateY(0)',
                  }}
                >
                  {/* Image Background */}
                  <div className="absolute inset-0">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent" />
                  </div>

                  {/* Floating Discount Badge */}
                  <div className="absolute top-6 right-6 z-10">
                    <div
                      className={`
                        ${index === 0 ? 'bg-primary' : index === 1 ? 'bg-secondary' : 'bg-gradient-to-br from-[#D4AF37] to-[#F4E4A6]'}
                        ${index === 2 ? 'text-charcoal' : 'text-white'}
                        w-24 h-24 rounded-full flex items-center justify-center shadow-2xl
                        transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500
                      `}
                      style={{
                        animation: `float 3s ease-in-out infinite ${index * 0.5}s`,
                      }}
                    >
                      <div className="text-center">
                        <div className="text-4xl font-display font-bold">{pkg.discount}</div>
                        <div className="text-xs font-heading uppercase font-bold">OFF</div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="transform transition-all duration-500 group-hover:-translate-y-4">
                      {/* Title */}
                      <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
                        {pkg.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/90 text-base lg:text-lg mb-6">
                        {pkg.description}
                      </p>

                      {/* CTA Button */}
                      <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm text-foreground px-6 py-4 rounded-full font-heading font-semibold uppercase tracking-wider text-sm shadow-lg group-hover:gap-5 group-hover:bg-white transition-all">
                        {pkg.cta}
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Decorative Corner Accent */}
                  <div
                    className={`
                      absolute top-0 left-0 w-32 h-32
                      ${index === 0 ? 'bg-primary/20' : index === 1 ? 'bg-secondary/20' : 'bg-[#D4AF37]/20'}
                      rounded-br-full transition-all duration-500 group-hover:w-40 group-hover:h-40
                    `}
                  />

                  {/* Shine Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Floating Label */}
                <div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <div className="bg-white px-6 py-2 rounded-full shadow-xl border-2 border-primary/20">
                    <span className="text-sm font-heading font-bold text-foreground uppercase">Limited Offer</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
      `}</style>
    </section>
  );
};
