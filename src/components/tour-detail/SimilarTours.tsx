import { Link } from 'react-router-dom';
import { Tour } from '@/data/types';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';

interface SimilarToursProps {
  tours: Tour[];
}

export const SimilarTours = ({ tours }: SimilarToursProps) => {
  if (tours.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
        You Might Also Like
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Link
            key={tour.id}
            to={`/tours/${tour.slug}`}
            className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lift transition-all"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 glass-dark text-primary-foreground px-3 py-1.5 rounded-full">
                <span className="font-display font-bold">${tour.price}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="text-secondary text-sm font-heading uppercase tracking-wider mb-2">
                {tour.location}
              </div>
              <h3 className="font-display font-bold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {tour.title}
              </h3>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{tour.durationDays}D</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{tour.groupSize}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span>{tour.rating}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center text-primary font-heading text-sm gap-1 group-hover:gap-2 transition-all">
                View Details
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
