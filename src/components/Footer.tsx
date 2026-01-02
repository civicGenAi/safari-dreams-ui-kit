import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ArrowUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/RCGP_Logo_Small-removebg-preview-1.webp';
import ttssp from '@/assets/tanzniatourism.webp';
import payment from '@/assets/payment.webp';

const destinations = [
  { name: 'Tanzania', href: '/destinations/tanzania' },
  { name: 'Kenya', href: '/destinations/kenya' },
  { name: 'Rwanda', href: '/destinations/rwanda' },
  { name: 'Uganda', href: '/destinations/uganda' },
];

const quickLinks = [
  { name: 'Explore', href: '/' },
  { name: 'Destinations', href: '/destinations' },
  { name: 'Experiences', href: '/travel-ideas' },
  { name: 'About Us', href: '/our-story' },
  { name: 'Stories', href: '/wild-tales' },
  { name: 'Plan Your Trip', href: '/contact' },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#a68a64] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column with Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img
                src={logo}
                alt="DeMi Tours"
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-white/80 mb-6 leading-relaxed text-sm">
              Our commitment to sustainability extends to our partnerships with local communities in the regions we visit. In addition to our responsible travel practices, a portion of our earnings is dedicated to supporting{' '}
              <a href="#" className="underline hover:text-white transition-colors">Dyslexia Tanzania</a>, 
              a non-profit organization that aims to raise awareness about dyslexia and advocate for equal learning opportunities for children with dyslexia.
            </p>
            
            {/* Payment Partners */}
            <div className="mt-6">
              <span className="text-secondary font-heading text-sm uppercase tracking-wider font-medium">
                PAYMENT PARTNERS
              </span>
              <div className="mt-3">
                <img
                  src={payment}
                  alt="Payment Partners - Mastercard, Visa, PayPal, Western Union, Skrill"
                  className="h-12 w-auto"
                />
              </div>
            </div>
          </div>

          {/* Our Destinations */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6 text-white uppercase tracking-wide">
              OUR DESTINATIONS
            </h4>
            <ul className="space-y-3">
              {destinations.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* TTSSP Certification */}
            <div className="mt-8">
              <img
                src={ttssp}
                alt="Tanzania Tourism Sector Safety and Protection"
                className="w-28 h-auto"
              />
              <p className="text-white/70 text-xs mt-2">
                DeMi Certified by TTSSP
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6 text-white uppercase tracking-wide">
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6 text-white uppercase tracking-wide">
              CONTACTS
            </h4>
            
            {/* Main Office */}
            <div className="mb-6">
              <p className="text-white/90 text-sm font-medium">DeMi Tours & Travels</p>
              <p className="text-white/70 text-sm">Mega Complex, 7th Flr.</p>
              <p className="text-white/70 text-sm">Livingstone Street.</p>
              <p className="text-white/70 text-sm">P.O Box 15258,</p>
              <p className="text-white/70 text-sm">Arusha, Tanzania.</p>
            </div>

            {/* China Office */}
            <div className="mb-6">
              <p className="text-white/90 text-sm font-medium">China Office</p>
              <p className="text-white/70 text-sm">1016# Garden Hotel- Guangzhou</p>
              <p className="text-white/70 text-sm">+(86) 135 0101 0811 -Yuan Wei</p>
            </div>

            {/* Australia Office */}
            <div className="mb-6">
              <p className="text-white/90 text-sm font-medium">Australia Office</p>
              <p className="text-white/70 text-sm">NSW 2000 Australia</p>
              <p className="text-white/70 text-sm">Tel: +61405968329</p>
              <p className="text-white/70 text-sm">Gabriely Francis Sydney</p>
            </div>

            {/* WhatsApp */}
            <p className="text-white/90 text-sm mb-2">Call/WhatsApp</p>
            <p className="text-white font-bold text-xl">+(255)688 535848</p>
            <p className="text-white font-bold text-xl">+(255)762 238763</p>

            {/* Email */}
            <a 
              href="mailto:info@demitours.com" 
              className="block mt-4 text-white/90 text-sm hover:text-white transition-colors"
            >
              info@demitours.com
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()}{' '}
              <a href="/" className="underline hover:text-white transition-colors">
                DeMi Tours
              </a>
              . All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-white/60">
              <Link to="/terms-conditions" className="hover:text-white transition-colors underline">Terms & Conditions</Link>
              <Link to="/cookie-preferences" className="hover:text-white transition-colors">Cookie Preferences</Link>
              <Link to="/privacy-policy" className="hover:text-white transition-colors underline">Privacy Policy</Link>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/DeMitoursandtravelsafrica/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-charcoal transition-colors text-white/70"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/demitoursandtravelafrica?utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-charcoal transition-colors text-white/70"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/demi-tours-travel/?originalSubdomain=tz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-charcoal transition-colors text-white/70"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full bg-secondary text-charcoal flex items-center justify-center hover:bg-secondary/90 transition-colors ml-2"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
