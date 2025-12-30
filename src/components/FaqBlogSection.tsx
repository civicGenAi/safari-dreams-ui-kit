import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Calendar, Clock, ArrowRight, HelpCircle, Newspaper } from 'lucide-react';

// FAQ Data
const faqs = [
  {
    question: 'What is the best time to visit Tanzania for a safari?',
    answer: 'The best time for a safari in Tanzania is during the dry season from June to October. This is when wildlife viewing is at its peak as animals gather around water sources. The Great Migration in Serengeti occurs from June to July. However, the green season (November to May) offers lush landscapes, fewer crowds, and lower prices.',
  },
  {
    question: 'Do I need a visa to visit Tanzania?',
    answer: 'Most visitors require a visa to enter Tanzania. You can obtain a tourist visa on arrival at major entry points for $50-$100 USD, or apply for an e-visa online before your trip. US citizens pay $100, while most other nationalities pay $50. Your passport should be valid for at least 6 months beyond your travel dates.',
  },
  {
    question: 'What vaccinations do I need for a safari in East Africa?',
    answer: 'Yellow fever vaccination is required if you are traveling from a country with risk of yellow fever transmission. We recommend consulting your doctor about malaria prophylaxis, and vaccinations for Hepatitis A, Typhoid, and routine immunizations. Start planning at least 6-8 weeks before your trip.',
  },
  {
    question: 'What should I pack for a safari?',
    answer: 'Pack lightweight, neutral-colored clothing (khaki, olive, beige), a warm jacket for early morning game drives, comfortable walking shoes, sunscreen, hat, sunglasses, binoculars, and camera. Most lodges offer laundry service, so you can pack light. Avoid bright colors and camouflage clothing.',
  },
  {
    question: 'Is it safe to travel on safari in Tanzania?',
    answer: 'Yes, Tanzania is generally safe for tourists. Safari destinations are well-regulated with experienced guides. We provide 24/7 support, and all our guides are certified by the Tanzania Tourist Board. We recommend following standard travel precautions and keeping valuables secure.',
  },
  {
    question: 'What is included in the safari package price?',
    answer: 'Our safari packages typically include accommodation, meals as specified, park entry fees, game drives in 4x4 safari vehicles, professional guide services, and airport transfers. International flights, visas, travel insurance, tips, and personal expenses are usually not included.',
  },
];

// Blog Posts Data
const blogPosts = [
  {
    id: 1,
    title: 'The Great Wildebeest Migration: A Complete Guide',
    excerpt: 'Witness one of nature\'s most spectacular events. Learn when and where to see the Great Migration in all its glory.',
    image: '/src/assets/hero/revslider_migration02.jpg',
    category: 'Wildlife',
    date: 'Dec 15, 2024',
    readTime: '8 min read',
    slug: 'great-wildebeest-migration-guide',
  },
  {
    id: 2,
    title: 'Top 10 Safari Destinations in Tanzania',
    excerpt: 'From Serengeti to Ngorongoro Crater, discover the most breathtaking safari destinations Tanzania has to offer.',
    image: '/src/assets/hero/revslider_adventure04.jpg',
    category: 'Destinations',
    date: 'Dec 10, 2024',
    readTime: '6 min read',
    slug: 'top-safari-destinations-tanzania',
  },
  {
    id: 3,
    title: 'Gorilla Trekking in Rwanda: What to Expect',
    excerpt: 'Everything you need to know about gorilla trekking permits, best time to visit, and how to prepare for this once-in-a-lifetime experience.',
    image: '/src/assets/hero-safari-2.jpg',
    category: 'Adventure',
    date: 'Dec 5, 2024',
    readTime: '7 min read',
    slug: 'gorilla-trekking-rwanda-guide',
  },
];

export const FaqBlogSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-muted/30 relative overflow-hidden">
      {/* Animated SVG Nature Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          {/* Question mark decorative dots - left side */}
          <g opacity="0.04" fill="#EE8509">
            <circle cx="80" cy="150" r="3" />
            <circle cx="75" cy="165" r="2" />
            <circle cx="85" cy="165" r="2" />
            <circle cx="80" cy="175" r="1.5" />
            <circle cx="80" cy="185" r="2.5" />
          </g>

          {/* Book/page turn elements - right side */}
          <g opacity="0.05" stroke="#2D3748" fill="none">
            <path d="M1360 200 Q1370 210 1360 220" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="d" values="M1360 200 Q1370 210 1360 220;M1360 200 Q1365 210 1360 220;M1360 200 Q1370 210 1360 220" dur="6s" repeatCount="indefinite" />
            </path>
            <path d="M1370 200 Q1380 210 1370 220" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="d" values="M1370 200 Q1380 210 1370 220;M1370 200 Q1375 210 1370 220;M1370 200 Q1380 210 1370 220" dur="7s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Subtle path lines - journey theme */}
          <g opacity="0.03" stroke="#EE8509" fill="none">
            <path d="M100 600 Q300 580 500 600 T900 600" strokeWidth="2" strokeDasharray="8 12">
              <animate attributeName="stroke-dashoffset" values="0;20;0" dur="10s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Small wildlife footprints */}
          <g opacity="0.04" fill="#2D3748">
            <ellipse cx="200" cy="450" rx="4" ry="3" transform="rotate(20 200 450)" />
            <ellipse cx="210" cy="460" rx="4" ry="3" transform="rotate(20 210 460)" />
            <ellipse cx="220" cy="470" rx="4" ry="3" transform="rotate(20 220 470)" />

            <ellipse cx="1200" cy="350" rx="3" ry="2.5" transform="rotate(-15 1200 350)" />
            <ellipse cx="1210" cy="358" rx="3" ry="2.5" transform="rotate(-15 1210 358)" />
            <ellipse cx="1220" cy="366" rx="3" ry="2.5" transform="rotate(-15 1220 366)" />
          </g>

          {/* Compass rose - exploration theme */}
          <g opacity="0.04" stroke="#EE8509" fill="none">
            <circle cx="1300" cy="650" r="20" strokeWidth="1" />
            <path d="M1300 630 L1300 670 M1280 650 L1320 650" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M1312 638 L1300 650 L1312 662 M1288 638 L1300 650 L1288 662" strokeWidth="1" strokeLinecap="round" />
          </g>

          {/* Decorative plant leaves - bottom corners */}
          <g opacity="0.05" fill="#2D3748">
            <path d="M50 750 Q60 740 70 750" />
            <path d="M40 760 Q50 750 60 760" />
            <path d="M1380 750 Q1370 740 1360 750" />
            <path d="M1390 760 Q1380 750 1370 760" />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* FAQ Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-primary" />
              <span className="font-heading text-sm uppercase tracking-widest text-primary">
                Have Questions?
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Frequently Asked
              <span className="text-primary block">Questions</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8">
              Find answers to the most common questions about planning your safari adventure.
            </p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-background rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/50"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-start justify-between p-6 text-left transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <HelpCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-bold text-foreground pr-8">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pl-20">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
              <p className="text-foreground font-heading font-medium mb-2">
                Still have questions?
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                Our travel experts are here to help you plan your perfect safari adventure.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-primary font-heading text-sm uppercase tracking-wider hover:gap-3 transition-all"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Blog Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-secondary" />
              <span className="font-heading text-sm uppercase tracking-widest text-secondary">
                Travel Insights
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Recent Articles &
              <span className="text-gradient-gold block">Travel Tips</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8">
              Expert advice and inspiring stories to help you plan your dream safari.
            </p>

            <div className="space-y-6">
              {blogPosts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group block bg-background rounded-2xl overflow-hidden border border-border hover:border-secondary/50 transition-all duration-300 card-hover"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="grid sm:grid-cols-3 gap-0">
                    <div className="relative sm:col-span-1 h-48 sm:h-auto overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-heading font-semibold text-foreground">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="sm:col-span-2 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-muted-foreground text-xs">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-secondary font-heading text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/wild-tales"
                className="flex items-center justify-center gap-2 w-full h-14 bg-gradient-to-r from-secondary to-secondary/80 text-white font-heading font-semibold rounded-xl hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300"
              >
                <Newspaper className="w-5 h-5" />
                View All Articles
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
