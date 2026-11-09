import React from 'react';
import { m } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';
import { Code2, Clock, Star, Users, ArrowRight } from 'lucide-react';

const statsData = [
  {
    id: "01",
    title: "Projects Delivered",
    value: 16,
    suffix: "+",
    tagline: "Global web platforms and scalable cloud architectures.",
    desc: "We have successfully designed, built, and launched premium digital products for brands across the globe, focusing on scalable architecture and pixel-perfect design.",
    pointsColumn1: [
      "Scalable architecture",
      "Pixel-perfect design",
      "Multi-region deployment"
    ],
    pointsColumn2: [
      "100/100 Core Web Vitals",
      "Zero technical debt",
      "Production reliability"
    ],
    icon: Code2,
    ctaText: "Explore our work",
    targetSection: "work"
  },
  {
    id: "02",
    title: "Avg. Delivery Time",
    value: 7,
    suffix: " Days",
    tagline: "Rapid sprint turnarounds engineered for modern ambitious teams.",
    desc: "By utilizing modern frameworks and an elite agile workflow, we drastically reduce time-to-market without ever compromising on quality.",
    pointsColumn1: [
      "Modern frameworks",
      "Elite agile workflow",
      "Rapid time-to-market"
    ],
    pointsColumn2: [
      "Automated CI/CD",
      "Weekly staging builds",
      "Uncompromised quality"
    ],
    icon: Clock,
    ctaText: "See our sprint work",
    targetSection: "work"
  },
  {
    id: "03",
    title: "Client Satisfaction",
    value: 98,
    suffix: "%",
    tagline: "Enduring technical partnerships grounded in radical transparency.",
    desc: "Our commitment to communication, transparency, and post-launch support results in long-term partnerships rather than one-off projects.",
    pointsColumn1: [
      "Proactive communication",
      "Radical transparency",
      "Post-launch support"
    ],
    pointsColumn2: [
      "Long-term partnerships",
      "Weekly async demos",
      "0% retainer churn"
    ],
    icon: Star,
    ctaText: "Read client reviews",
    targetSection: "testimonials"
  },
  {
    id: "04",
    title: "Team Experts",
    value: 10,
    suffix: "",
    tagline: "Curated senior engineering force with zero junior handoffs.",
    desc: "We are a globally distributed, highly curated team of senior developers, award-winning designers, and product strategists.",
    pointsColumn1: [
      "Globally distributed",
      "Senior full-stack leads",
      "Product strategists"
    ],
    pointsColumn2: [
      "Award-winning designers",
      "Zero junior handoffs",
      "100% in-house collective"
    ],
    icon: Users,
    ctaText: "Meet the engineering team",
    targetSection: "team"
  }
];

export default function Stats() {
  const scrollToTarget = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Reusable shining metallic shimmer style (Pure White)
  const shiningWhiteStyle = {
    fontFamily: '"Quicksand", system-ui, sans-serif',
    backgroundImage: 'linear-gradient(115deg, #ffffff 0%, #a1a1aa 25%, #ffffff 50%, #71717a 75%, #ffffff 100%)',
    backgroundSize: '200% 100%',
    animation: 'metallic-shimmer 4s ease-in-out infinite',
  };

  return (
    <section id="stats" className="py-20 md:py-28 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 font-quicksand overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================== */}
        {/* SECTION HEADER (REFINED & LUXURY GRADE)                         */}
        {/* ============================================================== */}
        <div className="pb-12 md:pb-16 relative">
          
          {/* Subtle Ambient Glow behind header */}
          <div 
            className="absolute -top-12 left-0 w-[420px] h-[200px] pointer-events-none -z-10 blur-[100px] opacity-35"
            style={{ background: 'radial-gradient(ellipse at center, rgba(0,245,255,0.18) 0%, rgba(255,255,255,0.04) 50%, transparent 75%)' }}
          />

          <div>
            {/* Studio-Grade Micro Category Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] mb-5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
              </span>
              <span 
                className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/90"
                style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
              >
                The Impact // Performance
              </span>
            </div>

            {/* Unified Glowing Title: Performance at Scale (Zero Background Bloom) */}
            <div>
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight cursor-default select-none"
                style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
              >
                <span 
                  className="text-transparent bg-clip-text inline-block"
                  style={{
                    fontFamily: '"Quicksand", system-ui, sans-serif',
                    backgroundImage: 'linear-gradient(115deg, #ffffff 0%, #a1a1aa 25%, #ffffff 50%, #71717a 75%, #ffffff 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'metallic-shimmer 4.5s ease-in-out infinite',
                  }}
                >
                  Performance at Scale
                </span>
              </h2>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* TABLE ROW MATRIX                                               */}
        {/* ============================================================== */}
        <div className="w-full border-t border-neutral-200 dark:border-white/10">
          {statsData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <m.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="group border-b border-neutral-200 dark:border-white/10 transition-colors duration-200 hover:bg-neutral-500/[0.03] dark:hover:bg-white/[0.02]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[160px]">
                  
                  {/* Column 1: Index Number + Icon */}
                  <div className="lg:col-span-1 p-6 sm:p-8 flex items-center lg:flex-col lg:items-center justify-between lg:justify-start gap-4 lg:gap-6 border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-white/10">
                    <span 
                      className="font-mono text-xs text-neutral-400 dark:text-neutral-500 tracking-wider"
                      style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
                    >
                      {item.id}
                    </span>
                    <div className="w-10 h-10 rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/[0.03] flex items-center justify-center text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:border-neutral-400 dark:group-hover:border-white/30 transition-all">
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Column 2: Title, Shining White Stat Number & Tagline */}
                  <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-center border-b lg:border-b-0">
                    
                    {/* Animated Shining White Title */}
                    <div className="mb-2">
                      <h3 
                        className="text-lg sm:text-xl font-bold tracking-tight text-transparent bg-clip-text inline-block"
                        style={shiningWhiteStyle}
                      >
                        {item.title}
                      </h3>
                    </div>
                    
                    {/* Animated Shining White Stat Number (Pure White Shimmer) */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <AnimatedCounter
                        end={item.value}
                        suffix={item.suffix}
                        className="text-2xl sm:text-3xl font-bold tracking-tight text-transparent bg-clip-text inline-flex items-center"
                        style={shiningWhiteStyle}
                      />
                      <span 
                        className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400 px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.03]"
                        style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
                      >
                        Verified
                      </span>
                    </div>

                    {/* Tagline */}
                    <p 
                      className="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium"
                      style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
                    >
                      {item.tagline}
                    </p>
                  </div>

                  {/* Column 3: In-Depth Paragraph Description */}
                  <div className="lg:col-span-4 p-6 sm:p-8 flex items-center border-b lg:border-b-0">
                    <p 
                      className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium"
                      style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* Column 4: 2 Sub-columns of Bullet Points + Action Link */}
                  <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
                      <div className="space-y-2">
                        {item.pointsColumn1.map((pt, pIdx) => (
                          <div 
                            key={pIdx} 
                            className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400 font-medium"
                            style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
                          >
                            <span className="text-neutral-400 dark:text-neutral-600 select-none">•</span>
                            <span className="leading-tight">{pt}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        {item.pointsColumn2.map((pt, pIdx) => (
                          <div 
                            key={pIdx} 
                            className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400 font-medium"
                            style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
                          >
                            <span className="text-neutral-400 dark:text-neutral-600 select-none">•</span>
                            <span className="leading-tight">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => scrollToTarget(item.targetSection)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-white hover:text-cyan-400 transition-colors cursor-pointer"
                        style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
                      >
                        <span>{item.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>

                </div>
              </m.div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* BOTTOM METRICS TELEMETRY STRIP                                 */}
        {/* ============================================================== */}
        <div 
          className="mt-8 pt-6 border-t border-neutral-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400 font-medium"
          style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
        >
          <div className="flex flex-wrap items-center gap-6">
            <span><strong className="text-neutral-900 dark:text-white font-bold">16+</strong> Projects Delivered</span>
            <span className="text-neutral-300 dark:text-white/20">•</span>
            <span><strong className="text-neutral-900 dark:text-white font-bold">7 Days</strong> Avg. Delivery Time</span>
            <span className="text-neutral-300 dark:text-white/20">•</span>
            <span><strong className="text-neutral-900 dark:text-white font-bold">98%</strong> Client Satisfaction</span>
            <span className="text-neutral-300 dark:text-white/20">•</span>
            <span><strong className="text-neutral-900 dark:text-white font-bold">10</strong> Team Experts</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">Monitored Production SLA: 99.98%</span>
          </div>
        </div>

      </div>
    </section>
  );
}
