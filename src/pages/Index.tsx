import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { DestinationsSection } from '@/components/DestinationsSection';
import { ExperiencesSection } from '@/components/ExperiencesSection';
import { ToursSection } from '@/components/ToursSection';
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
        <DestinationsSection />
        <ExperiencesSection />
        <ToursSection />
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
