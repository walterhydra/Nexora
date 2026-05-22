import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { projects } from "../../constants/projects";
import anime from "animejs";

export default function Work() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const textRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate total width based on number of projects (100vw per project)
  // We subtract 1 so the last project aligns perfectly with the end of the scroll
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(projects.length - 1) * 100}vw`],
  );

  // Spring physics for smoother horizontal scrolling
  const physicsX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Update active project based on scroll position
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const index = Math.round(latest * (projects.length - 1));
      if (index !== activeProject) {
        setActiveProject(index);

        // Trigger anime.js text effect when active project changes
        if (textRef.current) {
          anime.timeline({ loop: false }).add({
            targets: ".project-title .letter",
            translateY: [100, 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 300 + 30 * i,
          });
        }
      }
    });
  }, [scrollYProgress, activeProject]);

  // Split text for anime.js
  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="letter inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative bg-[#020202] text-white"
      // Height = 100vh * number of projects to allow scrolling through all of them
      style={{ height: `${projects.length * 100}vh` }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        {/* Background Ambient Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4 w-[50vw] h-[50vh] bg-accent-primary/10 rounded-full blur-[120px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 100, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-[60vw] h-[60vh] bg-accent-violet/10 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 mix-blend-screen" />
        </div>

        {/* Header Overlay (Fixed) */}
        <div className="absolute top-0 left-0 w-full p-6 lg:p-12 z-40 flex justify-between items-start pointer-events-none">
          <div>
            <h2 className="text-2xl md:text-4xl font-display font-black tracking-tighter mix-blend-difference text-white">
              Selected{" "}
              <span className="italic font-light text-white/70">Works</span>
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2 mix-blend-difference text-white">
            <span className="font-mono text-sm uppercase tracking-widest text-white/50">
              Scroll to explore
            </span>
            <div className="flex gap-2 items-center">
              <span className="w-12 h-[1px] bg-white/30" />
              <span className="font-mono font-bold">
                {String(activeProject + 1).padStart(2, "0")} / {projects.length}
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <motion.div
          ref={scrollRef}
          className="flex flex-1 h-full w-[max-content]"
          style={{ x: physicsX }}
        >
          {projects.map((project, index) => {
            // Parallax effect for each image
            const imageX = useTransform(
              scrollYProgress,
              [
                (index - 1) / (projects.length - 1),
                index / (projects.length - 1),
                (index + 1) / (projects.length - 1),
              ],
              ["20%", "0%", "-20%"],
            );

            // Scale effect for the current active project
            const scale = useTransform(
              scrollYProgress,
              [
                (index - 1) / (projects.length - 1),
                index / (projects.length - 1),
                (index + 1) / (projects.length - 1),
              ],
              [0.8, 1, 0.8],
            );

            const opacity = useTransform(
              scrollYProgress,
              [
                (index - 1) / (projects.length - 1),
                index / (projects.length - 1),
                (index + 1) / (projects.length - 1),
              ],
              [0.3, 1, 0.3],
            );

            return (
              <div
                key={project.id}
                className="w-screen h-screen flex items-center justify-center p-6 lg:p-24 relative"
              >
                <motion.div
                  className="relative w-full max-w-[1400px] h-[70vh] lg:h-[80vh] flex flex-col lg:flex-row items-center gap-12 lg:gap-24 z-10"
                  style={{ scale, opacity }}
                >
                  {/* Image Section */}
                  <div
                    className="w-full lg:w-3/5 h-1/2 lg:h-full relative overflow-hidden rounded-2xl group cursor-pointer"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    <motion.div
                      className="absolute inset-0 w-[120%] h-full"
                      style={{ x: imageX }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                      />
                    </motion.div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                    {/* Hover Reveal Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100">
                      <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                        <span className="font-mono text-sm uppercase tracking-widest font-bold">
                          Visit
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full lg:w-2/5 flex flex-col justify-center gap-6 lg:gap-10">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-full border border-white/20 text-xs font-mono uppercase tracking-widest text-white/70">
                        {project.category}
                      </span>
                      <span className="text-accent-primary font-mono text-sm">
                        0{index + 1}
                      </span>
                    </div>

                    <div
                      ref={activeProject === index ? textRef : null}
                      className="project-title overflow-hidden"
                    >
                      <h3 className="text-5xl lg:text-7xl xl:text-8xl font-display font-black leading-[0.9] tracking-tighter text-white">
                        {activeProject === index
                          ? splitText(project.title)
                          : project.title}
                      </h3>
                    </div>

                    <p className="text-lg lg:text-xl text-gray-400 font-light max-w-md">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 rounded-lg bg-white/5 text-sm font-medium text-white/80 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-8 border-t border-white/10 mt-4 flex items-center justify-between">
                      <span className="text-white/50 text-sm">
                        {project.result}
                      </span>
                      <motion.button
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors"
                        onClick={() => window.open(project.link, "_blank")}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-white/5 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-primary to-accent-violet"
            style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
          />
        </div>
      </div>
    </section>
  );
}
