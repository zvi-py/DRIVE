import React from 'react';

interface PegasusLogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
}

export const PegasusMark: React.FC<{ size?: number; className?: string }> = ({ size = 26, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Pegasus logo"
    >
      <defs>
        <linearGradient id="pegasus-wing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#D0BFFF" />
          <stop offset="80%" stopColor="#8B6CFF" />
          <stop offset="100%" stopColor="#4A26C4" />
        </linearGradient>
        <filter id="pegasus-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Primary upper wing blade */}
      <path
        d="M 5 21 C 10 17, 18 10, 27 6 C 21 11, 15 16, 12 24 Z"
        fill="url(#pegasus-wing-grad)"
        filter="url(#pegasus-glow)"
      />

      {/* Secondary lower wing blade */}
      <path
        d="M 5 25 C 9 22, 15 17, 21 13 C 17 18, 12 23, 9 27 Z"
        fill="#8B6CFF"
        opacity="0.85"
      />

      {/* Third aerodynamic feather accent */}
      <path
        d="M 6 28 C 8 26, 11 23, 15 20 C 12 24, 9 27, 7 29 Z"
        fill="#E4D9FF"
        opacity="0.6"
      />
    </svg>
  );
};

export const PegasusLogo: React.FC<PegasusLogoProps> = ({
  size = 26,
  className = '',
  showWordmark = true,
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <PegasusMark size={size} />
      {showWordmark && (
        <span className="font-heading font-medium tracking-tight text-white text-base md:text-lg">
          Pegasus
        </span>
      )}
    </div>
  );
};
