import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tour } from '@/data/types';
import { Button } from '@/components/ui/button';
import { Calendar, Users, DollarSign, Shield, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TourBookingWidgetProps {
  tour: Tour;
}

export const TourBookingWidget = ({ tour }: TourBookingWidgetProps) => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const totalPrice = tour.price * (adults + children * 0.5); // Children half price
  const discountAmount = tour.originalPrice ? (tour.originalPrice - tour.price) * adults : 0;

  return (
    <div className="rounded-2xl border border-border bg-card shadow-lift overflow-hidden">
      {/* Price Header */}
      <div className="p-6 bg-primary/5 border-b border-border">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-display font-bold text-foreground">
            ${tour.price}
          </span>
          {tour.originalPrice && (
            <span className="text-xl text-muted-foreground line-through">
              ${tour.originalPrice}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">per person</p>
        {tour.originalPrice && (
          <Badge className="mt-2 bg-green-600">
            Save ${tour.originalPrice - tour.price} per person
          </Badge>
        )}
      </div>

      {/* Booking Form */}
      <div className="p-6 space-y-4">
        {/* Date Selection */}
        <div>
          <label className="text-sm font-heading font-medium mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Select Date
          </label>
          <input
            type="date"
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Travelers */}
        <div>
          <label className="text-sm font-heading font-medium mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            Travelers
          </label>

          {/* Adults */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background mb-2">
            <div>
              <div className="font-medium text-sm">Adults</div>
              <div className="text-xs text-muted-foreground">Age 13+</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center"
              >
                -
              </button>
              <span className="w-8 text-center font-semibold">{adults}</span>
              <button
                onClick={() => setAdults(Math.min(tour.maxGroupSize, adults + 1))}
                className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
            <div>
              <div className="font-medium text-sm">Children</div>
              <div className="text-xs text-muted-foreground">Age 2-12</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center"
              >
                -
              </button>
              <span className="w-8 text-center font-semibold">{children}</span>
              <button
                onClick={() => setChildren(Math.min(tour.maxGroupSize - adults, children + 1))}
                className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center"
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
          {discountAmount > 0 && (
            <div className="flex items-center justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>-${discountAmount}</span>
            </div>
          )}
          <div className="pt-2 border-t border-border flex items-center justify-between">
            <span className="font-heading font-semibold">Total</span>
            <span className="text-2xl font-display font-bold text-primary">
              ${totalPrice.toFixed(0)}
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <Link to={`/booking/${tour.slug}`} className="block">
          <Button variant="gold" size="lg" className="w-full">
            <DollarSign className="w-5 h-5 mr-2" />
            Book Now
          </Button>
        </Link>

        <Button variant="outline" size="lg" className="w-full">
          <MessageCircle className="w-5 h-5 mr-2" />
          Request Free Quote
        </Button>

        {/* Trust Indicators */}
        <div className="pt-4 space-y-2 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Free cancellation up to 30 days before</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Secure payment • Best price guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
