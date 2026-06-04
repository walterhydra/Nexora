import React, { useRef } from 'react';
import { useMagneticEffect } from '../../hooks/useMagneticEffect';
import { cn } from '../../utils/cn';

export default function MagneticButton({ children, className, onClick, ...props }) {
  const sensorRef = useRef(null);
  const targetRef = useRef(null);
  useMagneticEffect(sensorRef, targetRef);

  return (
    <div ref={sensorRef} className="inline-block relative">
      <button
        ref={targetRef}
        onClick={onClick}
        className={cn(
          "relative px-6 py-3 rounded-full font-bold overflow-hidden transition-colors duration-300 flex items-center justify-center",
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    </div>
  );
}
