import { useEffect, useState, useRef } from 'react';
import logo from '@/assets/RCGP_Logo_Small-removebg-preview-1.webp';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const LoadingScreen = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [currentAnimal, setCurrentAnimal] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const animals = ['lion', 'elephant', 'giraffe', 'rhino'];

  useEffect(() => {
    // Generate firefly particles
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    // Cycle through animals
    const animalInterval = setInterval(() => {
      setCurrentAnimal((prev) => (prev + 1) % animals.length);
    }, 1500);

    return () => clearInterval(animalInterval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = prev < 60 ? 12 : prev < 90 ? 8 : 4;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    const checkComplete = setInterval(() => {
      if (progress >= 100) {
        clearInterval(checkComplete);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onLoadComplete, 800);
        }, 400);
      }
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(checkComplete);
    };
  }, [progress, onLoadComplete]);

  const AnimalSVG = ({ type, className }: { type: string; className?: string }) => {
    const paths: Record<string, JSX.Element> = {
      lion: (
        <path d="M50 15c-8 0-15 3-20 8-3-5-8-8-15-8-4 0-7 3-7 7 0 6 4 10 10 12-2 4-3 8-3 13 0 15 12 28 35 28s35-13 35-28c0-5-1-9-3-13 6-2 10-6 10-12 0-4-3-7-7-7-7 0-12 3-15 8-5-5-12-8-20-8zm-15 25c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5zm30 0c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5zm-15 12c-8 0-12 5-12 8h24c0-3-4-8-12-8z" />
      ),
      elephant: (
        <path d="M85 35c0-15-10-25-25-25-8 0-15 3-20 8-5-5-12-8-20-8-15 0-25 10-25 25 0 8 3 15 8 20v25c0 3 2 5 5 5h10c3 0 5-2 5-5V65c5 3 12 5 20 5s15-2 20-5v15c0 3 2 5 5 5h10c3 0 5-2 5-5V55c5-5 8-12 8-20zM25 45c-4 0-7-3-7-7s3-7 7-7 7 3 7 7-3 7-7 7zm50 0c-4 0-7-3-7-7s3-7 7-7 7 3 7 7-3 7-7 7z" />
      ),
      giraffe: (
        <path d="M60 5c-5 0-10 3-12 8l-3-3c-2-2-5-2-7 0s-2 5 0 7l5 5c-1 3-2 6-2 10v15l-15 25c-2 3-1 7 2 9l10 6v8c0 3 2 5 5 5h10c3 0 5-2 5-5v-5h10v5c0 3 2 5 5 5h10c3 0 5-2 5-5V55c0-15-8-28-20-35V10c0-3-4-5-8-5zm-5 25c-3 0-5-2-5-5s2-5 5-5 5 2 5 5-2 5-5 5zm15 0c-3 0-5-2-5-5s2-5 5-5 5 2 5 5-2 5-5 5z" />
      ),
      rhino: (
        <path d="M90 45c0-3-2-5-5-5h-5c0-10-5-18-12-23 2-2 3-5 3-8 0-5-4-9-9-9-3 0-6 2-8 4-3-2-7-4-12-4-15 0-27 12-27 27v8c-5 2-8 7-8 12 0 8 6 14 14 14h4l6 12c2 4 6 7 11 7h25c5 0 9-3 11-7l6-12h4c3 0 5-2 5-5v-11zm-55-10c-4 0-7-3-7-7s3-7 7-7 7 3 7 7-3 7-7 7zm20 0c-4 0-7-3-7-7s3-7 7-7 7 3 7 7-3 7-7 7z" />
      ),
    };

    return (
      <svg viewBox="0 0 100 100" className={className} fill="currentColor">
        {paths[type]}
      </svg>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] overflow-hidden transition-all duration-800 ${
        fadeOut ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-loading-dark via-loading-medium to-loading-light animate-gradient-shift" />
      
      {/* Animated sun/moon */}
      <div className="absolute top-[10%] right-[15%] w-32 h-32 md:w-48 md:h-48">
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-loading-sun via-loading-sun-glow to-transparent animate-sun-pulse" />
        <div className="absolute inset-4 rounded-full bg-loading-sun blur-sm animate-sun-glow" />
      </div>

      {/* Floating particles (fireflies) */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-loading-firefly animate-firefly"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Landscape silhouette layers */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%]">
        {/* Far mountains */}
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-[60%] w-full h-full text-loading-mountain-far animate-fade-in-up"
          preserveAspectRatio="none"
          style={{ animationDelay: '0.2s' }}
        >
          <path
            fill="currentColor"
            d="M0,160L60,170.7C120,181,240,203,360,186.7C480,171,600,117,720,112C840,107,960,149,1080,165.3C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
        
        {/* Mid mountains */}
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-[40%] w-full h-full text-loading-mountain-mid animate-fade-in-up"
          preserveAspectRatio="none"
          style={{ animationDelay: '0.4s' }}
        >
          <path
            fill="currentColor"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>

        {/* Foreground with trees */}
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-full text-loading-ground animate-fade-in-up"
          preserveAspectRatio="none"
          style={{ animationDelay: '0.6s' }}
        >
          <path
            fill="currentColor"
            d="M0,256L80,261.3C160,267,320,277,480,272C640,267,800,245,960,250.7C1120,256,1280,288,1360,304L1440,320L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>

        {/* Acacia trees silhouettes */}
        <div className="absolute bottom-[15%] left-[10%] animate-tree-sway" style={{ animationDelay: '0s' }}>
          <svg width="80" height="100" viewBox="0 0 80 100" className="text-loading-tree">
            <ellipse cx="40" cy="30" rx="35" ry="20" fill="currentColor" />
            <rect x="37" y="50" width="6" height="50" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-[12%] right-[20%] animate-tree-sway" style={{ animationDelay: '0.5s' }}>
          <svg width="60" height="80" viewBox="0 0 80 100" className="text-loading-tree opacity-70">
            <ellipse cx="40" cy="30" rx="35" ry="20" fill="currentColor" />
            <rect x="37" y="50" width="6" height="50" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-[18%] left-[45%] animate-tree-sway" style={{ animationDelay: '1s' }}>
          <svg width="100" height="120" viewBox="0 0 80 100" className="text-loading-tree">
            <ellipse cx="40" cy="30" rx="35" ry="20" fill="currentColor" />
            <rect x="37" y="50" width="6" height="50" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Orbital progress ring */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
          {/* Outer orbital ring */}
          <div className="absolute inset-0 rounded-full border-2 border-loading-ring/20 animate-spin-slow" />
          
          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="hsl(var(--loading-ring) / 0.1)"
              strokeWidth="4"
            />
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="url(#progress-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${progress * 3.02} 302`}
              className="transition-all duration-300 ease-out filter drop-shadow-[0_0_10px_hsl(var(--loading-sun))]"
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--loading-sun))" />
                <stop offset="50%" stopColor="hsl(var(--loading-accent))" />
                <stop offset="100%" stopColor="hsl(var(--loading-sun-glow))" />
              </linearGradient>
            </defs>
          </svg>

          {/* Orbiting dot */}
          <div 
            className="absolute w-4 h-4 rounded-full bg-loading-sun shadow-[0_0_20px_hsl(var(--loading-sun))]"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${progress * 3.6}deg) translateX(${128}px) translateY(-50%)`,
              transition: 'transform 0.3s ease-out',
            }}
          />

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Morphing animal silhouette */}
              <div className="absolute -inset-8 flex items-center justify-center">
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                  {animals.map((animal, index) => (
                    <div
                      key={animal}
                      className={`absolute inset-0 text-loading-animal transition-all duration-700 ${
                        index === currentAnimal
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-75'
                      }`}
                    >
                      <AnimalSVG type={animal} className="w-full h-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Logo */}
              <div className="relative bg-gradient-to-br from-white/95 to-white/80 rounded-2xl p-6 shadow-2xl backdrop-blur-sm border border-white/20 animate-float">
                <img
                  src={logo}
                  alt="DeMi Tours"
                  className="h-16 w-auto md:h-20"
                />
              </div>
            </div>
          </div>

          {/* Floating elements around the ring */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 animate-float" style={{ animationDelay: '0s' }}>
            <div className="w-2 h-2 rounded-full bg-loading-sun/60" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 animate-float" style={{ animationDelay: '0.5s' }}>
            <div className="w-3 h-3 rounded-full bg-loading-accent/60" />
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 animate-float" style={{ animationDelay: '1s' }}>
            <div className="w-2 h-2 rounded-full bg-loading-sun-glow/60" />
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="w-2 h-2 rounded-full bg-loading-sun/60" />
          </div>
        </div>

        {/* Text content */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-wide animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            Preparing Your Safari
          </h2>
          <p className="text-sm md:text-base text-white/70 uppercase tracking-[0.3em] animate-fade-in-up" style={{ animationDelay: '1s' }}>
            Adventure Awaits
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-72 md:w-96 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-loading-sun via-loading-accent to-loading-sun-glow rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/50 uppercase tracking-wider">
                {animals[currentAnimal]}
              </span>
            </div>
            <span className="text-lg font-bold text-white tabular-nums">
              {progress}%
            </span>
          </div>
        </div>

        {/* Journey dots */}
        <div className="flex items-center gap-3 mt-8 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                progress >= i * 25
                  ? 'w-8 bg-loading-sun'
                  : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes sun-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        
        @keyframes sun-glow {
          0%, 100% { opacity: 0.6; filter: blur(10px); }
          50% { opacity: 0.9; filter: blur(15px); }
        }
        
        @keyframes firefly {
          0%, 100% {
            opacity: 0;
            transform: translate(0, 0) scale(0.5);
          }
          25% {
            opacity: 1;
            transform: translate(10px, -20px) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translate(-5px, -40px) scale(0.8);
          }
          75% {
            opacity: 1;
            transform: translate(15px, -60px) scale(1);
          }
        }
        
        @keyframes tree-sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        
        .animate-sun-pulse {
          animation: sun-pulse 4s ease-in-out infinite;
        }
        
        .animate-sun-glow {
          animation: sun-glow 3s ease-in-out infinite;
        }
        
        .animate-firefly {
          animation: firefly 5s ease-in-out infinite;
        }
        
        .animate-tree-sway {
          animation: tree-sway 4s ease-in-out infinite;
          transform-origin: bottom center;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
