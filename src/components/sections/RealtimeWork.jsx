import React, { useRef, useEffect } from 'react';
import { m, useInView } from 'framer-motion';

const VideoPlayer = ({ src, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "200px" });

  useEffect(() => {
    if (ref.current) {
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
import { ArrowUpRight, Database, Code, Server, Zap, Compass, Factory, Sun } from 'lucide-react';

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
    color: 'text-[#00FF94]',
    bg: 'bg-[#00FF94]/10',
    border: 'border-[#00FF94]/30',
    gradient: 'from-[#00FF94]/20',
    buttonHover: 'hover:bg-[#00FF94]/20 hover:border-[#00FF94]/50 hover:text-[#00FF94]'
  }
];

export default function RealtimeWork() {
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
                  <div className={`relative p-2 rounded-[32px] bg-white/5 border ${project.border} backdrop-blur-sm overflow-hidden`}>
                    <div className="relative rounded-[24px] overflow-hidden bg-black aspect-[16/10] border border-white/10">
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />
                      
                      <VideoPlayer 
                        src={project.videoPath}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                      />
                      
                      {/* Internal Floating Badge */}
                      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${project.bg} border ${project.border} flex items-center justify-center backdrop-blur-md`}>
                          <project.icon size={20} className={project.color} />
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
                          <span className="text-xs font-mono text-white/80 uppercase tracking-widest">Live Deployment</span>
                        </div>
                      </div>

                    </div>
                  </div>
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
                  <button className={`px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-3 ${project.buttonHover}`}>
                    Explore Architecture <ArrowUpRight size={18} />
                  </button>
                </div>

              </m.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
