import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import feedbackClient1 from '@/assets/feedback_client.webp';
import feedbackClient2 from '@/assets/feedback_client2.webp';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  title: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'ANAT K',
    location: 'Haifa, Israel',
    title: 'Great Safari, Professional Planning',
    rating: 5,
    text: '"In one word- Wow!!! What an adventure. Great Safari production, everything was planned to the letter. Great choice of lodges and the BEST guide! Huruma, the guide, was the icing on the cake - professional spotting abilities upgraded the entire safari experience. Asanta sana"',
  },
  {
    id: '2',
    name: 'SARAH T',
    location: 'London, UK',
    title: 'Life-Changing Experience',
    rating: 5,
    text: '"An absolutely magical experience! The guides were incredibly knowledgeable, and we saw all of the Big Five in just three days. The accommodations exceeded our expectations. Would highly recommend DeMi Tours to anyone!"',
  },
  {
    id: '3',
    name: 'JAMES W',
    location: 'Sydney, Australia',
    title: 'Unforgettable Kilimanjaro Summit',
    rating: 5,
    text: '"Climbing Kilimanjaro was a life-changing experience. The DeMi Tours team made sure we were safe and well-prepared at every step. Reaching the summit at sunrise was absolutely unforgettable. Thank you!"',
  },
  {
    id: '4',
    name: 'MARIA R',
    location: 'Madrid, Spain',
    title: 'Gorilla Trekking Adventure',
    rating: 5,
    text: '"The gorilla trekking in Rwanda was beyond words. Coming face to face with these gentle giants was the most incredible wildlife encounter of my life. DeMi Tours handled every detail perfectly."',
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Animated SVG Testimonial Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          {/* Quote marks - decorative */}
          <g opacity="0.04" fill="#EE8509">
            <path d="M100 150 Q90 150 90 140 Q90 130 100 130 L100 140 Q95 140 95 145 Q95 150 100 150 Z" />
            <path d="M120 150 Q110 150 110 140 Q110 130 120 130 L120 140 Q115 140 115 145 Q115 150 120 150 Z" />

            <path d="M1320 600 Q1310 600 1310 590 Q1310 580 1320 580 L1320 590 Q1315 590 1315 595 Q1315 600 1320 600 Z" />
            <path d="M1340 600 Q1330 600 1330 590 Q1330 580 1340 580 L1340 590 Q1335 590 1335 595 Q1335 600 1340 600 Z" />
          </g>

          {/* Star ratings scattered - representing positive feedback */}
          <g opacity="0.05" fill="#EE8509">
            <path d="M200 250 L202 256 L208 256 L203 260 L205 266 L200 262 L195 266 L197 260 L192 256 L198 256 Z">
              <animate attributeName="opacity" values="0.05;0.07;0.05" dur="4s" repeatCount="indefinite" />
            </path>
            <path d="M250 280 L252 286 L258 286 L253 290 L255 296 L250 292 L245 296 L247 290 L242 286 L248 286 Z">
              <animate attributeName="opacity" values="0.05;0.07;0.05" dur="5s" repeatCount="indefinite" />
            </path>
            <path d="M1180 200 L1182 206 L1188 206 L1183 210 L1185 216 L1180 212 L1175 216 L1177 210 L1172 206 L1178 206 Z">
              <animate attributeName="opacity" values="0.05;0.07;0.05" dur="4.5s" repeatCount="indefinite" />
            </path>
            <path d="M1240 250 L1242 256 L1248 256 L1243 260 L1245 266 L1240 262 L1235 266 L1237 260 L1232 256 L1238 256 Z">
              <animate attributeName="opacity" values="0.05;0.07;0.05" dur="5.5s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Speech bubble shapes */}
          <g opacity="0.04" stroke="#2D3748" fill="none">
            <g>
              <rect x="150" y="500" width="60" height="40" rx="8" strokeWidth="1.5" />
              <path d="M160 540 L165 545 L170 540" strokeWidth="1.5" />
              <animate attributeName="opacity" values="0.04;0.06;0.04" dur="6s" repeatCount="indefinite" />
            </g>

            <g>
              <rect x="1230" y="450" width="55" height="38" rx="8" strokeWidth="1.5" />
              <path d="M1270 488 L1265 493 L1260 488" strokeWidth="1.5" />
              <animate attributeName="opacity" values="0.04;0.06;0.04" dur="7s" repeatCount="indefinite" />
            </g>
          </g>

          {/* Heart shapes - love/satisfaction */}
          <g opacity="0.04" fill="#EE8509">
            <path d="M300 400 C300 395 295 390 290 390 C287 390 285 392 283 394 C281 392 279 390 276 390 C271 390 266 395 266 400 C266 408 283 420 283 420 C283 420 300 408 300 400 Z">
              <animate attributeName="opacity" values="0.04;0.06;0.04" dur="5s" repeatCount="indefinite" />
            </path>

            <path d="M1160 550 C1160 545 1155 540 1150 540 C1147 540 1145 542 1143 544 C1141 542 1139 540 1136 540 C1131 540 1126 545 1126 550 C1126 558 1143 570 1143 570 C1143 570 1160 558 1160 550 Z">
              <animate attributeName="opacity" values="0.04;0.06;0.04" dur="6s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Thumbs up icons - very subtle */}
          <g opacity="0.03" stroke="#EE8509" fill="none">
            <path d="M80 350 L80 370 L90 370 L90 365 L95 360 L95 352 L92 348 L88 348 L85 352 L85 355 L80 355" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M1360 300 L1360 320 L1370 320 L1370 315 L1375 310 L1375 302 L1372 298 L1368 298 L1365 302 L1365 305 L1360 305" strokeWidth="1.5" strokeLinejoin="round" />
          </g>

          {/* Decorative dots representing people/community */}
          <g opacity="0.04" fill="#2D3748">
            <circle cx="400" cy="650" r="3" />
            <circle cx="420" cy="650" r="3" />
            <circle cx="440" cy="650" r="3" />
            <circle cx="410" cy="665" r="2.5" />
            <circle cx="430" cy="665" r="2.5" />

            <circle cx="1000" cy="700" r="3" />
            <circle cx="1020" cy="700" r="3" />
            <circle cx="1040" cy="700" r="3" />
            <circle cx="1010" cy="715" r="2.5" />
            <circle cx="1030" cy="715" r="2.5" />
          </g>

          {/* Curved satisfaction lines */}
          <g opacity="0.03" stroke="#EE8509" fill="none">
            <path d="M600 150 Q650 140 700 150" strokeWidth="2" strokeDasharray="6 8">
              <animate attributeName="opacity" values="0.03;0.05;0.03" dur="5s" repeatCount="indefinite" />
            </path>
            <path d="M750 700 Q800 690 850 700" strokeWidth="2" strokeDasharray="6 8">
              <animate attributeName="opacity" values="0.03;0.05;0.03" dur="6s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Camera/memory icons - safari memories */}
          <g opacity="0.04" stroke="#2D3748" fill="none">
            <g>
              <rect x="1100" y="120" width="28" height="20" rx="2" strokeWidth="1.5" />
              <circle cx="1114" cy="130" r="6" strokeWidth="1.5" />
              <rect x="1120" y="123" width="4" height="3" fill="#2D3748" />
            </g>
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary font-medium">
            AUTHENTIC TRAVELER FEEDBACK
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-6 italic">
            Our Travelers experiences...
          </h2>
          <div className="w-16 h-px bg-primary/60 mx-auto mt-6" />
        </div>

        {/* Main Content - Images on sides, testimonial in center */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Image */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="relative">
              <img
                src={feedbackClient1}
                alt="Happy traveler"
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent rounded-3xl" />
            </div>
          </div>

          {/* Center - Testimonials Carousel */}
          <div className="lg:col-span-6 relative">
            <div className="relative min-h-[350px] flex items-center">
              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-0 lg:-left-4 z-10 w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors bg-background/80 backdrop-blur-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 lg:-right-4 z-10 w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors bg-background/80 backdrop-blur-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Testimonials */}
              <div className="w-full px-16">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`transition-all duration-700 ${
                      index === currentIndex
                        ? 'opacity-100 block'
                        : 'opacity-0 hidden'
                    }`}
                  >
                    <div className="bg-background rounded-3xl p-8 md:p-10 shadow-xl border border-border text-center">
                      {/* Title */}
                      <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-6 underline decoration-primary/30 underline-offset-4">
                        {testimonial.title}
                      </h3>

                      {/* Quote */}
                      <blockquote className="font-display text-base md:text-lg text-muted-foreground leading-relaxed mb-6 italic">
                        {testimonial.text}
                      </blockquote>

                      {/* Stars */}
                      <div className="flex items-center justify-center gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                        ))}
                      </div>
                    </div>

                    {/* Author Badge - Outside card */}
                    <div className="flex justify-center -mt-5">
                      <div className="bg-muted/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                        <span className="block font-heading font-bold text-foreground text-sm tracking-wide">
                          {testimonial.name}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {testimonial.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="relative">
              <img
                src={feedbackClient2}
                alt="Safari photographer"
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
