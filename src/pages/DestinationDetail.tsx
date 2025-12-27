import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { NewsletterSection } from '@/components/NewsletterSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { mockDestinations, mockTours } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Heart,
  Users,
  Building,
  Lightbulb,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star
} from 'lucide-react';

const travelIdeasCards = [
  { id: 1, name: 'Migration Safari', tours: '6+', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600' },
  { id: 2, name: 'Romantic Holidays', tours: '8+', image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600' },
  { id: 3, name: 'Safari Beach', tours: '6+', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600' },
  { id: 4, name: 'Adventure Seekers', tours: '6+', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600' },
  { id: 5, name: 'Luxury Tours', tours: '2+', image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600' },
  { id: 6, name: 'Gorilla Trekking', tours: '10+', image: 'https://images.unsplash.com/photo-1583867095486-3e0e2e66cf44?w=600' },
];

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const destination = mockDestinations.find((d) => d.slug === slug);
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoScrollRef = useRef<NodeJS.Timeout>();

  const otherDestinations = mockDestinations.filter((d) => d.slug !== slug).slice(0, 6);
  const destinationTours = mockTours.filter((t) => t.destination === slug);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(1, travelIdeasCards.length - 2));
    }, 3000);
    autoScrollRef.current = interval;
    return () => clearInterval(interval);
  }, []);

  if (!destination) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Destination Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const destinationContent: Record<string, { title: string; content: string; heroImage: string }> = {
    tanzania: {
      title: 'Adventure full Tanzania',
      heroImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=1920',
      content: `Tanzania is a beautiful country located in East Africa, boasting a wealth of tourist attractions that cater to different interests. One of the most popular destinations is the Serengeti National Park, which is a world-renowned wildlife sanctuary and the site of the famous wildebeest migration. Visitors can witness vast herds of wildebeest, zebras, and gazelles as they cross the park's plains in search of water and grazing land. It is also home to the "Big Five" – lions, elephants, buffaloes, leopards, and rhinos.

Another natural wonder is Mount Kilimanjaro, the highest peak in Africa, which attracts thousands of hikers and mountaineers from around the world every year. The climb to the summit is a once-in-a-lifetime experience that provides breathtaking views of the surrounding landscape.

Zanzibar, an archipelago off Tanzania's coast, is famous for its pristine beaches, clear waters, and rich cultural heritage. Visitors can relax on the island's white sand beaches, go snorkeling or scuba diving, and explore the Stone Town, a UNESCO World Heritage Site that showcases the influences of African, Arab, and European cultures.

Other notable destinations in Tanzania include the Ngorongoro Conservation Area, which features an enormous crater teeming with wildlife, and Tarangire National Park, known for its large elephant herds. The Olduvai Gorge, a site where some of the oldest human remains were discovered, and the ruins of the ancient city of Kilwa Kisiwani are also fascinating attractions for history and culture enthusiasts.

In conclusion, Tanzania offers a diverse range of attractions that are sure to satisfy any traveler's desires, from wildlife safaris to cultural experiences to relaxing beach getaways. With its stunning natural beauty, rich cultural heritage, and friendly locals, Tanzania is truly a must-visit destination for anyone seeking an unforgettable African adventure.`
    },
  };

  const content = destinationContent[slug || ''] || {
    title: `Discover ${destination.name}`,
    heroImage: destination.image,
    content: destination.longDescription || destination.description
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[400px] md:h-[500px]">
        <img src="/src/assets/header_bg_new4.gif" alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
              {destination.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Large Picture Section */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Large Image with Note Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden">
              <img src={content.heroImage} alt={destination.name} className="w-full h-[600px] object-cover" />

              {/* Please Note Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-2xl">
                <div className="flex items-start gap-4">
                  <svg className="w-8 h-8 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold mb-3">Please Note</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Best Time:</span>
                        <p className="font-semibold">{destination.bestTime}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Climate:</span>
                        <p className="font-semibold">{destination.climate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Currency:</span>
                        <p className="font-semibold">{destination.currency}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Language:</span>
                        <p className="font-semibold">{destination.language}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">{content.title}</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              {content.content.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
            <div className="text-center p-6 bg-white rounded-2xl border-2 border-dashed border-primary/30">
              <Lightbulb className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-4xl font-display font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Travel ideas</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border-2 border-dashed border-primary/30">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-4xl font-display font-bold text-primary mb-2">7+</div>
              <div className="text-sm text-muted-foreground">Destinations</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border-2 border-dashed border-primary/30">
              <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-4xl font-display font-bold text-primary mb-2">200+</div>
              <div className="text-sm text-muted-foreground uppercase">Repeat Clients</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border-2 border-dashed border-primary/30">
              <Building className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-4xl font-display font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground uppercase">Service Partners</div>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Ideas Carousel */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Choose your experience</h2>
            <p className="text-xl text-muted-foreground">Your Choice. Our Responsibility.</p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
              >
                {travelIdeasCards.map((idea) => (
                  <div key={idea.id} className="flex-shrink-0 px-3" style={{ width: '33.333%' }}>
                    <Link to="/travel-ideas" className="block group">
                      <div className="relative h-80 rounded-3xl overflow-hidden">
                        <img src={idea.image} alt={idea.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="font-display text-2xl font-bold text-white mb-2">{idea.name}</h3>
                          <p className="text-white/80">{idea.tours} Tours</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tours in Country */}
      {destinationTours.length > 0 && (
        <div className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-12">
              Explore {destination.name}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinationTours.map((tour) => (
                <Link key={tour.id} to={`/tours/${tour.slug}`} className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all">
                  <div className="relative h-64">
                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-xl shadow-lg">
                      <span className="font-display text-xl font-bold text-primary">${tour.price}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {tour.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-secondary text-secondary" />
                      <span className="font-semibold">{tour.rating}</span>
                      <span>({tour.reviews} reviews)</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Popular Destinations */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-2">Popular destinations</h2>
            <p className="text-xl text-primary">Must See Destinations</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherDestinations.map((dest) => (
              <Link key={dest.slug} to={`/destinations/${dest.slug}`} className="group relative h-96 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-display text-3xl font-bold text-white mb-2">{dest.name}</h3>
                  <p className="text-white/80 mb-3">{dest.tours} Tours Available</p>
                  <Button variant="secondary" size="sm" className="group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920" alt="Welcome" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/80 to-charcoal/90" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to Your Destination
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Ready to embark on your {destination.name} adventure? Let us help you plan the perfect journey.
          </p>
          <Link to="/contact">
            <Button variant="primary" size="xl" className="gap-2 shadow-2xl">
              Plan Your Trip
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      <NewsletterSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default DestinationDetail;
