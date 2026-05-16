import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function KineticManifesto() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-1000, 0]);

  return (
    <section ref={containerRef} className="py-24 bg-black overflow-hidden flex flex-col justify-center border-y border-white/5">
      <div className="relative whitespace-nowrap flex flex-col gap-4">
        
        {/* Row 1: Moves Left */}
        <motion.div 
          style={{ x: x1 }}
          className="flex gap-8"
        >
          {[...Array(4)].map((_, i) => (
            <div key={`r1-${i}`} className="flex items-center gap-8">
              <h2 className="text-7xl md:text-9xl font-black text-transparent stroke-text tracking-tighter uppercase italic">
                We Don't Build Websites
              </h2>
              <div className="w-8 h-8 rounded-full bg-accent-primary animate-pulse" />
            </div>
          ))}
        </motion.div>

        {/* Row 2: Moves Right */}
        <motion.div 
          style={{ x: x2 }}
          className="flex gap-8"
        >
          {[...Array(4)].map((_, i) => (
            <div key={`r2-${i}`} className="flex items-center gap-8">
              <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase italic">
                We Engineer Empires
              </h2>
              <div className="w-8 h-8 rounded-full bg-accent-secondary animate-pulse" />
            </div>
          ))}
        </motion.div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .stroke-text {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.1);
          color: transparent;
        }
      `}} />
    </section>
  );
}
