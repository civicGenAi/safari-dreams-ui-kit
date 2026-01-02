import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { LoadingScreen } from "@/components/LoadingScreen";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Booking from "./pages/Booking";
import TravelIdeas from "./pages/TravelIdeas";
import TravelIdeaDetail from "./pages/TravelIdeaDetail";
import WildTales from "./pages/WildTales";
import WildTaleDetail from "./pages/WildTaleDetail";
import ArticleDetail from "./pages/ArticleDetail";
import OurStory from "./pages/OurStory";
import Contact from "./pages/Contact";
import TermsConditions from "./pages/TermsConditions";
import CookiePreferences from "./pages/CookiePreferences";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPackages from "./pages/AdminPackages";
import AdminTravelIdeas from "./pages/AdminTravelIdeas";
import AdminBulkImport from "./pages/AdminBulkImport";
import AdminBookings from "./pages/AdminBookings";
import AdminContacts from "./pages/AdminContacts";
import AdminNewsletter from "./pages/AdminNewsletter";
import AdminAnalytics from "./pages/AdminAnalytics";
import { AdminArticles } from "./components/admin/AdminArticles";
import { ArticleForm } from "./components/admin/ArticleForm";

const queryClient = new QueryClient();

// Wrapper component for editing articles
const ArticleFormWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadArticle();
    }
  }, [id]);

  const loadArticle = async () => {
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      setArticle(data);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <ArticleForm article={article} />;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadComplete={handleLoadComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:slug" element={<TourDetail />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:slug" element={<DestinationDetail />} />
              <Route path="/booking/:slug" element={<Booking />} />
              <Route path="/travel-ideas" element={<TravelIdeas />} />
              <Route path="/travel-ideas/:slug" element={<TravelIdeaDetail />} />
              <Route path="/wild-tales" element={<WildTales />} />
              <Route path="/wild-tales/:slug" element={<ArticleDetail />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/cookie-preferences" element={<CookiePreferences />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/packages" element={
                <ProtectedRoute>
                  <AdminPackages />
                </ProtectedRoute>
              } />
              <Route path="/admin/travel-ideas" element={
                <ProtectedRoute>
                  <AdminTravelIdeas />
                </ProtectedRoute>
              } />
              <Route path="/admin/bulk-import" element={
                <ProtectedRoute>
                  <AdminBulkImport />
                </ProtectedRoute>
              } />
              <Route path="/admin/articles" element={
                <ProtectedRoute>
                  <AdminArticles />
                </ProtectedRoute>
              } />
              <Route path="/admin/articles/new" element={
                <ProtectedRoute>
                  <ArticleForm />
                </ProtectedRoute>
              } />
              <Route path="/admin/articles/edit/:id" element={
                <ProtectedRoute>
                  <ArticleFormWrapper />
                </ProtectedRoute>
              } />
              <Route path="/admin/bookings" element={
                <ProtectedRoute>
                  <AdminBookings />
                </ProtectedRoute>
              } />
              <Route path="/admin/contacts" element={
                <ProtectedRoute>
                  <AdminContacts />
                </ProtectedRoute>
              } />
              <Route path="/admin/newsletter" element={
                <ProtectedRoute>
                  <AdminNewsletter />
                </ProtectedRoute>
              } />
              <Route path="/admin/analytics" element={
                <ProtectedRoute>
                  <AdminAnalytics />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
