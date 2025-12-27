import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { mockTours } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Users, CreditCard, User, Mail, Phone, MapPin, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Booking = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const tour = mockTours.find((t) => t.slug === slug);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    adults: 2,
    children: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    specialRequests: '',
    insurance: false,
  });

  if (!tour) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-display font-bold mb-4">Tour Not Found</h1>
        <Link to="/tours" className="text-primary hover:underline">Browse tours</Link>
      </div>
    </div>;
  }

  const totalPrice = (formData.adults + formData.children * 0.5) * tour.price;
  const steps = [
    { number: 1, title: 'Date & Travelers', icon: Calendar },
    { number: 2, title: 'Your Information', icon: User },
    { number: 3, title: 'Review & Payment', icon: CreditCard },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // In real app, process payment here
      navigate('/booking-confirmation');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 lg:px-8 pt-24 pb-16">
        <h1 className="text-4xl font-display font-bold mb-2">Complete Your Booking</h1>
        <p className="text-muted-foreground mb-8">{tour.title}</p>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-colors ${
                  currentStep >= step.number ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step.number ? <Check className="w-6 h-6" /> : step.number}
                </div>
                <span className={`text-sm mt-2 ${currentStep >= step.number ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-24 h-1 mx-4 rounded ${currentStep > step.number ? 'bg-primary' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-6 md:p-8">
              {/* Step 1: Date & Travelers */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="date">Select Tour Date *</Label>
                    <Input type="date" id="date" required min={new Date().toISOString().split('T')[0]}
                      value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>

                  <div>
                    <Label>Number of Travelers</Label>
                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                      <div className="p-4 rounded-lg border border-border">
                        <Label htmlFor="adults">Adults (Age 13+)</Label>
                        <div className="flex items-center gap-3 mt-2">
                          <Button type="button" variant="outline" size="sm" onClick={() => setFormData({...formData, adults: Math.max(1, formData.adults - 1)})}>-</Button>
                          <span className="font-semibold text-lg w-12 text-center">{formData.adults}</span>
                          <Button type="button" variant="outline" size="sm" onClick={() => setFormData({...formData, adults: formData.adults + 1})}>+</Button>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg border border-border">
                        <Label htmlFor="children">Children (Age 2-12)</Label>
                        <div className="flex items-center gap-3 mt-2">
                          <Button type="button" variant="outline" size="sm" onClick={() => setFormData({...formData, children: Math.max(0, formData.children - 1)})}>-</Button>
                          <span className="font-semibold text-lg w-12 text-center">{formData.children}</span>
                          <Button type="button" variant="outline" size="sm" onClick={() => setFormData({...formData, children: formData.children + 1})}>+</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input type="tel" id="phone" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" required value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="requests">Special Requests (Optional)</Label>
                    <Textarea id="requests" rows={4} value={formData.specialRequests} onChange={(e) => setFormData({...formData, specialRequests: e.target.value})} />
                  </div>
                </div>
              )}

              {/* Step 3: Review & Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h3 className="font-heading font-semibold mb-3">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span>Tour:</span> <span className="font-medium">{tour.title}</span></div>
                      <div className="flex justify-between"><span>Date:</span> <span className="font-medium">{formData.date}</span></div>
                      <div className="flex justify-between"><span>Travelers:</span> <span className="font-medium">{formData.adults} adults, {formData.children} children</span></div>
                      <div className="flex justify-between"><span>Contact:</span> <span className="font-medium">{formData.email}</span></div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox id="insurance" checked={formData.insurance} onCheckedChange={(checked) => setFormData({...formData, insurance: !!checked})} />
                    <label htmlFor="insurance" className="text-sm">
                      Add travel insurance (+$99 per person) <span className="text-muted-foreground">Recommended</span>
                    </label>
                  </div>

                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <p className="text-sm text-muted-foreground mb-2">
                      💳 In a real application, payment processing would happen here using Stripe, PayPal, or another payment gateway.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center gap-4 mt-8">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                    Back
                  </Button>
                )}
                <Button type="submit" variant="gold" className="flex-1">
                  {currentStep === 3 ? 'Complete Booking' : 'Continue'}
                </Button>
              </div>
            </form>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-2xl border border-border p-6">
              <h3 className="font-heading font-semibold mb-4">Price Summary</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span>${tour.price} x {formData.adults} adult{formData.adults > 1 ? 's' : ''}</span>
                  <span className="font-medium">${tour.price * formData.adults}</span>
                </div>
                {formData.children > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>${tour.price * 0.5} x {formData.children} child{formData.children > 1 ? 'ren' : ''}</span>
                    <span className="font-medium">${tour.price * formData.children * 0.5}</span>
                  </div>
                )}
                {formData.insurance && (
                  <div className="flex justify-between text-sm">
                    <span>Travel Insurance</span>
                    <span className="font-medium">${99 * (formData.adults + formData.children)}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-heading font-semibold">Total</span>
                  <span className="text-2xl font-display font-bold text-primary">
                    ${(totalPrice + (formData.insurance ? 99 * (formData.adults + formData.children) : 0)).toFixed(0)}
                  </span>
                </div>
                <Badge variant="secondary" className="w-full justify-center">Free cancellation up to 30 days</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;
