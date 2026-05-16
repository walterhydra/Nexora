import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Activity, Globe, Cpu, Zap, Shield, BarChart3 } from 'lucide-react';

const PulseCard = ({ icon: Icon, title, value, unit, color, delay }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative group p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
    >
      {/* Glow Effect */}
      <div 
        className="absolute -inset-px opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
        style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div 
            className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500"
            style={{ color }}
          >
            <Icon size={20} />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Live</span>
          </div>
        </div>

        <h3 className="text-sm font-mono text-white/40 uppercase tracking-[0.2em] mb-2">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tighter text-white">
            {displayValue.toLocaleString()}{unit}
          </span>
        </div>

        <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "70%" }}
            transition={{ duration: 2, delay: delay + 0.5 }}
            className="h-full"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function Pulse() {
  const [pulseTime, setPulseTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setPulseTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 relative overflow-hidden bg-black">
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,245,255,0.05),_transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_rgba(123,47,255,0.05),_transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-24">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
            >
              <Activity className="text-accent-primary animate-pulse" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Nexora Network Pulse</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[0.9] mb-8"
            >
              The Heartbeat of <br/>
              <span className="text-gradient">Innovation.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/40 max-w-lg font-medium leading-relaxed"
            >
              Real-time monitoring of our global ecosystem. We don't just work; we sustain a high-frequency pulse of digital excellence across 15+ timezones.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-md mx-auto"
          >
            {/* Visualizer */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 1.3,
                  }}
                  className="absolute w-full h-full rounded-full border border-accent-primary/20"
                />
              ))}
              <div className="relative z-10 text-center">
                <div className="text-6xl font-black text-white tracking-tighter mb-2">
                  {pulseTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
                <div className="text-[10px] font-mono text-accent-primary uppercase tracking-[0.5em]">System Sync Active</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PulseCard 
            icon={Zap} 
            title="Processing Speed" 
            value="98" 
            unit="ms" 
            color="#00F5FF" 
            delay={0.1} 
          />
          <PulseCard 
            icon={Globe} 
            title="Global Nodes" 
            value="124" 
            unit=" active" 
            color="#7B2FFF" 
            delay={0.2} 
          />
          <PulseCard 
            icon={Cpu} 
            title="Efficiency Core" 
            value="99" 
            unit="%" 
            color="#FF6B35" 
            delay={0.3} 
          />
          <PulseCard 
            icon={Shield} 
            title="Threat Shield" 
            value="100" 
            unit="%" 
            color="#00FF94" 
            delay={0.4} 
          />
        </div>
      </div>

      {/* Narrative Marquee */}
      <div className="mt-32 border-y border-white/5 py-8 overflow-hidden bg-white/[0.01]">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              <span className="text-4xl font-black text-white/5 uppercase italic tracking-tighter">High Frequency Development</span>
              <span className="w-3 h-3 rounded-full bg-accent-primary/20" />
              <span className="text-4xl font-black text-white/5 uppercase italic tracking-tighter">Scalable Architecture</span>
              <span className="w-3 h-3 rounded-full bg-accent-violet/20" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
