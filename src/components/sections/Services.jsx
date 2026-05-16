import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Activity, ShieldCheck, Layers, Terminal } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { services } from '../../constants/services';

// Custom diagnostics mapping for all 8 service nodes to construct the Cyber HUD Console
const serviceTelemetry = {
  "web-development": {
    latency: "12ms",
    coreScore: "100/100",
    engine: "Next.js 14 / V8 Engine",
    reliability: "99.99%",
    loadVelocity: "0.2s FCP",
    security: "Enterprise SSL",
    trafficCap: "Unlimited Nodes"
  },
  "app-development": {
    latency: "18ms",
    coreScore: "120 FPS Native",
    engine: "React Native / Skia",
    reliability: "99.95%",
    loadVelocity: "Instant Splash",
    security: "Biometric AES-256",
    trafficCap: "Multi-Store Ready"
  },
  "brand-design": {
    latency: "Adaptive UX",
    coreScore: "A++ Aesthetics",
    engine: "Figma Vector Core",
    reliability: "Strategic ROI",
    loadVelocity: "Fluid Transitions",
    security: "IP Protected",
    trafficCap: "Fully Cohesive"
  },
  "automation-ai": {
    latency: "8ms API",
    coreScore: "98% Accuracy",
    engine: "GPT-4o / Make Matrix",
    reliability: "99.9%",
    loadVelocity: "Autonomous Flow",
    security: "Encrypted Webhooks",
    trafficCap: "10k+ Tasks/Min"
  },
  "deployment-devops": {
    latency: "4ms Server",
    coreScore: "Uptime: 99.999%",
    engine: "Docker / AWS Cluster",
    reliability: "Fault-Tolerant",
    loadVelocity: "0s Downtime Deploy",
    security: "Cloudflare WAF / IAM",
    trafficCap: "Auto-Scaling Nodes"
  },
  "full-website-package": {
    latency: "14ms Avg",
    coreScore: "All-in-One Engine",
    engine: "Vite + Tailwind Core",
    reliability: "Production Ready",
    loadVelocity: "7-Day Express",
    security: "Full Audit Shield",
    trafficCap: "Lifetime Support"
  },
  "api-integrations": {
    latency: "6ms Route",
    coreScore: "GraphQL / REST Ready",
    engine: "Stripe & Custom SDKs",
    reliability: "High-Throughput",
    loadVelocity: "Parallel Queries",
    security: "OAuth2.0 / SHA-256",
    trafficCap: "Multi-Platform Sync"
  },
  "seo-performance": {
    latency: "85ms Response",
    coreScore: "100/100 Google Speed",
    engine: "Lighthouse V11 Core",
    reliability: "Rank Scaling",
    loadVelocity: "Core Web Vitals Pass",
    security: "Structured Schema",
    trafficCap: "Search Index Amplified"
  }
};

const ServiceRow = ({ service, index, hoveredIndex, setHoveredIndex }) => {
  const isHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  // Spotlight effect motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const telemetry = serviceTelemetry[service.slug] || serviceTelemetry["web-development"];

  return (
    <div 
      className="relative border-b border-gray-200 dark:border-white/5 py-8 lg:py-10 cursor-pointer transition-all duration-500 group overflow-hidden"
      onMouseEnter={() => {
        setHoveredIndex(index);
      }}
      onMouseLeave={() => setHoveredIndex(null)}
      onMouseMove={handleMouseMove}
    >
      {/* Laser-sweep neon glowing background pathway */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F5FF]/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center z-10" />

      {/* Cursor Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 245, 255, 0.04),
              transparent 80%
            )
          `
        }}
      />

      <div className={`relative z-10 flex flex-col justify-center transition-opacity duration-500 ${isDimmed ? 'opacity-25' : 'opacity-100'}`}>
        
        {/* Title Row */}
        <div className="flex items-center justify-between pl-4 pr-6">
          <div className="flex items-center gap-6 md:gap-8">
            <div className="relative">
              <span className="text-xs md:text-sm font-mono text-gray-400 dark:text-gray-500 font-bold w-8 inline-block">
                SYS_{index < 9 ? `0${index + 1}` : index + 1}
              </span>
              {isHovered && (
                <span className="absolute -top-1 -right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5FF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F5FF]"></span>
                </span>
              )}
            </div>
            <h3 className="text-xl md:text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white group-hover:text-[#00F5FF] transition-colors duration-500">
              {service.title}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] text-[9px] font-mono tracking-widest text-gray-500 dark:text-gray-400 group-hover:border-[#00F5FF]/20 group-hover:text-[#00F5FF]/80 transition-colors">
              {isHovered ? "NODE: ACTIVE" : "NODE: STANDBY"}
            </span>
            <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:border-[#00F5FF] group-hover:bg-[#00F5FF]/10 text-gray-400 dark:text-gray-500 group-hover:text-[#00F5FF] transition-all duration-300">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

      </div>

      {/* Expandable Content Area */}
      <motion.div
        initial={false}
        animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
        className="overflow-hidden relative z-10"
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="pt-6 pl-14 md:pl-[4.5rem] pr-6">
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-xl font-sans">
            {service.details}
          </p>
          
          {/* Mobile Image Reveal & Micro HUD (Only visible on small/medium screens) */}
          <div className="block lg:hidden w-full rounded-2xl overflow-hidden mb-6 relative border border-white/10 aspect-[16/9]">
            <img src={service.image} className="w-full h-full object-cover brightness-75" alt={service.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] font-mono text-white/90">
                <div>⚡ ENGINE: <span className="text-[#00F5FF]">{telemetry.engine}</span></div>
                <div>📡 CORES: <span className="text-[#00F5FF]">{telemetry.coreScore}</span></div>
                <div>🔒 SHIELD: <span className="text-[#00F5FF] font-semibold">{telemetry.security}</span></div>
                <div>📦 UPTIME: <span className="text-[#00F5FF] font-semibold">{telemetry.reliability}</span></div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {service.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/[0.03] text-xs font-mono font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/5 hover:border-[#00F5FF]/30 transition-colors"
              >
                #{tag.toUpperCase()}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-6 pb-6 border-b border-white/5 lg:border-none">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Estimated Deployment</span>
              <span className="text-lg font-bold font-mono text-gray-900 dark:text-white">
                {service.price}
              </span>
            </div>
            <Link 
              to={`/service/${service.slug}`} 
              className="flex items-center gap-2 text-xs font-mono font-bold bg-[#00F5FF] text-black px-6 py-3 rounded-xl hover:bg-[#00E5EE] transition-all hover:scale-[1.02] active:scale-[0.98] relative z-30"
            >
              DEPLOY_NODE <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </motion.div>
      
      {/* Invisible full-row click target */}
      <Link to={`/service/${service.slug}`} className="absolute inset-0 z-20" aria-label={`Explore ${service.title}`} />
    </div>
  );
};

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Default to first service properties to prevent UI void states
  const activeService = hoveredIndex !== null ? services[hoveredIndex] : services[0];
  const telemetry = serviceTelemetry[activeService.slug] || serviceTelemetry["web-development"];

  return (
    <section id="services" className="py-24 md:py-32 relative bg-white dark:bg-[#030303] overflow-hidden">
      {/* Neon mesh background grid coordinates and background accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#00F5FF]/[0.01] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#9B59FF]/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-8 relative"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
              <span className="text-[10px] font-mono text-[#00F5FF] uppercase tracking-[0.25em]">System Capabilities</span>
            </div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-tight tracking-tight">
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#9B59FF]">Build</span>
            </motion.h2>
          </div>
          <div className="flex flex-col gap-2">
            <motion.p variants={fadeUp} className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-md">
              End-to-end digital services. We craft highly specialized architectures that demand engagement and drive concrete business acceleration.
            </motion.p>
            <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-2">
              <span>STATUS: ONLINE</span>
              <span>•</span>
              <span>SYS_OPS: VERIFIED</span>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 relative">
          
          {/* Left: Dynamic Interactive Services Directory */}
          <div className="w-full lg:w-[55%] border-t border-gray-200 dark:border-white/10">
            {services.map((service, index) => (
              <ServiceRow 
                key={service.id} 
                service={service} 
                index={index} 
                hoveredIndex={hoveredIndex} 
                setHoveredIndex={setHoveredIndex} 
              />
            ))}
          </div>

          {/* Right: Immersive Sticky Cybernetic HUD Terminal (Desktop only) */}
          <div className="hidden lg:block lg:w-[45%] relative">
            <div className="sticky top-32 w-full flex flex-col gap-6">
              
              {/* Outer Cyber Terminal Frame */}
              <div className="relative w-full aspect-[4/4] rounded-3xl overflow-hidden bg-gray-50 dark:bg-[#080808]/90 border border-gray-200 dark:border-white/5 shadow-2xl p-6 flex flex-col justify-between">
                
                {/* Tech HUD Frame details */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#00F5FF]/30 to-transparent" />
                
                {/* Micro tech borders */}
                <span className="absolute top-3 left-4 text-[8px] font-mono text-gray-500 uppercase tracking-widest">NEXORA_HUD_SYS_V2.8</span>
                <span className="absolute top-3 right-4 text-[8px] font-mono text-[#00F5FF]/60 animate-pulse font-bold">● LIVE_FEED</span>
                
                {/* Visualizer Image Console Frame */}
                <div className="relative w-full h-[65%] rounded-2xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center group/hud">
                  
                  {/* Cyber Scanner Laser Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F5FF] to-transparent animate-[bounce_4s_infinite] shadow-[0_0_15px_#00F5FF] z-20 pointer-events-none" />

                  {/* Corner Target Reticles */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20 z-20 pointer-events-none" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20 z-20 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20 z-20 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20 z-20 pointer-events-none" />

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeService.image}
                      src={activeService.image}
                      alt={activeService.title}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 0.75, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] contrast-[1.1] saturate-[0.8] transition-all duration-700 group-hover/hud:scale-[1.03] group-hover/hud:brightness-[0.9]"
                    />
                  </AnimatePresence>
                  
                  {/* Central Radar Crosshairs overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-40 h-40 rounded-full border border-[#00F5FF]/10 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                      <div className="w-36 h-36 rounded-full border border-dashed border-[#00F5FF]/5" />
                    </div>
                  </div>

                  {/* Ambient dynamic accent glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00F5FF]/20 to-[#9B59FF]/20 rounded-2xl blur-md opacity-20 group-hover/hud:opacity-40 transition-opacity pointer-events-none" />
                </div>

                {/* Cyber Telemetry Stats Console */}
                <div className="flex flex-col justify-end pt-4 border-t border-white/5 relative z-10">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-[#00F5FF]">
                        <Cpu size={12} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">DEPLOYMENT_ENGINE</span>
                        <span className="text-xs font-mono font-bold text-gray-200 truncate max-w-[140px]">
                          {telemetry.engine}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-[#00F5FF]">
                        <Activity size={12} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">NODE_LATENCY</span>
                        <span className="text-xs font-mono font-bold text-gray-200">
                          {telemetry.latency}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-[#00F5FF]">
                        <Layers size={12} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">VELOCITY_METRIC</span>
                        <span className="text-xs font-mono font-bold text-gray-200">
                          {telemetry.coreScore}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-[#00F5FF]">
                        <ShieldCheck size={12} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">SECURITY_SHIELD</span>
                        <span className="text-xs font-mono font-bold text-gray-200">
                          {telemetry.security}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Sub Terminal Mini Dashboard Panel */}
              <div className="w-full bg-[#080808]/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between font-mono text-[10px] text-gray-400">
                <div className="flex items-center gap-2">
                  <Terminal size={12} className="text-[#00F5FF]" />
                  <span>SYS_LOG: Hover index {hoveredIndex !== null ? `0${hoveredIndex + 1}` : 'N/A'} is fully mapped.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>CAP: {telemetry.trafficCap}</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-[#00F5FF]">ACTIVE_STATE</span>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
