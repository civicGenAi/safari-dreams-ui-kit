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
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-secondary/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-primary/40" />
            <span className="font-heading text-sm uppercase tracking-[0.2em] text-primary font-bold bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 backdrop-blur-sm">
              The Migration Safaridirect Difference
            </span>
            <div className="w-12 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Why Travel With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">
              Migration Safaridirect?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-display max-w-2xl mx-auto leading-relaxed">
            Your trusted local experts for unforgettable African journeys. We don't just show you Africa; we connect you to its soul.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-[320px]">
          {coreStrengths.map((strength, index) => (
            <div
              key={index}
              className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(238,133,9,0.1)] transition-all duration-500 overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Card Hover Background Glow */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${strength.bgColor.replace('/10', '')}`} />

              {/* Top Right Decorative Corner */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 ease-out" />

              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br from-white to-gray-50/50 shadow-inner border border-white/60 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 ${strength.color}`}>
                  <strength.icon className="w-8 h-8 drop-shadow-sm" strokeWidth={1.5} />
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {strength.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed flex-grow text-[15px]">
                  {strength.description}
                </p>

                {/* Subtle bottom indicator */}
                <div className="w-8 h-1 rounded-full bg-border group-hover:w-16 group-hover:bg-primary transition-all duration-500 mt-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
