import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col bg-[#050505] text-white overflow-hidden pointer-events-none"
      // Slide the entire screen up smoothly when done
      exit={{
        y: "-100%",
        transition: { duration: 1.1, ease: [0.85, 0, 0.15, 1], delay: 0.3 }
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes loader-center-scale {
          0% { opacity: 0; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes loader-wipe {
          0% { clip-path: inset(0 100% 0 0); }
          100% { clip-path: inset(0 0% 0 0); }
        }
        @keyframes loader-progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes loader-fade-down {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-loader-center {
          animation: loader-center-scale 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-loader-wipe {
          animation: loader-wipe 1.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .animate-loader-progress {
          animation: loader-progress 1.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .animate-loader-fade-1 {
          animation: loader-fade-down 0.5s ease-out 0.2s forwards;
          opacity: 0;
        }
        .animate-loader-fade-2 {
          animation: loader-fade-down 0.5s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}} />
      {/* Background Marquee Text */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center overflow-hidden opacity-[0.03] pointer-events-none select-none">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className={`whitespace-nowrap text-[12vh] md:text-[15vh] font-display font-black leading-[0.9] tracking-tighter ${i % 2 === 0 ? '-ml-[10%]' : '-ml-[30%]'}`}
          >
            NEXORA STUDIO • NEXORA STUDIO • NEXORA STUDIO • NEXORA STUDIO • NEXORA STUDIO • NEXORA STUDIO • NEXORA STUDIO • NEXORA STUDIO • NEXORA STUDIO • NEXORA STUDIO •
          </div>
        ))}
      </div>



      {/* Top Bar Navigation Style */}
      <div className="absolute top-0 left-0 z-10 w-full flex justify-between p-6 md:p-10 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-white/50">
        <div className="animate-loader-fade-1">
          NEXORA STUDIO
        </div>
        <div className="animate-loader-fade-2">
          LOADING SEQUENCE
        </div>
      </div>

      {/* Center Typography Fill Effect */}
      <motion.div
        className="relative z-10 flex h-full w-full items-center justify-center px-4 animate-loader-center"
        style={{ willChange: "transform, opacity" }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5, ease: [0.85, 0, 0.15, 1] } }}
      >
        <div className="relative text-[13vw] md:text-[11vw] lg:text-[9.5vw] font-display font-black tracking-tighter leading-none select-none">

          {/* Base Outline Text */}
          <div
            className="text-transparent whitespace-nowrap opacity-60"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
          >
            NEXORA STUDIO
          </div>

          {/* Solid Fill Overlay (Masked by Width) */}
          <div
            className="absolute top-0 left-0 h-full w-full animate-loader-wipe"
            style={{ willChange: "clip-path" }}
          >
            <div className="text-white whitespace-nowrap">
              NEXORA STUDIO
            </div>
          </div>
        </div>
      </motion.div>

      {/* Absolute Progress Line at bottom edge */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5 z-20">
        <div
          className="h-full bg-accent-blue shadow-[0_0_15px_rgba(0,169,143,0.8)] origin-left animate-loader-progress"
          style={{ willChange: "transform" }}
        />
      </div>

    </motion.div>
  );
}
