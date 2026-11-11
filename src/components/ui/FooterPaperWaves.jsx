import React, { useRef, useState, useEffect } from 'react';
import { m } from 'framer-motion';

/**
 * FooterPaperWaves:
 * Animated 3D layered paper-cut wave background for the Footer.
 * Mirrors the organic multi-layer wave architecture of the Hero section:
 * - Hardware-accelerated GPU layer promotion (translateZ).
 * - Multi-stage floating wave animation with varying oscillation cycles.
 * - Multi-depth drop-shadows creating physical paper-cut topography.
 * - Cyan/Azure ambient glow pulse matching the vibrant upper paper layer.
 * - IntersectionObserver to pause rendering when the footer is offscreen.
 */
export default function FooterPaperWaves({
  className = '',
  glowColor = 'rgba(56, 189, 248, 0.18)',
  animated = true,
}) {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

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

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#030712] ${className}`}
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    >
      {/* 1. Deep Oceanic Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#051126] to-[#02040a]" />

      {/* 2. Base Artwork Layer with Gentle Ken-Burns Ambient Float */}
      <m.div
        className="absolute inset-0 pointer-events-none opacity-75 mix-blend-screen transform-gpu"
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        animate={
          shouldAnimate
            ? {
              scale: [1, 1.05, 1],
              x: [0, -12, 0],
              y: [0, 8, 0],
            }
            : undefined
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <img
          src="/images/footer-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </m.div>

      {/* 3. Top-Right Cyan/Azure Ambient Radial Glow Pulse */}
      <m.div
        className="absolute -top-24 right-[-5%] w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(14, 165, 233, 0.08) 40%, transparent 70%)`,
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
        animate={
          shouldAnimate
            ? {
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }
            : undefined
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Shared Gradient Definitions for SVG Layers */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="footer-grad-deep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#082f49" />
            <stop offset="60%" stopColor="#0c4a6e" />
            <stop offset="100%" stopColor="#031526" />
          </linearGradient>

          <linearGradient id="footer-grad-mid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#075985" />
            <stop offset="50%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>

          <linearGradient id="footer-grad-upper" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>

          <linearGradient id="footer-grad-bright" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="40%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>
      </svg>

      {/* 4. LAYER 4 - Deep Background Wave (GPU Accelerated) */}
      <m.div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          filter: 'drop-shadow(-10px 8px 12px rgba(1, 4, 10, 0.9))',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        animate={
          shouldAnimate
            ? {
              x: [0, 16, -10, 0],
              y: [0, -10, 8, 0],
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
          className="w-full h-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 1600,-50
               L 550,-50
               C 620,120 720,200 680,310
               C 640,420 480,480 530,600
               C 580,720 750,780 720,900
               L 1600,900 Z"
            fill="url(#footer-grad-deep)"
          />
        </svg>
      </m.div>

      {/* 5. LAYER 3 - Mid Ocean Wave (GPU Accelerated) */}
      <m.div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          filter: 'drop-shadow(-8px 6px 10px rgba(2, 6, 18, 0.85))',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        animate={
          shouldAnimate
            ? {
              x: [0, -14, 12, 0],
              y: [0, 12, -8, 0],
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
          className="w-full h-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 1600,-50
               L 720,-50
               C 780,100 860,180 830,290
               C 800,400 660,460 700,580
               C 740,700 880,760 850,900
               L 1600,900 Z"
            fill="url(#footer-grad-mid)"
          />
        </svg>
      </m.div>

      {/* 6. LAYER 2 - Upper Azure Wave (GPU Accelerated) */}
      <m.div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          filter: 'drop-shadow(-6px 4px 8px rgba(2, 6, 18, 0.8))',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        animate={
          shouldAnimate
            ? {
              x: [0, 10, -12, 0],
              y: [0, -8, 10, 0],
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
          className="w-full h-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 1600,-50
               L 890,-50
               C 950,90 1020,170 990,270
               C 960,370 840,430 870,540
               C 900,650 1010,720 980,900
               L 1600,900 Z"
            fill="url(#footer-grad-upper)"
          />
        </svg>
      </m.div>

      {/* 7. LAYER 1 - Vibrant Top Cyan Pool / Wave (GPU Accelerated) */}
      <m.div
        className="absolute inset-0 pointer-events-none opacity-90"
        style={{
          filter: 'drop-shadow(-5px 3px 6px rgba(2, 6, 20, 0.75))',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
        animate={
          shouldAnimate
            ? {
              x: [0, -8, 6, 0],
              y: [0, 6, -6, 0],
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
          className="w-full h-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 1600,-50
               L 1060,-50
               C 1110,80 1170,160 1140,250
               C 1110,340 1010,400 1040,510
               C 1070,620 1160,680 1130,900
               L 1600,900 Z"
            fill="url(#footer-grad-bright)"
          />
        </svg>
      </m.div>

      {/* 8. Micro-Grain & Subtle Vignette Overlay for Crisp Readability */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#02050f]/90 via-[#030816]/75 to-[#02050f]/80 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

