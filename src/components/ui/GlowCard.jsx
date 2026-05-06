import React, { useRef } from 'react';
import { cn } from '../../utils/cn';

export default function GlowCard({ children, className }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative overflow-hidden rounded-2xl p-[1px] group",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/30 to-accent-purple/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
           style={{
             background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(155, 89, 255, 0.15), transparent 40%)'
           }}
      />
      <div className="relative h-full w-full rounded-[15px] bg-primary-light dark:bg-primary-dark/90 backdrop-blur-sm z-10 border border-black/5 dark:border-white/10 p-6">
        {children}
      </div>
    </div>
  );
}
