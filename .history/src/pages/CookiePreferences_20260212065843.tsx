import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

const CookiePreferences = () => {
  const [preferences, setPreferences] = useState({
    essential: true,
    functional: true,
    analytics: false,
    marketing: false,
  });

  const handleToggle = (key: keyof typeof preferences) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    alert('Your cookie preferences have been saved!');
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    alert('All cookies accepted!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src="/header_bg_new4.gif"
          alt="Cookie Preferences"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/70 to-charcoal/80"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-white/80 mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="mx-2">»</span>
              <span>Cookie Preferences</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Cookie Preferences
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg mb-8">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. You can customize your cookie preferences below.
              </p>

              {/* Cookie Categories */}
              <div className="space-y-6 mb-12">
                {/* Essential Cookies */}
                <div className="border border-border rounded-2xl p-6 bg-white shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">Essential Cookies</h3>
                      <p className="text-muted-foreground">
                        These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you such as setting your privacy preferences, logging in, or filling in forms.
                      </p>
                    </div>
                    <div className="ml-4">
                      <div className="w-12 h-7 bg-primary rounded-full flex items-center px-1 cursor-not-allowed">
                        <div className="w-5 h-5 bg-white rounded-full transform translate-x-5"></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Always Active</p>
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Examples:</strong> Session cookies, security cookies, load balancing cookies
                    </p>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="border border-border rounded-2xl p-6 bg-white shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">Functional Cookies</h3>
                      <p className="text-muted-foreground">
                        These cookies enable enhanced functionality and personalization, such as videos and live chats. They may be set by us or by third-party providers whose services we have added to our pages.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => handleToggle('functional')}
                        className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors ${
                          preferences.functional ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                            preferences.functional ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        ></div>
                      </button>
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Examples:</strong> Chat widgets, video players, preference storage
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-border rounded-2xl p-6 bg-white shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">Analytics Cookies</h3>
                      <p className="text-muted-foreground">
                        These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => handleToggle('analytics')}
                        className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors ${
                          preferences.analytics ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                            preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        ></div>
                      </button>
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Examples:</strong> Google Analytics, page view tracking, user behavior analysis
                    </p>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-border rounded-2xl p-6 bg-white shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">Marketing Cookies</h3>
                      <p className="text-muted-foreground">
                        These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad. We may share this information with other parties such as advertisers.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => handleToggle('marketing')}
                        className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors ${
                          preferences.marketing ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                            preferences.marketing ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        ></div>
                      </button>
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Examples:</strong> Facebook Pixel, Google Ads, retargeting cookies
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center border-t border-border pt-8">
                <Button
                  onClick={handleSavePreferences}
                  variant="primary"
                  size="lg"
                  className="gap-2 w-full sm:w-auto"
                >
                  <Check className="w-5 h-5" />
                  Save Preferences
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  variant="secondary"
                  size="lg"
                  className="gap-2 w-full sm:w-auto"
                >
                  Accept All Cookies
                </Button>
              </div>

              {/* Additional Information */}
              <section className="mt-16 bg-muted/30 rounded-2xl p-8">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">What Are Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  For more information about how we use cookies and protect your privacy, please read our{' '}
                  <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
                </p>
              </section>

              <section className="mt-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">Managing Cookies in Your Browser</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Most web browsers allow you to control cookies through their settings. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="font-heading font-semibold text-foreground mb-2">Google Chrome</h4>
                    <p className="text-sm text-muted-foreground">Settings → Privacy and security → Cookies and other site data</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="font-heading font-semibold text-foreground mb-2">Mozilla Firefox</h4>
                    <p className="text-sm text-muted-foreground">Options → Privacy & Security → Cookies and Site Data</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="font-heading font-semibold text-foreground mb-2">Safari</h4>
                    <p className="text-sm text-muted-foreground">Preferences → Privacy → Cookies and website data</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <h4 className="font-heading font-semibold text-foreground mb-2">Microsoft Edge</h4>
                    <p className="text-sm text-muted-foreground">Settings → Privacy → Cookies and site permissions</p>
                  </div>
                </div>
              </section>

              <section className="mt-12 border-t border-border pt-8">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about our use of cookies, please contact us at{' '}
                  <a href="mailto:travel@migrationsafaridirect.com" className="text-primary hover:underline">travel@migrationsafaridirect.com</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <NewsletterSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CookiePreferences;
