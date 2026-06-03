import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../constants/projects";
import { motion } from "framer-motion";

export default function Work() {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 5);

  return (
    <section id="work" className="relative bg-black text-white py-24 md:py-32 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        
        {/* Left Sticky Column */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-40 h-fit z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-white/30"></span>
            <span className="font-mono text-sm tracking-widest uppercase text-white/50">
              Interactive Index
            </span>
          </div>
          <h2 className="text-5xl lg:text-7xl xl:text-8xl font-display font-black tracking-tighter uppercase mb-8">
            Selected <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/80 italic font-light">Works</span>
          </h2>
          <p className="text-white/60 font-light text-lg md:text-xl mb-12 max-w-md leading-relaxed">
            A curated selection of our most recent and impactful digital experiences, crafted with precision, passion, and purpose.
          </p>
          
          {projects.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="hidden lg:inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all duration-300 font-mono text-sm uppercase tracking-widest border border-white/10 group"
            >
              {showAll ? "Show Less" : "View All Projects"}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          )}
        </div>

        {/* Right Scrolling Column */}
        <div className="w-full lg:w-2/3 flex flex-col gap-16 md:gap-32 pb-12">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group block w-full relative"
            >
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer" 
                className="block relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[16/10] mb-8 bg-white/5 border border-white/5"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Floating View button inside image on hover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 scale-50 group-hover:scale-100 border border-white/20">
                  <span className="text-white font-mono text-sm uppercase tracking-widest">View</span>
                </div>

                {/* Tags overlaid on image */}
                <div className="absolute bottom-6 left-6 z-20 flex gap-2">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-xs text-white/80 uppercase tracking-wider font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-2">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-mono text-white/30 text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-xs text-white/50 uppercase tracking-widest px-2 py-1 border border-white/10 rounded-md">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-2 group-hover:text-white/80 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/50 font-light text-lg max-w-xl">
                    {project.description} — {project.result}
                  </p>
                </div>
                
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden md:flex w-14 h-14 rounded-full border border-white/20 items-center justify-center transition-all duration-500 hover:bg-white hover:text-black group-hover:border-white"
                >
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                </a>
              </div>
            </motion.div>
          ))}

          {projects.length > 5 && (
            <div className="flex justify-center mt-8 lg:hidden">
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all duration-300 font-mono text-sm uppercase tracking-widest border border-white/10"
              >
                {showAll ? "Show Less" : "View All Projects"}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
