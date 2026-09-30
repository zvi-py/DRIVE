import React from 'react';

interface AgentAvatarProps {
  type: 'research' | 'experiment' | 'writing';
  size?: number;
  className?: string;
  isAnimated?: boolean;
}

export const AgentAvatar: React.FC<AgentAvatarProps> = ({
  type,
  size = 48,
  className = '',
  isAnimated = true,
}) => {
  if (type === 'research') {
    // 🔵 Research Agent — Cute Blue Investigator with radar antenna & scanner eyes
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          className={`${isAnimated ? 'animate-bounce-subtle' : ''}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle outer glow */}
          <circle cx="32" cy="32" r="28" fill="url(#blue-glow)" opacity="0.3" />

          {/* Antenna with pulse ping */}
          <line x1="32" y1="14" x2="32" y2="7" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="6" r="3.5" fill="#93c5fd" />
          <circle cx="32" cy="6" r="6" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2 2" className="animate-ping" opacity="0.6" />

          {/* Cute round chassis */}
          <rect x="12" y="14" width="40" height="38" rx="19" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2.5" />
          {/* High-tech visor area */}
          <rect x="17" y="22" width="30" height="18" rx="9" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.5" />

          {/* Expressive blue curious eyes */}
          <circle cx="26" cy="31" r="4.5" fill="#38bdf8" />
          <circle cx="27.5" cy="29.5" r="1.5" fill="#ffffff" />
          <circle cx="38" cy="31" r="4.5" fill="#38bdf8" />
          <circle cx="39.5" cy="29.5" r="1.5" fill="#ffffff" />

          {/* Cute blush marks */}
          <ellipse cx="20" cy="35" rx="2" ry="1.2" fill="#60a5fa" opacity="0.5" />
          <ellipse cx="44" cy="35" rx="2" ry="1.2" fill="#60a5fa" opacity="0.5" />

          {/* Magnifier / Search badge on chest */}
          <circle cx="32" cy="46" r="3" fill="#1d4ed8" stroke="#93c5fd" strokeWidth="1.2" />
          <line x1="34" y1="48" x2="37" y2="51" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />

          {/* Ear pods */}
          <rect x="9" y="27" width="3" height="8" rx="1.5" fill="#60a5fa" />
          <rect x="52" y="27" width="3" height="8" rx="1.5" fill="#60a5fa" />

          <defs>
            <radialGradient id="blue-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (type === 'experiment') {
    // 🟣 Experiment Agent — Cute Purple Scientist/Tester with sensor visor & beaker probe
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          className={`${isAnimated ? 'animate-pulse-subtle' : ''}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle outer glow */}
          <circle cx="32" cy="32" r="28" fill="url(#purple-glow)" opacity="0.3" />

          {/* Test prongs / sensor horns */}
          <path d="M22 14 L20 8" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="19" cy="7" r="3" fill="#e9d5ff" />
          <path d="M42 14 L44 8" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="45" cy="7" r="3" fill="#e9d5ff" />

          {/* Chassis */}
          <rect x="13" y="14" width="38" height="38" rx="16" fill="#3b0764" stroke="#a855f7" strokeWidth="2.5" />

          {/* Dark visor with data grid */}
          <rect x="18" y="22" width="28" height="17" rx="8" fill="#18052e" stroke="#c084fc" strokeWidth="1.5" />

          {/* Analytical sharp & focused eyes */}
          <ellipse cx="26" cy="30" rx="4" ry="4.5" fill="#d946ef" />
          <circle cx="27.5" cy="28.5" r="1.5" fill="#ffffff" />
          <ellipse cx="38" cy="30" rx="4" ry="4.5" fill="#d946ef" />
          <circle cx="39.5" cy="28.5" r="1.5" fill="#ffffff" />

          {/* Cheek diagnostics */}
          <rect x="20" y="35" width="3" height="1.5" rx="0.5" fill="#e879f9" opacity="0.8" />
          <rect x="41" y="35" width="3" height="1.5" rx="0.5" fill="#e879f9" opacity="0.8" />

          {/* Floating flask/challenge core */}
          <path d="M29 44 L35 44 L37 49 L27 49 Z" fill="#9333ea" stroke="#e9d5ff" strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx="32" cy="46" r="1" fill="#f0abfc" />

          {/* Ear sensor discs */}
          <circle cx="11" cy="31" r="3" fill="#a855f7" stroke="#e9d5ff" strokeWidth="1" />
          <circle cx="53" cy="31" r="3" fill="#a855f7" stroke="#e9d5ff" strokeWidth="1" />

          <defs>
            <radialGradient id="purple-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // 🟢 Writing Agent — Cute Mint-Green Scribe with feather quill & holographic notepad
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className={`${isAnimated ? 'animate-bounce-subtle' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle outer glow */}
        <circle cx="32" cy="32" r="28" fill="url(#green-glow)" opacity="0.3" />

        {/* Small sprout / stylus antenna */}
        <path d="M32 14 C32 8, 38 6, 41 8 C38 11, 35 11, 32 14 Z" fill="#4ade80" />
        <line x1="32" y1="14" x2="32" y2="9" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />

        {/* Chassis */}
        <rect x="12" y="14" width="40" height="38" rx="18" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />

        {/* Visor */}
        <rect x="17" y="22" width="30" height="17" rx="8" fill="#022c22" stroke="#34d399" strokeWidth="1.5" />

        {/* Happy smiling friendly eyes */}
        <path d="M22 31 Q26 26 30 31" stroke="#34d399" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M34 31 Q38 26 42 31" stroke="#34d399" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Cute blush cheeks */}
        <circle cx="21" cy="34" r="2" fill="#86efac" opacity="0.6" />
        <circle cx="43" cy="34" r="2" fill="#86efac" opacity="0.6" />

        {/* Document bookmark symbol on chest */}
        <rect x="28" y="44" width="8" height="6" rx="1.5" fill="#047857" stroke="#6ee7b7" strokeWidth="1.2" />
        <line x1="30" y1="46" x2="34" y2="46" stroke="#a7f3d0" strokeWidth="1" strokeLinecap="round" />
        <line x1="30" y1="48" x2="33" y2="48" stroke="#a7f3d0" strokeWidth="1" strokeLinecap="round" />

        {/* Ear headphone pads */}
        <rect x="9" y="27" width="3" height="9" rx="1.5" fill="#34d399" />
        <rect x="52" y="27" width="3" height="9" rx="1.5" fill="#34d399" />

        <defs>
          <radialGradient id="green-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};
