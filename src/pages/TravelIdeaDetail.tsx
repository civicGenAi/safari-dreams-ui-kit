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
import { supabase, TravelIdea } from '@/lib/supabase';
import { LoadingScreen } from '@/components/ui/loading';
import { ChevronRight, Home } from 'lucide-react';

const TravelIdeaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [travelIdea, setTravelIdea] = useState<TravelIdea | null>(null);
  const [similarIdeas, setSimilarIdeas] = useState<TravelIdea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravelIdea = async () => {
      try {
        // Fetch the travel idea by slug
        const { data: ideaData, error: ideaError } = await supabase
          .from('travel_ideas')
          .select('*')
          .eq('slug', slug)
          .single();

        if (ideaError) throw ideaError;
        setTravelIdea(ideaData);

        // Fetch similar travel ideas
        if (ideaData) {
          const { data: similarData, error: similarError } = await supabase
            .from('travel_ideas')
            .select('*')
            .neq('id', ideaData.id)
            .or(`category.eq.${ideaData.category},destination.eq.${ideaData.destination}`)
            .limit(3);

          if (similarError) throw similarError;
          setSimilarIdeas(similarData || []);
        }
      } catch (error) {
        console.error('Error fetching travel idea:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchTravelIdea();
    }
  }, [slug]);

  if (loading) {
    return <LoadingScreen message="Loading travel idea details..." />;
  }

  if (!travelIdea) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold mb-4">Travel Idea Not Found</h1>
          <Link to="/travel-ideas" className="text-primary hover:underline">
            Browse all travel ideas
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
          <Link to="/travel-ideas" className="hover:text-primary transition-colors">
            Travel Ideas
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{travelIdea.title}</span>
        </div>
      </div>

      {/* Gallery */}
      <TourGallery images={travelIdea.images && travelIdea.images.length > 0 ? travelIdea.images : [travelIdea.image]} title={travelIdea.title} />

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <TourOverview tour={travelIdea} />
            <TourItinerary itinerary={Array.isArray(travelIdea.itinerary) ? travelIdea.itinerary : []} />
            <TourInclusions included={Array.isArray(travelIdea.included) ? travelIdea.included : []} excluded={Array.isArray(travelIdea.excluded) ? travelIdea.excluded : []} />
            <TravelConfidence />
            <TourFAQ faqs={[]} />
          </div>

          {/* Right Column - Booking Widget (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TourBookingWidget tour={travelIdea} />
            </div>
          </div>
        </div>
      </div>

      {/* Similar Travel Ideas */}
      {similarIdeas.length > 0 && (
        <div className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <SimilarTours tours={similarIdeas} basePath="/travel-ideas" />
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default TravelIdeaDetail;
