import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { projects } from '../../constants/projects';
import MagneticButton from '../ui/MagneticButton';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] flex-shrink-0 relative rounded-[2rem] overflow-hidden group cursor-pointer"
         onClick={() => window.open(project.link, '_blank')}
    >
      {/* Background Image with Parallax / Zoom effect on hover */}
      <div 
        className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ backgroundImage: `url(${project.image})` }}
      />
      
      {/* Dynamic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-80" />
      
      {/* Content Container */}
      <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full flex flex-col justify-end h-full">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 transform translate-y-4 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
          
          {/* Left: Text Content */}
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center gap-3 mb-3 md:mb-5 opacity-80 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse shadow-[0_0_10px_rgba(0,245,255,0.8)]" />
              <span className="text-accent-primary text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase font-bold">
                {project.category}
              </span>
            </div>
            
            <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white mb-3 md:mb-5 leading-[1.1] tracking-tight">
              {project.title}
            </h3>
            
            <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed line-clamp-2 md:line-clamp-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              {project.description}
            </p>
          </div>
          
          {/* Right: Actions */}
          <div className="hidden md:flex flex-col items-end gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
            <span className="text-white border border-white/20 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-white/5 backdrop-blur-md">
              {project.result}
            </span>
            <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:bg-accent-primary transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,245,255,0.4)]">
              <ArrowUpRight size={28} className="transform transition-transform group-hover:rotate-45" />
            </div>
          </div>
        </div>
        
        {/* Mobile Action Elements (Always visible to ensure usability) */}
        <div className="mt-4 md:hidden flex justify-between items-center opacity-100 transition-opacity duration-500">
          <span className="text-white border border-white/20 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-md">
            {project.result}
          </span>
          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
      
      {/* Subtle glass border overlay */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] pointer-events-none" />
    </div>
  );
};

export default function Work() {
  const targetRef = useRef(null);
  const carouselRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  
  // Calculate dynamic scroll range based on track width vs viewport width
  useLayoutEffect(() => {
    const updateScrollRange = () => {
      if (carouselRef.current) {
        setScrollRange(carouselRef.current.scrollWidth - window.innerWidth);
      }
    };
    
    updateScrollRange();
    // Add small delay for fonts/images loading
    setTimeout(updateScrollRange, 500);
    window.addEventListener('resize', updateScrollRange);
    return () => window.removeEventListener('resize', updateScrollRange);
  }, []);

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Apply smooth spring physics to the scroll progress
  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 20, 
    stiffness: 100, 
    mass: 0.2 
  });
  
  // Map progress to X translation
  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);

  // Show all projects in the gallery
  const displayedProjects = projects;

  return (
    // Increase height to 400vh to give ample scrolling time for the gallery
    <section ref={targetRef} id="work" className="relative h-[400vh] bg-[#0a0a0a]">
      
      {/* Sticky container pins to top while scrolling */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Background Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-accent-primary/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-accent-violet/5 rounded-full blur-[150px]" />
        </div>

        {/* Section Header (Fixed left side) */}
        <div className="absolute top-24 md:top-32 left-6 md:left-12 z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl">
              Selected <br />
              <span className="text-gradient italic font-light tracking-normal">Works</span>
            </h2>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-white/20" />
              <p className="text-gray-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em]">
                Scroll to explore
              </p>
            </div>
          </motion.div>
        </div>

        {/* Horizontal Scroll Track */}
        <motion.div 
          ref={carouselRef}
          style={{ x }} 
          className="flex gap-6 md:gap-16 px-6 md:px-[15vw] items-center mt-32 md:mt-0 w-max"
        >
          {/* Spacer block to ensure the first card isn't completely hidden under the title on desktop */}
          <div className="w-[5vw] md:w-[25vw] flex-shrink-0" />
          
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          
          {/* View Archive / Call to Action End Card */}
          <div 
            className="w-[85vw] md:w-[40vw] h-[60vh] md:h-[70vh] flex-shrink-0 flex flex-col items-center justify-center bg-[#111] rounded-[2rem] border border-white/5 group cursor-pointer hover:bg-white/[0.03] transition-all duration-700"
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            <MagneticButton className="mb-10 w-24 h-24 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent-primary group-hover:scale-110 group-hover:bg-accent-primary/10 transition-all duration-500">
              <ArrowRight size={32} className="text-white group-hover:text-accent-primary transition-colors" />
            </MagneticButton>
            <h3 className="text-4xl md:text-6xl font-display font-black text-white mb-6 text-center leading-[1.1] tracking-tight">
              Start Your <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-violet italic font-light">Project</span>
            </h3>
            <div className="px-6 py-2 rounded-full border border-white/10 text-gray-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] group-hover:border-white/30 group-hover:text-white transition-colors">
              Get in touch
            </div>
          </div>

          {/* Final Right Margin Spacer */}
          <div className="w-[10vw] flex-shrink-0" />
        </motion.div>
        
      </div>
    </section>
  );
}
