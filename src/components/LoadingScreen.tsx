import { useEffect, useState } from 'react';
import logo from '@/assets/RCGP_Logo_Small-removebg-preview-1.webp';

export const LoadingScreen = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);

  const stages = [
    "Spotting the Big Five...",
    "Charting safari routes...",
    "Preparing your adventure...",
    "Almost ready to explore..."
  ];

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = prev < 60 ? 12 : prev < 90 ? 8 : 5;
        return Math.min(prev + increment, 100);
      });
    }, 180);

    // Update loading stage based on progress
    const stageInterval = setInterval(() => {
      setProgress((currentProgress) => {
        if (currentProgress < 25) setLoadingStage(0);
        else if (currentProgress < 50) setLoadingStage(1);
        else if (currentProgress < 75) setLoadingStage(2);
        else setLoadingStage(3);
        return currentProgress;
      });
    }, 200);

    // When progress reaches 100, start fade out
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
      clearInterval(stageInterval);
      clearInterval(checkComplete);
    };
  }, [progress, onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-700 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#1a1410] to-[#0a0a0a]">
        {/* Animated grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'linear-gradient(rgba(238, 133, 9, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(238, 133, 9, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* Animated savannah landscape - Enhanced SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {/* Sunset/Sunrise */}
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#EE8509" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#FF6B35" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#EE8509" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="1200" cy="180" r="100" fill="url(#sunGlow)">
            <animate attributeName="r" values="90;100;90" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.6;0.4" dur="4s" repeatCount="indefinite" />
          </circle>

          {/* Mountain ranges with parallax effect */}
          <g opacity="0.2">
            <path d="M0 550 L200 350 L400 480 L600 300 L800 450 L1000 280 L1200 420 L1440 350 L1440 900 L0 900 Z" fill="#1a1410">
              <animateTransform attributeName="transform" type="translate" values="0,0; -30,0; 0,0" dur="30s" repeatCount="indefinite" />
            </path>
          </g>

          <g opacity="0.25">
            <path d="M0 620 L150 480 L350 590 L550 420 L750 560 L950 400 L1150 520 L1350 450 L1440 500 L1440 900 L0 900 Z" fill="#2a2116">
              <animateTransform attributeName="transform" type="translate" values="0,0; -20,0; 0,0" dur="25s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Acacia trees */}
          <g opacity="0.35">
            {/* Left tree */}
            <ellipse cx="200" cy="680" rx="70" ry="20" fill="#1a1410" />
            <rect x="195" y="680" width="10" height="120" fill="#0a0806" />

            {/* Center tree */}
            <ellipse cx="720" cy="700" rx="80" ry="22" fill="#1a1410">
              <animateTransform attributeName="transform" type="scale" values="1,1; 1.03,0.97; 1,1" dur="5s" repeatCount="indefinite" additive="sum" />
            </ellipse>
            <rect x="715" y="700" width="10" height="130" fill="#0a0806" />

            {/* Right tree */}
            <ellipse cx="1200" cy="720" rx="65" ry="18" fill="#1a1410" />
            <rect x="1196" y="720" width="8" height="100" fill="#0a0806" />
          </g>

          {/* Ground layer with grass texture */}
          <path d="M0 750 Q360 730 720 750 T1440 750 L1440 900 L0 900 Z" fill="#0f0d0a" opacity="0.3" />

          {/* Animals silhouettes */}
          <g opacity="0.25">
            {/* Wildebeest migration */}
            <ellipse cx="300" cy="780" rx="18" ry="12" fill="#0a0806">
              <animateTransform attributeName="transform" type="translate" values="0,0; 1200,0" dur="35s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="340" cy="785" rx="16" ry="10" fill="#0a0806">
              <animateTransform attributeName="transform" type="translate" values="0,0; 1200,0" dur="37s" repeatCount="indefinite" />
            </ellipse>

            {/* Elephant silhouette */}
            <g>
              <ellipse cx="900" cy="760" rx="35" ry="28" fill="#0a0806" />
              <rect x="895" y="760" width="10" height="50" fill="#0a0806" />
              <animateTransform attributeName="transform" type="translate" values="1500,0; -1500,0" dur="45s" repeatCount="indefinite" />
            </g>

            {/* Birds */}
            <g stroke="#0a0806" strokeWidth="2.5" fill="none" opacity="0.4">
              <path d="M100 250 Q105 245 110 250 Q115 245 120 250">
                <animateTransform attributeName="transform" type="translate" values="0,0; 1400,-100" dur="25s" repeatCount="indefinite" />
              </path>
              <path d="M150 230 Q155 225 160 230 Q165 225 170 230">
                <animateTransform attributeName="transform" type="translate" values="0,0; 1400,-80" dur="28s" repeatCount="indefinite" />
              </path>
            </g>
          </g>

          {/* Fireflies/particles */}
          {[...Array(15)].map((_, i) => (
            <circle
              key={i}
              cx={100 + i * 90}
              cy={600 + (i % 3) * 50}
              r="2"
              fill="#EE8509"
            >
              <animate attributeName="opacity" values="0;0.8;0" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
              <animateTransform attributeName="transform" type="translate" values="0,0; 0,-20; 0,0" dur={`${3 + (i % 2)}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* Logo container with enhanced design */}
        <div className="relative mb-16">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 rounded-full border-2 border-primary/20 border-dashed animate-[spin_25s_linear_infinite]" />
          </div>

          {/* Pulsing glow effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-60 h-60 rounded-full bg-primary/5 blur-3xl animate-pulse" />
          </div>

          {/* Logo */}
          <div className="relative bg-gradient-to-br from-white via-white to-gray-50 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border-2 border-primary/10 animate-[float_4s_ease-in-out_infinite]">
            <img src={logo} alt="DeMi Tours" className="h-32 w-auto drop-shadow-lg" />
          </div>

          {/* Orbiting elements */}
          <div className="absolute inset-0 flex items-center justify-center animate-[spin_20s_linear_infinite]">
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  transform: `rotate(${angle}deg) translateY(-130px) rotate(-${angle}deg)`,
                }}
              >
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/50 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Title and tagline */}
        <div className="text-center mb-10 space-y-3">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#FFB366] to-secondary animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_auto]">
            DeMi Tours & Travel
          </h1>
          <p className="font-heading text-sm text-gray-400 uppercase tracking-[0.4em] animate-pulse">
            Crafting Safari Dreams
          </p>
        </div>

        {/* Enhanced progress bar */}
        <div className="w-full max-w-md px-4">
          {/* Progress container */}
          <div className="relative">
            {/* Track */}
            <div className="h-2 bg-gray-800/80 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/50 shadow-inner">
              {/* Progress fill */}
              <div
                className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-all duration-300 ease-out relative shadow-lg shadow-primary/30"
                style={{
                  width: `${progress}%`,
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s linear infinite'
                }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[slideRight_1.5s_linear_infinite]" />
              </div>
            </div>

            {/* Safari jeep indicator */}
            <div
              className="absolute -top-4 transition-all duration-300 ease-out"
              style={{ left: `calc(${progress}% - 20px)` }}
            >
              <div className="relative">
                {/* Jeep icon */}
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-xl border-3 border-white/20 backdrop-blur-sm animate-[bounce_1s_ease-in-out_infinite]">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z" />
                  </svg>
                </div>
                {/* Dust trail */}
                {progress > 5 && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-1 bg-primary/30 rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress info */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-left">
              <p className="text-xs font-heading text-gray-500 uppercase tracking-wider mb-1">
                {stages[loadingStage]}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                {progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Safari icons footer */}
        <div className="absolute bottom-12 flex items-center gap-8 opacity-30">
          {['🦁', '🐘', '🦒', '🦓', '🦏'].map((emoji, i) => (
            <span
              key={i}
              className="text-3xl"
              style={{
                animation: `bounce 2s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.02); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes slideRight {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
