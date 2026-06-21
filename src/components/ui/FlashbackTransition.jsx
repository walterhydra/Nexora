import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';

const FlashbackTransition = ({ isActive }) => {
  const [glitchLines, setGlitchLines] = useState([]);

  useEffect(() => {
    if (isActive) {
      // Reduced number of glitch lines for performance (from 40 to 12)
      setGlitchLines(Array.from({ length: 12 }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 30 + 10}%`, // Shorter width
        height: `${Math.random() * 3 + 1}px`,
        delay: Math.random() * 0.3,
        duration: Math.random() * 0.4 + 0.2
      })));
    }
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center overflow-hidden bg-black"
          style={{ willChange: "opacity" }}
        >
          {/* Concentric rings expanding outward (Warp effect) - Reduced from 6 to 3, removed shadow */}
          {[...Array(3)].map((_, i) => (
            <m.div 
              key={`ring-${i}`}
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: [0.1, 5, 20, 100], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.5, delay: i * 0.2, ease: "circIn" }}
              className={`absolute rounded-full border-[${i % 2 === 0 ? '2px' : '4px'}] border-accent-primary/50`}
              style={{ width: `${(i+1)*2}0px`, height: `${(i+1)*2}0px`, willChange: "transform, opacity" }}
            />
          ))}

          {/* Central Flash - Removed mix-blend and blur, simple scale/opacity */}
          <m.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 150], opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, delay: 0.5, ease: "circIn" }}
            className="absolute w-10 h-10 bg-white rounded-full"
            style={{ willChange: "transform, opacity" }}
          />
          
          {/* Text Effect - Removed blur and mix-blend for extreme performance */}
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1.2, 1.5, 4] }}
            transition={{ duration: 1.8 }}
            className="absolute z-10 font-display text-5xl md:text-8xl lg:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary tracking-[0.3em] uppercase"
            style={{ willChange: "transform, opacity" }}
          >
            NEXORAA
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.5, 2.5] }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute z-10 font-display text-2xl md:text-5xl font-black text-white/60 tracking-[0.5em] uppercase mt-40"
            style={{ willChange: "transform, opacity" }}
          >
            System Override
          </m.div>

          {/* Glitch lines - Reduced count, removed shadow */}
          {glitchLines.map((line, i) => (
             <m.div
               key={`glitch-${i}`}
               initial={{ x: '-100%', opacity: 0 }}
               animate={{ x: ['100%', '-100%'], opacity: [0, 1, 1, 0] }}
               transition={{ duration: line.duration, delay: line.delay, repeat: 2 }}
               className="absolute bg-white/80"
               style={{
                 top: line.top,
                 left: line.left,
                 width: line.width,
                 height: line.height,
                 willChange: "transform, opacity"
               }}
             />
          ))}

          {/* Single Flash overlay at the end */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 0] }}
            transition={{ duration: 1.8, times: [0, 0.6, 0.8, 1] }}
            className="absolute inset-0 bg-white z-50"
            style={{ willChange: "opacity" }}
          />
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default FlashbackTransition;
