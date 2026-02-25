import { Earth, Compass, ShieldCheck, Leaf } from 'lucide-react';

const coreStrengths = [
  {
    title: 'Local Expertise',
    description: 'Based in East Africa with deep knowledge of the terrain and hidden gems.',
    icon: Earth,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  },
  {
    title: 'Tailor-Made Safaris',
    description: 'Itineraries meticulously designed exclusively around your personal interests.',
    icon: Compass,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10'
  },
  {
    title: '24/7 On-Ground Support',
    description: 'We are with you every step of the way, ensuring a seamless and safe journey.',
    icon: ShieldCheck,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    title: 'Sustainable Tourism',
    description: 'Committed to wildlife conservation and uplifting local communities.',
    icon: Leaf,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  }
];

export const WhyChooseUsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-primary" />
            <span className="font-heading text-sm uppercase tracking-widest text-primary">
              The Migration Safaridirect Difference
            </span>
            <div className="w-12 h-px bg-primary" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Travel With Migration Safaridirect?
          </h2>
          <p className="text-xl text-muted-foreground font-display">
            Your trusted local experts for unforgettable African journeys.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreStrengths.map((strength, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border group hover:-translate-y-2"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${strength.bgColor} ${strength.color}`}>
                <strength.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {strength.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {strength.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
