import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import NewsletterSection from '../components/NewsletterSection';
import { Button } from '@/components/ui/button';

const TravelIdeaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [showFilters, setShowFilters] = useState({
    price: true,
    categories: true,
    destinations: true,
    reviews: true
  });

  const travelIdeaData: any = {
    'migration-safaris': {
      name: 'Migration Safaris',
      title: 'The Great Migration, survival of the fittest',
      image: '/src/assets/migration_hero.jpg',
      description: [
        'Migration safari is a popular tour package in Kenya and Tanzania, attracting tourists from all over the world. It offers an opportunity to witness the great wildebeest migration, a natural spectacle that occurs annually as millions of wildebeest and other animals move from the Serengeti in Tanzania to the Maasai Mara in Kenya. This travel idea is popular with wildlife enthusiasts, photographers, and nature lovers, offering a unique opportunity to witness one of the greatest natural shows on earth.',
        'At DeMi Tours and Travel we offer migration safari experiences in Kenya and Tanzania. We offer a range of packages to cater to different needs and budgets, from luxury safaris to more affordable options. The tour packages usually include accommodations, meals, transportation, and guided game drives.',
        'The migration safari tour packages offer an opportunity to witness not only the wildebeest migration but also other wildlife such as lions, cheetahs, elephants, and giraffes. Tourists can also interact with the local Maasai people, who have lived in the region for centuries and have a unique culture.'
      ],
      tours: [
        {
          title: 'Survival of the Fittest: The Grumeti River Crossing',
          location: 'Lake Manyara, Ngorongoro Crater, Serengeti National Park, Tanzania',
          duration: '7 days',
          price: '3,150',
          image: '/src/assets/tour_migration1.jpg'
        },
        {
          title: 'Great Migration Safari Experience',
          location: 'Serengeti National Park, Maasai Mara, Kenya',
          duration: '10 days',
          price: '4,200',
          image: '/src/assets/tour_migration2.jpg'
        }
      ]
    }
  };

  const idea = travelIdeaData[slug || ''];

  if (!idea) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Travel Idea Not Found</h1>
          <Link to="/travel-ideas">
            <Button variant="primary">Back to Travel Ideas</Button>
          </Link>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  const lastMinuteDeals = [
    {
      title: 'Kenya to Tanzania through Amboseli National Park',
      price: '3,728',
      image: '/src/assets/deal1.jpg'
    },
    {
      title: 'Explore Rwanda & Uganda in 5 Days of Gorilla Adventure',
      price: '2,573',
      image: '/src/assets/deal2.jpg'
    },
    {
      title: 'Day Tour Kilimanjaro – Mandara Hut',
      price: '360',
      image: '/src/assets/deal3.jpg'
    },
    {
      title: 'Day Trip To Kikuletwa Hot Springs/ Maji Moto',
      price: '255',
      image: '/src/assets/deal4.jpg'
    }
  ];

  const faqs = [
    {
      question: 'What is the climate like in Tanzania?',
      answer: 'Tanzania lies a few degrees south of the equator, enjoying a moderate tropical climate with seasons regulated by rainfall rather than temperature. The coast, including the largest city Dar es Salaam and the islands of Zanzibar, are hot and humid with cooling breezes off the Indian Ocean.'
    },
    { question: 'When is the best time to go on safari in Tanzania?', answer: '' },
    { question: 'How early should I book my safari?', answer: '' },
    { question: 'How much does a Tanzania safari cost?', answer: '' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeCategory={slug} />

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src="/src/assets/header_bg_new4.gif"
          alt={idea.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-white mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="mx-2">»</span>
              <span>{idea.name}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              {idea.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <img
                src={idea.image}
                alt={idea.name}
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
              />
            </div>

            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                {idea.title}
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                {idea.description.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <Link to="/contact">
                <Button variant="primary" size="lg" className="gap-2">
                  Contact Us
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tours Section with Sidebar */}
      <div className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-[1fr,350px] gap-12">
            {/* Tours Grid */}
            <div>
              <div className="grid md:grid-cols-2 gap-8">
                {idea.tours.map((tour: any, index: number) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">{tour.location}</p>
                      <h3 className="font-heading font-bold text-lg mb-4 line-clamp-2">
                        {tour.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{tour.duration}</span>
                        <span className="font-heading font-bold text-xl text-primary">
                          From ${tour.price}
                        </span>
                      </div>
                      <button className="w-full mt-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                        More Information
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Filters */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-heading font-bold text-lg mb-6">Filter by</h3>

                {/* Price Range */}
                <div className="mb-6 border-b border-border pb-6">
                  <button
                    onClick={() => setShowFilters({ ...showFilters, price: !showFilters.price })}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <span className="font-heading font-semibold">Price Range</span>
                    {showFilters.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {showFilters.price && (
                    <div className="space-y-2">
                      <input type="range" className="w-full" />
                    </div>
                  )}
                </div>

                {/* Categories */}
                <div className="mb-6 border-b border-border pb-6">
                  <button
                    onClick={() => setShowFilters({ ...showFilters, categories: !showFilters.categories })}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <span className="font-heading font-semibold">Categories</span>
                    {showFilters.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {showFilters.categories && (
                    <div className="space-y-2">
                      {['Adventure Seekers', 'Cross Border Safaris', 'Day Tours', 'Gorilla and Chimp Trekking', 'Luxury Tours', 'Migration Safaris', 'Pilgrimages', 'Romantic Holidays', 'Safari Beach Holidays'].map((cat) => (
                        <label key={cat} className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="rounded" />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Destinations */}
                <div className="mb-6 border-b border-border pb-6">
                  <button
                    onClick={() => setShowFilters({ ...showFilters, destinations: !showFilters.destinations })}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <span className="font-heading font-semibold">Destinations</span>
                    {showFilters.destinations ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {showFilters.destinations && (
                    <div className="space-y-2">
                      {['Egypt', 'Israel', 'Jordan', 'Kenya', 'Rwanda', 'Tanzania', 'Uganda'].map((dest) => (
                        <label key={dest} className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="rounded" />
                          <span>{dest}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Reviews */}
                <div>
                  <button
                    onClick={() => setShowFilters({ ...showFilters, reviews: !showFilters.reviews })}
                    className="flex items-center justify-between w-full mb-4"
                  >
                    <span className="font-heading font-semibold">Reviews</span>
                    {showFilters.reviews ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {showFilters.reviews && (
                    <div className="space-y-2">
                      {['5 Stars', '4 Stars & Up', '3 Stars & Up', '2 Stars & Up', '1 Stars & Up'].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="rounded" />
                          <span>{rating}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Last Minute Deals */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-heading font-bold text-lg mb-6">Last Minute Deals</h3>
                <div className="space-y-4">
                  {lastMinuteDeals.map((deal, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative h-32 rounded-lg overflow-hidden mb-2">
                        <img
                          src={deal.image}
                          alt={deal.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="text-sm font-semibold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                        {deal.title}
                      </h4>
                      <p className="text-sm font-bold text-primary">From ${deal.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
            FAQs For Tour Packages
          </h2>

          <div className="grid lg:grid-cols-[1fr,500px] gap-12 items-start">
            {/* FAQs */}
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-border pb-6">
                  <h3 className="font-heading font-bold text-lg mb-3">
                    Q. {faq.question}
                  </h3>
                  {faq.answer && (
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Images */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/src/assets/faq1.jpg"
                alt="FAQ"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
              <img
                src="/src/assets/faq2.jpg"
                alt="FAQ"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <NewsletterSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default TravelIdeaDetail;
