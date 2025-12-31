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
        {/* Animated safari jeep icon */}
        <div className="mb-8 relative">
          <svg
            className="w-24 h-24 text-primary"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Safari vehicle body */}
            <rect x="20" y="50" width="60" height="25" rx="3" fill="currentColor" className="animate-pulse" />

            {/* Windows */}
            <rect x="25" y="40" width="15" height="12" rx="1" fill="currentColor" opacity="0.6" />
            <rect x="45" y="40" width="15" height="12" rx="1" fill="currentColor" opacity="0.6" />
            <rect x="65" y="40" width="10" height="12" rx="1" fill="currentColor" opacity="0.6" />

            {/* Wheels */}
            <circle cx="30" cy="75" r="8" fill="currentColor">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 30 75"
                to="360 30 75"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="70" cy="75" r="8" fill="currentColor">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 70 75"
                to="360 70 75"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Dust clouds */}
            <circle cx="15" cy="78" r="3" fill="currentColor" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0;0.3" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="85" cy="78" r="3" fill="currentColor" opacity="0.3">
              <animate attributeName="opacity" values="0.3;0;0.3" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
              <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
            </circle>
          </svg>

          {/* Animated path/road */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-2 h-1 bg-primary/40 rounded animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-1 bg-primary/40 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-1 bg-primary/40 rounded animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
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
        <div className="h-full bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-shimmer"></div>
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
