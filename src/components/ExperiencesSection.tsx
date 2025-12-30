import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Custom SVG Icons
const AdventureIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <path d="M32 8L38 20L52 22L42 31L45 45L32 38L19 45L22 31L12 22L26 20L32 8Z" fill="currentColor" opacity="0.2"/>
    <path d="M32 8L38 20L52 22L42 31L45 45L32 38L19 45L22 31L12 22L26 20L32 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
    <path d="M32 12V16M32 48V52M12 32H16M48 32H52" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CrossBorderIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.1"/>
    <path d="M8 32C8 18.7 18.7 8 32 8C45.3 8 56 18.7 56 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 32C8 45.3 18.7 56 32 56C45.3 56 56 45.3 56 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 4"/>
    <path d="M32 8V56M12 20H52M12 44H52" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 12Q32 28 44 12M20 52Q32 36 44 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DayTourIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <circle cx="32" cy="28" r="12" fill="currentColor" opacity="0.2"/>
    <circle cx="32" cy="28" r="12" stroke="currentColor" strokeWidth="2"/>
    <path d="M32 16V12M32 40V44M44 28H48M16 28H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M41.5 18.5L44.5 15.5M19.5 37.5L22.5 34.5M22.5 18.5L19.5 15.5M44.5 37.5L41.5 34.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 48H52C52 52 48 54 44 54H20C16 54 12 52 12 48Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
);

const LuxuryIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <path d="M32 8L36 24H48L38 32L42 48L32 40L22 48L26 32L16 24H28L32 8Z" fill="currentColor" opacity="0.2"/>
    <path d="M32 8L36 24H48L38 32L42 48L32 40L22 48L26 32L16 24H28L32 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="32" cy="32" r="4" fill="currentColor"/>
    <path d="M24 16L20 12M40 16L44 12M18 28L12 26M46 28L52 26M18 40L12 42M46 40L52 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const MigrationIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <path d="M12 44C12 44 18 36 24 36C30 36 32 44 38 44C44 44 48 36 52 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
    <ellipse cx="20" cy="28" rx="6" ry="8" fill="currentColor" opacity="0.2"/>
    <ellipse cx="20" cy="28" rx="6" ry="8" stroke="currentColor" strokeWidth="2"/>
    <path d="M18 24L16 20L18 22L20 20L18 24Z" fill="currentColor"/>
    <ellipse cx="35" cy="24" rx="5" ry="6" fill="currentColor" opacity="0.2"/>
    <ellipse cx="35" cy="24" rx="5" ry="6" stroke="currentColor" strokeWidth="2"/>
    <path d="M33 21L31 18L33 19.5L35 18L33 21Z" fill="currentColor"/>
    <ellipse cx="48" cy="30" rx="4" ry="5" fill="currentColor" opacity="0.2"/>
    <ellipse cx="48" cy="30" rx="4" ry="5" stroke="currentColor" strokeWidth="2"/>
    <path d="M47 28L45 25L47 26.5L49 25L47 28Z" fill="currentColor"/>
    <path d="M8 50H56" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const GorillaIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
    <circle cx="32" cy="30" r="16" fill="currentColor" opacity="0.1"/>
    <circle cx="32" cy="30" r="16" stroke="currentColor" strokeWidth="2"/>
    <circle cx="26" cy="28" r="3" fill="currentColor"/>
    <circle cx="38" cy="28" r="3" fill="currentColor"/>
    <path d="M28 36C28 36 30 38 32 38C34 38 36 36 36 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="18" cy="20" r="6" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="46" cy="20" r="6" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2"/>
    <path d="M24 46C24 46 26 50 32 50C38 50 40 46 40 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M22 40L18 52M42 40L46 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const experiences = [
  {
    icon: AdventureIcon,
    title: 'Adventure Seekers',
    count: '12+',
    description: 'Thrilling expeditions for the bold traveler.',
    color: 'bg-orange-500/10 text-orange-600',
    image: '/src/assets/tours_daytours_arusha_national_park2.webp',
    slug: 'adventure',
  },
  {
    icon: CrossBorderIcon,
    title: 'Cross Border Safari',
    count: '8+',
    description: 'Multi-country safari adventures.',
    color: 'bg-emerald-500/10 text-emerald-600',
    image: '/src/assets/idea_crossborder_elephants.webp',
    slug: 'cross-border',
  },
  {
    icon: DayTourIcon,
    title: 'Day Tours',
    count: '15+',
    description: 'Perfect short excursions and city tours.',
    color: 'bg-amber-500/10 text-amber-600',
    image: '/src/assets/ideas_daytour_leopardkill.webp',
    slug: 'day-tours',
  },
  {
    icon: LuxuryIcon,
    title: 'Luxury Tours',
    count: '6+',
    description: 'Premium experiences with exclusive lodges.',
    color: 'bg-purple-500/10 text-purple-600',
    image: '/src/assets/idea_luxury_poolside.webp',
    slug: 'luxury',
  },
  {
    icon: MigrationIcon,
    title: 'Migration Safari',
    count: '5+',
    description: 'Witness the Great Wildebeest Migration.',
    color: 'bg-blue-500/10 text-blue-600',
    image: '/src/assets/ideas_migration_wildebeast.jpg',
    slug: 'migration',
  },
  {
    icon: GorillaIcon,
    title: 'Gorilla & Chimp Trekking',
    count: '7+',
    description: 'Encounter our closest relatives in the wild.',
    color: 'bg-green-500/10 text-green-600',
    image: '/src/assets/idea_gorilla_chimp_trek.webp',
    slug: 'gorilla-chimp-trekking',
  },
];

export const ExperiencesSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated Adventure Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          {/* Mountain peaks silhouette - top */}
          <g opacity="0.04" fill="#2D3748">
            <path d="M0 200 L50 150 L100 200 L150 120 L200 200 L250 160 L300 200 L0 200 Z" />
            <path d="M1140 200 L1190 150 L1240 200 L1290 120 L1340 200 L1390 160 L1440 200 L1140 200 Z" />
          </g>

          {/* Acacia tree silhouettes - scattered */}
          <g opacity="0.05" fill="#EE8509">
            <ellipse cx="120" cy="400" rx="30" ry="8" />
            <rect x="118" y="400" width="4" height="40" />

            <ellipse cx="1320" cy="500" rx="25" ry="7" />
            <rect x="1318" y="500" width="4" height="35" />
          </g>

          {/* Floating adventure icons - subtle */}
          <g opacity="0.03" stroke="#EE8509" fill="none">
            {/* Binoculars */}
            <g>
              <circle cx="200" cy="300" r="8" strokeWidth="1.5" />
              <circle cx="220" cy="300" r="8" strokeWidth="1.5" />
              <path d="M208 300 L212 300" strokeWidth="2" />
              <animate attributeName="opacity" values="0.03;0.05;0.03" dur="5s" repeatCount="indefinite" />
            </g>

            {/* Camera */}
            <g transform="translate(1200, 350)">
              <rect x="0" y="0" width="24" height="18" rx="2" strokeWidth="1.5" />
              <circle cx="12" cy="9" r="5" strokeWidth="1.5" />
              <animate attributeName="opacity" values="0.03;0.05;0.03" dur="6s" repeatCount="indefinite" />
            </g>
          </g>

          {/* Safari vehicle tracks */}
          <g opacity="0.04" stroke="#2D3748" fill="none">
            <path d="M300 700 L350 700 M310 690 L340 690" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M400 700 L450 700 M410 690 L440 690" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M500 700 L550 700 M510 690 L540 690" strokeWidth="2" strokeDasharray="4 4" />
          </g>

          {/* Stars - adventure in the sky */}
          <g opacity="0.04" fill="#EE8509">
            <path d="M900 100 L902 106 L908 106 L903 110 L905 116 L900 112 L895 116 L897 110 L892 106 L898 106 Z">
              <animate attributeName="opacity" values="0.04;0.06;0.04" dur="4s" repeatCount="indefinite" />
            </path>
            <path d="M1100 150 L1102 156 L1108 156 L1103 160 L1105 166 L1100 162 L1095 166 L1097 160 L1092 156 L1098 156 Z">
              <animate attributeName="opacity" values="0.04;0.06;0.04" dur="5s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Wind/movement lines */}
          <g opacity="0.03" stroke="#2D3748" strokeWidth="1.5" fill="none">
            <path d="M50 600 Q70 595 90 600" strokeDasharray="3 6">
              <animate attributeName="d" values="M50 600 Q70 595 90 600;M50 600 Q70 598 90 600;M50 600 Q70 595 90 600" dur="4s" repeatCount="indefinite" />
            </path>
            <path d="M60 620 Q80 615 100 620" strokeDasharray="3 6">
              <animate attributeName="d" values="M60 620 Q80 615 100 620;M60 620 Q80 618 100 620;M60 620 Q80 615 100 620" dur="5s" repeatCount="indefinite" />
            </path>
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-primary" />
            <span className="font-heading text-sm uppercase tracking-widest text-primary">
              Demi Tours and Travel
            </span>
            <div className="w-12 h-px bg-primary" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Come With Us to
            <span className="text-primary block">New Experiences</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover the perfect adventure tailored to your travel style.
            From heart-pumping safaris to serene nature walks.
          </p>
        </div>

        {/* Experience Cards Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6 auto-rows-[280px]">
          {/* Big Card - Left (Adventure Seekers) */}
          <Link
            to={`/travel-ideas/${experiences[0].slug}`}
            className="group relative overflow-hidden rounded-3xl md:col-span-6 lg:col-span-5 md:row-span-2 card-hover"
            style={{ animationDelay: '0ms' }}
          >
            <img
              src={experiences[0].image}
              alt={experiences[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/30 backdrop-blur-sm transition-all duration-500 group-hover:bg-primary/10 group-hover:backdrop-blur-none" />

            <div className="relative h-full flex flex-col justify-between p-8">
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                  {React.createElement(experiences[0].icon)}
                </div>
                <span className="font-display text-4xl lg:text-5xl font-bold text-white/90">
                  {experiences[0].count}
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">
                  {experiences[0].title}
                </h3>
                <p className="text-white/90 text-base lg:text-lg mb-4 max-w-md">
                  {experiences[0].description}
                </p>
                <div className="flex items-center gap-2 text-white font-heading text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
                  Explore Now
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </Link>

          {/* Small Card Top Middle (Cross Border Safari) */}
          <Link
            to={`/travel-ideas/${experiences[1].slug}`}
            className="group relative overflow-hidden rounded-3xl md:col-span-3 lg:col-span-3 card-hover"
            style={{ animationDelay: '100ms' }}
          >
            <img
              src={experiences[1].image}
              alt={experiences[1].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-secondary/35 backdrop-blur-sm transition-all duration-500 group-hover:bg-secondary/10 group-hover:backdrop-blur-none" />

            <div className="relative h-full flex flex-col justify-between p-6">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                  {React.createElement(experiences[1].icon)}
                </div>
                <span className="font-display text-2xl font-bold text-white/90">
                  {experiences[1].count}
                </span>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {experiences[1].title}
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  {experiences[1].description}
                </p>
                <div className="flex items-center gap-2 text-white font-heading text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Right Column - Card 1 (Luxury Tours) */}
          <Link
            to={`/travel-ideas/${experiences[3].slug}`}
            className="group relative overflow-hidden rounded-3xl md:col-span-3 lg:col-span-4 card-hover"
            style={{ animationDelay: '200ms' }}
          >
            <img
              src={experiences[3].image}
              alt={experiences[3].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/35 backdrop-blur-sm transition-all duration-500 group-hover:bg-primary/10 group-hover:backdrop-blur-none" />

            <div className="relative h-full flex flex-col justify-between p-6">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                  {React.createElement(experiences[3].icon)}
                </div>
                <span className="font-display text-2xl font-bold text-white/90">
                  {experiences[3].count}
                </span>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {experiences[3].title}
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  {experiences[3].description}
                </p>
                <div className="flex items-center gap-2 text-white font-heading text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Small Card Bottom Middle (Day Tours) */}
          <Link
            to={`/travel-ideas/${experiences[2].slug}`}
            className="group relative overflow-hidden rounded-3xl md:col-span-3 lg:col-span-3 card-hover"
            style={{ animationDelay: '150ms' }}
          >
            <img
              src={experiences[2].image}
              alt={experiences[2].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-secondary/30 backdrop-blur-sm transition-all duration-500 group-hover:bg-secondary/10 group-hover:backdrop-blur-none" />

            <div className="relative h-full flex flex-col justify-between p-6">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                  {React.createElement(experiences[2].icon)}
                </div>
                <span className="font-display text-2xl font-bold text-white/90">
                  {experiences[2].count}
                </span>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {experiences[2].title}
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  {experiences[2].description}
                </p>
                <div className="flex items-center gap-2 text-white font-heading text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Right Column - Card 2 (Migration Safari) */}
          <Link
            to={`/travel-ideas/${experiences[4].slug}`}
            className="group relative overflow-hidden rounded-3xl md:col-span-3 lg:col-span-2 card-hover"
            style={{ animationDelay: '250ms' }}
          >
            <img
              src={experiences[4].image}
              alt={experiences[4].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/30 backdrop-blur-sm transition-all duration-500 group-hover:bg-primary/10 group-hover:backdrop-blur-none" />

            <div className="relative h-full flex flex-col justify-between p-6">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                  {React.createElement(experiences[4].icon)}
                </div>
                <span className="font-display text-2xl font-bold text-white/90">
                  {experiences[4].count}
                </span>
              </div>

              <div>
                <h3 className="font-display text-base font-bold text-white mb-2">
                  {experiences[4].title}
                </h3>
                <p className="text-white/80 text-xs mb-3">
                  {experiences[4].description}
                </p>
                <div className="flex items-center gap-2 text-white font-heading text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Right Column - Card 3 (Gorilla & Chimp Trekking) */}
          <Link
            to={`/travel-ideas/${experiences[5].slug}`}
            className="group relative overflow-hidden rounded-3xl md:col-span-3 lg:col-span-2 card-hover"
            style={{ animationDelay: '300ms' }}
          >
            <img
              src={experiences[5].image}
              alt={experiences[5].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-secondary/35 backdrop-blur-sm transition-all duration-500 group-hover:bg-secondary/10 group-hover:backdrop-blur-none" />

            <div className="relative h-full flex flex-col justify-between p-6">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                  {React.createElement(experiences[5].icon)}
                </div>
                <span className="font-display text-2xl font-bold text-white/90">
                  {experiences[5].count}
                </span>
              </div>

              <div>
                <h3 className="font-display text-base font-bold text-white mb-2">
                  {experiences[5].title}
                </h3>
                <p className="text-white/80 text-xs mb-3">
                  {experiences[5].description}
                </p>
                <div className="flex items-center gap-2 text-white font-heading text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
