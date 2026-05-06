import React from 'react';
import { motion } from 'framer-motion';

export default function MorphingBlob({ className, delay = 0, reverse = false }) {
  // We use standard CSS classes combined with Framer Motion for the rotation and morphing
  return (
    <motion.div
      className={`absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-15 dark:opacity-20 pointer-events-none mix-blend-screen ${className}`}
      style={{ willChange: "transform, border-radius" }}
      animate={{
        rotate: reverse ? [360, 0] : [0, 360],
        scale: [1, 1.1, 0.9, 1],
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 70% 70% 30% / 30% 30% 70% 70%",
          "50% 50% 20% 80% / 25% 80% 20% 75%",
          "60% 40% 30% 70% / 60% 30% 70% 40%"
        ],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
        delay: delay
      }}
    />
  );
}
