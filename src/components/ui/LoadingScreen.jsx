import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
const targetText = "NEXORA";

export default function LoadingScreen() {
  const [text, setText] = useState(() => 
    Array.from({length: targetText.length}).map(() => chars[Math.floor(Math.random() * chars.length)]).join('')
  );
  const wrapperControls = useAnimation();
  const textControls = useAnimation();

  useEffect(() => {
    let isMounted = true;
    let frame = 0;
    let iteration = 0;
    let animationFrameId;

    const scramble = () => {
      if (!isMounted) return;

      setText(targetText.split("").map((letter, index) => {
        if (index < iteration) {
          return targetText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));

      if (iteration >= targetText.length) {
        cancelAnimationFrame(animationFrameId);
        triggerExit();
        return;
      }

      if (frame % 4 === 0) {
        iteration += 1 / 3; // Speed of decoding
      }
      
      frame++;
      animationFrameId = requestAnimationFrame(scramble);
    };

    const startDelay = setTimeout(() => {
      animationFrameId = requestAnimationFrame(scramble);
    }, 400);

    const triggerExit = () => {
      setTimeout(async () => {
        if (!isMounted) return;

        // Phase 1: Massive zoom-in and blur on the center text
        textControls.start({
          scale: 4,
          opacity: 0,
          filter: "blur(20px)",
          transition: { ease: [0.77, 0, 0.175, 1], duration: 0.8 }
        });

        // Phase 2: Fade out the entire background wrapper smoothly
        setTimeout(() => {
          wrapperControls.start({
            opacity: 0,
            transition: { ease: "linear", duration: 0.5 }
          });
        }, 300);

      }, 1000); // Hold the resolved text for 1 second
    };

    return () => {
      isMounted = false;
      clearTimeout(startDelay);
      cancelAnimationFrame(animationFrameId);
    };
  }, [textControls, wrapperControls]);

  // Repeated string for seamless infinite background marquee
  const marqueeText = Array(15).fill("NEXORA STUDIO").join(" • ");

  return (
    <motion.div 
      animate={wrapperControls}
      className="fixed inset-0 z-[100] bg-[#02050A] text-white overflow-hidden pointer-events-none flex items-center justify-center"
    >
      {/* Brutalist Infinite Marquee Background */}
      <div className="absolute inset-0 flex flex-col justify-around py-4 opacity-[0.04] select-none">
        {[1, -1, 1, -1, 1, -1].map((direction, idx) => (
          <motion.div 
            key={idx}
            className="whitespace-nowrap font-black text-6xl md:text-8xl tracking-tighter"
            animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 25 + idx * 5, repeat: Infinity }}
          >
            {marqueeText}
          </motion.div>
        ))}
      </div>

      {/* Massive Center Typography Scramble */}
      <motion.div 
        animate={textControls}
        className="relative z-10 flex flex-col items-center justify-center w-full px-4"
      >
        <div className="relative flex items-center justify-center w-full">
          <motion.div 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[130px] font-sans font-black tracking-[0.2em] md:tracking-[0.3em] text-white drop-shadow-[0_0_30px_rgba(79,142,247,0.3)] text-center w-full uppercase"
          >
            {text}
          </motion.div>
        </div>
        
        {/* Animated Subtitle */}
        <div className="mt-8 flex gap-4 text-white/50 tracking-[0.5em] text-xs md:text-sm font-sans font-bold uppercase">
          <motion.span
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            DECODING
          </motion.span>
          <motion.span
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
          >
            EXPERIENCE
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}
