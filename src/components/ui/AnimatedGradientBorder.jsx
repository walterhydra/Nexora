import React from 'react';

export default function AnimatedGradientBorder({ children, className = "", rounded = "rounded-2xl" }) {
  return (
    <div className={`relative inline-block ${rounded} p-[2px] overflow-hidden group ${className}`}>
      <div 
        className="absolute inset-0 z-0 animate-spin-slow bg-conic-gradient"
        style={{
          background: 'conic-gradient(from var(--angle), var(--color-accent-primary), var(--color-accent-secondary), var(--color-accent-violet), var(--color-accent-primary))'
        }}
      />
      <div className={`relative z-10 w-full h-full bg-[var(--bg-secondary)] ${rounded} h-full`}>
        {children}
      </div>
    </div>
  );
}
