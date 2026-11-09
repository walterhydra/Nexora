import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
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

  return (
    <section id="services" className="py-24 md:py-32 relative bg-black overflow-hidden font-quicksand">
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
        
        {/* Header */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-12 md:mb-16 flex flex-col items-center text-center font-quicksand"
        >
          <m.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-quicksand font-bold mb-6 leading-tight text-white">
            Asset Architecture
          </m.h2>
          <m.p variants={fadeUp} className="text-lg text-white/80 max-w-2xl font-quicksand font-medium">
            High-performance digital assets designed to optimize operations, capture demand, and compound enterprise equity.
          </m.p>
        </m.div>

        {/* 120 FPS Flex Accordion Container */}
        <div 
          onMouseLeave={() => setActive(null)}
          className="flex flex-col lg:flex-row w-full h-[85vh] min-h-[720px] lg:h-[650px] gap-2 lg:gap-3 p-2 lg:p-3 bg-black rounded-[2rem] border-2 border-black shadow-2xl overflow-hidden font-quicksand"
          style={{ transform: 'translateZ(0)' }}
        >
          {services.map((service, index) => {
            const isActive = active === index;
            const Icon = iconMap[service.icon] || Globe;

            return (
              <div
                key={service.id}
                onClick={() => setActive(isActive ? null : index)}
                onMouseEnter={() => setActive(index)}
                className={`relative overflow-hidden h-full rounded-[1.5rem] cursor-pointer border border-black transition-[flex-grow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[flex-grow] ${
                  isActive ? 'flex-[6] lg:flex-[6]' : 'flex-[1] lg:flex-[1]'
                }`}
              >
                {/* Background Image with hardware layer isolation */}
                <div 
                  className={`absolute inset-0 w-full h-full bg-cover bg-center origin-center transition-transform duration-700 ease-out ${
                    isActive ? 'scale-105' : 'scale-115'
                  }`}
                  style={{ 
                    backgroundImage: `url(${service.image})`,
                    transform: 'translateZ(0)',
                    willChange: 'transform'
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                    isActive 
                      ? 'bg-gradient-to-t from-black/95 via-black/80 to-black/50' 
                      : 'bg-black/75 hover:bg-black/60'
                  }`}
                />

                {/* Top Subtle Border Highlight for Active Card */}
                {isActive && (
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 pointer-events-none" />
                )}

                {/* Content Container */}
                <div className="relative z-10 w-full h-full flex flex-col justify-end p-5 md:p-7 lg:p-8 font-quicksand">
                  {isActive ? (
                    <m.div 
                      key={`active-${service.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="flex flex-col gap-3 md:gap-4 w-[520px] max-w-[calc(100vw-4rem)]"
                    >
                      {/* Top Header Row */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-11 h-11 lg:w-13 lg:h-13 rounded-2xl bg-white/10 border border-black flex items-center justify-center text-white shadow-lg shrink-0">
                            <Icon size={24} className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-quicksand font-bold text-white tracking-tight">
                              {service.title}
                            </h3>
                            <span className="text-xs uppercase tracking-[0.2em] font-quicksand font-semibold text-white/80">
                              {service.description}
                            </span>
                          </div>
                        </div>

                        {/* Delivery Sprint Badge */}
                        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-black backdrop-blur-md shrink-0">
                          <Zap size={13} className="text-white" />
                          <span className="text-[11px] font-quicksand font-bold uppercase tracking-wider text-white">7-Day Sprint</span>
                        </div>
                      </div>
                      
                      {/* Detailed Description */}
                      <p className="font-quicksand text-white text-sm md:text-base leading-relaxed pr-2 max-w-2xl font-medium">
                        {service.details}
                      </p>

                      {/* What's Included / Deliverables Checklist */}
                      <div className="mt-1 pt-3.5 border-t border-black/50">
                        <div className="flex items-center gap-2 mb-2.5">
                          <Clock size={13} className="text-white" />
                          <span className="text-xs uppercase tracking-[0.2em] font-quicksand font-bold text-white">
                            What You Get:
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl">
                          {service.deliverables.slice(0, 4).map((del, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-white font-quicksand font-medium">
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
                            className="px-2.5 py-1 rounded-md bg-white/10 border border-black text-[11px] font-quicksand font-medium text-white backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </m.div>
                  ) : (
                    <div className="h-full w-full flex lg:flex-col items-center justify-center lg:justify-end pb-0 lg:pb-8 font-quicksand">
                      {/* Desktop Vertical Title */}
                      <div className="hidden lg:flex flex-col items-center justify-center h-full">
                        <Icon size={20} className="text-white mb-6 shrink-0" />
                        <h3 
                          className="text-lg xl:text-xl font-quicksand font-bold uppercase tracking-widest whitespace-nowrap text-white transition-colors duration-300 drop-shadow-md"
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          {service.title}
                        </h3>
                      </div>
                      
                      {/* Mobile Horizontal Title */}
                      <div className="flex lg:hidden items-center gap-3 w-full pl-2">
                        <Icon size={20} className="text-white shrink-0" />
                        <h3 className="text-sm md:text-base font-quicksand font-bold uppercase tracking-wider text-white truncate">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
