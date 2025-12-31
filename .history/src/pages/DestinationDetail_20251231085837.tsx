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

  const otherDestinations = mockDestinations
    .filter((d) => d.slug !== slug && !['egypt', 'israel', 'jordan'].includes(d.slug))
    .slice(0, 6);
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
      heroImage: '/src/assets/dest/Tanzania-Landmarks-Mount-Kilimanjaro.jpg',
      content: `Tanzania is a beautiful country located in East Africa, boasting a wealth of tourist attractions that cater to different interests. One of the most popular destinations is the Serengeti National Park, which is a world-renowned wildlife sanctuary and the site of the famous wildebeest migration. Visitors can witness vast herds of wildebeest, zebras, and gazelles as they cross the park's plains in search of water and grazing land. It is also home to the "Big Five" – lions, elephants, buffaloes, leopards, and rhinos.

Another natural wonder is Mount Kilimanjaro, the highest peak in Africa, which attracts thousands of hikers and mountaineers from around the world every year. The climb to the summit is a once-in-a-lifetime experience that provides breathtaking views of the surrounding landscape.

Zanzibar, an archipelago off Tanzania's coast, is famous for its pristine beaches, clear waters, and rich cultural heritage. Visitors can relax on the island's white sand beaches, go snorkeling or scuba diving, and explore the Stone Town, a UNESCO World Heritage Site that showcases the influences of African, Arab, and European cultures.

Other notable destinations in Tanzania include the Ngorongoro Conservation Area, which features an enormous crater teeming with wildlife, and Tarangire National Park, known for its large elephant herds. The Olduvai Gorge, a site where some of the oldest human remains were discovered, and the ruins of the ancient city of Kilwa Kisiwani are also fascinating attractions for history and culture enthusiasts.

In conclusion, Tanzania offers a diverse range of attractions that are sure to satisfy any traveler's desires, from wildlife safaris to cultural experiences to relaxing beach getaways. With its stunning natural beauty, rich cultural heritage, and friendly locals, Tanzania is truly a must-visit destination for anyone seeking an unforgettable African adventure.`
    },
    kenya: {
      title: 'Incredible Kenya - Open and ready to welcome you',
      heroImage: '/src/assets/dest/kenya.jpg',
      content: `Kenya boasts a range of natural and cultural attractions that offer travelers a host of exciting experiences. The Masai Mara National Reserve is an iconic destination, famous for its incredible wildlife and thrilling safari experiences. Visitors can experience the great wildebeest migration, spot the Big Five game animals, and explore the reserve's diverse landscapes.

Amboseli National Park is another must-see attraction. It provides stunning views of Mount Kilimanjaro and is home to large herds of elephants. Visitors can go on game drives, nature walks, and cultural tours while learning about the traditions and customs of the Maasai people.

History and culture enthusiasts will find the ancient Swahili city of Lamu a fascinating destination. This UNESCO World Heritage Site features narrow streets, traditional houses, and stunning architecture that offer a glimpse into Kenya's rich cultural heritage.

Kenya's beaches are renowned worldwide. Mombasa being a popular destination for travellers seeking sun, sand, and sea. Visitors can enjoy a variety of beach activities, including snorkelling and scuba diving. Diani Beach, located south of Mombasa, is also a popular destination. Its long stretches of white sandy beaches and crystal-clear waters is a must see.

Other popular attractions in Kenya include Lake Nakuru National Park. Famous for its flamingos and rhinoceroses. The Giraffe Centre in Nairobi is another gem. Here, visitors get up close with these majestic creatures.

Whether you're interested in wildlife, culture, history, or beach activities, Kenya offers a wealth of unforgettable experiences for travelers.`
    },
    rwanda: {
      title: 'Rwanda: From Gorilla Trekking to Historical Sites',
      heroImage: '/src/assets/dest/rwanda.jpg',
      content: `Rwanda is a country located in East Africa and has plenty of tourist attractions that are worth visiting. One of the most popular tourist destinations is Volcanoes National Park, which is home to the endangered mountain gorillas. Visitors can enjoy gorilla trekking in the park, which provides an unforgettable experience.

Another must-visit attraction is the Nyungwe Forest National Park, which is a vast rainforest that offers various activities such as chimpanzee tracking, canopy walks, and birdwatching. Akagera National Park is another notable attraction, which is the only park in Rwanda where visitors can spot the big five animals.

For those interested in history, the Kigali Genocide Memorial is a somber but important site to visit, which serves as a reminder of the tragic events that took place in Rwanda in 1994. Additionally, the Nyanza King's Palace Museum provides visitors with a glimpse into the traditional way of life of the Rwandan monarchy.

Other attractions include Lake Kivu, which is perfect for relaxing and enjoying water sports, and the Inema Art Center, which showcases contemporary African art. Rwanda's tourism industry is growing rapidly, and visitors are sure to have an enjoyable and memorable experience exploring the country's many attractions.`
    },
    uganda: {
      title: 'The Pearl of Africa',
      heroImage: '/src/assets/dest/uganda.jpg',
      content: `Uganda, known as the Pearl of Africa, boasts an abundance of natural beauty and cultural heritage. One of the top attractions is the Bwindi Impenetrable National Park, a UNESCO World Heritage Site that hosts nearly half of the world's mountain gorillas. Visitors can embark on gorilla trekking expeditions to witness these magnificent creatures in their natural habitat.

Queen Elizabeth National Park is another must-visit attraction with its diverse range of wildlife, including elephants, lions, hippos, and over 600 bird species. Tourists can indulge in game drives, bird watching tours, and boat safaris while enjoying the scenic views and landscapes.

For adventurous travelers, the Rwenzori Mountains offer a challenging hiking experience and breathtaking views of the surrounding scenery. The Nile River, on the other hand, is a popular destination for water sports such as white-water rafting, kayaking, and bungee jumping.

Kampala, the capital city, is a bustling metropolis with a mix of cultural and historical experiences. The Kasubi Tombs, a UNESCO World Heritage Site, is an essential cultural landmark that honors the Buganda kings' burial place. The Uganda Museum is also a popular destination that offers a glimpse into the country's rich cultural heritage.

Uganda's cultural heritage is showcased in its vibrant traditional music and dance performances. The Ndere Cultural Centre in Kampala offers a range of cultural shows, including drumming performances, storytelling, and traditional dance.

Overall, Uganda is a destination that offers a wealth of exciting experiences for travelers, from wildlife encounters to cultural immersion and stunning natural landscapes.`
    },
    israel: {
      title: 'Israel - Journey to the Holy Land',
      heroImage: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1920',
      content: `In Israel, you'll find a wealth of historical and religious sites that are of great interest to many tourists, especially those of Christian faith. The ancient city of Jerusalem is a must-see, with its iconic sites such as the Western Wall, the Church of the Holy Sepulchre, and the Dome of the Rock. Other important religious sites include Nazareth, where Jesus is said to have grown up, and Bethlehem, the birthplace of Jesus.

But Israel is not just about religious tourism – there is something for everyone. For nature lovers, there are the stunning landscapes of the Negev Desert, the salty waters of the Dead Sea, and the serene beauty of the Sea of Galilee. Foodies will enjoy the diverse and delicious cuisine of Israel, which draws on the influences of many different cultures.

At DeMi Tours and Travel, we offer a range of exciting tour packages to help you explore all that Israel has to offer. Whether you're looking for a guided tour of Jerusalem's holy sites, a desert adventure in the Negev, or a culinary tour of Tel Aviv, we can help you plan the perfect trip. Our knowledgeable guides and carefully crafted itineraries ensure that you'll have an unforgettable experience in Israel. Book your trip today and discover the wonders of this incredible country!`
    },
    egypt: {
      title: "Exploring Egypt's Magnificent Attractions",
      heroImage: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=1920',
      content: `Egypt is a country steeped in history and culture, making it a must-visit destination for travelers. One of the main draws is the ancient pyramids. They are considered to be some of the world's greatest architectural wonders. The Great Pyramids of Giza, the Sphinx, and the Temple of Luxor are all popular tourist attractions. They attract millions of tourists every year. Visitors can also experience the magic of Abu Simbel. This massive temple complex is located on the banks of Lake Nasser in southern Egypt.

In addition to its rich history, Egypt is also a hub for adventure travel. From hot air balloon rides over Luxor to sandboarding in the deserts. There are plenty of opportunities for adrenaline-fueled activities. The country is also renowned for its stunning Red Sea coastline, offering snorkelling and diving opportunities for those looking to explore its vibrant underwater world.

For those looking for a more urban experience, Cairo and Alexandria are two must-visit cities. Cairo, the capital of Egypt, is a bustling metropolis that is home to some of the country's most iconic landmarks, including the Citadel and the Egyptian Museum. Alexandria, on the other hand, is a coastal city that is renowned for its stunning beaches and charming historical sites, such as the Qaitbay Citadel and the Bibliotheca Alexandrina.

Finally, no trip to Egypt would be complete without exploring the Nile River. This ancient river is the lifeblood of the country. A cruise down its banks is a unique and unforgettable experience. Whether you're interested in history, adventure, or just soaking up the local culture, Egypt is a country that has something to offer every traveler.`
    },
    jordan: {
      title: 'Jordan: From Ancient Wonders to Natural Beauty',
      heroImage: 'https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?w=1920',
      content: `Jordan is a fascinating country with numerous tourist attractions that showcase its rich history, culture, and natural beauty. One of the most famous attractions in Jordan is Petra, an ancient city carved out of rock, which was one of the New Seven Wonders of the World. Visitors can explore the magnificent architecture and intricate carvings of the city, including the Treasury, the Monastery, and the Royal Tombs.

Another popular tourist attraction in Jordan is the Dead Sea, a unique body of water that is known for its high salt concentration, which allows visitors to float effortlessly on its surface. The Dead Sea is also famous for its therapeutic properties, with many people visiting the area to benefit from its mineral-rich mud and water.

Jordan is also home to several historical sites, including the Roman city of Jerash, the medieval castle of Ajloun, and the Crusader fortress of Karak. Visitors can immerse themselves in Jordan's rich culture by visiting the traditional markets of Amman, the capital city, or by experiencing the Bedouin way of life in the Wadi Rum desert.

For those who enjoy outdoor activities, Jordan offers plenty of opportunities for hiking, rock climbing, and canyoneering in the stunning landscapes of Wadi Mujib, Dana Biosphere Reserve, and the Wadi Rum desert. Additionally, visitors can experience the thrill of diving in the Red Sea or swimming in the natural pools of the Ma'in Hot Springs.

Overall, Jordan is a diverse country that offers something for everyone, from ancient history to natural wonders, and is definitely worth exploring.`
    },
  };

  const content = destinationContent[slug || ''] || {
    title: `Discover ${destination.name}`,
    heroImage: destination.image,
    content: destination.longDescription || destination.description
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeDestination={slug} />

      {/* Hero */}
      <div className="relative h-[400px] md:h-[500px]">
        <img src="/src/assets/header_bg_new4.gif" alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-white mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="mx-2">»</span>
              <span>{destination.name}</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
              {destination.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Large Picture Section */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Large Image and Country Facts */}
          <div className="lg:col-span-7 space-y-6">
            {/* Image */}
            <div className="rounded-3xl overflow-hidden">
              <img src={content.heroImage} alt={destination.name} className="w-full h-[600px] object-cover" />
            </div>

            {/* Please Note Card */}
            <div className="relative border-2 border-dashed border-primary/30 rounded-2xl p-8 shadow-lg overflow-hidden bg-white">
              {/* Decorative dotted line */}
              <div className="absolute top-6 right-6 w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                  <path d="M10,50 Q30,10 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" strokeLinecap="round"/>
                  <circle cx="90" cy="50" r="4" fill="currentColor"/>
                </svg>
              </div>

              <div className="flex items-start gap-4 mb-6 relative">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">Please Note Below</h3>
                  <p className="text-muted-foreground font-semibold text-lg">Country Facts</p>
                </div>
              </div>

              {/* Dotted Box with Country Information */}
              <div className="border-2 border-dashed border-primary/20 rounded-xl p-6 bg-muted/10">
                <div className="space-y-4">
                  <div>
                    <span className="text-muted-foreground text-sm font-medium block mb-1">Country</span>
                    <p className="font-semibold text-foreground">{destination.country}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm font-medium block mb-1">Visa Requirements</span>
                    <p className="font-semibold text-foreground text-sm leading-relaxed">
                      {slug === 'tanzania' && 'Commonwealth & EAC citizens - don\'t need visa. Everyone else need a visa.'}
                      {slug === 'kenya' && 'Most nationalities can obtain visa on arrival. EAC citizens enter visa-free.'}
                      {slug === 'rwanda' && 'Visa on arrival for most nationalities. EAC, AU member states visa-free.'}
                      {slug === 'uganda' && 'East African citizens visa-free. Most nationalities can get e-visa online.'}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm font-medium block mb-1">Languages spoken</span>
                    <p className="font-semibold text-foreground">{destination.language}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm font-medium block mb-1">Currency used</span>
                    <p className="font-semibold text-foreground">
                      {slug === 'tanzania' && 'Tanzania Shilling, USD, Euro'}
                      {slug === 'kenya' && 'Kenyan Shilling, USD'}
                      {slug === 'rwanda' && 'Rwandan Franc, USD'}
                      {slug === 'uganda' && 'Ugandan Shilling, USD'}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm font-medium block mb-1">Area (km2)</span>
                    <p className="font-semibold text-foreground">
                      {slug === 'tanzania' && '945,087 km²'}
                      {slug === 'kenya' && '580,367 km²'}
                      {slug === 'rwanda' && '26,338 km²'}
                      {slug === 'uganda' && '241,038 km²'}
                    </p>
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
      <div className="bg-muted/30 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="relative flex items-center justify-center">
              {/* Central decorative circle */}
              <div className="absolute w-64 h-64 rounded-full border-2 border-dashed border-primary/20 hidden md:block" />
              <div className="absolute w-96 h-96 rounded-full border border-primary/10 hidden lg:block" />

              {/* Stats in circular arrangement */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-white border-4 border-primary/20 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
                    <Lightbulb className="w-8 h-8 text-primary mb-2" />
                    <div className="text-3xl font-display font-bold text-primary">50+</div>
                  </div>
                  <div className="text-sm font-medium text-foreground mt-4 text-center">Travel ideas</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-white border-4 border-primary/20 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
                    <MapPin className="w-8 h-8 text-primary mb-2" />
                    <div className="text-3xl font-display font-bold text-primary">4+</div>
                  </div>
                  <div className="text-sm font-medium text-foreground mt-4 text-center">Destinations</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-white border-4 border-primary/20 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
                    <Heart className="w-8 h-8 text-primary mb-2" />
                    <div className="text-3xl font-display font-bold text-primary">200+</div>
                  </div>
                  <div className="text-sm font-medium text-foreground mt-4 text-center uppercase">Repeat Clients</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-white border-4 border-primary/20 flex flex-col items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
                    <Building className="w-8 h-8 text-primary mb-2" />
                    <div className="text-3xl font-display font-bold text-primary">50+</div>
                  </div>
                  <div className="text-sm font-medium text-foreground mt-4 text-center uppercase">Service Partners</div>
                </div>
              </div>
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
      <div className="py-24 bg-gradient-to-b from-muted/20 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-3">
              Explore More
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Must See Destinations</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover the wonders of East Africa's most captivating locations
            </p>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl">
              {otherDestinations.map((dest) => (
                <Link key={dest.slug} to={`/destinations/${dest.slug}`} className="group relative w-full h-80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/60 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="font-display text-2xl font-bold text-white mb-2">{dest.name}</h3>
                    <p className="text-white/90 text-sm mb-4">{dest.tours} Tours Available</p>
                    <Button variant="secondary" size="sm" className="text-xs px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
                      Explore Now <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <div className="relative py-40 overflow-hidden bg-white">
        {/* Nature SVG Background */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FFA500', stopOpacity: 0.15 }} />
                <stop offset="100%" style={{ stopColor: '#FF8C00', stopOpacity: 0.08 }} />
              </linearGradient>
            </defs>

            {/* Sky background */}
            <rect width="1440" height="600" fill="url(#skyGradient)" />

            {/* Mountains - Background layer */}
            <path d="M0 400 L200 250 L400 350 L600 200 L800 300 L1000 150 L1200 280 L1440 200 L1440 600 L0 600 Z" fill="#EE8509" opacity="0.05" />

            {/* Mountains - Middle layer */}
            <path d="M0 450 L150 320 L350 400 L550 280 L750 380 L950 240 L1150 350 L1350 280 L1440 320 L1440 600 L0 600 Z" fill="#EE8509" opacity="0.08" />

            {/* Trees - Left side */}
            <g opacity="0.12" fill="#2D3748">
              <ellipse cx="150" cy="480" rx="30" ry="70" />
              <ellipse cx="200" cy="490" rx="25" ry="60" />
              <ellipse cx="250" cy="485" rx="28" ry="65" />
            </g>

            {/* Trees - Right side */}
            <g opacity="0.12" fill="#2D3748">
              <ellipse cx="1250" cy="490" rx="30" ry="70" />
              <ellipse cx="1300" cy="480" rx="25" ry="60" />
              <ellipse cx="1350" cy="495" rx="28" ry="65" />
            </g>

            {/* Wildlife silhouettes - Giraffes */}
            <g opacity="0.08" fill="#EE8509">
              <path d="M100 450 L105 400 L110 450 L108 480 L102 480 Z" />
              <circle cx="105" cy="395" r="8" />

              <path d="M1100 460 L1105 410 L1110 460 L1108 490 L1102 490 Z" />
              <circle cx="1105" cy="405" r="8" />
            </g>

            {/* Acacia trees */}
            <g opacity="0.1" fill="#2D3748">
              <path d="M500 500 L505 450 L510 500" stroke="#2D3748" strokeWidth="3" fill="none" />
              <ellipse cx="505" cy="445" rx="35" ry="25" />

              <path d="M900 510 L905 460 L910 510" stroke="#2D3748" strokeWidth="3" fill="none" />
              <ellipse cx="905" cy="455" rx="35" ry="25" />
            </g>

            {/* Decorative dots pattern */}
            <g opacity="0.06" fill="#EE8509">
              <circle cx="300" cy="150" r="3" />
              <circle cx="450" cy="200" r="2" />
              <circle cx="650" cy="100" r="3" />
              <circle cx="850" cy="180" r="2" />
              <circle cx="1050" cy="120" r="3" />
              <circle cx="1200" cy="160" r="2" />

              <circle cx="350" cy="250" r="2" />
              <circle cx="550" cy="220" r="3" />
              <circle cx="750" cy="280" r="2" />
              <circle cx="950" cy="240" r="3" />
              <circle cx="1150" cy="200" r="2" />
            </g>

            {/* Sun rays */}
            <g opacity="0.05" stroke="#EE8509" strokeWidth="2" fill="none">
              <line x1="720" y1="50" x2="720" y2="100" />
              <line x1="780" y1="80" x2="810" y2="120" />
              <line x1="660" y1="80" x2="630" y2="120" />
              <line x1="790" y1="140" x2="830" y2="160" />
              <line x1="650" y1="140" x2="610" y2="160" />
            </g>
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <p className="text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Start Your Adventure
            </p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Welcome to Your <span className="font-script text-6xl md:text-7xl lg:text-8xl block mt-2 text-primary">Destination</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Ready to embark on your {destination.name} adventure? Let us help you plan the perfect journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button variant="gold" size="xl" className="gap-3 shadow-2xl hover:shadow-3xl transition-all duration-300 px-10 py-8 text-lg">
                  Plan Your Trip
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
              <Link to="/tours">
                <Button variant="outline" size="xl" className="gap-3 border-2 hover:bg-muted/50 px-10 py-8 text-lg">
                  Browse Tours
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
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

export default DestinationDetail;
