import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Compass, 
  Globe, 
  Sun, 
  Crown, 
  Users, 
  Footprints,
  ArrowRight,
  Heart
} from 'lucide-react';

const experiences = [
  {
    icon: Compass,
    title: 'Adventure Seekers',
    count: '12+',
    description: 'Thrilling expeditions for the bold traveler.',
    color: 'bg-orange-500/10 text-orange-600',
  },
  {
    icon: Globe,
    title: 'Cross Border Safari',
    count: '8+',
    description: 'Multi-country safari adventures.',
    color: 'bg-emerald-500/10 text-emerald-600',
  },
  {
    icon: Sun,
    title: 'Day Tours',
    count: '15+',
    description: 'Perfect short excursions and city tours.',
    color: 'bg-amber-500/10 text-amber-600',
  },
  {
    icon: Crown,
    title: 'Luxury Tours',
    count: '6+',
    description: 'Premium experiences with exclusive lodges.',
    color: 'bg-purple-500/10 text-purple-600',
  },
  {
    icon: Users,
    title: 'Migration Safari',
    count: '5+',
    description: 'Witness the Great Wildebeest Migration.',
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    icon: Footprints,
    title: 'Gorilla & Chimp Trekking',
    count: '7+',
    description: 'Encounter our closest relatives in the wild.',
    color: 'bg-green-500/10 text-green-600',
  },
];

export const ExperiencesSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-secondary text-secondary-foreground relative overflow-hidden">
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
          <p className="text-secondary-foreground/70 text-lg">
            Discover the perfect adventure tailored to your travel style. 
            From heart-pumping safaris to serene nature walks.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {experiences.map((exp, index) => (
            <Link
              key={exp.title}
              to="/travel-ideas"
              className="group bg-secondary-foreground/5 backdrop-blur-sm rounded-2xl p-6 border border-secondary-foreground/10 hover:border-primary/50 hover:bg-secondary-foreground/10 transition-all duration-300 card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl ${exp.color} flex items-center justify-center`}>
                  <exp.icon className="w-7 h-7" />
                </div>
                <span className="font-display text-3xl font-bold text-primary">
                  {exp.count}
                </span>
              </div>
              
              <h3 className="font-display text-xl font-bold text-secondary-foreground mb-2 group-hover:text-primary transition-colors">
                {exp.title}
              </h3>
              <p className="text-secondary-foreground/60 text-sm mb-4">
                {exp.description}
              </p>
              
              <div className="flex items-center gap-2 text-primary font-heading text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
                Explore
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-secondary-foreground/5 rounded-3xl p-10 lg:p-16 border border-secondary-foreground/10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-secondary-foreground mb-4">
            At Demi Tours and Travel
          </h3>
          <p className="font-display text-xl md:text-2xl text-primary mb-8">
            We Treat Our Clients Like Family
          </p>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto mb-8">
            Your journey is our passion. Let us craft an unforgettable experience 
            that exceeds your expectations. Reach out today and become part of our family.
          </p>
          <Link to="/contact">
            <Button variant="primary" size="xl" className="gap-2">
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
