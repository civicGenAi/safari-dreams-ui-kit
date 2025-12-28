import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const OurStory = () => {
  const team = [
    { name: 'Caudence Ayoti', role: 'CEO, Founder', image: '/src/assets/staff/staff_caudence_ceo-1.webp' },
    { name: 'Lynn Mackanja', role: 'Legal Consultant', image: '/src/assets/staff/staff_lynn_legal.webp' },
    { name: 'Johns Tenga', role: 'Director of Operations', image: '/src/assets/staff/staff_tenga_operations.webp' },
    { name: 'Brenda Richard', role: 'Safaris & reservations consultant', image: '/src/assets/staff/staff_brenda_reservation.webp' },
    { name: 'Juma Habibu', role: 'Finance Director', image: '/src/assets/staff/staff_juma_finance.webp' },
    { name: 'Huruma Mpanda', role: 'tour guide', image: '/src/assets/staff/staff_huruma_guide.webp' },
    { name: 'Abdulrahaman Abel', role: 'Marketing Manager', image: '/src/assets/staff/staff_abel_marketing.webp' },
    { name: 'Raheli Festo Ochieng', role: 'tour guide', image: '/src/assets/staff/staff_rachel_guide.webp' },
  ];

  const rates = [
    {
      number: '01',
      title: 'Exciting Selection of Tours',
      description: 'Every desire to travel starts as an idea. We have simplified the process for you. Travel experiences on our website are grouped into ideas. However we are still open to tweaking our ideas to suit your taste.'
    },
    {
      number: '02',
      title: 'In Safe Hands',
      description: 'Of seasoned industry professionals and guides, with deep knowledge and understanding of the region\'s flora and fauna. We are also represented on SafariBookings a leading online marketplace for safaris.'
    },
    {
      number: '03',
      title: 'Sustainability',
      description: 'At DeMi Tours, we are committed to thoughtful and responsible travel. We hold ourselves accountable for upholding responsible travel principles throughout our safaris. We achieve this by engaging local communities in the regions in which we travel. We also create programs that foster sustainable and authentic preservation of those communities.'
    },
    {
      number: '04',
      title: 'Book With Confidence',
      description: 'Once you decide on your favourite package and travel date, easily book it online. Upon receiving your booking, we will send you a secure payment link.'
    },
    {
      number: '05',
      title: 'Bespoke Travel Ideas',
      description: 'We are flexible enough to custom-make an itinerary for you from start to finish, working within your stipulated budget.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[300px] md:h-[400px]">
        <img src="/src/assets/header_bg_new4.gif" alt="Our Story" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-white mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="mx-2">»</span>
              <span>Our Story</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Our Story
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Image with Our Rates */}
            <div className="space-y-8">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src="/src/assets/our_story.jpeg" alt="Our Story" className="w-full h-auto" />

                {/* Overlay Card */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img src="/src/assets/Untitled.png" alt="Background" className="w-full h-auto" />
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-center text-foreground">
                        We are Responsive to Your Travel Ideas
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Our Rates */}
              <div className="bg-muted/30 rounded-3xl p-8">
                <h3 className="font-display text-2xl font-bold mb-4">Our Rates</h3>
                <p className="text-muted-foreground mb-8">
                  Memorable travel experiences are priceless. We offer best value for money. Occasionally we have special offers.
                </p>
                <div className="space-y-6">
                  {rates.map((rate) => (
                    <div key={rate.number} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-bold text-primary">{rate.number}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-heading font-bold mb-2">{rate.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{rate.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
                    Demi Tours and Travel is a "sista" owned travel agency based in Arusha, Tanzania. Something that makes us different from a lot of tour companies is that, the founders are the same as you. Travel enthusiasts.
                  </p>
                  <p>
                    After two decades of industry expertise, our visionary founder, Caudence, recognized a glaring gender gap within the male-dominated travel industry. Driven by the desire to empower more women and bridge this divide, the seed of an idea blossomed, culminating in the birth of Demi Tours and Travel.
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
                    At Demi Tours and Travel, we celebrate diversity and offer a wide range of travel experiences. From safaris to romantic getaways, adventure trips to luxury vacations, cross-border excursions to pilgrimages, gorilla trekking to beach holidays, day tours to bespoke tours, we have something for everyone.
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
                    We at Demi Tours, believe in the power of ecotourism as a responsible and sustainable way to explore the natural wonders of our planet.
                    Our commitment to ecotourism goes beyond just showcasing the beauty of the destinations we visit. We also actively support local conservation efforts and promote environmental awareness.
                  </p>
                  <p className="text-muted-foreground">
                    We achieve this by partnering with accommodation providers, who engage in sustainable practices and initiatives. A portion of our earnings is dedicated to supporting Dyslexia Tanzania, a non-profit organization that aims to raise awareness about dyslexia and advocate for equal learning opportunities for children with dyslexia.
                  </p>
                </div>

                <p className="text-muted-foreground italic mb-8">
                  Thank you for considering DeMi Tours and Travel for your next adventure. We look forward to providing you with an exceptional experience that will create lasting memories.
                </p>

                <Link to="/contact">
                  <Button variant="primary" size="lg" className="gap-2">
                    Talk to us
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
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

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-primary">&gt;&gt;</span> Empowerment
              </h3>
              <p className="text-muted-foreground">
                Our founder is passionate about empowering women in the travel industry and beyond. She mentors and trains young women who are joining the industry.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-primary">&gt;&gt;</span> Diversity
              </h3>
              <p className="text-muted-foreground">
                At Demi Tours and Travel, we celebrate diversity and offer a wide range of travel experiences. From safaris to romantic getaways, adventure trips to luxury vacations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-primary">&gt;&gt;</span> Attention to detail
              </h3>
              <p className="text-muted-foreground">
                We take pride in our attention to detail and organizational skills, ensuring that our customers have a seamless and stress-free journey.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-primary">&gt;&gt;</span> Customer service
              </h3>
              <p className="text-muted-foreground">
                Our commitment to excellent customer service sets us apart. We prioritize building strong relationships with our customers.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-primary">&gt;&gt;</span> Social responsibility
              </h3>
              <p className="text-muted-foreground">
                We believe in the power of ecotourism as a responsible and sustainable way to explore the natural wonders of our planet.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-primary">&gt;&gt;</span> Sustainability
              </h3>
              <p className="text-muted-foreground">
                We are committed to thoughtful and responsible travel. We hold ourselves accountable for upholding responsible travel principles.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet The FAM */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-2">Meet The FAM</h2>
            <p className="text-xl text-muted-foreground">Putting A Name To The Face</p>
          </div>

          {/* CEO - Founder (Top) */}
          <div className="flex justify-center mb-12">
            <div className="text-center group max-w-xs">
              <div className="relative mb-4 overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={team[0].image}
                  alt={team[0].name}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Facebook className="w-5 h-5 text-white" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Twitter className="w-5 h-5 text-white" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="font-heading font-bold text-xl mb-1">{team[0].name}</h3>
              <p className="text-primary font-semibold">{team[0].role}</p>
            </div>
          </div>

          {/* Management Team */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {team.slice(1, 5).map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="flex gap-3">
                      <a href="#" className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Facebook className="w-4 h-4 text-white" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Linkedin className="w-4 h-4 text-white" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Instagram className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="font-heading font-bold text-base mb-1">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
              </div>
            ))}
          </div>

          {/* Tour Guides & Marketing */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.slice(5).map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="flex gap-3">
                      <a href="#" className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Facebook className="w-4 h-4 text-white" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Instagram className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="font-heading font-bold text-base mb-1">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
              </div>
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
            Your Trip. Our Responsibility.
          </h2>
          <Link to="/contact">
            <Button variant="primary" size="xl" className="gap-2 shadow-2xl">
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
