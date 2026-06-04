import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Smartphone, Palette, Bot, Rocket, Briefcase, Link as LinkIcon, TrendingUp, ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { services } from '../../constants/services';

const iconMap = {
  Globe, Smartphone, Palette, Bot, Rocket, Briefcase, Link: LinkIcon, TrendingUp
};

export default function Services() {
  const [active, setActive] = useState(null); // null means no item is actively hovered

  return (
    <section id="services" className="py-24 md:py-32 relative bg-white dark:bg-[#050505] overflow-hidden">
      {/* Background abstract elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent-blue/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-12 md:mb-16 flex flex-col items-center text-center"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6 leading-tight text-gray-900 dark:text-white">
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-purple-500">Build</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            A comprehensive suite of digital services designed to scale your business. Tap a panel to explore.
          </motion.p>
        </motion.div>

        {/* Flex Accordion Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onMouseLeave={() => setActive(null)} // Reset on mouse leave
          className="flex flex-col lg:flex-row w-full h-[85vh] min-h-[700px] lg:h-[650px] gap-2 lg:gap-4 p-2 lg:p-3 bg-gray-100 dark:bg-[#111] rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-2xl"
        >
          {services.map((service, index) => {
            const isActive = active === index;
            const isHoveringAny = active !== null;
            const Icon = iconMap[service.icon] || Globe;

            return (
              <motion.div
                key={service.id}
                layout
                onClick={() => setActive(isActive ? null : index)} // Toggle on click for mobile
                onMouseEnter={() => setActive(index)}
                className={`relative overflow-hidden rounded-[1.5rem] cursor-pointer ${isActive ? 'flex-[6] lg:flex-[5]' : 'flex-[1] lg:flex-[1]'}`}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
              >
                {/* Background Image */}
                <motion.img 
                  src={service.image}
                  className="absolute inset-0 w-full h-full object-cover origin-center"
                  style={{ willChange: "transform" }}
                  initial={false}
                  animate={{ 
                    scale: isActive ? 1.05 : 1.2,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />

                {/* Opacity Overlay replacing CSS Filter */}
                <motion.div
                  className="absolute inset-0 bg-black pointer-events-none mix-blend-color"
                  style={{ willChange: "opacity" }}
                  initial={false}
                  animate={{
                    opacity: isActive ? 0 : (isHoveringAny ? 0.8 : 0.5)
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 bg-black pointer-events-none"
                  style={{ willChange: "opacity" }}
                  initial={false}
                  animate={{
                    opacity: isActive ? 0.1 : (isHoveringAny ? 0.6 : 0.3)
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                {!isActive && (
                   <div className={`absolute inset-0 transition-colors duration-300 pointer-events-none ${isHoveringAny ? 'bg-black/40' : 'bg-black/20'}`} />
                )}

                {/* Content */}
                <div className="relative z-10 w-full h-full flex flex-col justify-end p-4 md:p-6 lg:p-8">
                  <AnimatePresence mode="popLayout">
                    {isActive ? (
                      <motion.div 
                        key="active"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="flex flex-col gap-4 lg:gap-6 min-w-[250px] lg:min-w-[400px]"
                      >
                        <div className="flex items-center gap-3 lg:gap-4">
                          <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl bg-accent-blue/90 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-white/20">
                            <Icon size={24} className="w-5 h-5 lg:w-6 lg:h-6" />
                          </div>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white drop-shadow-lg">
                            {service.title}
                          </h3>
                        </div>
                        
                        <p className="text-gray-200 text-sm lg:text-base max-w-xl line-clamp-3 drop-shadow-md pr-4">
                          {service.details}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 mt-2">
                          <span className="text-lg font-bold text-white drop-shadow-md">{service.price}</span>
                          <Link to={`/service/${service.slug}`} className="inline-flex items-center justify-center gap-2 text-sm font-bold bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors w-fit shadow-xl pointer-events-auto">
                            Explore <ArrowRight size={16} />
                          </Link>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="inactive"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="h-full w-full flex lg:flex-col items-center justify-center lg:justify-end pb-0 lg:pb-8"
                      >
                        {/* Desktop: Vertical text reading bottom to top */}
                        <div className="hidden lg:flex flex-col items-center justify-center h-full">
                          <h3 
                            className={`text-xl font-display font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-500 ${isHoveringAny ? 'text-white/70' : 'text-white'}`}
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            {service.title}
                          </h3>
                        </div>
                        
                        {/* Mobile: Horizontal text & icon */}
                        <div className="flex lg:hidden items-center gap-3 w-full pl-2">
                          <Icon size={20} className={`min-w-[20px] transition-colors duration-500 ${isHoveringAny ? 'text-white/70' : 'text-white'}`} />
                          <h3 className={`text-sm md:text-base font-display font-bold uppercase tracking-wider truncate transition-colors duration-500 ${isHoveringAny ? 'text-white/70' : 'text-white'}`}>
                            {service.title}
                          </h3>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Invisible full-card link */}
                <Link to={`/service/${service.slug}`} className="absolute inset-0 z-0" aria-label={`Explore ${service.title}`} />
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
