import React, { useRef, useState, useEffect } from 'react';
import { m } from 'framer-motion';

/**
 * LayeredPaperWaves:
 * Ultra-high-performance 3D layered paper-cut waves.
 * Performance Optimizations:
 * - Each layer is an independent hardware-accelerated <div> with GPU layer promotion.
 * - Zero CPU SVG software rasterization during animation.
 * - IntersectionObserver pauses all Framer Motion loops when offscreen.
 * - Radial-gradient lighting with zero Gaussian blur kernel overhead.
 */
export default function LayeredPaperWaves({
  className = '',
  mode = 'svg', // 'svg' | 'image'
  glowColor = 'rgba(79, 142, 247, 0.12)',
  opacity = 1,
  flip = false,
  animated = true,
}) {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shouldAnimate = animated && isInView;

  if (mode === 'image') {
    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#0e121d] ${className}`}
        style={{ opacity }}
      >
        <m.img
          src="/images/layered-waves-bg.png"
          alt=""
          className={`w-full h-full object-cover object-left opacity-90 ${flip ? 'scale-x-[-1]' : ''}`}
          animate={
            shouldAnimate
              ? {
                  scale: [1, 1.03, 1],
                  x: [0, -8, 0],
                }
              : undefined
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0d111b]/40 to-[#0b0e17]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,9,15,0.7)_100%)]" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#0e121c] ${className}`}
      style={{ opacity, willChange: 'transform' }}
    >
      {/* Ambient background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111522] via-[#141a29] to-[#0a0d15]" />

      {/* Hardware-accelerated radial ambient glow (no blur filter penalty) */}
      <m.div
        className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
        animate={
          shouldAnimate
            ? {
                scale: [1, 1.15, 1],
                opacity: [0.65, 1, 0.65],
              }
            : undefined
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Shared Gradient Definitions */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="grad-wave-4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e2538" />
            <stop offset="100%" stopColor="#141926" />
          </linearGradient>

          <linearGradient id="grad-wave-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#28334b" />
            <stop offset="50%" stopColor="#212a3e" />
            <stop offset="100%" stopColor="#192031" />
          </linearGradient>

          <linearGradient id="grad-wave-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d4966" />
            <stop offset="50%" stopColor="#323c54" />
            <stop offset="100%" stopColor="#262f44" />
          </linearGradient>

          <linearGradient id="grad-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7a87a3" />
            <stop offset="40%" stopColor="#677490" />
            <stop offset="100%" stopColor="#55617a" />
          </linearGradient>
        </defs>
      </svg>

      {/* LAYER 4 - Deepest Wave (GPU Composited) */}
      <m.div
        className="absolute inset-0 pointer-events-none"
        style={{
          filter: 'drop-shadow(14px 6px 18px rgba(3,5,8,0.75))',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        animate={
          shouldAnimate
            ? {
                x: [0, 18, -8, 0],
                y: [0, -12, 8, 0],
                scaleX: [1, 1.025, 0.99, 1],
              }
            : undefined
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          className={`w-full h-full ${flip ? 'scale-x-[-1]' : ''}`}
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -150,-50 
               L 530,-50 
               C 490,95 420,135 435,215 
               C 455,305 565,345 545,435 
               C 520,535 395,565 405,675 
               C 415,775 510,825 480,950 
               L -150,950 Z"
            fill="url(#grad-wave-4)"
          />
        </svg>
      </m.div>

      {/* LAYER 3 - Mid-Deep Wave (GPU Composited) */}
      <m.div
        className="absolute inset-0 pointer-events-none"
        style={{
          filter: 'drop-shadow(12px 5px 16px rgba(4,6,10,0.7))',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        animate={
          shouldAnimate
            ? {
                x: [0, -14, 10, 0],
                y: [0, 14, -10, 0],
                scaleX: [1, 0.985, 1.02, 1],
              }
            : undefined
        }
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          className={`w-full h-full ${flip ? 'scale-x-[-1]' : ''}`}
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -150,-50 
               L 430,-50 
               C 385,85 340,125 350,200 
               C 365,285 475,325 455,410 
               C 430,510 320,540 330,645 
               C 340,740 435,795 400,950 
               L -150,950 Z"
            fill="url(#grad-wave-3)"
          />
        </svg>
      </m.div>

      {/* LAYER 2 - Mid Wave (GPU Composited) */}
      <m.div
        className="absolute inset-0 pointer-events-none"
        style={{
          filter: 'drop-shadow(10px 4px 14px rgba(5,7,13,0.75))',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        animate={
          shouldAnimate
            ? {
                x: [0, 12, -12, 0],
                y: [0, -8, 12, 0],
                scaleX: [1, 1.018, 0.99, 1],
              }
            : undefined
        }
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          className={`w-full h-full ${flip ? 'scale-x-[-1]' : ''}`}
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -150,-50 
               L 330,-50 
               C 285,80 250,115 260,185 
               C 275,265 380,305 360,390 
               C 340,480 240,515 250,615 
               C 260,705 350,765 315,950 
               L -150,950 Z"
            fill="url(#grad-wave-2)"
          />
        </svg>
      </m.div>

      {/* LAYER 1 - Front Paper Layer (GPU Composited) */}
      <m.div
        className="absolute inset-0 pointer-events-none"
        style={{
          filter: 'drop-shadow(8px 4px 12px rgba(4,6,10,0.8))',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        animate={
          shouldAnimate
            ? {
                x: [0, -8, 6, 0],
                y: [0, 8, -6, 0],
                scaleX: [1, 0.99, 1.015, 1],
              }
            : undefined
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          className={`w-full h-full ${flip ? 'scale-x-[-1]' : ''}`}
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -150,-50 
               L 230,-50 
               C 190,75 160,110 170,175 
               C 185,250 285,285 265,365 
               C 245,450 155,485 165,580 
               C 175,670 255,730 225,950 
               L -150,950 Z"
            fill="url(#grad-wave-1)"
          />
        </svg>
      </m.div>

      {/* Subtle fine grid texture overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_65%_50%,#000_20%,transparent_100%)] opacity-70" />
    </div>
  );
}
