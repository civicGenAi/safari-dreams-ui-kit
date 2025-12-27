import { Tour } from '@/data/types';
import { MapPin, Calendar, Users, Star, Clock, Gauge, Globe, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TourOverviewProps {
  tour: Tour;
}

export const TourOverview = ({ tour }: TourOverviewProps) => {
  return (
    <div className="space-y-6">
      {/* Title and Location */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="secondary" className="text-sm">
            {tour.category}
          </Badge>
          {tour.popular && (
            <Badge className="bg-sunset text-white">Popular</Badge>
          )}
          {tour.featured && (
            <Badge className="bg-primary text-primary-foreground">Featured</Badge>
          )}
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          {tour.title}
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-lg">{tour.location}</span>
        </div>
      </div>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
          <Calendar className="w-5 h-5 text-primary" />
          <div>
            <div className="text-xs text-muted-foreground">Duration</div>
            <div className="font-heading font-semibold">{tour.duration}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
          <Users className="w-5 h-5 text-primary" />
          <div>
            <div className="text-xs text-muted-foreground">Group Size</div>
            <div className="font-heading font-semibold">{tour.groupSize} people</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
          <Gauge className="w-5 h-5 text-primary" />
          <div>
            <div className="text-xs text-muted-foreground">Difficulty</div>
            <div className="font-heading font-semibold">{tour.difficulty}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
          <Globe className="w-5 h-5 text-primary" />
          <div>
            <div className="text-xs text-muted-foreground">Languages</div>
            <div className="font-heading font-semibold">{tour.languages.join(', ')}</div>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-4 p-5 rounded-xl bg-muted/30 border border-border">
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 fill-secondary text-secondary" />
          <span className="text-3xl font-display font-bold">{tour.rating}</span>
        </div>
        <div className="h-12 w-px bg-border" />
        <div>
          <div className="font-heading font-semibold text-foreground">Exceptional</div>
          <div className="text-sm text-muted-foreground">{tour.reviews} verified reviews</div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-2xl font-display font-bold mb-4">Overview</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">{tour.description}</p>
      </div>

      {/* Highlights */}
      <div>
        <h2 className="text-2xl font-display font-bold mb-4">Highlights</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {tour.highlights.map((highlight, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Best Time to Visit */}
      <div className="p-5 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-heading font-semibold text-foreground">Best Time to Visit</h3>
        </div>
        <p className="text-muted-foreground">{tour.bestTime}</p>
      </div>
    </div>
  );
};
