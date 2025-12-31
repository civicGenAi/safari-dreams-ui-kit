import { useState } from 'react';
import { Tour } from '@/data/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Users, DollarSign, Shield, MessageCircle, Mail, Phone, User, Send, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TourBookingWidgetProps {
  tour: Tour | any;
}

export const TourBookingWidget = ({ tour }: TourBookingWidgetProps) => {
  const { toast } = useToast();
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const totalPrice = tour.price * (adults + children * 0.5);

  const handleQuoteRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Quote Request Sent!',
        description: 'Our team will contact you within 24 hours',
      });
      setSubmitting(false);
      setShowQuoteForm(false);
      setFormData({ name: '', email: '', phone: '', date: '', message: '' });
    }, 1000);
  };

  return (
    <div className="rounded-2xl border border-border bg-card shadow-lift overflow-hidden sticky top-24">
      {/* Price Header */}
      <div className="p-6 bg-primary/5 border-b border-border">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-display font-bold text-foreground">
            ${tour.price}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">per person</p>
      </div>

      {/* Quick Booking Summary */}
      <div className="p-6 space-y-4">
        {/* Travelers Counter */}
        <div>
          <label className="text-sm font-heading font-medium mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Travelers
          </label>

          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background mb-2">
            <div>
              <div className="font-medium text-sm">Adults</div>
              <div className="text-xs text-muted-foreground">Age 13+</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center font-semibold">{adults}</span>
              <button
                onClick={() => setAdults(adults + 1)}
                className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
            <div>
              <div className="font-medium text-sm">Children</div>
              <div className="text-xs text-muted-foreground">Age 2-12 (50% off)</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center font-semibold">{children}</span>
              <button
                onClick={() => setChildren(children + 1)}
                className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="p-4 rounded-lg bg-muted/50 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              ${tour.price} x {adults} adult{adults > 1 ? 's' : ''}
            </span>
            <span className="font-medium">${tour.price * adults}</span>
          </div>
          {children > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                ${tour.price * 0.5} x {children} child{children > 1 ? 'ren' : ''}
              </span>
              <span className="font-medium">${tour.price * children * 0.5}</span>
            </div>
          )}
          <div className="pt-2 border-t border-border flex items-center justify-between">
            <span className="font-heading font-semibold">Total</span>
            <span className="text-2xl font-display font-bold text-primary">
              ${totalPrice.toFixed(0)}
            </span>
          </div>
        </div>

        {/* Quote Form Toggle */}
        <Button
          variant="default"
          size="lg"
          className="w-full"
          onClick={() => setShowQuoteForm(!showQuoteForm)}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Request Free Quote
          <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showQuoteForm ? 'rotate-180' : ''}`} />
        </Button>

        {/* Expandable Quote Form */}
        {showQuoteForm && (
          <form onSubmit={handleQuoteRequest} className="space-y-4 pt-4 border-t animate-in slide-in-from-top-2">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-primary" />
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>

            <div>
              <Label htmlFor="date" className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                Preferred Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <Label htmlFor="message" className="mb-2">
                Special Requests (Optional)
              </Label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Dietary requirements, accessibility needs, etc."
                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
              />
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={submitting}>
              <Send className="w-5 h-5 mr-2" />
              {submitting ? 'Sending...' : 'Send Quote Request'}
            </Button>
          </form>
        )}

        {/* Trust Indicators */}
        <div className="pt-4 space-y-2 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Free cancellation up to 48 hours</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Instant confirmation</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Best price guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
