import React, { useRef, useState, useEffect } from 'react';
import { m, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

import MorphingBlob from '../ui/MorphingBlob';
import ParticleField from '../ui/ParticleField';
import ScrambleText from '../ui/ScrambleText';
import LaptopMockup from '../ui/LaptopMockup';
import MagneticButton from '../ui/MagneticButton';
import FlashbackTransition from '../ui/FlashbackTransition';
import LayeredPaperWaves from '../ui/LayeredPaperWaves';
import GoogleSearchSimulation from './GoogleSearchSimulation';
import { getScroll } from '../../utils/scroll';

const MobilePreview = React.memo(({ step }) => {
  return (
    <div className="relative w-[115px] h-[220px] sm:w-[135px] sm:h-[260px] md:w-[155px] md:h-[295px] bg-black rounded-[1.25rem] sm:rounded-[1.5rem] md:rounded-[1.75rem] border-[3px] md:border-[4px] border-gray-700 overflow-hidden shadow-2xl flex flex-col transform transition-transform duration-500 hover:scale-105 shrink-0">
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-2.5 sm:h-3 bg-gray-800 rounded-b-lg w-1/2 mx-auto z-20"></div>

      {/* Screen Content */}
      <div className="flex-1 relative w-full h-full bg-[#090a0f] flex flex-col p-2 sm:p-2.5 pt-4 sm:pt-5 gap-2">
        {/* Step 1: Wireframe / Empty */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          className="w-full flex justify-between items-center"
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-800 animate-pulse" />
          <div className="w-10 h-2 sm:w-12 sm:h-2 rounded-full bg-gray-800 animate-pulse" />
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
          transition={{ delay: 0.1 }}
          className="w-full h-16 sm:h-20 rounded-lg bg-gray-900 border border-gray-800 animate-pulse mt-1"
        />

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-1.5"
        >
          <div className="w-1/2 h-12 sm:h-14 rounded-lg bg-gray-900 border border-gray-800 animate-pulse" />
          <div className="w-1/2 h-12 sm:h-14 rounded-lg bg-gray-900 border border-gray-800 animate-pulse" />
        </m.div>

        {/* Step 2: Design System Applied (Colors & Images) */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          className="absolute inset-0 bg-[#0d0d12] p-2 sm:p-2.5 pt-4 sm:pt-5 flex flex-col gap-2 pointer-events-none"
        >
          <div className="w-full flex justify-between items-center">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500" />
            <div className="w-10 h-2 sm:w-12 sm:h-2 bg-white/20 rounded-full" />
          </div>

          <div className="w-full h-16 sm:h-20 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 relative overflow-hidden mt-1">
            <div className="absolute inset-0 bg-cyan-400/10 mix-blend-overlay"></div>
            <div className="absolute bottom-1.5 left-1.5 w-10 sm:w-12 h-1.5 sm:h-2 bg-white/80 rounded-full" />
            <div className="absolute bottom-1.5 right-1.5 w-4 sm:w-6 h-1.5 sm:h-2 bg-cyan-400 rounded-full" />
          </div>

          <div className="flex gap-1.5">
            <div className="w-1/2 h-12 sm:h-14 rounded-lg bg-gray-800/80 border border-white/10 p-1.5 flex flex-col justify-end backdrop-blur-sm">
              <div className="w-full h-1 bg-white/20 rounded-full mb-1" />
              <div className="w-2/3 h-1 bg-white/10 rounded-full" />
            </div>
            <div className="w-1/2 h-12 sm:h-14 rounded-lg bg-gray-800/80 border border-white/10 p-1.5 flex flex-col justify-end backdrop-blur-sm">
              <div className="w-full h-1 bg-white/20 rounded-full mb-1" />
              <div className="w-1/2 h-1 bg-indigo-500 rounded-full" />
            </div>
          </div>
        </m.div>

        {/* Step 3: AI Integration (Scanning Effect) */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 3 ? 1 : 0 }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <m.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)] z-20"
          />
          <div className="absolute inset-0 bg-cyan-400/10 mix-blend-overlay animate-pulse z-10"></div>
        </m.div>

        {/* Step 4: Polish / Success */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 4 ? 1 : 0 }}
          className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <m.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: step >= 4 ? 1 : 0.5, opacity: step >= 4 ? 1 : 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </m.div>
        </m.div>

      </div>
    </div>
  );
});

const LaptopScreenContent = React.memo(function LaptopScreenContent({ isOpen }) {
  const navigate = useNavigate();
  const [bootStep, setBootStep] = useState('loading'); // 'loading', 'windows-11', 'code-studio', 'video-showcase'
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setBootStep('loading');
      setStep(0);
      return;
    }

    setBootStep('loading');
    setStep(0);

    // Sequence when laptop opens:
    // 1. Loading screen (Windows 3D flip + spinner) for 1.2s
    const t1 = setTimeout(() => {
      setBootStep('windows-11');
    }, 1200);

    // 2. Desktop screen (Windows 11 bloom wallpaper) for 0.8s -> then Google Chrome opens
    const t2 = setTimeout(() => {
      setBootStep('google-search');
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpen]);

  return (
    <div className="absolute inset-0 bg-[#0c0d12] overflow-hidden flex items-center justify-center select-none font-sans">
      <AnimatePresence mode="wait">
        {/* 1. Windows Loading Boot Screen */}
        {bootStep === 'loading' && (
          <m.div
            key="hero-boot-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black z-20 flex flex-col items-center justify-center space-y-12"
          >
            {/* Flipping Windows Logo */}
            <m.div
              animate={{ rotateY: [0, 180, 360] }}
              transition={{
                duration: 2.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.5
              }}
              style={{ perspective: 600 }}
              className="w-14 h-14 flex items-center justify-center"
            >
              <svg width="45" height="45" viewBox="0 0 100 100" fill="#0078d4">
                <rect x="0" y="0" width="47" height="47" />
                <rect x="53" y="0" width="47" height="47" />
                <rect x="0" y="53" width="47" height="47" />
                <rect x="53" y="53" width="47" height="47" />
              </svg>
            </m.div>

            {/* Windows Classic Dotted Spinner */}
            <div className="windows-spinner">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </m.div>
        )}

        {/* 2. Desktop Screen */}
        {bootStep === 'windows-11' && (
          <m.div
            key="hero-boot-desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-10"
          >
            <img
              src="/projects/ai-bot-screen.png"
              alt="System Desktop"
              className="w-full !h-full block object-fill"
              style={{ objectFit: 'fill', height: '100%' }}
            />
          </m.div>
        )}

        {/* 3. Google Search Sequence */}
        {bootStep === 'google-search' && (
          <GoogleSearchSimulation
            key="hero-google-search"
            onComplete={() => setBootStep('video-showcase')}
          />
        )}

        {/* 4. Video Showcase Finale */}
        {bootStep === 'video-showcase' && (
          <m.div
            key="hero-video-showcase"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-black z-30 flex items-center justify-center overflow-hidden"
          >
            <video
              ref={(el) => {
                if (el) el.playbackRate = 1.5;
              }}
              src="/videos/video_no_watermark.mp4"
              autoPlay
              muted
              playsInline
              onLoadedMetadata={(e) => {
                e.currentTarget.playbackRate = 1.5;
              }}
              onPlay={(e) => {
                e.currentTarget.playbackRate = 1.5;
              }}
              onEnded={(e) => {
                e.currentTarget.pause();
              }}
              className="w-full h-full object-cover"
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
});

const HERO_PHRASES = [
  'Web Applications',
  'Mobile Applications',
  'AI Solutions',
  'SaaS Platforms',
  'Custom Software'
];

export default function Hero() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Exact pixel-based transitions for 100% deterministic timings
  const textOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const textY = useTransform(scrollY, [0, 100], [0, -60]);

  // Laptop lid opens smoothly as we scroll down the section
  const laptopProgress = useTransform(scrollYProgress, [0.03, 0.48], [0, 1]);

  const [showTypewriter, setShowTypewriter] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    // Delay typewriter until the loader is completely gone, ensuring smooth animations
    const checkLoader = setInterval(() => {
      if (!window.isLoaderActive) {
        setShowTypewriter(true);
        clearInterval(checkLoader);
      }
    }, 100);
    return () => clearInterval(checkLoader);
  }, []);

  useEffect(() => {
    if (!showTypewriter) return;
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % HERO_PHRASES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [showTypewriter]);

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "917383303388";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Nexoraa Studio, I'd like to discuss a project")}`;

  const handleStartProjectClick = (e) => {
    e.preventDefault();
    navigate('/system-boot');
  };
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const lenis = getScroll();
      if (lenis) {
        lenis.scrollTo(el, { offset: -80, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <m.section
        ref={containerRef}
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative h-[165vh] bg-bg-primary overflow-hidden"
      >

      {/* High-Graphics Primitives & Paper Waves Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LayeredPaperWaves glowColor="rgba(0, 245, 255, 0.12)" />
        <MorphingBlob className="top-20 left-[10%] bg-accent-primary" delay={0} />
        <MorphingBlob className="top-40 right-[15%] bg-[#2563eb]" delay={5} reverse={true} />
        <MorphingBlob className="bottom-[20%] left-[30%] bg-accent-violet" delay={10} />
        <ParticleField />
      </div>

      {/* Absolute scrolling text at the top of the section - with fade transform */}
      <m.div
        style={{ opacity: textOpacity, y: textY }}
        className="absolute top-0 inset-x-0 z-30 w-full max-w-7xl mx-auto px-6 pt-24 sm:pt-28 md:pt-32 lg:pt-36 flex flex-col items-start text-left pointer-events-auto"
      >
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 md:mb-6 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-700 dark:text-gray-300">Accepting New Projects</span>
        </m.div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.8rem] xl:text-[5.6rem] 2xl:text-[6.4rem] font-display font-black tracking-tighter leading-[1.04] mb-4 md:mb-6 uppercase">
          <m.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-900 dark:text-white"
          >
            We Build
          </m.div>
          <div className="py-1 min-h-[1.28em] overflow-hidden relative flex items-center">
            {showTypewriter ? (
              <AnimatePresence mode="popLayout">
                <m.div
                  key={HERO_PHRASES[phraseIndex]}
                  initial={{ y: "115%", opacity: 0, filter: "blur(5px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-115%", opacity: 0, filter: "blur(5px)" }}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="text-white whitespace-nowrap inline-block will-change-transform pr-4"
                >
                  {HERO_PHRASES[phraseIndex]}
                </m.div>
              </AnimatePresence>
            ) : (
              <span className="opacity-0 pr-4">Web Applications</span>
            )}
          </div>
        </h1>

        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6 md:mb-8 max-w-2xl"
        >
          <div className="relative pl-5 py-2 border-l-2 border-accent-primary/70 bg-gradient-to-r from-accent-primary/[0.05] to-transparent rounded-r-2xl">
            <p className="font-quicksand text-base md:text-lg text-gray-200 dark:text-gray-200 font-medium leading-relaxed tracking-wide">
              “Your website is the face of your business. The first impression you make on your potential customers is through your official website.”
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-4 h-[1px] bg-accent-primary/60" />
              <span className="text-xs uppercase tracking-[0.22em] font-bold text-accent-primary">
                Nexoraa
              </span>
              <span className="text-red-500 text-sm">❤️</span>
            </div>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center gap-4 md:gap-6 relative z-50 pointer-events-auto"
        >
          <button
            onClick={() => scrollToSection('work')}
            className="group relative px-7 py-3.5 md:px-8 md:py-4 bg-white text-black font-bold uppercase tracking-wider text-sm rounded-none overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-accent-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              View Showcase
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>

          <button
            onClick={handleStartProjectClick}
            className="group px-7 py-3.5 md:px-8 md:py-4 bg-transparent text-gray-900 dark:text-white font-bold uppercase tracking-wider text-sm border border-black/20 dark:border-white/20 transition-all duration-300 relative overflow-hidden"
          >
            {/* Hover Sweep Effect */}
            <div className="absolute inset-0 bg-black/5 dark:bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out pointer-events-none" />
            
            <span className={`flex items-center justify-center gap-2 relative z-10 pointer-events-none transition-colors duration-300`}>
              Start Project
            </span>
          </button>
        </m.div>
      </m.div>

      {/* Sticky container that contains ONLY the laptop centerpiece */}
      <div 
        className="sticky top-[20vh] h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden z-20 pointer-events-none mt-[460px]"
      >
        <div className="pointer-events-auto max-w-4xl w-full px-4 flex justify-center">
          <LaptopMockup scrollProgress={laptopProgress}>
            {(isOpen) => <LaptopScreenContent isOpen={isOpen} />}
          </LaptopMockup>
        </div>
      </div>

    </m.section>
    </>
  );
}
