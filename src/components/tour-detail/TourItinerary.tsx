import { useState } from 'react';
import { ItineraryDay } from '@/data/types';
import { ChevronDown, MapPin, Utensils, Hotel } from 'lucide-react';

interface TourItineraryProps {
  itinerary: ItineraryDay[];
}

export const TourItinerary = ({ itinerary }: TourItineraryProps) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]); // First day expanded by default

  const toggleDay = (day: number) => {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-display font-bold mb-6">Detailed Itinerary</h2>
      <div className="space-y-3">
        {itinerary.map((day) => {
          const isExpanded = expandedDays.includes(day.day);

          return (
            <div
              key={day.day}
              className="rounded-xl border border-border bg-card overflow-hidden transition-all"
            >
              {/* Day Header - Clickable */}
              <button
                onClick={() => toggleDay(day.day)}
                className="w-full p-5 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-display font-bold text-primary">
                      {day.day}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground">
                      Day {day.day}: {day.title}
                    </h3>
                    {day.accommodation && (
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Hotel className="w-4 h-4" />
                        <span>{day.accommodation}</span>
                      </div>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Day Content - Expandable */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 space-y-4 border-t border-border">
                  <p className="text-muted-foreground leading-relaxed">
                    {day.description}
                  </p>

                  {/* Activities */}
                  {day.activities && day.activities.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-heading font-semibold text-sm">Activities</span>
                      </div>
                      <ul className="space-y-1 ml-6">
                        {day.activities.map((activity, index) => (
                          <li key={index} className="text-sm text-muted-foreground list-disc">
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Meals */}
                  {day.meals && day.meals.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-primary" />
                      <span className="font-heading font-semibold text-sm">Meals:</span>
                      <span className="text-sm text-muted-foreground">
                        {day.meals.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
