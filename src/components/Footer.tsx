import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  ChevronRight,
  ArrowUp
} from 'lucide-react';

const quickLinks = [
  { name: 'About Us', href: '#about' },
  { name: 'Our Tours', href: '#tours' },
  { name: 'Destinations', href: '#destinations' },
  { name: 'Travel Ideas', href: '#travel-ideas' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

const destinations = [
  { name: 'Tanzania Safari', href: '#tanzania' },
  { name: 'Kenya Tours', href: '#kenya' },
  { name: 'Rwanda Gorillas', href: '#rwanda' },
  { name: 'Uganda Adventures', href: '#uganda' },
  { name: 'Israel Pilgrimage', href: '#israel' },
  { name: 'Egypt Wonders', href: '#egypt' },
];

const travelIdeas = [
  { name: 'Safari Adventures', href: '#safari' },
  { name: 'Beach Holidays', href: '#beach' },
  { name: 'Mountain Trekking', href: '#trekking' },
  { name: 'Cultural Tours', href: '#cultural' },
  { name: 'Wildlife Expeditions', href: '#wildlife' },
  { name: 'Honeymoon Packages', href: '#honeymoon' },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-block mb-6">
              <img
                src="/src/assets/RCGP_Logo_Small-removebg-preview-1.webp"
                alt="DeMi Tours"
                className="h-12 w-auto"
              />
            </a>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Crafting extraordinary safari experiences across East Africa and beyond since 2009.
              Your gateway to unforgettable adventures.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Youtube, href: '#' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-charcoal transition-colors"
                  aria-label={`Social link ${index + 1}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-primary-foreground/70 hover:text-secondary transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Destinations</h4>
            <ul className="space-y-3">
              {destinations.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-primary-foreground/70 hover:text-secondary transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+255688535848"
                  className="flex items-start gap-3 text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  <Phone className="w-5 h-5 mt-0.5 text-secondary" />
                  <div>
                    <span className="block font-heading font-medium text-primary-foreground">
                      +255 688 535848
                    </span>
                    <span className="text-sm">Mon-Sat, 8am-6pm EAT</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@demitours.com"
                  className="flex items-start gap-3 text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  <Mail className="w-5 h-5 mt-0.5 text-secondary" />
                  <div>
                    <span className="block font-heading font-medium text-primary-foreground">
                      info@demitours.com
                    </span>
                    <span className="text-sm">We reply within 24 hours</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin className="w-5 h-5 mt-0.5 text-secondary flex-shrink-0" />
                <div>
                  <span className="block font-heading font-medium text-primary-foreground">
                    Arusha, Tanzania
                  </span>
                  <span className="text-sm">Plot 123, Safari Street</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} DeMi Tours. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
              <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-secondary transition-colors">Cookies</a>
            </div>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-secondary text-charcoal flex items-center justify-center hover:bg-secondary/90 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
