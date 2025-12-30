import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingScreen } from "@/components/LoadingScreen";
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
import OurStory from "./pages/OurStory";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedBefore, setHasLoadedBefore] = useState(false);

  useEffect(() => {
    // Check if the user has loaded the site before in this session
    const loaded = sessionStorage.getItem('siteLoaded');

    if (loaded) {
      // Site was already loaded in this session, skip loading screen
      setHasLoadedBefore(true);
      setIsLoading(false);
    } else {
      // First load in this session, show loading screen
      sessionStorage.setItem('siteLoaded', 'true');
    }
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  // Show loading screen only on first load or refresh
  if (isLoading && !hasLoadedBefore) {
    return <LoadingScreen onLoadComplete={handleLoadComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            <Route path="/wild-tales/:slug" element={<WildTaleDetail />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
