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
import { ChevronRight, Home } from 'lucide-react';

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
            <SimilarTours tours={similarTours} />
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default TourDetail;
