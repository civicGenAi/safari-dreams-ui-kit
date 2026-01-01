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

export const LoadingScreen = ({ message = 'Loading...', fullScreen = true }: LoadingScreenProps) => {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center',
      fullScreen ? 'min-h-screen' : 'py-12'
    )}>
      <div className="relative">
        {/* Animated compass and globe */}
        <div className="mb-8 relative">
          <svg
            className="w-32 h-32"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Rotating globe/world */}
            <circle cx="60" cy="60" r="45" stroke="#FF6B00" strokeWidth="2" fill="none" opacity="0.3">
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Latitude lines */}
            <ellipse cx="60" cy="60" rx="45" ry="15" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.6">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="60" cy="60" rx="45" ry="30" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.5">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.5s" repeatCount="indefinite" />
            </ellipse>

            {/* Longitude line - rotating */}
            <ellipse cx="60" cy="60" rx="15" ry="45" stroke="#EA580C" strokeWidth="1.5" fill="none" opacity="0.7">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 60 60"
                to="360 60 60"
                dur="4s"
                repeatCount="indefinite"
              />
            </ellipse>

            {/* Second longitude line */}
            <ellipse cx="60" cy="60" rx="30" ry="45" stroke="#EA580C" strokeWidth="1.5" fill="none" opacity="0.6">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 60 60"
                to="360 60 60"
                dur="6s"
                repeatCount="indefinite"
              />
            </ellipse>

            {/* Compass outer ring */}
            <circle cx="60" cy="60" r="52" stroke="#D97706" strokeWidth="2" fill="none" opacity="0.8" strokeDasharray="3,3">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 60 60"
                to="360 60 60"
                dur="20s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Compass cardinal points */}
            <g opacity="0.9">
              {/* North */}
              <path d="M 60 8 L 63 18 L 60 16 L 57 18 Z" fill="#DC2626">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
              </path>
              {/* South */}
              <path d="M 60 112 L 63 102 L 60 104 L 57 102 Z" fill="#F59E0B" opacity="0.8" />
              {/* East */}
              <circle cx="112" cy="60" r="3" fill="#EA580C" opacity="0.8" />
              {/* West */}
              <circle cx="8" cy="60" r="3" fill="#EA580C" opacity="0.8" />
            </g>

            {/* Animated compass needle */}
            <g>
              <path d="M 60 60 L 58 35 L 60 30 L 62 35 Z" fill="#DC2626">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 60 60; 20 60 60; -20 60 60; 0 60 60"
                  dur="3s"
                  repeatCount="indefinite"
                />
                <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
              </path>
              <path d="M 60 60 L 58 85 L 60 90 L 62 85 Z" fill="#6B7280" opacity="0.7">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 60 60; 20 60 60; -20 60 60; 0 60 60"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
              <circle cx="60" cy="60" r="5" fill="#FF6B00">
                <animate attributeName="r" values="5;6;5" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Orbiting location pins */}
            <g>
              <circle cx="60" cy="15" r="4" fill="#FBBF24">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 60 60"
                  to="360 60 60"
                  dur="5s"
                  repeatCount="indefinite"
                />
                <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="60" cy="105" r="4" fill="#FCD34D">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="180 60 60"
                  to="540 60 60"
                  dur="5s"
                  repeatCount="indefinite"
                />
                <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" begin="0.5s" />
              </circle>
            </g>

            {/* Pulsing travel waves */}
            <circle cx="60" cy="60" r="45" stroke="#FCD34D" strokeWidth="2" fill="none" opacity="0">
              <animate attributeName="r" values="45;55;65" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.3;0" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="60" r="45" stroke="#FBBF24" strokeWidth="2" fill="none" opacity="0">
              <animate attributeName="r" values="45;55;65" dur="3s" repeatCount="indefinite" begin="1s" />
              <animate attributeName="opacity" values="0.6;0.3;0" dur="3s" repeatCount="indefinite" begin="1s" />
            </circle>
          </svg>
        </div>

        {/* Loading text with animated dots */}
        <div className="text-center">
          <p className="text-lg font-heading text-muted-foreground">
            {message}
            <span className="inline-flex gap-1 ml-1">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
            </span>
          </p>
        </div>
      </div>

      {/* Animated progress hint */}
      <div className="mt-8 w-48 h-1 bg-muted rounded-full overflow-hidden">
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
