import { Link } from 'react-router-dom';
import { Compass, Heart, Palmtree, Mountain, Crown, Footprints, MapPin, Clock, Church } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import NewsletterSection from '../components/NewsletterSection';

const TravelIdeas = () => {
  const travelIdeas = [
    {
      name: 'Migration Safaris',
      slug: 'migration-safaris',
      icon: Compass,
      tours: '6+',
      price: '1,520',
      image: '/src/assets/ideas_migration.jpg',
      description: 'Witness the great wildebeest migration'
    },
    {
      name: 'Romantic Holidays',
      slug: 'romantic-holidays',
      icon: Heart,
      tours: '8+',
      price: '2,100',
      image: '/src/assets/ideas_romantic.jpg',
      description: 'Perfect getaways for couples'
    },
    {
      name: 'Safari Beach Holidays',
      slug: 'safari-beach-holidays',
      icon: Palmtree,
      tours: '10+',
      price: '1,850',
      image: '/src/assets/ideas_beach.jpg',
      description: 'Best of both worlds: safari and beach'
    },
    {
      name: 'Adventure Seekers',
      slug: 'adventure-seekers',
      icon: Mountain,
      tours: '12+',
      price: '980',
      image: '/src/assets/ideas_adventure.jpg',
      description: 'Thrilling experiences for adventurers'
    },
    {
      name: 'Luxury Tours',
      slug: 'luxury-tours',
      icon: Crown,
      tours: '7+',
      price: '3,500',
      image: '/src/assets/ideas_luxury.jpg',
      description: 'Premium safari experiences'
    },
    {
      name: 'Gorilla and Chimp Trekking',
      slug: 'gorilla-chimp-trekking',
      icon: Footprints,
      tours: '5+',
      price: '2,800',
      image: '/src/assets/ideas_gorilla.jpg',
      description: 'Encounter mountain gorillas and chimps'
    },
    {
      name: 'Cross Border Safaris',
      slug: 'cross-border-safaris',
      icon: MapPin,
      tours: '9+',
      price: '2,200',
      image: '/src/assets/ideas_crossborder.jpg',
      description: 'Explore multiple East African countries'
    },
    {
      name: 'Day Tours',
      slug: 'day-tours',
      icon: Clock,
      tours: '8+',
      price: '255',
      image: '/src/assets/ideas_daytour.jpg',
      description: 'Short excursions and day trips'
    },
    {
      name: 'Pilgrimages',
      slug: 'pilgrimages',
      icon: Church,
      tours: '4+',
      price: '3,200',
      image: '/src/assets/ideas_pilgrimage.jpg',
      description: 'Spiritual journeys to the Holy Land'
    }
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
          <div className="grid lg:grid-cols-[1fr,400px] gap-12 items-start">
            {/* FAQs - Left */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
                FAQs On Our Travel Ideas
              </h2>

              <div className="space-y-6">
                <div className="border-b border-border pb-6">
                  <h3 className="font-heading font-bold text-lg mb-3">
                    Are children allowed on safari?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Yes, children are welcome on our safaris. We offer family-friendly packages designed to accommodate travelers of all ages.
                  </p>
                </div>

                <div className="border-b border-border pb-6">
                  <h3 className="font-heading font-bold text-lg mb-3">
                    Do you cater for special needs?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Yes, we accommodate special needs and dietary requirements. Please inform us in advance so we can make necessary arrangements.
                  </p>
                </div>

                <div className="border-b border-border pb-6">
                  <h3 className="font-heading font-bold text-lg mb-3">
                    What type of safari vehicles do you use?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We use modern 4x4 safari vehicles with pop-up roofs for optimal game viewing and photography.
                  </p>
                </div>

                <div className="border-b border-border pb-6">
                  <h3 className="font-heading font-bold text-lg mb-3">
                    What are the road conditions like?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Road conditions vary from paved highways to rough terrain in national parks. Our vehicles are well-maintained and suitable for all conditions.
                  </p>
                </div>

                <div className="border-b border-border pb-6">
                  <h3 className="font-heading font-bold text-lg mb-3">
                    What type of accommodation do you use?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We offer a range from luxury lodges and tented camps to budget-friendly accommodations, all carefully selected for quality and location.
                  </p>
                </div>

                <div className="border-b border-border pb-6">
                  <h3 className="font-heading font-bold text-lg mb-3">
                    How is the food like?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our tours include diverse meals featuring both local and international cuisine, prepared to high standards of hygiene and quality.
                  </p>
                </div>

                <div className="pb-6">
                  <h3 className="font-heading font-bold text-lg mb-3">
                    Are there places to shop?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Yes, most areas have local markets and shops where you can purchase souvenirs, crafts, and other items.
                  </p>
                </div>
              </div>
            </div>

            {/* Images - Right */}
            <div className="space-y-6">
              <img
                src="/src/assets/faq_safari1.jpg"
                alt="Safari Wildlife"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
              <img
                src="/src/assets/faq_safari2.jpg"
                alt="Safari Experience"
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

export default TravelIdeas;
