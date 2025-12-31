import { Shield, Award, Clock, Phone, HeartHandshake, FileCheck, Plane, Backpack } from 'lucide-react';

export const TravelConfidence = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold mb-3">Travel With Confidence</h2>
        <p className="text-muted-foreground">Your safety, comfort, and satisfaction are our top priorities</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Our Promise */}
        <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-2">Our Promise</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Best Price Guarantee - We match any lower price</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Free Cancellation up to 48 hours before departure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Full refund if we cancel your tour</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Transparent pricing - No hidden fees</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Expert Support */}
        <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-2">Expert Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>24/7 Customer assistance during your trip</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Professional licensed guides with 10+ years experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Local expertise and insider knowledge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Multilingual guides (English, French, German, Spanish)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safety First */}
        <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <HeartHandshake className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-2">Safety First</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Comprehensive travel insurance included</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Modern 4x4 safari vehicles with pop-up roofs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Emergency medical evacuation coverage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>COVID-19 safety protocols in place</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Licensed by Tanzania Tourist Board</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Preparation Guide */}
        <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Backpack className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-2">Preparation Guide</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Detailed packing list provided before departure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Visa assistance and requirements guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Health & vaccination recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Pre-departure briefing with your guide</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
        <div className="text-center p-4">
          <Award className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-heading font-bold text-lg">15+</div>
          <div className="text-xs text-muted-foreground">Years Experience</div>
        </div>
        <div className="text-center p-4">
          <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-heading font-bold text-lg">98%</div>
          <div className="text-xs text-muted-foreground">On-Time Departures</div>
        </div>
        <div className="text-center p-4">
          <HeartHandshake className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-heading font-bold text-lg">5,000+</div>
          <div className="text-xs text-muted-foreground">Happy Travelers</div>
        </div>
        <div className="text-center p-4">
          <FileCheck className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-heading font-bold text-lg">100%</div>
          <div className="text-xs text-muted-foreground">Licensed & Insured</div>
        </div>
      </div>
    </div>
  );
};
