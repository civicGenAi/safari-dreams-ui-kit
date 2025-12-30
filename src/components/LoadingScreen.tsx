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
          setTimeout(onLoadComplete, 1000);
        }, 500);
      }
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(checkComplete);
    };
  }, [progress, onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1410] via-[#2D3748] to-[#1a1410]">
        {/* Animated stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.7 + 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated savannah landscape - SVG */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          {/* Sun/Moon in background */}
          <circle cx="1200" cy="200" r="80" fill="#EE8509" opacity="0.3">
            <animate attributeName="opacity" values="0.2;0.4;0.2" dur="4s" repeatCount="indefinite" />
          </circle>

          {/* Mountain silhouettes */}
          <g opacity="0.15" fill="#2D3748">
            <path d="M0 600 L200 400 L400 550 L600 350 L800 500 L1000 300 L1200 450 L1440 400 L1440 900 L0 900 Z">
              <animateTransform attributeName="transform" type="translate" values="0,0; -20,5; 0,0" dur="20s" repeatCount="indefinite" />
            </path>
          </g>

          {/* Ground/Savannah layer */}
          <g opacity="0.25" fill="#8B7355">
            <path d="M0 700 Q360 680 720 700 T1440 700 L1440 900 L0 900 Z" />
          </g>

          {/* Acacia trees - silhouettes */}
          <g opacity="0.3" fill="#2D3748">
            {/* Left acacia tree */}
            <ellipse cx="250" cy="650" rx="60" ry="15">
              <animateTransform attributeName="transform" type="scale" values="1,1; 1.05,0.95; 1,1" dur="4s" repeatCount="indefinite" additive="sum" />
            </ellipse>
            <rect x="246" y="650" width="8" height="100" />

            {/* Right acacia tree */}
            <ellipse cx="1150" cy="680" rx="50" ry="12">
              <animateTransform attributeName="transform" type="scale" values="1,1; 1.05,0.95; 1,1" dur="5s" repeatCount="indefinite" additive="sum" />
            </ellipse>
            <rect x="1147" y="680" width="6" height="80" />
          </g>

          {/* Animated animals crossing */}
          <g className="animals">
            {/* Wildebeest herd */}
            <g opacity="0.4">
              <ellipse cx="200" cy="750" rx="15" ry="10" fill="#2D3748">
                <animateTransform attributeName="transform" type="translate" values="0,0; 1200,0" dur="25s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="250" cy="755" rx="12" ry="8" fill="#2D3748">
                <animateTransform attributeName="transform" type="translate" values="0,0; 1200,0" dur="27s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="230" cy="745" rx="14" ry="9" fill="#2D3748">
                <animateTransform attributeName="transform" type="translate" values="0,0; 1200,0" dur="26s" repeatCount="indefinite" />
              </ellipse>
            </g>

            {/* Birds flying */}
            <g opacity="0.35" stroke="#2D3748" strokeWidth="2" fill="none">
              <path d="M100 200 Q105 195 110 200 Q115 195 120 200">
                <animateTransform attributeName="transform" type="translate" values="0,0; 1400,-100" dur="20s" repeatCount="indefinite" />
              </path>
              <path d="M150 180 Q155 175 160 180 Q165 175 170 180">
                <animateTransform attributeName="transform" type="translate" values="0,0; 1400,-80" dur="22s" repeatCount="indefinite" />
              </path>
            </g>

            {/* Giraffe silhouette */}
            <g opacity="0.35" fill="#2D3748">
              <ellipse cx="900" cy="720" rx="20" ry="15" />
              <rect x="895" y="650" width="10" height="70" />
              <ellipse cx="900" cy="640" rx="18" ry="20" />
              <rect x="897" y="600" width="6" height="40" />
              <ellipse cx="900" cy="595" rx="12" ry="15" />
              <animateTransform attributeName="transform" type="translate" values="1400,0; -1000,0" dur="35s" repeatCount="indefinite" />
            </g>
          </g>

          {/* Grass foreground */}
          <g opacity="0.2" stroke="#4A5568" strokeWidth="1.5" fill="none">
            {[...Array(30)].map((_, i) => (
              <path
                key={i}
                d={`M${i * 50} 850 Q${i * 50 + 5} 835 ${i * 50 + 10} 850`}
                style={{ animation: `grassSway ${3 + (i % 3)}s ease-in-out infinite`, animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* Logo with creative animation */}
        <div className="relative mb-12">
          {/* Rotating compass ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-56 h-56 rounded-full border-2 border-primary/30 border-dashed" style={{ animation: 'rotate 20s linear infinite' }} />
          </div>

          {/* Pulsing glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-primary/10 blur-2xl" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
          </div>

          {/* Logo container */}
          <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-primary/20">
            <img
              src={logo}
              alt="DeMi Tours"
              className="h-28 w-auto"
              style={{ animation: 'float 3s ease-in-out infinite' }}
            />
          </div>

          {/* Orbiting safari icons */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'rotate 15s linear infinite' }}>
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <div
                key={i}
                className="absolute w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center"
                style={{
                  transform: `rotate(${angle}deg) translateY(-110px)`,
                }}
              >
                <div className="text-primary text-xs">★</div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading Text with Safari Theme */}
        <div className="text-center mb-8">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent" style={{ animation: 'shimmer 3s ease-in-out infinite', backgroundSize: '200% 100%' }}>
            Preparing Your Safari
          </h2>
          <p className="font-heading text-sm text-gray-300 uppercase tracking-[0.3em] flex items-center justify-center gap-2">
            <span style={{ animation: 'bounce 1s ease-in-out infinite' }}>🦁</span>
            Adventure Awaits
            <span style={{ animation: 'bounce 1s ease-in-out infinite 0.5s' }}>🌍</span>
          </p>
        </div>

        {/* Creative Progress Bar - Safari Track */}
        <div className="relative w-96 max-w-md">
          {/* Track background */}
          <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-600/30">
            {/* Animated stars in background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animation: 'shimmer 2s linear infinite' }} />

            {/* Progress fill with gradient */}
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-all duration-300 ease-out relative overflow-hidden shadow-lg shadow-primary/50"
              style={{ width: `${progress}%`, backgroundSize: '200% 100%', animation: 'shimmer 2s linear infinite' }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" style={{ animation: 'slideRight 1.5s linear infinite' }} />
            </div>

            {/* Safari vehicle indicator */}
            <div
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
              style={{ left: `calc(${progress}% - 16px)` }}
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-white" style={{ animation: 'bounce 0.5s ease-in-out infinite' }}>
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="4" y="10" width="16" height="8" rx="2" />
                  <circle cx="8" cy="18" r="2" />
                  <circle cx="16" cy="18" r="2" />
                  <rect x="10" y="6" width="6" height="4" rx="1" />
                </svg>
              </div>
            </div>
          </div>

          {/* Progress Text */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs font-heading text-gray-400 uppercase tracking-wider">
              Loading Safari Experience
            </span>
            <span className="text-lg font-display font-bold text-primary">
              {progress}%
            </span>
          </div>
        </div>

        {/* Loading messages */}
        <div className="mt-6 text-center h-6">
          <p className="text-xs text-gray-400 font-heading" style={{ animation: 'fadeInOut 3s ease-in-out infinite' }}>
            {progress < 30 && "Packing your virtual bags..."}
            {progress >= 30 && progress < 60 && "Spotting wildlife..."}
            {progress >= 60 && progress < 90 && "Preparing your adventure..."}
            {progress >= 90 && "Almost there..."}
          </p>
        </div>
      </div>

      {/* Custom Keyframe Animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes grassSway {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(3px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
};
