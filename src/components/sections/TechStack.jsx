import React from 'react';
import { motion } from 'framer-motion';
import { techStack } from '../../constants/techStack';

// Helper to flatten arrays and add categories
const allTech = Object.entries(techStack).flatMap(([category, items]) => 
  items.map(name => ({ name, category }))
);

// Split into three distinct rows for the marquee
const row1 = allTech.filter(t => ['frontend', 'design'].includes(t.category));
const row2 = allTech.filter(t => ['backend', 'database'].includes(t.category));
const row3 = allTech.filter(t => ['mobile', 'devops', 'automation', 'analytics'].includes(t.category));

const MarqueeRow = ({ items, direction = "left", speed = 40 }) => {
  return (
    <div className="relative flex w-full overflow-hidden py-4 -my-2 mask-edges">
      <motion.div
        className="flex gap-6 whitespace-nowrap min-w-max px-3"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed
        }}
      >
        {/* Render the items twice to create the seamless loop */}
        {[...items, ...items, ...items, ...items].map((tech, idx) => (
          <div 
            key={`${tech.name}-${idx}`}
            className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-bg-tertiary/60 border border-white/5 backdrop-blur-md shadow-lg hover:border-accent-primary/40 hover:bg-white/5 transition-all duration-300 group cursor-default"
          >
            <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-colors duration-300
              ${tech.category === 'frontend' || tech.category === 'mobile' ? 'bg-accent-primary' : 
                tech.category === 'backend' || tech.category === 'database' ? 'bg-accent-secondary' : 
                'bg-accent-violet'}`} 
            />
            <span className="font-display font-semibold text-gray-300 group-hover:text-white transition-colors tracking-wide text-lg">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function TechStack() {
  return (
    <section className="py-32 bg-bg-primary border-t border-white/5 relative z-10 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-accent-primary/5 rounded-[100%] blur-[120px] pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold mb-4"
        >
          Our <span className="text-gradient">Arsenal</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto"
        >
          We use the most powerful, modern technologies to build fast, scalable, and stunning digital products.
        </motion.p>
      </div>

      <div className="w-full flex flex-col gap-2 relative z-20">
        {/* CSS mask to fade out the edges of the marquee */}
        <style dangerouslySetInnerHTML={{__html: `
          .mask-edges {
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }
        `}} />
        
        <MarqueeRow items={row1} direction="left" speed={35} />
        <MarqueeRow items={row2} direction="right" speed={45} />
        <MarqueeRow items={row3} direction="left" speed={40} />
      </div>
    </section>
  );
}
