import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function LoadingScreen() {
  const exitControls = useAnimation();
  const characterControls = useAnimation();
  const armControls = useAnimation();
  const armFrontControls = useAnimation();
  const legControls = useAnimation();
  const legFrontControls = useAnimation();
  const laptopControls = useAnimation();
  const logoControls = useAnimation();
  const codeParticlesControls = useAnimation();

  useEffect(() => {
    let isMounted = true;

    async function runSequence() {
      if (!isMounted) return;

      // 0. Setup initial state
      await characterControls.set({ x: -150, y: 0 });
      await armControls.set({ rotate: 10 });
      await armFrontControls.set({ rotate: -10 });
      
      // 1. Walk in (0s -> 1.0s)
      legControls.start({ 
        rotate: [0, 30, -30, 30, -30, 0], 
        transition: { duration: 1, ease: "linear" } 
      });
      legFrontControls.start({ 
        rotate: [0, -30, 30, -30, 30, 0], 
        transition: { duration: 1, ease: "linear" } 
      });
      armControls.start({ 
        rotate: [10, -20, 20, -20, 20, 10], 
        transition: { duration: 1, ease: "linear" } 
      });
      armFrontControls.start({ 
        rotate: [-10, 20, -20, 20, -20, -10], 
        transition: { duration: 1, ease: "linear" } 
      });
      
      await characterControls.start({ 
        x: 95, 
        y: [0, -4, 0, -4, 0, -4, 0], 
        transition: { duration: 1, ease: "linear" } 
      });

      if (!isMounted) return;

      // 2. Sit down (1.0s -> 1.4s)
      legControls.start({ rotate: -80, transition: { duration: 0.4, ease: "easeOut" } });
      legFrontControls.start({ rotate: -80, transition: { duration: 0.4, ease: "easeOut" } });
      armControls.start({ rotate: -20, transition: { duration: 0.4 } });
      armFrontControls.start({ rotate: -20, transition: { duration: 0.4 } });
      await characterControls.start({ y: 16, x: 100, transition: { duration: 0.4, ease: "easeOut" } });

      if (!isMounted) return;

      // 3. Type on laptop (1.4s -> 2.2s)
      armControls.start({ 
        rotate: [-35, -45, -30, -48, -35, -50, -40], 
        transition: { duration: 0.8, ease: "linear" } 
      });
      armFrontControls.start({ 
        rotate: [-45, -35, -50, -35, -45, -30, -45], 
        transition: { duration: 0.8, ease: "linear" } 
      });
      laptopControls.start({ 
        opacity: [0.2, 1, 0.5, 1, 0.8, 1], 
        transition: { duration: 0.8 } 
      });
      codeParticlesControls.start({
        opacity: [0, 1, 0],
        y: [0, -30],
        transition: { duration: 0.8, ease: "easeOut" }
      });
      
      await new Promise(resolve => setTimeout(resolve, 800));

      if (!isMounted) return;

      // 4. Reach for Logo (2.2s -> 2.5s)
      await armFrontControls.start({ 
        rotate: -85, 
        scaleY: 1.1,
        transition: { duration: 0.3, ease: "backOut" } 
      });

      if (!isMounted) return;

      // 5. Click React (2.5s -> 2.9s)
      logoControls.start({ 
        scale: [1, 0.8, 1.3, 1], 
        rotate: [0, -5, 5, 0],
        filter: ["drop-shadow(0 0 10px rgba(79,142,247,0.3))", "drop-shadow(0 0 30px rgba(255,255,255,1))", "drop-shadow(0 0 10px rgba(79,142,247,0.3))"],
        transition: { duration: 0.4 } 
      });
      
      await new Promise(resolve => setTimeout(resolve, 400));

      if (!isMounted) return;

      // 6. Global Exit (3.0s -> 3.5s)
      exitControls.start({ 
        scale: 1.1, 
        opacity: 0, 
        filter: "blur(15px)", 
        transition: { duration: 0.5, ease: "easeIn" } 
      });
    }
    
    runSequence();

    return () => { isMounted = false; };
  }, [characterControls, armControls, armFrontControls, legControls, legFrontControls, laptopControls, logoControls, exitControls, codeParticlesControls]);

  return (
    <motion.div
      animate={exitControls}
      className="fixed inset-0 z-[100] bg-gray-50 dark:bg-[#080808] flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-[400px] h-[300px]">
        {/* The Floor */}
        <div className="absolute bottom-0 w-full h-[2px] bg-gray-200 dark:bg-white/10 rounded-full" />

        {/* Chair */}
        <div className="absolute bottom-0 left-[105px] w-12 h-[65px] z-0 flex flex-col justify-end">
          {/* Backrest */}
          <div className="w-2.5 h-[45px] bg-gray-300 dark:bg-gray-800 rounded-t-md absolute left-0 top-0" />
          {/* Seat */}
          <div className="w-[44px] h-2.5 bg-gray-400 dark:bg-gray-700 rounded-sm absolute left-0 top-[40px]" />
          {/* Legs */}
          <div className="w-1.5 h-6 bg-gray-400 dark:bg-gray-800 absolute left-2 bottom-0" />
          <div className="w-1.5 h-6 bg-gray-400 dark:bg-gray-800 absolute right-2 bottom-0" />
        </div>

        {/* Desk */}
        <div className="absolute bottom-0 left-[180px] w-28 h-[75px] z-10">
          {/* Top */}
          <div className="w-full h-3 bg-gray-300 dark:bg-gray-800 rounded-sm absolute top-0 shadow-sm" />
          {/* Legs */}
          <div className="w-2.5 h-[63px] bg-gray-200 dark:bg-gray-900 absolute left-3 bottom-0" />
          <div className="w-2.5 h-[63px] bg-gray-200 dark:bg-gray-900 absolute right-3 bottom-0" />
        </div>

        {/* Laptop */}
        <div className="absolute bottom-[75px] left-[200px] z-10">
          {/* Screen */}
          <div className="w-1.5 h-[34px] bg-gray-400 dark:bg-gray-500 absolute bottom-1 left-3 origin-bottom transform -rotate-[15deg] rounded-t-[2px]" />
          {/* Base */}
          <div className="w-[38px] h-1.5 bg-gray-500 dark:bg-gray-400 absolute bottom-0 left-0 rounded-full" />
          {/* Screen Glow */}
          <motion.div animate={laptopControls} className="absolute bottom-2 left-5 w-8 h-[30px] bg-accent-blue/30 blur-md rounded-full pointer-events-none" />
          
          {/* Typing Code Particles */}
          <motion.div animate={codeParticlesControls} className="absolute bottom-[40px] left-6 flex flex-col gap-1 opacity-0 pointer-events-none">
            <div className="w-4 h-[2px] bg-accent-blue rounded-full" />
            <div className="w-6 h-[2px] bg-accent-purple rounded-full ml-2" />
            <div className="w-3 h-[2px] bg-accent-blue rounded-full ml-1" />
          </motion.div>
        </div>

        {/* Floating Logo */}
        <motion.div 
          animate={logoControls} 
          className="absolute bottom-[130px] left-[230px] z-20 origin-center"
        >
          <img 
            src="/favicon.png" 
            alt="Nexora Logo" 
            className="w-16 h-16 object-contain rounded-xl drop-shadow-[0_0_15px_rgba(79,142,247,0.3)]" 
          />
        </motion.div>

        {/* Character */}
        <motion.div 
          animate={characterControls}
          className="absolute bottom-0 left-0 w-14 h-[120px] z-10 origin-bottom"
        >
          {/* Head */}
          <div className="w-[38px] h-[38px] bg-gray-800 dark:bg-white rounded-full absolute top-0 left-1.5 z-20" />
          
          {/* Torso */}
          <div className="w-[34px] h-[54px] bg-accent-blue rounded-2xl absolute top-[36px] left-[3.5px] z-10 shadow-sm" />
          
          {/* Arm Back */}
          <motion.div 
            animate={armControls} 
            className="w-3 h-[48px] bg-[#3267C2] dark:bg-accent-blue/70 rounded-full absolute top-[40px] left-[16px] origin-[center_top] z-0" 
          />
          
          {/* Leg Back */}
          <motion.div 
            animate={legControls} 
            className="w-3.5 h-[44px] bg-gray-500 dark:bg-gray-300 rounded-full absolute top-[76px] left-[14px] origin-[center_top] z-0" 
          />
          
          {/* Leg Front */}
          <motion.div 
            animate={legFrontControls} 
            className="w-3.5 h-[44px] bg-gray-700 dark:bg-white rounded-full absolute top-[76px] left-[24px] origin-[center_top] z-20 shadow-sm" 
          />
          
          {/* Arm Front */}
          <motion.div 
            animate={armFrontControls} 
            className="w-3 h-[48px] bg-[#4F8EF7] dark:bg-white rounded-full absolute top-[40px] left-[24px] origin-[center_top] z-30 shadow-sm" 
          />
        </motion.div>

        {/* Status Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -bottom-10 left-0 w-full text-center font-mono text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.3em]"
        >
          Executing Build Sequence...
        </motion.div>
      </div>
    </motion.div>
  );
}
