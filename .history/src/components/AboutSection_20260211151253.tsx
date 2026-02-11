import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedBackground } from './AnimatedBackground';
import aboutImage from '@/assets/about.jpg';

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-background overflow-hidden relative">
      <AnimatedBackground />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Three Column Layout */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          {/* Left: Heading & Label */}
          <div className="lg:text-left">
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6 lg:justify-start justify-center">
              <div className="w-12 h-px bg-primary" />
              <span className="font-heading text-sm uppercase tracking-widest text-primary">
                At Migration sSafaridirect
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              We craft unforgettable travel ideas. Think of us as matchmakers.
            </h2>

            <p className="text-xl text-primary font-semibold mb-4">
              Jambo, welcome to DeMi Tours & Travel Africa
            </p>

            <p className="text-muted-foreground leading-relaxed">
              A locally-owned, women-led ecotourism company and trusted safari specialists in East Africa.
            </p>
          </div>

          {/* Center: Circular Image */}
          <div className="relative flex justify-center">
            {/* Decorative Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full border-2 border-dashed border-primary/30 animate-spin" style={{ animationDuration: '60s' }} />
            </div>

            {/* Main Circular Image */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-lift border-4 border-background">
              <img
                src={aboutImage}
                alt="Safari adventure"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
            </div>

            {/* Experience Badge - Top Right */}
            <div className="absolute -top-4 right-0 lg:right-4 bg-primary text-primary-foreground rounded-2xl px-5 py-4 shadow-primary">
              <span className="block font-display text-3xl font-bold">27</span>
              <span className="block font-heading text-xs uppercase tracking-wider">Years of Experience</span>
            </div>

            {/* Stats Badge - Bottom Left */}
            <div className="absolute -bottom-4 left-0 lg:left-4 bg-secondary text-secondary-foreground rounded-2xl px-5 py-4 shadow-lg">
              <span className="block font-display text-3xl font-bold">40</span>
              <span className="block font-heading text-xs uppercase tracking-wider">Travel Ideas</span>
            </div>
          </div>

          {/* Right: Descriptions & CTA */}
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              DeMi Tours & Travel Africa is a locally-owned, women-led ecotourism company and trusted safari specialists in East Africa, championing inclusive tourism and impact travel. With over 27 years of combined experience, we are experts in selling East Africa as a destination, offering carefully curated combined and stand-alone safari experiences across Tanzania, Kenya, Uganda, and Rwanda.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Every journey we design prioritizes safety, accessibility, and inclusivity, making it possible for families, persons with disabilities, solo travelers and students to explore East Africa with confidence. We craft immersive, responsible safaris that connect travelers to people, culture, and nature—while ensuring tourism benefits the communities it touches.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              At the heart of our work is impact travel—travel that changes lives. Through women empowerment, community partnerships, and conservation-focused experiences, we protect Africa's landscapes and heritage. With DeMi Tours & Travel Africa, travel goes beyond exploration—it becomes a powerful force for inclusion, connection, and lasting positive impact.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary">27</div>
                <div className="text-xs text-muted-foreground">Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary">40</div>
                <div className="text-xs text-muted-foreground">Curated Travel Ideas</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl font-bold text-primary">200</div>
                <div className="text-xs text-muted-foreground">Repeat Clients</div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link to="/our-story">
                <Button variant="primary" size="lg">
                  About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
