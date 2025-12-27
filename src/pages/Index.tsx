import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { DestinationsSection } from '@/components/DestinationsSection';
import { WhyChooseUsSection } from '@/components/WhyChooseUsSection';
import { ToursSection } from '@/components/ToursSection';
import { ExperiencesSection } from '@/components/ExperiencesSection';
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
        <WhyChooseUsSection />
        <ToursSection />
        <ExperiencesSection />
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
