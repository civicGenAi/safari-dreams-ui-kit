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
    kenya: {
      title: 'Incredible Kenya - Open and ready to welcome you',
      heroImage: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920',
      content: `Kenya boasts a range of natural and cultural attractions that offer travelers a host of exciting experiences. The Masai Mara National Reserve is an iconic destination, famous for its incredible wildlife and thrilling safari experiences. Visitors can experience the great wildebeest migration, spot the Big Five game animals, and explore the reserve's diverse landscapes.

Amboseli National Park is another must-see attraction. It provides stunning views of Mount Kilimanjaro and is home to large herds of elephants. Visitors can go on game drives, nature walks, and cultural tours while learning about the traditions and customs of the Maasai people.

History and culture enthusiasts will find the ancient Swahili city of Lamu a fascinating destination. This UNESCO World Heritage Site features narrow streets, traditional houses, and stunning architecture that offer a glimpse into Kenya's rich cultural heritage.

Kenya's beaches are renowned worldwide. Mombasa being a popular destination for travellers seeking sun, sand, and sea. Visitors can enjoy a variety of beach activities, including snorkelling and scuba diving. Diani Beach, located south of Mombasa, is also a popular destination. Its long stretches of white sandy beaches and crystal-clear waters is a must see.

Other popular attractions in Kenya include Lake Nakuru National Park. Famous for its flamingos and rhinoceroses. The Giraffe Centre in Nairobi is another gem. Here, visitors get up close with these majestic creatures.

Whether you're interested in wildlife, culture, history, or beach activities, Kenya offers a wealth of unforgettable experiences for travelers.`
    },
    rwanda: {
      title: 'Rwanda: From Gorilla Trekking to Historical Sites',
      heroImage: 'https://images.unsplash.com/photo-1609198092357-f7c14a0902c8?w=1920',
      content: `Rwanda is a country located in East Africa and has plenty of tourist attractions that are worth visiting. One of the most popular tourist destinations is Volcanoes National Park, which is home to the endangered mountain gorillas. Visitors can enjoy gorilla trekking in the park, which provides an unforgettable experience.

Another must-visit attraction is the Nyungwe Forest National Park, which is a vast rainforest that offers various activities such as chimpanzee tracking, canopy walks, and birdwatching. Akagera National Park is another notable attraction, which is the only park in Rwanda where visitors can spot the big five animals.

For those interested in history, the Kigali Genocide Memorial is a somber but important site to visit, which serves as a reminder of the tragic events that took place in Rwanda in 1994. Additionally, the Nyanza King's Palace Museum provides visitors with a glimpse into the traditional way of life of the Rwandan monarchy.

Other attractions include Lake Kivu, which is perfect for relaxing and enjoying water sports, and the Inema Art Center, which showcases contemporary African art. Rwanda's tourism industry is growing rapidly, and visitors are sure to have an enjoyable and memorable experience exploring the country's many attractions.`
    },
    uganda: {
      title: 'The Pearl of Africa',
      heroImage: 'https://images.unsplash.com/photo-1612504508838-e9c04e1eabfe?w=1920',
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
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-border">
              <div className="flex items-start gap-4 mb-4">
                <svg className="w-8 h-8 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-display text-xl font-bold">Please Note Below</h3>
                  <p className="text-primary font-semibold">Country Facts</p>
                </div>
              </div>

              {/* Dotted Box with Country Information */}
              <div className="border-2 border-dashed border-primary/30 rounded-xl p-6 bg-muted/20">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-muted-foreground text-sm">Best Time:</span>
                    <p className="font-semibold text-foreground">{destination.bestTime}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Climate:</span>
                    <p className="font-semibold text-foreground">{destination.climate}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Currency:</span>
                    <p className="font-semibold text-foreground">{destination.currency}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Language:</span>
                    <p className="font-semibold text-foreground">{destination.language}</p>
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
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-2">Must See Destinations</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {otherDestinations.map((dest) => (
              <Link key={dest.slug} to={`/destinations/${dest.slug}`} className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-lg font-bold text-white mb-1">{dest.name}</h3>
                  <p className="text-white/80 text-sm mb-2">{dest.tours} Tours</p>
                  <Button variant="secondary" size="sm" className="text-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="w-3 h-3" />
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
      <div className="py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
            Welcome to Your Destination
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
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
