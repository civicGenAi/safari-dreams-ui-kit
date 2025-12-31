import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, Palmtree, Mountain, Crown, Footprints, MapPin, Clock, ChevronDown, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Button } from '@/components/ui/button';

const TravelIdeas = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const travelIdeas = [
    {
      name: 'Migration Safaris',
      slug: 'migration-safaris',
      icon: Compass,
      tours: '6+',
      price: '1,520',
      image: '/src/assets/idea/ideas_migration_wildebeast.webp',
      description: 'Witness the great wildebeest migration'
    },
    {
      name: 'Romantic Holidays',
      slug: 'romantic-holidays',
      icon: Heart,
      tours: '8+',
      price: '2,100',
      image: '/src/assets/idea/ideas_romantic_holiday.webp',
      description: 'Perfect getaways for couples'
    },
    {
      name: 'Safari Beach Holidays',
      slug: 'safari-beach-holidays',
      icon: Palmtree,
      tours: '10+',
      price: '1,850',
      image: '/src/assets/idea/ideas_safari_beach.webp',
      description: 'Best of both worlds: safari and beach'
    },
    {
      name: 'Adventure Seekers',
      slug: 'adventure-seekers',
      icon: Mountain,
      tours: '12+',
      price: '980',
      image: '/src/assets/idea/idea_adventure_kilimanjaro.webp',
      description: 'Thrilling experiences for adventurers'
    },
    {
      name: 'Luxury Tours',
      slug: 'luxury-tours',
      icon: Crown,
      tours: '7+',
      price: '3,500',
      image: '/src/assets/idea/idea_luxury_poolside.webp',
      description: 'Premium safari experiences'
    },
    {
      name: 'Gorilla and Chimp Trekking',
      slug: 'gorilla-chimp-trekking',
      icon: Footprints,
      tours: '5+',
      price: '2,800',
      image: '/src/assets/idea/idea_gorilla_chimp_trek.webp',
      description: 'Encounter mountain gorillas and chimps'
    },
    {
      name: 'Cross Border Safaris',
      slug: 'cross-border-safaris',
      icon: MapPin,
      tours: '9+',
      price: '2,200',
      image: '/src/assets/idea/idea_crossborder_elephants.webp',
      description: 'Explore multiple East African countries'
    },
    {
      name: 'Day Tours',
      slug: 'day-tours',
      icon: Clock,
      tours: '8+',
      price: '255',
      image: '/src/assets/idea/tour_daytour_mandarahut_hike.webp',
      description: 'Short excursions and day trips'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src="/src/assets/header_bg_new4.gif"
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

      {/* Experience Our Travel Ideas */}
      <div className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16">
            Experience Our Travel Ideas
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {travelIdeas.map((idea) => {
              const IconComponent = idea.icon;
              return (
                <Link
                  key={idea.slug}
                  to={`/travel-ideas/${idea.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Hover Image */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <img
                      src={idea.image}
                      alt={idea.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/60 to-charcoal/30" />
                  </div>

                  {/* Content */}
                  <div className="relative p-8 flex flex-col items-center text-center min-h-[320px] justify-center group-hover:text-white transition-colors duration-500">
                    <div className="w-20 h-20 rounded-full bg-primary/10 group-hover:bg-white/20 flex items-center justify-center mb-6 transition-colors duration-500">
                      <IconComponent className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-500" />
                    </div>

                    <h3 className="font-display text-xl font-bold mb-4 group-hover:text-white">
                      {idea.name}
                    </h3>

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground group-hover:text-white/90">
                        {idea.tours} Tours+
                      </p>
                      <p className="font-heading font-semibold">
                        <span className="text-sm group-hover:text-white/90">from</span>
                        <span className="text-2xl ml-1 text-primary group-hover:text-white">${idea.price}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="py-16 md:py-24">
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

            {/* Images - Right */}
            <div className="space-y-6">
              <img
                src="/src/assets/idea/ideas_home_discount.webp"
                alt="Safari Wildlife"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
              <img
                src="/src/assets/idea/ideas_home_discount2.webp"
                alt="Safari Experience"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
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
            src="/src/assets/zebras-gd702c488e_1920.webp"
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
