import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, X } from 'lucide-react';

// Travel idea categories with pricing
const travelCategories = [
  {
    id: 1,
    name: 'Adventure Seekers',
    slug: 'adventure-seekers',
    icon: '🏔️',
    tours: '6+',
    price: '$1,520',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600',
    description: 'Thrilling adventures for the bold and daring'
  },
  {
    id: 2,
    name: 'Migration Safari',
    slug: 'migration-safari',
    icon: '🦓',
    tours: '6+',
    price: '$1,250',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600',
    description: 'Witness the Great Migration spectacle'
  },
  {
    id: 3,
    name: 'Romantic Holidays',
    slug: 'romantic-holidays',
    icon: '💑',
    tours: '8+',
    price: '$255',
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600',
    description: 'Perfect getaways for couples'
  },
  {
    id: 4,
    name: 'Safari Beach Holidays',
    slug: 'safari-beach-holidays',
    icon: '🏖️',
    tours: '6+',
    price: '$2,230',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
    description: 'Best of both: safari and beach'
  },
  {
    id: 5,
    name: 'Luxury Tours',
    slug: 'luxury-tours',
    icon: '✨',
    tours: '2+',
    price: '$5,600',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600',
    description: 'Ultimate luxury experiences'
  },
  {
    id: 6,
    name: 'Gorilla & Chimp Trekking',
    slug: 'gorilla-chimp-trekking',
    icon: '🦍',
    tours: '10+',
    price: '$1,680',
    image: 'https://images.unsplash.com/photo-1583867095486-3e0e2e66cf44?w=600',
    description: 'Meet our primate cousins'
  },
  {
    id: 7,
    name: 'Cross Border Safari',
    slug: 'cross-border-safari',
    icon: '🌍',
    tours: '4+',
    price: '$415',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600',
    description: 'Explore multiple countries'
  },
  {
    id: 8,
    name: 'Cross Border Trekking',
    slug: 'cross-border-trekking',
    icon: '🥾',
    tours: '3+',
    price: '$2,620',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600',
    description: 'Epic trekking adventures'
  },
  {
    id: 9,
    name: 'Pilgrimages',
    slug: 'pilgrimages',
    icon: '⛪',
    tours: '2+',
    price: '$2,500',
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600',
    description: 'Spiritual journeys to holy lands'
  },
];

const TravelIdeas = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section with Header Background */}
      <div className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/src/assets/header_bg_new4.gif"
            alt="Safari background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/85 to-charcoal/80" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              Curated Travel Ideas in <span className="text-gradient-gold">East Africa</span> and the Holy Land
            </h1>

            <div className="inline-block bg-primary/20 px-6 py-2 rounded-full mb-8 border border-primary/30">
              <span className="font-heading font-semibold text-white text-lg">Travel Ideas</span>
            </div>

            <div className="space-y-4 text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">
              <p>
                DeMi Tours and Travel is a Tanzania-based travel agency that specializes in providing exceptional curated travel experiences. We offer a diverse range of tour packages, including migration safaris, romantic holidays, safari and beach holidays, adventure seekers, luxury tours, gorilla and chimp trekking, cross border safaris, and day tours.
              </p>
              <p>
                DeMi Tours' tour packages cover Tanzania, Kenya, Uganda, and Rwanda, providing travelers with the opportunity to explore East Africa's most sought-after destinations.
              </p>
              <p>
                In addition to our East African tours, DeMi Tours and Travel also offers pilgrimage tours to Egypt, Israel, and Jordan. Whether you're looking to embark on a spiritual journey or simply discover the beauty of the holy land, DeMi Tours has got you covered.
              </p>
              <p>
                DeMi Tours and Travel is committed to providing travelers with exceptional experiences that leave lasting memories. With our extensive knowledge of the region and years of experience in the travel industry, we ensure that our clients receive top-notch service, personalized attention, and expert guidance.
              </p>
              <p>
                Our mission is to provide travelers with sustainable, environmentally conscious adventures that allow them to explore the breathtaking natural beauty and rich wildlife of the region. As passionate advocates of responsible tourism, we believe that by traveling in an eco-friendly manner, we can help preserve these magnificent lands for future generations.
              </p>
              <p className="font-medium text-white">
                Overall, DeMi Tours and Travel is the go-to travel agency for those seeking unforgettable travel experiences in East Africa and the Holy Land.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Categories Section */}
      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
            Experience Our <span className="text-gradient-gold">Travel Ideas</span>
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Choose from our carefully curated travel experiences designed to create unforgettable memories
          </p>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelCategories.map((category) => (
              <Link
                key={category.id}
                to={`/travel-ideas/${category.slug}`}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Image (shown on hover) */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  hoveredCard === category.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
                </div>

                {/* Default Background */}
                <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm transition-opacity duration-300 ${
                  hoveredCard === category.id ? 'opacity-0' : 'opacity-100'
                }`} />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-center p-8 z-10">
                  <div className={`text-6xl mb-4 transition-transform duration-300 ${
                    hoveredCard === category.id ? 'scale-110' : 'scale-100'
                  }`}>
                    {category.icon}
                  </div>

                  <h3 className={`font-display text-2xl font-bold mb-2 transition-colors ${
                    hoveredCard === category.id ? 'text-white' : 'text-foreground'
                  }`}>
                    {category.name}
                  </h3>

                  <p className={`text-sm mb-4 transition-colors ${
                    hoveredCard === category.id ? 'text-white/80' : 'text-muted-foreground'
                  }`}>
                    {category.description}
                  </p>

                  <div className={`flex items-center gap-2 mb-4 ${
                    hoveredCard === category.id ? 'text-white' : 'text-foreground'
                  }`}>
                    <span className="font-heading font-semibold">{category.tours} tours</span>
                    <span>•</span>
                    <span className="font-display text-xl font-bold text-primary">
                      from {category.price}
                    </span>
                  </div>

                  <Button
                    variant={hoveredCard === category.id ? 'gold' : 'outline'}
                    size="sm"
                    className="gap-2 group-hover:gap-3 transition-all"
                  >
                    Explore Tours
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-12">
            FAQs On Our <span className="text-gradient-gold">Travel Ideas</span>
          </h2>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Image */}
            <div className="lg:col-span-3 hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400"
                alt="Safari vehicle"
                className="rounded-2xl shadow-lg w-full h-auto sticky top-24"
              />
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-6 space-y-8">
              {/* Main FAQ */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-md">
                <h3 className="font-heading font-bold text-xl mb-4 text-primary">
                  What's included and excluded in every tour?
                </h3>

                <div className="space-y-6">
                  {/* Package Includes */}
                  <div>
                    <h4 className="font-heading font-semibold mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      Package includes:
                    </h4>
                    <ul className="space-y-2 ml-8">
                      <li className="text-muted-foreground flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>A well-maintained safari land cruiser with a roof hatch for enhanced game viewing</span>
                      </li>
                      <li className="text-muted-foreground flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>A professional English-speaking safari guide</span>
                      </li>
                      <li className="text-muted-foreground flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Airport transfers</span>
                      </li>
                      <li className="text-muted-foreground flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>All government taxes</span>
                      </li>
                      <li className="text-muted-foreground flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>All park fees for all the national parks</span>
                      </li>
                      <li className="text-muted-foreground flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Meals and accommodations as per itinerary</span>
                      </li>
                      <li className="text-muted-foreground flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Unlimited mineral water during the entire safari</span>
                      </li>
                      <li className="text-muted-foreground flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Mto Wa Mbu Cultural tour plus local lunch</span>
                      </li>
                      <li className="text-muted-foreground flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Maasai Village visit</span>
                      </li>
                      <li className="text-muted-foreground flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>Evacuation Insurance – Amref Flying Doctors</span>
                      </li>
                    </ul>
                  </div>

                  {/* Package Excludes */}
                  <div>
                    <h4 className="font-heading font-semibold mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                        <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      Package excludes:
                    </h4>
                    <ul className="space-y-2 ml-8">
                      <li className="text-muted-foreground flex items-start gap-2">
                        <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                        <span>Local & international flights</span>
                      </li>
                      <li className="text-muted-foreground flex items-start gap-2">
                        <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                        <span>Tips</span>
                      </li>
                      <li className="text-muted-foreground flex items-start gap-2">
                        <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                        <span>Drinks at the camps</span>
                      </li>
                      <li className="text-muted-foreground flex items-start gap-2">
                        <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                        <span>Crater rim walk – $45 per person</span>
                      </li>
                      <li className="text-muted-foreground flex items-start gap-2">
                        <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                        <span>Walking safari in Manyara national park – $45 per person</span>
                      </li>
                      <li className="text-muted-foreground flex items-start gap-2">
                        <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                        <span>Night game drive in Manyara national park - $45 per person</span>
                      </li>
                      <li className="text-muted-foreground flex items-start gap-2">
                        <X className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                        <span>Balloon safari in Serengeti – $540 per person</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Other FAQs */}
              <div className="space-y-4">
                {[
                  { q: 'Are children allowed on safari?', a: 'Yes, children are welcome on safari. However, some lodges have age restrictions and certain activities may have minimum age requirements for safety reasons.' },
                  { q: 'Do you cater for special needs?', a: 'Absolutely! We accommodate various dietary requirements, accessibility needs, and special requests. Please inform us in advance so we can make appropriate arrangements.' },
                  { q: 'What type of safari vehicles do you use?', a: 'We use well-maintained 4x4 Land Cruisers with pop-up roofs for optimal game viewing and photography opportunities.' },
                  { q: 'What are the road conditions like?', a: 'Road conditions vary from paved highways to rough terrain in national parks. Our experienced drivers are skilled in handling all conditions safely.' },
                  { q: 'What type of accommodation do you use?', a: 'We offer a range from luxury lodges to comfortable tented camps, all carefully selected for quality, location, and authentic safari experience.' },
                  { q: 'How is the food like?', a: 'Expect delicious meals with a mix of international and local cuisine. We accommodate all dietary requirements when notified in advance.' },
                  { q: 'Are there places to shop?', a: 'Yes, you\'ll have opportunities to visit local markets, craft shops, and cultural centers where you can purchase authentic souvenirs and support local communities.' },
                ].map((faq, index) => (
                  <details key={index} className="bg-card rounded-xl p-6 border border-border group">
                    <summary className="font-heading font-semibold cursor-pointer flex items-center justify-between">
                      {faq.q}
                      <ArrowRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                    </summary>
                    <p className="mt-3 text-muted-foreground">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-3 hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400"
                alt="Safari wildlife"
                className="rounded-2xl shadow-lg w-full h-auto sticky top-24"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Exceptional Curated Travel Ideas & <span className="text-gradient-gold">Experiences</span> !
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start planning your dream African adventure today with our expert team
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact">
              <Button variant="gold" size="xl" className="gap-2">
                Request Free Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/tours">
              <Button variant="outline" size="xl" className="gap-2">
                Browse All Tours
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default TravelIdeas;
