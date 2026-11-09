import React, { useState, useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import { 
  Globe, 
  Smartphone, 
  Palette, 
  Bot, 
  Rocket, 
  Briefcase, 
  Link as LinkIcon, 
  TrendingUp, 
  CheckCircle2, 
  Zap, 
  Clock 
} from 'lucide-react';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { services } from '../../constants/services';

const iconMap = {
  Globe, Smartphone, Palette, Bot, Rocket, Briefcase, Link: LinkIcon, TrendingUp
};

export default function Services() {
  const [active, setActive] = useState(null); // null means all cards are closed until hovered
  const hoverTimeoutRef = useRef(null);

  // Clean up any lingering hover timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (index) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    // 35ms micro-debounce prevents layout thrashing when mouse sweeps rapidly across cards
    hoverTimeoutRef.current = setTimeout(() => {
      setActive(index);
    }, 35);
  };

  const handleMouseLeaveContainer = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActive(null);
  };

  const handleClick = (index) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActive((prev) => (prev === index ? null : index));
  };

  return (
    <section id="services" className="py-24 md:py-32 relative bg-black overflow-hidden font-display">
      {/* Neutral Hardware-accelerated ambient lighting */}
      <div 
        className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', transform: 'translateZ(0)' }} 
      />
      <div 
        className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)', transform: 'translateZ(0)' }} 
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header - Elite Studio Grade Monochrome White & Shade Typography */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-14 md:mb-20 flex flex-col items-center text-center relative"
        >
          {/* Neutral Monochrome Studio Glow behind Header */}
          <div 
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-[600px] h-[280px] pointer-events-none -z-10 blur-[110px] opacity-60"
            style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, transparent 75%)' }}
          />

          {/* Micro Category Pill Badge (Clean Monochrome) */}
          <m.div 
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.22em] text-white/70">
              Core Capabilities
            </span>
          </m.div>

          {/* Main Title - Pure White & Animated Shaded Metallic Shimmer */}
          <m.h2 
            variants={fadeUp} 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-jakarta font-bold tracking-[-0.02em] mb-6 leading-[1.08] text-white drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] cursor-default select-none"
            style={{ fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
          >
            <span 
              className="text-transparent bg-clip-text inline-block"
              style={{
                backgroundImage: 'linear-gradient(115deg, #ffffff 0%, #a1a1aa 25%, #ffffff 50%, #71717a 75%, #ffffff 100%)',
                backgroundSize: '200% 100%',
                animation: 'metallic-shimmer 4.5s ease-in-out infinite',
              }}
            >
              What We Build
            </span>
          </m.h2>

          {/* Subtitle */}
          <m.p 
            variants={fadeUp} 
            className="text-base sm:text-lg text-white/65 max-w-2xl font-display font-normal leading-relaxed"
          >
            Modern websites, mobile apps, and AI automations — everything you need to grow and scale your business.
          </m.p>
        </m.div>

        {/* 120 FPS Flex Accordion Container */}
        <div 
          onMouseLeave={handleMouseLeaveContainer}
          className="flex flex-col lg:flex-row w-full h-[85vh] min-h-[720px] lg:h-[650px] gap-2 lg:gap-3 p-3 pb-6 lg:p-3.5 lg:pb-7 bg-[#111116] rounded-[2rem] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden relative"
          style={{ transform: 'translateZ(0)' }}
        >
          {services.map((service, index) => {
            const isActive = active === index;
            const Icon = iconMap[service.icon] || Globe;

            return (
              <div
                key={service.id}
                onClick={() => handleClick(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                className={`relative overflow-hidden h-full rounded-[1.5rem] cursor-pointer min-w-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[flex-grow] group ${
                  isActive 
                    ? 'flex-[6] lg:flex-[6] border border-white/20' 
                    : 'flex-[1] lg:flex-[1] border border-white/[0.08] hover:border-white/25'
                }`}
                style={{ 
                  transform: 'translateZ(0)', 
                  contain: 'layout paint',
                  boxShadow: isActive 
                    ? '0 25px 45px -5px rgba(0, 0, 0, 0.98), 0 12px 20px -3px rgba(0, 0, 0, 0.9)' 
                    : '0 16px 30px -4px rgba(0, 0, 0, 0.95), 0 8px 16px -2px rgba(0, 0, 0, 0.85)'
                }}
              >
                {/* Background Image - Fits 100% of the box, clean all the way to bottom */}
                <div 
                  className={`absolute inset-0 w-full h-full bg-cover bg-center origin-center transition-transform duration-700 ease-out pointer-events-none select-none ${
                    isActive ? 'scale-105' : 'scale-100 group-hover:scale-105'
                  }`}
                  style={{ 
                    backgroundImage: `url(${service.image})`,
                    transform: 'translateZ(0)'
                  }}
                />

                {/* Subtle Inset Vignette Frame - Soft edge shade on active & closed */}
                <div 
                  className={`absolute inset-0 pointer-events-none z-[4] transition-all duration-500 rounded-[1.5rem] ${
                    isActive 
                      ? 'shadow-[inset_0_0_25px_rgba(0,0,0,0.7)]' 
                      : 'shadow-[inset_0_0_15px_rgba(0,0,0,0.4)]'
                  }`} 
                />

                {/* CLOSED STATE SHADING: Clean photo top-to-bottom, no inside bottom black mask */}
                <div
                  className={`absolute inset-0 pointer-events-none z-[2] transition-opacity duration-500 ease-out ${
                    isActive ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  {/* Subtle dark tint over full photo */}
                  <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors duration-300" />
                  {/* Gentle top shade for icon */}
                  <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/50 to-transparent" />
                </div>

                {/* OPEN STATE SHADING: Full photo visible with smooth bottom shade for text */}
                <div
                  className={`absolute inset-0 pointer-events-none z-[2] transition-opacity duration-500 ease-out ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {/* Bottom text shade (only covers lower text area, photo shines on top) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 via-45% to-transparent" />
                  {/* Gentle top shade for header border */}
                  <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
                </div>

                {/* Top Subtle Border Highlight for Active Card */}
                <div 
                  className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-[5] pointer-events-none transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`} 
                />

                {/* Content Container - Zero DOM mount/unmount lag */}
                <div className="relative z-10 w-full h-full font-display pointer-events-none">
                  
                  {/* ACTIVE EXPANDED CONTENT */}
                  <div 
                    className={`absolute inset-0 p-5 md:p-7 lg:p-8 flex flex-col justify-end transition-all duration-300 ease-out ${
                      isActive 
                        ? 'opacity-100 translate-y-0 pointer-events-auto delay-100' 
                        : 'opacity-0 translate-y-3 pointer-events-none'
                    }`}
                  >
                    <div className="flex flex-col gap-3 md:gap-4 w-[520px] max-w-[calc(100vw-4rem)]">
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-11 h-11 lg:w-13 lg:h-13 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white shadow-lg shrink-0">
                            <Icon size={24} className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-white tracking-tight">
                              {service.title}
                            </h3>
                            <span className="text-xs uppercase tracking-[0.18em] font-mono font-medium text-white/75">
                              {service.description}
                            </span>
                          </div>
                        </div>

                        {/* Delivery Sprint Badge */}
                        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 shrink-0">
                          <Zap size={13} className="text-white" />
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">7-Day Sprint</span>
                        </div>
                      </div>
                      
                      {/* Detailed Description */}
                      <p className="font-display text-white/90 text-sm md:text-base leading-relaxed pr-2 max-w-2xl font-normal">
                        {service.details}
                      </p>

                      {/* What's Included / Deliverables Checklist */}
                      <div className="mt-1 pt-3.5 border-t border-white/15">
                        <div className="flex items-center gap-2 mb-2.5">
                          <Clock size={13} className="text-white" />
                          <span className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-white">
                            What You Get:
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl">
                          {service.deliverables.slice(0, 4).map((del, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-white/90 font-display font-medium">
                              <CheckCircle2 size={15} className="text-white shrink-0" />
                              <span className="truncate">{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        {service.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-[11px] font-mono font-medium text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* INACTIVE COLLAPSED CONTENT */}
                  <div 
                    className={`absolute inset-0 p-5 md:p-7 lg:p-8 flex lg:flex-col items-center justify-center lg:justify-end pb-0 lg:pb-8 transition-opacity duration-300 ease-out ${
                      !isActive 
                        ? 'opacity-100 pointer-events-auto delay-75' 
                        : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    {/* Desktop Vertical Title */}
                    <div className="hidden lg:flex flex-col items-center justify-center h-full">
                      <Icon size={20} className="text-white mb-6 shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" />
                      <h3 
                        className="text-lg xl:text-xl font-display font-black uppercase tracking-[0.2em] whitespace-nowrap text-white transition-colors duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        {service.title}
                      </h3>
                    </div>
                    
                    {/* Mobile Horizontal Title */}
                    <div className="flex lg:hidden items-center gap-3 w-full pl-2">
                      <Icon size={20} className="text-white shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" />
                      <h3 className="text-sm md:text-base font-display font-bold uppercase tracking-wider text-white truncate drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}

          {/* Subtle ambient black shade along the bottom floor of the container, outside the boxes */}
          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none rounded-b-[2rem] z-20" />
        </div>

      </div>
    </section>
  );
}
