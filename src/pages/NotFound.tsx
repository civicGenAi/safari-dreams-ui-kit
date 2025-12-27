import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, Compass, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Safari Animals */}
          <div className="absolute top-20 left-10 text-6xl opacity-10 animate-bounce-gentle">
            🦁
          </div>
          <div className="absolute top-40 right-20 text-5xl opacity-10 animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>
            🦒
          </div>
          <div className="absolute bottom-32 left-1/4 text-5xl opacity-10 animate-bounce-gentle" style={{ animationDelay: '1s' }}>
            🐘
          </div>
          <div className="absolute bottom-20 right-1/3 text-4xl opacity-10 animate-bounce-gentle" style={{ animationDelay: '1.5s' }}>
            🦓
          </div>

          {/* Parallax Effect */}
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
            }}
          >
            <div className="absolute top-10 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* 404 Number with Animation */}
            <div className="relative mb-8">
              <h1 className="font-display text-[200px] md:text-[280px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-br from-primary via-secondary to-primary animate-fade-in">
                404
              </h1>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Compass className="w-24 h-24 md:w-32 md:h-32 text-primary/20 animate-spin-slow" />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-4 mb-8 animate-fade-up">
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                Looks Like You're <span className="text-gradient-gold">Lost in the Wild</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                The page you're looking for seems to have wandered off the beaten path.
                Don't worry, our safari guides can help you find your way back!
              </p>
            </div>

            {/* Fun Message */}
            <div className="inline-flex items-center gap-2 bg-muted px-6 py-3 rounded-full mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <MapPin className="w-5 h-5 text-primary" />
              <p className="text-sm text-muted-foreground">
                Current Location: <span className="font-semibold text-foreground">Middle of Nowhere</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/">
                <Button variant="gold" size="lg" className="gap-2 min-w-[200px]">
                  <Home className="w-5 h-5" />
                  Back to Home
                </Button>
              </Link>
              <Link to="/tours">
                <Button variant="outline" size="lg" className="gap-2 min-w-[200px]">
                  <Search className="w-5 h-5" />
                  Browse Tours
                </Button>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="mt-16 pt-8 border-t border-border animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-sm text-muted-foreground mb-4">Or try one of these popular destinations:</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to="/tours" className="text-sm text-primary hover:underline">All Tours</Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/destinations/tanzania" className="text-sm text-primary hover:underline">Tanzania</Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/destinations/kenya" className="text-sm text-primary hover:underline">Kenya</Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/wild-tales" className="text-sm text-primary hover:underline">Wild Tales</Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/contact" className="text-sm text-primary hover:underline">Contact Us</Link>
              </div>
            </div>

            {/* Fun Fact */}
            <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/20 animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Did you know?</span> Lions can sleep up to 20 hours a day.
                Maybe this page is just taking a nap! 🦁💤
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
