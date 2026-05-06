import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';
import { projects } from '../../constants/projects';
import { fadeUp, staggerContainer } from '../../animations/variants';
import MagneticButton from '../ui/MagneticButton';
import { ExternalLink, ArrowRight } from 'lucide-react';

function ProjectListItem({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tracking the mouse
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  // Calculate rotation based on mouse movement velocity
  const xVelocity = useVelocity(x);
  const rotateTarget = useTransform(xVelocity, [-1000, 1000], [-15, 15]);
  const rotateSpring = useSpring(rotateTarget, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Center the image on the cursor (assuming image is 400x300)
    x.set(e.clientX - rect.left - 200);
    y.set(e.clientY - rect.top - 150);
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
      className="relative py-10 md:py-16 border-b border-white/10 group cursor-pointer overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 hover:bg-white/[0.02] transition-colors duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={() => window.open(project.link, '_blank')}
    >
      {/* Left Side: Title & Category */}
      <div className="flex flex-col z-10 relative pointer-events-none max-w-2xl">
        <span className="text-accent-secondary text-sm font-mono tracking-widest mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" />
          {project.category}
        </span>
        <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-primary group-hover:to-accent-violet transition-all duration-500 transform group-hover:translate-x-6">
          {project.title}
        </h3>
      </div>

      {/* Right Side: Description & Result */}
      <div className="z-10 relative pointer-events-none text-left md:text-right flex flex-col items-start md:items-end w-full md:w-auto">
        <p className="text-gray-400 max-w-sm mb-6 md:opacity-0 group-hover:opacity-100 transition-all duration-500 transform md:translate-y-4 group-hover:translate-y-0 text-sm md:text-base leading-relaxed">
          {project.description}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-accent-primary border border-accent-primary/30 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest group-hover:bg-accent-primary/10 transition-colors shadow-[0_0_15px_rgba(0,245,255,0)] group-hover:shadow-[0_0_15px_rgba(0,245,255,0.2)]">
            {project.result}
          </span>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
            <ArrowRight size={16} className="transform -rotate-45" />
          </div>
        </div>
      </div>

      {/* Mobile Image (Visible only on small screens) */}
      <div className="block md:hidden mt-6 w-full aspect-[4/3] rounded-2xl overflow-hidden relative border border-white/10 z-10 pointer-events-none">
        <div 
          className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url(/projects/project-${project.id}.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Desktop Floating Image (Tracks Mouse) */}
      <motion.div 
        className="absolute hidden md:block w-[400px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl z-0 pointer-events-none border border-white/10"
        style={{
          x: mouseXSpring,
          y: mouseYSpring,
          rotate: rotateSpring,
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.6,
        }}
        transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
      >
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(/projects/project-${project.id}.jpg)` }}
        />
        {/* Subtle glass overlay on image */}
        <div className="absolute inset-0 bg-accent-primary/10 mix-blend-overlay" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-2xl" />
      </motion.div>
    </motion.div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 5);

  return (
    <section id="work" className="py-24 relative z-10 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col mb-16 gap-8"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
                Selected <span className="text-gradient font-light italic">Works</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-xl text-gray-400 font-light max-w-xl leading-relaxed">
                We partner with ambitious brands to build immersive digital experiences that convert.
              </motion.p>
            </div>
            
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setFilter(cat);
                    setShowAll(false);
                  }}
                  className={`px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                    filter === cat 
                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Massive Interactive List */}
        <div className="flex flex-col border-t border-white/10">
          {displayedProjects.map((project) => (
            <ProjectListItem key={project.id} project={project} />
          ))}
        </div>

        {!showAll && filteredProjects.length > 5 && (
          <div className="mt-24 flex justify-center">
            <MagneticButton 
              type="button"
              onClick={() => setShowAll(true)}
              className="bg-transparent text-white font-bold uppercase tracking-wider text-sm border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-500 px-12 py-5"
            >
              View Archive
            </MagneticButton>
          </div>
        )}
      </div>
    </section>
  );
}
