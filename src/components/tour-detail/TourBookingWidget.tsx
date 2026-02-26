import { useState } from 'react';
import { Tour } from '@/data/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Users, DollarSign, Shield, MessageCircle, Mail, Phone, User, Send, ChevronDown, CreditCard, Building, ArrowRight, X, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { sendBookingNotification } from '@/lib/email';

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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'email' | 'bank' | 'skip'>('skip');

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

    setShowPaymentModal(true);
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);

    try {
      const specialReqsWithPayment = `${formData.message}\n\n[Payment Preference: ${paymentMethod}]`.trim();

      // Save to database
      const { error: dbError } = await supabase
        .from('booking_requests')
        .insert([
          {
            first_name: formData.name.split(' ')[0] || '',
            last_name: formData.name.split(' ').slice(1).join(' ') || '.',
            email: formData.email,
            phone: formData.phone,
            destination: tour.location || 'Not Specified',
            travel_style: 'Package Booking',
            start_date: formData.date,
            end_date: formData.date,
            adults: adults,
            children: children,
            accommodation: 'Not Specified',
            package_title: tour.title,
            package_slug: tour.slug,
            special_requirements: specialReqsWithPayment,
            status: 'new',
            submitted_at: new Date().toISOString()
          }
        ]);

      if (dbError) throw dbError;

      // Send email notification to admin
      await sendBookingNotification({
        firstName: formData.name.split(' ')[0] || '',
        lastName: formData.name.split(' ').slice(1).join(' ') || '.',
        email: formData.email,
        phone: formData.phone,
        destination: tour.location || 'Not Specified',
        travelStyle: 'Package Booking',
        startDate: formData.date,
        endDate: '',
        adults: adults,
        children: children,
        accommodation: 'Not Specified',
        packageTitle: tour.title,
        specialRequirements: specialReqsWithPayment,
        duration: 0,
      });

      toast({
        title: 'Quote Request Sent!',
        description: 'Our team will contact you within 24 hours',
      });
      setSubmitting(false);
      setShowPaymentModal(false);
      setShowQuoteForm(false);
      setFormData({ name: '', email: '', phone: '', date: '', message: '' });
      setPaymentMethod('skip');

    } catch (error) {
      console.error('Booking submission error:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setSubmitting(false);
    }
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

      {/* Payment Options Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-background rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-border">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Complete Your Booking</h3>
                <p className="text-sm text-muted-foreground mt-1">Select an optional payment method to secure your spot</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Option 1: Direct Pay Link (Email) */}
              <button
                type="button"
                onClick={() => setPaymentMethod('email')}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${paymentMethod === 'email'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
                  }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${paymentMethod === 'email' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-semibold text-foreground">Direct Pay Link</h4>
                  <p className="text-sm text-muted-foreground">Pay securely online via DPO Group</p>
                </div>
              </button>

              {/* Option 2: Bank Transfer */}
              <button
                type="button"
                onClick={() => setPaymentMethod('bank')}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${paymentMethod === 'bank'
                  ? 'border-secondary bg-secondary/5'
                  : 'border-border hover:border-secondary/50'
                  }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${paymentMethod === 'bank' ? 'bg-secondary text-white' : 'bg-muted text-muted-foreground'}`}>
                  <Building className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-semibold text-foreground">Bank Transfer</h4>
                  <p className="text-sm text-muted-foreground">Direct bank deposit details</p>
                </div>
              </button>

              {/* Dynamic Content Based on Selection */}
              {paymentMethod === 'email' && (
                <div className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/20 animate-in slide-in-from-top-2">
                  <p className="text-sm text-foreground font-medium mb-2">Click below to pay via our secure gateway:</p>
                  <a
                    href="https://shop.directpay.online//paymybills/DemiToursAndTravelsCompanyLimited"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm underline underline-offset-4"
                  >
                    Proceed to Direct Pay Online
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="mt-4 p-4 bg-secondary/10 rounded-xl border border-secondary/20 animate-in slide-in-from-top-2">
                  <p className="font-bold text-foreground mb-2 text-sm">Bank Details (Tanzania):</p>
                  <ul className="text-sm text-muted-foreground space-y-1 font-mono">
                    <li><span className="text-foreground font-semibold">Bank:</span> CRDB Bank PLC</li>
                    <li><span className="text-foreground font-semibold">Account Name:</span> Demi Tours & Travels</li>
                    <li><span className="text-foreground font-semibold">Account No (USD):</span> 025XXXXXXXX</li>
                    <li><span className="text-foreground font-semibold">SWIFT Code:</span> CORUTZTZ</li>
                  </ul>
                  <p className="text-xs text-secondary mt-3 italic">* Please include your name in the payment reference.</p>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="radio"
                  id="skip_payment"
                  name="payment"
                  checked={paymentMethod === 'skip'}
                  onChange={() => setPaymentMethod('skip')}
                  className="text-primary focus:ring-primary w-4 h-4"
                />
                <label htmlFor="skip_payment" className="text-sm text-muted-foreground cursor-pointer">
                  Skip payment for now (I will pay later)
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-border bg-muted/30 flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                className="flex-1 gap-2"
                onClick={handleFinalSubmit}
                disabled={submitting}
              >
                {submitting ? 'Processing...' : 'Submit Booking'}
                {!submitting && <CheckCircle className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
