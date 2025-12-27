import { Check, X } from 'lucide-react';

interface TourInclusionsProps {
  included: string[];
  excluded: string[];
}

export const TourInclusions = ({ included, excluded }: TourInclusionsProps) => {
  return (
    <div>
      <h2 className="text-2xl font-display font-bold mb-6">What's Included</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Included */}
        <div className="p-6 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
          <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            Included
          </h3>
          <ul className="space-y-2">
            {included.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Excluded */}
        <div className="p-6 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
          <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
              <X className="w-4 h-4 text-white" />
            </div>
            Not Included
          </h3>
          <ul className="space-y-2">
            {excluded.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <X className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
