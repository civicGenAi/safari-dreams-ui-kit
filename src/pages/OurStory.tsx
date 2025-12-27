import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Heart, Award, Users, Globe, Shield, Leaf } from 'lucide-react';

const OurStory = () => {
  const values = [
    { icon: Heart, title: 'Passion for Wildlife', description: 'We live and breathe safari. Our love for Africa\'s wildlife drives everything we do.' },
    { icon: Award, title: 'Excellence', description: 'Over 15 years of creating unforgettable experiences with 98% customer satisfaction.' },
    { icon: Users, title: 'Expert Guides', description: 'Our certified guides are local experts with decades of combined experience.' },
    { icon: Globe, title: 'Sustainable Tourism', description: 'We practice responsible tourism that benefits local communities and wildlife.' },
    { icon: Shield, title: 'Safety First', description: 'Your safety is our top priority with comprehensive insurance and protocols.' },
    { icon: Leaf, title: 'Conservation', description: 'We contribute 5% of profits to wildlife conservation and community projects.' },
  ];

  const team = [
    { name: 'David Thompson', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', bio: '20+ years in safari tourism' },
    { name: 'Sarah Mitchell', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', bio: 'Former wildlife biologist' },
    { name: 'James Kariuki', role: 'Lead Safari Guide', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', bio: 'Born and raised in Masai Mara' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[500px]">
        <img src="/src/assets/header_bg_new4.gif" alt="Our Story" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4 max-w-2xl">
              Our Story: 15 Years of Safari Excellence
            </h1>
            <p className="text-white/90 text-xl max-w-xl">
              From a small family business to East Africa's most trusted safari operator
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Story */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-display font-bold mb-6">How It All Began</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>
              It started with a dream in 2009. David Thompson, a wildlife photographer from London, fell in love with the Serengeti during his first visit. He met James Kariuki, a local Maasai guide, and together they envisioned creating authentic, sustainable safari experiences that would connect travelers with Africa's soul.
            </p>
            <p>
              What began as small walking safaris with a single Land Cruiser has grown into a company trusted by thousands of travelers from over 50 countries. But our core mission remains unchanged: to create transformative experiences while protecting the wildlife and supporting the communities that make it all possible.
            </p>
            <p>
              Today, we operate in seven countries across East Africa, employ over 50 local staff, and contribute to conservation projects protecting endangered species. Every safari you book with us helps preserve Africa's natural heritage for future generations.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="p-6 rounded-2xl bg-card border border-border">
                <value.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-heading font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-display font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img src={member.image} alt={member.name} className="w-48 h-48 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="font-heading font-semibold text-xl mb-1">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 p-8 rounded-2xl bg-primary/5">
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-primary mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-primary mb-2">12K+</div>
            <div className="text-sm text-muted-foreground">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Tour Packages</div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default OurStory;
