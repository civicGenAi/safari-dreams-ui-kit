import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookingFormModal } from '@/components/BookingFormModal';
import { Calendar, Phone, ArrowRight } from 'lucide-react';

export const CtaBookingSection = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 15 L45 30 L30 45 L15 30 Z" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-pattern)" />
          </svg>
        </div>

        {/* Animated CTA Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            {/* Calendar pages - booking theme */}
            <g opacity="0.04" stroke="#EE8509" fill="none">
              <rect x="100" y="80" width="40" height="50" rx="4" strokeWidth="1.5" />
              <line x1="100" y1="95" x2="140" y2="95" stroke="#EE8509" strokeWidth="2" />
              <circle cx="115" cy="110" r="2" fill="#EE8509" />
              <circle cx="125" cy="110" r="2" fill="#EE8509" />
              <circle cx="115" cy="120" r="2" fill="#EE8509" />
              <circle cx="125" cy="120" r="2" fill="#EE8509" />
            </g>

            {/* Phone/contact icons */}
            <g opacity="0.04" stroke="#2D3748" fill="none">
              <rect x="1300" y="100" width="24" height="40" rx="6" strokeWidth="1.5" />
              <circle cx="1312" cy="115" r="1.5" fill="#2D3748" />
              <line x1="1306" y1="132" x2="1318" y2="132" stroke="#2D3748" strokeWidth="1" />
            </g>

            {/* Heart/family icons */}
            <g opacity="0.05" fill="#EE8509">
              <path d="M200 300 C200 295 195 290 190 290 C187 290 185 292 183 294 C181 292 179 290 176 290 C171 290 166 295 166 300 C166 308 183 320 183 320 C183 320 200 308 200 300 Z">
                <animate attributeName="opacity" values="0.05;0.07;0.05" dur="4s" repeatCount="indefinite" />
              </path>

              <path d="M1270 280 C1270 275 1265 270 1260 270 C1257 270 1255 272 1253 274 C1251 272 1249 270 1246 270 C1241 270 1236 275 1236 280 C1236 288 1253 300 1253 300 C1253 300 1270 288 1270 280 Z">
                <animate attributeName="opacity" values="0.05;0.07;0.05" dur="5s" repeatCount="indefinite" />
              </path>
            </g>

            {/* Handshake/partnership elements */}
            <g opacity="0.03" stroke="#EE8509" fill="none">
              <path d="M1100 350 L1130 350 L1140 340 L1130 350 L1140 360" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Success checkmarks */}
            <g opacity="0.04" stroke="#2D3748" strokeWidth="2" fill="none">
              <path d="M350 150 L360 160 L380 140" strokeLinecap="round" strokeLinejoin="round">
                <animate attributeName="opacity" values="0.04;0.06;0.04" dur="3s" repeatCount="indefinite" />
              </path>
              <path d="M1050 200 L1060 210 L1080 190" strokeLinecap="round" strokeLinejoin="round">
                <animate attributeName="opacity" values="0.04;0.06;0.04" dur="4s" repeatCount="indefinite" />
              </path>
            </g>

            {/* Planning/document lines */}
            <g opacity="0.03" stroke="#2D3748" fill="none">
              <line x1="500" y1="100" x2="560" y2="100" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="500" y1="110" x2="580" y2="110" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="500" y1="120" x2="570" y2="120" strokeWidth="1.5" strokeDasharray="4 4" />

              <line x1="880" y1="300" x2="940" y2="300" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="880" y1="310" x2="960" y2="310" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="880" y1="320" x2="950" y2="320" strokeWidth="1.5" strokeDasharray="4 4" />
            </g>

            {/* Arrow pointers - call to action */}
            <g opacity="0.04" fill="#EE8509">
              <path d="M720 200 L730 200 L725 195 M730 200 L725 205" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <animateTransform attributeName="transform" type="translate" values="0,0; 10,0; 0,0" dur="2s" repeatCount="indefinite" />
              </path>
            </g>

            {/* Globe/world travel icons */}
            <g opacity="0.04" stroke="#2D3748" fill="none">
              <circle cx="300" cy="200" r="20" strokeWidth="1.5" />
              <ellipse cx="300" cy="200" rx="8" ry="20" strokeWidth="1" />
              <line x1="280" y1="200" x2="320" y2="200" strokeWidth="1" />
              <path d="M285 185 Q300 190 315 185" strokeWidth="1" />
              <path d="M285 215 Q300 210 315 215" strokeWidth="1" />
            </g>

            {/* Safari vehicle silhouette - small */}
            <g opacity="0.05" fill="#EE8509">
              <rect x="1150" y="340" width="35" height="18" rx="2" />
              <circle cx="1160" cy="358" r="5" />
              <circle cx="1175" cy="358" r="5" />
              <rect x="1165" y="330" width="12" height="10" rx="1" />
            </g>
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Main Heading */}
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                At Demi Tours and Travel
              </h2>
              <p className="text-2xl md:text-3xl lg:text-4xl font-display text-gradient-gold">
                We treat our clients like family
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="gold"
                size="xl"
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto gap-3 text-lg px-8 py-7 shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <Calendar className="w-6 h-6" />
                Plan Your Safari
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Link to="/tours" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="xl"
                  className="w-full sm:w-auto gap-3 text-lg px-8 py-7 border-2 hover:bg-muted/50"
                >
                  <Phone className="w-6 h-6" />
                  Speak to an Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BookingFormModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};
