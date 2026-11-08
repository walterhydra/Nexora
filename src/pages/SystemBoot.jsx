import React, { useState, useEffect } from 'react';
import { m, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Globe, Smartphone, Palette, Bot, Rocket, Briefcase, Link, TrendingUp, ArrowRight, Terminal, Mail } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import LaptopMockup from '../components/ui/LaptopMockup';

const MobilePreview = ({ step }) => {
  return (
    <div className="relative w-[130px] h-[250px] bg-white dark:bg-black rounded-[1.25rem] border-[4px] border-gray-800 overflow-hidden shadow-2xl flex flex-col transform transition-transform duration-500 hover:scale-105">
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-3 bg-gray-800 rounded-b-lg w-1/2 mx-auto z-20"></div>

      {/* Screen Content */}
      <div className="flex-1 relative w-full h-full bg-gray-950 flex flex-col p-2 pt-4 gap-2">
        {/* Step 1: Wireframe / Empty */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          className="w-full flex justify-between items-center"
        >
          <div className="w-6 h-6 rounded-full bg-gray-800 animate-pulse" />
          <div className="w-12 h-2 rounded-full bg-gray-800 animate-pulse" />
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
          transition={{ delay: 0.1 }}
          className="w-full h-20 rounded-lg bg-gray-900 border border-gray-800 animate-pulse mt-1"
        />

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2"
        >
          <div className="w-1/2 h-14 rounded-lg bg-gray-900 border border-gray-800 animate-pulse" />
          <div className="w-1/2 h-14 rounded-lg bg-gray-900 border border-gray-800 animate-pulse" />
        </m.div>

        {/* Step 2: Design System Applied (Colors & Images) */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          className="absolute inset-0 bg-[#0d0d11] p-2 pt-4 flex flex-col gap-2 pointer-events-none"
        >
          <div className="w-full flex justify-between items-center">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500" />
            <div className="w-12 h-2 bg-white/20" />
          </div>

          <div className="w-full h-20 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 relative overflow-hidden mt-1">
            <div className="absolute inset-0 bg-cyan-400/10 mix-blend-overlay"></div>
            <div className="absolute bottom-2 left-2 w-12 h-2 bg-white/80 rounded-full" />
            <div className="absolute bottom-2 right-2 w-6 h-2 bg-cyan-400 rounded-full" />
          </div>

          <div className="flex gap-2">
            <div className="w-1/2 h-14 rounded-lg bg-gray-800/80 border border-white/10 p-2 flex flex-col justify-end backdrop-blur-sm">
              <div className="w-full h-1.5 bg-white/20 rounded-full mb-1" />
              <div className="w-2/3 h-1.5 bg-white/10 rounded-full" />
            </div>
            <div className="w-1/2 h-14 rounded-lg bg-gray-800/80 border border-white/10 p-2 flex flex-col justify-end backdrop-blur-sm">
              <div className="w-full h-1.5 bg-white/20 rounded-full mb-1" />
              <div className="w-1/2 h-1.5 bg-indigo-500 rounded-full" />
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
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-20"
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
            className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </m.div>
        </m.div>

      </div>
    </div>
  );
};

export default function SystemBoot() {
  const navigate = useNavigate();
  const [selectedCore, setSelectedCore] = useState(null);
  const [isBooting, setIsBooting] = useState(false);
  const [bootStep, setBootStep] = useState('closed'); // 'closed', 'opening', 'windows-11'
  const laptopProgress = useMotionValue(0);
  const [whiteStep, setWhiteStep] = useState('text'); // 'text', 'options'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isBooting) {
      laptopProgress.set(0);
      setBootStep('closed');
      setWhiteStep('text');
      return;
    }

    setBootStep('opening');

    const controls = animate(laptopProgress, 1, {
      duration: 1.5,
      ease: [0.25, 1, 0.5, 1],
      onComplete: () => {
        setBootStep('loading');
        
        // Show loading screen for 3.5 seconds, then transition to desktop screen
        setTimeout(() => {
          setBootStep('windows-11');
          
          // Show desktop screen for 2.5 seconds, then transition to white selection screen
          setTimeout(() => {
            setBootStep('white-screen');
            setWhiteStep('text');
            
            // Wait 2.0 seconds showing selection, then transition to choices (Email vs WhatsApp)
            setTimeout(() => {
              setWhiteStep('options');
            }, 2000);
          }, 2500);
        }, 3500);
      }
    });

    return () => {
      controls.stop();
    };
  }, [isBooting, selectedCore]);

  const handleInitialize = () => {
    setIsBooting(true);
  };

  const cores = [
    { 
      id: 'web-development', 
      title: 'Web Development', 
      subtitle: 'CUSTOM WEBSITES & APPS',
      desc: 'High-converting landing pages and enterprise full-stack web applications engineered for speed, SEO, and scalability.',
      icon: Globe,
      color: 'hover:text-cyan-400',
      glow: 'bg-cyan-500/10',
      textColor: 'text-cyan-400'
    },
    { 
      id: 'app-development', 
      title: 'App Development', 
      subtitle: 'IOS & ANDROID ECOSYSTEM',
      desc: 'Cross-platform mobile apps for iOS and Android built with React Native and Flutter for smooth, native-like experiences.',
      icon: Smartphone,
      color: 'hover:text-purple-400',
      glow: 'bg-purple-500/10',
      textColor: 'text-purple-400'
    },
    { 
      id: 'brand-design', 
      title: 'Brand & Design', 
      subtitle: 'VISUAL IDENTITY & UI/UX',
      desc: 'Cohesive brand identities and stunning UI/UX designs in Figma strategically crafted to convert users into loyal customers.',
      icon: Palette,
      color: 'hover:text-pink-400',
      glow: 'bg-pink-500/10',
      textColor: 'text-pink-400'
    },
    { 
      id: 'automation-ai', 
      title: 'Automation & AI', 
      subtitle: 'SMART WORKFLOWS',
      desc: 'Leverage cutting-edge AI chatbots and custom Make/Zapier automations to streamline business operations and save 10+ hours/week.',
      icon: Bot,
      color: 'hover:text-red-400',
      glow: 'bg-red-500/10',
      textColor: 'text-red-400'
    },
    { 
      id: 'deployment-devops', 
      title: 'Deployment & DevOps', 
      subtitle: 'CLOUD INFRASTRUCTURE',
      desc: 'Zero-downtime server setups, Docker containerization, and CI/CD pipelines ensuring your app is fast, secure, and always live.',
      icon: Rocket,
      color: 'hover:text-blue-400',
      glow: 'bg-blue-500/10',
      textColor: 'text-blue-400'
    },
    { 
      id: 'full-website-package', 
      title: 'Full Website Package', 
      subtitle: 'ALL-IN-ONE SOLUTION',
      desc: 'From blank page to a fully functional, branded, and SEO-optimized website launched in just 7 days with complete code ownership.',
      icon: Briefcase,
      color: 'hover:text-emerald-400',
      glow: 'bg-emerald-500/10',
      textColor: 'text-emerald-400'
    },
    { 
      id: 'api-integrations', 
      title: 'API Integrations', 
      subtitle: 'SYSTEM CONNECTIVITY',
      desc: 'Seamlessly connect payment gateways (Razorpay/Stripe), CRMs, and third-party tools so data flows smoothly across your platforms.',
      icon: Link,
      color: 'hover:text-amber-400',
      glow: 'bg-amber-500/10',
      textColor: 'text-amber-400'
    },
    { 
      id: 'seo-performance', 
      title: 'SEO & Performance', 
      subtitle: 'GROWTH & OPTIMIZATION',
      desc: 'Rank higher and load faster with advanced Core Web Vitals optimization, technical SEO fixes, and structured schema data.',
      icon: TrendingUp,
      color: 'hover:text-indigo-400',
      glow: 'bg-indigo-500/10',
      textColor: 'text-indigo-400'
    },
  ];

  const activeCoreData = cores.find(c => c.id === selectedCore);
  const selectedCoreName = activeCoreData ? activeCoreData.title : 'NEXORAA CORE';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans selection:bg-white selection:text-black overflow-hidden flex">
      {/* Main Layout - Split Screen */}
      <div className="flex-1 flex flex-col lg:flex-row w-full h-screen">
        
        {/* Left Panel - Sticky/Fixed Info */}
        <m.div 
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="lg:w-[40%] bg-[#111] h-full p-8 md:p-16 flex flex-col justify-between relative border-r border-[#222] z-10 overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className={`absolute top-[-20%] left-[-20%] w-[140%] h-[140%] blur-[120px] transition-colors duration-1000 pointer-events-none ${activeCoreData ? activeCoreData.glow : 'bg-white/5'}`} />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-12 lg:mb-16">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse transition-colors duration-500 ${activeCoreData ? 'bg-green-500' : 'bg-white'}`} />
                <span className="text-xs font-mono tracking-[0.2em] uppercase text-gray-400">
                  {activeCoreData ? 'System Ready' : 'Environment Active'}
                </span>
              </div>
              <Terminal size={16} className="text-gray-600" />
            </div>
            
            <div className="overflow-hidden">
              <m.h2 
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]"
              >
                Select<br/>
                <span className="text-gray-500">Core</span><br/>
                System
              </m.h2>
            </div>
            
            <m.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-8 text-gray-400 max-w-sm text-lg leading-relaxed"
            >
              Initialize your project architecture by selecting a primary development environment. Each core is optimized for specific performance metrics.
            </m.p>

            {/* Dynamic Terminal Output - NEW FEATURE */}
            <div className="mt-8 lg:mt-12 p-4 border border-[#333] bg-[#0a0a0a]/80 backdrop-blur-sm rounded-lg font-mono text-[10px] sm:text-xs text-gray-500 min-h-[110px] flex flex-col justify-end overflow-hidden shadow-inner relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#333] to-transparent opacity-50" />
              <AnimatePresence mode="wait">
                {activeCoreData ? (
                  <m.div 
                    key={activeCoreData.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`space-y-1 ${activeCoreData.textColor}`}
                  >
                    <p>&gt; MOUNTING {activeCoreData.subtitle}...</p>
                    <p>&gt; VERIFYING PROTOCOLS...</p>
                    <p>&gt; <span className="text-white">STATUS: OPTIMAL</span></p>
                    <p className="animate-pulse mt-2 block opacity-70">&gt; _</p>
                  </m.div>
                ) : (
                  <m.div 
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-1"
                  >
                    <p>&gt; SYSTEM IDLE</p>
                    <p>&gt; AWAITING CORE SELECTION...</p>
                    <p className="animate-pulse mt-2 block">&gt; _</p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative z-10 mt-8 lg:mt-0"
          >
            <button
              onClick={handleInitialize}
              disabled={!selectedCore}
              className={`group flex items-center justify-between w-full p-6 border transition-all duration-500 ${
                selectedCore 
                  ? 'border-white text-black bg-white hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.15)]' 
                  : 'border-[#333] text-gray-600 cursor-not-allowed'
              }`}
            >
              <span className="font-bold tracking-widest uppercase text-sm">
                Deploy Configuration
              </span>
              <ArrowRight className={`transition-transform duration-500 ${selectedCore ? 'group-hover:translate-x-2' : ''}`} />
            </button>
          </m.div>
        </m.div>

        {/* Right Panel - Scrollable Options */}
        <div data-lenis-prevent="true" className="lg:w-[60%] h-full bg-[#0a0a0a] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent p-8 md:p-16 pb-32 relative z-0">
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="flex flex-col gap-6 max-w-3xl mx-auto pt-12 pb-48 relative z-10">
            <AnimatePresence>
              {cores.map((core, index) => {
                const isSelected = selectedCore === core.id;
                const Icon = core.icon;

                return (
                  <m.div
                    key={core.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + (index * 0.15), ease: [0.76, 0, 0.24, 1] }}
                  >
                    <button
                      onClick={() => setSelectedCore(core.id)}
                      className={`w-full text-left p-8 md:p-10 border transition-all duration-500 relative overflow-hidden group ${
                        isSelected 
                          ? 'border-white bg-[#151515] scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.05)]' 
                          : 'border-[#222] hover:border-[#444] bg-[#0a0a0a]/50 backdrop-blur-sm'
                      }`}
                    >
                      {/* Animated Background Block */}
                      <div className={`absolute top-0 right-0 h-full w-1 bg-white transition-transform duration-500 origin-bottom ${
                        isSelected ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100 group-hover:bg-[#444]'
                      }`} />

                      {/* Scanning Line Effect on Select */}
                      <div className={`absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-300 pointer-events-none z-20 ${isSelected ? 'opacity-20 animate-scan' : ''}`} />

                      {/* Optional subtle background glow on selection */}
                      <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${isSelected ? core.glow : 'opacity-0'}`} />

                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <p className="text-xs font-mono tracking-[0.2em] text-gray-500">
                              0{index + 1} // {core.subtitle}
                            </p>
                            {isSelected && (
                              <span className="px-2 py-0.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-[9px] font-bold tracking-widest animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                                SECURE
                              </span>
                            )}
                          </div>
                          
                          <h3 className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 transition-colors duration-500 ${isSelected ? 'text-white' : `text-gray-300 group-hover:text-white`}`}>
                            {core.title}
                          </h3>
                          <p className={`leading-relaxed max-w-lg transition-colors duration-500 ${isSelected ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-400'}`}>
                            {core.desc}
                          </p>
                          
                          {/* Metrics / Diagnostics (only visible when selected) */}
                          <AnimatePresence>
                            {isSelected && (
                              <m.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 pt-6 border-t border-[#333] grid grid-cols-2 gap-6 overflow-hidden"
                              >
                                <div>
                                  <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-2">
                                    <span>SYS.LOAD</span>
                                    <span className={core.textColor}>OPTIMAL</span>
                                  </div>
                                  <div className="h-1 bg-[#222] rounded-full overflow-hidden relative">
                                    <m.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: '100%' }}
                                      transition={{ duration: 1.5, ease: "easeOut" }}
                                      className={`absolute top-0 left-0 h-full bg-current opacity-70 ${core.textColor}`} 
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-2">
                                    <span>LATENCY</span>
                                    <span className={core.textColor}>12ms</span>
                                  </div>
                                  <div className="h-1 bg-[#222] rounded-full overflow-hidden relative">
                                    <m.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: '12%' }}
                                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                      className={`absolute top-0 left-0 h-full bg-current opacity-70 ${core.textColor}`} 
                                    />
                                  </div>
                                </div>
                              </m.div>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        <div className={`w-16 h-16 shrink-0 rounded-full border flex items-center justify-center transition-all duration-700 ${
                          isSelected ? `border-transparent bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] scale-110` : 'border-[#333] text-gray-500 group-hover:border-white group-hover:text-white'
                        }`}>
                          <Icon size={24} className={isSelected ? 'animate-pulse' : ''} />
                        </div>
                      </div>
                    </button>
                  </m.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
        
      </div>

      {/* Laptop Boot Sequence Overlay */}
      <AnimatePresence>
        {isBooting && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[#050505]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 overflow-hidden"
          >
            {/* Tech Ambient Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Header Status indicator */}
            <div className="absolute top-8 left-8 right-8 flex items-center justify-between font-mono text-[10px] sm:text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <span>VIRTUAL DEPLOYMENT ENVIRONMENT ACTIVE</span>
              </div>
              <button 
                onClick={() => { setIsBooting(false); setBootStep('closed'); }}
                className="px-3 py-1 border border-white/10 rounded hover:bg-white/5 transition-colors text-white"
              >
                CANCEL DEPLOY
              </button>
            </div>

            {/* Laptop Frame Wrapper */}
            <div className="pointer-events-auto max-w-3xl w-full px-4 flex justify-center scale-[0.6] sm:scale-[0.8] md:scale-100 transition-transform origin-center">
              <LaptopMockup scrollProgress={laptopProgress} onOpenComplete={() => {}}>
                <div className="absolute inset-0 bg-[#0c0d12] overflow-hidden flex items-center justify-center">
                  
                  {/* Windows Loading Boot Screen */}
                  {bootStep === 'loading' && (
                    <m.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
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

                  {/* Desktop Screen showing image copy 2.png */}
                  <m.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: bootStep === 'windows-11' ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 z-10"
                  >
                    <img 
                      src="/projects/image copy 2.png" 
                      alt="System Desktop" 
                      className={`w-full !h-full block object-fill`}
                      style={{ objectFit: 'fill', height: '100%' }}
                    />
                  </m.div>

                  {/* Full White Screen with Nexora Stamp Sticker & choices */}
                  {bootStep === 'white-screen' && (
                    <m.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white z-30 flex flex-col items-center justify-center relative overflow-hidden"
                    >
                      {/* Stamp watermark stickers tilted in the background */}
                      <div className="absolute -bottom-8 -right-8 w-44 h-44 opacity-15 pointer-events-none select-none rotate-[-15deg]">
                        <img 
                          src="/projects/stamp.png" 
                          alt="Nexora Sticker" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="absolute -top-12 -left-12 w-40 h-40 opacity-[0.10] pointer-events-none select-none rotate-[25deg]">
                        <img 
                          src="/projects/stamp.png" 
                          alt="Nexora Sticker" 
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* STEP A: Show the selected service name */}
                      {whiteStep === 'text' && (
                        <m.h2 
                          key="selected-text"
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="text-black font-black uppercase tracking-tighter text-2xl sm:text-3xl md:text-4xl text-center px-6 leading-tight select-none z-10 font-sans"
                        >
                          {selectedCoreName}
                        </m.h2>
                      )}

                      {/* STEP B: Show Book Options (Open Book layout) */}
                      {whiteStep === 'options' && (
                        <m.div 
                          key="book-options"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full h-full flex flex-row items-center justify-center p-4 sm:p-6 gap-3 sm:gap-4 z-10"
                        >
                          {/* Page 1: Book via Email */}
                          <m.div 
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                              setIsBooting(false);
                              setBootStep('closed');
                              navigate('/contact?core=' + (selectedCore || 'standard'));
                            }}
                            className="w-1/2 h-[75%] border border-black/10 hover:border-black/30 bg-gray-50/50 hover:bg-gray-50 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 shadow-sm relative overflow-hidden group select-none"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black text-white rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                              <Mail size={18} className="sm:size-[20px]" />
                            </div>
                            <h3 className="text-black font-black uppercase text-[10px] sm:text-xs tracking-wider mb-1">Book via Email</h3>
                            <p className="text-gray-500 text-[8px] sm:text-[9px] font-medium leading-normal max-w-[120px] sm:max-w-[140px]">
                              Send structured specifications via secure form.
                            </p>
                          </m.div>

                          {/* Page 2: Book via WhatsApp */}
                          <m.div 
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                              setIsBooting(false);
                              setBootStep('closed');
                              const waMessage = encodeURIComponent(`Hi Nexoraa, I'm interested in booking the ${selectedCoreName} service. Let's discuss details!`);
                              window.open(`https://wa.me/917383303388?text=${waMessage}`, '_blank');
                            }}
                            className="w-1/2 h-[75%] border border-black/10 hover:border-black/30 bg-gray-50/50 hover:bg-gray-50 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 shadow-sm relative overflow-hidden group select-none"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#25d366] text-white rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.448L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.381 9.805-9.768.001-2.61-1.01-5.059-2.846-6.896C16.398 2.103 13.957.9 11.36.9c-5.412 0-9.816 4.39-9.818 9.778a9.664 9.664 0 0 0 1.485 5.03L2.012 22.03l6.59-1.743c.046-.002-.132.072.045-.033z"/>
                              </svg>
                            </div>
                            <h3 className="text-black font-black uppercase text-[10px] sm:text-xs tracking-wider mb-1">Book via WhatsApp</h3>
                            <p className="text-gray-500 text-[8px] sm:text-[9px] font-medium leading-normal max-w-[120px] sm:max-w-[140px]">
                              Connect instantly with our lead agent on mobile.
                            </p>
                          </m.div>

                        </m.div>
                      )}
                    </m.div>
                  )}

                </div>
              </LaptopMockup>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Global CSS for SystemBoot specific animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 0.3; }
          50% { top: 100%; opacity: 0.3; }
          90% { opacity: 0; }
          100% { top: 0; opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }

        /* Windows Classic Dotted Spinner Animation */
        .windows-spinner {
          position: relative;
          width: 32px;
          height: 32px;
        }
        .windows-spinner .dot {
          position: absolute;
          width: 3px;
          height: 3px;
          background: white;
          border-radius: 50%;
          left: 14.5px;
          top: 0;
          transform-origin: 1.5px 16px;
          animation: win-spin 3.5s infinite ease-in-out;
          opacity: 0;
        }
        .windows-spinner .dot:nth-child(1) { animation-delay: 0.15s; }
        .windows-spinner .dot:nth-child(2) { animation-delay: 0.3s; }
        .windows-spinner .dot:nth-child(3) { animation-delay: 0.45s; }
        .windows-spinner .dot:nth-child(4) { animation-delay: 0.6s; }
        .windows-spinner .dot:nth-child(5) { animation-delay: 0.75s; }

        @keyframes win-spin {
          0% { transform: rotate(0deg); opacity: 1; }
          5% { transform: rotate(0deg); }
          70% { transform: rotate(720deg); opacity: 1; }
          75% { transform: rotate(720deg); opacity: 0; }
          100% { transform: rotate(810deg); opacity: 0; }
        }
      `}} />
    </div>
  );
}
