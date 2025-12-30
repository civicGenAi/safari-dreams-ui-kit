import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { NewsletterSection } from '@/components/NewsletterSection';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src="/src/assets/header_bg_new4.gif"
          alt="Privacy Policy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/70 to-charcoal/80"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-white/80 mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="mx-2">»</span>
              <span>Privacy Policy</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Privacy Policy
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
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At DeMi Tours and Travel, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">2.1 Personal Information:</strong> We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Full name, email address, phone number, and postal address</li>
                    <li>Passport information and date of birth (for travel bookings)</li>
                    <li>Payment information (processed securely through third-party payment providers)</li>
                    <li>Dietary preferences, medical conditions, and special requirements</li>
                    <li>Emergency contact information</li>
                  </ul>
                  <p>
                    <strong className="text-foreground">2.2 Automatically Collected Information:</strong> When you visit our website, we automatically collect:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address, browser type, and operating system</li>
                    <li>Pages viewed, time spent on pages, and navigation paths</li>
                    <li>Referring website addresses and search terms used</li>
                    <li>Device information and unique identifiers</li>
                  </ul>
                  <p>
                    <strong className="text-foreground">2.3 Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar technologies to enhance your experience. For more information, please see our{' '}
                    <Link to="/cookie-preferences" className="text-primary hover:underline">Cookie Preferences</Link> page.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>We use the information we collect for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-foreground">Booking Management:</strong> To process and manage your travel bookings, reservations, and itineraries</li>
                    <li><strong className="text-foreground">Communication:</strong> To send booking confirmations, travel updates, and respond to your inquiries</li>
                    <li><strong className="text-foreground">Customer Service:</strong> To provide customer support and address your concerns</li>
                    <li><strong className="text-foreground">Marketing:</strong> To send promotional offers, newsletters, and travel recommendations (with your consent)</li>
                    <li><strong className="text-foreground">Website Improvement:</strong> To analyze usage patterns and improve our website functionality</li>
                    <li><strong className="text-foreground">Legal Compliance:</strong> To comply with legal obligations and protect our legal rights</li>
                    <li><strong className="text-foreground">Safety and Security:</strong> To ensure the safety of our travelers and prevent fraud</li>
                  </ul>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">4. Information Sharing and Disclosure</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>We may share your information with:</p>
                  <p>
                    <strong className="text-foreground">4.1 Service Providers:</strong> Hotels, lodges, airlines, ground transportation providers, and other travel service providers necessary to fulfill your booking.
                  </p>
                  <p>
                    <strong className="text-foreground">4.2 Business Partners:</strong> Third-party companies that help us operate our business, such as payment processors, email service providers, and analytics platforms.
                  </p>
                  <p>
                    <strong className="text-foreground">4.3 Government Authorities:</strong> When required by law or to comply with legal processes, court orders, or government requests.
                  </p>
                  <p>
                    <strong className="text-foreground">4.4 Emergency Situations:</strong> To protect the health, safety, or rights of our clients or others in emergency situations.
                  </p>
                  <p>
                    We do not sell, rent, or trade your personal information to third parties for their marketing purposes without your explicit consent.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers and databases with access controls</li>
                  <li>Regular security assessments and updates</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">6. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Booking-related information is typically retained for 7 years for accounting and legal purposes.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">7. Your Rights and Choices</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>You have the following rights regarding your personal information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-foreground">Access:</strong> Request a copy of the personal information we hold about you</li>
                    <li><strong className="text-foreground">Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong className="text-foreground">Deletion:</strong> Request deletion of your personal information (subject to legal retention requirements)</li>
                    <li><strong className="text-foreground">Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                    <li><strong className="text-foreground">Data Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
                    <li><strong className="text-foreground">Objection:</strong> Object to certain types of processing of your personal information</li>
                  </ul>
                  <p className="mt-4">
                    To exercise these rights, please contact us at <a href="mailto:info@demitours.com" className="text-primary hover:underline">info@demitours.com</a>
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">8. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not directed to children under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">9. International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">10. Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">11. Social Media</h2>
                <p className="text-muted-foreground leading-relaxed">
                  When you interact with us through social media platforms, the platform may collect information about you according to their own privacy policies. We may also collect publicly available information from your social media profiles if you engage with us on these platforms.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">12. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date. Your continued use of our services after such changes constitutes your acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">13. GDPR Compliance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For users in the European Union, we process your personal data in accordance with the General Data Protection Regulation (GDPR). Our lawful bases for processing include contract performance, legal obligation, legitimate interests, and consent where applicable.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">14. Contact Us</h2>
                <div className="text-muted-foreground leading-relaxed">
                  <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
                  <div className="mt-4 bg-muted/30 rounded-lg p-6">
                    <p>
                      <strong className="text-foreground">DeMi Tours and Travel</strong><br />
                      Mega Complex, 7th Floor<br />
                      Livingstone Street<br />
                      P.O Box 15258, Arusha, Tanzania
                    </p>
                    <p className="mt-4">
                      <strong className="text-foreground">Email:</strong> <a href="mailto:info@demitours.com" className="text-primary hover:underline">info@demitours.com</a><br />
                      <strong className="text-foreground">Phone:</strong> +(255) 688 535848 / +(255) 762 238763
                    </p>
                  </div>
                </div>
              </section>

              <div className="border-t border-border pt-8 mt-12">
                <p className="text-center text-muted-foreground">
                  By using our website and services, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your information as described herein.
                </p>
              </div>
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

export default PrivacyPolicy;
