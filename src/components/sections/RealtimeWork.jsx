import React from 'react';
import { m } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// 3 Verified Sprints matching user reference image
const selectedWorkProjects = [
  {
    id: 'rf-electro',
    title: 'RF Electro ERP',
    category: 'Industrial / IoT Systems',
    statVal: '100%',
    statLabel: 'BATCH TRACEABILITY',
    desc: 'Production-traceability-first PCB manufacturing ERP engineered with automated BOM management, multi-stage batch tracking, and real-time shop-floor telemetry.',
    tags: ['PCB MANUFACTURING', 'SHOP-FLOOR ERP', 'TRACEABILITY'],
    liveUrl: 'https://www.rfgenix.com/',
    logoType: 'rf-electro'
  },
  {
    id: 'solarkits',
    title: 'Solarkits ERP',
    category: 'CleanTech / Renewable Energy',
    statVal: '50K+',
    statLabel: 'INVENTORY MANAGED',
    desc: 'High-scale renewable energy ERP integrating interactive Google Maps GIS panel sizing, multi-warehouse inventory locking, and automated billing ledgers.',
    tags: ['SOLAR ERP', 'GIS ENGINE', 'INVENTORY'],
    liveUrl: 'https://solarkits.in/',
    logoType: 'solarkits'
  },
  {
    id: 'flyanytrip',
    title: 'FlyAnyTrip',
    category: 'TravelTech / Global Flights',
    statVal: '500+',
    statLabel: 'GLOBAL AIRLINES',
    desc: 'High-performance flight booking & travel aggregator platform featuring live multi-city routing, real-time fare comparison, automated PNR issuance, and instant passenger checkout.',
    tags: ['FLIGHT AGGREGATOR', 'FARE ENGINE', 'MULTI-CITY ROUTING'],
    liveUrl: 'https://flyanytrip-new.vercel.app/',
    logoType: 'flyanytrip'
  }
];

export default function RealtimeWork() {
  const renderLogo = (type) => {
    switch (type) {
      case 'rf-electro':
        return (
          <div className="w-11 h-11 rounded-none border border-black/15 dark:border-white/15 bg-white p-1 flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
            <img 
              src="/images/rf-electro-icon.png" 
              alt="RF Electro Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
        );
      case 'solarkits':
        return (
          <div className="w-11 h-11 rounded-none border border-black/15 dark:border-white/15 bg-white p-1 flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
            <img 
              src="/images/solarkits-icon.png" 
              alt="SolarKits ERP Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
        );
      case 'flyanytrip':
        return (
          <div className="w-11 h-11 rounded-none border border-black/15 dark:border-white/15 bg-white p-1 flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
            <img 
              src="/images/favicon.svg" 
              alt="FlyAnyTrip Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="work" className="py-24 md:py-32 px-6 bg-[#040406] dark:bg-[#040406] relative overflow-hidden font-quicksand">
      {/* Background Ambience - Hardware GPU Accelerated Radial Glow */}
      <div 
        className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none transform-gpu"
        style={{ background: 'radial-gradient(circle, rgba(0, 245, 255, 0.05) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full pointer-events-none transform-gpu"
        style={{ background: 'radial-gradient(circle, rgba(123, 47, 255, 0.05) 0%, transparent 70%)' }}
      />
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(4,4,6,1)_100%),_linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Main Section Header */}
        <div className="text-center mb-14 md:mb-18">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Category Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </span>
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.22em] text-white/80">
                Live Demonstrations
              </span>
            </div>

            {/* Main Title with Forward-Only Liquid Metallic Shimmer */}
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-quicksand font-bold tracking-tight text-white mb-6 leading-tight cursor-default select-none text-center"
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
                Real Time Client Projects
              </span>
            </h2>

            <p 
              className="text-white/60 max-w-2xl mx-auto text-base sm:text-lg font-quicksand font-normal leading-relaxed"
              style={{ fontFamily: '"Quicksand", system-ui, sans-serif' }}
            >
              Experience the turnaround speed, verified performance, and live production architecture delivered for businesses across India.
            </p>
          </m.div>
        </div>

        {/* Selected Work Sub-Header Bar (Matching reference image) */}
        <div className="flex items-center justify-between gap-4 mb-8 text-xs font-mono uppercase tracking-[0.2em] text-gray-400 dark:text-white/50">
          <span className="font-bold shrink-0 text-white/70">SELECTED WORK</span>
          <div className="flex-1 h-[1px] bg-white/10" />
          <span className="font-bold tracking-widest shrink-0 text-white/70">3 PROJECTS · VERIFIED</span>
        </div>

        {/* 3 Projects Cards Grid (Exact UI from reference image) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {selectedWorkProjects.map((project, idx) => (
            <m.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col justify-between p-6 sm:p-7 rounded-none bg-white dark:bg-[#0c0c11] border-2 border-black/90 dark:border-white/20 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.35)] dark:hover:border-white/40 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden"
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  {/* Top: Logo & Big Stat Metric */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    {renderLogo(project.logoType)}

                    <div className="flex flex-col items-end text-right">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-950 dark:text-white leading-none">
                        {project.statVal}
                      </span>
                      <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-gray-500 dark:text-white/45 mt-1.5">
                        {project.statLabel}
                      </span>
                    </div>
                  </div>

                  {/* Hairline Divider */}
                  <div className="w-full h-[1px] bg-black/10 dark:bg-white/10 my-4" />

                  {/* Title & Location / Category */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-950 dark:text-white tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono text-gray-500 dark:text-white/50 tracking-wider shrink-0">
                      {project.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-white/75 text-sm sm:text-[15px] leading-relaxed mb-6 font-normal">
                    {project.desc}
                  </p>
                </div>

                {/* Bottom: Tags & Arrow Link */}
                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-3 mt-auto">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx}
                        className="px-2 py-1 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border border-black/25 dark:border-white/20 rounded-none bg-black/[0.03] dark:bg-white/[0.04] text-gray-900 dark:text-white/85"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title}`}
                    className="w-8 h-8 rounded-none border border-black/20 dark:border-white/20 bg-black/[0.02] dark:bg-white/[0.04] flex items-center justify-center text-gray-800 dark:text-white/80 group-hover:text-black dark:group-hover:text-white group-hover:bg-black/10 dark:group-hover:bg-white/10 group-hover:border-black/50 dark:group-hover:border-white/50 group-hover:scale-110 transition-all ml-2 shrink-0"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}
