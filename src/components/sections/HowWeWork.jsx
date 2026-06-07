import React, { useRef } from 'react';
import { m, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Activity, Clock, Code, Layout, Rocket, Search, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    day: "0",
    title: "Discovery Call",
    desc: "We deep-dive into your vision, target audience, and business goals in a high-impact strategy session. Expect intense questions.",
    icon: Search,
    color: "#00F5FF"
  },
  {
    day: "1-2",
    title: "Design Sprint",
    desc: "From architectural wireframes to ultra-hi-fi interactive mockups. Precision design that converts and captivates.",
    icon: Layout,
    color: "#FF6B35",
    featured: true
  },
  {
    day: "2-5",
    title: "Live Build Access",
    desc: "Access your private staging environment. Watch your ecosystem evolve in real-time with continuous deployment.",
    icon: Code,
    color: "#7B2FFF"
  },
  {
    day: "5-6",
    title: "Global QC",
    desc: "Rigorous cross-device testing and performance optimization to ensure 100/100 Lighthouse efficiency. No pixel left behind.",
    icon: Activity,
    color: "#00FF94"
  },
  {
    day: "7",
    title: "Deployment & Scale",
    desc: "Full production launch. We hand over the keys to your new digital empire with full documentation and momentum.",
    icon: Rocket,
    color: "#FF00E5",
    highlight: true
  }
];

export default function HowWeWork() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="howwework" className="py-32 bg-[#030303] relative min-h-screen">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-16">

        {/* Sticky Left Column */}
        <div className="md:w-5/12 relative">
          <div className="sticky top-32">
            <div className="absolute -inset-20 bg-accent-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
              <Clock className="text-accent-primary animate-pulse" size={12} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Execution Protocol</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-white mb-6">
              Idea to Live in <br />
              <span className="text-gradient">7 Days Sharp.</span>
            </h2>
            <p className="text-white/40 text-lg max-w-sm font-medium leading-relaxed">
              A high-velocity, transparent engineering framework designed for founders who move fast. No bloated timelines, just pure execution.
            </p>

            <div className="mt-12 hidden md:block">
              <div className="flex items-center gap-4 text-white/30 text-xs font-mono uppercase tracking-widest">
                <span>Scroll to Deploy</span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling Right Column (Timeline) */}
        <div className="md:w-7/12 relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[2px] bg-white/5 rounded-full overflow-hidden">
            <m.div
              style={{ scaleY: pathLength, transformOrigin: "top" }}
              className="w-full h-full bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-violet rounded-full shadow-[0_0_15px_rgba(123,47,255,0.5)]"
            />
          </div>

          <div className="flex flex-col gap-24 py-12">
            {steps.map((step, i) => {
              const Icon = step.icon;

              return (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-24 md:pl-32 group"
                >
                  {/* Node Dot */}
                  <div className="absolute left-[26px] md:left-[42px] top-6 w-3 h-3 rounded-full bg-[#030303] border-2 border-white/20 group-hover:border-accent-primary group-hover:scale-150 transition-all duration-500 z-10" />

                  {/* Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/0 via-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />

                  <div className="relative bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/[0.04] transition-colors duration-500 overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 shadow-inner" style={{ color: step.color }}>
                          <Icon size={24} />
                        </div>
                        <span className="text-[12px] font-mono text-white/30 uppercase tracking-widest font-bold">Phase 0{i + 1}</span>
                      </div>
                      <div className="text-[10px] font-black text-white px-4 py-1.5 rounded-full" style={{ backgroundColor: `${step.color}20`, border: `1px solid ${step.color}40` }}>
                        DAY {step.day}
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white relative z-10">
                      {step.title}
                    </h3>
                    <p className="text-white/50 text-base md:text-lg leading-relaxed relative z-10">
                      {step.desc}
                    </p>

                    {/* Featured Custom Visuals */}
                    {step.featured && (
                      <div className="mt-8 p-6 bg-black/40 rounded-2xl border border-white/5 relative overflow-hidden group-hover:border-white/10 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="flex justify-between items-end">
                          <div className="flex gap-2 items-end h-[60px]">
                            {[1, 2, 3, 4, 5].map(bar => (
                              <m.div
                                key={bar}
                                className="w-2 h-[60px] bg-accent-secondary rounded-t-sm origin-bottom"
                                
                                animate={{ scaleY: [0.33, 0.83, 0.5, 1, 0.33] }}
                                transition={{ duration: 2, repeat: Infinity, delay: bar * 0.15 }}
                              />
                            ))}
                          </div>
                          <div className="text-[10px] font-mono text-white/40 uppercase">Wireframe to Hi-Fi</div>
                        </div>
                      </div>
                    )}

                    {/* Background Number */}
                    <div className="absolute -bottom-10 -right-4 text-[150px] font-black text-white/[0.02] pointer-events-none select-none tracking-tighter transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-4">
                      {i + 1}
                    </div>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
