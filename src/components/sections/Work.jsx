import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../constants/projects";
import { motion, AnimatePresence } from "framer-motion";

export default function Work() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Preload images for smooth transitions without flashing
    projects.forEach(proj => {
      if (proj.image) {
        const img = new Image();
        img.src = proj.image;
      }
    });

    const options = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when item is in the middle 20% of the viewport
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute("data-index"), 10);
          setActiveIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    document.querySelectorAll(".work-item").forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="work" 
      className="relative bg-black text-white"
    >
      {/* Sticky Background Image that changes on scroll */}
      <div className="absolute inset-0 z-0">
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none bg-black">
          <AnimatePresence>
            <motion.img 
              key={`bg-${activeIndex}`}
              src={projects[activeIndex]?.image} 
              alt={projects[activeIndex]?.title} 
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 0.3, scale: 1.05 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover will-change-[opacity,transform]"
            />
          </AnimatePresence>
          {/* Gradient overlays to blend into the section */}
          <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10 pointer-events-none" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 py-32 min-h-screen">
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-white/30"></span>
            <span className="font-mono text-sm tracking-widest uppercase text-white/50">
              Interactive Index
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-display font-black tracking-tighter uppercase">
            Selected <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/80 italic font-light">Works</span>
          </h2>
        </div>

        {/* The List Layout */}
        <div className="w-full border-t border-white/10 flex flex-col">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              data-index={index}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => window.open(project.link, "_blank")}
              className={`work-item group relative flex flex-col md:flex-row md:items-center justify-between py-12 md:py-20 border-b border-white/10 cursor-pointer overflow-hidden px-4 md:px-6 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                index === activeIndex ? "opacity-100 bg-white/5" : "opacity-40 hover:opacity-70"
              }`}
            >
              {/* Left Side: Number, Title */}
              <div className="relative z-10 flex items-center gap-6 md:gap-12 flex-1 pointer-events-none">
                <span className={`font-mono text-sm md:text-xl min-w-[2rem] transition-colors duration-500 ${index === activeIndex ? "text-white/80" : "text-white/20"}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                
                <h3 className={`text-4xl md:text-5xl lg:text-7xl font-display font-medium tracking-tight transition-all duration-500 ${index === activeIndex ? "text-white translate-x-4" : "text-white/70 group-hover:text-white/90"}`}>
                  {project.title}
                </h3>
              </div>
              
              {/* Right Side: Category, Tags, Arrow */}
              <div className="relative z-10 flex items-center gap-6 justify-between md:justify-end w-full md:w-auto mt-6 md:mt-0 pointer-events-none">
                
                {/* Tags */}
                <div className={`hidden lg:flex items-center gap-2 mr-4 transition-all duration-700 ${index === activeIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}>
                  {project.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs border border-white/20 rounded-full text-white/70 bg-black/60">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={`flex flex-col gap-1 text-left md:text-right transition-transform duration-500 ${index === activeIndex ? "translate-x-[-10px]" : ""}`}>
                  <span className={`font-mono uppercase tracking-widest text-xs md:text-sm transition-colors duration-500 ${index === activeIndex ? "text-white/90" : "text-white/50"}`}>
                    {project.category}
                  </span>
                  <span className={`font-light text-sm max-w-[200px] truncate hidden md:block transition-colors duration-500 ${index === activeIndex ? "text-white/70" : "text-white/30"}`}>
                    {project.result}
                  </span>
                </div>
                
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
                  index === activeIndex ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "border-white/10 shadow-[0_0_0_0_rgba(255,255,255,0)]"
                }`}>
                  <ArrowUpRight className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 ${index === activeIndex ? "rotate-45" : ""}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
