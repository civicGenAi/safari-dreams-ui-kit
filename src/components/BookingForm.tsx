import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
  Sparkles
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
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
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-semibold transition-colors ${
                      s <= step
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-16 lg:w-24 h-1 mx-2 rounded-full transition-colors ${
                        s < step ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
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
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            formData.accommodation === option.value
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
                      className="flex-1 gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      Request Quote
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
      </div>
    </section>
  );
};
