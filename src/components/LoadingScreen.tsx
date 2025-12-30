import { useEffect, useState } from 'react';
import logo from '@/assets/RCGP_Logo_Small-removebg-preview-1.webp';

export const LoadingScreen = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Accelerate progress as it gets closer to 100
        const increment = prev < 60 ? 15 : prev < 90 ? 10 : 5;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    // When progress reaches 100, start fade out
    const checkComplete = setInterval(() => {
      if (progress >= 100) {
        clearInterval(checkComplete);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onLoadComplete, 600); // Match the fade-out duration
        }, 300);
      }
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(checkComplete);
    };
  }, [progress, onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-gradient-to-br from-white via-[#f5f3ef] to-muted flex items-center justify-center transition-opacity duration-600 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="loading-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="2" fill="currentColor" className="text-primary">
                <animate attributeName="r" values="2;3;2" dur="4s" repeatCount="indefinite" />
              </circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loading-pattern)" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo container with pulse animation */}
        <div className="mb-8 relative">
          {/* Animated rings around logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute w-32 h-32 rounded-full border-2 border-secondary/20 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }} />
          </div>

          {/* Logo */}
          <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
            <img
              src={logo}
              alt="DeMi Tours"
              className="h-24 w-auto animate-pulse"
              style={{ animationDuration: '2s' }}
            />
          </div>

          {/* Floating safari elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 text-primary">
            <svg viewBox="0 0 24 24" fill="currentColor" className="animate-bounce" style={{ animationDuration: '3s' }}>
              <path d="M12 2L15 8L22 9L17 14L19 21L12 17L5 21L7 14L2 9L9 8L12 2Z" opacity="0.6" />
            </svg>
          </div>

          <div className="absolute -bottom-4 -left-4 w-6 h-6 text-secondary">
            <svg viewBox="0 0 24 24" fill="currentColor" className="animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
              <circle cx="12" cy="12" r="10" opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* Loading text */}
        <div className="mb-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Preparing Your Safari
          </h2>
          <p className="font-heading text-sm text-muted-foreground uppercase tracking-wider">
            Adventure Awaits
          </p>
        </div>

        {/* Progress bar container */}
        <div className="w-80 max-w-md">
          {/* Progress bar background */}
          <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden shadow-inner">
            {/* Animated background stripes */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />

            {/* Progress fill */}
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine" />
            </div>
          </div>

          {/* Progress percentage */}
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs font-heading text-muted-foreground uppercase tracking-wider">
              Loading...
            </span>
            <span className="text-sm font-display font-bold text-primary">
              {progress}%
            </span>
          </div>
        </div>

        {/* Loading dots animation */}
        <div className="flex items-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: '1s',
              }}
            />
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 opacity-10">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 10L35 20L45 22L37 30L40 40L30 35L20 40L23 30L15 22L25 20L30 10Z" fill="#EE8509">
              <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="20s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        <div className="absolute bottom-20 right-20 opacity-10">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="20" stroke="#2D3748" strokeWidth="2">
              <animate attributeName="r" values="20;22;20" dur="3s" repeatCount="indefinite" />
            </circle>
            <path d="M15 25h20M25 15v20" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>
    </div>
  );
};
