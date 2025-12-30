import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, MapPin, Star, Send, X } from 'lucide-react';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const destinations = [
  'Tanzania', 'Kenya', 'Rwanda', 'Uganda', 'Egypt', 'Israel', 'Jordan'
];

const travelStyles = [
  'Safari Adventure', 'Luxury Tour', 'Beach Holiday', 'Migration Safari',
  'Gorilla Trekking', 'Cultural Experience', 'Honeymoon Package'
];

const accommodationTypes = [
  { value: 'budget', label: 'Budget (Camping & Guesthouses)', icon: '🏕️' },
  { value: 'mid-range', label: 'Mid-Range (Comfortable Lodges)', icon: '🏨' },
  { value: 'luxury', label: 'Luxury (5-Star & Exclusive)', icon: '⭐' }
];

export const BookingFormModal = ({ isOpen, onClose }: BookingFormModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    destination: '',
    travelStyle: '',
    startDate: '',
    endDate: '',
    adults: '2',
    children: '0',
    accommodation: 'mid-range',
    budget: '',
    specialRequirements: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Booking form submitted:', formData);
    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset and close after success
    setTimeout(() => {
      setSubmitSuccess(false);
      onClose();
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        destination: '',
        travelStyle: '',
        startDate: '',
        endDate: '',
        adults: '2',
        children: '0',
        accommodation: 'mid-range',
        budget: '',
        specialRequirements: ''
      });
    }, 2000);
  };

  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 0;
    }
    return 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl text-primary">Plan Your Dream Safari</DialogTitle>
          <DialogDescription className="text-base">
            Fill out the form below and our expert travel consultants will craft a personalized itinerary for you within 24 hours.
          </DialogDescription>
        </DialogHeader>

        {submitSuccess ? (
          <div className="py-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold mb-3">Thank You!</h3>
            <p className="text-muted-foreground">
              Your request has been received. Our team will contact you within 24 hours with a personalized safari itinerary.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold flex items-center gap-2 text-foreground">
                <Users className="w-5 h-5 text-primary" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">First Name *</label>
                  <Input
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="John"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">Last Name *</label>
                  <Input
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Doe"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email Address *</label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john.doe@example.com"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone Number *</label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="h-11"
                  />
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold flex items-center gap-2 text-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                Trip Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="destination" className="text-sm font-medium">Preferred Destination *</label>
                  <Select value={formData.destination} onValueChange={(value) => handleInputChange('destination', value)} required>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select a destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((dest) => (
                        <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="travelStyle" className="text-sm font-medium">Travel Style *</label>
                  <Select value={formData.travelStyle} onValueChange={(value) => handleInputChange('travelStyle', value)} required>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select travel style" />
                    </SelectTrigger>
                    <SelectContent>
                      {travelStyles.map((style) => (
                        <SelectItem key={style} value={style}>{style}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Travel Dates */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold flex items-center gap-2 text-foreground">
                <Calendar className="w-5 h-5 text-primary" />
                Travel Dates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="startDate" className="text-sm font-medium">Departure Date *</label>
                  <Input
                    id="startDate"
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="endDate" className="text-sm font-medium">Return Date *</label>
                  <Input
                    id="endDate"
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                    className="h-11"
                  />
                </div>
                {calculateDuration() > 0 && (
                  <div className="flex items-end">
                    <div className="h-11 px-4 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {calculateDuration()} {calculateDuration() === 1 ? 'day' : 'days'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Travelers */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold flex items-center gap-2 text-foreground">
                <Users className="w-5 h-5 text-primary" />
                Number of Travelers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="adults" className="text-sm font-medium">Adults (18+) *</label>
                  <Input
                    id="adults"
                    type="number"
                    min="1"
                    max="20"
                    required
                    value={formData.adults}
                    onChange={(e) => handleInputChange('adults', e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="children" className="text-sm font-medium">Children (0-17)</label>
                  <Input
                    id="children"
                    type="number"
                    min="0"
                    max="10"
                    value={formData.children}
                    onChange={(e) => handleInputChange('children', e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>
            </div>

            {/* Accommodation Preference */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold flex items-center gap-2 text-foreground">
                <Star className="w-5 h-5 text-primary" />
                Accommodation Preference
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {accommodationTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`relative flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.accommodation === type.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="accommodation"
                      value={type.value}
                      checked={formData.accommodation === type.value}
                      onChange={(e) => handleInputChange('accommodation', e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-2xl">{type.icon}</span>
                    <span className="text-sm font-medium flex-1">{type.label}</span>
                    {formData.accommodation === type.value && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="budget" className="text-sm font-medium">
                  Estimated Budget per Person (USD)
                  <span className="text-muted-foreground ml-2">Optional</span>
                </label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select your budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-2000">Under $2,000</SelectItem>
                    <SelectItem value="2000-4000">$2,000 - $4,000</SelectItem>
                    <SelectItem value="4000-6000">$4,000 - $6,000</SelectItem>
                    <SelectItem value="6000-10000">$6,000 - $10,000</SelectItem>
                    <SelectItem value="over-10000">Over $10,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Special Requirements */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="specialRequirements" className="text-sm font-medium">
                  Special Requirements or Preferences
                  <span className="text-muted-foreground ml-2">Optional</span>
                </label>
                <textarea
                  id="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                  placeholder="Tell us about any dietary restrictions, accessibility needs, interests, or specific experiences you'd like to include..."
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={isSubmitting}
                className="flex-1 gap-2 h-12"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Request Free Quote
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={onClose}
                disabled={isSubmitting}
                className="sm:w-auto gap-2 h-12"
              >
                <X className="w-5 h-5" />
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
