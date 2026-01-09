import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SeasonalPackagesSection } from '@/components/SeasonalPackagesSection';
import { WhyChooseUsSection } from '@/components/WhyChooseUsSection';
import { ToursSection } from '@/components/ToursSection';
import { ExperiencesSection } from '@/components/ExperiencesSection';
import { CtaBookingSection } from '@/components/CtaBookingSection';
import { ClientFamilySection } from '@/components/ClientFamilySection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FaqBlogSection } from '@/components/FaqBlogSection';
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
        <ToursSection />
        <SeasonalPackagesSection />
        <WhyChooseUsSection />
        <ExperiencesSection />
        <CtaBookingSection />
        <TestimonialsSection />
        <FaqBlogSection />
        <NewsletterSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
