import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Sparkles, Clock } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Button } from '@/components/ui/button';

const Destinations = () => {
  const [showComingSoon, setShowComingSoon] = useState<string | null>(null);

  const activeDestinations = [
    {
      name: 'Tanzania',
      slug: 'tanzania',
      tours: 29,
      image: '/src/assets/dest/Tanzania-Landmarks-Mount-Kilimanjaro.jpg',
      description: 'Serengeti & Kilimanjaro await',
      badge: 'Popular'
    },
    {
      name: 'Kenya',
      slug: 'kenya',
      tours: 4,
      image: '/src/assets/dest/kenya.jpg',
      description: 'Witness the great migration',
      badge: 'Hot Deal'
    },
    {
      name: 'Rwanda',
      slug: 'rwanda',
      tours: 6,
      image: '/src/assets/dest/rwanda.jpg',
      description: 'Trek with mountain gorillas',
      badge: 'Wildlife'
    },
    {
      name: 'Uganda',
      slug: 'uganda',
      tours: 4,
      image: '/src/assets/dest/uganda.jpg',
      description: 'Pearl of Africa adventure',
      badge: 'Adventure'
    },
  ];

  const comingSoonDestinations = [
    {
      name: 'South Africa',
      slug: 'south-africa',
      image: '/src/assets/dest/sa.jpg',
      description: 'Safari meets sophistication',
      badge: 'Coming Soon'
    },
    {
      name: 'Namibia',
      slug: 'namibia',
      image: '/src/assets/dest/namibia-giraffe-drinking-wildlife-scaled.webp',
      description: 'Desert landscapes & wildlife',
      badge: 'Coming Soon'
    },
    {
      name: 'Botswana',
      slug: 'botswana',
      image: '/src/assets/dest/Botswana-Okavango-Delta-10.jpg',
      description: 'Pristine wilderness & delta',
      badge: 'Coming Soon'
    },
  ];

  const allDestinations = [...activeDestinations, ...comingSoonDestinations];

  const handleComingSoonClick = (name: string) => {
    setShowComingSoon(name);
    setTimeout(() => setShowComingSoon(null), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src="/header_bg_new4.gif"
          alt="Destinations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-white mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="mx-2">»</span>
              <span>Destinations</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Destinations
            </h1>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-8">
            Welcome to Our Carefully Curated Travel Destinations
          </h2>

          <div className="max-w-4xl mx-auto space-y-4 text-muted-foreground leading-relaxed text-center">
            <p>
              Travel Destinations. Looking for an unforgettable travel experience in East Africa? Look no further than DeMi Tours and Travel.
            </p>
            <p>
              Our travel destinations to Kenya, Uganda, Tanzania, and Rwanda offer a unique blend of adventure, cultural immersion, and wildlife exploration.
            </p>
            <p>
              Whether you're seeking a safari in the Savannah, a trek through the Rainforest to see mountain gorillas, or an exploration of vibrant cultures, we have the expertise and passion to make your visit unforgettable. Book with DeMi Tours and Travel today and embark on the "adventure of a lifetime".
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Our Destinations */}
      <div className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-2">
              Escape the ordinary
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Why Choose Our Destinations
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Expert Guides</h3>
              <p className="text-muted-foreground text-sm">
                Local professionals with deep knowledge of wildlife and culture
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Sustainable Travel</h3>
              <p className="text-muted-foreground text-sm">
                Eco-friendly practices supporting local communities
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3">Best Value</h3>
              <p className="text-muted-foreground text-sm">
                Competitive prices with exceptional quality and service
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <blockquote className="text-lg italic text-muted-foreground max-w-2xl mx-auto border-l-4 border-primary pl-6">
              "Traveling – it leaves you speechless, then turns you into a storyteller." – Ibn Battuta
            </blockquote>
          </div>
        </div>
      </div>

      {/* Curated Destinations Section */}
      <div className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/destination_home.webp"
            alt="Curated Destinations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/70 to-charcoal/80"></div>
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
            <span className="inline-block font-script font-normal text-6xl md:text-7xl lg:text-8xl transform hover:scale-105 transition-transform duration-300">
              Curated
            </span>
            <br />
            <span className="inline-block text-primary drop-shadow-[0_2px_10px_rgba(218,165,32,0.5)] transform hover:scale-105 transition-transform duration-300">
              Destinations
            </span>
          </h2>
          <div className="mt-8 flex justify-center gap-4">
            <div className="h-1 w-20 bg-primary rounded-full"></div>
            <div className="h-1 w-12 bg-primary/60 rounded-full"></div>
            <div className="h-1 w-8 bg-primary/40 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Unforgettable Experiences - Redesigned Grid */}
      <div id="unforgettable" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16">
            Discover Africa With Us
          </h2>

          {/* Grid Layout with Creative Arrangement */}
          <div className="grid md:grid-cols-12 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {allDestinations.map((dest, index) => {
              const isComingSoon = comingSoonDestinations.some(d => d.name === dest.name);
              const gridClass =
                index === 0 ? 'md:col-span-8 md:row-span-2' :
                index === 1 ? 'md:col-span-4 md:row-span-1' :
                index === 2 ? 'md:col-span-4 md:row-span-1' :
                index === 3 ? 'md:col-span-4 md:row-span-1' :
                index === 4 ? 'md:col-span-4 md:row-span-1' :
                'md:col-span-4 md:row-span-1';

              const heightClass = index === 0 ? 'h-[600px]' : 'h-[290px]';

              return isComingSoon ? (
                <button
                  key={dest.name}
                  onClick={() => handleComingSoonClick(dest.name)}
                  className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 ${gridClass} ${heightClass}`}
                  style={{
                    animation: `slideInUp 0.8s ease-out ${index * 0.15}s both`,
                  }}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/20 to-transparent" />

                  {/* Coming Soon Overlay */}
                  <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center px-6">
                      <Clock className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
                      <h4 className="font-display text-2xl font-bold text-white mb-2">Coming Soon</h4>
                      <p className="text-white/90 text-sm">
                        We're curating exceptional experiences for {dest.name}. Stay tuned!
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                    <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                      <div className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-heading font-semibold uppercase tracking-wider mb-3">
                        <Clock className="w-3 h-3" />
                        {dest.badge}
                      </div>
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
                        {dest.name}
                      </h3>
                      <p className="text-white/90 text-sm">{dest.description}</p>
                    </div>
                  </div>

                  {/* Notification Toast */}
                  {showComingSoon === dest.name && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-2xl z-50 animate-in slide-in-from-top-4 fade-in duration-300">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <p className="font-heading font-semibold text-sm">
                          {dest.name} tours launching soon!
                        </p>
                      </div>
                    </div>
                  )}
                </button>
              ) : (
                <Link
                  key={dest.name}
                  to={`/destinations/${dest.slug}`}
                  className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${gridClass} ${heightClass}`}
                  style={{
                    animation: `slideInUp 0.8s ease-out ${index * 0.15}s both`,
                  }}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                    <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                      <div className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-heading font-semibold uppercase tracking-wider mb-3">
                        {dest.badge}
                      </div>
                      <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
                        {dest.name}
                      </h3>
                      <p className="text-white/90 text-sm mb-4">{dest.description}</p>
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <span>{dest.tours}+ Tours Available</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <NewsletterSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Destinations;
