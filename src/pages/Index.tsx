import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { WhyChooseUsSection } from '@/components/WhyChooseUsSection';
import { ToursSection } from '@/components/ToursSection';
import { ExperiencesSection } from '@/components/ExperiencesSection';
import { ClientFamilySection } from '@/components/ClientFamilySection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { BookingForm } from '@/components/BookingForm';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <WhyChooseUsSection />
        <ToursSection />
        <ExperiencesSection />
        <ClientFamilySection />
        <TestimonialsSection />
        <BookingForm />
        <NewsletterSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
