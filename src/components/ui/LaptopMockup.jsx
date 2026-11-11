import React, { useState, useRef } from 'react';
import { m, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

export default function LaptopMockup({ children, delay = 0, scrollProgress, onOpenComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress: internalScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center 50%"]
  });

  const activeProgress = scrollProgress || internalScrollProgress;

  // Responsive spring interpolation: snappy tracking with zero scroll heaviness
  const smoothProgress = useSpring(activeProgress, {
    stiffness: 380,
    damping: 30,
    mass: 0.01,
    restDelta: 0.0005
  });

  const rotateX = useTransform(smoothProgress, [0, 1], [-95, 0]);
  const baseOpacity = useTransform(smoothProgress, [0, 1], [0, 1]);
  const baseY = useTransform(smoothProgress, [0, 1], [20, 0]);

  // Wide hysteresis buffer (0.85 open, 0.45 close) prevents flickering on scroll reversal
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest >= 0.85 && !isOpen) {
      setIsOpen(true);
      onOpenComplete?.(true);
    } else if (latest < 0.45 && isOpen) {
      setIsOpen(false);
      onOpenComplete?.(false);
    }
  });

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-[800px] mx-auto"
      style={{ perspective: '1600px' }}
    >
      {/* Laptop Lid - Hardware GPU accelerated 3D rotation */}
      <m.div
        className="relative z-20 w-full rounded-t-xl overflow-hidden bg-white dark:bg-black border-4 border-gray-800 shadow-2xl origin-bottom"
        style={{ 
          rotateX, 
          transformStyle: 'preserve-3d',
          transformOrigin: 'bottom center',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-gray-800 opacity-50 z-0 pointer-events-none" />
        
        {/* Fake OS Chrome */}
        <div className="relative z-10 w-full h-6 bg-gray-900 flex items-center px-4 border-b border-gray-800">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
        </div>

        {/* Screen Content - turns on smoothly when open, softly dims on close */}
        <div className="relative z-10 w-full aspect-[16/10] bg-white dark:bg-black overflow-hidden pointer-events-auto">
          <m.div 
            className="absolute inset-0 w-full h-full pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ willChange: 'opacity' }}
          >
            {typeof children === 'function' ? children(isOpen) : children}
          </m.div>
        </div>
      </m.div>

      {/* Laptop Base (keyboard deck) */}
      <m.div
        className="relative z-10 w-[110%] -ml-[5%] h-4 bg-gray-700 rounded-b-2xl shadow-xl border-t border-gray-600"
        style={{ opacity: baseOpacity, y: baseY, willChange: 'transform, opacity' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-1 bg-gray-800 rounded-b-md" />
      </m.div>
    </div>
  );
}
