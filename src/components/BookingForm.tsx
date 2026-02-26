import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { sendBookingNotification } from '@/lib/email';
import {
  Users,
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  Globe,
  MessageSquare,
  ChevronRight,
  CheckCircle,
  Sparkles,
  CreditCard,
  Building,
  ArrowRight,
  X
} from 'lucide-react';


const destinations = [
  { value: 'tanzania', label: 'Tanzania', flag: '🇹🇿' },
  { value: 'kenya', label: 'Kenya', flag: '🇰🇪' },
  { value: 'rwanda', label: 'Rwanda', flag: '🇷🇼' },
  { value: 'uganda', label: 'Uganda', flag: '🇺🇬' },
  { value: 'israel', label: 'Israel', flag: '🇮🇱' },
  { value: 'egypt', label: 'Egypt', flag: '🇪🇬' },
  { value: 'jordan', label: 'Jordan', flag: '🇯🇴' },
];

const tourTypes = [
  'Safari Adventure',
  'Beach Holiday',
  'Mountain Trekking',
  'Gorilla Tracking',
  'Cultural Tour',
  'Pilgrimage',
];

export const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    tourType: '',
    adults: 2,
    children: 0,
    startDate: '',
    endDate: '',
    name: '',
    email: '',
    phone: '',
    nationality: '',
    accommodation: 'standard',
    message: '',
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'email' | 'bank' | 'skip'>('skip');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const specialReqsWithPayment = `${formData.message}`.trim();
      const duration = formData.startDate && formData.endDate
        ? Math.max(1, Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)))
        : 0;

      // Save to database
      const { error: dbError } = await supabase
        .from('booking_requests')
        .insert([
          {
            first_name: formData.name.split(' ')[0] || '',
            last_name: formData.name.split(' ').slice(1).join(' ') || '.',
            email: formData.email,
            phone: formData.phone,
            destination: formData.destination,
            travel_style: formData.tourType,
            start_date: formData.startDate,
            end_date: formData.endDate || formData.startDate,
            adults: formData.adults,
            children: formData.children,
            accommodation: formData.accommodation,
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
        destination: formData.destination,
        travelStyle: formData.tourType,
        startDate: formData.startDate,
        endDate: formData.endDate || formData.startDate,
        adults: formData.adults,
        children: formData.children,
        accommodation: formData.accommodation,
        specialRequirements: specialReqsWithPayment,
        duration: duration
      });

      setIsSubmitting(false);
      // Lead is captured, now show payment popup
      setShowPaymentModal(true);

      // Reset form
      setStep(1);
      setFormData({
        destination: '',
        tourType: '',
        adults: 2,
        children: 0,
        startDate: '',
        endDate: '',
        name: '',
        email: '',
        phone: '',
        nationality: '',
        accommodation: 'standard',
        message: '',
      });

    } catch (error) {
      console.error('Booking form submission error:', error);
      alert('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Content */}
          <div className="lg:sticky lg:top-32">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-secondary" />
              <span className="font-heading text-sm uppercase tracking-widest text-secondary">
                Start Planning
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Request Your
              <span className="text-gradient-gold block">Free Quote</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8">
              Tell us about your dream safari and we'll create a personalized itinerary
              just for you. No obligations, completely free.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-10">
              {[
                'Personalized itinerary within 24 hours',
                'Expert advice from local travel specialists',
                'Best price guarantee on all tours',
                'Flexible booking and payment options',
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 p-6 bg-card rounded-2xl border border-border">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <span className="block font-display text-2xl font-bold text-foreground">100%</span>
                <span className="text-muted-foreground text-sm">Free consultation</span>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <span className="block font-display text-2xl font-bold text-foreground">24h</span>
                <span className="text-muted-foreground text-sm">Response time</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-background rounded-3xl shadow-lg p-8 lg:p-10 border border-border">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-semibold transition-colors ${s <= step
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                      }`}
                  >
                    {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-16 lg:w-24 h-1 mx-2 rounded-full transition-colors ${s < step ? 'bg-primary' : 'bg-muted'
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleBookingSubmit}>
              {/* Step 1: Tour Details */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6">
                    Tour Details
                  </h3>

                  {/* Destination */}
                  <div>
                    <label className="block font-heading text-sm font-medium text-foreground mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Destination *
                    </label>
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                      required
                    >
                      <option value="">Select destination</option>
                      {destinations.map((dest) => (
                        <option key={dest.value} value={dest.value}>
                          {dest.flag} {dest.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tour Type */}
                  <div>
                    <label className="block font-heading text-sm font-medium text-foreground mb-2">
                      Tour Type *
                    </label>
                    <select
                      name="tourType"
                      value={formData.tourType}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                      required
                    >
                      <option value="">Select tour type</option>
                      {tourTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Travelers */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-heading text-sm font-medium text-foreground mb-2">
                        <Users className="w-4 h-4 inline mr-2" />
                        Adults *
                      </label>
                      <div className="flex items-center h-12 border border-input rounded-xl overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, adults: Math.max(1, formData.adults - 1) })}
                          className="w-12 h-full flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-heading font-medium text-foreground">
                          {formData.adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                          className="w-12 h-full flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block font-heading text-sm font-medium text-foreground mb-2">
                        Children
                      </label>
                      <div className="flex items-center h-12 border border-input rounded-xl overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, children: Math.max(0, formData.children - 1) })}
                          className="w-12 h-full flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-heading font-medium text-foreground">
                          {formData.children}
                        </span>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, children: formData.children + 1 })}
                          className="w-12 h-full flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-heading text-sm font-medium text-foreground mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Start Date *
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-heading text-sm font-medium text-foreground mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="gold"
                    size="xl"
                    className="w-full gap-2"
                    onClick={() => setStep(2)}
                  >
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              )}

              {/* Step 2: Personal Details */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6">
                    Personal Details
                  </h3>

                  <div>
                    <label className="block font-heading text-sm font-medium text-foreground mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-heading text-sm font-medium text-foreground mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-heading text-sm font-medium text-foreground mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 8900"
                      className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-heading text-sm font-medium text-foreground mb-2">
                      <Globe className="w-4 h-4 inline mr-2" />
                      Nationality
                    </label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      placeholder="e.g., United States"
                      className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="xl"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="gold"
                      size="xl"
                      className="flex-1 gap-2"
                      onClick={() => setStep(3)}
                    >
                      Continue
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Preferences */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6">
                    Preferences & Message
                  </h3>

                  {/* Accommodation */}
                  <div>
                    <label className="block font-heading text-sm font-medium text-foreground mb-3">
                      Accommodation Level
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'budget', label: 'Budget', icon: '🏕️' },
                        { value: 'standard', label: 'Standard', icon: '🏨' },
                        { value: 'luxury', label: 'Luxury', icon: '🏰' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, accommodation: option.value })}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${formData.accommodation === option.value
                            ? 'border-secondary bg-secondary/10'
                            : 'border-border hover:border-secondary/50'
                            }`}
                        >
                          <span className="text-2xl mb-2 block">{option.icon}</span>
                          <span className="font-heading text-sm font-medium text-foreground">
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-heading text-sm font-medium text-foreground mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Special Requests
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about any special requirements or interests..."
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary transition-all resize-none"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="xl"
                      className="flex-1"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="gold"
                      size="xl"
                    >
                      {isSubmitting ? <span className="animate-spin mr-2">⏳</span> : <Sparkles className="w-5 h-5" />}
                      {isSubmitting ? 'Processing...' : 'Request Quote'}
                    </Button>
                  </div>

                  <p className="text-center text-muted-foreground text-sm">
                    By submitting, you agree to our{' '}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div >

      {/* Payment Options Modal */}
      {
        showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-background rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <div className="inline-flex items-center gap-2 text-green-600 mb-2">
                    <CheckCircle className="w-6 h-6" />
                    <h3 className="font-display text-xl font-bold">Booking Received!</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">We've saved your request. Do you want to secure your spot now by paying?</p>
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
              <div className="p-6 space-y-4">
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
              <div className="p-6 border-t border-border bg-muted/30 flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full md:w-auto"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Close Window
                </Button>
              </div>
            </div>
          </div>
        </div>
  )
}
    </section >
  );
};
