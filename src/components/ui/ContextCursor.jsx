import React, { useEffect, useState, useRef } from 'react';
import { useCursor } from '../../context/CursorContext';
import { m, useMotionValue, useSpring } from 'framer-motion';

export default function ContextCursor() {
  const { cursorType } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const isTouchRef = useRef(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 32, stiffness: 600, mass: 0.08 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch-only devices and skip attaching listeners completely
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      isTouchRef.current = true;
      return;
    }

    let hasShown = false;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!hasShown) {
        hasShown = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      hasShown = false;
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      hasShown = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (isTouchRef.current || !isVisible || (typeof window !== 'undefined' && window.innerWidth < 768)) {
    return null;
  }

  // Define variants based on context
  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'transparent',
      borderColor: 'var(--color-accent-primary)',
      borderRadius: '50%',
      scale: 1,
    },
    button: {
      width: 64,
      height: 64,
      backgroundColor: 'rgba(0, 245, 255, 0.1)',
      borderColor: 'var(--color-accent-primary)',
      borderRadius: '50%',
      scale: 1.2,
    },
    card: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '24px',
      scale: 1.1,
    },
    view: {
      width: 90,
      height: 90,
      backgroundColor: 'var(--color-accent-primary)',
      borderColor: 'transparent',
      borderRadius: '50%',
      scale: 1,
    },
    hidden: {
      opacity: 0,
      scale: 0,
    }
  };

  const currentVariant = variants[cursorType] || variants.default;

  return (
    <m.div
      className="fixed pointer-events-none z-[9999] border flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        top: 0,
        left: 0,
        width: currentVariant.width,
        height: currentVariant.height,
        backgroundColor: currentVariant.backgroundColor,
        borderColor: currentVariant.borderColor,
        borderRadius: currentVariant.borderRadius,
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
      animate={{
        scale: currentVariant.scale,
        opacity: cursorType === 'hidden' ? 0 : 1,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      {cursorType === 'view' && (
        <span className="text-black text-xs font-bold uppercase tracking-wider">
          View
        </span>
      )}
    </m.div>
  );
}
