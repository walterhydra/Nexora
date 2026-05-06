import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function PhoneMockup({ children, className = "" }) {
  const { scrollYProgress } = useScroll();
  // Parallax effect on the content inside the phone
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div className={`relative w-[280px] h-[580px] mx-auto rounded-[40px] border-[12px] border-gray-900 bg-black shadow-2xl overflow-hidden ${className}`}>
      {/* Dynamic Island / Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30" />
      
      {/* Content wrapper with parallax */}
      <motion.div 
        className="w-full h-[150%] relative z-10 origin-top"
        style={{ y }}
      >
        {children}
      </motion.div>

      {/* Screen Glare overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
    </div>
  );
}
