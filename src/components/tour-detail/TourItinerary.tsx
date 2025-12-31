import { useState } from 'react';
import { ChevronDown, Clock } from 'lucide-react';

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities?: string[];
  images?: string[];
}

interface TourItineraryProps {
  itinerary: ItineraryDay[];
}

export const TourItinerary = ({ itinerary }: TourItineraryProps) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-display font-bold mb-2">Day-by-Day Itinerary</h2>
        <p className="text-muted-foreground">Detailed schedule of activities for each day</p>
      </div>

      <div className="space-y-4">
        {itinerary.map((day) => (
          <div
            key={day.day}
            className="border border-border rounded-xl overflow-hidden bg-card hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
              className="w-full p-6 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-heading font-bold text-primary">{day.day}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg mb-1">{day.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{day.description}</p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform ${
                  expandedDay === day.day ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedDay === day.day && (
              <div className="px-6 pb-6 space-y-4 border-t">
                <p className="text-muted-foreground pt-4">{day.description}</p>

                {/* Activities List */}
                {day.activities && day.activities.length > 0 && (
                  <div>
                    <h4 className="font-heading font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Activities
                    </h4>
                    <ul className="space-y-2">
                      {day.activities.map((activity, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-0.5">•</span>
                          <span className="text-muted-foreground">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Day Images */}
                {day.images && day.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {day.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${day.title} - Image ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
