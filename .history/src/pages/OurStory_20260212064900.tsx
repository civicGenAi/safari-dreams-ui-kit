import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import heroImage from '@/assets/our_story.jpeg'

const OurStory = () => {
  const rates = [
    {
      number: '01',
      title: 'Our Rates',
      description: 'Memorable travel experiences are priceless. We offer best value for money. Occasionally we have special offers.'
    },
    {
      number: '02',
      title: 'Exciting Selection of Tours',
      description: 'Every desire to travel starts as an idea. We have simplified the process for you. Travel experiences on our website are grouped into ideas. However we are still open to tweaking our ideas to suit your taste.'
    },
    {
      number: '03',
      title: 'In Safe Hands',
      description: 'Of seasoned industry professionals and guides, with deep knowledge and understanding of the region\'s flora and fauna. We are also represented on SafariBookings a leading online marketplace for safaris.'
    },
    {
      number: '04',
      title: 'Sustainability',
      description: 'At DeMi Tours, we are committed to thoughtful and responsible travel. We hold ourselves accountable for upholding responsible travel principles throughout our safaris. We achieve this by engaging local communities in the regions in which we travel. We also create programs that foster sustainable and authentic preservation of those communities.'
    },
    {
      number: '05',
      title: 'Book With Confidence',
      description: 'Once you decide on your favourite package and travel date, easily book it online. Upon receiving your booking, we will send you a secure payment link.'
    },
    {
      number: '06',
      title: 'Bespoke Travel Ideas',
      description: 'We are flexible enough to custom-make an itinerary for you from start to finish, working within your stipulated budget.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[300px] md:h-[400px]">
        <img src="/header_bg_new4.gif" alt="Our Story" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-white mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Explore</Link>
              <span className="mx-2">»</span>
              <span>About Us</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              About Us
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Image */}
            <div className="space-y-8">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src={heroImage} alt="Our Story" className="w-full h-auto" />
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Come with us to new experiences
                </h2>
                <p className="text-xl text-primary font-semibold mb-6">
                  We treat our clients like family.
                </p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Migration Safaridirectis a locally-owned, women-led ecotourism company and trusted safari specialists in East Africa, championing inclusive tourism and impact travel. With over 27 years of combined experience, we are experts in selling East Africa as a destination, offering carefully curated combined and stand-alone safari experiences across Tanzania, Kenya, Uganda, and Rwanda.
                  </p>
                  <p>
                    After over two decades of industry expertise, our visionary founder, Caudence, recognized a glaring gender gap within the male-dominated travel industry. Driven by the desire to empower more women and bridge this divide, the seed of an idea blossomed, culminating in the birth of Migration  Safaridirect.
                  </p>
                  <p>
                    Every journey we design prioritizes safety, accessibility, and inclusivity, making it possible for families, persons with disabilities, solo travelers and students to explore East Africa with confidence. We craft immersive, responsible safaris that connect travelers to people, culture, and nature—while ensuring tourism benefits the communities it touches.
                  </p>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading font-bold text-xl mb-3">Empowerment :</h3>
                  <p className="text-muted-foreground">
                    Our founder is passionate about empowering women in the travel industry and beyond. She mentors and trains young women who are joining the industry, helping them reach their full potential. She is a member of TAWTO (Tanzania Association of Women Tour Operators )
                  </p>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl mb-3">Diversity :</h3>
                  <p className="text-muted-foreground">
                    At  Migration & Safaridirect, we celebrate diversity and offer a wide range of travel experiences. From safaris to romantic getaways, adventure trips to luxury vacations, cross-border excursions to pilgrimages, gorilla trekking to beach holidays, day tours to bespoke tours, we have something for everyone.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl mb-3">Attention to detail :</h3>
                  <p className="text-muted-foreground">
                    We take pride in our attention to detail and organizational skills, ensuring that our customers have a seamless and stress-free journey. Our team works tirelessly to ensure that every aspect of your trip is well-planned and executed to perfection.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl mb-3">Customer service :</h3>
                  <p className="text-muted-foreground">
                    Our commitment to excellent customer service sets us apart. We prioritize building strong relationships with our customers, ensuring that their needs and preferences are met. Our personalized approach ensures that our customers have a satisfying and memorable travel experience.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xl mb-3">Social responsibility :</h3>
                  <p className="text-muted-foreground mb-4">
                    We at Migration Safaridirect, believe in the power of ecotourism as a responsible and sustainable way to explore the natural wonders of our planet.
                    Our commitment to ecotourism goes beyond just showcasing the beauty of the destinations we visit. We also actively support local conservation efforts and promote environmental awareness.
                  </p>
                  <p className="text-muted-foreground">
                    We achieve this by partnering with accommodation providers who engage in sustainable practices and initiatives. At the heart of our work is impact travel—travel that changes lives. Through women empowerment, community partnerships, and conservation-focused experiences, we protect Africa's landscapes and heritage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Travel - Dyslexia Tanzania Section */}
      <div className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 border-y border-primary/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
                  Impact Travel That Changes Lives
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Every Safari Supports Inclusive Education
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Travel with purpose. Your adventure creates lasting impact.
              </p>
            </div>

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left - Key Message */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-lift border-2 border-primary/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center">
                      <span className="font-display text-2xl font-bold">15%</span>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl">Of Every Booking</h3>
                      <p className="text-muted-foreground text-sm">Supports Dyslexia Tanzania</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">15% of every booking</strong> supports Dyslexia Tanzania, an NGO we founded following our personal journey as parents of a child with dyslexia—turning every safari into a meaningful contribution to inclusive education.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h4 className="font-heading font-bold text-lg mb-3">Our Personal Journey</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    As parents of a child with dyslexia, we understand firsthand the challenges families face in accessing quality, inclusive education. This personal experience inspired us to establish Dyslexia Tanzania—ensuring no child is left behind.
                  </p>
                </div>
              </div>

              {/* Right - Impact Details */}
              <div className="space-y-6">
                <h3 className="font-heading font-bold text-2xl mb-4">How Your Trip Makes a Difference</h3>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Raising Awareness</h4>
                      <p className="text-muted-foreground text-sm">
                        Educating communities about dyslexia and breaking down stigmas surrounding learning differences.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Advocating for Equal Opportunities</h4>
                      <p className="text-muted-foreground text-sm">
                        Working with schools and policymakers to ensure children with dyslexia receive the support they need.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Creating Learning Resources</h4>
                      <p className="text-muted-foreground text-sm">
                        Developing specialized tools and training teachers to support dyslexic learners effectively.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Empowering Families</h4>
                      <p className="text-muted-foreground text-sm">
                        Providing guidance and resources to parents navigating their child's educational journey.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-secondary/10 rounded-xl border border-secondary/30">
                  <p className="text-foreground font-semibold mb-2">
                    When you book with Migration Safaridirect:
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    You're not just embarking on an adventure—you're contributing to a more inclusive Tanzania where every child has the opportunity to learn, grow, and thrive regardless of their learning differences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THE DIFFERENCE */}
      <div className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">THE DIFFERENCE</h2>
            <p className="text-xl text-muted-foreground">We are passionate. We love what we do.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-x-12 gap-y-8 mb-8">
            {rates.map((rate) => (
              <div key={rate.number}>
                <h3 className="font-heading font-bold text-xl mb-3 flex items-center gap-2">
                  <span className="text-primary">{rate.number}</span> {rate.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {rate.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <div className="py-32 relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-primary/20">
        {/* Decorative Pattern Background */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255, 140, 0, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 107, 0, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(245, 158, 11, 0.25) 0%, transparent 50%)
            `
          }} />
        </div>

        {/* Animated SVG Background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Safari footprints trail */}
            <g fill="#D97706" opacity={0.6}>
              {[...Array(8)].map((_, i) => (
                <g key={i}>
                  <ellipse cx={100 + i * 180} cy={100 + (i % 2) * 80} rx="15" ry="25" transform={`rotate(${25 + i * 10} ${100 + i * 180} ${100 + (i % 2) * 80})`}>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0" dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
                  </ellipse>
                  <ellipse cx={120 + i * 180} cy={130 + (i % 2) * 80} rx="15" ry="25" transform={`rotate(${-25 - i * 10} ${120 + i * 180} ${130 + (i % 2) * 80})`}>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0" dur={`${3.5 + i * 0.3}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur={`${3.5 + i * 0.3}s`} repeatCount="indefinite" />
                  </ellipse>
                </g>
              ))}
            </g>

            {/* Floating compass elements */}
            <g stroke="#EA580C" strokeWidth="3" fill="none" opacity={0.7}>
              {[...Array(6)].map((_, i) => (
                <g key={i}>
                  <circle cx={200 + i * 250} cy={300 + (i % 3) * 100} r="40">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" />
                    <animate attributeName="r" values="40;45;40" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                  <line x1={200 + i * 250} y1={260 + (i % 3) * 100} x2={200 + i * 250} y2={280 + (i % 3) * 100} stroke="#F97316" strokeWidth="4">
                    <animateTransform attributeName="transform" type="rotate" values={`0 ${200 + i * 250} ${300 + (i % 3) * 100}; 360 ${200 + i * 250} ${300 + (i % 3) * 100}`} dur={`${20 + i * 2}s`} repeatCount="indefinite" />
                  </line>
                  <line x1={200 + i * 250} y1={320 + (i % 3) * 100} x2={200 + i * 250} y2={340 + (i % 3) * 100} stroke="#FB923C" strokeWidth="3">
                    <animateTransform attributeName="transform" type="rotate" values={`0 ${200 + i * 250} ${300 + (i % 3) * 100}; 360 ${200 + i * 250} ${300 + (i % 3) * 100}`} dur={`${20 + i * 2}s`} repeatCount="indefinite" />
                  </line>
                </g>
              ))}
            </g>

            {/* Safari vehicle paths */}
            <g stroke="#F59E0B" strokeWidth="4" fill="none" strokeDasharray="10,15" opacity={0.6}>
              <path d="M 0 250 Q 400 200 800 250 T 1600 250">
                <animate attributeName="stroke-dashoffset" values="0;100" dur="15s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="5s" repeatCount="indefinite" />
              </path>
              <path d="M 0 450 Q 400 400 800 450 T 1600 450">
                <animate attributeName="stroke-dashoffset" values="100;0" dur="18s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="6s" repeatCount="indefinite" />
              </path>
            </g>

            {/* Acacia tree silhouettes */}
            <g fill="#D97706" opacity={0.5}>
              {[...Array(5)].map((_, i) => (
                <g key={i}>
                  <ellipse cx={150 + i * 350} cy={500} rx="50" ry="15">
                    <animateTransform attributeName="transform" type="scale" values="1,1; 1.15,0.85; 1,1" dur={`${5 + i * 0.7}s`} repeatCount="indefinite" additive="sum" />
                    <animate attributeName="opacity" values="0.6;1;0.6" dur={`${5 + i * 0.7}s`} repeatCount="indefinite" />
                  </ellipse>
                  <rect x={145 + i * 350} y={500} width="10" height="80">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur={`${5 + i * 0.7}s`} repeatCount="indefinite" />
                  </rect>
                </g>
              ))}
            </g>

            {/* Flying birds */}
            <g stroke="#EA580C" strokeWidth="3" fill="none" opacity={0.7}>
              {[...Array(4)].map((_, i) => (
                <path key={i} d={`M ${100 + i * 80} ${150 + i * 50} Q ${110 + i * 80} ${145 + i * 50} ${120 + i * 80} ${150 + i * 50} Q ${130 + i * 80} ${145 + i * 50} ${140 + i * 80} ${150 + i * 50}`}>
                  <animateTransform attributeName="transform" type="translate" values={`0,0; ${1400 + i * 100},-${200 + i * 50}`} dur={`${25 + i * 3}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
                </path>
              ))}
            </g>

            {/* Sun/sunset effect */}
            <g opacity={0.4}>
              {[...Array(3)].map((_, i) => (
                <circle key={i} cx="1400" cy="150" r={80 + i * 30} fill="none" stroke="#FCD34D" strokeWidth="2">
                  <animate attributeName="opacity" values="0.2;0.5;0.2" dur={`${4 + i}s`} repeatCount="indefinite" />
                  <animate attributeName="r" values={`${80 + i * 30};${90 + i * 30};${80 + i * 30}`} dur={`${4 + i}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </g>
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-6 drop-shadow-sm">
            Your Trip. Our Responsibility.
          </h2>
          <Link to="/contact">
            <Button variant="primary" size="xl" className="gap-2 shadow-lg hover:shadow-2xl transition-shadow">
              Plan Your Trip
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterSection />

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default OurStory;
