import React, { useState, useEffect } from 'react';

export default function GlitchText({ text, className = "", as: Component = "span" }) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
  }, []);

  if (isReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component 
      className={`relative inline-block group ${className}`}
      data-text={text}
    >
      <span className="relative z-10">{text}</span>
      <span 
        className="absolute inset-0 z-0 select-none before:content-[attr(data-text)] before:absolute before:left-[-2px] before:text-[var(--color-accent-secondary)] before:bg-transparent before:overflow-hidden before:clip-path-glitch after:content-[attr(data-text)] after:absolute after:left-[2px] after:text-[var(--color-accent-primary)] after:bg-transparent after:overflow-hidden after:clip-path-glitch group-hover:before:animate-glitch-1 group-hover:after:animate-glitch-2"
        aria-hidden="true"
        data-text={text}
      >
        {text}
      </span>
    </Component>
  );
}
