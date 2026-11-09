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
import { getScroll } from '../../utils/scroll';

const MobilePreview = React.memo(({ step }) => {
  return (
    <div className="relative w-[140px] h-[280px] sm:w-[160px] sm:h-[320px] md:w-[180px] md:h-[360px] bg-white dark:bg-black rounded-[1.5rem] md:rounded-[2rem] border-[4px] md:border-[6px] border-gray-800 overflow-hidden shadow-2xl flex flex-col transform transition-transform duration-500 hover:scale-105">
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-3 md:h-4 bg-gray-800 rounded-b-lg md:rounded-b-xl w-1/2 mx-auto z-20"></div>

      {/* Screen Content */}
      <div className="flex-1 relative w-full h-full bg-gray-950 flex flex-col p-2 md:p-3 pt-5 md:pt-6 gap-2 md:gap-3">
        {/* Step 1: Wireframe / Empty */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          className="w-full flex justify-between items-center"
        >
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-800 animate-pulse" />
          <div className="w-12 h-2 md:w-16 md:h-3 rounded-full bg-gray-800 animate-pulse" />
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
          transition={{ delay: 0.1 }}
          className="w-full h-24 md:h-32 rounded-lg md:rounded-xl bg-gray-900 border border-gray-800 animate-pulse mt-1 md:mt-2"
        />

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2"
        >
          <div className="w-1/2 h-16 md:h-20 rounded-lg md:rounded-xl bg-gray-900 border border-gray-800 animate-pulse" />
          <div className="w-1/2 h-16 md:h-20 rounded-lg md:rounded-xl bg-gray-900 border border-gray-800 animate-pulse" />
        </m.div>

        {/* Step 2: Design System Applied (Colors & Images) */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          className="absolute inset-0 bg-bg-primary p-2 md:p-3 pt-5 md:pt-6 flex flex-col gap-2 md:gap-3 pointer-events-none"
        >
          <div className="w-full flex justify-between items-center">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary" />
            <div className="w-12 h-2 md:w-16 md:h-3 rounded-full bg-black/20 dark:bg-white/20" />
          </div>

          <div className="w-full h-24 md:h-32 rounded-lg md:rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-black/10 dark:border-white/10 relative overflow-hidden mt-1 md:mt-2">
            <div className="absolute inset-0 bg-accent-primary/10 mix-blend-overlay"></div>
            <div className="absolute bottom-2 left-2 w-12 md:w-16 h-2 md:h-3 bg-white/80 rounded-full" />
            <div className="absolute bottom-2 right-2 w-6 md:w-8 h-2 md:h-3 bg-accent-primary rounded-full" />
          </div>

          <div className="flex gap-2">
            <div className="w-1/2 h-16 md:h-20 rounded-lg md:rounded-xl bg-gray-800/80 border border-black/10 dark:border-white/10 p-2 flex flex-col justify-end backdrop-blur-sm">
              <div className="w-full h-1.5 md:h-2 bg-black/20 dark:bg-white/20 rounded-full mb-1" />
              <div className="w-2/3 h-1.5 md:h-2 bg-black/10 dark:bg-white/10 rounded-full" />
            </div>
            <div className="w-1/2 h-16 md:h-20 rounded-lg md:rounded-xl bg-gray-800/80 border border-black/10 dark:border-white/10 p-2 flex flex-col justify-end backdrop-blur-sm">
              <div className="w-full h-1.5 md:h-2 bg-black/20 dark:bg-white/20 rounded-full mb-1" />
              <div className="w-1/2 h-1.5 md:h-2 bg-accent-secondary rounded-full" />
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
            animate={{ y: [0, 240, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 right-0 h-0.5 bg-accent-secondary shadow-[0_0_15px_rgba(139,92,246,0.9)] z-20 will-change-transform"
          />
          <div className="absolute inset-0 bg-accent-secondary/10 mix-blend-overlay animate-pulse z-10"></div>
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
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </m.div>
        </m.div>

      </div>
    </div>
  );
});

const LaptopScreenContent = React.memo(function LaptopScreenContent({ isOpen }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
    }
  }, [isOpen]);

  return (
    <div className="w-full h-full flex bg-bg-tertiary">
      {/* Left Side: Code Editor */}
      <div className="w-3/5 h-full p-4 md:p-6 font-mono text-[10px] sm:text-xs md:text-sm text-gray-700 dark:text-gray-300 flex flex-col overflow-hidden text-left whitespace-pre-wrap leading-relaxed border-r border-white/5">
        {isOpen ? (
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .pauseFor(200)
                .changeDelay(15)
                .pasteString('<span style="color:#6B7280">// Initialize Engine</span><br/>')
                .pasteString('<span style="color:#C678DD">import</span> { createProject, deploy, injectAI } <span style="color:#C678DD">from</span> <span style="color:#98C379">\'@nexoraa/core\'</span>;<br/>')
                .pasteString('<span style="color:#C678DD">import</span> { applyDesign } <span style="color:#C678DD">from</span> <span style="color:#98C379">\'@nexoraa/ui\'</span>;<br/><br/>')
                .callFunction(() => setStep(1)) // Show Wireframe
                .pasteString('<span style="color:#C678DD">const</span> project = createProject({<br/>')
                .pasteString('  <span style="color:#E06C75">client</span>: <span style="color:#98C379">\'Next Big Thing\'</span>,<br/>')
                .pasteString('  <span style="color:#E06C75">stack</span>: [<span style="color:#98C379">\'React\'</span>, <span style="color:#98C379">\'Framer\'</span>],<br/>')
                .pasteString('  <span style="color:#E06C75">quality</span>: <span style="color:#98C379">\'Ultra-Premium\'</span><br/>')
                .pasteString('});<br/><br/>')
                .typeString('<span style="color:#61AFEF">console</span>.log(<span style="color:#98C379">\'Applying UI...\'</span>);<br/>')
                .pasteString('<span style="color:#C678DD">await</span> applyDesign(project);<br/><br/>')
                .pauseFor(250)
                .callFunction(() => setStep(2)) // Show Design
                .typeString('<span style="color:#61AFEF">console</span>.log(<span style="color:#98C379">\'Integrating AI Agents...\'</span>);<br/>')
                .pasteString('<span style="color:#C678DD">await</span> injectAI({ <span style="color:#E06C75">mode</span>: <span style="color:#98C379">\'autonomous\'</span> });<br/><br/>')
                .pauseFor(250)
                .callFunction(() => setStep(3)) // Show AI Scanning State
                .typeString('<span style="color:#61AFEF">console</span>.log(<span style="color:#98C379">\'Deploying...\'</span>);<br/>')
                .pasteString('<span style="color:#C678DD">await</span> deploy(project);<br/><br/>')
                .pauseFor(250)
                .callFunction(() => setStep(4)) // Show Success
                .typeString('<span style="color:#00F5FF">> ✨ Live.</span>')
                .start();
            }}
            options={{
              cursor: '█',
              cursorClassName: 'text-accent-primary animate-pulse'
            }}
          />
        ) : (
          <div className="text-gray-500 font-mono text-xs opacity-40 select-none">
            // System Ready. Scroll down to inspect architecture...
          </div>
        )}
      </div>

      {/* Right Side: Mobile UI Preview */}
      <div className="w-2/5 h-full relative flex items-center justify-center p-2 sm:p-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 to-bg-tertiary">
        <MobilePreview step={step} />
      </div>
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
