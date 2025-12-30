import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { NewsletterSection } from '@/components/NewsletterSection';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src="/src/assets/header_bg_new4.gif"
          alt="Terms & Conditions"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/70 to-charcoal/80"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-white/80 mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="mx-2">»</span>
              <span>Terms & Conditions</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Terms & Conditions
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
                  Welcome to DeMi Tours and Travel. These Terms and Conditions govern your use of our website and services. By accessing our website or booking any of our services, you agree to be bound by these terms. Please read them carefully before proceeding with any bookings.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">2. Booking and Payment</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">2.1 Reservation:</strong> All bookings are subject to availability and confirmation by DeMi Tours and Travel. A booking is confirmed only upon receipt of the required deposit or full payment.
                  </p>
                  <p>
                    <strong className="text-foreground">2.2 Payment Terms:</strong> A non-refundable deposit of 30% is required at the time of booking. The balance payment is due 60 days before the tour departure date.
                  </p>
                  <p>
                    <strong className="text-foreground">2.3 Payment Methods:</strong> We accept payments via bank transfer, credit card (Visa, Mastercard), PayPal, Western Union, and Skrill.
                  </p>
                  <p>
                    <strong className="text-foreground">2.4 Price Validity:</strong> All prices quoted are subject to availability and may change without notice until full payment is received.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">3. Cancellation and Refund Policy</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">3.1 By the Client:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>More than 90 days before departure: 30% deposit forfeited</li>
                    <li>60-90 days before departure: 50% of total cost forfeited</li>
                    <li>30-59 days before departure: 75% of total cost forfeited</li>
                    <li>Less than 30 days before departure: 100% of total cost forfeited</li>
                  </ul>
                  <p>
                    <strong className="text-foreground">3.2 By DeMi Tours:</strong> We reserve the right to cancel any tour due to insufficient bookings, force majeure, or unforeseen circumstances. In such cases, a full refund will be provided, or an alternative tour date will be offered.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">4. Travel Documents and Insurance</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">4.1 Passports and Visas:</strong> All travelers are responsible for ensuring they have valid passports, visas, and any other required travel documents. DeMi Tours is not liable for denied entry due to invalid documentation.
                  </p>
                  <p>
                    <strong className="text-foreground">4.2 Travel Insurance:</strong> We strongly recommend comprehensive travel insurance covering medical emergencies, trip cancellations, and lost luggage. DeMi Tours is not responsible for any losses not covered by insurance.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">5. Health and Safety</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">5.1 Medical Requirements:</strong> Travelers must consult their physician regarding necessary vaccinations and health precautions for East Africa destinations.
                  </p>
                  <p>
                    <strong className="text-foreground">5.2 Physical Fitness:</strong> Some tours require a reasonable level of physical fitness. Clients should inform us of any medical conditions that may affect their participation.
                  </p>
                  <p>
                    <strong className="text-foreground">5.3 COVID-19:</strong> Travelers must comply with all COVID-19 related health and safety protocols as mandated by destination countries.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">6. Liability and Responsibility</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">6.1 Limitation of Liability:</strong> DeMi Tours acts only as an agent for the various service providers and is not liable for any injury, damage, loss, delay, or irregularity arising from acts or omissions of such providers.
                  </p>
                  <p>
                    <strong className="text-foreground">6.2 Personal Property:</strong> DeMi Tours is not responsible for loss or damage to personal belongings during the tour.
                  </p>
                  <p>
                    <strong className="text-foreground">6.3 Force Majeure:</strong> We are not liable for failure to perform our obligations due to circumstances beyond our control, including natural disasters, political unrest, or pandemics.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">7. Changes to Itinerary</h2>
                <p className="text-muted-foreground leading-relaxed">
                  DeMi Tours reserves the right to make minor changes to itineraries due to weather conditions, road conditions, or other unforeseen circumstances. We will make every effort to provide comparable alternatives without additional cost to the client.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">8. Conduct and Behavior</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Clients are expected to conduct themselves in a respectful manner toward other travelers, guides, and local communities. DeMi Tours reserves the right to remove from the tour any client whose behavior is deemed disruptive or dangerous, without refund.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">9. Photography and Media</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Images and videos taken during tours may be used by DeMi Tours for marketing and promotional purposes. Clients who do not wish to be photographed should inform their guide at the beginning of the tour.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">10. Complaints and Disputes</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Any complaints should be reported immediately to your tour guide or DeMi Tours representative. If unresolved, written complaints should be submitted within 30 days of tour completion to info@demitours.com. We will make every effort to resolve disputes amicably.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">11. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on the DeMi Tours website, including text, images, logos, and designs, is the property of DeMi Tours and Travel and is protected by copyright laws. Unauthorized use is prohibited.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">12. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms and Conditions are governed by the laws of the United Republic of Tanzania. Any disputes arising from these terms will be subject to the exclusive jurisdiction of Tanzanian courts.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">13. Amendments</h2>
                <p className="text-muted-foreground leading-relaxed">
                  DeMi Tours reserves the right to amend these Terms and Conditions at any time. Clients will be notified of significant changes, and continued use of our services constitutes acceptance of the revised terms.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">14. Contact Information</h2>
                <div className="text-muted-foreground leading-relaxed">
                  <p>For questions regarding these Terms and Conditions, please contact us:</p>
                  <p className="mt-4">
                    <strong className="text-foreground">DeMi Tours and Travel</strong><br />
                    Mega Complex, 7th Floor<br />
                    Livingstone Street<br />
                    P.O Box 15258, Arusha, Tanzania<br />
                    Email: info@demitours.com<br />
                    Phone: +(255) 688 535848 / +(255) 762 238763
                  </p>
                </div>
              </section>

              <div className="border-t border-border pt-8 mt-12">
                <p className="text-center text-muted-foreground">
                  By booking with DeMi Tours and Travel, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
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

export default TermsConditions;
