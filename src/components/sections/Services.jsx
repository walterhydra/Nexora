import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { services } from '../../constants/services';

// Preload function for the lazy-loaded ServiceDetails component
const preloadServiceDetails = () => {
  import('../../pages/ServiceDetails');
};

const ServiceRow = ({ service, index, hoveredIndex, setHoveredIndex }) => {
  const isHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  // Spotlight effect motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className="relative border-b border-gray-200 dark:border-white/10 py-6 lg:py-8 cursor-pointer transition-colors duration-500 group"
      onMouseEnter={() => {
        setHoveredIndex(index);
        preloadServiceDetails();
      }}
      onMouseLeave={() => setHoveredIndex(null)}
      onMouseMove={handleMouseMove}
    >
      {/* Cursor Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 245, 255, 0.05),
              transparent 80%
            )
          `
        }}
      />

      <div className={`relative z-10 flex flex-col justify-center transition-opacity duration-500 ${isDimmed ? 'opacity-30' : 'opacity-100'}`}>
        
        {/* Title Row */}
        <div className="flex items-center gap-6 md:gap-8 pl-4">
          <span className="text-sm md:text-lg font-mono text-gray-400 dark:text-gray-500 font-light w-8">
            0{index + 1}
          </span>
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white group-hover:text-accent-blue transition-colors duration-500">
            {service.title}
          </h3>
        </div>

      </div>

      {/* Expandable Content Area */}
      <motion.div
        initial={false}
        animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
        className="overflow-hidden relative z-10"
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="pt-6 pl-14 md:pl-[4.5rem]">
           <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-xl">
             {service.details}
           </p>
           
           {/* Mobile Image Reveal (Only visible on small screens) */}
           <div className="block lg:hidden w-full h-56 rounded-2xl overflow-hidden mb-6 relative">
              <img src={service.image} className="w-full h-full object-cover" alt={service.title} />
           </div>

           <div className="flex flex-wrap gap-2 mb-8">
              {service.tags.slice(0, 4).map((tag, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 text-xs font-medium text-gray-700 dark:text-gray-300">
                  {tag}
                </span>
              ))}
           </div>
           
           <div className="flex items-center gap-6">
             <span className="text-lg font-bold text-gray-900 dark:text-white">
               {service.price}
             </span>
             <Link to={`/service/${service.slug}`} className="flex items-center gap-2 text-sm font-bold bg-accent-blue text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors relative z-30">
                Explore <ArrowRight size={16} />
             </Link>
           </div>
        </div>
      </motion.div>
      
      {/* Invisible full-row click target */}
      <Link to={`/service/${service.slug}`} className="absolute inset-0 z-20" aria-label={`Explore ${service.title}`} />
    </div>
  );
};

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Fallback to first image if nothing is hovered, so the box isn't empty
  const activeImage = hoveredIndex !== null ? services[hoveredIndex].image : services[0].image;

  return (
    <section id="services" className="py-24 md:py-32 relative bg-white dark:bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              What We <br className="hidden md:block" /><span className="text-gradient">Build</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="text-lg text-gray-600 dark:text-gray-400 max-w-md pb-4">
            End-to-end digital services. We craft experiences that demand attention and drive real business results.
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          
          {/* Left: Interactive List */}
          <div className="w-full lg:w-[55%] border-t border-gray-200 dark:border-white/10">
            {services.map((service, index) => (
              <ServiceRow 
                key={service.id} 
                service={service} 
                index={index} 
                hoveredIndex={hoveredIndex} 
                setHoveredIndex={setHoveredIndex} 
              />
            ))}
          </div>

          {/* Right: Sticky Image Reveal Container (Desktop only) */}
          <div className="hidden lg:block lg:w-[45%] relative">
            <div className="sticky top-32 w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt="Service Illustration"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Floating Explore Indicator on Image */}
              <AnimatePresence>
                {hoveredIndex !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none"
                  >
                     <div className="flex items-center justify-between w-full p-5 bg-[#111]/80 backdrop-blur-md rounded-2xl border border-white/10 text-white shadow-xl">
                        <span className="text-xl font-bold font-display">{services[hoveredIndex].title}</span>
                        <div className="w-10 h-10 rounded-full bg-accent-blue text-white flex items-center justify-center">
                          <ArrowRight size={20} />
                        </div>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

