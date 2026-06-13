import React, { useRef, useEffect, useState } from 'react';
import { m, useInView, AnimatePresence } from 'framer-motion';

const VideoPlayer = ({ src, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "200px" });

  useEffect(() => {
    if (ref.current) {
      ref.current.playbackRate = 2.0; // Increased playback speed
      if (isInView) {
        ref.current.play().catch(e => console.log('Autoplay blocked:', e));
      } else {
        ref.current.pause();
      }
    }
  }, [isInView]);

  return (
    <video 
      ref={ref}
      src={src}
      autoPlay
      loop 
      muted 
      playsInline
      preload="none"
      className={className}
      
    />
  );
};
import { ArrowUpRight, Database, Code, Server, Zap, Compass, Factory, Sun, X, ExternalLink, Globe } from 'lucide-react';

const showcaseProjects = [
  {
    id: 'ask-visa',
    title: 'Ask Visa',
    tagline: 'Visa made simple, approved fast',
    desc: 'A high-conversion immigration and visa consulting platform. Features an intuitive application funnel, integrated document checklists, and automated eligibility tracking to streamline international travel and study workflows.',
    tech: [
      { name: 'React', icon: Code },
      { name: 'Node.js', icon: Zap },
      { name: 'Express', icon: Server },
      { name: 'MongoDB', icon: Database }
    ],
    icon: Compass,
    // Using encodeURI is safer, but exact literal string mapping works best for public assets in Vite
    videoPath: '/Video/Ask Visa – Visa made simple, approved fast - Google Chrome 2026-05-21 15-34-27.mp4',
    liveUrl: 'https://askvisa.in/',
    color: 'text-accent-primary',
    bg: 'bg-accent-primary/10',
    border: 'border-accent-primary/30',
    gradient: 'from-accent-primary/20',
    buttonHover: 'hover:bg-accent-primary/20 hover:border-accent-primary/50 hover:text-accent-primary'
  },
  {
    id: 'rf-electrotech',
    title: 'RF Electrotech',
    tagline: 'Industrial Automation & Control',
    desc: 'A robust B2B corporate portal engineered for an industrial automation leader. Showcasing advanced control panels, PLC programming services, and high-voltage engineering portfolios with lightning-fast load times.',
    tech: [
      { name: 'Next.js', icon: Code },
      { name: 'Tailwind CSS', icon: Zap },
      { name: 'Sanity CMS', icon: Database },
      { name: 'Framer Motion', icon: Server }
    ],
    icon: Factory,
    videoPath: '/Video/R F ELECTROTECH - Google Chrome 2026-05-21 15-33-47.mp4',
    liveUrl: 'https://rfelectrotech.com/',
    color: 'text-accent-violet',
    bg: 'bg-accent-violet/10',
    border: 'border-accent-violet/30',
    gradient: 'from-accent-violet/20',
    buttonHover: 'hover:bg-accent-violet/20 hover:border-accent-violet/50 hover:text-accent-violet'
  },
  {
    id: 'solarkits',
    title: 'Solarkits ERP',
    tagline: 'Enterprise Resource Planning',
    desc: 'A highly scalable, multi-tier enterprise resource planning platform built for the renewable energy sector. It orchestrates lead management, geo-spatial inventory logistics, and milestone-based financial distributions.',
    tech: [
      { name: 'MongoDB', icon: Database },
      { name: 'Express.js', icon: Server },
      { name: 'React 19', icon: Code },
      { name: 'Node.js', icon: Zap }
    ],
    icon: Sun,
    videoPath: '/Video/Solarkits ERP - Google Chrome 2026-05-21 15-35-02.mp4',
    liveUrl: 'https://solarkits.in/',
    color: 'text-[#00FF94]',
    bg: 'bg-[#00FF94]/10',
    border: 'border-[#00FF94]/30',
    gradient: 'from-[#00FF94]/20',
    buttonHover: 'hover:bg-[#00FF94]/20 hover:border-[#00FF94]/50 hover:text-[#00FF94]'
  }
];

const architectureDetails = {
  'ask-visa': {
    title: 'Ask Visa',
    tagline: 'Visa made simple, approved fast',
    specs: [
      { label: 'System Pattern', value: 'Unified Serverless API & client-side micro-services' },
      { label: 'Frontend Engine', value: 'React client with step-level onboarding state machine' },
      { label: 'Backend Runtime', value: 'Node.js (Serverless Lambdas)' },
      { label: 'Database Schema', value: 'MongoDB Atlas document database' },
      { label: 'OCR API Provider', value: 'AWS Textract OCR / Google Vision API' }
    ],
    highlights: [
      'Developed a robust client-side step flow caching system to preserve onboarding details across interruptions.',
      'Implemented on-the-fly client image resizing using Canvas API in a Web Worker thread, minimizing file upload latency by up to 85%.',
      'Configured secure document ingestion workflows with AWS S3 presigned upload URLs, maintaining compliance with strict private document safety regulations.'
    ],
    challenges: 'Processing sensitive passport data without keeping persistent storage on server hard drives.',
    solution: 'Engineered an ephemeral pipeline that uploads direct to S3 with automated lifecycle rules to permanently shred document records after processing.'
  },
  'rf-electrotech': {
    title: 'RF Electrotech',
    tagline: 'Industrial Automation & Control',
    specs: [
      { label: 'System Pattern', value: 'Jamstack Static Site Generation with ISR' },
      { label: 'Frontend Engine', value: 'Next.js 14 App Router + Framer Motion' },
      { label: 'Content System', value: 'Sanity.io Headless CMS with custom schemas' },
      { label: 'Global Network', value: 'Vercel Edge CDN nodes' },
      { label: 'Optimization', value: 'Static asset compression & lazy prefetching' }
    ],
    highlights: [
      'Designed dynamic page generation via Next.js ISR (Incremental Static Regeneration), updating the static catalog in 60s without full site rebuilds.',
      'Constructed modular timeline controllers and vector animations with Framer Motion that render at a smooth 60fps on mobile displays.',
      'Achieved a perfect 100/100 Lighthouse performance rating by eliminating non-essential runtime Javascript and prioritizing critical paint assets.'
    ],
    challenges: 'Displaying complex high-voltage circuit schematic portfolios without causing browser stutter or layout shifts.',
    solution: 'Optimized drawings as lightweight SVG sprites and deferred complex layout rendering until the element entered the client viewport.'
  },
  'solarkits': {
    title: 'Solarkits ERP',
    tagline: 'Enterprise Resource Planning',
    specs: [
      { label: 'System Pattern', value: 'Event-driven multi-tier ERP & ledger systems' },
      { label: 'Frontend Engine', value: 'React 19 dashboard with interactive map overlays' },
      { label: 'Backend Runtime', value: 'Node.js & Express.js REST API' },
      { label: 'Database Schema', value: 'MongoDB ACID transactions & Redis cache tables' },
      { label: 'Queue Engine', value: 'BullMQ queue + Redis key-value store' }
    ],
    highlights: [
      'Built a custom SVG drawing layer on Google Maps API to measure available solar roof coordinates and calculate power outputs instantly.',
      'Created an ACID-compliant double-entry ledger inside MongoDB to record customer milestones, material allocations, and invoicing history.',
      'Offloaded heavy invoice PDF creation and automated emails to separate worker processes managed by BullMQ queues, saving database compute capacity.'
    ],
    challenges: 'Updating live pricing valuations for channel partners across dozens of regional warehouses concurrently.',
    solution: 'Designed an optimistic state replication model with Redis cache tables, decreasing database read load by over 70%.'
  }
};

const ArchitectureFlow = ({ projectId, projectColor }) => {
  const flows = {
    'ask-visa': [
      { title: "React SPA Client", desc: "Visa onboarding state machine & local storage caching", step: "01", icon: Code },
      { title: "Web Worker", desc: "Client-side image compression & format optimization", step: "02", icon: Zap },
      { title: "Serverless API", desc: "Express routing, file uploading, & JWT verification", step: "03", icon: Server },
      { title: "DB & Services", desc: "MongoDB Atlas storage + AWS Textract passport parsing", step: "04", icon: Database }
    ],
    'rf-electrotech': [
      { title: "Sanity CMS", desc: "Decoupled catalog data & asset management console", step: "01", icon: Database },
      { title: "Build Trigger", desc: "Automated build triggers via Sanity CMS webhooks", step: "02", icon: Zap },
      { title: "Next.js ISR", desc: "Static HTML page generation with 60s background revalidation", step: "03", icon: Code },
      { title: "Global CDN", desc: "Edge-cached delivery for lightning-fast loads (<0.2s)", step: "04", icon: Server }
    ],
    'solarkits': [
      { title: "Google Maps GIS", desc: "Interactive canvas layer for panel layout calculations", step: "01", icon: Compass },
      { title: "React 19 App", desc: "Real-time state tracking & geospatial layout configuration", step: "02", icon: Code },
      { title: "BullMQ & Express", desc: "Background ledger processing & PDF document builder", step: "03", icon: Server },
      { title: "Data Storage", desc: "MongoDB Double-entry ledger + Redis database caching", step: "04", icon: Database }
    ]
  };

  const steps = flows[projectId] || [];

  return (
    <div data-lenis-prevent="true" className="flex flex-row items-stretch gap-4 py-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <div className="w-[200px] sm:w-[220px] shrink-0 bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 relative group flex flex-col justify-between">
            {/* Step badge */}
            <span className={`absolute -top-2 -left-2 text-[9px] font-mono px-2 py-0.5 rounded-md bg-black border border-white/10 ${projectColor}`}>
              {step.step}
            </span>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-white/5 text-white">
                  <step.icon size={18} />
                </div>
                <h5 className="text-sm font-bold text-white leading-tight">{step.title}</h5>
              </div>
              <p className="text-xs text-white/50 leading-relaxed font-light">{step.desc}</p>
            </div>
          </div>
          {idx < steps.length - 1 && (
            <div className="flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function RealtimeWork() {
  const [activeArchProject, setActiveArchProject] = useState(null);

  return (
    <section id="realtimework" className="py-32 px-6 bg-[#030303] relative min-h-screen overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-accent-primary/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-accent-violet/5 rounded-full blur-[200px] pointer-events-none" />
      
      {/* Cyber Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(3,3,3,1)_100%),_linear-gradient(rgba(255,255,255,0.01)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.01)_1px,_transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Massive Headline */}
        <div className="text-center mb-32">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white">Live Demonstrations</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-white mb-6">
              Real Time <span className="text-gradient font-light italic block mt-2">Client Projects</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Experience the scale, performance, and visual excellence of our recently deployed enterprise and commercial platforms.
            </p>
          </m.div>
        </div>

        {/* Project Showcase List */}
        <div className="flex flex-col gap-32 md:gap-48">
          {showcaseProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <m.div 
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${isEven ? '' : 'lg:flex-row-reverse'}`}
              >
                
                {/* VIDEO BOX CONTAINER */}
                <div className="w-full lg:w-3/5 relative group">
                  {/* Decorative Glow */}
                  <div className={`absolute -inset-1 bg-gradient-to-tr ${project.gradient} to-transparent rounded-[32px] blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-700`} />
                  
                  {/* Glassmorphic Video Wrapper */}
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative block p-2 rounded-[32px] bg-white/5 border ${project.border} backdrop-blur-sm overflow-hidden cursor-pointer`}
                  >
                    <div className="relative rounded-[24px] overflow-hidden bg-black aspect-[16/10] border border-white/10">
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />
                      
                      <VideoPlayer 
                        src={project.videoPath}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                      />

                      {/* Stable, Transparent Hover Circle */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-black/60 border border-white/15 flex flex-col items-center justify-center gap-1 z-20 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 pointer-events-none text-white">
                        <ArrowUpRight className="w-6 h-6" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Visit Site</span>
                      </div>
                      
                      {/* Internal Floating Badge */}
                      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${project.bg} border ${project.border} flex items-center justify-center backdrop-blur-md`}>
                          <project.icon size={20} className={project.color} />
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md hover:bg-black/80 transition-colors">
                          <span className="text-xs font-mono text-white/80 uppercase tracking-widest">Live Deployment</span>
                        </div>
                      </div>

                    </div>
                  </a>
                </div>

                {/* TEXT CONTENT CONTAINER */}
                <div className="w-full lg:w-2/5 flex flex-col items-start text-left">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${project.border} ${project.bg} mb-6`}>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${project.color}`}>
                      0{idx + 1} // {project.tagline}
                    </span>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/50 text-base md:text-lg leading-relaxed mb-8">
                    {project.desc}
                  </p>

                  {/* Tech Stack Grid */}
                  <div className="w-full mb-10">
                    <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Core Technology Stack</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {project.tech.map((t, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                          <t.icon size={16} className={project.color} />
                          <span className="text-sm font-bold text-white/80">{t.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <button 
                    onClick={() => setActiveArchProject(project.id)}
                    className={`px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-3 ${project.buttonHover}`}
                  >
                    Explore Architecture <ArrowUpRight size={18} />
                  </button>
                </div>

              </m.div>
            );
          })}
        </div>

      </div>

      {/* Immersive Architecture Modal */}
      <AnimatePresence>
        {activeArchProject && (() => {
          const detail = architectureDetails[activeArchProject];
          const project = showcaseProjects.find(p => p.id === activeArchProject);
          if (!detail || !project) return null;

          return (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setActiveArchProject(null)}
            >
              {/* Modal Container */}
              <m.div
                data-lenis-prevent="true"
                initial={{ scale: 0.95, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 30, opacity: 0 }}
                transition={{ type: "spring", damping: 28, stiffness: 280 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl bg-[#0a0a0c]/95 border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto z-10 text-left"
              >
                {/* Accent ambient glow */}
                <div className={`absolute -top-12 -left-12 w-32 h-32 rounded-full ${project.bg} blur-3xl pointer-events-none`} />
                <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-accent-violet/10 blur-3xl pointer-events-none" />

                {/* Close button */}
                <button
                  onClick={() => setActiveArchProject(null)}
                  className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-1.5 rounded-full hover:bg-white/5"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                {/* Header */}
                <div className="mb-8 border-b border-white/5 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] uppercase tracking-[0.25em] font-mono font-bold ${project.color}`}>
                      System Architecture
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-white/40">
                      Case Study
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-white leading-tight">
                    {detail.title}
                  </h3>
                  <p className="text-sm text-white/55 mt-1 leading-relaxed font-light">
                    {detail.tagline} — Design blueprint and technical infrastructure.
                  </p>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left columns - Diagrams & Flow */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Visual Architecture Flow */}
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-white/30 mb-4">Component Processing Pipeline</h4>
                      <ArchitectureFlow projectId={activeArchProject} projectColor={project.color} />
                    </div>

                    {/* Challenges & Solution */}
                    <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5">
                      <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">Engineering Challenges</h4>
                      <p className="text-xs text-white/50 leading-relaxed font-light mb-4">{detail.challenges}</p>
                      <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">Solution Implementation</h4>
                      <p className="text-xs text-white/50 leading-relaxed font-light">{detail.solution}</p>
                    </div>
                  </div>

                  {/* Right column - Tech Specs */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-white/30 mb-4">Technical Details</h4>
                      <div className="space-y-3 bg-white/[0.01] border border-white/5 rounded-2xl p-5">
                        {detail.specs.map((spec, i) => (
                          <div key={i} className="border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                            <span className="text-[10px] font-mono text-white/30 uppercase block mb-0.5">{spec.label}</span>
                            <span className="text-xs font-bold text-white/90 leading-tight">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Highlights list */}
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-white/30 mb-3">Key Highlights</h4>
                      <ul className="space-y-2">
                        {detail.highlights.map((highlight, i) => (
                          <li key={i} className="text-[11px] text-white/50 leading-relaxed flex items-start gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${project.bg} border ${project.border} shrink-0 mt-1.5`} />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* View Live Button */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-full py-4 px-5 rounded-xl border border-white/10 bg-white/5 text-white text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-white/10`}
                    >
                      <Globe size={14} />
                      <span>Visit Live Website</span>
                      <ExternalLink size={12} className="opacity-60" />
                    </a>
                  </div>
                </div>
              </m.div>
            </m.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
