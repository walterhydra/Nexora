import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-white dark:bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-1 bg-accent-blue absolute bottom-0 left-0"
        />
        <h1 className="text-4xl md:text-6xl font-display font-bold px-4 py-2 relative overflow-hidden">
          <motion.span 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="block"
          >
            Nexora Studio
          </motion.span>
        </h1>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 font-mono text-sm text-gray-500 uppercase tracking-widest"
      >
        Loading Experience...
      </motion.p>
    </motion.div>
  );
}
