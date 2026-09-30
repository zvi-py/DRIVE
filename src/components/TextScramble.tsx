import React, { useEffect, useState, useRef } from 'react';

interface TextScrambleProps {
  text: string;
  trigger?: boolean | number;
  className?: string;
  speed?: number;
}

const GLYPHS = 'abcdefghijklmnopqrstuvwxyz0123456789!<>-_\\/[]{}—=+*^?#';

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  trigger = true,
  className = '',
  speed = 28,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(true);

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      setIsScrambling(false);
      return;
    }

    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      iteration += 1 / 2;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, trigger, speed]);

  return (
    <span
      className={`${className} transition-all duration-300 ${
        isScrambling
          ? 'text-violet-300 drop-shadow-[0_0_12px_rgba(139,108,255,0.9)] blur-[0.4px]'
          : 'text-white drop-shadow-none'
      }`}
    >
      {displayText}
    </span>
  );
};
