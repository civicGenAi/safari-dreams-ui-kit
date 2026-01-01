import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, Filter } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Button } from '@/components/ui/button';
import { supabase, TravelIdea, Article } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingScreen } from '@/components/ui/loading';
import offer1 from "@/assets/ideas_home_discount.webp";
import offer2 from "@/assets/ideas_home_discount2.webp";

const TravelIdeas = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [travelIdeas, setTravelIdeas] = useState<TravelIdea[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [durationRange, setDurationRange] = useState<string>('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ideasResult, articlesResult] = await Promise.all([
        supabase
          .from('travel_ideas')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(9),
        supabase
          .from('articles')
          .select('*')
          .eq('status', 'published')
          .order('published_date', { ascending: false })
          .limit(4)
      ]);

      if (ideasResult.error) throw ideasResult.error;
      if (articlesResult.error) throw articlesResult.error;

      setTravelIdeas(ideasResult.data || []);
      setRecentArticles(articlesResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Get unique values for filters
  const categories = Array.from(new Set(travelIdeas.map(idea => idea.category)));

  // Apply filters
  const filteredIdeas = travelIdeas.filter(idea => {
    if (selectedCategory !== 'all' && idea.category !== selectedCategory) return false;

    if (priceRange !== 'all') {
      const price = idea.price;
      if (priceRange === 'budget' && price > 1000) return false;
      if (priceRange === 'mid' && (price < 1000 || price > 2500)) return false;
      if (priceRange === 'luxury' && price < 2500) return false;
    }

    if (durationRange !== 'all') {
      const duration = idea.duration;
      if (durationRange === 'short' && duration > 3) return false;
      if (durationRange === 'medium' && (duration < 4 || duration > 7)) return false;
      if (durationRange === 'long' && duration < 8) return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <LoadingScreen message="Loading travel ideas..." fullScreen={false} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src="/header_bg_new4.gif"
          alt="Travel Ideas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-white mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="mx-2">»</span>
              <span>Travel Ideas</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Travel Ideas
            </h1>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-8">
            Curated Travel Ideas in East Africa and the Holy Land
          </h2>

          <div className="max-w-5xl mx-auto space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Travel Ideas. DeMi Tours and Travel is a Tanzania-based travel agency that specializes in providing exceptional curated travel experiences. We offer a diverse range of tour packages, including migration safaris, romantic holidays, safari and beach holidays, adventure seekers, luxury tours, gorilla and chimp trekking, cross border safaris, and day tours. DeMi Tours' tour packages cover Tanzania, Kenya, Uganda, and Rwanda, providing travelers with the opportunity to explore East Africa's most sought-after destinations.
            </p>

            <p>
              In addition to our East African tours, DeMi Tours and Travel also offers pilgrimage tours to Egypt, Israel, and Jordan. Whether you're looking to embark on a spiritual journey or simply discover the beauty of the holy land, DeMi Tours has got you covered.
            </p>

            <p>
              DeMi Tours and Travel is committed to providing travelers with exceptional experiences that leave lasting memories. With our extensive knowledge of the region and years of experience in the travel industry, we ensure that our clients receive top-notch service, personalized attention, and expert guidance. Our team of experienced travel professionals works tirelessly to make sure that every aspect of your trip is taken care of, from the moment you arrive until the time you depart.
            </p>

            <p>
              Our mission is to provide travelers with sustainable, environmentally conscious adventures that allow them to explore the breathtaking natural beauty and rich wildlife of the region. As passionate advocates of responsible tourism, we believe that by traveling in an eco-friendly manner, we can help preserve these magnificent lands for future generations. Whether you're seeking an action-packed adventure, a peaceful escape into nature, or simply a chance to reconnect with the environment, our knowledgeable guides will lead you on a journey that is not only thrilling but also respectful of the ecosystem.
            </p>

            <p>
              Overall, DeMi Tours and Travel is the go-to travel agency for those seeking unforgettable travel experiences in East Africa and the Holy Land.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="py-8 bg-muted/10 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-lg">Filter Travel Ideas</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Budget (Under $1,000)</option>
                  <option value="mid">Mid-Range ($1,000 - $2,500)</option>
                  <option value="luxury">Luxury ($2,500+)</option>
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <select
                  value={durationRange}
                  onChange={(e) => setDurationRange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Durations</option>
                  <option value="short">Short (1-3 days)</option>
                  <option value="medium">Medium (4-7 days)</option>
                  <option value="long">Long (8+ days)</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Experience Our Travel Ideas */}
      <div className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Experience Our Travel Ideas
            </h2>
            <p className="text-muted-foreground">
              Showing {filteredIdeas.length} {filteredIdeas.length === 1 ? 'idea' : 'ideas'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredIdeas.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No travel ideas match your filters. Try adjusting your selection.</p>
              </div>
            ) : (
              filteredIdeas.map((idea) => {
              return (
                <Link
                  key={idea.slug}
                  to={`/travel-ideas/${idea.slug}`}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-[400px]"
                >
                  {/* Background Image */}
                  <img
                    src={idea.image}
                    alt={idea.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Curved Gradient Overlay - disappears on hover */}
                  <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`gradient-${idea.slug}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgb(28, 28, 30)" stopOpacity="0" />
                          <stop offset="40%" stopColor="rgb(28, 28, 30)" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="rgb(28, 28, 30)" stopOpacity="0.95" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0,200 Q 160,180 320,200 T 640,200 L 640,400 L 0,400 Z"
                        fill={`url(#gradient-${idea.slug})`}
                      />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="font-display text-2xl font-bold mb-3 text-white drop-shadow-lg">
                      {idea.title}
                    </h3>

                    <div className="flex items-center justify-between text-white">
                      <p className="text-sm text-white/90">
                        {idea.duration} {idea.duration === 1 ? 'Day' : 'Days'}
                      </p>
                      <p className="font-heading font-semibold">
                        <span className="text-sm text-white/90">from</span>
                        <span className="text-2xl ml-1 text-primary drop-shadow-lg">${idea.price.toLocaleString()}</span>
                      </p>
                    </div>

                    <p className="text-sm text-white/80 mt-2 line-clamp-2">{idea.description}</p>
                  </div>
                </Link>
              );
            })
          )}
          </div>
        </div>
      </div>

      {/* Last Minute Deals - Recent Blog Articles */}
      {recentArticles.length > 0 && (
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16">
              Last Minute Deals & Travel Stories
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/wild-tales/${article.slug}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    {article.featured_image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.featured_image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                          {article.category}
                        </span>
                        <span>{article.read_time} min read</span>
                      </div>
                      <h3 className="font-heading font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {article.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQs Section */}
      <div className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">
            FAQs On Our Travel Ideas
          </h2>

          {/* First FAQ with Images */}
          <div className="grid lg:grid-cols-[1fr,400px] gap-12 items-start mb-12">
            {/* What's included/excluded - Left */}
            <div>
              <h3 className="font-heading font-bold text-xl mb-6">
                Q. What's included and excluded in every tour?
              </h3>

              <div className="mb-6">
                <h4 className="font-heading font-semibold text-lg mb-4">Package includes:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>A well-maintained safari land cruiser with a roof hatch for enhanced game viewing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>A professional English-speaking safari guide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Airport transfers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>All government taxes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>All park fees for all the national parks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Meals and accommodations as per itinerary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Unlimited mineral water during the entire safari</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Mto Wa Mbu Cultural tour plus local lunch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Maasai Village visit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Evacuation Insurance – Amref Flying Doctors</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-heading font-semibold text-lg mb-4">Package excludes:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Local & international flights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Tips</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Drinks at the camps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Crater rim walk –$45 per person</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Walking safari in Manyara national park –$45 per person</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Night game drive in Manyara national park -$45 per person</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Balloon safari in Serengeti –$540 per person</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Promotional Offers - Right */}
            <div className="space-y-6">
              {/* Early Booking Offer */}
              <div className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 border-4 border-primary/60 hover:border-primary">
                <img
                   src={offer1}
                  alt="Early Booking Special Offer"
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
                <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                  Special Offer
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h4 className="font-display text-xl font-bold mb-2 drop-shadow-lg">Early Booking Discount</h4>
                  <p className="text-sm text-white/90 drop-shadow mb-3">Book in advance and save up to 20%</p>
                  <Link to="/contact">
                    <Button variant="primary" size="sm" className="w-full">
                      Get Offer
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Holiday Season Offer */}
              <div className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 border-4 border-primary/60 hover:border-primary">
                <img
                  src={offer2}
                  alt="Holiday Season Special Offer"
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
                <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                  Limited Time
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h4 className="font-display text-xl font-bold mb-2 drop-shadow-lg">Holiday Season Special</h4>
                  <p className="text-sm text-white/90 drop-shadow mb-3">Exclusive holiday packages available</p>
                  <Link to="/contact">
                    <Button variant="primary" size="sm" className="w-full">
                      Get Offer
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Other FAQs - Collapsible */}
          <div className="space-y-4 max-w-4xl">
            {[
              {
                question: 'Are children allowed on safari?',
                answer: 'Yes, children are welcome on our safaris. We offer family-friendly packages designed to accommodate travelers of all ages.'
              },
              {
                question: 'Do you cater for special needs?',
                answer: 'Yes, we accommodate special needs and dietary requirements. Please inform us in advance so we can make necessary arrangements.'
              },
              {
                question: 'What type of safari vehicles do you use?',
                answer: 'We use modern 4x4 safari vehicles with pop-up roofs for optimal game viewing and photography.'
              },
              {
                question: 'What are the road conditions like?',
                answer: 'Road conditions vary from paved highways to rough terrain in national parks. Our vehicles are well-maintained and suitable for all conditions.'
              },
              {
                question: 'What type of accommodation do you use?',
                answer: 'We offer a range from luxury lodges and tented camps to budget-friendly accommodations, all carefully selected for quality and location.'
              },
              {
                question: 'How is the food like?',
                answer: 'Our tours include diverse meals featuring both local and international cuisine, prepared to high standards of hygiene and quality.'
              },
              {
                question: 'Are there places to shop?',
                answer: 'Yes, most areas have local markets and shops where you can purchase souvenirs, crafts, and other items.'
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-border pb-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <h3 className="font-heading font-bold text-lg group-hover:text-primary transition-colors">
                    Q. {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ml-4 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <p className="text-muted-foreground leading-relaxed mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 md:py-32 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/header_bg_new4.gif"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/75 to-charcoal/85" />
        </div>

        {/* Animated SVG Background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Safari map pins */}
            <g fill="white">
              {[...Array(12)].map((_, i) => (
                <g key={i}>
                  <circle cx={100 + i * 150} cy={100 + (i % 4) * 120} r="8" />
                  <path d={`M ${100 + i * 150} ${100 + (i % 4) * 120} L ${100 + i * 150} ${120 + (i % 4) * 120} L ${95 + i * 150} ${115 + (i % 4) * 120} Z`}>
                    <animate attributeName="opacity" values="0.5;1;0.5" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                  </path>
                </g>
              ))}
            </g>

            {/* Travel routes - curved paths */}
            <g stroke="white" strokeWidth="2" fill="none" strokeDasharray="8,12">
              <path d="M 0 200 Q 200 150 400 200 T 800 200 Q 1000 150 1200 200 T 1600 200">
                <animate attributeName="stroke-dashoffset" values="0;80" dur="12s" repeatCount="indefinite" />
              </path>
              <path d="M 0 350 Q 200 300 400 350 T 800 350 Q 1000 300 1200 350 T 1600 350">
                <animate attributeName="stroke-dashoffset" values="80;0" dur="14s" repeatCount="indefinite" />
              </path>
              <path d="M 0 500 Q 200 450 400 500 T 800 500 Q 1000 450 1200 500 T 1600 500">
                <animate attributeName="stroke-dashoffset" values="0;80" dur="16s" repeatCount="indefinite" />
              </path>
            </g>

            {/* Idea lightbulbs */}
            <g stroke="white" strokeWidth="2" fill="none">
              {[...Array(6)].map((_, i) => (
                <g key={i}>
                  <circle cx={180 + i * 280} cy={280 + (i % 3) * 100} r="20">
                    <animate attributeName="opacity" values="0.4;0.9;0.4" dur={`${4 + i * 0.6}s`} repeatCount="indefinite" />
                  </circle>
                  <rect x={175 + i * 280} y={300 + (i % 3) * 100} width="10" height="15" rx="2" />
                  <line x1={165 + i * 280} y1={280 + (i % 3) * 100} x2={155 + i * 280} y2={280 + (i % 3) * 100}>
                    <animate attributeName="opacity" values="0;1;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                  </line>
                  <line x1={195 + i * 280} y1={280 + (i % 3) * 100} x2={205 + i * 280} y2={280 + (i % 3) * 100}>
                    <animate attributeName="opacity" values="0;1;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" begin={`${0.5 + i * 0.2}s`} />
                  </line>
                </g>
              ))}
            </g>

            {/* Experience stars */}
            <g fill="white">
              {[...Array(15)].map((_, i) => (
                <polygon
                  key={i}
                  points={`${120 + i * 120},${50 + (i % 5) * 110} ${125 + i * 120},${60 + (i % 5) * 110} ${135 + i * 120},${60 + (i % 5) * 110} ${128 + i * 120},${67 + (i % 5) * 110} ${132 + i * 120},${77 + (i % 5) * 110} ${120 + i * 120},${70 + (i % 5) * 110} ${108 + i * 120},${77 + (i % 5) * 110} ${112 + i * 120},${67 + (i % 5) * 110} ${105 + i * 120},${60 + (i % 5) * 110} ${115 + i * 120},${60 + (i % 5) * 110}`}
                >
                  <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${4 + i * 0.4}s`} repeatCount="indefinite" />
                  <animateTransform attributeName="transform" type="rotate" values={`0 ${120 + i * 120} ${60 + (i % 5) * 110}; 360 ${120 + i * 120} ${60 + (i % 5) * 110}`} dur={`${15 + i * 2}s`} repeatCount="indefinite" />
                </polygon>
              ))}
            </g>

            {/* Compass decorations */}
            <g stroke="white" strokeWidth="2" fill="none">
              {[...Array(4)].map((_, i) => (
                <g key={i}>
                  <circle cx={300 + i * 400} cy={400 + (i % 2) * 150} r="35">
                    <animate attributeName="opacity" values="0.4;0.7;0.4" dur={`${5 + i * 0.8}s`} repeatCount="indefinite" />
                  </circle>
                  <line x1={300 + i * 400} y1={365 + (i % 2) * 150} x2={300 + i * 400} y2={380 + (i % 2) * 150}>
                    <animateTransform attributeName="transform" type="rotate" values={`0 ${300 + i * 400} ${400 + (i % 2) * 150}; 360 ${300 + i * 400} ${400 + (i % 2) * 150}`} dur={`${18 + i * 3}s`} repeatCount="indefinite" />
                  </line>
                </g>
              ))}
            </g>
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 drop-shadow-lg">
            Exceptional Curated Travel Ideas & Experiences !
          </h2>
          <Link to="/contact">
            <Button variant="primary" size="xl" className="gap-2 shadow-2xl">
              Start Exploring
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

export default TravelIdeas;
