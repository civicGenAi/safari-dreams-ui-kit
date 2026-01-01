import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const LoadingSpinner = ({ size = 'md', className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      {/* Outer spinning ring */}
      <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>

      {/* Animated spinning arc */}
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>

      {/* Inner pulsing dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingScreen = ({ message = 'Loading your next adventure...', fullScreen = true }: LoadingScreenProps) => {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-background',
      fullScreen ? 'min-h-screen' : 'py-12'
    )}>
      <div className="relative w-full max-w-md px-4">
        {/* Animated East Africa Map/Globe */}
        <div className="mb-8 relative">
          <svg
            className="w-full h-auto max-w-[280px] sm:max-w-[320px] mx-auto"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Rotating globe background */}
            <circle cx="150" cy="150" r="120" fill="#FEF3C7" opacity="0.3">
              <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Globe latitude lines */}
            <ellipse cx="150" cy="150" rx="120" ry="40" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.4">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="150" cy="150" rx="120" ry="80" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.3">
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2.5s" repeatCount="indefinite" />
            </ellipse>

            {/* Rotating longitude lines */}
            <ellipse cx="150" cy="150" rx="40" ry="120" stroke="#EA580C" strokeWidth="1.5" fill="none" opacity="0.5">
              <animateTransform attributeName="transform" type="rotate" from="0 150 150" to="360 150 150" dur="8s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="150" cy="150" rx="80" ry="120" stroke="#EA580C" strokeWidth="1.5" fill="none" opacity="0.4">
              <animateTransform attributeName="transform" type="rotate" from="0 150 150" to="360 150 150" dur="12s" repeatCount="indefinite" />
            </ellipse>

            {/* East Africa landmass (simplified) */}
            <g fill="#D97706" opacity="0.6">
              <path d="M 140 100 Q 145 95 155 100 L 160 120 Q 158 130 150 135 Q 142 130 140 120 Z">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
              </path>
              <path d="M 155 140 Q 160 145 165 150 L 163 170 Q 158 175 150 172 L 148 155 Z">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3.5s" repeatCount="indefinite" />
              </path>
            </g>

            {/* Compass rose in corner */}
            <g transform="translate(240, 40)">
              <circle cx="0" cy="0" r="25" stroke="#F97316" strokeWidth="2" fill="none" opacity="0.6" strokeDasharray="3,3">
                <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="20s" repeatCount="indefinite" />
              </g>
              <path d="M 0 -20 L 3 -5 L 0 -8 L -3 -5 Z" fill="#DC2626" opacity="0.9" />
              <path d="M 0 20 L 3 5 L 0 8 L -3 5 Z" fill="#6B7280" opacity="0.7" />
              <circle cx="0" cy="0" r="3" fill="#FF6B00" />
            </g>

            {/* Location pins with drop animation and ripples */}
            {/* Tanzania pin */}
            <g>
              <circle cx="150" cy="155" r="3" fill="#DC2626" opacity="0">
                <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
                <animate attributeName="r" values="3;20;30" dur="2s" begin="0.5s" repeatCount="indefinite" />
              </circle>
              <g opacity="0">
                <animate attributeName="opacity" values="0;1;1" dur="0.3s" begin="0.5s" fill="freeze" />
                <circle cx="150" cy="155" r="5" fill="#DC2626" />
                <path d="M 150 155 L 150 168 L 147 165 Z" fill="#DC2626">
                  <animateTransform attributeName="transform" type="translate" values="0,-20; 0,0" dur="0.3s" begin="0.5s" fill="freeze" />
                </path>
              </g>
            </g>

            {/* Kenya pin */}
            <g>
              <circle cx="155" cy="120" r="3" fill="#DC2626" opacity="0">
                <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="1s" repeatCount="indefinite" />
                <animate attributeName="r" values="3;20;30" dur="2s" begin="1s" repeatCount="indefinite" />
              </circle>
              <g opacity="0">
                <animate attributeName="opacity" values="0;1;1" dur="0.3s" begin="1s" fill="freeze" />
                <circle cx="155" cy="120" r="5" fill="#DC2626" />
                <path d="M 155 120 L 155 133 L 152 130 Z" fill="#DC2626">
                  <animateTransform attributeName="transform" type="translate" values="0,-20; 0,0" dur="0.3s" begin="1s" fill="freeze" />
                </path>
              </g>
            </g>

            {/* Uganda pin */}
            <g>
              <circle cx="140" cy="130" r="3" fill="#DC2626" opacity="0">
                <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="1.5s" repeatCount="indefinite" />
                <animate attributeName="r" values="3;20;30" dur="2s" begin="1.5s" repeatCount="indefinite" />
              </circle>
              <g opacity="0">
                <animate attributeName="opacity" values="0;1;1" dur="0.3s" begin="1.5s" fill="freeze" />
                <circle cx="140" cy="130" r="5" fill="#DC2626" />
                <path d="M 140 130 L 140 143 L 137 140 Z" fill="#DC2626">
                  <animateTransform attributeName="transform" type="translate" values="0,-20; 0,0" dur="0.3s" begin="1.5s" fill="freeze" />
                </path>
              </g>
            </g>

            {/* Rwanda pin */}
            <g>
              <circle cx="145" cy="145" r="3" fill="#DC2626" opacity="0">
                <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="2s" repeatCount="indefinite" />
                <animate attributeName="r" values="3;20;30" dur="2s" begin="2s" repeatCount="indefinite" />
              </circle>
              <g opacity="0">
                <animate attributeName="opacity" values="0;1;1" dur="0.3s" begin="2s" fill="freeze" />
                <circle cx="145" cy="145" r="5" fill="#DC2626" />
                <path d="M 145 145 L 145 158 L 142 155 Z" fill="#DC2626">
                  <animateTransform attributeName="transform" type="translate" values="0,-20; 0,0" dur="0.3s" begin="2s" fill="freeze" />
                </path>
              </g>
            </g>

            {/* Connecting routes/paths animating in */}
            <g stroke="#F59E0B" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0">
              <animate attributeName="opacity" values="0;0.7;0.7" dur="0.5s" begin="2.5s" fill="freeze" />

              {/* Tanzania to Kenya */}
              <path d="M 150 155 Q 152 137 155 120" strokeDashoffset="100">
                <animate attributeName="stroke-dashoffset" values="100;0" dur="1s" begin="2.5s" fill="freeze" />
              </path>

              {/* Kenya to Uganda */}
              <path d="M 155 120 Q 147 125 140 130" strokeDashoffset="100">
                <animate attributeName="stroke-dashoffset" values="100;0" dur="1s" begin="3s" fill="freeze" />
              </path>

              {/* Uganda to Rwanda */}
              <path d="M 140 130 Q 142 137 145 145" strokeDashoffset="100">
                <animate attributeName="stroke-dashoffset" values="100;0" dur="1s" begin="3.5s" fill="freeze" />
              </path>

              {/* Rwanda to Tanzania */}
              <path d="M 145 145 Q 147 150 150 155" strokeDashoffset="100">
                <animate attributeName="stroke-dashoffset" values="100;0" dur="1s" begin="4s" fill="freeze" />
              </path>
            </g>

            {/* Orbiting sparkles */}
            <g>
              {[0, 1, 2, 3, 4].map((i) => (
                <circle key={i} cx="150" cy="30" r="2" fill="#FBBF24">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`${i * 72} 150 150`}
                    to={`${i * 72 + 360} 150 150`}
                    dur="6s"
                    repeatCount="indefinite"
                  />
                  <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </g>
          </svg>
        </div>

        {/* Loading text with animated dots */}
        <div className="text-center">
          <p className="text-lg sm:text-xl font-heading text-foreground font-semibold">
            {message}
            <span className="inline-flex gap-1 ml-1">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
            </span>
          </p>
        </div>
      </div>

      {/* Animated progress bar */}
      <div className="mt-8 w-64 sm:w-80 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_100%] animate-shimmer"></div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

interface LoadingCardProps {
  count?: number;
}

export const LoadingCards = ({ count = 3 }: LoadingCardProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
          <div className="bg-muted/50 rounded-2xl overflow-hidden">
            {/* Image skeleton */}
            <div className="h-56 bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer"></div>

            {/* Content skeleton */}
            <div className="p-6 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>

              <div className="pt-4 flex items-center justify-between">
                <div className="h-8 bg-muted rounded w-20"></div>
                <div className="h-10 bg-muted rounded w-28"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const LoadingDots = () => {
  return (
    <div className="flex gap-2">
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );
};
