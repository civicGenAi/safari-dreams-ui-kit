export const AnimatedBackground = () => {
  return (
    <div className="animated-bg-pattern">
      {/* Safari Animal Silhouettes */}
      <svg
        className="absolute top-20 left-10 w-32 h-32"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        {/* Elephant */}
        <path d="M85,70 C85,55 75,45 65,45 L65,35 C65,30 60,30 60,35 L60,45 C50,45 45,55 45,65 L45,75 C45,80 50,85 55,85 L75,85 C80,85 85,80 85,75 L85,70 M55,55 A3,3 0 1,1 55,61 A3,3 0 1,1 55,55" />
      </svg>
      
      <svg
        className="absolute top-40 right-20 w-24 h-24"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        {/* Giraffe */}
        <path d="M60,80 L60,50 L55,20 L50,10 L45,20 L40,50 L40,80 M45,15 L55,15 M35,80 L45,80 M55,80 L65,80" strokeWidth="3" stroke="currentColor" fill="none" />
      </svg>
      
      <svg
        className="absolute bottom-32 left-1/4 w-28 h-28"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        {/* Lion */}
        <circle cx="50" cy="45" r="20" />
        <ellipse cx="50" cy="45" rx="28" ry="25" fill="none" stroke="currentColor" strokeWidth="8" />
        <ellipse cx="50" cy="70" rx="15" ry="12" />
      </svg>
      
      <svg
        className="absolute top-1/2 right-10 w-20 h-20"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        {/* Bird */}
        <path d="M20,50 Q40,30 60,50 Q80,30 90,40 L70,50 L90,60 Q80,70 60,50 Q40,70 20,50" />
      </svg>

      {/* Acacia Tree */}
      <svg
        className="absolute bottom-20 right-1/3 w-36 h-36"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <rect x="47" y="60" width="6" height="40" />
        <ellipse cx="50" cy="40" rx="40" ry="20" />
        <ellipse cx="30" cy="35" rx="20" ry="15" />
        <ellipse cx="70" cy="35" rx="20" ry="15" />
      </svg>
    </div>
  );
};
