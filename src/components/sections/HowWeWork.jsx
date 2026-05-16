import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Clock, Code, Layout, Rocket, Search, CheckCircle2 } from 'lucide-react';

const steps = [
  { 
    day: "0", 
    title: "Discovery Call", 
    desc: "We deep-dive into your vision, target audience, and business goals in a high-impact strategy session.",
    icon: Search,
    color: "#00F5FF",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  { 
    day: "1-2", 
    title: "Design Sprint", 
    desc: "From architectural wireframes to ultra-hi-fi interactive mockups. Precision design that converts.",
    icon: Layout,
    color: "#FF6B35",
    gridClass: "md:col-span-2 md:row-span-2",
    featured: true
  },
  { 
    day: "2-5", 
    title: "Live Build Access", 
    desc: "Access your private staging environment. Watch your ecosystem evolve in real-time with continuous deployment.",
    icon: Code,
    color: "#7B2FFF",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  { 
    day: "5-6", 
    title: "Global QC", 
    desc: "Rigorous cross-device testing and performance optimization to ensure 100/100 Lighthouse efficiency.",
    icon: Activity,
    color: "#00FF94",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  { 
    day: "7", 
    title: "Deployment & Scale", 
    desc: "Full production launch. We hand over the keys to your new digital empire with full documentation.",
    icon: Rocket,
    color: "#FF00E5",
    gridClass: "md:col-span-2 md:row-span-1",
    highlight: true
  }
];

export default function HowWeWork() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="howwework" className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/4 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(123,47,255,0.08),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
              <Clock className="text-accent-primary animate-pulse" size={12} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Execution Protocol</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
              Idea to Live in <br />
              <span className="text-gradient">7 Days Sharp.</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-xl max-w-md font-medium"
          >
            A high-velocity, transparent engineering framework designed for founders who move fast.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isHovered = hoveredIndex === i;

            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`${step.gridClass} group relative`}
              >
                <div className={`h-full w-full rounded-3xl p-[1px] transition-all duration-500 bg-gradient-to-tr ${
                  isHovered 
                    ? 'from-accent-primary via-accent-secondary to-accent-violet' 
                    : 'from-white/10 to-transparent'
                }`}>
                  <div className="relative h-full w-full rounded-[23px] p-8 bg-[#08080A] overflow-hidden flex flex-col justify-between">
                    {/* Interior Glow */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: `radial-gradient(circle at center, ${step.color}, transparent 70%)` }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 transition-transform duration-500 group-hover:scale-110"
                            style={{ color: isHovered ? step.color : '#fff' }}
                          >
                            <Icon size={20} />
                          </div>
                          <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest font-bold">Phase 0{i+1}</span>
                        </div>
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-white/5">
                          Day {step.day}
                        </div>
                      </div>

                      <h3 className={`text-2xl font-bold mb-4 tracking-tight transition-all duration-300 ${isHovered ? 'text-white' : 'text-white/80'}`}>
                        {step.title}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed font-medium">
                        {step.desc}
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between mt-6">
                      {step.featured ? (
                        <div className="w-full h-24 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden">
                           <div className="flex items-end gap-1 px-4">
                              {[1,2,3,4,5,6,7].map(b => (
                                <motion.div
                                  key={b}
                                  animate={{ height: [10, 30, 15, 25, 10] }}
                                  transition={{ duration: 1.5, repeat: Infinity, delay: b * 0.1 }}
                                  className="w-1.5 bg-accent-secondary rounded-t-sm"
                                />
                              ))}
                           </div>
                           <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] to-transparent opacity-60" />
                           <div className="absolute bottom-2 text-[8px] font-bold text-accent-secondary uppercase tracking-widest">Velocity Active</div>
                        </div>
                      ) : step.day === "2-5" ? (
                        <div className="flex flex-col gap-1 w-full">
                           <div className="text-[8px] font-mono text-accent-primary/60 uppercase mb-2">Build Pipeline</div>
                           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-1/2 h-full bg-accent-primary"
                              />
                           </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                           <CheckCircle2 size={14} className="text-white/20" />
                           <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Optimized</span>
                        </div>
                      )}
                    </div>

                    {/* Background Index Decor */}
                    <div className="absolute -bottom-6 -right-2 text-9xl font-black text-white/[0.02] pointer-events-none select-none italic tracking-tighter">
                      {i + 1}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 flex flex-col items-center justify-center text-center"
        >
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">Process Integrity Guaranteed</p>
          <div className="h-12 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

