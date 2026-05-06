import React, { useEffect, useState } from 'react';
import { useCursor } from '../../context/CursorContext';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function ContextCursor() {
  const { cursorType } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible || window.innerWidth < 768) return null;

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
    image: {
      width: 80,
      height: 80,
      backgroundColor: 'var(--color-accent-primary)',
      borderColor: 'transparent',
      borderRadius: '50%',
      scale: 1,
    },
    link: {
      width: 60,
      height: 12,
      backgroundColor: 'transparent',
      borderColor: 'var(--color-accent-secondary)',
      borderRadius: '20px',
      scale: 1,
    },
    drag: {
      width: 80,
      height: 80,
      backgroundColor: 'transparent',
      borderColor: 'var(--color-accent-violet)',
      borderRadius: '50%',
      scale: 1.1,
    },
    video: {
      width: 80,
      height: 80,
      backgroundColor: 'var(--color-accent-secondary)',
      borderColor: 'transparent',
      borderRadius: '50%',
      scale: 1,
    }
  };

  const getInnerText = () => {
    switch (cursorType) {
      case 'button': return <span className="text-[10px] font-bold text-accent-primary uppercase tracking-widest">Click</span>;
      case 'image': return <span className="text-[12px] font-bold text-black uppercase tracking-widest">View</span>;
      case 'drag': return <div className="flex justify-between w-full px-2"><span className="text-accent-violet font-bold text-xl">←</span><span className="text-accent-violet font-bold text-xl">→</span></div>;
      case 'video': return <span className="text-white text-xl">▶</span>;
      default: return null;
    }
  };

  return (
    <>
      {/* Outer Ring / Shape */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center border-2 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={variants}
        animate={cursorType}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
      >
        {getInnerText()}
      </motion.div>

      {/* Inner Dot (only visible on default/link) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] bg-accent-primary mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: ['default', 'link'].includes(cursorType) ? 1 : 0
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
