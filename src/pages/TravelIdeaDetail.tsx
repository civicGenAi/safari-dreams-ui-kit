import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Button } from '@/components/ui/button';

const TravelIdeaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState({
    price: true,
    categories: true,
    destinations: true,
    reviews: true
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
        { title: 'Wildlife and Scenery, Magical Kenya at its best', location: 'Amboseli, Lake Nakuru, Maasai Mara - Kenya', duration: '8 days', price: '3,129', popular: false },
        { title: 'Experience Kenya from North to South', location: 'Ol Pejeta Conservancy, Lake Naivasha, Maasai Mara - Kenya', duration: '7 days', price: '2,919', popular: true },
        { title: 'Journey to Tanzania. A comprehensive wildlife tour.', location: 'Lake Manyara, Ngorongoro Crater, Serengeti National Park, Tanzania', duration: '6 days', price: '2,751', popular: false },
        { title: 'Tanzania\'s breathtaking wilderness in 6-days', location: 'Tarangire, Manyara, Ngorongoro & Serengeti, Tanzania', duration: '6 days', price: '2,641', popular: false },
        { title: 'Tanzania Classic Safari Tour', location: 'Tarangire, Manyara, Ngorongoro & Serengeti, Tanzania', duration: '7 days', price: '3,003', popular: false },
        { title: 'The Daring Mara River Crossing of the Great Migration', location: 'Lake Manyara, Ngorongoro Crater, Serengeti National Park, Tanzania', duration: '7 days', price: '3,061', popular: false },
        { title: 'Survival of the Fittest: The Grumeti River Crossing', location: 'Lake Manyara, Ngorongoro Crater, Serengeti National Park, Tanzania', duration: '7 days', price: '3,150', popular: false },
        { title: 'Thrilling Four Day, Big Five Adventure Awaits', location: 'Tarangire National Park, Lake Manyara National Park, Ngorongoro Crater, Tanzania', duration: '4 days', price: '1,764', popular: true },
        { title: 'The Great Migration, Calving Season, Ndutu Area', location: 'Lake Manyara National Park, Ngorongoro Crater to Serengeti National Park, Tanzania', duration: '7 days', price: '3,082', popular: false },
        { title: 'The Great Annual Migration Trek: Kenya & Tanzania', location: 'Masai Mara, Kenya & Serengeti, Tanzania', duration: '10 days', price: '4,982', popular: false }
      ]
    },
    'romantic-holidays': {
      name: 'Romantic Holidays',
      title: 'Come Enjoy Honey on the Moon',
      image: '/src/assets/romantic_hero.jpg',
      description: [
        'Romantic holidays in East Africa offer couples an opportunity to create unforgettable memories in some of the most stunning locations in the world. From pristine beaches to luxurious lodges, East Africa has a range of romantic holiday packages to cater to different preferences and budgets.',
        'At Demi Tours & Travel we offer romantic holiday packages within East Africa. Our experiences include luxury beach villas, secluded lodges, and romantic city breaks. The packages usually include accommodations, meals, transportation, and romantic activities such as sunset cruises, private dinners, and couples\' massages.',
        'We understand the importance of crafting a romantic experience that allows couples to reconnect and unwind. We go the extra mile to ensure that our clients have a memorable experience that will last a lifetime. Its time to rekindle the flame, check out our romantic holidays.'
      ],
      tours: [
        { title: 'A Romantic Expedition Through Tanzania\'s World Heritage Sites', location: 'Tanzania', duration: '9 days', price: '4,027', popular: true },
        { title: 'Wild Romance: Tanzania\'s Big Five Safari and Beach Getaway', location: 'Tarangire, Lake Manyara & Ngorongoro, Zanzibar in Tanzania', duration: '8 days', price: '2,889', popular: true },
        { title: 'Honey On the Moon, Nine days of Bliss In Tanzania.', location: 'Arusha,Tanzania', duration: '9 days', price: '6,116', popular: false }
      ]
    },
    'safari-beach-holidays': {
      name: 'Safari Beach Holidays',
      title: 'Wild Adventure and Beach Bliss',
      image: '/src/assets/beach_hero.jpg',
      description: [
        'Safari Beach Holidays experiences in East Africa offer the perfect combination of adventure and relaxation. The tour packages usually include a safari experience in the wilderness, followed by a beach holiday on the Indian Ocean coast.',
        'At Demi Tours and Travel we offer a range of safari beach holidays that include accommodations, meals, transportation, and activities such as game drives, guided walks, and beach excursions.',
        'Our most popular destinations for safari and beach tours in East Africa include the Maasai Mara in Kenya. The Serengeti and Ngorongoro Crater in Tanzania. For relaxation, the coastal towns of Mombasa and Zanzibar and most ideal. These destinations offer an opportunity to witness the Big Five, as well as other wildlife. After the safari head to the coast and enjoy the pristine beaches along the Indian Ocean.',
        'The safari and beach experiences are designed to cater to different budgets and preferences. For those seeking a luxurious experience, there are options for high-end lodges and resorts. If you are on a budget, we have you covered with affordable options.'
      ],
      tours: [
        { title: 'Northern Circuit Tanzania Safari with Beach Extension', location: 'Tarangire, L.Manyara, Ngorongoro, Serengeti, Zanzibar in Tanzania', duration: '10 days', price: '3,917', popular: false },
        { title: 'Wild Romance: Tanzania\'s Big Five Safari and Beach Getaway', location: 'Tarangire, Lake Manyara & Ngorongoro, Zanzibar in Tanzania', duration: '8 days', price: '2,889', popular: true }
      ]
    },
    'adventure-seekers': {
      name: 'Adventure Seekers',
      title: 'Conquer Tanzania\'s Thrilling Outdoors',
      image: '/src/assets/adventure_hero.jpg',
      description: [
        'DeMi Tours and Travel offer adventure tour packages in East Africa. We offer a range of packages that cater to different adventure activities such as trekking, mountain climbing, white water rafting, and biking, among others.',
        'Our adventure experiences are crafted towards different levels of expertise, from beginners to experienced adventurers. We provide experienced guides and equipment for the different activities to ensure the safety of their clients.',
        'Adventure seekers in East Africa can also enjoy wildlife safaris and cultural experiences as part of their tour packages. The region is home to a rich diversity of wildlife and cultures that are worth exploring.',
        'At DeMi Tours, we understand the importance of creating a unique and memorable experience for our travellers. We work to ensure that our clients have a thrilling experience and also learn about the local culture and environment.'
      ],
      tours: [
        { title: 'Adventure to the Kilimanjaro summit using the Umbwe Route', location: 'Umbwe Route, Kilimanjaro, Tanzania', duration: '8 days', price: '1,622', popular: false },
        { title: 'Mt.Kilimanjaro via the Shira Route, An Epic Adventure', location: 'Shira Route,Kilimanjaro, Tanzania', duration: '8 days', price: '1,596', popular: false },
        { title: 'Conquering Mt. Kilimanjaro via the Northern Circuit Route', location: 'Northern Circuit Route, Kilimanjaro, Tanzania', duration: '10 days', price: '2,168', popular: false },
        { title: 'Marangu The "Tourist Route" To Mt. Kilimanjaro', location: 'Marangu Route, Kilimanjaro, Tanzania', duration: '7 days', price: '1,633', popular: false },
        { title: 'The Whiskey Route: A Trek up the Kilimanjaro', location: 'Machame Route, Kilimanjaro, Tanzania', duration: '8 days', price: '1,785', popular: false },
        { title: 'Scenic Lemosho Route To Kilimanjaro Adventure', location: 'Lemosho Route, Kilimanjaro, Tanzania', duration: '9 days', price: '2,027', popular: false }
      ]
    },
    'luxury-tours': {
      name: 'Luxury Tours',
      title: 'For those Passionate About Luxury',
      image: '/src/assets/luxury_hero.jpg',
      description: [
        'Demi Tours and Travel offers Luxury experiences that include exquisite accommodation, private transportation, expert guides, and personalized service, among other amenities. The experiences cater to the needs of the traveler and can be customized to suit their preferences.',
        'The most popular destinations for luxury tours in East Africa include the Serengeti National Park, the Maasai Mara National Reserve, the Ngorongoro Crater, and Zanzibar. These destinations offer an exclusive experience that combines luxurious accommodation with breathtaking landscapes and unique cultural experiences.',
        'Luxury tour packages also include wildlife safaris and adventure activities such as hot air balloon rides and scenic flights. They are ideal for honeymooners, couples celebrating special occasions, and travelers who seek the ultimate in comfort and luxury. They are also suitable for families and groups looking for a unique and exclusive experience.'
      ],
      tours: [
        { title: '8 Days of Elegance in the Wild, Tanzania Style.', location: 'Tarangire National Park, Lake Manyara Park,Ngorongoro Crater, Serengeti National Park, Tanzania.', duration: '8 days', price: '5,880', popular: false },
        { title: 'Experience 8 Days of Barefoot Luxury In Tanzania', location: 'Tarangire National Park, Ngorongoro Crater, Tanzania', duration: '8 days', price: '15,330', popular: false }
      ]
    },
    'gorilla-chimp-trekking': {
      name: 'Gorilla and Chimp Trekking',
      title: 'Gorilla & Chimp Treks in East Africa\'s Jungles',
      image: '/src/assets/gorilla_hero.jpg',
      description: [
        'The most popular destinations for gorilla and chimp trekking tours in East Africa are Uganda and Rwanda. These destinations offer an opportunity to experience mountain gorillas and chimpanzees in their natural habitats, which is a rare and exclusive encounter.',
        'Demi Tours and Travel offers gorilla and chimp trekking tour packages. We understand the importance of conservation and sustainable tourism. We work with local communities to promote conservation efforts and support the local economy.',
        'These tours in East Africa are ideal for wildlife enthusiasts, photographers, and adventure seekers. They offer a unique and unforgettable experience that combines close encounters with these magnificent primates, breath taking landscapes, and cultural experiences.',
        'Join the trek, we promise you a unique and unforgettable experience.'
      ],
      tours: [
        { title: '5 Day Primate Trek: Gorillas and Chimps, Rwanda to Uganda', location: 'Bwindi Impenetrable Forest National Park, Uganda', duration: '5 days', price: '2,573', popular: false },
        { title: '4 day Rwanda to Uganda Gorilla Trekking', location: 'Bwindi Impenetrable Forest National Park, Uganda', duration: '4 days', price: '2,342', popular: false },
        { title: 'Rwanda 4 Day Gorilla Trekking Tour', location: 'Volcanoes National Park, Rwanda', duration: '4 days', price: '3,266', popular: false },
        { title: 'Rwanda Gorilla Trekking in 3 days', location: 'Volcanoes National Park, Rwanda', duration: '3 days', price: '2,919', popular: false },
        { title: 'Thrilling 4-Day Gorilla Adventure in Rwanda & Uganda', location: 'Bwindi Impenetrable Forest National Park, Uganda', duration: '4 days', price: '2,342', popular: true },
        { title: 'Explore Rwanda & Uganda in 5 Days of Gorilla Adventure', location: 'Bwindi Impenetrable Forest National Park, Uganda', duration: '5 days', price: '2,573', popular: true }
      ]
    },
    'cross-border-safaris': {
      name: 'Cross Border Safaris',
      title: 'Across the Border Adventures',
      image: '/src/assets/crossborder_hero.jpg',
      description: [
        'Kenya and Tanzania are popular destinations for cross-border safaris in East Africa. These countries offer a unique blend of wildlife, culture, and stunning landscapes, making them the ideal destinations for safari enthusiasts.',
        'Rwanda and Uganda are also popular destinations for cross-border safaris, particularly for gorilla trekking. These countries offer an opportunity to encounter mountain gorillas in their natural habitats, which is a rare and exclusive experience.',
        'Egypt and Israel provide a unique cultural experience. Travelers can explore the ancient ruins and artifacts of Egypt, including the Pyramids of Giza and the Sphinx, before crossing the border into Israel to explore the Holy Land.',
        'Demi Tours and Travel offers cross-border safari tour packages in East Africa and the Middle East. We promote sustainable tourism and support local communities by promoting conservation efforts and supporting the local economy.'
      ],
      tours: [
        { title: 'The Great Annual Migration Trek: Kenya & Tanzania', location: 'Masai Mara, Kenya & Serengeti, Tanzania', duration: '10 days', price: '4,982', popular: false },
        { title: 'Thrilling 4-Day Gorilla Adventure in Rwanda & Uganda', location: 'Bwindi Impenetrable Forest National Park, Uganda', duration: '4 days', price: '2,342', popular: true },
        { title: 'Explore Rwanda & Uganda in 5 Days of Gorilla Adventure', location: 'Bwindi Impenetrable Forest National Park, Uganda', duration: '5 days', price: '2,573', popular: true },
        { title: 'Kenya to Tanzania through Amboseli National Park', location: 'Amboseli, Kenya to Serengeti, Tanzania', duration: '8 days', price: '3,728', popular: false }
      ]
    },
    'pilgrimages': {
      name: 'Pilgrimages',
      title: 'A Spiritual and Historical Journey into the past.',
      image: '/src/assets/pilgrimage_hero.jpg',
      description: [
        'Our pilgrimages to Egypt, Jordan, and Israel offer a spiritual and cultural experience. They provide a unique opportunity to connect with history, spirituality, and natural beauty.',
        'In Egypt, travelers can explore ancient religious landmarks such as the Pyramids of Giza, the Sphinx, and historic temples like Abu Simbel, Karnak, and Luxor.',
        'Jordan is a culturally rich country with unique tourist attractions, such as Petra, Jerash, Wadi Rum, and the Dead Sea. Visitors will enjoy warm hospitality, delicious cuisine, and vibrant markets.',
        'In Israel, pilgrims can explore the holy sites, including the Western Wall, the Church of the Holy Sepulchre, and the Dome of the Rock. The ancient city of Jerusalem is considered the holiest city in the world by Jews, Christians, and Muslims. Talk to us about our Pilgrimages.'
      ],
      tours: [
        { title: 'The Pyramids of Egypt: A Timeless Wonder', location: 'Cairo, Giza, Memphis in Egypt', duration: '3 days', price: '436', popular: false },
        { title: 'Jerusalem, A Tour of the Holy City in Four Days', location: 'Jerusalem, Israel', duration: '4 days', price: '935', popular: false },
        { title: 'Discover the Magic of Jordan In Five Days', location: 'Amman, Petra, Wadi Rum, Jordan', duration: '5 days', price: '945', popular: false },
        { title: 'The Pilgrimage from Egypt to Israel in Six Days', location: 'Cairo, Egypt. Tel Aviv, Jerusalem, Nazareth Israel.', duration: '6 days', price: '1,313', popular: false }
      ]
    },
    'day-tours': {
      name: 'Day Tours',
      title: 'Sweet and Short day Tours from Arusha',
      image: '/src/assets/daytour_hero.jpg',
      description: [
        'Arusha offers numerous day tour options to explore Tanzania\'s natural wonders and tourist attractions for travelers who are short on time. Demi Tours and Travel provide various day tours from Arusha to different destinations, including the Arusha National Park, Tarangire National Park, Lake Manyara, Ngorongoro Crater, and Kilimanjaro National Park.',
        'A guided walking safari, a game drive, or even a canoe safari on one of the park\'s many lakes are some of the exciting options available to explore the diverse wildlife of the Arusha National Park, just a few kilometers away from the city center.',
        'Furthermore, visitors can explore the Ngorongoro Crater, a UNESCO World Heritage Site famous for its abundant wildlife and stunning scenery. A trip to the Kilimanjaro National Park, home to the tallest mountain in Africa, is also an exciting option.'
      ],
      tours: [
        { title: 'Tarangire National Park Day Trip', location: 'Tarangire National Park, Tanzania', duration: '1 day', price: '340', popular: false },
        { title: 'Day Trip to Ngorongoro Crater', location: 'Ngorongoro Crater, Tanzania', duration: '1 day', price: '520', popular: false },
        { title: 'Day Tour to Materuni Waterfalls', location: 'Materuni Waterfalls, Tanzania', duration: '1 day', price: '260', popular: false },
        { title: 'Lake Manyara National Park Day Trip', location: 'Lake Manyara National Park, Tanzania', duration: '1 day', price: '340', popular: false },
        { title: 'Day Trip to Lake Chala', location: 'Lake Challa, Tanzania', duration: '1 day', price: '390', popular: false },
        { title: 'Day Tour Safari To Arusha National Park', location: 'Arusha National Park, Tanzania', duration: '1 day', price: '340', popular: true },
        { title: 'Day Trip To Kikuletwa Hot Springs/ Maji Moto', location: 'Kikuletwa Hot Springs, Tanzania', duration: '1 day', price: '255', popular: true },
        { title: 'Day Tour Kilimanjaro – Mandara Hut', location: 'Mount Kilimanjaro, Tanzania', duration: '1 day', price: '360', popular: true }
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
    { question: 'When is the best time to go on safari in Tanzania?', answer: 'The best time depends on what you want to see. The dry season (June to October) offers excellent game viewing, while the wet season (November to May) brings lush landscapes and the Great Migration calving season.' },
    { question: 'How early should I book my safari?', answer: 'We recommend booking 3-6 months in advance, especially for peak season (June-October) and the Great Migration period, to ensure availability at preferred accommodations.' },
    { question: 'How much does a Tanzania safari cost?', answer: 'Safari costs vary widely based on accommodation level, duration, and season. Budget safaris start from $200-300 per person per day, mid-range from $300-600, and luxury from $600+ per person per day.' }
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
                        src={tour.image || '/src/assets/tour_placeholder.jpg'}
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {tour.popular && (
                        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Popular
                        </div>
                      )}
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
            <div className="space-y-4">
              {faqs.map((faq, index) => (
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
                  {openFaq === index && faq.answer && (
                    <p className="text-muted-foreground leading-relaxed mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Images */}
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

export default TravelIdeaDetail;
