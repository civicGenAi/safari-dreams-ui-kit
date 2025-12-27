import { useState } from 'react';
import { FAQ } from '@/data/types';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface TourFAQProps {
  faqs: FAQ[];
}

export const TourFAQ = ({ faqs }: TourFAQProps) => {
  const [expandedFAQs, setExpandedFAQs] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setExpandedFAQs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-display font-bold">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isExpanded = expandedFAQs.includes(index);

          return (
            <div
              key={index}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-5 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
              >
                <h3 className="font-heading font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-border">
                  <p className="text-muted-foreground leading-relaxed pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions CTA */}
      <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/20">
        <p className="text-sm text-muted-foreground">
          Still have questions?{' '}
          <a href="/contact" className="text-primary hover:underline font-medium">
            Contact our travel experts
          </a>{' '}
          for personalized assistance.
        </p>
      </div>
    </div>
  );
};
