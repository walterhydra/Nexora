import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { 
  Zap, 
  Layers, 
  TrendingUp, 
  Globe, 
  Code, 
  Shield,
  MousePointer
} from 'lucide-react';

const BentoCard = ({ children, className, title, description, icon: Icon, color }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // 3D Tilt Values
  const rotateX = useSpring(useTransform(mouseY, [0, 300], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 600], [-10, 10]), { stiffness: 100, damping: 30 });

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function onMouseLeave() {
    mouseX.set(300); // Reset to center-ish
    mouseY.set(150);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-8 transition-colors hover:bg-[var(--bg-tertiary)] ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, ${color}25, transparent 40%)`
          ),
        }}
      />
      
      <div className="relative z-10 flex h-full flex-col justify-between" style={{ transform: "translateZ(50px)" }}>
        <div>
          <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--bg-primary)] text-2xl shadow-lg border border-[var(--border-color)] group-hover:scale-110 transition-transform duration-500`} style={{ color }}>
            <Icon />
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-gradient transition-all">{title}</h3>
          <p className="text-[var(--text-primary)]/60 text-sm leading-relaxed max-w-[280px] font-medium">
            {description}
          </p>
        </div>
        <div className="transform translate-z-20">
          {children}
        </div>
      </div>

      {/* Decorative Glitch lines on hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-y-[290px] transition-all duration-[2s] pointer-events-none" />
    </motion.div>
  );
};

const WhyNexora = () => {
  console.log("WhyNexora Component Loaded - v2");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.95, 1]), { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section 
      ref={containerRef}
      id="why-us"
      className="relative py-32 px-6 overflow-hidden bg-[var(--bg-primary)]"
    >
      {/* High-Graphic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Digital Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
          style={{ 
            backgroundImage: `radial-gradient(var(--text-primary) 1px, transparent 1px)`,
            backgroundSize: '40px 40px' 
          }} 
        />
        
        {/* Animated Mesh Gradients */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent-primary/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent-violet/20 rounded-full blur-[120px]" 
        />
      </div>

      <motion.div 
        style={{ scale, opacity }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm mb-6 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)] opacity-60">The Nexora Advantage</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]"
          >
            Why Choose <br/>
            <span className="text-gradient">Nexora Studio?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-xl text-[var(--text-primary)]/50 max-w-2xl mx-auto font-medium"
          >
            We don't just build websites; we engineer high-performance digital engines that scale with your ambition.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[320px]">
          {/* Main Card: 7-Day Sprint */}
          <BentoCard 
            className="md:col-span-8 md:row-span-2"
            title="The 7-Day Protocol"
            description="Our battle-tested high-velocity framework takes you from zero to market-ready in exactly 168 hours. No bloat, no delays."
            icon={Zap}
            color="#00F5FF"
          >
            <div className="mt-8 flex-1 relative overflow-hidden rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] p-8">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-primary mb-2">Sprint Velocity</p>
                  <p className="text-4xl font-black tracking-tighter italic">OPTIMIZED</p>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-black text-transparent stroke-text" style={{ WebkitTextStroke: '1px var(--border-color)' }}>07</div>
                  <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Days to launch</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: 'Strategic Architecture', progress: '100%', color: 'var(--color-accent-primary)' },
                  { label: 'Premium Visual Design', progress: '100%', color: 'var(--color-accent-violet)' },
                  { label: 'Performance Engineering', progress: '94%', color: 'var(--color-accent-secondary)' },
                ].map((item, i) => (
                  <div key={i} className="group/progress">
                    <div className="flex justify-between text-[11px] font-bold uppercase mb-2 tracking-wider">
                      <span className="opacity-60 group-hover/progress:opacity-100 transition-opacity">{item.label}</span>
                      <span className="text-accent-primary">{item.progress}</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--bg-secondary)] rounded-full overflow-hidden border border-[var(--border-color)]">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: item.progress }}
                        transition={{ duration: 2, delay: 0.5 + (i * 0.2), ease: [0.16, 1, 0.3, 1] }}
                        className="h-full relative"
                        style={{ backgroundColor: item.color }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Background Narrative Text */}
              <div className="absolute -bottom-4 -right-4 text-[10rem] font-black text-[var(--text-primary)]/[0.03] leading-none pointer-events-none select-none italic">
                SPEED
              </div>
            </div>
          </BentoCard>

          {/* Lighthouse Card */}
          <BentoCard 
            className="md:col-span-4 md:row-span-1"
            title="Engine Purity"
            description="100/100 Lighthouse scores. Zero bloat. Pure performance."
            icon={TrendingUp}
            color="#7B2FFF"
          >
            <div className="mt-6 flex items-center justify-between bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-color)]">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--bg-secondary)] bg-accent-violet/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent-violet animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-accent-violet tracking-tighter">99.9</p>
                <p className="text-[8px] font-bold opacity-40 uppercase tracking-widest">Avg. Uptime</p>
              </div>
            </div>
          </BentoCard>

          {/* Global Card */}
          <BentoCard 
            className="md:col-span-4 md:row-span-1"
            title="Global Footprint"
            description="We serve a worldwide elite, bridging continents with code."
            icon={Globe}
            color="#FF6B35"
          >
            <div className="mt-4 relative h-16 w-full flex items-center justify-center">
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-5xl text-accent-secondary/20"
               >
                 <Globe />
               </motion.div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <p className="text-xs font-bold text-accent-secondary uppercase tracking-[0.2em]">15+ Countries</p>
               </div>
            </div>
          </BentoCard>

          {/* Design Card */}
          <BentoCard 
            className="md:col-span-5 md:row-span-2"
            title="Visual Supremacy"
            description="We don't follow trends; we set them. Our designs are engineered to stun and convert."
            icon={Layers}
            color="#00F5FF"
          >
             <div className="mt-8 flex-1 grid grid-cols-2 gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] overflow-hidden aspect-video relative group/item shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    <motion.div 
                      animate={{ 
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-1/2 h-0.5 bg-accent-primary/20 rounded-full" />
                    </motion.div>
                    <div className="absolute bottom-3 left-3 right-3 h-1 bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                        className="w-full h-full bg-accent-primary/40"
                       />
                    </div>
                 </div>
               ))}
             </div>
          </BentoCard>

          {/* Stack Card */}
          <BentoCard 
            className="md:col-span-7 md:row-span-1"
            title="Elite Tech Stack"
            description="The most powerful tools in the hands of masters."
            icon={Code}
            color="#7B2FFF"
          >
            <div className="mt-8 flex flex-wrap gap-3">
              {['Next.js 15', 'Framer Motion', 'Node.js', 'PostgreSQL', 'Tailwind v4', 'TypeScript'].map(tech => (
                <span key={tech} className="px-4 py-2 text-[10px] font-black uppercase rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)]/40 hover:text-accent-violet hover:border-accent-violet/30 hover:bg-accent-violet/5 transition-all duration-300 tracking-widest">
                  {tech}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* Security Card */}
          <BentoCard 
            className="md:col-span-7 md:row-span-1"
            title="Fortified Security"
            description="Your digital assets, protected by military-grade encryption."
            icon={Shield}
            color="#FF6B35"
          >
             <div className="mt-6 flex items-center gap-6">
                <div className="flex-1 h-2 bg-[var(--bg-primary)] rounded-full border border-[var(--border-color)] overflow-hidden">
                   <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-1/2 h-full bg-accent-secondary shadow-[0_0_15px_var(--color-accent-secondary)]"
                   />
                </div>
                <div className="text-[10px] font-black text-accent-secondary uppercase tracking-widest whitespace-nowrap">Encryption Active</div>
             </div>
          </BentoCard>
        </div>
      </motion.div>

      {/* Global CSS for stroke text */}
      <style dangerouslySetInnerHTML={{__html: `
        .stroke-text {
          -webkit-text-stroke: 1px var(--border-color);
          text-stroke: 1px var(--border-color);
        }
      `}} />
    </section>
  );
};

export default WhyNexora;
