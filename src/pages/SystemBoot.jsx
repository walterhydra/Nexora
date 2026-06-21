import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Globe, Cpu, Network, ArrowRight } from 'lucide-react';

export default function SystemBoot() {
  const navigate = useNavigate();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [selectedCore, setSelectedCore] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 4) + 1;
      
      if (progress >= 100) {
        progress = 100;
        setLoadingProgress(progress);
        clearInterval(interval);
        
        // Sequence: Complete load -> wait -> open layout -> show options
        setTimeout(() => setIsBootComplete(true), 600);
        setTimeout(() => setShowOptions(true), 1400);
      } else {
        setLoadingProgress(progress);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleInitialize = () => {
    navigate('/contact?core=' + (selectedCore || 'standard'));
  };

  const cores = [
    { 
      id: 'web', 
      title: 'Digital Platforms', 
      subtitle: 'WEB ARCHITECTURE',
      desc: 'Scalable web applications engineered for peak performance and immersive user experiences.',
      icon: Globe,
      color: 'hover:text-cyan-400'
    },
    { 
      id: 'mobile', 
      title: 'Native Applications', 
      subtitle: 'MOBILE ECOSYSTEM',
      desc: 'Seamless mobile experiences bridging the gap between users and your digital ecosystem.',
      icon: Cpu,
      color: 'hover:text-purple-400'
    },
    { 
      id: 'ai', 
      title: 'Machine Intelligence', 
      subtitle: 'AI INTEGRATION',
      desc: 'Advanced neural networks and automation systems designed to amplify human capability.',
      icon: Network,
      color: 'hover:text-red-400'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans selection:bg-white selection:text-black overflow-hidden flex">
      
      <AnimatePresence>
        {!isBootComplete && (
          <m.div 
            key="loader"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-col items-center">
              <div className="overflow-hidden mb-4">
                <m.h1 
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                  className="text-6xl md:text-8xl font-black tracking-tighter uppercase"
                >
                  NEXORAA
                </m.h1>
              </div>
              <div className="w-64 h-[2px] bg-[#222] overflow-hidden">
                <m.div 
                  className="h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <div className="mt-4 font-mono text-sm tracking-widest text-gray-500 flex justify-between w-64">
                <span>SYSTEM BOOT</span>
                <span>{loadingProgress}%</span>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Main Layout - Split Screen */}
      <div className="flex-1 flex flex-col lg:flex-row w-full h-screen">
        
        {/* Left Panel - Sticky/Fixed Info */}
        <m.div 
          initial={{ x: "-100%" }}
          animate={{ x: isBootComplete ? "0%" : "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          className="lg:w-[40%] bg-[#111] h-full p-8 md:p-16 flex flex-col justify-between relative border-r border-[#222] z-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-16">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-gray-400">Environment Active</span>
            </div>
            
            <div className="overflow-hidden">
              <m.h2 
                initial={{ y: "100%" }}
                animate={{ y: showOptions ? "0%" : "100%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]"
              >
                Select<br/>
                <span className="text-gray-500">Core</span><br/>
                System
              </m.h2>
            </div>
            
            <m.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: showOptions ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-8 text-gray-400 max-w-sm text-lg leading-relaxed"
            >
              Initialize your project architecture by selecting a primary development environment. Each core is optimized for specific performance metrics.
            </m.p>
          </div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showOptions ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <button
              onClick={handleInitialize}
              disabled={!selectedCore}
              className={`group flex items-center justify-between w-full p-6 border transition-all duration-500 ${
                selectedCore 
                  ? 'border-white text-black bg-white hover:bg-gray-200' 
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
        <div className="lg:w-[60%] h-full bg-[#0a0a0a] overflow-y-auto p-8 md:p-16">
          <div className="flex flex-col gap-6 max-w-3xl mx-auto py-12">
            <AnimatePresence>
              {showOptions && cores.map((core, index) => {
                const isSelected = selectedCore === core.id;
                const Icon = core.icon;

                return (
                  <m.div
                    key={core.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 + (index * 0.15), ease: [0.76, 0, 0.24, 1] }}
                  >
                    <button
                      onClick={() => setSelectedCore(core.id)}
                      className={`w-full text-left p-8 md:p-10 border transition-all duration-500 relative overflow-hidden group ${
                        isSelected 
                          ? 'border-white bg-[#151515]' 
                          : 'border-[#222] hover:border-[#444] bg-transparent'
                      }`}
                    >
                      {/* Animated Background Block */}
                      <div className={`absolute top-0 right-0 h-full w-2 bg-white transition-transform duration-500 origin-bottom ${
                        isSelected ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100 group-hover:bg-[#333]'
                      }`} />

                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                        <div className="flex-1">
                          <p className="text-xs font-mono tracking-[0.2em] text-gray-500 mb-4">
                            0{index + 1} // {core.subtitle}
                          </p>
                          <h3 className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 transition-colors duration-500 ${isSelected ? 'text-white' : `text-gray-300 ${core.color}`}`}>
                            {core.title}
                          </h3>
                          <p className="text-gray-500 leading-relaxed max-w-lg">
                            {core.desc}
                          </p>
                        </div>
                        
                        <div className={`w-16 h-16 shrink-0 rounded-full border flex items-center justify-center transition-all duration-500 ${
                          isSelected ? 'border-white bg-white text-black' : 'border-[#333] text-gray-500 group-hover:border-white group-hover:text-white'
                        }`}>
                          <Icon size={24} />
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
    </div>
  );
}

