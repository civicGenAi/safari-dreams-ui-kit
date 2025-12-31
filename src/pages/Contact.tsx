import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! (In real app, this would send the form data to your server)');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src="/header_bg_new4.gif"
          alt="Contact Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Get in <span className="text-gradient-gold">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Have a question about our tours? Want to customize your safari? Our team is here to help you plan your perfect African adventure.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Introduction */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              We will be delighted to hear from you
            </h2>
            <p className="text-lg text-muted-foreground">
              Use the form below or contact us via phone, email, social media, or in-person.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">Email us</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We will endeavour to reply your message within two business days.
                </p>
                <div className="flex items-start gap-3 mb-6">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <a href="mailto:info@demitours.com" className="text-sm text-primary hover:underline font-medium">
                      Click here to email us
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      info@demitours.com
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6 mb-6">
                  <h4 className="font-heading font-semibold text-base mb-3">Trip Queries</h4>
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium text-sm mb-2">Helpline/WhatsApp</div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <a href="tel:+255688535848" className="block hover:text-primary">+(255) 688 535848</a>
                        <a href="tel:+255762238763" className="block hover:text-primary">+(255) 762 238763</a>
                        <a href="tel:+8613501010811" className="block hover:text-primary">+(86) 135 0101 0811 <span className="text-xs">(China)</span></a>
                        <a href="tel:+61405968329" className="block hover:text-primary">+61405968329 <span className="text-xs">(Australia)</span></a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium text-sm mb-1">Office Hours</div>
                      <p className="text-sm text-muted-foreground">
                        Monday-Friday: 8am-5pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <h3 className="font-heading font-semibold text-xl mb-6">Send Us a Message</h3>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" required placeholder="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input type="email" id="email" required placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input type="tel" id="phone" placeholder="+1 234 567 8900" />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <select id="subject" required className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>General Inquiry</option>
                      <option>Tour Booking</option>
                      <option>Custom Safari Request</option>
                      <option>Group Booking</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea id="message" required rows={6} placeholder="Tell us about your dream safari..." />
                </div>

                <Button type="submit" variant="gold" size="lg" className="w-full md:w-auto">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
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

export default Contact;
