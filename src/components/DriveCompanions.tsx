import React from 'react';

export type DriveCompanionId = 'purple-cone' | 'coral-bean' | 'blue-cube' | 'green-tree';

interface DriveCompanionProps {
  id: DriveCompanionId;
  size?: number;
  isAnimated?: boolean;
  withDesk?: boolean;
  className?: string;
}

export const DriveCompanion: React.FC<DriveCompanionProps> = ({
  id,
  size = 64,
  isAnimated = true,
  withDesk = false,
  className = '',
}) => {
  if (id === 'purple-cone') {
    // 🟣 Amethyst / Iridescent Lilac Luxury Teardrop Companion
    return (
      <div className={`relative flex flex-col items-center justify-center shrink-0 ${className}`} style={{ width: size }}>
        <svg
          viewBox="0 0 80 90"
          width={size}
          height={size * 1.125}
          className={`${isAnimated ? 'animate-bounce-subtle' : ''}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cone-lux" x1="40" y1="8" x2="40" y2="82" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a78bfa" />
              <stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="glass-desk" x1="10" y1="74" x2="70" y2="79" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255,255,255,0.25)" />
              <stop offset="1" stopColor="rgba(255,255,255,0.08)" />
            </linearGradient>
          </defs>

          {/* Teardrop / rounded cone head & body */}
          <path
            d="M40 8 C48 18, 66 42, 66 60 C66 74, 54 82, 40 82 C26 82, 14 74, 14 60 C14 42, 32 18, 40 8 Z"
            fill="url(#cone-lux)"
          />

          {/* Subtle Satin Sheen */}
          <path
            d="M34 16 C38 24, 44 38, 44 48 C44 58, 38 64, 30 66"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Luxury glossy eyes with double catchlight */}
          <ellipse cx="31" cy="56" rx="5" ry="6" fill="#0f0b1e" />
          <circle cx="32.5" cy="54" r="2" fill="#ffffff" />
          <circle cx="29.5" cy="57.5" r="1" fill="#ffffff" opacity="0.8" />

          <ellipse cx="49" cy="56" rx="5" ry="6" fill="#0f0b1e" />
          <circle cx="50.5" cy="54" r="2" fill="#ffffff" />
          <circle cx="47.5" cy="57.5" r="1" fill="#ffffff" opacity="0.8" />

          {/* Refined subtle mouth */}
          <path d="M38 66 Q40 68 42 66" stroke="#4c1d95" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Cute arms */}
          <path d="M22 62 C16 66, 18 73, 25 72" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M58 62 C64 66, 62 73, 55 72" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Legs */}
          <path d="M33 80 L33 88" stroke="#6d28d9" strokeWidth="4" strokeLinecap="round" />
          <path d="M47 80 L47 88" stroke="#6d28d9" strokeWidth="4" strokeLinecap="round" />

          {/* Minimalist Frosted Glass Keyboard / Desk */}
          {withDesk && (
            <g>
              <rect x="10" y="74" width="60" height="5" rx="2.5" fill="url(#glass-desk)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
              <rect x="20" y="72" width="40" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  if (id === 'coral-bean') {
    // 🔴 Champagne Rose / Soft Terracotta Silk Bean Companion
    return (
      <div className={`relative flex flex-col items-center justify-center shrink-0 ${className}`} style={{ width: size }}>
        <svg
          viewBox="0 0 80 90"
          width={size}
          height={size * 1.125}
          className={`${isAnimated ? 'animate-bounce-subtle' : ''}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bean-lux" x1="20" y1="14" x2="60" y2="78" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fb7185" />
              <stop offset="1" stopColor="#e11d48" />
            </linearGradient>
            <linearGradient id="bean-desk" x1="10" y1="66" x2="70" y2="71" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255,255,255,0.25)" />
              <stop offset="1" stopColor="rgba(255,255,255,0.08)" />
            </linearGradient>
          </defs>

          {/* Rounded bean head & torso */}
          <rect x="20" y="14" width="40" height="48" rx="18" fill="url(#bean-lux)" />
          {/* Lower body */}
          <path d="M26 60 Q40 64 54 60 L51 78 Q40 82 29 78 Z" fill="#be123c" />

          {/* Satin highlight curve */}
          <path
            d="M26 22 Q34 18 42 22"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Big glossy anime eyes */}
          <ellipse cx="31" cy="42" rx="4.8" ry="6" fill="#18040a" />
          <circle cx="32.5" cy="40" r="2" fill="#ffffff" />
          <circle cx="29.5" cy="43.5" r="1" fill="#ffffff" opacity="0.8" />

          <ellipse cx="49" cy="42" rx="4.8" ry="6" fill="#18040a" />
          <circle cx="50.5" cy="40" r="2" fill="#ffffff" />
          <circle cx="47.5" cy="43.5" r="1" fill="#ffffff" opacity="0.8" />

          {/* Soft blush */}
          <ellipse cx="25" cy="48" rx="2.5" ry="1.5" fill="#881337" opacity="0.3" />
          <ellipse cx="55" cy="48" rx="2.5" ry="1.5" fill="#881337" opacity="0.3" />

          {/* Cheerful small smile */}
          <path d="M38 50 Q40 52 42 50" stroke="#881337" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Arms typing */}
          <path d="M20 50 C15 54, 18 64, 28 65" stroke="#be123c" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M60 50 C65 54, 62 64, 52 65" stroke="#be123c" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Legs */}
          <path d="M33 78 L33 88" stroke="#9f1239" strokeWidth="4" strokeLinecap="round" />
          <path d="M47 78 L47 88" stroke="#9f1239" strokeWidth="4" strokeLinecap="round" />

          {/* Desk / Keyboard */}
          {withDesk && (
            <g>
              <rect x="10" y="66" width="60" height="5" rx="2.5" fill="url(#bean-desk)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
              <rect x="20" y="64" width="40" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  if (id === 'blue-cube') {
    // 🔵 Titanium Glacier Cube Companion
    return (
      <div className={`relative flex flex-col items-center justify-center shrink-0 ${className}`} style={{ width: size }}>
        <svg
          viewBox="0 0 80 90"
          width={size}
          height={size * 1.125}
          className={`${isAnimated ? 'animate-pulse-subtle' : ''}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cube-lux" x1="16" y1="16" x2="64" y2="76" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="cube-desk" x1="10" y1="66" x2="70" y2="71" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255,255,255,0.25)" />
              <stop offset="1" stopColor="rgba(255,255,255,0.08)" />
            </linearGradient>
          </defs>

          {/* Rounded cube head */}
          <rect x="16" y="16" width="48" height="42" rx="14" fill="url(#cube-lux)" />

          {/* Body */}
          <path d="M24 56 Q40 60 56 56 L52 76 Q40 80 28 76 Z" fill="#0369a1" />

          {/* Satin highlight */}
          <path
            d="M22 22 L46 22"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Focused eyes */}
          <ellipse cx="30" cy="38" rx="4.5" ry="4" fill="#082f49" />
          <circle cx="31.5" cy="36.5" r="1.5" fill="#ffffff" />
          <ellipse cx="50" cy="38" rx="4.5" ry="4" fill="#082f49" />
          <circle cx="51.5" cy="36.5" r="1.5" fill="#ffffff" />

          {/* Focused mouth */}
          <path d="M37 47 L43 47" stroke="#082f49" strokeWidth="2.5" strokeLinecap="round" />

          {/* Arms */}
          <path d="M18 50 C12 55, 14 65, 26 65" stroke="#0369a1" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M62 50 C68 55, 66 65, 54 65" stroke="#0369a1" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Legs */}
          <path d="M32 76 L32 86" stroke="#075985" strokeWidth="4" strokeLinecap="round" />
          <path d="M48 76 L48 86" stroke="#075985" strokeWidth="4" strokeLinecap="round" />

          {/* Desk / Keyboard */}
          {withDesk && (
            <g>
              <rect x="10" y="66" width="60" height="5" rx="2.5" fill="url(#cube-desk)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
              <rect x="20" y="64" width="40" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // 🟢 Celadon Jade / Emerald Sage Tree Companion
  return (
    <div className={`relative flex flex-col items-center justify-center shrink-0 ${className}`} style={{ width: size }}>
      <svg
        viewBox="0 0 80 90"
        width={size}
        height={size * 1.125}
        className={`${isAnimated ? 'animate-bounce-subtle' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tree-lux" x1="40" y1="10" x2="40" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34d399" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="tree-desk" x1="10" y1="73" x2="70" y2="78" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(255,255,255,0.25)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.08)" />
          </linearGradient>
        </defs>

        {/* Soft rounded triangle */}
        <path
          d="M40 10 C46 22, 64 45, 64 62 C64 74, 52 80, 40 80 C28 80, 16 74, 16 62 C16 45, 34 22, 40 10 Z"
          fill="url(#tree-lux)"
        />

        {/* Satin highlight */}
        <path
          d="M36 20 C40 28, 45 42, 45 52"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Big smiling eyes */}
        <ellipse cx="32" cy="54" rx="4.5" ry="5" fill="#022c22" />
        <circle cx="33.5" cy="52" r="1.8" fill="#ffffff" />
        <ellipse cx="48" cy="54" rx="4.5" ry="5" fill="#022c22" />
        <circle cx="49.5" cy="52" r="1.8" fill="#ffffff" />

        {/* Cute smile */}
        <path d="M38 63 Q40 66 42 63" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Arms */}
        <path d="M22 62 C16 66, 18 74, 26 73" stroke="#047857" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M58 62 C64 66, 62 74, 54 73" stroke="#047857" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Legs */}
        <path d="M33 78 L33 86" stroke="#065f46" strokeWidth="4" strokeLinecap="round" />
        <path d="M47 78 L47 86" stroke="#065f46" strokeWidth="4" strokeLinecap="round" />

        {/* Desk / Keyboard */}
        {withDesk && (
          <g>
            <rect x="10" y="73" width="60" height="5" rx="2.5" fill="url(#tree-desk)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
            <rect x="20" y="71" width="40" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
          </g>
        )}
      </svg>
    </div>
  );
};
