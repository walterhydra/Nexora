import React from 'react';
import { motion } from 'framer-motion';

export default function MarqueeStrip({ items, speed = 20, direction = 1 }) {
  // direction: 1 for left to right, -1 for right to left
  
  return (
    <div className="relative w-full overflow-hidden bg-primary-dark border-y border-black/10 dark:border-white/10 py-4">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: direction === 1 ? [0, -1000] : [-1000, 0]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {/* Double the items to create a seamless loop */}
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center mx-8 text-white/70 font-mono text-sm uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-accent-blue mr-4 shadow-[0_0_8px_rgba(79,142,247,0.8)]" />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
