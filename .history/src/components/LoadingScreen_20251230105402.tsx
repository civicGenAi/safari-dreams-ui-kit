import { useEffect, useState } from 'react';

const safariStages = [
  { icon: 'binoculars', text: 'Spotting Wildlife...' },
  { icon: 'compass', text: 'Planning Route...' },
  { icon: 'jeep', text: 'Starting Engine...' },
  { icon: 'camera', text: 'Ready for Adventure!' },
];

export const LoadingScreen = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [jeepPosition, setJeepPosition] = useState(-20);
  const [showAnimals, setShowAnimals] = useState([false, false, false, false, false]);
  const [pathProgress, setPathProgress] = useState(0);
  const [dustParticles, setDustParticles] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number }>>([]);

  // Animate jeep across screen
  useEffect(() => {
    const jeepInterval = setInterval(() => {
      setJeepPosition((prev) => {
        if (prev >= 120) return 120;
        return prev + 1.5;
      });
    }, 50);

    return () => clearInterval(jeepInterval);
  }, []);

  // Generate dust particles behind jeep
  useEffect(() => {
    if (jeepPosition > 0 && jeepPosition < 100) {
      const newParticle = {
        id: Date.now(),
        x: jeepPosition - 5,
        y: 55 + Math.random() * 10,
        size: Math.random() * 8 + 4,
        opacity: Math.random() * 0.5 + 0.3,
      };
      setDustParticles((prev) => [...prev.slice(-15), newParticle]);
    }
  }, [jeepPosition]);

  // Animate path drawing
  useEffect(() => {
    const pathInterval = setInterval(() => {
      setPathProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(pathInterval);
  }, []);

  // Reveal animals at different points
  useEffect(() => {
    const thresholds = [15, 30, 50, 70, 85];
    const newShowAnimals = thresholds.map((t) => jeepPosition >= t);
    setShowAnimals(newShowAnimals);
  }, [jeepPosition]);

  // Progress through stages
  useEffect(() => {
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev >= safariStages.length - 1) {
          clearInterval(stageInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(stageInterval);
  }, []);

  // Complete loading
  useEffect(() => {
    if (jeepPosition >= 110 && currentStage >= safariStages.length - 1) {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(onLoadComplete, 600);
      }, 500);
    }
  }, [jeepPosition, currentStage, onLoadComplete]);

  const BinocularsIcon = () => (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="currentColor">
      <circle cx="18" cy="38" r="14" strokeWidth="3" stroke="currentColor" fill="none" />
      <circle cx="46" cy="38" r="14" strokeWidth="3" stroke="currentColor" fill="none" />
      <rect x="28" y="32" width="8" height="12" rx="2" />
      <circle cx="18" cy="38" r="8" opacity="0.3" />
      <circle cx="46" cy="38" r="8" opacity="0.3" />
    </svg>
  );

  const CompassIcon = () => (
    <svg viewBox="0 0 64 64" className="w-full h-full animate-spin-slow">
      <circle cx="32" cy="32" r="28" strokeWidth="3" stroke="currentColor" fill="none" />
      <circle cx="32" cy="32" r="22" strokeWidth="1" stroke="currentColor" fill="none" opacity="0.3" />
      <polygon points="32,8 36,32 32,38 28,32" fill="hsl(var(--loading-accent))" />
      <polygon points="32,56 36,32 32,26 28,32" fill="currentColor" opacity="0.5" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
    </svg>
  );

  const JeepIcon = () => (
    <svg viewBox="0 0 80 50" className="w-full h-full" fill="currentColor">
      <rect x="5" y="20" width="60" height="20" rx="3" />
      <rect x="10" y="10" width="40" height="15" rx="2" />
      <rect x="15" y="14" width="10" height="8" fill="hsl(var(--loading-glass))" rx="1" />
      <rect x="30" y="14" width="10" height="8" fill="hsl(var(--loading-glass))" rx="1" />
      <circle cx="18" cy="42" r="8" />
      <circle cx="52" cy="42" r="8" />
      <circle cx="18" cy="42" r="4" fill="hsl(var(--background))" />
      <circle cx="52" cy="42" r="4" fill="hsl(var(--background))" />
      <rect x="60" y="25" width="10" height="3" rx="1" />
    </svg>
  );

  const CameraIcon = () => (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="currentColor">
      <rect x="8" y="18" width="48" height="32" rx="4" />
      <circle cx="32" cy="34" r="12" strokeWidth="3" stroke="hsl(var(--background))" fill="none" />
      <circle cx="32" cy="34" r="6" fill="hsl(var(--loading-accent))" />
      <rect x="22" y="12" width="20" height="8" rx="2" />
      <circle cx="48" cy="24" r="3" fill="hsl(var(--loading-accent))" />
    </svg>
  );

  const ElephantSilhouette = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 80" className={className} fill="currentColor">
      <path d="M85 45c0-15-8-25-20-28V12c0-3-2-5-5-5s-5 2-5 5v3c-3-1-6-1-10-1s-7 0-10 1v-3c0-3-2-5-5-5s-5 2-5 5v5c-12 3-20 13-20 28v10c0 5 4 9 9 9h5v8c0 3 2 5 5 5s5-2 5-5v-8h22v8c0 3 2 5 5 5s5-2 5-5v-8h5c5 0 9-4 9-9V45zM25 40c-3 0-5-2-5-5s2-5 5-5 5 2 5 5-2 5-5 5z" />
    </svg>
  );

  const GiraffeSilhouette = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 60 100" className={className} fill="currentColor">
      <ellipse cx="30" cy="15" rx="12" ry="10" />
      <rect x="25" y="20" width="10" height="45" />
      <ellipse cx="30" cy="70" rx="18" ry="12" />
      <rect x="20" y="78" width="5" height="20" />
      <rect x="35" y="78" width="5" height="20" />
      <path d="M20 10L15 5M40 10L45 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );

  const LionSilhouette = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 70" className={className} fill="currentColor">
      <ellipse cx="35" cy="35" rx="25" ry="20" />
      <circle cx="35" cy="25" r="18" />
      <ellipse cx="35" cy="25" rx="28" ry="22" opacity="0.5" />
      <rect x="55" y="40" width="35" height="8" rx="4" />
      <circle cx="90" cy="44" r="6" />
      <rect x="20" y="50" width="6" height="18" />
      <rect x="35" y="50" width="6" height="18" />
      <circle cx="30" cy="22" r="3" fill="hsl(var(--background))" />
      <circle cx="40" cy="22" r="3" fill="hsl(var(--background))" />
    </svg>
  );

  const ZebraSilhouette = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 90 70" className={className} fill="currentColor">
      <ellipse cx="45" cy="40" rx="30" ry="18" />
      <path d="M15 35C10 30 8 20 15 15L25 25V38Z" />
      <rect x="25" y="55" width="5" height="15" />
      <rect x="40" y="55" width="5" height="15" />
      <rect x="55" y="55" width="5" height="15" />
      <path d="M75 40H88C88 48 80 52 75 48Z" />
    </svg>
  );

  const BirdSilhouette = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 60 40" className={className} fill="currentColor">
      <path d="M30 20C15 20 5 10 0 5C5 15 10 20 20 22C10 25 5 35 0 40C10 30 20 25 30 25C40 25 50 30 60 35C55 28 45 25 40 23C50 20 55 10 60 5C50 15 40 20 30 20Z" />
    </svg>
  );

  const stageIcons: Record<string, JSX.Element> = {
    binoculars: <BinocularsIcon />,
    compass: <CompassIcon />,
    jeep: <JeepIcon />,
    camera: <CameraIcon />,
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white overflow-hidden transition-all duration-600 ${
        fadeOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="safari-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="hsl(var(--loading-earth))" />
              <path d="M0 30h60M30 0v60" stroke="hsl(var(--loading-earth))" strokeWidth="0.5" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#safari-pattern)" />
        </svg>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-loading-earth/20 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-loading-earth/20 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-loading-earth/20 rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-loading-earth/20 rounded-br-lg" />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        
        {/* Title */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-loading-earth tracking-wide mb-2">
            Safari Adventure
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-loading-accent" />
            <span className="text-loading-accent text-sm uppercase tracking-[0.3em]">Loading</span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-loading-accent" />
          </div>
        </div>

        {/* Safari Journey Scene */}
        <div className="relative w-full max-w-4xl h-64 md:h-80 mb-8">
          
          {/* Sky gradient */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-loading-sky/30 via-loading-sky/10 to-transparent rounded-t-3xl" />
          
          {/* Sun */}
          <div className="absolute top-4 right-12 md:right-24">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <div className="absolute inset-0 bg-loading-sun rounded-full animate-pulse-slow" />
              <div className="absolute inset-2 bg-loading-sun-bright rounded-full" />
              {/* Sun rays */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1 h-8 bg-loading-sun/40 origin-bottom animate-ray-pulse"
                  style={{
                    transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Flying birds */}
          <div className="absolute top-8 left-1/4 animate-fly-across" style={{ animationDelay: '0s' }}>
            <BirdSilhouette className="w-8 h-6 text-loading-earth/30" />
          </div>
          <div className="absolute top-16 left-1/3 animate-fly-across" style={{ animationDelay: '0.5s' }}>
            <BirdSilhouette className="w-6 h-4 text-loading-earth/20" />
          </div>
          <div className="absolute top-12 left-1/2 animate-fly-across" style={{ animationDelay: '1s' }}>
            <BirdSilhouette className="w-10 h-7 text-loading-earth/25" />
          </div>

          {/* Ground/Savanna */}
          <div className="absolute inset-x-0 bottom-0 h-1/2">
            {/* Grass texture */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="ground-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--loading-grass))" />
                  <stop offset="100%" stopColor="hsl(var(--loading-grass-dark))" />
                </linearGradient>
              </defs>
              <ellipse cx="50%" cy="0" rx="60%" ry="100%" fill="url(#ground-gradient)" />
            </svg>

            {/* Journey path */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 160" preserveAspectRatio="none">
              <path
                d="M-20 100 Q100 120 200 90 T400 100 T600 85 T820 100"
                stroke="hsl(var(--loading-path))"
                strokeWidth="4"
                fill="none"
                strokeDasharray="800"
                strokeDashoffset={800 - pathProgress * 8}
                strokeLinecap="round"
                className="transition-all duration-100"
                opacity="0.6"
              />
              {/* Path dots */}
              <circle cx="100" cy="105" r="4" fill="hsl(var(--loading-accent))" opacity={pathProgress > 12 ? 1 : 0.2} className="transition-opacity duration-300" />
              <circle cx="250" cy="92" r="4" fill="hsl(var(--loading-accent))" opacity={pathProgress > 31 ? 1 : 0.2} className="transition-opacity duration-300" />
              <circle cx="400" cy="100" r="4" fill="hsl(var(--loading-accent))" opacity={pathProgress > 50 ? 1 : 0.2} className="transition-opacity duration-300" />
              <circle cx="550" cy="88" r="4" fill="hsl(var(--loading-accent))" opacity={pathProgress > 69 ? 1 : 0.2} className="transition-opacity duration-300" />
              <circle cx="700" cy="95" r="4" fill="hsl(var(--loading-accent))" opacity={pathProgress > 88 ? 1 : 0.2} className="transition-opacity duration-300" />
            </svg>

            {/* Dust particles */}
            {dustParticles.map((particle) => (
              <div
                key={particle.id}
                className="absolute rounded-full bg-loading-dust animate-dust-fade"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: particle.opacity,
                }}
              />
            ))}

            {/* Safari Jeep */}
            <div
              className="absolute w-20 h-12 md:w-28 md:h-16 text-loading-jeep transition-all duration-100 ease-linear"
              style={{
                left: `${jeepPosition}%`,
                top: '35%',
                transform: 'translateX(-50%)',
              }}
            >
              {/* DeMi Tours branding above jeep */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="font-display text-xs md:text-sm font-bold text-loading-accent tracking-wide drop-shadow-sm">
                  DeMi Tours
                </span>
              </div>
              <div className="animate-jeep-bounce">
                <JeepIcon />
              </div>
            </div>

            {/* Animals appearing along the journey */}
            <div className={`absolute left-[8%] bottom-[25%] transition-all duration-700 ${showAnimals[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <ElephantSilhouette className="w-16 h-12 md:w-24 md:h-16 text-loading-animal" />
            </div>
            
            <div className={`absolute left-[25%] bottom-[35%] transition-all duration-700 ${showAnimals[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <GiraffeSilhouette className="w-10 h-16 md:w-14 md:h-24 text-loading-animal" />
            </div>
            
            <div className={`absolute left-[45%] bottom-[20%] transition-all duration-700 ${showAnimals[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <ZebraSilhouette className="w-14 h-10 md:w-20 md:h-14 text-loading-animal" />
            </div>
            
            <div className={`absolute left-[65%] bottom-[30%] transition-all duration-700 ${showAnimals[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <LionSilhouette className="w-16 h-10 md:w-24 md:h-14 text-loading-animal" />
            </div>

            <div className={`absolute right-[8%] bottom-[40%] transition-all duration-700 ${showAnimals[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <GiraffeSilhouette className="w-8 h-14 md:w-12 md:h-20 text-loading-animal opacity-60" />
            </div>

            {/* Acacia trees */}
            <div className="absolute left-[15%] bottom-[45%]">
              <svg width="50" height="60" viewBox="0 0 50 60" className="text-loading-tree">
                <ellipse cx="25" cy="15" rx="22" ry="12" fill="currentColor" />
                <rect x="22" y="25" width="6" height="35" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute right-[20%] bottom-[50%]">
              <svg width="40" height="50" viewBox="0 0 50 60" className="text-loading-tree opacity-70">
                <ellipse cx="25" cy="15" rx="22" ry="12" fill="currentColor" />
                <rect x="22" y="25" width="6" height="35" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        {/* Stage indicators */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-6">
          {safariStages.map((stage, index) => (
            <div
              key={stage.icon}
              className={`flex flex-col items-center transition-all duration-500 ${
                index <= currentStage ? 'opacity-100 scale-100' : 'opacity-30 scale-90'
              }`}
            >
              <div
                className={`w-12 h-12 md:w-16 md:h-16 p-2 md:p-3 rounded-full border-2 transition-all duration-500 ${
                  index === currentStage
                    ? 'border-loading-accent bg-loading-accent/10 text-loading-accent animate-pulse'
                    : index < currentStage
                    ? 'border-loading-earth bg-loading-earth/10 text-loading-earth'
                    : 'border-loading-earth/30 text-loading-earth/30'
                }`}
              >
                {stageIcons[stage.icon]}
              </div>
              {index < safariStages.length - 1 && (
                <div className="hidden md:block absolute translate-x-10">
                  <div className={`w-8 h-0.5 transition-all duration-500 ${index < currentStage ? 'bg-loading-earth' : 'bg-loading-earth/20'}`} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Current stage text */}
        <div className="text-center h-8">
          <p className="text-loading-earth font-medium text-lg tracking-wide animate-pulse">
            {safariStages[currentStage]?.text}
          </p>
        </div>

        {/* Journey progress bar */}
        <div className="w-64 md:w-80 mt-6">
          <div className="relative h-2 bg-loading-earth/10 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-loading-earth via-loading-accent to-loading-earth rounded-full transition-all duration-300"
              style={{ width: `${Math.min(jeepPosition, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-loading-earth/50 uppercase tracking-wider">
            <span>Start</span>
            <span>Destination</span>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        @keyframes ray-pulse {
          0%, 100% { opacity: 0.3; height: 2rem; }
          50% { opacity: 0.6; height: 2.5rem; }
        }
        
        @keyframes fly-across {
          0% { transform: translateX(-100px) translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(calc(100vw + 100px)) translateY(-20px); opacity: 0; }
        }
        
        @keyframes jeep-bounce {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-3px) rotate(1deg); }
        }
        
        @keyframes dust-fade {
          0% { opacity: 0.5; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(2) translateY(-20px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-ray-pulse {
          animation: ray-pulse 2s ease-in-out infinite;
        }
        
        .animate-fly-across {
          animation: fly-across 8s linear infinite;
        }
        
        .animate-jeep-bounce {
          animation: jeep-bounce 0.3s ease-in-out infinite;
        }
        
        .animate-dust-fade {
          animation: dust-fade 1s ease-out forwards;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
