import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ isExiting }) {
  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col bg-[#050505] text-white overflow-hidden pointer-events-none"
      style={{
        transition: 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), visibility 1.1s',
        transform: isExiting ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)',
        opacity: isExiting ? 0 : 1,
        visibility: isExiting ? 'hidden' : 'visible',
        willChange: 'transform, opacity',
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes loader-center-scale {
          0% { opacity: 0; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes loader-mask-slide {
          0% { transform: translate3d(-100%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes loader-text-slide {
          0% { transform: translate3d(100%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
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
          animation: loader-center-scale 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        .animate-loader-mask {
          animation: loader-mask-slide 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        .animate-loader-text {
          animation: loader-text-slide 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        .animate-loader-progress {
          animation: loader-progress 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          backface-visibility: hidden;
          transform-style: preserve-3d;
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
      <div
        className={`relative z-10 flex h-full w-full items-center justify-center px-4 ${
          isExiting ? '' : 'animate-loader-center'
        }`}
        style={{
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isExiting ? 'scale(0.9)' : 'scale(1)',
          opacity: isExiting ? 0 : 1,
          willChange: 'transform, opacity',
        }}
      >
        <div className="relative text-[13vw] md:text-[11vw] lg:text-[9.5vw] font-display font-black tracking-tighter leading-none select-none">

          {/* Base Outline Text */}
          <div
            className="text-transparent whitespace-nowrap opacity-60"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
          >
            NEXORA STUDIO
          </div>

          {/* Solid Fill Overlay (Masked by Width, Hardware Accelerated) */}
          <div
            className={`absolute top-0 left-0 w-full h-full overflow-hidden ${isExiting ? '' : 'animate-loader-mask'}`}
            style={{
              willChange: "transform",
              transform: isExiting ? 'translate3d(0, 0, 0)' : undefined
            }}
          >
            <div
              className={`text-white whitespace-nowrap absolute top-0 left-0 w-full h-full ${isExiting ? '' : 'animate-loader-text'}`}
              style={{
                willChange: "transform",
                transform: isExiting ? 'translate3d(0, 0, 0)' : undefined
              }}
            >
              NEXORA STUDIO
            </div>
          </div>
        </div>
      </div>

      {/* Absolute Progress Line at bottom edge */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5 z-20">
        <div
          className="h-full bg-accent-blue origin-left animate-loader-progress"
          style={{ willChange: "transform" }}
        />
      </div>

    </div>
  );
}

