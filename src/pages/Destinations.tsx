import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Button } from '@/components/ui/button';

const Destinations = () => {
  const destinations = [
    { name: 'Kenya', slug: 'kenya', tours: 4, image: '/src/assets/dest_kenya.jpg' },
    { name: 'Rwanda', slug: 'rwanda', tours: 6, image: '/src/assets/dest_rwanda.jpg' },
    { name: 'Tanzania', slug: 'tanzania', tours: 29, image: '/src/assets/dest_tanzania.jpg' },
    { name: 'Uganda', slug: 'uganda', tours: 4, image: '/src/assets/dest_uganda.jpg' },
    { name: 'Egypt', slug: 'egypt', tours: 2, image: '/src/assets/dest_egypt.jpg' },
    { name: 'Israel', slug: 'israel', tours: 2, image: '/src/assets/dest_israel.jpg' },
    { name: 'Jordan', slug: 'jordan', tours: 1, image: '/src/assets/dest_jordan.jpg' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src="/src/assets/header_bg_new4.gif"
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
              Travel Destinations. Looking for an unforgettable travel experience in East Africa or a spiritual pilgrimage to Egypt, Israel, and Jordan? Look no further than DeMi Tours and Travel.
            </p>
            <p>
              Our travel destinations to Kenya, Uganda, Tanzania, Rwanda, Egypt, Israel, and Jordan offer a unique blend of adventure, cultural immersion, and spiritual exploration.
            </p>
            <p>
              Whether you're seeking a safari in the Savannah, a trek through the Rainforest, or a journey to some of the world's most sacred sites, we have the expertise and passion to make your visit unforgettable. Book with DeMi Tours and Travel today and embark on the "adventure of a lifetime".
            </p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map - Left */}
            <div>
              <img
                src="/src/assets/world-map.webp"
                alt="World Map"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>

            {/* Destinations List - Right */}
            <div>
              <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-2">
                Escape the ordinary
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Our Travel Destinations
              </h2>

              <blockquote className="text-lg italic text-muted-foreground mb-8 border-l-4 border-primary pl-4">
                "Traveling – it leaves you speechless, then turns you into a storyteller." – Ibn Battuta
              </blockquote>

              <ul className="space-y-3 mb-8">
                {destinations.map((dest) => (
                  <li key={dest.slug} className="flex items-center justify-between group">
                    <Link 
                      to={`/destinations/${dest.slug}`}
                      className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span className="font-heading font-medium">{dest.name}</span>
                    </Link>
                    <span className="text-sm text-muted-foreground">({dest.tours})</span>
                  </li>
                ))}
              </ul>

              <Link to="#unforgettable">
                <Button variant="primary" size="lg" className="gap-2">
                  Check Our Destinations
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Curated Destinations Section */}
      <div className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/src/assets/header_bg_new4.gif"
            alt="Curated Destinations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/70 to-charcoal/80"></div>
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
            <span className="inline-block font-['Allura'] font-normal text-6xl md:text-7xl lg:text-8xl transform hover:scale-105 transition-transform duration-300">
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

      {/* Unforgettable Experiences */}
      <div id="unforgettable" className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16">
            Unforgettable Experiences
          </h2>

          <div className="space-y-8">
            {/* First Row - 2 cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <Link to="/destinations/egypt" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-80">
                <img
                  src="/src/assets/dest_egypt.jpg"
                  alt="Egypt"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent flex items-end">
                  <div className="p-8 w-full">
                    <h3 className="font-display text-3xl font-bold text-white mb-2">Egypt</h3>
                    <p className="text-white/90 text-sm">Explore ancient wonders</p>
                  </div>
                </div>
              </Link>

              <Link to="/destinations/israel" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-80">
                <img
                  src="/src/assets/dest_israel.jpg"
                  alt="Israel"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent flex items-end">
                  <div className="p-8 w-full">
                    <h3 className="font-display text-3xl font-bold text-white mb-2">Israel</h3>
                    <p className="text-white/90 text-sm">Walk the holy lands</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Second Row - 3 cards */}
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/destinations/jordan" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-80">
                <img
                  src="/src/assets/dest_jordan.jpg"
                  alt="Jordan"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent flex items-end">
                  <div className="p-8 w-full">
                    <h3 className="font-display text-3xl font-bold text-white mb-2">Jordan</h3>
                    <p className="text-white/90 text-sm">Discover Petra's mysteries</p>
                  </div>
                </div>
              </Link>

              <Link to="/destinations/kenya" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-80">
                <img
                  src="/src/assets/dest_kenya.jpg"
                  alt="Kenya"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent flex items-end">
                  <div className="p-8 w-full">
                    <h3 className="font-display text-3xl font-bold text-white mb-2">Kenya</h3>
                    <p className="text-white/90 text-sm">Witness the great migration</p>
                  </div>
                </div>
              </Link>

              <Link to="/destinations/rwanda" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-80">
                <img
                  src="/src/assets/dest_rwanda.jpg"
                  alt="Rwanda"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent flex items-end">
                  <div className="p-8 w-full">
                    <h3 className="font-display text-3xl font-bold text-white mb-2">Rwanda</h3>
                    <p className="text-white/90 text-sm">Trek with mountain gorillas</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Third Row - 2 cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <Link to="/destinations/tanzania" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-80">
                <img
                  src="/src/assets/dest_tanzania.jpg"
                  alt="Tanzania"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent flex items-end">
                  <div className="p-8 w-full">
                    <h3 className="font-display text-3xl font-bold text-white mb-2">Tanzania</h3>
                    <p className="text-white/90 text-sm">Serengeti & Kilimanjaro await</p>
                  </div>
                </div>
              </Link>

              <Link to="/destinations/uganda" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-80">
                <img
                  src="/src/assets/dest_uganda.jpg"
                  alt="Uganda"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent flex items-end">
                  <div className="p-8 w-full">
                    <h3 className="font-display text-3xl font-bold text-white mb-2">Uganda</h3>
                    <p className="text-white/90 text-sm">Pearl of Africa adventure</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials would go here */}
      
      <NewsletterSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Destinations;
