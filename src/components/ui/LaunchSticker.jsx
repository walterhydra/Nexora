import React from 'react';
import { motion } from 'framer-motion';

export default function LaunchSticker() {
  return (
    <div className="relative select-none flex items-center justify-center p-4">
      {/* Spiderman Physical Vinyl Sticker (Firmly stuck in place, completely static) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative z-10 w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[340px] md:h-[340px] flex items-center justify-center -rotate-[2.5deg]"
      >
        {/* The Spiderman Physical Die-Cut Sticker Image with Realistic Contact Shadow */}
        <img
          src="/images/Spiderman_coding_sticker-removebg-preview.png"
          alt="Spiderman Coding - Rapid Website Launch"
          className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] transform-gpu"
          draggable="false"
        />
      </motion.div>
    </div>
  );
}
