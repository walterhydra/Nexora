import React, { useRef } from 'react';
import { useMagneticEffect } from '../../hooks/useMagneticEffect';
import { cn } from '../../utils/cn';

export default function MagneticButton({ children, className, onClick, ...props }) {
  const ref = useRef(null);
  useMagneticEffect(ref);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={cn(
        "relative min-h-[44px] px-6 py-3 rounded-full font-bold overflow-hidden transition-all duration-300 flex items-center justify-center",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
