import { Star, ThumbsUp, MapPin, VerifiedIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockTestimonials } from '@/data/mockData';

interface TourReviewsProps {
  tourId: string;
  rating: number;
  totalReviews: number;
}

export const TourReviews = ({ tourId, rating, totalReviews }: TourReviewsProps) => {
  // Filter reviews for this specific tour (in real app, would fetch from API)
  const tourReviews = mockTestimonials.slice(0, 3);

  // Rating breakdown (mock data)
  const ratingBreakdown = [
    { stars: 5, count: 89, percentage: 70 },
    { stars: 4, count: 28, percentage: 22 },
    { stars: 3, count: 7, percentage: 5 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 1, percentage: 1 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-display font-bold mb-6">Guest Reviews</h2>

      {/* Rating Summary */}
      <div className="p-6 rounded-xl bg-muted/30 border border-border mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-6xl font-display font-bold mb-2">{rating}</div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
              ))}
            </div>
            <div className="text-muted-foreground">
              Based on {totalReviews} verified reviews
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="text-sm font-medium w-16">{item.stars} stars</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {tourReviews.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-xl border border-border bg-card"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-semibold">{review.name}</h4>
                    {review.verified && (
                      <VerifiedIcon className="w-4 h-4 text-blue-500" title="Verified traveler" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{review.location}</span>
                    <span>•</span>
                    <span>{new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
            </div>

            {/* Review Tour */}
            <div className="text-sm text-muted-foreground mb-3">
              Toured: <span className="font-medium text-foreground">{review.tour}</span>
            </div>

            {/* Review Content */}
            <p className="text-muted-foreground leading-relaxed mb-4">
              {review.comment}
            </p>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Review photo ${index + 1}`}
                    className="w-20 h-20 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            )}

            {/* Helpful Button */}
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful (12)</span>
            </button>
          </div>
        ))}
      </div>

      {/* View All Reviews Button */}
      <div className="mt-8 text-center">
        <Button variant="outline" size="lg">
          View All {totalReviews} Reviews
        </Button>
      </div>
    </div>
  );
};
