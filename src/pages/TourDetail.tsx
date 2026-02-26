import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { TourGallery } from '@/components/tour-detail/TourGallery';
import { TourOverview } from '@/components/tour-detail/TourOverview';
import { TourItinerary } from '@/components/tour-detail/TourItinerary';
import { TourInclusions } from '@/components/tour-detail/TourInclusions';
import { TourFAQ } from '@/components/tour-detail/TourFAQ';
import { TourBookingWidget } from '@/components/tour-detail/TourBookingWidget';
import { SimilarTours } from '@/components/tour-detail/SimilarTours';
import { TravelConfidence } from '@/components/tour-detail/TravelConfidence';
import { supabase, Package } from '@/lib/supabase';
import { LoadingScreen } from '@/components/ui/loading';
import { ChevronRight, Home, Star, MessageSquareQuote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TourDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [tour, setTour] = useState<Package | null>(null);
  const [similarTours, setSimilarTours] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        // Fetch the tour by slug
        const { data: tourData, error: tourError } = await supabase
          .from('packages')
          .select('*')
          .eq('slug', slug)
          .single();

        if (tourError) throw tourError;
        setTour(tourData);

        // Fetch similar tours
        if (tourData) {
          const { data: similarData, error: similarError } = await supabase
            .from('packages')
            .select('*')
            .neq('id', tourData.id)
            .or(`category.eq.${tourData.category},destination.eq.${tourData.destination}`)
            .limit(3);

          if (similarError) throw similarError;
          setSimilarTours(similarData || []);
        }
      } catch (error) {
        console.error('Error fetching tour:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchTour();
    }
  }, [slug]);

  if (loading) {
    return <LoadingScreen message="Loading tour details..." />;
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Tour Not Found</h1>
          <Link to="/tours" className="text-primary hover:underline">
            Browse all tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 lg:px-8 pt-24 pb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/tours" className="hover:text-primary transition-colors">
            Tours
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/destinations/${tour.destination.toLowerCase()}`} className="hover:text-primary transition-colors">
            {tour.destination}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{tour.title}</span>
        </div>
      </div>

      {/* Gallery */}
      <TourGallery images={tour.images && tour.images.length > 0 ? tour.images : [tour.image]} title={tour.title} />

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <TourOverview tour={tour} />
            <TourItinerary itinerary={Array.isArray(tour.itinerary) ? tour.itinerary : []} />

            {/* Added Reviews Prompt */}
            <div className="bg-muted/10 rounded-2xl p-8 border border-border mt-12 mb-12">
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Share Your Experience
                </h3>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  We'd love to hear about your adventure with Migration Safaridirect! Your reviews help us maintain top quality and guide future travelers.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Google Review Option (Recommended) */}
                <div className="bg-background rounded-xl p-6 border-2 border-primary/20 hover:border-primary/50 transition-colors shadow-sm text-center flex flex-col items-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Star className="w-7 h-7 text-primary fill-primary" />
                  </div>
                  <h4 className="font-heading font-semibold text-lg mb-2">Google Review</h4>
                  <p className="text-sm text-muted-foreground mb-6 flex-grow">
                    Recommended! Help others find us on Google by leaving a public review.
                  </p>
                  <a
                    href="https://www.google.com/search?q=demi+tours&oq=demi+tours&gs_lcrp=EgZjaHJvbWUqDggAEEUYOxhDGIAEGIoFMg4IABBFGDsYQxiABBiKBTIGCAEQIxgnMgYIAhAjGCcyBggDEEUYOzINCAQQABiRAhiABBiKBTIICAUQABgWGB4yCAgGEAAYFhgeMggIBxAAGBYYHjIICAgQABgWGB4yCAgJEAAYFhge0gEJNjU0OGowajE1qAIIsAIB8QWupoS1EsUMSA&sourceid=chrome&ie=UTF-8&lqi=CgpkZW1pIHRvdXJzSOviyPy-uICACFoUEAAQARgAGAEiCmRlbWkgdG91cnOSAQ10b3VyX29wZXJhdG9y#rlimm=5933328608386251432"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="primary" className="w-full gap-2 border-none">
                      <Star className="w-4 h-4 fill-white" />
                      Write Google Review
                    </Button>
                  </a>
                </div>

                {/* Normal Review Option */}
                <div className="bg-background rounded-xl p-6 border border-border hover:border-secondary/50 transition-colors shadow-sm text-center flex flex-col items-center">
                  <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <MessageSquareQuote className="w-7 h-7 text-secondary" />
                  </div>
                  <h4 className="font-heading font-semibold text-lg mb-2">Direct Feedback</h4>
                  <p className="text-sm text-muted-foreground mb-6 flex-grow">
                    Send us your thoughts, photos, and suggestions directly to our team.
                  </p>
                  <a href="mailto:info@migrationsafaridirect.com?subject=My Safari Review" className="w-full">
                    <Button variant="outline" className="w-full gap-2 border-secondary/30 hover:border-secondary hover:bg-secondary/5 text-foreground bg-white">
                      <MessageSquareQuote className="w-4 h-4" />
                      Send Direct Feedback
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            <TourInclusions included={Array.isArray(tour.included) ? tour.included : []} excluded={Array.isArray(tour.excluded) ? tour.excluded : []} />
            <TravelConfidence />
            <TourFAQ faqs={[]} />
          </div>

          {/* Right Column - Booking Widget (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TourBookingWidget tour={tour} />
            </div>
          </div>
        </div>
      </div>

      {/* Similar Tours */}
      {similarTours.length > 0 && (
        <div className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <SimilarTours tours={similarTours} basePath="/tours" />
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default TourDetail;
